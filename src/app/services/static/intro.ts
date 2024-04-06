export var introAppData = {
  introList: [
    {
      page: '',
      intro: {
        steps: [
          {
            intro: 'ART DMS!',
          },
          {
            element: '#app-menu > ion-header > div.app-logo-wrapper > div > select',
            intro: 'Chọn đơn vị để lấy dữ liệu',
            position: 'bottom',
          },
          {
            element: 'body > app-root > ion-app > div > a',
            intro: 'Xem thông tin cá nhân, thoát khỏi tài khoản',
            position: 'bottom',
          },

          {
            intro:
              'Còn nhiều chức năng hơn nữa <span style="color: red;">sẽ</span> <span style="color: green;">sớm</span> <span style="color: blue;">ra mắt	</span>.',
          },
        ],
      },
    },
    {
      page: 'page-member',
      intro: {
        steps: [
          {
            intro: 'Hello world!',
          },
          {
            element: '#step1',
            intro: 'This is a tooltip.',
            position: 'bottom',
          },
          {
            intro:
              'More features, more <span style="color: red;">f</span><span style="color: green;">u</span><span style="color: blue;">n</span>.',
          },
        ],
      },
    },
  ],
  getIntroByPage: function (page) {
    let result = introAppData.introList[0]; //.find(d => d.page == page);
    return result;
  },
};
