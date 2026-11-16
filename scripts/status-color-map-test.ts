/**
 * Unit test for lib status→color mapping (getStatus children list).
 * Run: npx tsx scripts/status-color-map-test.ts
 */
import { lib } from '../src/app/services/static/global-functions';

const statusChildren = [
	{ Id: 301, Code: 'Scheduled', IDParent: 31, Name: 'Đã phân tài', Color: 'medium' },
	{ Id: 305, Code: 'InDelivery', IDParent: 31, Name: 'Đang giao hàng', Color: 'danger' },
	{ Id: 306, Code: 'Delivered', IDParent: 31, Name: 'Đã giao hàng', Color: 'warning' },
	{ Id: 328, Code: 'HandedOver', IDParent: 31, Name: 'Đã bàn giao', Color: 'success' },
];

const cssMap: Record<string, string> = {
	'--ion-color-medium': '#929396',
	'--ion-color-danger': '#eb445a',
	'--ion-color-warning': '#ffc409',
	'--ion-color-success': '#67cb49',
};
(lib as any).getCssVariableValue = (variableName: string) => cssMap[variableName] || '';

let failed = 0;
function assert(cond: boolean, msg: string) {
	if (!cond) {
		failed++;
		console.error('FAIL:', msg);
	} else {
		console.log('OK:', msg);
	}
}

assert(lib.findStatusInList(statusChildren, 'Đang giao hàng')?.Code === 'InDelivery', 'find by Name');
assert(lib.findStatusInList(statusChildren, 'HandedOver')?.Id === 328, 'find by Code');
assert(lib.findStatusInList(statusChildren, '305')?.Name === 'Đang giao hàng', 'find by Id');
assert(lib.findStatusInList(statusChildren, 'unknown') === null, 'missing → null');

assert(lib.getStatusColorCssFromList(statusChildren, 'Đang giao hàng') === '#eb445a', 'color by Name');
assert(lib.getStatusColorCssFromList(statusChildren, 'Đã bàn giao') === '#67cb49', 'success mapped');
assert(lib.getStatusColorCssFromList(statusChildren, 'missing') === '', 'missing color empty');

const option: any = {
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
assert(option.series[0].data[0].itemStyle.color === '#eb445a', 'pie paints InDelivery');
assert(option.series[0].data[1].itemStyle.color === '#67cb49', 'pie paints HandedOver');
assert(option.series[0].data[2].itemStyle === undefined, 'unknown unchanged');

if (failed) {
	console.error(`\n${failed} failed`);
	process.exit(1);
}
console.log('\nAll status-color map tests passed');
