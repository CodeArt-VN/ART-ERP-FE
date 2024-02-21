export var lib = {
	deepAssign(target: any, ...sources: any[]): any {
		sources.forEach(source => {
			Object.keys(source).forEach(key => {
				if (typeof source[key] === 'object' && source[key] !== null) {
					if (!target[key]) {
						Object.assign(target, { [key]: {} });
					}
					lib.deepAssign(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			});
		});
		return target;
	},

	copyPropertiesValue(fromItem, toItem) {
		for (let x in fromItem) {
			if (x != '_isChecked') {
				toItem[x] = fromItem[x];
			}
		}
	},
	cloneObject(source) {
		return JSON.parse(JSON.stringify(source));
	},
	getObject(path, obj) {
		return path.split('.')
			.reduce(function (prev, curr) {
				return prev ? prev[curr] : undefined
			},
				obj || self)
	},
	generateUID() {
		var d = new Date().getTime();
		var uuid = d + 'xxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	generateCode(radix = 36) {
		var d = (new Date);
		return d.getTime().toString(radix);
	},
	isNumeric(value: any): boolean {
		return !isNaN(value - parseFloat(value));
	},
	paddingNumber(number, count) {
		let numberString = '' + number;
		while (numberString.length < count) {
			numberString = '0' + numberString;
		}
		return numberString;
	},
	dateFormat(date, term = 'yyyy-mm-dd', failReturn = '') {

		if (!date) {
			return failReturn;
		}
		if (date.indexOf && date.indexOf('-') > 0 && date.indexOf('T') == -1) {
			date = date.replace(/-/g, "/");
		}
		let value = new Date(date);
		let result = '';
		let yy = value.getFullYear();
		let mm = value.getMonth() + 1;
		let dd = value.getDate();

		let hh = value.getHours();
		let MM = value.getMinutes();
		let ss = value.getSeconds();

		if (term == 'dd/mm/yy') {
			result = this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(yy - 2000, 2);
		}
		else if (term == 'dd/mm/yyyy') {
			result = this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(yy, 4);
		}
		else if (term == 'yy/mm/dd') {
			result = this.paddingNumber(yy - 2000, 2) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(dd, 2);
		}
		else if (term == 'yyyy/mm/dd') {
			result = this.paddingNumber(yy, 4) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(dd, 2);
		}
		else if (term == 'yyyy-mm-dd') {
			result = this.paddingNumber(yy, 4) + '-' + this.paddingNumber(mm, 2) + '-' + this.paddingNumber(dd, 2);
		}
		else if (term == 'd/m/yy') {
			result = this.paddingNumber(dd, 1) + '/' + this.paddingNumber(mm, 1) + '/' + this.paddingNumber(yy - 2000, 2);
		}
		else if (term == 'd/m/yyyy') {
			result = this.paddingNumber(dd, 1) + '/' + this.paddingNumber(mm, 1) + '/' + this.paddingNumber(yy, 4);
		}
		else if (term == 'dd/mm') {
			result = this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2);
		}
		else if (term == 'dd/mm/yy hh:MM') {
			result = this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(yy - 2000, 2) + ' ' + this.paddingNumber(hh, 2) + ':' + this.paddingNumber(MM, 2);
		}
		else if (term == 'hh:MM dd/mm') {
			result = this.paddingNumber(hh, 2) + ':' + this.paddingNumber(MM, 2) + ' ' + this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2);
		}
		else if (term == 'hh:MM dd/mm/yyyy') {
			result = this.paddingNumber(hh, 2) + ':' + this.paddingNumber(MM, 2) + ' ' + this.paddingNumber(dd, 2) + '/' + this.paddingNumber(mm, 2) + '/' + this.paddingNumber(yy, 4);
		}
		else if (term == 'hh:MM') {
			result = this.paddingNumber(hh, 2) + ':' + this.paddingNumber(MM, 2);
		}
		else if (term == 'hh:MM:ss') {
			result = this.paddingNumber(hh, 2) + ':' + this.paddingNumber(MM, 2) + ':' + this.paddingNumber(ss, 2);
		}
		else if (term == 'weekday') {
			const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			result = weekday[value.getDay()];
		}
		else if (term == 'yyMMdd') {
			result = this.paddingNumber(yy - 2000, 2) + this.paddingNumber(mm, 2) + this.paddingNumber(dd, 2);
		}

		return result;
	},
	dateFormatFriendly(date) {
		let now: any = new Date();
		let value: any = new Date(date);
		var seconds = Math.floor((now - value) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval >= 1) {
			return interval + " năm trước";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1) {
			return interval + " tháng trước";
		}
		interval = Math.floor(seconds / 86400);
		if (interval >= 1) {
			return interval + " ngày trước";
		}
		interval = Math.floor(seconds / 3600);
		if (interval >= 1) {
			return interval + " giờ trước";
		}
		interval = Math.floor(seconds / 60);
		if (interval >= 1) {
			return interval + " phút trước";
		}
		return Math.floor(seconds) + " giây trước";
	},
	currencyFormat(currency, contryCode = 'vi-VN', currencyCode = 'vnd') {
		return parseFloat(currency).toLocaleString(contryCode, { style: 'currency', currency: currencyCode });
	},
	formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
		if (amount === null) {
			return '';
		}
		try {
			decimalCount = Math.abs(decimalCount);
			decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

			const negativeSign = amount < 0 ? "-" : "";

			let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
			let j = (i.length > 3) ? i.length % 3 : 0;

			return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
		} catch (e) {
			//console.log(e)
		}
	},
	currencyFormatFriendly(amount) {
		if (this.isNumeric(amount)) {
			let result = '';
			if (amount >= 10 ** 9) {
				result = (Math.round(amount / 10 ** 8) / 10) + 'B';
			}
			else if (amount >= 10 ** 6) {
				result = (Math.round(amount / 10 ** 5) / 10) + 'M';
			}
			else if (amount >= 10 ** 3) {
				result = (Math.round(amount / 10 ** 2) / 10) + 'K';
			}
			else {
				result = (Math.round(amount * 10) / 10) + '';
			}


			return result;
		}
		else {
			return amount;
		}
	},
	personNameFormat(name) {
		name = name.toLowerCase().trim().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
		name = name.replace(/[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ|\s]?/g, '').trim();
		return name;
	},

	hexToRgba(hex, alpha) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + alpha + ')' : null;
	},
	fileSizeFormat(bytes, si = true) {
		var thresh = si ? 1000 : 1024;
		if (Math.abs(bytes) < thresh) {
			if (bytes) {
				return bytes + ' B';
			}
			else {
				return '--'
			}

		}
		var units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
	},
	URLFormat(str) {
		if (!str) {
			return '';
		}
		str = str.trim();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		str = str.replace(/đ/g, "d");
		str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
		str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
		str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
		str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
		str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
		str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
		str = str.replace(/Đ/g, "D");
		str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`| |{|}|\||\\/g, "-");
		str = str.replace(/ + /g, "-");
		str = str.replace(/--/g, "-");

		return str.toLowerCase();
	},
	getWeekDates(date) {
		if (!date) {
			return [];
		}
		let result = [];
		let value: any = new Date(date);
		let firstDateInWeek = new Date(date);;
		firstDateInWeek.setDate(firstDateInWeek.getDate() - value.getDay());
		for (let i = 0; i < 7; i++) {
			result.push(new Date(firstDateInWeek.getTime()));
			firstDateInWeek.setDate(firstDateInWeek.getDate() + 1);
		}
		return result;
	},
	getMonthWeekDates(date) {
		if (!date) {
			return [];
		}
		let result = [];
		let value: any = new Date(date);

		let firstDateInMonth = new Date(value.getFullYear(), value.getMonth(), 1);
		firstDateInMonth.setDate(firstDateInMonth.getDate() - firstDateInMonth.getDay());
		for (let i = 0; i < 6 * 7; i++) {
			result.push(new Date(firstDateInMonth.getTime()));
			firstDateInMonth.setDate(firstDateInMonth.getDate() + 1);
		}
		return result;
	},
	getStartEndDates(start, end) {
		if (end.indexOf && end.indexOf('-') > 0 && end.indexOf('T') == -1) {
			end = end.replace(/-/g, "/");
		}
		if (start.indexOf && start.indexOf('-') > 0 && start.indexOf('T') == -1) {
			start = start.replace(/-/g, "/");
		}

		end = new Date(end);
		for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
			arr.push({ Date: new Date(dt) });
		}
		return arr;
	},

	getAttrib(Term, Lst, GetAttrib = 'Name', defaultValue = '', FindAttrib = 'Id') {
		if (!Lst) {
			return defaultValue;
		}
		var it = Lst.filter(ite => (ite.IsDeleted === false || ite.IsDeleted == undefined) && ite[FindAttrib] == Term);
		if (it.length) {
			return it[0][GetAttrib];
		}
		return defaultValue;
	},

	colorLightenDarken(color, percent) {
		var num = parseInt(color.replace("#", ""), 16),
			amt = Math.round(2.55 * percent),
			R = (num >> 16) + amt,
			B = (num >> 8 & 0x00FF) + amt,
			G = (num & 0x0000FF) + amt;
		return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
	},
	getCssVariableValue(variableName) {
		let value = getComputedStyle(document.querySelector('ion-app')).getPropertyValue(variableName);
		return value ? value.trim() : '';
	},
	//tree json
	listToTree(list, childrenFieldName = 'children', assign = null) {


		var map = {}, node, roots = [], i;
		for (i = 0; i < list.length; i += 1) {
			map[list[i].Id] = i; // initialize the map
			list[i][childrenFieldName] = []; // initialize the children

		}
		for (i = 0; i < list.length; i += 1) {
			node = list[i];
			if (assign) {
				Object.assign(node, assign);
			}
			if (node.IDParent) {
				// if you have dangling branches check that map[node.IDParent] exists
				if (list[map[node.IDParent]])
					list[map[node.IDParent]][childrenFieldName].push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
	},

	treeToList(tree, childrenFieldName = 'children', parentFieldName = 'IDParent', idFieldName = 'Id') {
		let result = [];
		let children = [];
		let sub = [];

		for (let i = 0; i < tree.length; i++) {
			const e = tree[i];
			e[parentFieldName] = null;

			if (e[childrenFieldName]) {
				sub = sub = sub.concat(this.getChildren(e, childrenFieldName, parentFieldName, idFieldName));
				delete e[childrenFieldName];
			}

			children.push(e);
		}

		result = result.concat(children, sub);
		return result;
	},

	getChildren(tree, childrenFieldName = 'children', parentFieldName = 'IDParent', idFieldName = 'Id') {
		if (!tree[childrenFieldName]) {
			return null;
		}
		let result = [];
		let children = tree[childrenFieldName];
		let sub = [];

		for (let i = 0; i < children.length; i++) {
			const e = children[i];
			e[parentFieldName] = tree[idFieldName];

			if (e[childrenFieldName]) {
				sub = sub.concat(this.getChildren(e, childrenFieldName, parentFieldName, idFieldName));
				delete e[childrenFieldName];
			}

		}
		result = result.concat(children, sub);
		return result;
	},

	buildFlatTree(items, treeState, isAllRowOpened = true, root = null) {

		let treeItems = [];
		let listItems = [];
		return new Promise(resolve => {
			let resp = items;
			let headerItems = [];

			if (resp.length) {
				for (var key in resp[0]) {
					headerItems.push(key);
				}
				let removePros = ["IDParent", "IDBranch", "Id", "Code", "Name"];
				headerItems = headerItems.filter(d => removePros.findIndex(i => i == d) == -1);

			}

			let flatHeader = headerItems.map(e => e.Name);
			listItems = resp;
			listItems.sort((a, b) => (a.Sort > b.Sort) ? 1 : ((b.Sort > a.Sort) ? -1 : 0));
			treeItems = [];
			this.buildSubNode(listItems, treeItems, root, flatHeader);

			//load saved state
			let currentParent = null;
			treeItems.forEach(i => {

				currentParent = treeItems.find(d => d.Id == i.IDParent);

				let f = treeState.find(d => d.Id == i.Id);
				if (f) {
					i.show = !currentParent ? true : ((currentParent.showdetail && f.show) ? true : false);
					i.showdetail = f.showdetail ? true : false;

				}
				else {
					i.show = !currentParent ? true : currentParent.showdetail;
					i.showdetail = isAllRowOpened;
				}
			});

			let needCalcItems = treeItems.filter(i => { return i.Code ? i.Code.indexOf('=') > -1 : false });

			flatHeader.forEach(h => {
				needCalcItems.forEach(c => {
					let fomular = c.Code.split('=')[1];
					let groups = fomular.match(/(\([0-9]+\))/g);
					groups?.forEach(g => {
						fomular = fomular.split(g).join('treeItems.find(i=> i.Code && i.Code.indexOf("' + g + '")==0)["' + h + '"]');
					});
					try {
						c[h] = eval(fomular);
					} catch (error) {
						//console.log(error);
					}
				});
			});

			treeItems.forEach(i => {
				i.HasChild = resp.findIndex(d => d.IDParent == i.Id) > -1;
				flatHeader.forEach(h => {
					if (i[h]) {
						i[h] = lib.formatMoney(i[h], 0, '', '.');
					}
					else {
						i[h] = 0;
					}
				});
			});

			resolve(treeItems);
		});
	},

	buildSubNode(listItem, treeItems, item, hierarchicalSumCols = [], isAllRowOpened = true) {
		let idp = item == null ? null : item.Id;
		let childrent = listItem.filter(d => d.IDParent == idp);
		let level = (item && item.level >= 0) ? item.level + 1 : 1;

		if (item) {
			item.count = childrent.length;

		}

		let index = treeItems.findIndex(d => d.Id == idp)
		treeItems.splice(index + 1, 0, ...childrent);

		childrent.forEach(i => {
			i.levels = Array(level).fill('');
			i.level = level;
			i.show = item == null ? true : false;
			i.showdetail = isAllRowOpened;

			this.buildSubNode(listItem, treeItems, i, hierarchicalSumCols);

			if (item) {
				hierarchicalSumCols.forEach(col => {
					if (!i[col]) {
						i[col] = 0;
					}
					// if(!item.IsRevenue){
					//     i[col] = i[col] * -1;
					// }
					item[col] += i[col];
				});
			}
		});
	},

	markNestedNode(ls, Id, flagProperty = 'flag', revert = false) {
		ls.filter(d => d.IDParent == Id).forEach(i => {
			i[flagProperty] = revert ? false : true;
			this.markNestedNode(ls, i.Id, flagProperty, revert);
		});
	},

	sumInArray(arr, property) {
		return arr.reduce((a, b) => a + (b[property] || 0), 0);
	},

	searchTree(ls: Array<any>, term: string, allParent = true, allChildren = true) {
		let ids = this.searchTreeReturnId(ls, term, allParent, allChildren);
		return ls.filter(d => ids.indexOf(d.Id) > -1);
	},

	searchTreeReturnId(ls: Array<any>, term: string, allParent = true, allChildren = true) {
		term = this.URLFormat(term);
		let ids = [];
		let filterItems = [];
		if (ls[0] && ls[0]._searchIndex) {
			filterItems = ls.filter(d => d._searchIndex.indexOf(term) > -1);
		}
		else {
			filterItems = ls.filter(d => this.URLFormat(d.Code).indexOf(term) > -1 || this.URLFormat(d.Name).indexOf(term) > -1);
		}

		for (let ind = 0; ind < filterItems.length; ind++) {
			const i = filterItems[ind];
			ids.push(i.Id);

			if (allChildren)
				this.findChildren(ls, i.Id, ids);

			if (allParent)
				(this.findParent(ls, i.Id, ids));
		}
		return ids;

	},

	findParent(ls, id, ids = []) {
		let p = ls.find(d => d.Id == id);
		if (p && ids.indexOf(p.IdParent) == -1) {
			ids.push(p.IDParent);
			this.findParent(ls, p.IDParent, ids);
		}
	},

	findChildren(ls, id, ids = []) {
		let filterItems = ls.filter(d => d.IDParent == id && ids.indexOf(d.Id) == -1);
		filterItems.forEach(i => {
			ids.push(i.Id);
			this.findChildren(ls, i.Id, ids);
		});
		return ids;
	},

	calcDistance2Points(lat1, lon1, lat2, lon2) {
		const R = 6371e3; // metres double R = 6371 in KM;
		const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
		const φ2 = lat2 * Math.PI / 180;
		const Δφ = (lat2 - lat1) * Math.PI / 180;
		const Δλ = (lon2 - lon1) * Math.PI / 180;

		const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres
	},

	/**
	 * Tạo code chuyển tiền theo tiêu chuẩn TCCS TCVN 03:2018
	 * @param bankCode Mã ngân hàng
	 * @param bankAccount Tài khoản ngân hàng
	 * @param amount Số tiền
	 * @param message Nội dung chuyển tiền
	 * @returns Trả về code để tạo mã QR
	 */
	genBankTransferQRCode(bankCode: string, bankAccount: string, amount: number, message: string) {
		//Mô tả thông tin QR Code trong y tế căn cứ theo TCCS TCVN 03:2018
		//https://pcbinhthuan.evnspc.vn/Portals/0/TinTucVaSuKien/PhongKinhDoanh/5_%20Ap%20dung%20Tieu%20chuan%20QR%20Code%20cua%20NHNN.pdf
		const bankIdByCode = {
			'vcb': '970436',
			'mb': '970422',
			'vietinbank': '970415'
		};

		let messPart = '08'
			+ message.length.toString().padStart(2, '0')
			+ message;

		let code =
			'000201'		 		//Phiên bản đặc tả QRCode
			+ '010212'				//Phương thức khởi tạo. 11 = QR tĩnh; 12 = QR động
			+ '3854'					//Thông tin tài khoản nhận tiền
			+ '0010A000000727'
			+ '0124'
			+ '0006' + bankIdByCode[bankCode] 	 //Id ngân hàng
			+ '01' + bankAccount.length.toString().padStart(2, '0')	//Số tài khoản
			+ bankAccount
			+ '0208QRIBFTTA'
			+ '5303704'				//Mã tiền tệ - 3 ký tự - 704 = vnd
			+ '54'					//Số tiền giao dịch - 7 ký tự - amount 1000000
			+ (amount + '').length.toString().padStart(2, '0')
			+ amount
			+ '5802VN'          		//Mã quốc gia
			+ '62' 					//Thông tin bổ sung
			+ messPart.length.toString().padStart(2, '0')
			+ messPart
			+ '6304'; 	//Checksum

		let crc = lib.calcCRC(code);
		code = code + crc.toString(16).toUpperCase().padStart(4, '0');

		return code;
	},

	readVietQRCode(code) {
		//00020101021238540010A0000007270124000697042201100908061119 0208QRIBFTTA 53037045403 120 5802VN62 130809 SO1193743 6304B779
		let result = {
			bankCode: '',
			bankAccount: '',
			amount: 0,
			message: ''
		};
		const bankIdByCode = {
			'vcb': '970436',
			'mb': '970422',
			'vietinbank': '970415'
		};

		let bankId = code.substring(38, 38 + 6);
		result.bankCode = Object.keys(bankIdByCode).find(key => bankIdByCode[key] === bankId);

		let bankAccountLength = parseInt(code.substring(46, 48));
		result.bankAccount = code.substring(48, 48 + bankAccountLength);

		code = code.split('0208QRIBFTTA')[1];
		let amountLength = parseInt(code.substring(9, 11));
		result.amount = parseInt(code.substring(11, 11 + amountLength));

		code = code.split('5802VN62')[1];
		let messageLength = parseInt(code.substring(4, 6));
		result.message = code.substring(6, 6 + messageLength);
		return result;
	},

	getCharacterByteArrayFromString(str) {
		var i, charVal;
		var bytes = [];
		for (i = 0; i < str.length; i++) {
			charVal = str.charCodeAt(i);
			if (charVal < 256) {
				bytes[i] = str.charCodeAt(i);
			}
		}
		return bytes;
	},

	calcCRC(input) {
		//http://www.sunshine2k.de/articles/coding/crc/understanding_crc.html
		//var input = '00020101021238540010A00000072701240006970422011009080611190208QRIBFTTA530370454061871105802VN62120808SO2552636304';
		var bytes = lib.getCharacterByteArrayFromString(input);


		var crcModel = {
			width: 16,
			maxVal: 0xFFFFFFFF >>> (32 - 16),
			initial: 0xFFFF,
			polynomial: 0x1021,
			finalXor: 0x0
		};

		var crcTable = new Array(256);
		var castMask = 0xFFFF;
		var msbMask = 0x01 << (crcModel.width - 1);

		for (var divident = 0; divident < 256; divident++) {
			var currByte = (divident << (crcModel.width - 8)) & castMask;
			for (var bit = 0; bit < 8; bit++) {
				if ((currByte & msbMask) != 0) {
					currByte <<= 1;
					currByte ^= crcModel.polynomial;
				}
				else {
					currByte <<= 1;
				}
			}
			crcTable[divident] = (currByte & castMask);
		}

		var crc = crcModel.initial;
		for (var i = 0; i < bytes.length; i++) {

			var curByte = bytes[i] & 0xFF;



			/* update the MSB of crc value with next input byte */
			crc = (crc ^ (curByte << (crcModel.width - 8))) & castMask;
			/* this MSB byte value is the index into the lookup table */
			var pos = (crc >> (crcModel.width - 8)) & 0xFF;
			/* shift out this index */
			crc = (crc << 8) & castMask;
			/* XOR-in remainder from lookup table using the calculated index */
			crc = (crc ^ crcTable[pos]) & castMask;
		}


		return ((crc ^ crcModel.finalXor) & castMask);
	},

	/**
	 * Mở app ngân hàng
	 * @param openApp Mã ứng dụng ngân hàng cần mở
	 * @param bankCode Mã ngân hàng
	 * @param bankAccount Tài khoản ngân hàng
	 * @param amount Số tiền
	 * @param message Nội dung chuyển tiền
	 * @returns Trả về link để mở app ngân hàng
	 */
	genVietQRDeeplink(openApp: string, bankCode: string, bankAccount: string, amount: number, message: string) {
		let ba = bankAccount + '@' + bankCode; //Định tài khoản nhận tiền
		let am = amount + ''; //Số tiền chuyển

		return 'https://dl.vietqr.io/pay?ba=' + ba + '&am=' + am + '&tn=' + message + '&app=' + openApp;
	},

	DocTienBangChu(SoTien) {
		var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

		var lan = 0;
		var i = 0;
		var so = 0;
		var KetQua = "";
		var tmp = "";
		var ViTri = new Array();
		if (SoTien < 0) return "Số tiền âm !";
		if (SoTien == 0) return "Không đồng !";
		if (SoTien > 0) {
			so = SoTien;
		}
		else {
			so = -SoTien;
		}
		if (SoTien > 8999999999999999) {
			//SoTien = 0;
			return "Số quá lớn!";
		}
		ViTri[5] = Math.floor(so / 1000000000000000);
		if (isNaN(ViTri[5]))
			ViTri[5] = "0";
		so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
		ViTri[4] = Math.floor(so / 1000000000000);
		if (isNaN(ViTri[4]))
			ViTri[4] = "0";
		so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
		ViTri[3] = Math.floor(so / 1000000000);
		if (isNaN(ViTri[3]))
			ViTri[3] = "0";
		so = so - parseFloat(ViTri[3].toString()) * 1000000000;
		ViTri[2] = parseInt((so / 1000000) + '');
		if (isNaN(ViTri[2]))
			ViTri[2] = "0";
		ViTri[1] = parseInt(((so % 1000000) / 1000) + '');
		if (isNaN(ViTri[1]))
			ViTri[1] = "0";
		ViTri[0] = parseInt((so % 1000) + '');
		if (isNaN(ViTri[0]))
			ViTri[0] = "0";
		if (ViTri[5] > 0) {
			lan = 5;
		}
		else if (ViTri[4] > 0) {
			lan = 4;
		}
		else if (ViTri[3] > 0) {
			lan = 3;
		}
		else if (ViTri[2] > 0) {
			lan = 2;
		}
		else if (ViTri[1] > 0) {
			lan = 1;
		}
		else {
			lan = 0;
		}
		for (i = lan; i >= 0; i--) {
			tmp = lib.DocSo3ChuSo(ViTri[i]);
			KetQua += tmp;
			if (ViTri[i] > 0) KetQua += Tien[i];
			if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
		}
		if (KetQua.substring(KetQua.length - 1) == ',') {
			KetQua = KetQua.substring(0, KetQua.length - 1);
		}
		KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
		return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
	},

	DocSo3ChuSo(baso) {
		var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");

		var tram;
		var chuc;
		var donvi;
		var KetQua = "";
		tram = parseInt((baso / 100) + '');
		chuc = parseInt(((baso % 100) / 10) + '');
		donvi = baso % 10;
		if (tram == 0 && chuc == 0 && donvi == 0) return "";
		if (tram != 0) {
			KetQua += ChuSo[tram] + " trăm ";
			if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
		}
		if ((chuc != 0) && (chuc != 1)) {
			KetQua += ChuSo[chuc] + " mươi";
			if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
		}
		if (chuc == 1) KetQua += " mười ";
		switch (donvi) {
			case 1:
				if ((chuc != 0) && (chuc != 1)) {
					KetQua += " mốt ";
				}
				else {
					KetQua += ChuSo[donvi];
				}
				break;
			case 5:
				if (chuc == 0) {
					KetQua += ChuSo[donvi];
				}
				else {
					KetQua += " lăm ";
				}
				break;
			default:
				if (donvi != 0) {
					KetQua += ChuSo[donvi];
				}
				break;
		}
		return KetQua;
	}


}