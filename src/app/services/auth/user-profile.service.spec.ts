import { UserProfileService } from './user-profile.service';
import { EVENT_TYPE } from '../static/event-type';

describe('UserProfileService changeTheme', () => {
	it('publishes CHANGE_THEME after setting theme value', async () => {
		const env = {
			user: { UserSetting: { Theme: { Value: 'Light' } } },
			publishEvent: jasmine.createSpy('publishEvent'),
		};
		const cache = { set: jasmine.createSpy('set'), tracking: () => ({ subscribe: () => {} }), app: {} };
		const userSettingProvider = { save: jasmine.createSpy('save').and.returnValue(Promise.resolve({})) };
		const userContextService = { setCurrentUser: jasmine.createSpy('setCurrentUser') };

		const service = new UserProfileService(
			{} as any,
			{} as any,
			userSettingProvider as any,
			{} as any,
			userContextService as any,
			env as any,
			cache as any
		);

		await service.changeTheme('Dark');

		expect(env.user.UserSetting.Theme.Value).toBe('Dark');
		expect(cache.set).toHaveBeenCalled();
		expect(env.publishEvent).toHaveBeenCalledWith({ Code: EVENT_TYPE.APP.CHANGE_THEME, Value: 'Dark' });
	});
});
