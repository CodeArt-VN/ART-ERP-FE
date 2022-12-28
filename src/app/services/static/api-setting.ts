import {environment} from 'src/environments/environment';


export var ApiSetting = {
	//Review API URL
	mainService: {
		base: environment.appDomain,
		api: environment.apiVersion,
	},
	apiDomain: function (api) {
		return this.mainService.base + this.mainService.api + api;
	}
}