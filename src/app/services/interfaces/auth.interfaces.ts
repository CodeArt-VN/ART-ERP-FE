/**
 * Authentication & Security Interface Definitions
 * Enterprise-grade type definitions for authentication services
 */

import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// ===== AUTHENTICATION INTERFACES =====

export interface AuthResult {
  success: boolean;
  token?: TokenResponse;
  user?: UserProfile;
  error?: string;
  requiresMfa?: boolean;
  mfaToken?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  '.expires'?: string;
  scope?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  Code: string;
  Name: string;
  Model: string;
  Platform: string;
  OperatingSystem: string;
  OsVersion: string;
  Manufacturer: string;
  IsVirtual: boolean;
  WebViewVersion?: string;
  NotifyToken?: string;
  IDUser?: number;
}

// ===== USER PROFILE INTERFACES =====

export interface UserProfile {
  Id: number;
  UserName: string;
  Email: string;
  FullName: string;
  PhoneNumber?: string;
  Avatar?: string;
  IsDisabled: boolean;
  Forms?: FormPermission[];
  BranchList?: Branch[];
  UserSetting?: UserSettings;
  Roles?: Role[];
  Permissions?: Permission[];
}

export interface UserSettings {
  Theme?: SettingValue;
  IsCompactMenu?: SettingValue;
  IsCacheQuery?: SettingValue;
  PinnedForms?: SettingValue;
  [key: string]: SettingValue | undefined;
}

export interface SettingValue {
  Id: number;
  Code: string;
  Value: any;
  IDUser: number;
  Email: string;
}

export interface Branch {
  Id: number;
  Name: string;
  Code: string;
  Type?: string;
  ParentId?: number;
  IsDisabled: boolean;
  children?: Branch[];
}

export interface FormPermission {
  Id: number;
  Code: string;
  Name: string;
  Icon?: string;
  Color?: string;
  Sort?: number;
  IsHidden: boolean;
  IsDisabled: boolean;
  IsMobile: boolean;
  children?: FormPermission[];
}

// ===== PERMISSION & ROLE INTERFACES =====

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  conditions?: any;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

// ===== EXTERNAL AUTH INTERFACES =====

export interface OAuthProvider {
  name: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
  authUrl: string;
  tokenUrl: string;
}

export interface ExternalAuthResult {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

// ===== SECURITY INTERFACES =====

export interface SecurityContext {
  user: UserProfile;
  tenant?: Tenant;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  timestamp: Date;
}

export interface ThreatLevel {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  threats: ThreatType[];
  blocked: boolean;
}

export interface ThreatType {
  type: 'SQL_INJECTION' | 'XSS' | 'CSRF' | 'BRUTE_FORCE' | 'SUSPICIOUS_ACTIVITY';
  description: string;
  severity: number;
}

export interface SecurityEvent {
  id: string;
  userId?: string;
  eventType: SecurityEventType;
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata?: any;
}

export type SecurityEventType = 
  | 'LOGIN_SUCCESS' 
  | 'LOGIN_FAILED' 
  | 'LOGOUT' 
  | 'TOKEN_REFRESH' 
  | 'PERMISSION_DENIED' 
  | 'THREAT_DETECTED' 
  | 'SECURITY_POLICY_VIOLATION';

// ===== USER CONTEXT INTERFACES =====

export interface UserSession {
  id: string;
  userId: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  code: string;
  domain?: string;
  isActive: boolean;
  settings?: TenantSettings;
  features?: TenantFeature[];
}

export interface TenantSettings {
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  security?: {
    mfaRequired: boolean;
    sessionTimeout: number;
    passwordPolicy: PasswordPolicy;
  };
  [key: string]: any;
}

export interface TenantFeature {
  name: string;
  enabled: boolean;
  config?: any;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number; // days
}

// ===== AUTHENTICATION STATE INTERFACES =====

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: UserProfile;
  token?: TokenResponse;
  error?: string;
  lastActivity?: Date;
}

// ===== METHOD SIGNATURES =====

export interface IAuthenticationService {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  refreshToken(): Promise<TokenResponse>;
  validateToken(token: string): boolean;
  getAuthHeaders(): HttpHeaders;
  isAuthenticated(): boolean;
  getCurrentToken(): string | null;
  setToken(token: TokenResponse): Promise<void>;
  getAuthState(): Observable<AuthState>;
}

export interface IExternalAuthService {
  loginWithGoogle(): Promise<AuthResult>;
  loginWithFacebook(): Promise<AuthResult>;
  loginWithMicrosoft(): Promise<AuthResult>;
  loginWithApple(): Promise<AuthResult>;
  handleOAuthCallback(provider: string, code: string): Promise<AuthResult>;
  unlinkProvider(provider: string): Promise<void>;
  getLinkedProviders(): Promise<string[]>;
}

export interface ISecurityGatewayService {
  validateRequest(request: HttpRequest<any>): Promise<boolean>;
  enforceSecurityPolicies(context: SecurityContext): Promise<void>;
  detectThreats(request: HttpRequest<any>): Promise<ThreatLevel>;
  blockMaliciousRequest(request: HttpRequest<any>): void;
  logSecurityEvent(event: SecurityEvent): void;
  encryptSensitiveData(data: any): string;
  decryptSensitiveData(encryptedData: string): any;
}

export interface IUserProfileService {
  getProfile(forceReload?: boolean): Promise<UserProfile | null>;
  updateProfile(profile: Partial<UserProfile>): Promise<UserProfile>;
  getUserSettings(): Promise<UserSettings>;
  updateUserSettings(settings: Partial<UserSettings>): Promise<void>;
  getUserPermissions(): Promise<Permission[]>;
  hasPermission(permission: string): Promise<boolean>;
  getUserRoles(): Promise<Role[]>;
}

export interface IUserContextService {
  setCurrentUser(user: UserProfile): void;
  getCurrentUser(): Observable<UserProfile | null>;
  getUserTenant(): Observable<Tenant | null>;
  switchTenant(tenantId: string): Promise<void>;
  getUserRoles(): Observable<Role[]>;
  hasPermission(permission: string): Observable<boolean>;
  getCurrentSession(): Observable<UserSession | null>;
  updateSessionActivity(): void;
}
