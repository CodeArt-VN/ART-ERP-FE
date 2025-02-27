//------------------------------------------------------------------------------
// 
//    www.codeart.vn
//    hungvq@live.com
//    (+84)908.061.119
// 
//------------------------------------------------------------------------------

import { environment } from 'src/environments/environment';
import { ApiSetting } from './api-setting';

export var APIListBase = {
    ACCOUNT: {
        register: {
            method: "POST",
            url: "Account/Register"
        },
        registerFB: {
            method: "POST",
            url: "Account/RegisterExternal"
        },
        token: {
            method: "POST",
            url: "token"
        },
        forgotPassword: {
            method: "POST",
            url: "Account/ForgotPassword"
        },
        getUserData: {
            method: "GET",
            url: "Account/UserInfo"
        },
        postUserData: {
            method: "POST",
            url: ""
        },
        getExternalLogins: {
            method: "GET",
            url: "Account/ExternalLogins?returnUrl=/BOOKING/login&generateState=true"
        },
        getObtainLocalAccessToken: {
            method: "GET",
            url: "Account/ObtainLocalAccessToken"
        },
    },



	AC_APInvoice:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/APInvoice/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/APInvoice"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/APInvoice/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/APInvoice/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/APInvoice/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoice/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoice/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoice/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/APInvoice"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/APInvoice/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/APInvoice/" + id} 
        }
		
	},

	AC_APInvoiceDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/APInvoiceDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/APInvoiceDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/APInvoiceDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/APInvoiceDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/APInvoiceDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoiceDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoiceDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/APInvoiceDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/APInvoiceDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/APInvoiceDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/APInvoiceDetail/" + id} 
        }
		
	},

	AC_ARInvoice:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/ARInvoice/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/ARInvoice"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/ARInvoice/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/ARInvoice/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/ARInvoice/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoice/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoice/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoice/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/ARInvoice"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/ARInvoice/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/ARInvoice/" + id} 
        }
		
	},

	AC_ARInvoiceContent:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceContent/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceContent"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/ARInvoiceContent/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/ARInvoiceContent/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/ARInvoiceContent/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceContent/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceContent/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceContent/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/ARInvoiceContent"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/ARInvoiceContent/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/ARInvoiceContent/" + id} 
        }
		
	},

	AC_ARInvoiceDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/ARInvoiceDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/ARInvoiceDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/ARInvoiceDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/ARInvoiceDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/ARInvoiceDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/ARInvoiceDetail/" + id} 
        }
		
	},

	AC_ARInvoiceSODetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceSODetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/ARInvoiceSODetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/ARInvoiceSODetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/ARInvoiceSODetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/ARInvoiceSODetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceSODetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceSODetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/ARInvoiceSODetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/ARInvoiceSODetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/ARInvoiceSODetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/ARInvoiceSODetail/" + id} 
        }
		
	},

	AC_Case:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/Case/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/Case"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/Case/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/Case/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/Case/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/Case/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/Case/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/Case/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/Case"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/Case/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/Case/" + id} 
        }
		
	},

	AC_JournalEntry:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/JournalEntry/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/JournalEntry"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/JournalEntry/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/JournalEntry/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/JournalEntry/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntry/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntry/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntry/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/JournalEntry"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/JournalEntry/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/JournalEntry/" + id} 
        }
		
	},

	AC_JournalEntryRow:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/JournalEntryRow/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/JournalEntryRow"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/JournalEntryRow/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/JournalEntryRow/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/JournalEntryRow/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntryRow/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntryRow/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/JournalEntryRow/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/JournalEntryRow"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/JournalEntryRow/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/JournalEntryRow/" + id} 
        }
		
	},

	AC_PeriodCategory:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/PeriodCategory/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/PeriodCategory"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/PeriodCategory/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/PeriodCategory/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/PeriodCategory/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/PeriodCategory/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/PeriodCategory/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/PeriodCategory/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/PeriodCategory"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/PeriodCategory/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/PeriodCategory/" + id} 
        }
		
	},

	AC_PostingPeriod:{
        getSearchList:{
            method: "GET",
            url: function(){return "AC/PostingPeriod/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "AC/PostingPeriod"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "AC/PostingPeriod/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "AC/PostingPeriod/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "AC/PostingPeriod/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "AC/PostingPeriod/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "AC/PostingPeriod/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "AC/PostingPeriod/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "AC/PostingPeriod"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "AC/PostingPeriod/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "AC/PostingPeriod/" + id} 
        }
		
	},

	APPROVAL_ApprovalRule:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/ApprovalRule/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/ApprovalRule"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/ApprovalRule/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/ApprovalRule/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/ApprovalRule/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRule/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRule/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRule/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/ApprovalRule"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/ApprovalRule/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/ApprovalRule/" + id} 
        }
		
	},

	APPROVAL_ApprovalRuleApprover:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/ApprovalRuleApprover/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/ApprovalRuleApprover"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/ApprovalRuleApprover/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/ApprovalRuleApprover/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/ApprovalRuleApprover/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRuleApprover/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRuleApprover/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/ApprovalRuleApprover/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/ApprovalRuleApprover"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/ApprovalRuleApprover/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/ApprovalRuleApprover/" + id} 
        }
		
	},

	APPROVAL_Changelog:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/Changelog/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/Changelog"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/Changelog/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/Changelog/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/Changelog/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Changelog/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Changelog/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Changelog/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/Changelog"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/Changelog/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/Changelog/" + id} 
        }
		
	},

	APPROVAL_Comment:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/Comment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/Comment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/Comment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/Comment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/Comment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Comment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Comment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Comment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/Comment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/Comment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/Comment/" + id} 
        }
		
	},

	APPROVAL_Request:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/Request/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/Request"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/Request/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/Request/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/Request/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Request/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Request/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Request/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/Request"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/Request/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/Request/" + id} 
        }
		
	},

	APPROVAL_RequestApprover:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/RequestApprover/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/RequestApprover"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/RequestApprover/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/RequestApprover/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/RequestApprover/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/RequestApprover/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/RequestApprover/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/RequestApprover/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/RequestApprover"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/RequestApprover/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/RequestApprover/" + id} 
        }
		
	},

	APPROVAL_Template:{
        getSearchList:{
            method: "GET",
            url: function(){return "APPROVAL/Template/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "APPROVAL/Template"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "APPROVAL/Template/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "APPROVAL/Template/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "APPROVAL/Template/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Template/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Template/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "APPROVAL/Template/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "APPROVAL/Template"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "APPROVAL/Template/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "APPROVAL/Template/" + id} 
        }
		
	},

	BANK_Account:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/Account/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/Account"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/Account/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/Account/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/Account/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/Account/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/Account/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/Account/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/Account"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/Account/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/Account/" + id} 
        }
		
	},

	BANK_IncomingPayment:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/IncomingPayment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/IncomingPayment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/IncomingPayment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/IncomingPayment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/IncomingPayment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPayment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPayment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPayment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/IncomingPayment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/IncomingPayment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/IncomingPayment/" + id} 
        }
		
	},

	BANK_IncomingPaymentDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/IncomingPaymentDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/IncomingPaymentDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/IncomingPaymentDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/IncomingPaymentDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/IncomingPaymentDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPaymentDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPaymentDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/IncomingPaymentDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/IncomingPaymentDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/IncomingPaymentDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/IncomingPaymentDetail/" + id} 
        }
		
	},

	BANK_OutgoingPayment:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/OutgoingPayment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/OutgoingPayment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/OutgoingPayment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/OutgoingPayment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/OutgoingPayment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPayment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPayment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPayment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/OutgoingPayment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/OutgoingPayment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/OutgoingPayment/" + id} 
        }
		
	},

	BANK_OutgoingPaymentDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/OutgoingPaymentDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/OutgoingPaymentDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/OutgoingPaymentDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/OutgoingPaymentDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/OutgoingPaymentDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPaymentDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPaymentDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/OutgoingPaymentDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/OutgoingPaymentDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/OutgoingPaymentDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/OutgoingPaymentDetail/" + id} 
        }
		
	},

	BANK_PaymentTerm:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/PaymentTerm/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/PaymentTerm"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/PaymentTerm/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/PaymentTerm/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/PaymentTerm/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/PaymentTerm/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/PaymentTerm/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/PaymentTerm/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/PaymentTerm"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/PaymentTerm/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/PaymentTerm/" + id} 
        }
		
	},

	BANK_StatementMatchingCriteria:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/StatementMatchingCriteria/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/StatementMatchingCriteria"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/StatementMatchingCriteria/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/StatementMatchingCriteria/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/StatementMatchingCriteria/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/StatementMatchingCriteria/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/StatementMatchingCriteria/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/StatementMatchingCriteria/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/StatementMatchingCriteria"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/StatementMatchingCriteria/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/StatementMatchingCriteria/" + id} 
        }
		
	},

	BANK_Transaction:{
        getSearchList:{
            method: "GET",
            url: function(){return "BANK/Transaction/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BANK/Transaction"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BANK/Transaction/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BANK/Transaction/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BANK/Transaction/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BANK/Transaction/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BANK/Transaction/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BANK/Transaction/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BANK/Transaction"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BANK/Transaction/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BANK/Transaction/" + id} 
        }
		
	},

	BC_RevenueExpenditureComponent:{
        getSearchList:{
            method: "GET",
            url: function(){return "BC/RevenueExpenditureComponent/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BC/RevenueExpenditureComponent"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BC/RevenueExpenditureComponent/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BC/RevenueExpenditureComponent/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BC/RevenueExpenditureComponent/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureComponent/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureComponent/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureComponent/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BC/RevenueExpenditureComponent"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BC/RevenueExpenditureComponent/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BC/RevenueExpenditureComponent/" + id} 
        }
		
	},

	BC_RevenueExpenditureRefCode:{
        getSearchList:{
            method: "GET",
            url: function(){return "BC/RevenueExpenditureRefCode/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BC/RevenueExpenditureRefCode"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BC/RevenueExpenditureRefCode/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BC/RevenueExpenditureRefCode/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BC/RevenueExpenditureRefCode/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureRefCode/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureRefCode/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BC/RevenueExpenditureRefCode/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BC/RevenueExpenditureRefCode"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BC/RevenueExpenditureRefCode/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BC/RevenueExpenditureRefCode/" + id} 
        }
		
	},

	BI_CSVData:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/CSVData/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/CSVData"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/CSVData/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/CSVData/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/CSVData/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/CSVData/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/CSVData/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/CSVData/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/CSVData"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/CSVData/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/CSVData/" + id} 
        }
		
	},

	BI_Daily_Balance:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/Balance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/Balance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/Balance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/Balance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/Balance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Balance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Balance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Balance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/Balance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/Balance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/Balance/" + id} 
        }
		
	},

	BI_Daily_Debt:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/Debt/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/Debt"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/Debt/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/Debt/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/Debt/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Debt/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Debt/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Debt/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/Debt"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/Debt/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/Debt/" + id} 
        }
		
	},

	BI_Daily_General:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/General/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/General"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/General/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/General/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/General/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/General/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/General/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/General/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/General"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/General/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/General/" + id} 
        }
		
	},

	BI_Daily_Revenue:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/Revenue/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/Revenue"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/Revenue/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/Revenue/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/Revenue/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Revenue/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Revenue/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/Revenue/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/Revenue"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/Revenue/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/Revenue/" + id} 
        }
		
	},

	BI_Daily_RevenueExpenditure1:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/RevenueExpenditure1/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/RevenueExpenditure1"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/RevenueExpenditure1/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/RevenueExpenditure1/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/RevenueExpenditure1/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure1/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure1/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure1/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/RevenueExpenditure1"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/RevenueExpenditure1/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/RevenueExpenditure1/" + id} 
        }
		
	},

	BI_Daily_RevenueExpenditure2:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Daily/RevenueExpenditure2/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Daily/RevenueExpenditure2"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Daily/RevenueExpenditure2/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Daily/RevenueExpenditure2/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Daily/RevenueExpenditure2/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure2/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure2/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Daily/RevenueExpenditure2/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Daily/RevenueExpenditure2"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Daily/RevenueExpenditure2/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Daily/RevenueExpenditure2/" + id} 
        }
		
	},

	BI_Dashboard:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Dashboard/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Dashboard"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Dashboard/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Dashboard/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Dashboard/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Dashboard/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Dashboard/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Dashboard/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Dashboard"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Dashboard/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Dashboard/" + id} 
        }
		
	},

	BI_DashboardDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/DashboardDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/DashboardDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/DashboardDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/DashboardDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/DashboardDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/DashboardDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/DashboardDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/DashboardDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/DashboardDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/DashboardDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/DashboardDetail/" + id} 
        }
		
	},

	BI_Finance_BalanceSheetCategory:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Finance/BalanceSheetCategory/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Finance/BalanceSheetCategory"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Finance/BalanceSheetCategory/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Finance/BalanceSheetCategory/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Finance/BalanceSheetCategory/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheetCategory/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheetCategory/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheetCategory/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Finance/BalanceSheetCategory"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Finance/BalanceSheetCategory/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Finance/BalanceSheetCategory/" + id} 
        }
		
	},

	BI_Finance_BalanceSheets:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Finance/BalanceSheets/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Finance/BalanceSheets"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Finance/BalanceSheets/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Finance/BalanceSheets/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Finance/BalanceSheets/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheets/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheets/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/BalanceSheets/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Finance/BalanceSheets"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Finance/BalanceSheets/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Finance/BalanceSheets/" + id} 
        }
		
	},

	BI_Finance_CashFlow:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Finance/CashFlow/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Finance/CashFlow"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Finance/CashFlow/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Finance/CashFlow/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Finance/CashFlow/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/CashFlow/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/CashFlow/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/CashFlow/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Finance/CashFlow"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Finance/CashFlow/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Finance/CashFlow/" + id} 
        }
		
	},

	BI_Finance_IncomeStatement:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Finance/IncomeStatement/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Finance/IncomeStatement"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Finance/IncomeStatement/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Finance/IncomeStatement/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Finance/IncomeStatement/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/IncomeStatement/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/IncomeStatement/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/IncomeStatement/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Finance/IncomeStatement"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Finance/IncomeStatement/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Finance/IncomeStatement/" + id} 
        }
		
	},

	BI_Finance_Management:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Finance/Management/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Finance/Management"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Finance/Management/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Finance/Management/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Finance/Management/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/Management/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/Management/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Finance/Management/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Finance/Management"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Finance/Management/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Finance/Management/" + id} 
        }
		
	},

	BI_HRM_PayrollPerBranch:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/HRM/PayrollPerBranch/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/HRM/PayrollPerBranch"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/HRM/PayrollPerBranch/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/HRM/PayrollPerBranch/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/HRM/PayrollPerBranch/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/HRM/PayrollPerBranch/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/HRM/PayrollPerBranch/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/HRM/PayrollPerBranch/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/HRM/PayrollPerBranch"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/HRM/PayrollPerBranch/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/HRM/PayrollPerBranch/" + id} 
        }
		
	},

	BI_Operating_MarketResearch:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Operating/MarketResearch/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Operating/MarketResearch"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Operating/MarketResearch/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Operating/MarketResearch/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Operating/MarketResearch/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Operating/MarketResearch/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Operating/MarketResearch/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Operating/MarketResearch/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Operating/MarketResearch"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Operating/MarketResearch/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Operating/MarketResearch/" + id} 
        }
		
	},

	BI_Oppotunity:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Oppotunity/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Oppotunity"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Oppotunity/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Oppotunity/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Oppotunity/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Oppotunity/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Oppotunity/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Oppotunity/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Oppotunity"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Oppotunity/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Oppotunity/" + id} 
        }
		
	},

	BI_Report:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/Report/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/Report"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/Report/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/Report/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/Report/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/Report/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/Report/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/Report/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/Report"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/Report/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/Report/" + id} 
        }
		
	},

	BI_ReportTemplate:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/ReportTemplate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/ReportTemplate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/ReportTemplate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/ReportTemplate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/ReportTemplate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/ReportTemplate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/ReportTemplate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/ReportTemplate/" + id} 
        }
		
	},

	BI_ReportTemplateDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "BI/ReportTemplateDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BI/ReportTemplateDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BI/ReportTemplateDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BI/ReportTemplateDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BI/ReportTemplateDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplateDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplateDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BI/ReportTemplateDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BI/ReportTemplateDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BI/ReportTemplateDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BI/ReportTemplateDetail/" + id} 
        }
		
	},

	BP_Partner:{
        getSearchList:{
            method: "GET",
            url: function(){return "BP/Partner/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BP/Partner"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BP/Partner/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BP/Partner/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BP/Partner/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BP/Partner/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BP/Partner/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BP/Partner/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BP/Partner"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BP/Partner/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BP/Partner/" + id} 
        }
		
	},

	BRA_Branch:{
        getSearchList:{
            method: "GET",
            url: function(){return "BRA/Branch/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BRA/Branch"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BRA/Branch/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BRA/Branch/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BRA/Branch/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BRA/Branch/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BRA/Branch/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BRA/Branch/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BRA/Branch"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BRA/Branch/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BRA/Branch/" + id} 
        }
		
	},

	BSC_RevenueTarget:{
        getSearchList:{
            method: "GET",
            url: function(){return "BSC/RevenueTarget/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "BSC/RevenueTarget"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "BSC/RevenueTarget/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "BSC/RevenueTarget/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "BSC/RevenueTarget/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "BSC/RevenueTarget/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "BSC/RevenueTarget/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "BSC/RevenueTarget/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "BSC/RevenueTarget"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "BSC/RevenueTarget/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "BSC/RevenueTarget/" + id} 
        }
		
	},

	CRM_Activity:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Activity/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Activity"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Activity/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Activity/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Activity/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Activity/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Activity/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Activity/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Activity"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Activity/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Activity/" + id} 
        }
		
	},

	CRM_Attendance:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Attendance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Attendance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Attendance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Attendance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Attendance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Attendance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Attendance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Attendance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Attendance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Attendance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Attendance/" + id} 
        }
		
	},

	CRM_BusinessPartnerGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/BusinessPartnerGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/BusinessPartnerGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/BusinessPartnerGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/BusinessPartnerGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/BusinessPartnerGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/BusinessPartnerGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/BusinessPartnerGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/BusinessPartnerGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/BusinessPartnerGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/BusinessPartnerGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/BusinessPartnerGroup/" + id} 
        }
		
	},

	CRM_Campaign:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Campaign/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Campaign"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Campaign/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Campaign/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Campaign/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Campaign/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Campaign/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Campaign/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Campaign"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Campaign/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Campaign/" + id} 
        }
		
	},

	CRM_CampaignMember:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/CampaignMember/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/CampaignMember"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/CampaignMember/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/CampaignMember/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/CampaignMember/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/CampaignMember/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/CampaignMember/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/CampaignMember/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/CampaignMember"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/CampaignMember/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/CampaignMember/" + id} 
        }
		
	},

	CRM_Config:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Config/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Config"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Config/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Config/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Config/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Config/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Config/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Config/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Config"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Config/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Config/" + id} 
        }
		
	},

	CRM_Contact:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Contact/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Contact"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Contact/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Contact/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Contact/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Contact/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Contact/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Contact/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Contact"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Contact/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Contact/" + id} 
        }
		
	},

	CRM_ContactReference:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/ContactReference/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/ContactReference"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/ContactReference/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/ContactReference/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/ContactReference/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/ContactReference/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/ContactReference/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/ContactReference/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/ContactReference"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/ContactReference/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/ContactReference/" + id} 
        }
		
	},

	CRM_Contract:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Contract/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Contract"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Contract/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Contract/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Contract/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Contract/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Contract/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Contract/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Contract"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Contract/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Contract/" + id} 
        }
		
	},

	CRM_Customer:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Customer/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Customer"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Customer/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Customer/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Customer/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Customer/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Customer/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Customer/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Customer"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Customer/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Customer/" + id} 
        }
		
	},

	CRM_Lead:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Lead/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Lead"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Lead/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Lead/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Lead/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Lead/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Lead/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Lead/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Lead"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Lead/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Lead/" + id} 
        }
		
	},

	CRM_MemberCard:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/MemberCard/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/MemberCard"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/MemberCard/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/MemberCard/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/MemberCard/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/MemberCard/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/MemberCard/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/MemberCard/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/MemberCard"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/MemberCard/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/MemberCard/" + id} 
        }
		
	},

	CRM_Opportunity:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Opportunity/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Opportunity"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Opportunity/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Opportunity/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Opportunity/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Opportunity/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Opportunity/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Opportunity/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Opportunity"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Opportunity/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Opportunity/" + id} 
        }
		
	},

	CRM_Outlets:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Outlets/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Outlets"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Outlets/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Outlets/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Outlets/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Outlets/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Outlets/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Outlets/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Outlets"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Outlets/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Outlets/" + id} 
        }
		
	},

	CRM_PartnerAddress:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/PartnerAddress/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/PartnerAddress"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/PartnerAddress/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/PartnerAddress/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/PartnerAddress/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerAddress/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerAddress/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerAddress/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/PartnerAddress"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/PartnerAddress/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/PartnerAddress/" + id} 
        }
		
	},

	CRM_PartnerBankAccount:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/PartnerBankAccount/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/PartnerBankAccount"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/PartnerBankAccount/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/PartnerBankAccount/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/PartnerBankAccount/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerBankAccount/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerBankAccount/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerBankAccount/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/PartnerBankAccount"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/PartnerBankAccount/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/PartnerBankAccount/" + id} 
        }
		
	},

	CRM_PartnerTaxInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/PartnerTaxInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/PartnerTaxInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/PartnerTaxInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/PartnerTaxInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/PartnerTaxInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerTaxInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerTaxInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/PartnerTaxInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/PartnerTaxInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/PartnerTaxInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/PartnerTaxInfo/" + id} 
        }
		
	},

	CRM_PersonInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/PersonInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/PersonInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/PersonInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/PersonInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/PersonInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/PersonInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/PersonInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/PersonInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/PersonInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/PersonInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/PersonInfo/" + id} 
        }
		
	},

	CRM_Quotation:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Quotation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Quotation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Quotation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Quotation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Quotation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Quotation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Quotation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Quotation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Quotation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Quotation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Quotation/" + id} 
        }
		
	},

	CRM_Route:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Route/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Route"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Route/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Route/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Route/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Route/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Route/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Route/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Route"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Route/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Route/" + id} 
        }
		
	},

	CRM_RouteDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/RouteDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/RouteDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/RouteDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/RouteDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/RouteDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/RouteDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/RouteDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/RouteDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/RouteDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/RouteDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/RouteDetail/" + id} 
        }
		
	},

	CRM_Voucher:{
        getSearchList:{
            method: "GET",
            url: function(){return "CRM/Voucher/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "CRM/Voucher"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "CRM/Voucher/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "CRM/Voucher/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "CRM/Voucher/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "CRM/Voucher/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "CRM/Voucher/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "CRM/Voucher/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "CRM/Voucher"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "CRM/Voucher/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "CRM/Voucher/" + id} 
        }
		
	},

	DCM_Collection:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/Collection/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/Collection"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/Collection/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/Collection/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/Collection/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/Collection/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/Collection/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/Collection/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/Collection"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/Collection/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/Collection/" + id} 
        }
		
	},

	DCM_CollectionData:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/CollectionData/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/CollectionData"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/CollectionData/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/CollectionData/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/CollectionData/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionData/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionData/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionData/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/CollectionData"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/CollectionData/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/CollectionData/" + id} 
        }
		
	},

	DCM_CollectionDataComment:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/CollectionDataComment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/CollectionDataComment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/CollectionDataComment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/CollectionDataComment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/CollectionDataComment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataComment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataComment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataComment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/CollectionDataComment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/CollectionDataComment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/CollectionDataComment/" + id} 
        }
		
	},

	DCM_CollectionDataLog:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/CollectionDataLog/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/CollectionDataLog"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/CollectionDataLog/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/CollectionDataLog/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/CollectionDataLog/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataLog/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataLog/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/CollectionDataLog/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/CollectionDataLog"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/CollectionDataLog/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/CollectionDataLog/" + id} 
        }
		
	},

	DCM_Comment:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/Comment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/Comment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/Comment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/Comment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/Comment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/Comment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/Comment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/Comment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/Comment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/Comment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/Comment/" + id} 
        }
		
	},

	DCM_DataDictionary:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/DataDictionary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/DataDictionary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/DataDictionary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/DataDictionary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/DataDictionary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/DataDictionary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/DataDictionary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/DataDictionary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/DataDictionary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/DataDictionary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/DataDictionary/" + id} 
        }
		
	},

	DCM_DataType:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/DataType/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/DataType"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/DataType/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/DataType/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/DataType/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/DataType/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/DataType/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/DataType/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/DataType"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/DataType/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/DataType/" + id} 
        }
		
	},

	DCM_Page:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/Page/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/Page"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/Page/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/Page/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/Page/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/Page/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/Page/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/Page/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/Page"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/Page/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/Page/" + id} 
        }
		
	},

	DCM_Project:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/Project/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/Project"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/Project/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/Project/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/Project/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/Project/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/Project/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/Project/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/Project"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/Project/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/Project/" + id} 
        }
		
	},

	DCM_ProjectPerson:{
        getSearchList:{
            method: "GET",
            url: function(){return "DCM/ProjectPerson/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "DCM/ProjectPerson"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "DCM/ProjectPerson/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "DCM/ProjectPerson/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "DCM/ProjectPerson/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "DCM/ProjectPerson/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "DCM/ProjectPerson/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "DCM/ProjectPerson/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "DCM/ProjectPerson"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "DCM/ProjectPerson/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "DCM/ProjectPerson/" + id} 
        }
		
	},

	FINANCE_CostCenter:{
        getSearchList:{
            method: "GET",
            url: function(){return "FINANCE/CostCenter/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "FINANCE/CostCenter"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "FINANCE/CostCenter/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "FINANCE/CostCenter/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "FINANCE/CostCenter/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "FINANCE/CostCenter/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/CostCenter/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/CostCenter/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "FINANCE/CostCenter"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "FINANCE/CostCenter/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "FINANCE/CostCenter/" + id} 
        }
		
	},

	FINANCE_GeneralLedger:{
        getSearchList:{
            method: "GET",
            url: function(){return "FINANCE/GeneralLedger/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "FINANCE/GeneralLedger"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "FINANCE/GeneralLedger/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "FINANCE/GeneralLedger/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "FINANCE/GeneralLedger/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "FINANCE/GeneralLedger/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/GeneralLedger/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/GeneralLedger/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "FINANCE/GeneralLedger"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "FINANCE/GeneralLedger/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "FINANCE/GeneralLedger/" + id} 
        }
		
	},

	FINANCE_TaxDefinition:{
        getSearchList:{
            method: "GET",
            url: function(){return "FINANCE/TaxDefinition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "FINANCE/TaxDefinition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "FINANCE/TaxDefinition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "FINANCE/TaxDefinition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "FINANCE/TaxDefinition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "FINANCE/TaxDefinition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/TaxDefinition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "FINANCE/TaxDefinition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "FINANCE/TaxDefinition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "FINANCE/TaxDefinition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "FINANCE/TaxDefinition/" + id} 
        }
		
	},

	HRM_DeductionOnSalary:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/DeductionOnSalary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/DeductionOnSalary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/DeductionOnSalary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/DeductionOnSalary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/DeductionOnSalary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/DeductionOnSalary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/DeductionOnSalary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/DeductionOnSalary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/DeductionOnSalary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/DeductionOnSalary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/DeductionOnSalary/" + id} 
        }
		
	},

	HRM_OpenSchedule:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/OpenSchedule/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/OpenSchedule"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/OpenSchedule/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/OpenSchedule/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/OpenSchedule/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/OpenSchedule/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/OpenSchedule/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/OpenSchedule/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/OpenSchedule"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/OpenSchedule/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/OpenSchedule/" + id} 
        }
		
	},

	HRM_OvertimePolicy:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/OvertimePolicy/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/OvertimePolicy"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/OvertimePolicy/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/OvertimePolicy/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/OvertimePolicy/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/OvertimePolicy/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/OvertimePolicy/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/OvertimePolicy/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/OvertimePolicy"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/OvertimePolicy/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/OvertimePolicy/" + id} 
        }
		
	},

	HRM_PayrollElement:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PayrollElement/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PayrollElement"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PayrollElement/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PayrollElement/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PayrollElement/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollElement/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollElement/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollElement/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PayrollElement"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PayrollElement/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PayrollElement/" + id} 
        }
		
	},

	HRM_PayrollPaySheetMaster:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PayrollPaySheetMaster/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PayrollPaySheetMaster"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PayrollPaySheetMaster/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PayrollPaySheetMaster/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PayrollPaySheetMaster/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMaster/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMaster/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMaster/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PayrollPaySheetMaster"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PayrollPaySheetMaster/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PayrollPaySheetMaster/" + id} 
        }
		
	},

	HRM_PayrollPaySheetMasterSalaryDecision:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PayrollPaySheetMasterSalaryDecision/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMasterSalaryDecision/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMasterSalaryDecision/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PayrollPaySheetMasterSalaryDecision/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PayrollPaySheetMasterSalaryDecision/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PayrollPaySheetMasterSalaryDecision/" + id} 
        }
		
	},

	HRM_PersonalIncomePaymentProcess:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PersonalIncomePaymentProcess/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PersonalIncomePaymentProcess"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PersonalIncomePaymentProcess/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PersonalIncomePaymentProcess/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PersonalIncomePaymentProcess/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PersonalIncomePaymentProcess/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PersonalIncomePaymentProcess/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PersonalIncomePaymentProcess/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PersonalIncomePaymentProcess"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PersonalIncomePaymentProcess/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PersonalIncomePaymentProcess/" + id} 
        }
		
	},

	HRM_PolAllowance:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolAllowance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolAllowance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolAllowance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolAllowance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolAllowance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolAllowance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolAllowance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolAllowance/" + id} 
        }
		
	},

	HRM_PolAllowanceApplyFor:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolAllowanceApplyFor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolAllowanceApplyFor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolAllowanceApplyFor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolAllowanceApplyFor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolAllowanceApplyFor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowanceApplyFor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowanceApplyFor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolAllowanceApplyFor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolAllowanceApplyFor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolAllowanceApplyFor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolAllowanceApplyFor/" + id} 
        }
		
	},

	HRM_PolCompulsoryInsurance:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolCompulsoryInsurance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolCompulsoryInsurance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolCompulsoryInsurance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolCompulsoryInsurance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolCompulsoryInsurance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsurance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsurance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsurance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolCompulsoryInsurance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolCompulsoryInsurance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolCompulsoryInsurance/" + id} 
        }
		
	},

	HRM_PolCompulsoryInsuranceApplyFor:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolCompulsoryInsuranceApplyFor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsuranceApplyFor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsuranceApplyFor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolCompulsoryInsuranceApplyFor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolCompulsoryInsuranceApplyFor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolCompulsoryInsuranceApplyFor/" + id} 
        }
		
	},

	HRM_PolicyHoliday:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolicyHoliday/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolicyHoliday"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolicyHoliday/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolicyHoliday/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolicyHoliday/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyHoliday/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyHoliday/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyHoliday/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolicyHoliday"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolicyHoliday/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolicyHoliday/" + id} 
        }
		
	},

	HRM_PolicyPaidTimeOff:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolicyPaidTimeOff/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolicyPaidTimeOff"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolicyPaidTimeOff/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolicyPaidTimeOff/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolicyPaidTimeOff/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOff/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOff/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOff/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolicyPaidTimeOff"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolicyPaidTimeOff/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolicyPaidTimeOff/" + id} 
        }
		
	},

	HRM_PolicyPaidTimeOffGrantsByLengthOfServices:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolicyPaidTimeOffGrantsByLengthOfServices/" + id} 
        }
		
	},

	HRM_PolWelfare:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolWelfare/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolWelfare"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolWelfare/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolWelfare/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolWelfare/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfare/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfare/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfare/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolWelfare"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolWelfare/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolWelfare/" + id} 
        }
		
	},

	HRM_PolWelfareApplyFor:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/PolWelfareApplyFor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/PolWelfareApplyFor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/PolWelfareApplyFor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/PolWelfareApplyFor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/PolWelfareApplyFor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfareApplyFor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfareApplyFor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/PolWelfareApplyFor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/PolWelfareApplyFor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/PolWelfareApplyFor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/PolWelfareApplyFor/" + id} 
        }
		
	},

	HRM_Shift:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/Shift/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/Shift"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/Shift/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/Shift/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/Shift/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/Shift/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/Shift/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/Shift/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/Shift"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/Shift/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/Shift/" + id} 
        }
		
	},

	HRM_ShiftInTimesheet:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/ShiftInTimesheet/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/ShiftInTimesheet"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/ShiftInTimesheet/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/ShiftInTimesheet/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/ShiftInTimesheet/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/ShiftInTimesheet/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/ShiftInTimesheet/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/ShiftInTimesheet/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/ShiftInTimesheet"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/ShiftInTimesheet/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/ShiftInTimesheet/" + id} 
        }
		
	},

	HRM_Staff:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/Staff/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/Staff"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/Staff/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/Staff/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/Staff/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/Staff"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/Staff/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/Staff/" + id} 
        }
		
	},

	HRM_Staff_CLApproval:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/Staff/CLApproval/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/Staff/CLApproval"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/Staff/CLApproval/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/Staff/CLApproval/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/Staff/CLApproval/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/CLApproval/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/CLApproval/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/CLApproval/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/Staff/CLApproval"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/Staff/CLApproval/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/Staff/CLApproval/" + id} 
        }
		
	},

	HRM_Staff_ConcurrentPosition:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/Staff/ConcurrentPosition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/Staff/ConcurrentPosition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/Staff/ConcurrentPosition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/Staff/ConcurrentPosition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/Staff/ConcurrentPosition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/ConcurrentPosition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/ConcurrentPosition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/Staff/ConcurrentPosition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/Staff/ConcurrentPosition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/Staff/ConcurrentPosition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/Staff/ConcurrentPosition/" + id} 
        }
		
	},

	HRM_StaffAcademicLevel:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffAcademicLevel/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffAcademicLevel"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffAcademicLevel/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffAcademicLevel/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffAcademicLevel/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAcademicLevel/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAcademicLevel/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAcademicLevel/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffAcademicLevel"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffAcademicLevel/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffAcademicLevel/" + id} 
        }
		
	},

	HRM_StaffAddress:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffAddress/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffAddress"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffAddress/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffAddress/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffAddress/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAddress/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAddress/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAddress/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffAddress"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffAddress/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffAddress/" + id} 
        }
		
	},

	HRM_StaffAllowance:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffAllowance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffAllowance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffAllowance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffAllowance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffAllowance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAllowance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAllowance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAllowance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffAllowance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffAllowance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffAllowance/" + id} 
        }
		
	},

	HRM_StaffAnotherSkill:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffAnotherSkill/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffAnotherSkill"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffAnotherSkill/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffAnotherSkill/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffAnotherSkill/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAnotherSkill/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAnotherSkill/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAnotherSkill/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffAnotherSkill"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffAnotherSkill/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffAnotherSkill/" + id} 
        }
		
	},

	HRM_StaffAppointDecision:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffAppointDecision/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffAppointDecision"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffAppointDecision/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffAppointDecision/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffAppointDecision/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAppointDecision/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAppointDecision/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffAppointDecision/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffAppointDecision"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffAppointDecision/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffAppointDecision/" + id} 
        }
		
	},

	HRM_StaffBank:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffBank/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffBank"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffBank/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffBank/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffBank/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBank/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBank/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBank/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffBank"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffBank/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffBank/" + id} 
        }
		
	},

	HRM_StaffBasicInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffBasicInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffBasicInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffBasicInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffBasicInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffBasicInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBasicInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBasicInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBasicInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffBasicInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffBasicInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffBasicInfo/" + id} 
        }
		
	},

	HRM_StaffBounusOnSalary:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffBounusOnSalary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffBounusOnSalary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffBounusOnSalary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffBounusOnSalary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffBounusOnSalary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBounusOnSalary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBounusOnSalary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffBounusOnSalary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffBounusOnSalary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffBounusOnSalary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffBounusOnSalary/" + id} 
        }
		
	},

	HRM_StaffCompulsoryInsurance:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffCompulsoryInsurance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffCompulsoryInsurance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffCompulsoryInsurance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffCompulsoryInsurance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffCompulsoryInsurance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCompulsoryInsurance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCompulsoryInsurance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCompulsoryInsurance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffCompulsoryInsurance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffCompulsoryInsurance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffCompulsoryInsurance/" + id} 
        }
		
	},

	HRM_StaffConcurrentPosition:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffConcurrentPosition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffConcurrentPosition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffConcurrentPosition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffConcurrentPosition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffConcurrentPosition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentPosition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentPosition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentPosition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffConcurrentPosition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffConcurrentPosition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffConcurrentPosition/" + id} 
        }
		
	},

	HRM_StaffConcurrentProbationryPosition:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffConcurrentProbationryPosition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffConcurrentProbationryPosition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffConcurrentProbationryPosition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffConcurrentProbationryPosition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffConcurrentProbationryPosition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentProbationryPosition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentProbationryPosition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffConcurrentProbationryPosition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffConcurrentProbationryPosition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffConcurrentProbationryPosition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffConcurrentProbationryPosition/" + id} 
        }
		
	},

	HRM_StaffCurrentWorking:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffCurrentWorking/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffCurrentWorking"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffCurrentWorking/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffCurrentWorking/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffCurrentWorking/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCurrentWorking/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCurrentWorking/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffCurrentWorking/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffCurrentWorking"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffCurrentWorking/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffCurrentWorking/" + id} 
        }
		
	},

	HRM_StaffDeductionOnSalary:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffDeductionOnSalary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffDeductionOnSalary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffDeductionOnSalary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffDeductionOnSalary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffDeductionOnSalary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffDeductionOnSalary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffDeductionOnSalary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffDeductionOnSalary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffDeductionOnSalary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffDeductionOnSalary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffDeductionOnSalary/" + id} 
        }
		
	},

	HRM_StaffFamily:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffFamily/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffFamily"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffFamily/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffFamily/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffFamily/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffFamily/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffFamily/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffFamily/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffFamily"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffFamily/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffFamily/" + id} 
        }
		
	},

	HRM_StaffForeignLanguage:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffForeignLanguage/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffForeignLanguage"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffForeignLanguage/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffForeignLanguage/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffForeignLanguage/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffForeignLanguage/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffForeignLanguage/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffForeignLanguage/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffForeignLanguage"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffForeignLanguage/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffForeignLanguage/" + id} 
        }
		
	},

	HRM_StaffIdentityCardAndPIT:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffIdentityCardAndPIT/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffIdentityCardAndPIT"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffIdentityCardAndPIT/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffIdentityCardAndPIT/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffIdentityCardAndPIT/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffIdentityCardAndPIT/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffIdentityCardAndPIT/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffIdentityCardAndPIT/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffIdentityCardAndPIT"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffIdentityCardAndPIT/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffIdentityCardAndPIT/" + id} 
        }
		
	},

	HRM_StaffInsurancePaymentProcess:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffInsurancePaymentProcess/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffInsurancePaymentProcess"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffInsurancePaymentProcess/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffInsurancePaymentProcess/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffInsurancePaymentProcess/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInsurancePaymentProcess/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInsurancePaymentProcess/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInsurancePaymentProcess/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffInsurancePaymentProcess"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffInsurancePaymentProcess/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffInsurancePaymentProcess/" + id} 
        }
		
	},

	HRM_StaffInternetAccount:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffInternetAccount/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffInternetAccount"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffInternetAccount/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffInternetAccount/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffInternetAccount/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInternetAccount/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInternetAccount/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffInternetAccount/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffInternetAccount"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffInternetAccount/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffInternetAccount/" + id} 
        }
		
	},

	HRM_StaffLaborContract:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffLaborContract/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffLaborContract"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffLaborContract/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffLaborContract/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffLaborContract/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLaborContract/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLaborContract/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLaborContract/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffLaborContract"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffLaborContract/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffLaborContract/" + id} 
        }
		
	},

	HRM_StaffLearningProcess:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffLearningProcess/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffLearningProcess"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffLearningProcess/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffLearningProcess/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffLearningProcess/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLearningProcess/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLearningProcess/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffLearningProcess/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffLearningProcess"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffLearningProcess/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffLearningProcess/" + id} 
        }
		
	},

	HRM_StaffPhone:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffPhone/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffPhone"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffPhone/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffPhone/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffPhone/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPhone/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPhone/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPhone/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffPhone"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffPhone/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffPhone/" + id} 
        }
		
	},

	HRM_StaffPTOEnrollment:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffPTOEnrollment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffPTOEnrollment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffPTOEnrollment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffPTOEnrollment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffPTOEnrollment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPTOEnrollment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPTOEnrollment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffPTOEnrollment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffPTOEnrollment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffPTOEnrollment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffPTOEnrollment/" + id} 
        }
		
	},

	HRM_StaffRecruitmentInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffRecruitmentInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffRecruitmentInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffRecruitmentInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffRecruitmentInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffRecruitmentInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffRecruitmentInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffRecruitmentInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffRecruitmentInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffRecruitmentInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffRecruitmentInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffRecruitmentInfo/" + id} 
        }
		
	},

	HRM_StaffResignationInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffResignationInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffResignationInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffResignationInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffResignationInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffResignationInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffResignationInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffResignationInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffResignationInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffResignationInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffResignationInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffResignationInfo/" + id} 
        }
		
	},

	HRM_StaffSalaryDecision:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffSalaryDecision/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffSalaryDecision"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffSalaryDecision/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffSalaryDecision/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffSalaryDecision/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSalaryDecision/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSalaryDecision/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSalaryDecision/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffSalaryDecision"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffSalaryDecision/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffSalaryDecision/" + id} 
        }
		
	},

	HRM_StaffSchedule:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffSchedule/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffSchedule"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffSchedule/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffSchedule/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffSchedule/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSchedule/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSchedule/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSchedule/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffSchedule"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffSchedule/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffSchedule/" + id} 
        }
		
	},

	HRM_StaffSpecializedField:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffSpecializedField/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffSpecializedField"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffSpecializedField/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffSpecializedField/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffSpecializedField/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedField/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedField/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedField/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffSpecializedField"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffSpecializedField/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffSpecializedField/" + id} 
        }
		
	},

	HRM_StaffSpecializedSkill:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffSpecializedSkill/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffSpecializedSkill"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffSpecializedSkill/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffSpecializedSkill/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffSpecializedSkill/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedSkill/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedSkill/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffSpecializedSkill/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffSpecializedSkill"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffSpecializedSkill/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffSpecializedSkill/" + id} 
        }
		
	},

	HRM_StaffStaffAndFamilyJob:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffStaffAndFamilyJob/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffStaffAndFamilyJob"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffStaffAndFamilyJob/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffStaffAndFamilyJob/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffStaffAndFamilyJob/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffStaffAndFamilyJob/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffStaffAndFamilyJob/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffStaffAndFamilyJob/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffStaffAndFamilyJob"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffStaffAndFamilyJob/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffStaffAndFamilyJob/" + id} 
        }
		
	},

	HRM_StaffTimesheetEnrollment:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffTimesheetEnrollment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffTimesheetEnrollment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffTimesheetEnrollment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffTimesheetEnrollment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffTimesheetEnrollment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTimesheetEnrollment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTimesheetEnrollment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTimesheetEnrollment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffTimesheetEnrollment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffTimesheetEnrollment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffTimesheetEnrollment/" + id} 
        }
		
	},

	HRM_StaffTrainingProcess:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffTrainingProcess/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffTrainingProcess"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffTrainingProcess/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffTrainingProcess/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffTrainingProcess/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcess/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcess/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcess/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffTrainingProcess"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffTrainingProcess/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffTrainingProcess/" + id} 
        }
		
	},

	HRM_StaffTrainingProcessSkill:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffTrainingProcessSkill/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffTrainingProcessSkill"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffTrainingProcessSkill/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffTrainingProcessSkill/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffTrainingProcessSkill/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcessSkill/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcessSkill/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffTrainingProcessSkill/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffTrainingProcessSkill"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffTrainingProcessSkill/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffTrainingProcessSkill/" + id} 
        }
		
	},

	HRM_StaffWelfare:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffWelfare/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffWelfare"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffWelfare/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffWelfare/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffWelfare/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWelfare/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWelfare/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWelfare/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffWelfare"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffWelfare/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffWelfare/" + id} 
        }
		
	},

	HRM_StaffWorkExperience:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffWorkExperience/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffWorkExperience"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffWorkExperience/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffWorkExperience/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffWorkExperience/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkExperience/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkExperience/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkExperience/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffWorkExperience"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffWorkExperience/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffWorkExperience/" + id} 
        }
		
	},

	HRM_StaffWorkingDiary:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/StaffWorkingDiary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/StaffWorkingDiary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/StaffWorkingDiary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/StaffWorkingDiary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/StaffWorkingDiary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkingDiary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkingDiary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/StaffWorkingDiary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/StaffWorkingDiary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/StaffWorkingDiary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/StaffWorkingDiary/" + id} 
        }
		
	},

	HRM_Timesheet:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/Timesheet/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/Timesheet"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/Timesheet/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/Timesheet/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/Timesheet/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/Timesheet/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/Timesheet/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/Timesheet/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/Timesheet"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/Timesheet/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/Timesheet/" + id} 
        }
		
	},

	HRM_TimesheetAndHoliday:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetAndHoliday/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetAndHoliday"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetAndHoliday/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetAndHoliday/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetAndHoliday/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetAndHoliday/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetAndHoliday/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetAndHoliday/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetAndHoliday"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetAndHoliday/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetAndHoliday/" + id} 
        }
		
	},

	HRM_TimesheetCheckInCode:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCheckInCode/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCheckInCode"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetCheckInCode/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetCheckInCode/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetCheckInCode/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCheckInCode/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCheckInCode/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCheckInCode/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetCheckInCode"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetCheckInCode/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetCheckInCode/" + id} 
        }
		
	},

	HRM_TimesheetCycle:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCycle/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCycle"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetCycle/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetCycle/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetCycle/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycle/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycle/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycle/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetCycle"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetCycle/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetCycle/" + id} 
        }
		
	},

	HRM_TimesheetCycleDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCycleDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetCycleDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetCycleDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetCycleDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetCycleDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycleDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycleDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetCycleDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetCycleDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetCycleDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetCycleDetail/" + id} 
        }
		
	},

	HRM_TimesheetFormula:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetFormula/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetFormula"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetFormula/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetFormula/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetFormula/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetFormula/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetFormula/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetFormula/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetFormula"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetFormula/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetFormula/" + id} 
        }
		
	},

	HRM_TimesheetLog:{
        getSearchList:{
            method: "GET",
            url: function(){return "HRM/TimesheetLog/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "HRM/TimesheetLog"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "HRM/TimesheetLog/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "HRM/TimesheetLog/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "HRM/TimesheetLog/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetLog/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetLog/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "HRM/TimesheetLog/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "HRM/TimesheetLog"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "HRM/TimesheetLog/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "HRM/TimesheetLog/" + id} 
        }
		
	},

	LIST_AddressSubdivision:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/AddressSubdivision/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/AddressSubdivision"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/AddressSubdivision/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/AddressSubdivision/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/AddressSubdivision/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/AddressSubdivision/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/AddressSubdivision/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/AddressSubdivision/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/AddressSubdivision"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/AddressSubdivision/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/AddressSubdivision/" + id} 
        }
		
	},

	LIST_Bank:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/Bank/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/Bank"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/Bank/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/Bank/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/Bank/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/Bank/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/Bank/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/Bank/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/Bank"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/Bank/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/Bank/" + id} 
        }
		
	},

	LIST_ContractTemplate:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/ContractTemplate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/ContractTemplate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/ContractTemplate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/ContractTemplate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/ContractTemplate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/ContractTemplate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/ContractTemplate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/ContractTemplate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/ContractTemplate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/ContractTemplate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/ContractTemplate/" + id} 
        }
		
	},

	LIST_Country:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/Country/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/Country"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/Country/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/Country/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/Country/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/Country/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/Country/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/Country/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/Country"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/Country/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/Country/" + id} 
        }
		
	},

	LIST_ElementOfSalary:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/ElementOfSalary/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/ElementOfSalary"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/ElementOfSalary/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/ElementOfSalary/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/ElementOfSalary/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/ElementOfSalary/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/ElementOfSalary/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/ElementOfSalary/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/ElementOfSalary"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/ElementOfSalary/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/ElementOfSalary/" + id} 
        }
		
	},

	LIST_General:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/General/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/General"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/General/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/General/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/General/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/General/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/General/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/General/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/General"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/General/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/General/" + id} 
        }
		
	},

	LIST_PayPeriod:{
        getSearchList:{
            method: "GET",
            url: function(){return "LIST/PayPeriod/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "LIST/PayPeriod"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "LIST/PayPeriod/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "LIST/PayPeriod/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "LIST/PayPeriod/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "LIST/PayPeriod/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "LIST/PayPeriod/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "LIST/PayPeriod/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "LIST/PayPeriod"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "LIST/PayPeriod/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "LIST/PayPeriod/" + id} 
        }
		
	},

	MR_CompetiorOrder:{
        getSearchList:{
            method: "GET",
            url: function(){return "MR/CompetiorOrder/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "MR/CompetiorOrder"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "MR/CompetiorOrder/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "MR/CompetiorOrder/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "MR/CompetiorOrder/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "MR/CompetiorOrder/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "MR/CompetiorOrder/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "MR/CompetiorOrder/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "MR/CompetiorOrder"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "MR/CompetiorOrder/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "MR/CompetiorOrder/" + id} 
        }
		
	},

	MR_TrackingCompetitor:{
        getSearchList:{
            method: "GET",
            url: function(){return "MR/TrackingCompetitor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "MR/TrackingCompetitor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "MR/TrackingCompetitor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "MR/TrackingCompetitor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "MR/TrackingCompetitor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "MR/TrackingCompetitor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "MR/TrackingCompetitor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "MR/TrackingCompetitor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "MR/TrackingCompetitor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "MR/TrackingCompetitor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "MR/TrackingCompetitor/" + id} 
        }
		
	},

	OST_Office:{
        getSearchList:{
            method: "GET",
            url: function(){return "OST/Office/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "OST/Office"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "OST/Office/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "OST/Office/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "OST/Office/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "OST/Office/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "OST/Office/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "OST/Office/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "OST/Office"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "OST/Office/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "OST/Office/" + id} 
        }
		
	},

	OST_OfficeGate:{
        getSearchList:{
            method: "GET",
            url: function(){return "OST/OfficeGate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "OST/OfficeGate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "OST/OfficeGate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "OST/OfficeGate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "OST/OfficeGate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "OST/OfficeGate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "OST/OfficeGate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "OST/OfficeGate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "OST/OfficeGate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "OST/OfficeGate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "OST/OfficeGate/" + id} 
        }
		
	},

	PM_ProjectPeople:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/ProjectPeople/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/ProjectPeople"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/ProjectPeople/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/ProjectPeople/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/ProjectPeople/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/ProjectPeople/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/ProjectPeople/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/ProjectPeople/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/ProjectPeople"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/ProjectPeople/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/ProjectPeople/" + id} 
        }
		
	},

	PM_Space:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/Space/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/Space"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/Space/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/Space/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/Space/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/Space/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/Space/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/Space/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/Space"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/Space/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/Space/" + id} 
        }
		
	},

	PM_SpaceStatus:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/SpaceStatus/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/SpaceStatus"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/SpaceStatus/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/SpaceStatus/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/SpaceStatus/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/SpaceStatus/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/SpaceStatus/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/SpaceStatus/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/SpaceStatus"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/SpaceStatus/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/SpaceStatus/" + id} 
        }
		
	},

	PM_Task:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/Task/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/Task"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/Task/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/Task/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/Task/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/Task/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/Task/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/Task/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/Task"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/Task/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/Task/" + id} 
        }
		
	},

	PM_TaskAssignment:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/TaskAssignment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/TaskAssignment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/TaskAssignment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/TaskAssignment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/TaskAssignment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/TaskAssignment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/TaskAssignment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/TaskAssignment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/TaskAssignment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/TaskAssignment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/TaskAssignment/" + id} 
        }
		
	},

	PM_TaskLink:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/TaskLink/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/TaskLink"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/TaskLink/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/TaskLink/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/TaskLink/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/TaskLink/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/TaskLink/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/TaskLink/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/TaskLink"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/TaskLink/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/TaskLink/" + id} 
        }
		
	},

	PM_View:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/View/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/View"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/View/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/View/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/View/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/View/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/View/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/View/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/View"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/View/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/View/" + id} 
        }
		
	},

	PM_Workspace:{
        getSearchList:{
            method: "GET",
            url: function(){return "PM/Workspace/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PM/Workspace"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PM/Workspace/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PM/Workspace/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PM/Workspace/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PM/Workspace/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PM/Workspace/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PM/Workspace/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PM/Workspace"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PM/Workspace/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PM/Workspace/" + id} 
        }
		
	},

	POS_BillTable:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/BillTable/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/BillTable"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/BillTable/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/BillTable/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/BillTable/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/BillTable/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/BillTable/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/BillTable/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/BillTable"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/BillTable/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/BillTable/" + id} 
        }
		
	},

	POS_Cash:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Cash/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Cash"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Cash/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Cash/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Cash/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Cash/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Cash/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Cash/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Cash"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Cash/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Cash/" + id} 
        }
		
	},

	POS_Kitchen:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Kitchen/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Kitchen"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Kitchen/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Kitchen/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Kitchen/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Kitchen/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Kitchen/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Kitchen/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Kitchen"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Kitchen/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Kitchen/" + id} 
        }
		
	},

	POS_MemberCardPromotion:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/MemberCardPromotion/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/MemberCardPromotion"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/MemberCardPromotion/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/MemberCardPromotion/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/MemberCardPromotion/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/MemberCardPromotion/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/MemberCardPromotion/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/MemberCardPromotion/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/MemberCardPromotion"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/MemberCardPromotion/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/MemberCardPromotion/" + id} 
        }
		
	},

	POS_Memo:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Memo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Memo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Memo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Memo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Memo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Memo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Memo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Memo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Memo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Memo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Memo/" + id} 
        }
		
	},

	POS_Menu:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Menu/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Menu"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Menu/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Menu/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Menu/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Menu/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Menu/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Menu/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Menu"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Menu/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Menu/" + id} 
        }
		
	},

	POS_MenuDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/MenuDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/MenuDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/MenuDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/MenuDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/MenuDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/MenuDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/MenuDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/MenuDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/MenuDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/MenuDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/MenuDetail/" + id} 
        }
		
	},

	POS_Table:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Table/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Table"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Table/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Table/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Table/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Table/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Table/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Table/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Table"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Table/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Table/" + id} 
        }
		
	},

	POS_TableGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/TableGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/TableGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/TableGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/TableGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/TableGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/TableGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/TableGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/TableGroup/" + id} 
        }
		
	},

	POS_TableGroupStaff:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/TableGroupStaff/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/TableGroupStaff"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/TableGroupStaff/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/TableGroupStaff/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/TableGroupStaff/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroupStaff/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroupStaff/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/TableGroupStaff/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/TableGroupStaff"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/TableGroupStaff/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/TableGroupStaff/" + id} 
        }
		
	},

	POS_Terminal:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/Terminal/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/Terminal"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/Terminal/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/Terminal/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/Terminal/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/Terminal/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/Terminal/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/Terminal/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/Terminal"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/Terminal/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/Terminal/" + id} 
        }
		
	},

	POS_WorkOrderCoordinate:{
        getSearchList:{
            method: "GET",
            url: function(){return "POS/WorkOrderCoordinate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "POS/WorkOrderCoordinate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "POS/WorkOrderCoordinate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "POS/WorkOrderCoordinate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "POS/WorkOrderCoordinate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "POS/WorkOrderCoordinate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "POS/WorkOrderCoordinate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "POS/WorkOrderCoordinate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "POS/WorkOrderCoordinate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "POS/WorkOrderCoordinate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "POS/WorkOrderCoordinate/" + id} 
        }
		
	},

	PR_Deal:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/Deal/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/Deal"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/Deal/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/Deal/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/Deal/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/Deal/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/Deal/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/Deal/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/Deal"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/Deal/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/Deal/" + id} 
        }
		
	},

	PR_Program:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/Program/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/Program"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/Program/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/Program/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/Program/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/Program/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/Program/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/Program/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/Program"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/Program/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/Program/" + id} 
        }
		
	},

	PR_ProgramCondition:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/ProgramCondition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/ProgramCondition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/ProgramCondition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/ProgramCondition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/ProgramCondition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramCondition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramCondition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramCondition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/ProgramCondition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/ProgramCondition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/ProgramCondition/" + id} 
        }
		
	},

	PR_ProgramItem:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/ProgramItem/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/ProgramItem"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/ProgramItem/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/ProgramItem/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/ProgramItem/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramItem/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramItem/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramItem/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/ProgramItem"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/ProgramItem/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/ProgramItem/" + id} 
        }
		
	},

	PR_ProgramPartner:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/ProgramPartner/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/ProgramPartner"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/ProgramPartner/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/ProgramPartner/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/ProgramPartner/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramPartner/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramPartner/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramPartner/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/ProgramPartner"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/ProgramPartner/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/ProgramPartner/" + id} 
        }
		
	},

	PR_ProgramReward:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/ProgramReward/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/ProgramReward"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/ProgramReward/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/ProgramReward/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/ProgramReward/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramReward/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramReward/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/ProgramReward/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/ProgramReward"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/ProgramReward/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/ProgramReward/" + id} 
        }
		
	},

	PR_PromotionTracking:{
        getSearchList:{
            method: "GET",
            url: function(){return "PR/PromotionTracking/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PR/PromotionTracking"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PR/PromotionTracking/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PR/PromotionTracking/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PR/PromotionTracking/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PR/PromotionTracking/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PR/PromotionTracking/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PR/PromotionTracking/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PR/PromotionTracking"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PR/PromotionTracking/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PR/PromotionTracking/" + id} 
        }
		
	},

	PROD_BillOfMaterials:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/BillOfMaterials/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/BillOfMaterials"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/BillOfMaterials/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/BillOfMaterials/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/BillOfMaterials/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterials/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterials/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterials/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/BillOfMaterials"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/BillOfMaterials/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/BillOfMaterials/" + id} 
        }
		
	},

	PROD_BillOfMaterialsDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/BillOfMaterialsDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/BillOfMaterialsDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/BillOfMaterialsDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/BillOfMaterialsDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/BillOfMaterialsDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterialsDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterialsDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/BillOfMaterialsDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/BillOfMaterialsDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/BillOfMaterialsDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/BillOfMaterialsDetail/" + id} 
        }
		
	},

	PROD_ItemInVendor:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/ItemInVendor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/ItemInVendor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/ItemInVendor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/ItemInVendor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/ItemInVendor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/ItemInVendor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/ItemInVendor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/ItemInVendor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/ItemInVendor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/ItemInVendor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/ItemInVendor/" + id} 
        }
		
	},

	PROD_MRPItem:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPItem/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPItem"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPItem/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPItem/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPItem/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPItem/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPItem/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPItem/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPItem"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPItem/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPItem/" + id} 
        }
		
	},

	PROD_MRPPegging:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPPegging/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPPegging"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPPegging/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPPegging/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPPegging/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPegging/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPegging/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPegging/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPPegging"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPPegging/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPPegging/" + id} 
        }
		
	},

	PROD_MRPPreventDocument:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPPreventDocument/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPPreventDocument"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPPreventDocument/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPPreventDocument/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPPreventDocument/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPreventDocument/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPreventDocument/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPPreventDocument/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPPreventDocument"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPPreventDocument/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPPreventDocument/" + id} 
        }
		
	},

	PROD_MRPRecommendation:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPRecommendation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPRecommendation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPRecommendation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPRecommendation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPRecommendation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPRecommendation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPRecommendation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPRecommendation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPRecommendation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPRecommendation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPRecommendation/" + id} 
        }
		
	},

	PROD_MRPResult:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPResult/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPResult"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPResult/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPResult/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPResult/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPResult/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPResult/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPResult/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPResult"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPResult/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPResult/" + id} 
        }
		
	},

	PROD_MRPScenario:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPScenario/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPScenario"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPScenario/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPScenario/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPScenario/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPScenario/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPScenario/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPScenario/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPScenario"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPScenario/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPScenario/" + id} 
        }
		
	},

	PROD_MRPWarehouse:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/MRPWarehouse/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/MRPWarehouse"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/MRPWarehouse/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/MRPWarehouse/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/MRPWarehouse/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPWarehouse/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPWarehouse/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/MRPWarehouse/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/MRPWarehouse"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/MRPWarehouse/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/MRPWarehouse/" + id} 
        }
		
	},

	PROD_Order:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/Order/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/Order"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/Order/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/Order/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/Order/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/Order/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/Order/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/Order/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/Order"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/Order/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/Order/" + id} 
        }
		
	},

	PROD_OrderDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "PROD/OrderDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PROD/OrderDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PROD/OrderDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PROD/OrderDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PROD/OrderDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PROD/OrderDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PROD/OrderDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PROD/OrderDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PROD/OrderDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PROD/OrderDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PROD/OrderDetail/" + id} 
        }
		
	},

	PURCHASE_Order:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/Order/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/Order"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/Order/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/Order/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/Order/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Order/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Order/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Order/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/Order"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/Order/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/Order/" + id} 
        }
		
	},

	PURCHASE_OrderDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/OrderDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/OrderDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/OrderDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/OrderDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/OrderDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/OrderDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/OrderDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/OrderDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/OrderDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/OrderDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/OrderDetail/" + id} 
        }
		
	},

	PURCHASE_Quotation:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/Quotation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/Quotation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/Quotation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/Quotation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/Quotation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Quotation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Quotation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Quotation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/Quotation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/Quotation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/Quotation/" + id} 
        },
        approve:{
            method:"POST",
            url: function(){return "PURCHASE/Quotation/Approve"} 

        },
        submitForApproval:{
            method:"POST",
            url: function(){return "PURCHASE/Quotation/SubmitForApproval"} 
        },
        disapprove:{
            method:"POST",
            url: function(){return "PURCHASE/Quotation/Disapprove"} 
        },
        cancel:{
            method:"POST",
            url: function(){return "PURCHASE/Quotation/Cancel"} 
        },
	},

	PURCHASE_QuotationDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/QuotationDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/QuotationDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/QuotationDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/QuotationDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/QuotationDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/QuotationDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/QuotationDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/QuotationDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/QuotationDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/QuotationDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/QuotationDetail/" + id} 
        }
		
	},

	PURCHASE_Request:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/Request/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/Request"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/Request/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/Request/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/Request/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Request/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Request/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/Request/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/Request"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/Request/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/Request/" + id} 
        },
        approve:{
            method:"POST",
            url: function(){return "PURCHASE/Request/Approve"} 

        },
        submitForApproval:{
            method:"POST",
            url: function(){return "PURCHASE/Request/SubmitForApproval"} 
        },
        disapprove:{
            method:"POST",
            url: function(){return "PURCHASE/Request/Disapprove"} 
        },
        cancel:{
            method:"POST",
            url: function(){return "PURCHASE/Request/Cancel"} 
        },
		
	},

	PURCHASE_RequestDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "PURCHASE/RequestDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "PURCHASE/RequestDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "PURCHASE/RequestDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "PURCHASE/RequestDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "PURCHASE/RequestDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/RequestDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/RequestDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "PURCHASE/RequestDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "PURCHASE/RequestDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "PURCHASE/RequestDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "PURCHASE/RequestDetail/" + id} 
        }
		
	},

	SALE_Forecast:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/Forecast/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/Forecast"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/Forecast/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/Forecast/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/Forecast/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/Forecast/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/Forecast/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/Forecast/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/Forecast"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/Forecast/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/Forecast/" + id} 
        }
		
	},

	SALE_ForecastDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/ForecastDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/ForecastDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/ForecastDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/ForecastDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/ForecastDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/ForecastDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/ForecastDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/ForecastDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/ForecastDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/ForecastDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/ForecastDetail/" + id} 
        }
		
	},

	SALE_Order:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/Order/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/Order"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/Order/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/Order/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/Order/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/Order/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/Order/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/Order/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/Order"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/Order/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/Order/" + id} 
        }
		
	},

	SALE_OrderAddition:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/OrderAddition/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/OrderAddition"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/OrderAddition/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/OrderAddition/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/OrderAddition/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderAddition/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderAddition/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderAddition/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/OrderAddition"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/OrderAddition/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/OrderAddition/" + id} 
        }
		
	},

	SALE_OrderDeduction:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/OrderDeduction/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/OrderDeduction"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/OrderDeduction/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/OrderDeduction/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/OrderDeduction/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDeduction/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDeduction/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDeduction/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/OrderDeduction"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/OrderDeduction/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/OrderDeduction/" + id} 
        }
		
	},

	SALE_OrderDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/OrderDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/OrderDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/OrderDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/OrderDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/OrderDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/OrderDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/OrderDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/OrderDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/OrderDetail/" + id} 
        }
		
	},

	SALE_Quotation:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/Quotation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/Quotation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/Quotation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/Quotation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/Quotation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/Quotation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/Quotation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/Quotation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/Quotation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/Quotation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/Quotation/" + id} 
        }
		
	},

	SALE_QuotationDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "SALE/QuotationDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SALE/QuotationDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SALE/QuotationDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SALE/QuotationDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SALE/QuotationDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SALE/QuotationDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SALE/QuotationDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SALE/QuotationDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SALE/QuotationDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SALE/QuotationDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SALE/QuotationDetail/" + id} 
        }
		
	},

	SHIFT_TimeSheet:{
        getSearchList:{
            method: "GET",
            url: function(){return "SHIFT/TimeSheet/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SHIFT/TimeSheet"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SHIFT/TimeSheet/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SHIFT/TimeSheet/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SHIFT/TimeSheet/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SHIFT/TimeSheet/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SHIFT/TimeSheet/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SHIFT/TimeSheet/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SHIFT/TimeSheet"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SHIFT/TimeSheet/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SHIFT/TimeSheet/" + id} 
        }
		
	},

	SHIP_Shipment:{
        getSearchList:{
            method: "GET",
            url: function(){return "SHIP/Shipment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SHIP/Shipment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SHIP/Shipment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SHIP/Shipment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SHIP/Shipment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SHIP/Shipment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SHIP/Shipment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SHIP/Shipment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SHIP/Shipment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SHIP/Shipment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SHIP/Shipment/" + id} 
        }
		
	},

	SHIP_ShipmentDebt:{
        getSearchList:{
            method: "GET",
            url: function(){return "SHIP/ShipmentDebt/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SHIP/ShipmentDebt"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SHIP/ShipmentDebt/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SHIP/ShipmentDebt/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SHIP/ShipmentDebt/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDebt/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDebt/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDebt/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SHIP/ShipmentDebt"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SHIP/ShipmentDebt/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SHIP/ShipmentDebt/" + id} 
        }
		
	},

	SHIP_ShipmentDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "SHIP/ShipmentDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SHIP/ShipmentDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SHIP/ShipmentDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SHIP/ShipmentDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SHIP/ShipmentDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SHIP/ShipmentDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SHIP/ShipmentDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SHIP/ShipmentDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SHIP/ShipmentDetail/" + id} 
        }
		
	},

	SHIP_Vehicle:{
        getSearchList:{
            method: "GET",
            url: function(){return "SHIP/Vehicle/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SHIP/Vehicle"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SHIP/Vehicle/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SHIP/Vehicle/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SHIP/Vehicle/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SHIP/Vehicle/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SHIP/Vehicle/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SHIP/Vehicle/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SHIP/Vehicle"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SHIP/Vehicle/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SHIP/Vehicle/" + id} 
        }
		
	},

	SYS_AccountGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/AccountGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/AccountGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/AccountGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/AccountGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/AccountGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/AccountGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/AccountGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/AccountGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/AccountGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/AccountGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/AccountGroup/" + id} 
        }
		
	},

	SYS_Action:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Action/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Action"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Action/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Action/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Action/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Action/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Action/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Action/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Action"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Action/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Action/" + id} 
        }
		
	},

	SYS_ActionAPIRunner:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/ActionAPIRunner/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/ActionAPIRunner"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/ActionAPIRunner/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/ActionAPIRunner/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/ActionAPIRunner/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/ActionAPIRunner/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/ActionAPIRunner/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/ActionAPIRunner/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/ActionAPIRunner"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/ActionAPIRunner/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/ActionAPIRunner/" + id} 
        }
		
	},

	SYS_APICollection:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/APICollection/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/APICollection"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/APICollection/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/APICollection/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/APICollection/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/APICollection/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/APICollection/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/APICollection/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/APICollection"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/APICollection/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/APICollection/" + id} 
        }
		
	},

	SYS_APIController:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/APIController/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/APIController"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/APIController/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/APIController/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/APIController/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/APIController/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/APIController/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/APIController/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/APIController"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/APIController/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/APIController/" + id} 
        }
		
	},

	SYS_AppleAppRedemption:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/AppleAppRedemption/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/AppleAppRedemption"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/AppleAppRedemption/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/AppleAppRedemption/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/AppleAppRedemption/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/AppleAppRedemption/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/AppleAppRedemption/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/AppleAppRedemption/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/AppleAppRedemption"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/AppleAppRedemption/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/AppleAppRedemption/" + id} 
        }
		
	},

	SYS_Apps:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Apps/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Apps"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Apps/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Apps/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Apps/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Apps/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Apps/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Apps/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Apps"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Apps/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Apps/" + id} 
        }
		
	},

	SYS_BranchInGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/BranchInGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/BranchInGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/BranchInGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/BranchInGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/BranchInGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/BranchInGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/BranchInGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/BranchInGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/BranchInGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/BranchInGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/BranchInGroup/" + id} 
        }
		
	},

	SYS_Config:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Config/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Config"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Config/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Config/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Config/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Config/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Config/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Config/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Config"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Config/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Config/" + id} 
        }
		
	},

	SYS_ConfigOption:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/ConfigOption/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/ConfigOption"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/ConfigOption/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/ConfigOption/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/ConfigOption/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/ConfigOption/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/ConfigOption/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/ConfigOption/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/ConfigOption"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/ConfigOption/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/ConfigOption/" + id} 
        }
		
	},

	SYS_Currency:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Currency/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Currency"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Currency/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Currency/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Currency/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Currency/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Currency/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Currency/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Currency"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Currency/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Currency/" + id} 
        }
		
	},

	SYS_DataPermissionList:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/DataPermissionList/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/DataPermissionList"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/DataPermissionList/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/DataPermissionList/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/DataPermissionList/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/DataPermissionList/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/DataPermissionList/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/DataPermissionList/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/DataPermissionList"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/DataPermissionList/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/DataPermissionList/" + id} 
        }
		
	},

	SYS_Form:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Form/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Form"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Form/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Form/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Form/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Form/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Form/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Form/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Form"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Form/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Form/" + id} 
        }
		
	},

	SYS_FormGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/FormGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/FormGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/FormGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/FormGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/FormGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/FormGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/FormGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/FormGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/FormGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/FormGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/FormGroup/" + id} 
        }
		
	},

	SYS_GlobalConfig:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/GlobalConfig/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/GlobalConfig"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/GlobalConfig/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/GlobalConfig/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/GlobalConfig/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/GlobalConfig/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/GlobalConfig/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/GlobalConfig/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/GlobalConfig"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/GlobalConfig/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/GlobalConfig/" + id} 
        }
		
	},

	SYS_IntegrationProvider:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/IntegrationProvider/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/IntegrationProvider"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/IntegrationProvider/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/IntegrationProvider/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/IntegrationProvider/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationProvider/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationProvider/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationProvider/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/IntegrationProvider"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/IntegrationProvider/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/IntegrationProvider/" + id} 
        }
		
	},

	SYS_IntegrationReferenceIdentity:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/IntegrationReferenceIdentity/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/IntegrationReferenceIdentity"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/IntegrationReferenceIdentity/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/IntegrationReferenceIdentity/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/IntegrationReferenceIdentity/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationReferenceIdentity/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationReferenceIdentity/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/IntegrationReferenceIdentity/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/IntegrationReferenceIdentity"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/IntegrationReferenceIdentity/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/IntegrationReferenceIdentity/" + id} 
        }
		
	},

	SYS_Log:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Log/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Log"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Log/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Log/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Log/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Log/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Log/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Log/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Log"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Log/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Log/" + id} 
        }
		
	},

	SYS_MessageTemplate:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/MessageTemplate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/MessageTemplate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/MessageTemplate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/MessageTemplate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/MessageTemplate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/MessageTemplate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/MessageTemplate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/MessageTemplate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/MessageTemplate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/MessageTemplate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/MessageTemplate/" + id} 
        }
		
	},

	SYS_PermissionList:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/PermissionList/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/PermissionList"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/PermissionList/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/PermissionList/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/PermissionList/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/PermissionList/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/PermissionList/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/PermissionList/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/PermissionList"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/PermissionList/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/PermissionList/" + id} 
        }
		
	},

	SYS_Printer:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Printer/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Printer"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Printer/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Printer/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Printer/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Printer/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Printer/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Printer/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Printer"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Printer/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Printer/" + id} 
        }
		
	},

	SYS_RuningNo:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/RuningNo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/RuningNo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/RuningNo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/RuningNo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/RuningNo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/RuningNo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/RuningNo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/RuningNo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/RuningNo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/RuningNo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/RuningNo/" + id} 
        }
		
	},

	SYS_SAP_Databases:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/SAP/Databases/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/SAP/Databases"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/SAP/Databases/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/SAP/Databases/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/SAP/Databases/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/SAP/Databases/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/SAP/Databases/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/SAP/Databases/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/SAP/Databases"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/SAP/Databases/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/SAP/Databases/" + id} 
        }
		
	},

	SYS_Schema:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Schema/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Schema"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Schema/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Schema/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Schema/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Schema/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Schema/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Schema/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Schema"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Schema/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Schema/" + id} 
        }
		
	},

	SYS_SchemaDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/SchemaDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/SchemaDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/SchemaDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/SchemaDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/SchemaDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/SchemaDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/SchemaDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/SchemaDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/SchemaDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/SchemaDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/SchemaDetail/" + id} 
        }
		
	},

	SYS_Status:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Status/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Status"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Status/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Status/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Status/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Status/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Status/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Status/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Status"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Status/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Status/" + id} 
        }
		
	},

	SYS_SyncJob:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/SyncJob/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/SyncJob"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/SyncJob/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/SyncJob/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/SyncJob/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/SyncJob/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/SyncJob/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/SyncJob/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/SyncJob"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/SyncJob/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/SyncJob/" + id} 
        }
		
	},

	SYS_Translate:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Translate/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Translate"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Translate/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Translate/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Translate/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Translate/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Translate/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Translate/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Translate"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Translate/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Translate/" + id} 
        }
		
	},

	SYS_Trigger:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Trigger/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Trigger"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Trigger/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Trigger/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Trigger/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Trigger/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Trigger/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Trigger/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Trigger"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Trigger/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Trigger/" + id} 
        }
		
	},

	SYS_TriggerAction:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/TriggerAction/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/TriggerAction"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/TriggerAction/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/TriggerAction/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/TriggerAction/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerAction/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerAction/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerAction/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/TriggerAction"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/TriggerAction/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/TriggerAction/" + id} 
        }
		
	},

	SYS_TriggerActionConfig:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/TriggerActionConfig/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/TriggerActionConfig"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/TriggerActionConfig/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/TriggerActionConfig/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/TriggerActionConfig/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionConfig/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionConfig/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionConfig/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/TriggerActionConfig"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/TriggerActionConfig/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/TriggerActionConfig/" + id} 
        }
		
	},

	SYS_TriggerActionDataMapping:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/TriggerActionDataMapping/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/TriggerActionDataMapping"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/TriggerActionDataMapping/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/TriggerActionDataMapping/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/TriggerActionDataMapping/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionDataMapping/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionDataMapping/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/TriggerActionDataMapping/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/TriggerActionDataMapping"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/TriggerActionDataMapping/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/TriggerActionDataMapping/" + id} 
        }
		
	},

	SYS_Type:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/Type/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/Type"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/Type/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/Type/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/Type/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/Type/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/Type/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/Type/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/Type"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/Type/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/Type/" + id} 
        }
		
	},

	SYS_UserDevice:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/UserDevice/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/UserDevice"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/UserDevice/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/UserDevice/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/UserDevice/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/UserDevice/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserDevice/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserDevice/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/UserDevice"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/UserDevice/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/UserDevice/" + id} 
        }
		
	},

	SYS_UserInGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/UserInGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/UserInGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/UserInGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/UserInGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/UserInGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/UserInGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserInGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserInGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/UserInGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/UserInGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/UserInGroup/" + id} 
        }
		
	},

	SYS_UserSetting:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/UserSetting/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/UserSetting"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/UserSetting/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/UserSetting/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/UserSetting/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/UserSetting/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserSetting/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserSetting/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/UserSetting"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/UserSetting/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/UserSetting/" + id} 
        }
		
	},

	SYS_UserVoice:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/UserVoice/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/UserVoice"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/UserVoice/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/UserVoice/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/UserVoice/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/UserVoice/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserVoice/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/UserVoice/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/UserVoice"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/UserVoice/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/UserVoice/" + id} 
        }
		
	},

	SYS_VeifyPhoneNumber:{
        getSearchList:{
            method: "GET",
            url: function(){return "SYS/VeifyPhoneNumber/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "SYS/VeifyPhoneNumber"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "SYS/VeifyPhoneNumber/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "SYS/VeifyPhoneNumber/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "SYS/VeifyPhoneNumber/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "SYS/VeifyPhoneNumber/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "SYS/VeifyPhoneNumber/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "SYS/VeifyPhoneNumber/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "SYS/VeifyPhoneNumber"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "SYS/VeifyPhoneNumber/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "SYS/VeifyPhoneNumber/" + id} 
        }
		
	},

	TRACK_Link:{
        getSearchList:{
            method: "GET",
            url: function(){return "TRACK/Link/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "TRACK/Link"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "TRACK/Link/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "TRACK/Link/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "TRACK/Link/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "TRACK/Link/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "TRACK/Link/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "TRACK/Link/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "TRACK/Link"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "TRACK/Link/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "TRACK/Link/" + id} 
        }
		
	},

	TRACK_LinkLog:{
        getSearchList:{
            method: "GET",
            url: function(){return "TRACK/LinkLog/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "TRACK/LinkLog"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "TRACK/LinkLog/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "TRACK/LinkLog/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "TRACK/LinkLog/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "TRACK/LinkLog/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "TRACK/LinkLog/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "TRACK/LinkLog/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "TRACK/LinkLog"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "TRACK/LinkLog/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "TRACK/LinkLog/" + id} 
        }
		
	},

	Version:{
        getSearchList:{
            method: "GET",
            url: function(){return "Version/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "Version"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "Version/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "Version/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "Version/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "Version/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "Version/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "Version/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "Version"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "Version/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "Version/" + id} 
        }
		
	},

	WEB_Category:{
        getSearchList:{
            method: "GET",
            url: function(){return "WEB/Category/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WEB/Category"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WEB/Category/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WEB/Category/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WEB/Category/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WEB/Category/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WEB/Category/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WEB/Category/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WEB/Category"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WEB/Category/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WEB/Category/" + id} 
        }
		
	},

	WEB_Content:{
        getSearchList:{
            method: "GET",
            url: function(){return "WEB/Content/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WEB/Content"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WEB/Content/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WEB/Content/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WEB/Content/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WEB/Content"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WEB/Content/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WEB/Content/" + id} 
        }
		
	},

	WEB_Content_Tag:{
        getSearchList:{
            method: "GET",
            url: function(){return "WEB/Content/Tag/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WEB/Content/Tag"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WEB/Content/Tag/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WEB/Content/Tag/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WEB/Content/Tag/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/Tag/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/Tag/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WEB/Content/Tag/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WEB/Content/Tag"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WEB/Content/Tag/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WEB/Content/Tag/" + id} 
        }
		
	},

	WEB_ContentInCategory:{
        getSearchList:{
            method: "GET",
            url: function(){return "WEB/ContentInCategory/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WEB/ContentInCategory"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WEB/ContentInCategory/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WEB/ContentInCategory/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WEB/ContentInCategory/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WEB/ContentInCategory/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WEB/ContentInCategory/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WEB/ContentInCategory/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WEB/ContentInCategory"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WEB/ContentInCategory/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WEB/ContentInCategory/" + id} 
        }
		
	},

	WEB_Tag:{
        getSearchList:{
            method: "GET",
            url: function(){return "WEB/Tag/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WEB/Tag"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WEB/Tag/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WEB/Tag/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WEB/Tag/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WEB/Tag/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WEB/Tag/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WEB/Tag/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WEB/Tag"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WEB/Tag/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WEB/Tag/" + id} 
        }
		
	},

	WMS_Adjustment:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Adjustment/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Adjustment"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Adjustment/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Adjustment/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Adjustment/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Adjustment/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Adjustment/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Adjustment/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Adjustment"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Adjustment/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Adjustment/" + id} 
        }
		
	},

	WMS_AdjustmentDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/AdjustmentDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/AdjustmentDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/AdjustmentDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/AdjustmentDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/AdjustmentDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/AdjustmentDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/AdjustmentDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/AdjustmentDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/AdjustmentDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/AdjustmentDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/AdjustmentDetail/" + id} 
        }
		
	},

	WMS_AllocationStrategy:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/AllocationStrategy/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/AllocationStrategy"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/AllocationStrategy/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/AllocationStrategy/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/AllocationStrategy/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/AllocationStrategy/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/AllocationStrategy/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/AllocationStrategy/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/AllocationStrategy"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/AllocationStrategy/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/AllocationStrategy/" + id} 
        }
		
	},

	WMS_Carrier:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Carrier/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Carrier"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Carrier/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Carrier/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Carrier/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Carrier/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Carrier/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Carrier/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Carrier"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Carrier/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Carrier/" + id} 
        }
		
	},

	WMS_Carton:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Carton/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Carton"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Carton/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Carton/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Carton/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Carton/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Carton/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Carton/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Carton"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Carton/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Carton/" + id} 
        }
		
	},

	WMS_CartonGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CartonGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CartonGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CartonGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CartonGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CartonGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CartonGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CartonGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CartonGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CartonGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CartonGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CartonGroup/" + id} 
        }
		
	},

	WMS_CycleCount:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCount/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCount"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCount/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCount/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCount/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCount/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCount/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCount/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCount"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCount/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCount/" + id} 
        }
		
	},

	WMS_CycleCountDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCountDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCountDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCountDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCountDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCountDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCountDetail/" + id} 
        }
		
	},

	WMS_CycleCountDetermination:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDetermination/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDetermination"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCountDetermination/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCountDetermination/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCountDetermination/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetermination/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetermination/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDetermination/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCountDetermination"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCountDetermination/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCountDetermination/" + id} 
        }
		
	},

	WMS_CycleCountDeterminationDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDeterminationDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCountDeterminationDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCountDeterminationDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCountDeterminationDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCountDeterminationDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDeterminationDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDeterminationDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountDeterminationDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCountDeterminationDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCountDeterminationDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCountDeterminationDetail/" + id} 
        }
		
	},

	WMS_CycleCountTask:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCountTask/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCountTask"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCountTask/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCountTask/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCountTask/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTask/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTask/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTask/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCountTask"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCountTask/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCountTask/" + id} 
        }
		
	},

	WMS_CycleCountTaskDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/CycleCountTaskDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/CycleCountTaskDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/CycleCountTaskDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/CycleCountTaskDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/CycleCountTaskDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTaskDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTaskDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/CycleCountTaskDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/CycleCountTaskDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/CycleCountTaskDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/CycleCountTaskDetail/" + id} 
        }
		
	},

	WMS_Item:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Item/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Item"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Item/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Item/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Item/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Item/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Item/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Item/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Item"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Item/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Item/" + id} 
        }
		
	},

	WMS_ItemBalance:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemBalance/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemBalance"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemBalance/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemBalance/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemBalance/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemBalance/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemBalance/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemBalance/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemBalance"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemBalance/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemBalance/" + id} 
        }
		
	},

	WMS_ItemGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemGroup/" + id} 
        }
		
	},

	WMS_ItemGroupAccountInBranch:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemGroupAccountInBranch/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemGroupAccountInBranch"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemGroupAccountInBranch/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemGroupAccountInBranch/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemGroupAccountInBranch/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroupAccountInBranch/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroupAccountInBranch/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemGroupAccountInBranch/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemGroupAccountInBranch"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemGroupAccountInBranch/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemGroupAccountInBranch/" + id} 
        }
		
	},

	WMS_ItemInBranch:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemInBranch/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemInBranch"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemInBranch/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemInBranch/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemInBranch/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInBranch/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInBranch/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInBranch/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemInBranch"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemInBranch/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemInBranch/" + id} 
        }
		
	},

	WMS_ItemInLocation:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemInLocation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemInLocation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemInLocation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemInLocation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemInLocation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInLocation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInLocation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInLocation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemInLocation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemInLocation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemInLocation/" + id} 
        }
		
	},

	WMS_ItemInWarehouseConfig:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemInWarehouseConfig/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemInWarehouseConfig"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemInWarehouseConfig/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemInWarehouseConfig/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemInWarehouseConfig/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInWarehouseConfig/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInWarehouseConfig/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemInWarehouseConfig/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemInWarehouseConfig"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemInWarehouseConfig/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemInWarehouseConfig/" + id} 
        }
		
	},

	WMS_ItemUoM:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ItemUoM/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ItemUoM"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ItemUoM/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ItemUoM/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ItemUoM/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemUoM/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemUoM/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ItemUoM/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ItemUoM"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ItemUoM/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ItemUoM/" + id} 
        }
		
	},

	WMS_LicencePlateNumber:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/LicencePlateNumber/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/LicencePlateNumber"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/LicencePlateNumber/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/LicencePlateNumber/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/LicencePlateNumber/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/LicencePlateNumber/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/LicencePlateNumber/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/LicencePlateNumber/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/LicencePlateNumber"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/LicencePlateNumber/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/LicencePlateNumber/" + id} 
        }
		
	},

	WMS_Location:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Location/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Location"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Location/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Location/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Location/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Location/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Location/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Location/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Location"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Location/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Location/" + id} 
        }
		
	},

	WMS_Lot:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Lot/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Lot"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Lot/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Lot/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Lot/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Lot/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Lot/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Lot/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Lot"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Lot/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Lot/" + id} 
        }
		
	},

	WMS_LotAttribute:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/LotAttribute/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/LotAttribute"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/LotAttribute/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/LotAttribute/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/LotAttribute/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/LotAttribute/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/LotAttribute/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/LotAttribute/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/LotAttribute"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/LotAttribute/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/LotAttribute/" + id} 
        }
		
	},

	WMS_LotLPNLocation:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/LotLPNLocation/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/LotLPNLocation"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/LotLPNLocation/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/LotLPNLocation/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/LotLPNLocation/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/LotLPNLocation/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/LotLPNLocation/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/LotLPNLocation/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/LotLPNLocation"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/LotLPNLocation/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/LotLPNLocation/" + id} 
        }
		
	},

	WMS_OutboundOrder:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/OutboundOrder/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/OutboundOrder"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/OutboundOrder/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/OutboundOrder/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/OutboundOrder/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrder/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrder/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrder/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/OutboundOrder"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/OutboundOrder/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/OutboundOrder/" + id} 
        }
		
	},

	WMS_OutboundOrderDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/OutboundOrderDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/OutboundOrderDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/OutboundOrderDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/OutboundOrderDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/OutboundOrderDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrderDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrderDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundOrderDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/OutboundOrderDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/OutboundOrderDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/OutboundOrderDetail/" + id} 
        }
		
	},

	WMS_OutboundTag:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/OutboundTag/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/OutboundTag"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/OutboundTag/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/OutboundTag/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/OutboundTag/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundTag/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundTag/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/OutboundTag/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/OutboundTag"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/OutboundTag/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/OutboundTag/" + id} 
        }
		
	},

	WMS_Packing:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Packing/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Packing"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Packing/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Packing/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Packing/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Packing/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Packing/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Packing/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Packing"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Packing/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Packing/" + id} 
        }
		
	},

	WMS_PackingDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PackingDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PackingDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PackingDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PackingDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PackingDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PackingDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PackingDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PackingDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PackingDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PackingDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PackingDetail/" + id} 
        }
		
	},

	WMS_Picking:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Picking/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Picking"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Picking/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Picking/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Picking/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Picking/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Picking/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Picking/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Picking"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Picking/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Picking/" + id} 
        }
		
	},

	WMS_PickingDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PickingDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PickingDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PickingDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PickingDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PickingDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PickingDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PickingDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PickingDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PickingDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PickingDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PickingDetail/" + id} 
        }
		
	},

	WMS_PriceList:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PriceList/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PriceList"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PriceList/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PriceList/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PriceList/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceList/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceList/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceList/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PriceList"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PriceList/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PriceList/" + id} 
        }
		
	},

	WMS_PriceListDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PriceListDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PriceListDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PriceListDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PriceListDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PriceListDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PriceListDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PriceListDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PriceListDetail/" + id} 
        }
		
	},

	WMS_PriceListVersion:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PriceListVersion/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PriceListVersion"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PriceListVersion/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PriceListVersion/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PriceListVersion/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersion/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersion/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersion/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PriceListVersion"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PriceListVersion/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PriceListVersion/" + id} 
        }
		
	},

	WMS_PriceListVersionDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PriceListVersionDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PriceListVersionDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PriceListVersionDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PriceListVersionDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PriceListVersionDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersionDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersionDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PriceListVersionDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PriceListVersionDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PriceListVersionDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PriceListVersionDetail/" + id} 
        }
		
	},

	WMS_PutawayStrategy:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PutawayStrategy/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PutawayStrategy"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PutawayStrategy/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PutawayStrategy/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PutawayStrategy/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategy/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategy/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategy/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PutawayStrategy"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PutawayStrategy/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PutawayStrategy/" + id} 
        }
		
	},

	WMS_PutawayStrategyDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/PutawayStrategyDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/PutawayStrategyDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/PutawayStrategyDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/PutawayStrategyDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/PutawayStrategyDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategyDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategyDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/PutawayStrategyDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/PutawayStrategyDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/PutawayStrategyDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/PutawayStrategyDetail/" + id} 
        }
		
	},

	WMS_Receipt:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Receipt/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Receipt"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Receipt/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Receipt/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Receipt/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Receipt/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Receipt/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Receipt/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Receipt"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Receipt/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Receipt/" + id} 
        }
		
	},

	WMS_ReceiptDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ReceiptDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ReceiptDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ReceiptDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ReceiptDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ReceiptDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ReceiptDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ReceiptDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ReceiptDetail/" + id} 
        }
		
	},

	WMS_ReceiptPalletization:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ReceiptPalletization/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ReceiptPalletization"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ReceiptPalletization/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ReceiptPalletization/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ReceiptPalletization/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptPalletization/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptPalletization/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ReceiptPalletization/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ReceiptPalletization"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ReceiptPalletization/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ReceiptPalletization/" + id} 
        }
		
	},

	WMS_Shipping:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Shipping/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Shipping"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Shipping/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Shipping/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Shipping/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Shipping/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Shipping/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Shipping/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Shipping"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Shipping/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Shipping/" + id} 
        }
		
	},

	WMS_ShippingDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/ShippingDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/ShippingDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/ShippingDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/ShippingDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/ShippingDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/ShippingDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/ShippingDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/ShippingDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/ShippingDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/ShippingDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/ShippingDetail/" + id} 
        }
		
	},

	WMS_Storer:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Storer/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Storer"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Storer/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Storer/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Storer/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Storer/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Storer/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Storer/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Storer"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Storer/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Storer/" + id} 
        }
		
	},

	WMS_StorerConfig:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/StorerConfig/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/StorerConfig"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/StorerConfig/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/StorerConfig/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/StorerConfig/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/StorerConfig/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/StorerConfig/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/StorerConfig/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/StorerConfig"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/StorerConfig/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/StorerConfig/" + id} 
        }
		
	},

	WMS_TaskDispatchStrategy:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/TaskDispatchStrategy/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/TaskDispatchStrategy"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/TaskDispatchStrategy/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/TaskDispatchStrategy/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/TaskDispatchStrategy/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategy/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategy/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategy/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/TaskDispatchStrategy"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/TaskDispatchStrategy/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/TaskDispatchStrategy/" + id} 
        }
		
	},

	WMS_TaskDispatchStrategyDetail:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/TaskDispatchStrategyDetail/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/TaskDispatchStrategyDetail"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/TaskDispatchStrategyDetail/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/TaskDispatchStrategyDetail/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/TaskDispatchStrategyDetail/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategyDetail/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategyDetail/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/TaskDispatchStrategyDetail/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/TaskDispatchStrategyDetail"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/TaskDispatchStrategyDetail/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/TaskDispatchStrategyDetail/" + id} 
        }
		
	},

	WMS_Transaction:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Transaction/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Transaction"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Transaction/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Transaction/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Transaction/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Transaction/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Transaction/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Transaction/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Transaction"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Transaction/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Transaction/" + id} 
        }
		
	},

	WMS_UoM:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/UoM/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/UoM"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/UoM/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/UoM/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/UoM/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/UoM/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/UoM/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/UoM/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/UoM"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/UoM/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/UoM/" + id} 
        }
		
	},

	WMS_UoMGroup:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/UoMGroup/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/UoMGroup"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/UoMGroup/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/UoMGroup/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/UoMGroup/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/UoMGroup/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/UoMGroup/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/UoMGroup/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/UoMGroup"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/UoMGroup/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/UoMGroup/" + id} 
        }
		
	},

	WMS_Vendor:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Vendor/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Vendor"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Vendor/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Vendor/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Vendor/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Vendor/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Vendor/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Vendor/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Vendor"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Vendor/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Vendor/" + id} 
        }
		
	},

	WMS_WarehouseInfo:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/WarehouseInfo/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/WarehouseInfo"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/WarehouseInfo/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/WarehouseInfo/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/WarehouseInfo/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/WarehouseInfo/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/WarehouseInfo/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/WarehouseInfo/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/WarehouseInfo"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/WarehouseInfo/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/WarehouseInfo/" + id} 
        }
		
	},

	WMS_WavePlanning:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/WavePlanning/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/WavePlanning"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/WavePlanning/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/WavePlanning/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/WavePlanning/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/WavePlanning/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/WavePlanning/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/WavePlanning/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/WavePlanning"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/WavePlanning/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/WavePlanning/" + id} 
        }
		
	},

	WMS_Zone:{
        getSearchList:{
            method: "GET",
            url: function(){return "WMS/Zone/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "WMS/Zone"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "WMS/Zone/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "WMS/Zone/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "WMS/Zone/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "WMS/Zone/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "WMS/Zone/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "WMS/Zone/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "WMS/Zone"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "WMS/Zone/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "WMS/Zone/" + id} 
        }
		
	},

	vw_SYS_Log:{
        getSearchList:{
            method: "GET",
            url: function(){return "vw/SYS/Log/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "vw/SYS/Log"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "vw/SYS/Log/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "vw/SYS/Log/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "vw/SYS/Log/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Log/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Log/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Log/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "vw/SYS/Log"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "vw/SYS/Log/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "vw/SYS/Log/" + id} 
        }
		
	},

	vw_SYS_SyncJob:{
        getSearchList:{
            method: "GET",
            url: function(){return "vw/SYS/SyncJob/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "vw/SYS/SyncJob"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "vw/SYS/SyncJob/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "vw/SYS/SyncJob/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "vw/SYS/SyncJob/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/SyncJob/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/SyncJob/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/SyncJob/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "vw/SYS/SyncJob"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "vw/SYS/SyncJob/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "vw/SYS/SyncJob/" + id} 
        }
		
	},

	vw_SYS_Tracking:{
        getSearchList:{
            method: "GET",
            url: function(){return "vw/SYS/Tracking/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "vw/SYS/Tracking"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "vw/SYS/Tracking/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "vw/SYS/Tracking/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "vw/SYS/Tracking/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Tracking/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Tracking/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "vw/SYS/Tracking/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "vw/SYS/Tracking"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "vw/SYS/Tracking/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "vw/SYS/Tracking/" + id} 
        }
		
	},

	vw_WMS_LotLocLPN:{
        getSearchList:{
            method: "GET",
            url: function(){return "vw/WMS/LotLocLPN/Search"}  
        },
        getList:{
            method: "GET",
            url: function(){return "vw/WMS/LotLocLPN"}  
        },
        getExport:{
            method: "DOWNLOAD",
            url: function(){return "vw/WMS/LotLocLPN/Export"}  
        },
        postImport:{
            method: "UPLOAD",
            url: function(){return "vw/WMS/LotLocLPN/Import"}  
        },
        getItem:{
            method: "GET",
            url: function(id){return "vw/WMS/LotLocLPN/" + id} 
        },
        putItem:{
            method: "PUT",
            url: function(id){return "vw/WMS/LotLocLPN/" + id} 
        },
        disableItem:{
            method: "PUT",
            url: function(id){return "vw/WMS/LotLocLPN/Disable/" + id} 
        },
        enableItem:{
            method: "PUT",
            url: function(id){return "vw/WMS/LotLocLPN/Enable/" + id} 
        },
        
        postItem:{
            method: "POST",
            url: function(){return "vw/WMS/LotLocLPN"}
        },
        changeBranch:{
            method: "POST",
            url: function(){return "vw/WMS/LotLocLPN/ChangeBranch"} 
        },
        delItem:{
            method: "DELETE",
            url: function(id){return "vw/WMS/LotLocLPN/" + id} 
        }
		
	},


};


