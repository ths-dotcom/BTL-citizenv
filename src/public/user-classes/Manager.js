define(['user-classes/User', 'jquery'], function (User, $) {
    return class Manager extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };

        renderMenuLeft() {  // Render button and create structure of functions of manager users
            this.creatingPlaceButton = $("<div></div>", { "class": "body-left-home body-left-home-code" });
            $("<div class='body-left-home-content'><i class='fa fa-id-card' aria-hidden='true'></i><span>Khai báo và cấp mã</span></div>")
                .appendTo($(this.creatingPlaceButton));
            $(this.creatingPlaceButton).on('click', () => {
                this.creatingPlaceButtonClickEvent();
            });

            this.creatingAccountButton = $("<div></div>", { "class": "body-left-home body-left-home-account" });
            $("<div class='body-left-home-content'><i class='fa fa-user' aria-hidden='true'></i><span>Cấp và quản lý tài khoản</span></div>")
                .appendTo($(this.creatingAccountButton));
            $(this.creatingAccountButton).on('click', () => {
                this.creatingAccountButtonClickEvent();
            });

            this.citizenInfoButton = $("<div></div>", { "class": "body-left-home body-left-home-info" });
            $("<div class='body-left-home-content'><i class='fa fa-search' aria-hidden='true'></i><span>Xem thông tin người dân</span></div>")
                .appendTo($(this.citizenInfoButton));

            this.monitoringProgressButton = $("<div></div>", { "class": "body-left-home body-left-home-progress" });
            $("<div class='body-left-home-content'><i class='fa fa-line-chart' aria-hidden='true'></i><span>Theo dõi tiến độ nhập liệu</span></div>")
                .appendTo($(this.monitoringProgressButton));

            this.showStatisticButton = $("<div></div>", { "class": "body-left-home body-left-home-statistical" });
            $("<div class='body-left-home-content'><i class='fa fa-bar-chart' aria-hidden='true'></i><span>Báo cáo, thống kê</span></div>")
                .appendTo($(this.showStatisticButton));


            $('div.body-left').append($(this.creatingPlaceButton), $(this.creatingAccountButton), $(this.citizenInfoButton), $(this.monitoringProgressButton), $(this.showStatisticButton));
        };

        creatingPlaceButtonClickEvent() { // render structure of creating place function
            super.clearRightContent();
            $('div.body-right-content').append($('<div class="right-content-name">Khai báo và cấp mã</div>' +
                '<div class="right-content-code right-content-same">' +
                `<div class="content-code-head content-same-head">Khai báo / Cấp mã cho ${this.monitoring}</div>` +
                '<div class="content-code-body">' +
                '<div class="code-body-name this-body-same">' +
                '<div class="body-name-left body-same-left">' +
                `Tên ${this.monitoring}` +
                '</div>' +
                '<input type="text" class="name-khaibao-input same-left-input">' +
                '</div>' +
                '<div class="code-body-code this-body-same">' +
                ` <div class="body-code-left body-same-left">Mã ${this.monitoring}</div>` +
                '<input type="text" class="code-khaibao-input same-left-input">' +
                '</div>' +
                '<div class="code-body-password this-body-same">' +
                '<div class="body-password-left body-same-left">Xác nhận mật khẩu</div>' +
                '<input type="password" class="password-khaibao-input same-left-input" >' +
                '</div>' +
                '</div>' +
                '<div class="content-code-foot content-same-foot">' +
                '<button class="code-foot-no-btn same-foot-no-btn">Hủy</button>' +
                '<button class="code-foot-yes-btn same-foot-yes-btn">Xác nhận</button>' +
                '</div>' +
                '</div>'));

            $('div.body-right-content').append($('<div class="contain-table">' +
                `<div class="table-head-title">Danh sách các ${this.monitoring}</div>` +
                '<div class="body-table khaibao-tabel">' +
                '<table style="width:100%">' +
                '<!-- head-table -->' +
                '<thead>' +
                '<tr>' +
                `<th>Mã ${this.monitoring}</th>` +
                `<th>Tên ${this.monitoring}</th>` +
                '<th>Chỉ tiêu số dân</th>' +
                '<th>Tổng số dân đã nhập</th>' +
                '<th>Tiến độ nhập liệu</th>' +
                '<th>Thao tác</th>' +
                '</tr>' +
                ' </thead>' +
                '<!-- body-table -->' +
                '<tbody>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>'));
        };

        creatingAccountButtonClickEvent() {
            super.clearRightContent();
            $('div.body-right-content').append(
                '<div class="right-content-name">Cấp và quản lý tài khoản</div>' +
                '<div class="right-content-all">' +
                '<!-- Cap tai khoan -->' +
                '<div class="right-content-account right-content-same">' +
                `<div class="content-account-head content-same-head">Tạo tài khoản chi cục ${this.supervising}</div>` +
                '<div class="content-account-body">' +
                '<div class="account-body-name this-body-same">' +
                '<div class="body-name-left body-same-left">' +
                ' Tên tài khoản' +
                '</div>' +
                '<input type="text" class="name-taikhoan-input same-left-input">' +
                '</div>' +
                '<div class="account-body-password this-body-same">' +
                '<div class="body-password-left body-same-left">Nhập mật khẩu</div>' +
                '<input type="password" class="password-taikhoan-input same-left-input">' +
                '</div>' +
                '<div class="account-body-repassword this-body-same">' +
                '<div class="body-repassword-left body-same-left">Nhập lại mật khẩu</div>' +
                '<input type="password" class="repassword-taikhoan-input same-left-input" >' +
                '</div>' +
                '</div>' +
                '<div class="content-account-foot content-same-foot">' +
                '<button class="account-foot-no-btn same-foot-no-btn">Hủy</button>' +
                '<button class="account-foot-yes-btn same-foot-yes-btn">Tạo tài khoản</button>' +
                '</div>' +
                '</div>' +
                '<!-- Cap quyen khai bao -->' +
                '<div class="right-content-permission right-content-same">' +
                '<div class="content-permission-head content-same-head">Cấp / đóng quyền khai báo chi cục</div>' +
                '<div class="content-permission-body">' +
                '<div class="permission-body-name this-body-same">' +
                '<div class="body-name-left body-same-left">' +
                'Tên tài khoản' +
                '</div>' +
                '<input type="text" class="name-quyen-input same-left-input">' +
                '</div>' +
                '<div class="permission-body-time this-body-same">' +
                '<div class="body-time-from">Thời gian từ</div>' +
                '<input type="date" class="permission-time-start">' +
                '<div class="body-time-to">đến</div>' +
                '<input type="date" class="permission-time-end">' +
                '</div>' +
                '<div class="permission-body-password this-body-same">' +
                '<div class="body-password-left body-same-left">Xác nhận mật khẩu</div>' +
                '<input type="password" class="password-quyen-input same-left-input" >' +
                ' </div>' +
                '</div>' +
                '<div class="content-permission-foot content-same-foot">' +
                '<button class="permission-foot-no-btn same-foot-no-btn">Hủy</button>' +
                '<button class="permission-foot-yes-btn same-foot-yes-btn">Cấp quyền</button>' +
                '<button class="permission-foot-block-btn">Khóa quyền</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );

            $('div.body-right-content').append('<div class="contain-table taikhoan-tabel">' +
                '<div class="table-head-title">Danh sách các tài khoản chi cục A2</div>' +
                '<div class="body-table">' +
                ' <table style="width:100%">' +
                ' <thead>' +
                '<tr>' +
                '<th>' +
                ' Mã tài khoản' +
                '</th>' +
                ' <th>Tên tỉnh thành</th>' +
                '<th>Quyền khai báo</th>' +
                '<th>Thời điểm bắt đầu</th>' +
                '<th>Thời điểm kết thúc</th>' +
                '<th>Thao tác</th>' +
                ' </tr>' +
                '</thead>' +
                '<tbody>' +
                ' <tr>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>Đã kích hoạt' +
                '<button class="change-state-btn">Thay đổi</button>' +
                '</td>' +
                '<td>14/12/2021</td>' +
                '<td>' +
                ' 22/12/2021' +
                ' </td>' +
                ' <td>' +
                ' <button>Xem</button>' +
                '<button>Sua</button>' +
                ' <button>Xoa</button>' +
                ' </td>' +
                ' </tr>' +
                ' </tbody>' +
                ' </table>' +
                ' </div>'
            );
        };
    }

});




