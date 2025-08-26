# Flow hoàn chỉnh với các event nâng cao

```mermaid
sequenceDiagram
    participant AppComponent
    participant AuthenticationService
    participant UserProfileService
    participant UserContextService
    participant EnvService
    participant Component

    AppComponent->>AuthenticationService: kiểm tra token khi app start
    alt Có token
        AppComponent->>UserProfileService: lấy profile từ storage/server
        UserProfileService->>UserContextService: cập nhật user context
        UserContextService->>EnvService: cập nhật env.user, branch, tenant
        UserContextService->>EnvService: publishEvent('user:contextUpdated')
        EnvService->>Component: EventTracking nhận 'user:contextUpdated'
        Component->>Component: cập nhật UI (menu, branch, quyền, avatar...)
    else Không có token
        AppComponent->>Component: chuyển về màn hình đăng nhập
    end

    Note over AppComponent,AuthenticationService: Đăng nhập
    AppComponent->>AuthenticationService: login(username, password)
    AuthenticationService-->>AppComponent: trả về token
    AppComponent->>UserProfileService: lấy profile từ server
    UserProfileService->>UserContextService: cập nhật user context
    UserContextService->>EnvService: cập nhật env.user, branch, tenant
    UserContextService->>EnvService: publishEvent('user:contextUpdated')
    EnvService->>Component: EventTracking nhận 'user:contextUpdated'
    Component->>Component: cập nhật UI
    alt Lỗi đăng nhập
        AuthenticationService->>EnvService: publishEvent('user:loginFailed')
        EnvService->>Component: EventTracking nhận 'user:loginFailed'
        Component->>Component: hiển thị thông báo lỗi
    end

    Note over AppComponent,AuthenticationService: Đăng xuất
    AppComponent->>AuthenticationService: logout()
    AuthenticationService->>UserContextService: xóa token
    AppComponent->>UserProfileService: xóa profile
    UserProfileService->>UserContextService: cập nhật user context = null
    UserContextService->>EnvService: cập nhật env.user = null
    UserContextService->>EnvService: publishEvent('user:contextUpdated')
    EnvService->>Component: EventTracking nhận 'user:contextUpdated'
    Component->>Component: cập nhật UI về trạng thái chưa đăng nhập
    alt Đăng xuất từ xa/đa tab
        AuthenticationService->>EnvService: publishEvent('user:loggedOutRemote')
        EnvService->>Component: EventTracking nhận 'user:loggedOutRemote'
        Component->>Component: chuyển về màn hình đăng nhập
    end

    Note over UserContextService: Chuyển tenant/branch
    Component->>UserContextService: yêu cầu chuyển tenant/branch
    UserContextService->>EnvService: cập nhật env.tenant/env.branch
    UserContextService->>EnvService: publishEvent('tenant:switched')
    EnvService->>Component: EventTracking nhận 'tenant:switched'
    Component->>Component: cập nhật UI theo tenant/branch mới

    Note over UserProfileService: Cập nhật quyền/role động
    UserProfileService->>UserContextService: quyền/role thay đổi
    UserContextService->>EnvService: publishEvent('user:permissionsUpdated')
    EnvService->>Component: EventTracking nhận 'user:permissionsUpdated'
    Component->>Component: cập nhật UI quyền/role

    Note over UserProfileService: Cập nhật thông tin user động
    UserProfileService->>UserContextService: thông tin user thay đổi
    UserContextService->>EnvService: publishEvent('user:profileUpdated')
    EnvService->>Component: EventTracking nhận 'user:profileUpdated'
    Component->>Component: cập nhật UI thông tin user

    Note over AuthenticationService: Session hết hạn
    AuthenticationService->>EnvService: publishEvent('user:sessionExpired')
    EnvService->>Component: EventTracking nhận 'user:sessionExpired'
    Component->>Component: chuyển về màn hình đăng nhập

    Note over AuthenticationService: Xác thực 2 bước
    AuthenticationService->>EnvService: publishEvent('user:mfaRequired')
    EnvService->>Component: EventTracking nhận 'user:mfaRequired'
    Component->>Component: hiển thị UI xác thực 2 bước

    Note over Component: Đồng bộ đa tab/thiết bị
    AuthenticationService->>EnvService: publishEvent('user:stateChangedRemote')
    EnvService->>Component: EventTracking nhận 'user:stateChangedRemote'
    Component->>Component: cập nhật UI đồng bộ
```

# Bổ sung event và luồng nâng cao

- Event cho quyền/role động, cập nhật thông tin user, session hết hạn, xác thực 2 bước, đồng bộ đa tab/thiết bị, chuyển tenant/branch.
- Component luôn subscribe các event này để cập nhật UI đúng trạng thái.
- Đảm bảo đồng bộ đa tab, đa thiết bị, realtime UI.
