import { lib } from './global-functions';

describe('lib status color / list map', () => {
	/** Flat children list as returned by env.getStatus('ShipmentStatus') */
	const statusChildren = [
		{ Id: 301, Code: 'Scheduled', IDParent: 31, Name: 'Đã phân tài', Color: 'medium' },
		{ Id: 305, Code: 'InDelivery', IDParent: 31, Name: 'Đang giao hàng', Color: 'danger' },
		{ Id: 306, Code: 'Delivered', IDParent: 31, Name: 'Đã giao hàng', Color: 'warning' },
		{ Id: 328, Code: 'HandedOver', IDParent: 31, Name: 'Đã bàn giao', Color: 'success' },
	];

	beforeEach(() => {
		spyOn(lib, 'getCssVariableValue').and.callFake((variableName: string) => {
			const map: Record<string, string> = {
				'--ion-color-medium': '#929396',
				'--ion-color-danger': '#eb445a',
				'--ion-color-warning': '#ffc409',
				'--ion-color-success': '#67cb49',
			};
			return map[variableName] || '';
		});
	});

	it('findStatusInList matches Name, Code, and Id', () => {
		expect(lib.findStatusInList(statusChildren, 'Đang giao hàng')?.Code).toBe('InDelivery');
		expect(lib.findStatusInList(statusChildren, 'HandedOver')?.Id).toBe(328);
		expect(lib.findStatusInList(statusChildren, '305')?.Name).toBe('Đang giao hàng');
		expect(lib.findStatusInList(statusChildren, 'unknown')).toBeNull();
	});

	it('getStatusColorCssFromList resolves Ionic token via CSS variable', () => {
		expect(lib.getStatusColorCssFromList(statusChildren, 'Đang giao hàng')).toBe('#eb445a');
		expect(lib.getStatusColorCssFromList(statusChildren, 'Đã bàn giao')).toBe('#67cb49');
		expect(lib.getStatusColorCssFromList(statusChildren, 'missing')).toBe('');
	});

	it('applyStatusColorsToPieOptionFromList paints itemStyle.color by name', () => {
		const option = {
			series: [
				{
					type: 'pie',
					data: [
						{ name: 'Đang giao hàng', value: 1 },
						{ name: 'Đã bàn giao', value: 2 },
						{ name: 'Unknown', value: 3 },
					],
				},
			],
		};
		lib.applyStatusColorsToPieOptionFromList(option, statusChildren);
		expect(option.series[0].data[0].itemStyle.color).toBe('#eb445a');
		expect(option.series[0].data[1].itemStyle.color).toBe('#67cb49');
		expect(option.series[0].data[2].itemStyle).toBeUndefined();
	});
});
