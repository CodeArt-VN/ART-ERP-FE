import { EnvService } from './env.service';

describe('EnvService.checkFormPermission open paths', () => {
	function makeEnv(user: { Id: number; Forms: any[] } | null) {
		return {
			user,
			isGuestCustomerRoute: () => false,
			checkFormPermission: EnvService.prototype.checkFormPermission,
		};
	}

	it('allows /ui-kit for authenticated user without SYS_Form', async () => {
		const env = makeEnv({ Id: 1, Forms: [] });
		await expectAsync(env.checkFormPermission.call(env, '/ui-kit')).toBeResolvedTo(true);
	});

	it('allows /ui-kit with trailing query string stripped by caller path', async () => {
		const env = makeEnv({ Id: 1, Forms: [] });
		await expectAsync(env.checkFormPermission.call(env, '/ui-kit?x=1')).toBeResolvedTo(true);
	});

	it('denies unknown paths when Forms empty', async () => {
		const env = makeEnv({ Id: 1, Forms: [] });
		await expectAsync(env.checkFormPermission.call(env, '/inventory-balance')).toBeResolvedTo(false);
	});
});
