define(['user-classes/User', 'jquery'], function (User, $) {
    return class Manager extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };

        renderMenuLeft() {
            this.creatingPlaceButton = $("<div></div>", { "class": "body-left-home body-left-home-code" });
            $(this.creatingPlaceButton).on('click', () => {
                this.creatingPlaceButtonClickEvent();
            });
            $("<div class='body-left-home-content'><i class='fa fa-id-card' aria-hidden='true'></i><span>Khai báo và cấp mã</span></div>")
                .appendTo($(this.creatingPlaceButton));

            this.creatingAccountButton = $("<div></div>", { "class": "body-left-home body-left-home-account" });
            $("<div class='body-left-home-content'><i class='fa fa-user' aria-hidden='true'></i><span>Cấp và quản lý tài khoản</span></div>")
                .appendTo($(this.creatingAccountButton));

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

        creatingPlaceButtonClickEvent() {
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
                '<tr>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>20.000</td>' +
                '<td>18.000</td>' +
                '<td>Chưa hoàn thành' +
                '<button class="td-detail-btn">Chi tiết</button>' +
                ' </td>' +
                '<td>' +
                '<button class="td-see-btn td-same-btn">' +
                '<i class="fa fa-eye" aria-hidden="true"></i>' +
                ' Xem</button>' +
                '<button class="td-fix-btn td-same-btn">' +
                '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
                ' Sửa</button>' +
                '<button class="td-delete-btn td-same-btn">' +
                '<i class="fa fa-times" aria-hidden="true"></i>' +
                'Xóa</button>' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>'));
        };

    }

});




