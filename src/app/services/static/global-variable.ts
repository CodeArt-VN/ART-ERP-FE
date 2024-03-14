import { ApiSetting } from './api-setting';
import { APIListBase } from './api-list';
import { introAppData } from '../static/intro';

export var APIList: any = APIListBase;

APIList.FILE_Import = {
  NhanSu: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('CUS/FILE/NhanSu');
    },
  },
};

APIList.ACCOUNT_ApplicationUser = {
  getList: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('Account/ApplicationUsers');
    },
  },
  getItem: {
    method: 'GET',
    url: function (id) {
      return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
    },
  },
  putItem: {
    method: 'PUT',
    url: function (id) {
      return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
    },
  },
  postItem: {
    method: 'POST',
    url: function () {
      return ApiSetting.apiDomain('Account/ApplicationUsers');
    },
  },
  delItem: {
    method: 'DELETE',
    url: function (id) {
      return ApiSetting.apiDomain('Account/ApplicationUsers/') + id;
    },
  },

  postChangePassword: {
    method: 'POST',
    url: function () {
      return ApiSetting.apiDomain('Account/ChangePassword');
    },
  },
  postSetPassword: {
    method: 'POST',
    url: function () {
      return ApiSetting.apiDomain('Account/SetPassword');
    },
  },
};
APIList.ManualAPI = {
  getAvailbleDoctorTime: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('BOOK/Bookings/AvailbleDoctorTime');
    },
  },
  getDonHangPhanTai: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('CUS/CRM/CONTRACT/DonHang/PhanTai');
    },
  },

  getRPT_FileInFolder: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('CUS/DOC/File/RPT_FileInFolder');
    },
  },

  getRPTFileByType: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('CUS/DOC/File/RPT_FileByType');
    },
  },
};
APIList.ReportAPI = {
  getDoanhThuTong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/DoanhThuTong');
    },
  },
  getDoanhThuTheoKhachTongHop: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/DoanhThuTheoKhachTongHop');
    },
  },
  getDoanhThuTheoKhachKhoiLuongChiTiet: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/DoanhThuTheoKhachKhoiLuongChiTiet');
    },
  },
  getTongHopGioHoatDong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/TongHopGioHoatDong');
    },
  },
  getBangKeThuChi: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/BangKeThuChi');
    },
  },
  getBangKeChiPhiTheoNhanVien: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/BangKeChiPhiTheoNhanVien');
    },
  },
  getBaoCaoChiPhiTheoLoai: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/BaoCaoChiPhiTheoLoai');
    },
  },
  getBaoCaoNgayCong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('RPT/BaoCaoNgayCong');
    },
  },

  //Download files
  downloadDoanhThuTong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/DoanhThuTong');
    },
  },
  downloadDoanhThuTheoKhachTongHop: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/DoanhThuTheoKhachTongHop');
    },
  },
  downloadDoanhThuTheoKhachKhoiLuongChiTiet: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/DoanhThuTheoKhachKhoiLuongChiTiet');
    },
  },
  downloadTongHopGioHoatDong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/TongHopGioHoatDong');
    },
  },
  downloadBangKeThuChi: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/BangKeThuChi');
    },
  },
  downloadBangKeChiPhiTheoNhanVien: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/BangKeChiPhiTheoNhanVien');
    },
  },
  downloadBaoCaoChiPhiTheoLoai: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/BaoCaoChiPhiTheoLoai');
    },
  },
  downloadBaoCaoNgayCong: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('FILE/RPT/BaoCaoNgayCong');
    },
  },
};

APIList.POS_ForCustomer = {
  getSearchList: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('POS/ForCustomer/Search');
    },
  },
  getList: {
    method: 'GET',
    url: function () {
      return ApiSetting.apiDomain('POS/ForCustomer');
    },
  },

  getItem: {
    method: 'GET',
    url: function (id) {
      return ApiSetting.apiDomain('POS/ForCustomer/') + id;
    },
  },
  putItem: {
    method: 'PUT',
    url: function (id) {
      return ApiSetting.apiDomain('POS/ForCustomer/') + id;
    },
  },
  postItem: {
    method: 'POST',
    url: function () {
      return ApiSetting.apiDomain('POS/ForCustomer');
    },
  },
};

export var GlobalData: any = {
  Filter: {
    FromDate: new Date().setDate(1),
    ToDate: new Date(),
    IDBranch: null,
  },
  IntroApp: introAppData,
  IsCordova: true,
  Token: {
    access_token: '',
    expires_in: 0,
    token_type: '',
    refresh_token: '',
  },
  WebData: {
    menu: [],
    pinPost: [],
  },
  UserData: {
    MenuItem: [],
    Setting: {
      tablePageSize: 30,
      ToastMessageDelay: 5000,
    },
  },
  Version: '',
};
