define(['user-classes/User', 'jquery', 'lib/gstatic'], function (User, $, chartapi) {
    return class Manager extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };

        renderTableOfPlaces() {
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

        renderMenuLeft() {  // Render button and create structure of functions of manager users
            super.renderMenuLeft();

            this.creatingPlaceButton = $("<div></div>", { "class": "body-left-home body-left-home-code" });
            $("<div class='body-left-home-content'><i class='fa fa-id-card' aria-hidden='true'></i><span>Khai báo và cấp mã</span></div>")
                .appendTo($(this.creatingPlaceButton));
            $(this.creatingPlaceButton).on('click', () => {
                this.creatingPlaceButtonClickEvent();
            }); // Add city function

            this.creatingAccountButton = $("<div></div>", { "class": "body-left-home body-left-home-account" });
            $("<div class='body-left-home-content'><i class='fa fa-user' aria-hidden='true'></i><span>Cấp và quản lý tài khoản</span></div>")
                .appendTo($(this.creatingAccountButton));
            $(this.creatingAccountButton).on('click', () => {
                this.creatingAccountButtonClickEvent();
            }); // Add account function

            this.citizenInfoButton = $("<div></div>", { "class": "body-left-home body-left-home-info" });
            $("<div class='body-left-home-content'><i class='fa fa-search' aria-hidden='true'></i><span>Xem thông tin người dân</span></div>")
                .appendTo($(this.citizenInfoButton));
            $(this.citizenInfoButton).on('click', () => {
                this.citizenInfoButtonClickEvent();
            }); // View citizen function

            this.monitoringProgressButton = $("<div></div>", { "class": "body-left-home body-left-home-progress" });
            $("<div class='body-left-home-content'><i class='fa fa-line-chart' aria-hidden='true'></i><span>Theo dõi tiến độ nhập liệu</span></div>")
                .appendTo($(this.monitoringProgressButton));
            $(this.monitoringProgressButton).on('click', () => {
                this.monitoringProgressButtonClickEvent();
            });

            this.showStatisticButton = $("<div></div>", { "class": "body-left-home body-left-home-statistical" });
            $("<div class='body-left-home-content'><i class='fa fa-bar-chart' aria-hidden='true'></i><span>Báo cáo, thống kê</span></div>")
                .appendTo($(this.showStatisticButton));
            $(this.showStatisticButton).on('click', () => {
                this.showStatisticButtonClickEvent();
            });


            $('div.body-left').append($(this.creatingPlaceButton), $(this.creatingAccountButton), $(this.citizenInfoButton), $(this.monitoringProgressButton), $(this.showStatisticButton));
        };

        homeButtonClickEvent() { // overloading home button event because of the table of city, district, ward, hamlet
            super.homeButtonClickEvent();
            this.renderTableOfPlaces();
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

            this.renderTableOfPlaces();
        };

        creatingAccountButtonClickEvent() { // render structure of creating account function
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
                `<div class="table-head-title">Danh sách các tài khoản chi cục ${this.supervising}</div>` +
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
                ' </tbody>' +
                ' </table>' +
                ' </div>'
            );
        };

        citizenInfoButtonClickEvent() { // render structure of viewing citizen info function
            super.clearRightContent();
            $('div.body-right-content').append('<div class="right-content-name">Xem danh sách dân số, thông tin người dân</div>' +
                '<div class="right-content-search">' +
                '<div class="content-search-head content-same-head">Tìm kiếm người dân</div>' +
                '<div class="content-search-body">' +
                '<div class="search-body-code search-body-same">' +
                '<div class="dan-code-left search-same-divinput">' +
                '<div class="code-left-id">Số CMND / CCCD</div>' +
                '<input type="text" class="id-left-input">' +
                '</div>' +
                '<div class="dan-code-mid search-same-divinput">' +
                '<div class="code-mid-name">Họ và tên</div>' +
                '<input type="text" class="name-left-input">' +
                '</div>' +
                '<div class="dan-code-right search-same-divinput">' +
                '<div class="code-rigth-gender">Giới tính</div>' +
                '<input type="radio" id="nam" name="gender" value="nam">' +
                '<label for="nam">Nam</label>' +
                '<input type="radio" id="nu" name="gender" value="nu">' +
                '<label for="nu">Nữ</label>' +
                '</div>' +
                '</div>' +
                '<div class="search-body-date search-body-same">' +
                '<div class="dan-date-left search-same-divinput">' +
                '<div class="date-left-date">Ngày sinh</div>' +
                '<input type="date" class="date-left-input">' +
                '</div>' +
                '<div class="dan-date-mid search-same-divinput">' +
                '<div class="date-mid-religion">Tôn giáo</div>' +
                '<input type="text" class="religion-mid-input">' +
                '</div>' +
                '<div class="dan-date-right search-same-divinput">' +
                '<div class="date-right-job">Nghề nghiệp</div>' +
                '<input type="text" class="job-right-input">' +
                '</div>' +
                '</div>' +
                '<div class="search-body-address search-body-same">' +
                '<div class="body-address-text">Địa chỉ</div>' +
                '<div class="body-address-content">' +
                '<select name="tinh" id="body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '</select>' +

                '<select name="huyen" id="body-address-distric">' +
                '<option value="Thach That">Thach That</option>' +
                '<option value="Ba vi">Ba Vi</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune">' +
                '<option value="Tan Phu">Tan Phu</option>' +
                '<option value="Cong Hoa">Cong Hoa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet">' +
                '<option value="ha hoa">Ha Hoa</option>' +
                '<option value="yen quan">Yen Quan</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-search-foot">' +
                ' <button class="search-foot-btn">' +
                '<i class="fa fa-search" aria-hidden="true"></i>' +
                'TÌM KIẾM' +
                '</button>' +
                '</div>' +
                '</div>');

            $('div.body-right-content').append('<div class="contain-table">' +
                '<div class="table-head-title">Danh sách người dân</div>' +
                '<div class="body-table xemdan-tabel">' +
                '<table style="width:100%">' +
                '<thead>' +
                '<tr>' +
                '<th>' +
                'STT' +
                '</th>' +
                '<th>Số CMND</th>' +
                '<th>Họ và tên</th>' +
                '<th>Ngày sinh</th>' +
                '<th>Giới tính</th>' +
                '<th>Địa chỉ</th>' +
                '<th>Thao tác</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td>01</td>' +
                '<td>0142348127</td>' +
                '<td>' +
                'Nguyễn Thị Nhật Anh' +
                '</td>' +
                '<td>18/09/2001</td>' +
                '<td>' +
                'Nữ' +
                '</td>' +
                '<td>xã Cộng Hòa - huyện Quốc Oai - thành phố Hà Nội</td>' +
                '<td>' +
                '<button class="see-detail-person">Xem chi tiết</button>' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>');
        };

        monitoringProgressButtonClickEvent() { // render structure of monitoring progress function
            super.clearRightContent();
            $('div.body-right-content').append('<div class="right-content-name">Theo dõi tiến độ nhập liệu</div>' +
                '<div class="right-content-progress">' +
                '<div class="content-progress-chart">' +
                '<div id="tiendo" style="height: 100%;" class="tiendo-chart"></div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="best-top-left-number same-top-left-number">' +
                '99%' +
                '</div>' +
                '<div class="best-top-left-text same-top-left-text">Đã hoàn thành</div>' +
                '</div>' +
                '<div class="ratio-best-top-right">' +
                '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>' +
                '' +
                '</div>' +
                '</div>' +
                '<div class="ratio-best-bottom ratio-same-bottom">' +
                '<div class="ratio-best-bottom-left">' +
                '<span>12</span>' +
                '/' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-best-bottom-right">' +
                'Hà Nội' +
                '</div>' +
                '</div>' +
                '<div class="best-bottom-description">' +
                'Tiến độ nhanh nhất' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="worst-top-left-number same-top-left-number">' +
                '10%' +
                '</div>' +
                '<div class="worst-top-left-text same-top-left-text">Đã hoàn thành</div>' +
                '</div>' +
                '<div class="ratio-worst-top-right">' +
                '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>' +
                '' +
                '</div>' +
                '</div>' +
                '<div class="ratio-worst-bottom ratio-same-bottom">' +
                '<div class="ratio-worst-bottom-left">' +
                '<span>10</span>' +
                '/' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-worst-bottom-right">' +
                'Hồ Chí Minh' +
                '</div>' +
                '</div>' +
                '<div class="worst-bottom-description">' +
                'Tiến độ chậm nhất' +
                '</div>' +
                '</div>' +
                '</div>');

            this.renderTableOfPlaces();
        };

        showStatisticButtonClickEvent() { // render structure of showing statistics function
            super.clearRightContent();

            $('div.body-right-content').append('<div class="right-content-name">Tổng hợp và phân tích số liệu</div>' +
                '<div class="right-solieu-div">' +
                '<div class="solieu-div-text">Tổng hợp và phân tích số liệu các tỉnh :' +
                '<span>HA NOI, HCM</span>' +
                '</div>' +
                '<div class="right-content-ratio">' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="children-top-left-number same-top-left-number">' +
                '12' +
                '</div>' +
                '<div class="children-top-left-text same-top-left-text">TRẺ EM</div>' +
                '</div>' +
                '<div class="ratio-children-top-right">' +
                '<i class="fa fa-child" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-children-bottom ratio-same-bottom">' +
                '<div class="ratio-children-bottom-left">' +
                '<span>12</span>' +
                '/' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-children-bottom-right">' +
                '12,12%' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="woman-top-left-number same-top-left-number">' +
                '44' +
                '</div>' +
                '<div class="woman-top-left-text same-top-left-text">PHỤ NỮ</div>' +
                '</div>' +
                '<div class="ratio-woman-top-right">' +
                '<i class="fa fa-female" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-woman-bottom ratio-same-bottom">' +
                '<div class="ratio-woman-bottom-left">' +
                '<span>44</span>' +
                '/' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-woman-bottom-right">' +
                '44,44%' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="old-top-left-number same-top-left-number">' +
                '12' +
                '</div>' +
                '<div class="old-top-left-text same-top-left-text">NGƯỜI CAO TUỔI</div>' +
                '</div>' +
                '<div class="ratio-old-top-right">' +
                '<i class="fa fa-wheelchair" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-old-bottom ratio-same-bottom">' +
                '<div class="ratio-old-bottom-left">' +
                '<span>12</span>' +
                '/' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-old-bottom-right">' +
                '12,12%' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="all-top-left-number same-top-left-number">' +
                '99' +
                '</div>' +
                '<div class="all-top-left-text same-top-left-text">TỔNG SỐ NGƯỜI</div>' +
                '</div>' +
                '<div class="ratio-all-top-right">' +
                '<i class="fa fa-transgender-alt" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-all-bottom ratio-same-bottom">' +
                '<div class="ratio-all-bottom-left">' +
                'TỔNG' +
                '<span>99</span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-all-bottom-right">' +
                '100%' +
                '</div>' +
                '</div>' +
                '</div>' +
                '' +
                '</div>' +
                '</div>');

            $('div.body-right-content').append('<div class="right-bieudo-div">' +
                '<div class="bieudo-text-description">Biểu đồ thống kê số liệu</div>' +
                '<div class="bieudo-div-top">' +
                '<div id="tongdanchart_values" class="bieudo-chart" style="width: 50%;"></div>' +
                '<div id="dotuoichart_values" class="bieudo-chart" style="width: 50%;"></div>' +
                '</div>' +
                '<div class="bieudo-div-bottom">' +
                '<div id="gioitinhchart_values" class="bieudo-chart" style="width: 50%; height: 400px;"></div>' +
                '<div id="nganhnghechart_values" class="bieudo-chart" style="width: 50%; height: 400px;"></div>' +
                '</div>' +
                '</div>' +
                '<div class="contain-table trangchu-tabel">' +
                '<div class="table-head-title">Danh sách thống kê tỉnh thành</div>' +
                '<div class="body-table">' +
                '<table style="width:100%">' +
                '<thead>' +
                '<tr>' +
                '<th>' +
                'Chọn tỉnh thành' +
                '</th>' +
                '<th>Mã tỉnh</th>' +
                '<th>Tên tỉnh thành</th>' +
                '<th>Tổng số dân</th>' +
                '<th>Số trẻ em</th>' +
                '<th>Số phụ nữ</th>' +
                '<th>Số người cao tuổi</th>' +
                '<th>Thao tác</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                '<input type="checkbox" class="custom-control-input" id="customcheck1">' +
                '</td>' +
                '<td>01</td>' +
                '<td>Hà Nội</td>' +
                '<td>200</td>' +
                '<td>40</td>' +
                '<td>100</td>' +
                '<td>30</td>' +
                '<td><button class="see-more-btn">Xem chi tiết</button></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>');

            //Biểu đồ tổng dân số
            google.charts.load("current", { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                var data = google.visualization.arrayToDataTable([
                    ["Element", "Dân số", { role: "style" }],
                    ["1980", 96, "gray"],
                    ["1990", 110, "#b87333"],
                    ["2000", 120, "#76A7FA"],
                    ["2010", 130, "gold"],
                    ["2020", 140, "#703593"]
                ]);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                    {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2]);

                var options = {
                    title: "Tổng dân số qua các thời kì (người / năm)",
                    vAxis: { minValue: 0 },
                    height: 400,
                    bar: { groupWidth: "95%" },
                    legend: { position: "none" },
                };
                var chart = new google.visualization.ColumnChart(document.getElementById("tongdanchart_values"));
                chart.draw(view, options);
            });

            //Biểu đồ theo độ tuổi
            google.charts.load("current", { packages: ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                var data = google.visualization.arrayToDataTable([
                    ['Age', 'Từ 0-14 tuổi', 'Từ 15-64 tuổi', 'Trên 65 tuổi', { role: 'annotation' }],
                    ['1980', 10, 48, 20, ''],
                    ['1990', 16, 50, 23, ''],
                    ['2000', 28, 53, 29, ''],
                    ['2010', 28, 69, 29, ''],
                    ['2020', 28, 72, 29, '']
                ]);

                var view = new google.visualization.DataView(data);

                var options_fullStacked = {
                    title: "Tỉ lệ dân số theo độ tuổi qua các thời kì (phần trăm)",
                    isStacked: 'percent',
                    height: 400,
                    legend: { position: 'top', maxLines: 3 },
                    vAxis: {
                        minValue: 0,
                        ticks: [0, .3, .6, .9, 1]
                    }
                };
                var options = {
                    width: 600,
                    height: 300,
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    isStacked: true,
                };
                var chart = new google.visualization.ColumnChart(document.getElementById("dotuoichart_values"));
                chart.draw(view, options_fullStacked);
            });

            //Biểu đồ Giới tính
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(() => {
                var data = google.visualization.arrayToDataTable([
                    ['Year', 'Males', 'Female'],
                    ['1980', 900, 1000],
                    ['1990', 1170, 1190],
                    ['2000', 1210, 1200],
                    ['2010', 1300, 1270],
                    ['2020', 1500, 1420]
                ]);

                var options = {
                    title: 'Số nam, nữ qua các thời kì (người)',
                    vAxis: { minValue: 0 },
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                var chart = new google.visualization.LineChart(document.getElementById('gioitinhchart_values'));

                chart.draw(data, options);
            });

            //Ngành nghề
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(() => {
                var data = google.visualization.arrayToDataTable([
                    ['Year', 'Nông nghiệp', 'Công nghiệp', 'Dịch vụ'],
                    ['1980', 1000, 400, 200],
                    ['1990', 1170, 460, 250],
                    ['2000', 660, 1120, 300],
                    ['2010', 1030, 540, 350],
                    ['2020', 1400, 1230, 400]
                ]);

                var options = {
                    chart: {
                        title: 'Dân số theo trình độ văn hóa',
                        subtitle: 'Đại học, Công nghiệp và Dịch vụ: 1980-2020',
                    }
                };

                var chart = new google.charts.Bar(document.getElementById('nganhnghechart_values'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            });
        };
    }
});




