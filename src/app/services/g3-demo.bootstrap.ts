/**
 * G3 local demo — seed mock user + Forms để chạy source CRM Wedding không cần login API.
 * Tắt bằng environment.g3Demo = false trước khi merge production.
 */
import { environment } from 'src/environments/environment';
import { EnvService } from './core/env.service';
import { UserContextService } from './auth/user-context.service';
import { EVENT_TYPE } from './static/event-type';

const CRM_G3_FORMS: Array<{ Code: string; Name: string; Icon?: string }> = [
	{ Code: 'sale-team', Name: 'Sale Team', Icon: 'people' },
	{ Code: 'sale-quota', Name: 'Sale Quota', Icon: 'stats-chart' },
	{ Code: 'event-hall', Name: 'Event Hall', Icon: 'business' },
	{ Code: 'event-package', Name: 'Event Package', Icon: 'gift' },
	{ Code: 'price-book', Name: 'Price Book', Icon: 'pricetag' },
	{ Code: 'segment', Name: 'Segment', Icon: 'git-branch' },
	{ Code: 'sales-process', Name: 'Sales Process', Icon: 'git-network' },
	{ Code: 'checklist-template', Name: 'Checklist Template', Icon: 'checkbox' },
	{ Code: 'payment-rule', Name: 'Payment Rule', Icon: 'cash' },
	{ Code: 'kpi-config', Name: 'KPI Config', Icon: 'settings' },
	{ Code: 'lead', Name: 'Lead', Icon: 'flash' },
	{ Code: 'opportunity', Name: 'Opportunity', Icon: 'briefcase' },
	{ Code: 'activity', Name: 'Activity', Icon: 'calendar' },
	{ Code: 'tour-booking', Name: 'Tour / Tasting', Icon: 'walk' },
	{ Code: 'sale-quotation', Name: 'Sale Quotation', Icon: 'document-text' },
	{ Code: 'event-hold', Name: 'Event Hold', Icon: 'lock-closed' },
	{ Code: 'hall-calendar', Name: 'Hall Calendar', Icon: 'calendar-number' },
	{ Code: 'contract', Name: 'Contract', Icon: 'document' },
	{ Code: 'contract-payment', Name: 'Contract Payment', Icon: 'wallet' },
	{ Code: 'beo', Name: 'BEO', Icon: 'restaurant' },
	{ Code: 'attendance-booking', Name: 'Attendance Booking', Icon: 'people-circle' },
	{ Code: 'ai-inbox', Name: 'AI Inbox', Icon: 'chatbubbles' },
	{ Code: 'campaign', Name: 'Campaign', Icon: 'megaphone' },
	{ Code: 'customer', Name: 'Customer', Icon: 'person' },
	{ Code: 'kpi-board', Name: 'KPI Board', Icon: 'speedometer' },
];

export async function bootstrapG3Demo(env: EnvService, userContext: UserContextService): Promise<void> {
	if (!environment.g3Demo) {
		return;
	}

	const moduleId = 9000;
	const forms: any[] = [
		{
			Id: moduleId,
			Code: 'CRM-WEDDING',
			Name: 'CRM Wedding (G3 Demo)',
			Type: 10,
			IDParent: null,
			Icon: 'heart',
			IsHidden: false,
			IsDisabled: false,
			IsMobile: false,
			Sort: 1,
		},
		{
			Id: moduleId + 1,
			Code: 'CRM-WEDDING-MENU',
			Name: 'Wedding CRM',
			Type: 11,
			IDParent: moduleId,
			Icon: 'heart',
			IsHidden: false,
			IsDisabled: false,
			IsMobile: false,
			Sort: 1,
		},
	];

	CRM_G3_FORMS.forEach((f, idx) => {
		const id = moduleId + 100 + idx;
		forms.push({
			Id: id,
			Code: f.Code,
			Name: f.Name,
			Type: 1,
			IDParent: moduleId + 1,
			Icon: f.Icon || 'document',
			BadgeColor: 'primary',
			Remark: 'G3 demo form',
			IsHidden: false,
			IsDisabled: false,
			IsMobile: false,
			Sort: idx + 1,
		});
		// Permissions children
		['ShowAdd', 'ShowEdit', 'ShowDelete', 'ShowSearch', 'ShowExport', 'canEdit', 'canAdd'].forEach((p, pi) => {
			forms.push({
				Id: id * 100 + pi,
				Code: p,
				Name: p,
				Type: 2,
				IDParent: id,
				IsHidden: false,
				IsDisabled: false,
				IsMobile: false,
			});
		});
	});

	const branch = {
		Id: 1,
		Code: 'DEMO',
		Name: 'Demo Venue',
		IDParent: null,
		IsDisabled: false,
	};

	await userContext.setCurrentUser(
		{
			Id: 900001,
			UserName: 'g3.demo',
			Email: 'g3.demo@local',
			FullName: 'G3 Demo User',
			IsDisabled: false,
			IDBranch: 1,
			SysRoles: ['Admin'],
			Forms: forms,
			BranchList: [branch],
			Branchs: [branch],
			UserSetting: {
				Theme: { Value: 'Light' },
				IsCompactMenu: { Value: false },
				IsCacheQuery: { Value: false },
				PinnedForms: { Value: [] },
			},
		} as any,
		false
	);

	// Fake token so authenticatedGuard / hasAccessToken paths don't bounce
	if (env.storage?.app) {
		env.storage.app.token = {
			access_token: 'g3-demo-token',
			expires_in: 86400,
			token_type: 'Bearer',
		} as any;
	}

	env.publishEvent({ Code: EVENT_TYPE.APP.SHOW_MENU, Value: true });
	console.log('[G3 Demo] Seeded mock user + CRM Wedding forms');
}
