export var advanceFilterRules = {
	getRules: function (serviceName) {
		return this.convertArrayToObjects(this[serviceName]) || [];
	},

	convertArrayToObjects(matrix) {
		if (!matrix) return [];

		const headers = matrix[0];
		const result = [];

		for (let i = 1; i < matrix.length; i++) {
			const row = matrix[i];
			const status = row[0];
			const showBtns = [];

			for (let j = 1; j < row.length; j++) {
				if (row[j] === 'x') {
					showBtns.push(`Show${headers[j]}`);
				}
			}

			result.push({ Status: status, ShowBtns: showBtns });
		}

		return result;
	},

	HRM_StaffSchedule: {
		Schema: {
			Type: 'Form',
			Code: 'HRM_StaffSchedule',
		},
		TimeFrame: {
			From: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 1,
			},
			To: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 0,
			},
		},
		CompareTo: {
			Type: 'Relative',
			IsPastDate: true,
			Period: 'Day',
			Amount: 0,
		},
		Interval: {},
		CompareBy: [
			// {
			// 	Property: 'IDShift',
			// 	Title: 'Shift',
			// },
			// {
			// 	Property: 'TimeOffType',
			// 	Title: 'TimeOff',
			// },
		],
		MeasureBy: [],
		Transform: {
			Filter: {
				Dimension: 'logical',
				Operator: 'AND',
				Value: null,
				Logicals: [{ Dimension: 'IDTimesheet', Operator: '=', Value: 2 }],
			},
		},
		// Take:5,
		// Skip:1
	},

	SALE_Order: {
		Schema: {
			Type: 'DBTable',
			Code: 'SALE_Order',
		},
		TimeFrame: {
			From: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 1,
			},
			To: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 0,
			},
		},
		CompareTo: {
			Type: 'Relative',
			IsPastDate: true,
			Period: 'Day',
			Amount: 0,
		},
		Interval: {},
		CompareBy: [
			// {
			// 	Property: 'IDShift',
			// 	Title: 'Shift',
			// },
			// {
			// 	Property: 'TimeOffType',
			// 	Title: 'TimeOff',
			// },
		],
		MeasureBy: [],
		Transform: {
			Filter: {
				Dimension: 'logical',
				Operator: 'AND',
				Value: null,
			},
		},
		SortBy:'[Id_desc]'
		// Take:5,
		// Skip:1
	},
};
