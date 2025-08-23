/**
 * SecurityGatewayService - Enterprise Security Gateway Service
 * Handles request validation, threat detection, security policies, and data protection
 */

import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

import {
  ISecurityGatewayService,
  SecurityContext,
  ThreatLevel,
  SecurityEvent,
  SecurityEventType,
  ThreatType
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SecurityGatewayService implements ISecurityGatewayService {

  private securityEvents: SecurityEvent[] = [];
  private blockedRequests: Set<string> = new Set();

  // Security patterns for threat detection
  private readonly threatPatterns = {
    sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|UNION|EXEC|SCRIPT)\b|['";]|\-\-|\/\*|\*\/)/i,
    xssAttempt: /(<script[\s\S]*?>[\s\S]*?<\/script>|javascript:|on\w+\s*=|<iframe|<object|<embed)/i,
    pathTraversal: /(\.\.\/|\.\.\\|etc\/passwd|cmd\.exe|system32|\/etc\/|\/windows\/)/i,
    suspiciousChars: /[<>{}|&$`]/,
    maliciousHeaders: /(union|select|script|alert|document\.|window\.|eval\()/i
  };

  private readonly sensitiveFields = [
    'password', 'token', 'secret', 'key', 'credit', 'ssn', 
    'social', 'passport', 'license', 'account', 'bank'
  ];

  constructor() {}

  /**
   * Validate incoming HTTP request for security threats
   */
  async validateRequest(request: HttpRequest<any>): Promise<boolean> {
    try {
      // Check if request is blocked
      const requestId = this.generateRequestId(request);
      if (this.blockedRequests.has(requestId)) {
        this.logSecurityEvent({
          id: this.generateEventId(),
          eventType: 'SECURITY_POLICY_VIOLATION',
          description: 'Blocked request attempted',
          ipAddress: this.extractIpAddress(request),
          userAgent: request.headers.get('User-Agent') || 'Unknown',
          timestamp: new Date(),
          metadata: { url: request.url, method: request.method }
        });
        return false;
      }

      // Validate URL
      if (!this.validateUrl(request.url)) {
        await this.handleThreatDetected(request, 'URL_VALIDATION_FAILED');
        return false;
      }

      // Validate headers
      if (!this.validateHeaders(request)) {
        await this.handleThreatDetected(request, 'HEADER_VALIDATION_FAILED');
        return false;
      }

      // Validate body content
      if (request.body && !this.validateBody(request.body)) {
        await this.handleThreatDetected(request, 'BODY_VALIDATION_FAILED');
        return false;
      }

      return true;

    } catch (error) {
      console.error('Request validation error:', error);
      return false;
    }
  }

  /**
   * Enforce security policies based on context
   */
  async enforceSecurityPolicies(context: SecurityContext): Promise<void> {
    try {
      // Check session validity
      if (!this.isValidSession(context)) {
        throw new Error('Invalid session context');
      }

      // Check rate limiting (basic implementation)
      if (!await this.checkRateLimit(context)) {
        throw new Error('Rate limit exceeded');
      }

      // Check IP restrictions
      if (!this.isAllowedIpAddress(context.ipAddress)) {
        throw new Error('IP address not allowed');
      }

      // Log successful policy enforcement
      this.logSecurityEvent({
        id: this.generateEventId(),
        userId: context.user?.Id?.toString(),
        eventType: 'PERMISSION_DENIED',
        description: 'Security policies enforced successfully',
        ipAddress: context.ipAddress || 'Unknown',
        userAgent: context.userAgent || 'Unknown',
        timestamp: new Date()
      });

    } catch (error) {
      this.logSecurityEvent({
        id: this.generateEventId(),
        userId: context.user?.Id?.toString(),
        eventType: 'SECURITY_POLICY_VIOLATION',
        description: `Security policy violation: ${error.message}`,
        ipAddress: context.ipAddress || 'Unknown',
        userAgent: context.userAgent || 'Unknown',
        timestamp: new Date()
      });
      throw error;
    }
  }

  /**
   * Detect security threats in HTTP request
   */
  async detectThreats(request: HttpRequest<any>): Promise<ThreatLevel> {
    const threats: ThreatType[] = [];
    let totalScore = 0;

    try {
      // Check URL for threats
      const urlThreats = this.analyzeUrl(request.url);
      threats.push(...urlThreats);

      // Check headers for threats
      const headerThreats = this.analyzeHeaders(request);
      threats.push(...headerThreats);

      // Check body for threats
      if (request.body) {
        const bodyThreats = this.analyzeBody(request.body);
        threats.push(...bodyThreats);
      }

      // Calculate total threat score
      totalScore = threats.reduce((sum, threat) => sum + threat.severity, 0);

      // Determine threat level
      let level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      let blocked = false;

      if (totalScore >= 80) {
        level = 'CRITICAL';
        blocked = true;
      } else if (totalScore >= 60) {
        level = 'HIGH';
        blocked = true;
      } else if (totalScore >= 40) {
        level = 'MEDIUM';
        blocked = false;
      } else {
        level = 'LOW';
        blocked = false;
      }

      const threatLevel: ThreatLevel = {
        level,
        score: totalScore,
        threats,
        blocked
      };

      // Log threat detection
      if (threats.length > 0) {
        this.logSecurityEvent({
          id: this.generateEventId(),
          eventType: 'THREAT_DETECTED',
          description: `Threat level: ${level}, Score: ${totalScore}`,
          ipAddress: this.extractIpAddress(request),
          userAgent: request.headers.get('User-Agent') || 'Unknown',
          timestamp: new Date(),
          metadata: { threats, url: request.url }
        });
      }

      return threatLevel;

    } catch (error) {
      console.error('Threat detection error:', error);
      return {
        level: 'CRITICAL',
        score: 100,
        threats: [{ type: 'SUSPICIOUS_ACTIVITY', description: 'Threat detection failed', severity: 100 }],
        blocked: true
      };
    }
  }

  /**
   * Block malicious request
   */
  blockMaliciousRequest(request: HttpRequest<any>): void {
    const requestId = this.generateRequestId(request);
    this.blockedRequests.add(requestId);

    // Log blocking action
    this.logSecurityEvent({
      id: this.generateEventId(),
      eventType: 'THREAT_DETECTED',
      description: 'Malicious request blocked',
      ipAddress: this.extractIpAddress(request),
      userAgent: request.headers.get('User-Agent') || 'Unknown',
      timestamp: new Date(),
      metadata: { url: request.url, method: request.method, blocked: true }
    });
  }

  /**
   * Log security event
   */
  logSecurityEvent(event: SecurityEvent): void {
    try {
      // Add to local storage
      this.securityEvents.push(event);

      // Keep only last 1000 events to prevent memory issues
      if (this.securityEvents.length > 1000) {
        this.securityEvents = this.securityEvents.slice(-1000);
      }

      // Log to console in development
      if (!environment.production) {
        console.warn('Security Event:', event);
      }

      // TODO: Send to security monitoring service in production
      // this.sendToSecurityService(event);

    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  /**
   * Encrypt sensitive data
   */
  encryptSensitiveData(data: any): string {
    try {
      // Simple base64 encoding for now
      // In production, use proper encryption (AES, etc.)
      const jsonString = JSON.stringify(data);
      return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (error) {
      console.error('Data encryption error:', error);
      return '';
    }
  }

  /**
   * Decrypt sensitive data
   */
  decryptSensitiveData(encryptedData: string): any {
    try {
      // Simple base64 decoding for now
      const jsonString = decodeURIComponent(escape(atob(encryptedData)));
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Data decryption error:', error);
      return null;
    }
  }

  /**
   * Get security events (for monitoring)
   */
  getSecurityEvents(): SecurityEvent[] {
    return [...this.securityEvents];
  }

  /**
   * Clear blocked requests (for testing/admin)
   */
  clearBlockedRequests(): void {
    this.blockedRequests.clear();
  }

  // ===== PRIVATE HELPER METHODS =====

  private validateUrl(url: string): boolean {
    // Check for path traversal
    if (this.threatPatterns.pathTraversal.test(url)) {
      return false;
    }

    // Check for suspicious characters
    if (this.threatPatterns.suspiciousChars.test(url)) {
      return false;
    }

    // Check URL length (prevent buffer overflow)
    if (url.length > 2048) {
      return false;
    }

    return true;
  }

  private validateHeaders(request: HttpRequest<any>): boolean {
    const headers = request.headers;

    // Check for malicious header values
    for (const headerName of headers.keys()) {
      const headerValue = headers.get(headerName) || '';
      
      if (this.threatPatterns.maliciousHeaders.test(headerValue)) {
        return false;
      }

      // Check header value length
      if (headerValue.length > 4096) {
        return false;
      }
    }

    return true;
  }

  private validateBody(body: any): boolean {
    try {
      const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
      
      // Check for SQL injection
      if (this.threatPatterns.sqlInjection.test(bodyString)) {
        return false;
      }

      // Check for XSS
      if (this.threatPatterns.xssAttempt.test(bodyString)) {
        return false;
      }

      // Check body size (prevent large payload attacks)
      if (bodyString.length > 10 * 1024 * 1024) { // 10MB limit
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private analyzeUrl(url: string): ThreatType[] {
    const threats: ThreatType[] = [];

    if (this.threatPatterns.sqlInjection.test(url)) {
      threats.push({
        type: 'SQL_INJECTION',
        description: 'SQL injection pattern detected in URL',
        severity: 80
      });
    }

    if (this.threatPatterns.xssAttempt.test(url)) {
      threats.push({
        type: 'XSS',
        description: 'XSS pattern detected in URL',
        severity: 70
      });
    }

    if (this.threatPatterns.pathTraversal.test(url)) {
      threats.push({
        type: 'SUSPICIOUS_ACTIVITY',
        description: 'Path traversal attempt detected',
        severity: 60
      });
    }

    return threats;
  }

  private analyzeHeaders(request: HttpRequest<any>): ThreatType[] {
    const threats: ThreatType[] = [];
    const headers = request.headers;

    for (const headerName of headers.keys()) {
      const headerValue = headers.get(headerName) || '';
      
      if (this.threatPatterns.maliciousHeaders.test(headerValue)) {
        threats.push({
          type: 'SUSPICIOUS_ACTIVITY',
          description: `Malicious pattern in header: ${headerName}`,
          severity: 50
        });
      }
    }

    return threats;
  }

  private analyzeBody(body: any): ThreatType[] {
    const threats: ThreatType[] = [];
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body);

    if (this.threatPatterns.sqlInjection.test(bodyString)) {
      threats.push({
        type: 'SQL_INJECTION',
        description: 'SQL injection pattern detected in request body',
        severity: 90
      });
    }

    if (this.threatPatterns.xssAttempt.test(bodyString)) {
      threats.push({
        type: 'XSS',
        description: 'XSS pattern detected in request body',
        severity: 80
      });
    }

    return threats;
  }

  private isValidSession(context: SecurityContext): boolean {
    return context.user && context.user.Id && !context.user.IsDisabled;
  }

  private async checkRateLimit(context: SecurityContext): Promise<boolean> {
    // Basic rate limiting implementation
    // In production, use Redis or similar for distributed rate limiting
    return true;
  }

  private isAllowedIpAddress(ipAddress?: string): boolean {
    // Basic IP allowlist check
    // In production, implement proper IP restrictions
    return true;
  }

  private async handleThreatDetected(request: HttpRequest<any>, reason: string): Promise<void> {
    this.blockMaliciousRequest(request);
    
    this.logSecurityEvent({
      id: this.generateEventId(),
      eventType: 'THREAT_DETECTED',
      description: `Request validation failed: ${reason}`,
      ipAddress: this.extractIpAddress(request),
      userAgent: request.headers.get('User-Agent') || 'Unknown',
      timestamp: new Date(),
      metadata: { url: request.url, method: request.method, reason }
    });
  }

  private generateRequestId(request: HttpRequest<any>): string {
    return btoa(`${request.method}:${request.url}:${Date.now()}`);
  }

  private generateEventId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractIpAddress(request: HttpRequest<any>): string {
    // Try to get IP from headers
    return request.headers.get('X-Real-IP') || 
           request.headers.get('X-Forwarded-For') || 
           'Unknown';
  }
}

// Import environment for production check
import { environment } from '../../../environments/environment';
