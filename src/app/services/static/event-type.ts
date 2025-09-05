/**
 * Event Codes Constants
 * Centralized definition of all application events
 */

export const EVENT_TYPE = {
	// ===== TENANT & BRANCH EVENTS =====
	TENANT: {
		SWITCHED: 'tenant:switched',
		BRANCH_SWITCHED: 'branch:switched',
	},

	// ===== USER AUTHENTICATION EVENTS =====
	USER: {
		CONTEXT_UPDATED: 'user:contextUpdated',
		LOGIN_FAILED: 'user:loginFailed',
		LOGGED_OUT_REMOTE: 'user:loggedOutRemote',
		SESSION_EXPIRED: 'user:sessionExpired',
		MFA_REQUIRED: 'user:mfaRequired',
		STATE_CHANGED_REMOTE: 'user:stateChangedRemote',
		AUTH_ERROR: 'user:authError',
		ACCESS_DENIED: 'user:accessDenied',
		RATE_LIMITED: 'user:rateLimited',
		PROFILE_UPDATED: 'user:profileUpdated',
		PERMISSIONS_UPDATED: 'user:permissionsUpdated',
		ROLES_UPDATED: 'user:rolesUpdated',
		LOGOUT_REQUESTED: 'user:logoutRequested',
	},

	// ===== APPLICATION EVENTS =====
	APP: {
		ENVIRONMENT_READY: 'app:environmentReady',
		LOADED_LOCAL_DATA: 'app:loadedLocalData',
		CHANGE_LANGUAGE: 'app:changeLanguage',
		FORCE_UPDATE_MOBILEAPP: 'app:ForceUpdate',
		CONNECT_FAIL: 'app:ConnectFail',
		SHOW_APP_MESSAGE: 'app:ShowAppMessage',
		SHOW_MENU: 'app:ShowMenu',
		SHOW_HELP: 'app:ShowHelp',
		NOTIFICATION: 'app:notification',
		VIEW_DID_ENTER: 'app:ViewDidEnter',
		AUTO_CALCULATE_LINK: 'app:autoCalculateLink',
		CLOSE_POP_LIST_TOOLBAR: 'app:closePopListToolBar',
		NETWORK_STATUS_CHANGE: 'app:networkStatusChange',
		CHANGE_THEME: 'app:ChangeTheme',
	},

	// ===== AUTHENTICATION EVENTS =====
	AUTH: {
		LOGOUT: 'auth:logout',
	},

	// ===== POS EVENTS =====
	POS: {
		ORDER_PAYMENT_UPDATE: 'app:POSOrderPaymentUpdate',
		ORDER_FROM_CUSTOMER: 'app:POSOrderFromCustomer',
		ORDER_FROM_STAFF: 'app:POSOrderFromStaff',
		SUPPORT: 'app:POSSupport',
		CALL_TO_PAY: 'app:POSCallToPay',
		LOCK_ORDER_FROM_STAFF: 'app:POSLockOrderFromStaff',
		LOCK_ORDER_FROM_CUSTOMER: 'app:POSLockOrderFromCustomer',
		UNLOCK_ORDER_FROM_STAFF: 'app:POSUnlockOrderFromStaff',
		UNLOCK_ORDER_FROM_CUSTOMER: 'app:POSUnlockOrderFromCustomer',
		LOCK_ORDER: 'app:POSLockOrder',
		UNLOCK_ORDER: 'app:POSUnlockOrder',
		ORDER_SPLITTED: 'app:POSOrderSplittedFromStaff',
		ORDER_MERGED: 'app:POSOrderMergedFromStaff',
		NOTIFY_SPLITTED_ORDER_FROM_STAFF: 'app:notifySplittedOrderFromStaff',
	},

	// ===== SALE ORDER EVENTS =====
	SALE: {
		PAYMENT_UPDATE: 'app:SOPaymentUpdate',
		ORDERS_UPDATED: 'app:update-sale-order-mobile',
	},

	// ===== SYSTEM EVENTS =====
	SYSTEM: {
		MESSAGE: 'SystemMessage',
		ALERT: 'SystemAlert',
		RELOAD: 'AppReload',
		RELOAD_OLD_VERSION: 'AppReloadOldVersion',
	},
};
