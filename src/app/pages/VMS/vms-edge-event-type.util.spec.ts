import {
	VMS_EDGE_EVENT_TYPE_GROUP,
	eventTypeFilterList,
	eventTypeLabel,
	eventTypeColor,
	eventTypeIcon,
} from './vms-edge-event-type.util';

describe('VMS_EDGE_EVENT_TYPE_GROUP', () => {
	it('uses VMSEdgeEventType parent code', () => {
		expect(VMS_EDGE_EVENT_TYPE_GROUP).toBe('VMSEdgeEventType');
	});
});

describe('eventType label/color/icon via lib.getAttrib', () => {
	const types = [
		{ Code: 'IdentifiedPerson', Name: 'Nhận diện BP', Color: 'success', Icon: 'accessibility', Sort: 1 },
		{ Code: 'NewFace', Name: 'Mặt mới', Color: 'primary', Icon: 'person-add', Sort: 2 },
	];

	it('maps from SYS_Type children by Code', () => {
		expect(eventTypeLabel('IdentifiedPerson', types)).toBe('Nhận diện BP');
		expect(eventTypeColor('IdentifiedPerson', types)).toBe('success');
		expect(eventTypeIcon('IdentifiedPerson', types)).toBe('accessibility');
		expect(eventTypeLabel('NewFace', types)).toBe('Mặt mới');
		expect(eventTypeColor('NewFace', types)).toBe('primary');
		expect(eventTypeIcon('NewFace', types)).toBe('person-add');
	});

	it('falls back when code missing in type list', () => {
		expect(eventTypeLabel('face.seen', types)).toBe('face.seen');
		expect(eventTypeColor('face.seen', types)).toBe('medium');
		expect(eventTypeIcon('face.seen', types)).toBe('');
	});
});

describe('eventTypeFilterList', () => {
	it('prepends All and sorts by Sort', () => {
		const list = eventTypeFilterList([
			{ Code: 'NewFace', Name: 'Mặt mới', Sort: 2 },
			{ Code: 'IdentifiedPerson', Name: 'Nhận diện BP', Sort: 1 },
		]);
		expect(list[0]).toEqual({ Code: '', Name: 'All' });
		expect(list.map((x) => x.Code)).toEqual(['', 'IdentifiedPerson', 'NewFace']);
	});
});
