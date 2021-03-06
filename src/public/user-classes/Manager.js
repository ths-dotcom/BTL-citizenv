define(['user-classes/User', 'jquery', 'lib/gstatic', 'axios'], function (User, $, chartapi, axios) {
    return class Manager extends User {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
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
                this.resetSelectedButton();
                this.creatingPlaceButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.creatingPlaceButtonClickEvent();
            }); // Add city function

            this.creatingAccountButton = $("<div></div>", { "class": "body-left-home body-left-home-account" });
            $("<div class='body-left-home-content'><i class='fa fa-user' aria-hidden='true'></i><span>Quản lý tài khoản</span></div>")
                .appendTo($(this.creatingAccountButton));
            $(this.creatingAccountButton).on('click', () => {
                this.resetSelectedButton();
                this.creatingAccountButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.creatingAccountButtonClickEvent();
            }); // Add account function

            this.citizenInfoButton = $("<div></div>", { "class": "body-left-home body-left-home-info" });
            $("<div class='body-left-home-content'><i class='fa fa-search' aria-hidden='true'></i><span>Xem thông tin người dân</span></div>")
                .appendTo($(this.citizenInfoButton));
            $(this.citizenInfoButton).on('click', () => {
                this.resetSelectedButton();
                this.citizenInfoButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.citizenInfoButtonClickEvent();
            }); // View citizen function

            this.monitoringProgressButton = $("<div></div>", { "class": "body-left-home body-left-home-progress" });
            $("<div class='body-left-home-content'><i class='fa fa-line-chart' aria-hidden='true'></i><span>Theo dõi tiến độ nhập liệu</span></div>")
                .appendTo($(this.monitoringProgressButton));
            $(this.monitoringProgressButton).on('click', () => {
                this.resetSelectedButton();
                this.monitoringProgressButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.monitoringProgressButtonClickEvent();
            }); // monitoring function

            this.showStatisticButton = $("<div></div>", { "class": "body-left-home body-left-home-statistical" });
            $("<div class='body-left-home-content'><i class='fa fa-bar-chart' aria-hidden='true'></i><span>Báo cáo, thống kê</span></div>")
                .appendTo($(this.showStatisticButton));
            $(this.showStatisticButton).on('click', () => {
                this.resetSelectedButton();
                this.showStatisticButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.showStatisticButtonClickEvent();
            }); // show statistic function


            $('div.body-left').append($(this.creatingPlaceButton), $(this.creatingAccountButton), $(this.citizenInfoButton), $(this.monitoringProgressButton), $(this.showStatisticButton));
            if (!this.declare_per) {
                $(this.creatingPlaceButton).addClass('divDisabled');
            }
        };

        homeButtonClickEvent() { // overloading home button event because of the table of city, district, ward, hamlet
            super.homeButtonClickEvent();
            this.renderTableOfPlaces();
        };

        creatingPlaceButtonClickEvent() { // render structure of creating place function
            super.clearRightContent();
            $('div.body-right-content').append($('<div class="right-content-name">Khai báo và cấp mã</div>' +
                '<div class="right-content-code right-content-same">' +
                `<div class="content-code-head content-same-head">Khai báo ${this.monitoring} và cấp tài khoản</div>` +
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
                '<div class="body-password-left body-same-left">Nhập mật khẩu</div>' +
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
                // '<div class="right-content-all">' +
                // '<!-- Cap tai khoan -->' +
                // '<div class="right-content-account right-content-same">' +
                // `<div class="content-account-head content-same-head">Tạo tài khoản chi cục ${this.supervising}</div>` +
                // '<div class="content-account-body">' +
                // '<div class="account-body-name this-body-same">' +
                // '<div class="body-name-left body-same-left">' +
                // ' Tên tài khoản' +
                // '</div>' +
                // '<input type="text" class="name-taikhoan-input same-left-input">' +
                // '</div>' +
                // '<div class="account-body-password this-body-same">' +
                // '<div class="body-password-left body-same-left">Nhập mật khẩu</div>' +
                // '<input type="password" class="password-taikhoan-input same-left-input">' +
                // '</div>' +
                // '<div class="account-body-repassword this-body-same">' +
                // '<div class="body-repassword-left body-same-left">Nhập lại mật khẩu</div>' +
                // '<input type="password" class="repassword-taikhoan-input same-left-input" >' +
                // '</div>' +
                // '</div>' +
                // '<div class="content-account-foot content-same-foot">' +
                // '<button class="account-foot-no-btn same-foot-no-btn">Hủy</button>' +
                // '<button class="account-foot-yes-btn same-foot-yes-btn">Tạo tài khoản</button>' +
                // '</div>' +
                // '</div>' +
                '<div class="right-content-name">Quản lý tài khoản</div>' +
                '<!-- Cap quyen khai bao -->' +
                '<div class="right-content-permission right-content-same">' +
                '<div class="content-permission-head content-same-head">Cấp / đóng quyền khai báo chi cục</div>' +
                '<div class="content-permission-body">' +
                '<div class="permission-body-name this-body-same">' +
                '<div class="body-name-left body-same-left">' +
                'Mã tài khoản' +
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
            //render the search form
            $('div.body-right-content').append('<div class="right-content-name">Xem danh sách dân số, thông tin người dân</div>' +
                '<div class="right-content-search" id="right-content-search-search">' +
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
                '<input type="radio" id="nu" name="gender" value="nữ">' +
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
                '</select>' +
                '<select name="xa" id="body-address-commune">' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet">' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-search-foot">' +
                ' <button class="search-foot-btn">' +
                '<i class="fa fa-search" aria-hidden="true"></i>' +
                ' TÌM KIẾM' +
                '</button>' +
                '</div>' +
                '</div>');

            //render the modify form
            $('div.body-right-content').append('<div class="right-content-search" id="right-content-search-modify" style="display:none">' +
                '<div class="content-search-head content-same-head">Dữ liệu người dân</div>' +
                '<div class="content-search-body">' +
                '<div class="search-body-code search-body-same">' +
                '<div class="dan-code-left search-same-divinput">' +
                '<div class="code-left-id">Số CMND / CCCD</div>' +
                '<input type="text" class="id-left-input modify-id-left-input">' +
                '</div>' +
                '<div class="dan-code-mid search-same-divinput">' +
                '<div class="code-mid-name">Họ và tên</div>' +
                '<input type="text" class="name-left-input modify-name-left-input">' +
                '</div>' +
                '<div class="dan-code-right search-same-divinput">' +
                '<div class="code-rigth-gender">Giới tính</div>' +
                '<input type="radio" id="nam" name="gender2" value="nam" class="gender-input modify-render-input">' +
                '<label for="nam">Nam</label>' +
                '<input type="radio" id="nu" name="gender2" value="nữ" class="gender-input modify-render-input">' +
                '<label for="nu">Nữ</label>' +
                '</div>' +
                '</div>' +
                '<div class="search-body-date search-body-same">' +
                '<div class="dan-date-left search-same-divinput">' +
                '<div class="date-left-date">Ngày sinh</div>' +
                '<input type="date" class="date-left-input modify-date-left-input">' +
                '</div>' +
                '<div class="dan-date-mid search-same-divinput">' +
                '<div class="date-mid-religion">Tôn giáo</div>' +
                '<input type="text" class="religion-mid-input modify-religion-mid-input">' +
                '</div>' +
                '<div class="dan-date-right search-same-divinput">' +
                '<div class="date-right-job">Nghề nghiệp</div>' +
                '<input type="text" class="job-right-input modify-job-right-input">' +
                '</div>' +
                '</div>' +
                '<div class="search-body-study search-body-same">' +
                '<div class="dan-study-left search-same-divinput">' +
                '<div class="study-left-text">Trình độ văn hóa</div>' +
                '<input type="text" class="study-left-input modify-study-left-input">' +
                '</div>' +
                '</div>' +
                '<div class="search-body-address search-body-same">' +
                '<div class="body-address-text">Địa chỉ thường trú</div>' +
                '<div class="body-address-content">' +
                '<select name="tinh" id="body-address-city" class="body-address-city modify-body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric" class="body-address-district modify-body-address-district">' +
                '<option selected disabled>Chon quan huyen</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune" class="body-address-commune modify-body-address-commune">' +
                '<option selected disabled>Chon phuong xa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet" class="body-address-hamlet modify-body-address-hamlet">' +
                '<option selected disabled>Chon thon ban</option>' +
                '</select>' +
                '</div>' +
                '' +
                '</div>' +
                '<div class="search-body-tamtru search-body-same">' +
                '<div class="body-tamtru-text">' +
                '<div class="body-tamtru-text-top">' +
                'Địa chỉ tạm trú' +
                '</div>' +
                '<div class="body-tamtru-text-bottom" style="font-size: 14px;">' +
                '<input type="checkbox" id="tamtru">' +
                'Giống thường trú' +
                '</div>' +
                '</div>' +
                '<div class="body-address-content">' +
                '<select name="tinh" id="body-address-city" class="body-address-city modify-body-address-city">' +
                '<option selected disabled>Chọn tỉnh thành</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric" class="body-address-district modify-body-address-district">' +
                '<option selected disabled>Chọn quận huyện</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune" class="body-address-commune modify-body-address-commune">' +
                '<option selected disabled>Chọn phường xã</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet" class="body-address-hamlet modify-body-address-hamlet">' +
                '<option selected disabled>Chọn thôn bản</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '<div class="search-body-hometown search-body-same">' +
                '<div class="body-hometown-text">' +
                '<div class="body-hometown-text-top">' +
                'Quê quán' +
                '</div>' +
                '<div class="body-hometown-text-bottom" style="font-size: 14px;">' +
                '<input type="checkbox" id="hometown">' +
                'Giống thường trú' +
                '</div>' +
                '</div>' +
                '<div class="body-address-content">' +
                '<select name="tinh" id="body-address-city" class="body-address-city modify-body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric" class="body-address-district modify-body-address-district">' +
                '<option selected disabled>Chon quan huyen</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune" class="body-address-commune modify-body-address-commune">' +
                '<option selected disabled>Chon phuong xa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet" class="body-address-hamlet modify-body-address-hamlet">' +
                '<option selected disabled>Chon thon ban</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-search-foot">' +
                '<button class="goback-foot-btn">' +
                '<i class="fa fa-ban" aria-hidden="true"></i>' +
                ' ĐÓNG LẠI' +
                '</button>' +
                '<button class="save-foot-btn">' +
                '<i class="fa fa-bookmark" aria-hidden="true"></i>' +
                ' LƯU LẠI' +
                '</button>' +
                '</div>' +
                '</div>');

            //render the citizen table
            $('div.body-right-content').append('<div class="contain-table">' +
                '<div class="table-head-title">Danh sách người dân</div>' +
                '<div class="body-table xemdan-tabel">' +
                '<table style="width:100%">' +
                '<thead>' +
                '<tr>' +
                '<th>' +
                'ID' +
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
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>');
        };

        monitoringProgressButtonClickEvent() { // render structure of monitoring progress function
            super.clearRightContent();
            $('div.body-right-content').append('<div class="right-content-name">Theo dõi tiến độ nhập liệu</div>' +
                '<div class="right-content-progress right-content-ratio">' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="this-top-left-number same-top-left-number">' +
                '</div>' +
                '<div class="this-top-left-text same-top-left-text">Đã hoàn thành</div>' +
                '</div>' +
                '<div class="ratio-this-top-right">' +
                '<i class="fa fa-hourglass-half" aria-hidden="true"></i>' +
                '' +
                '</div>' +
                '</div>' +
                '<div class="ratio-this-bottom ratio-same-bottom">' +
                '<div class="ratio-this-bottom-left">' +
                '</div>' +
                '<div class="ratio-this-bottom-right">' +
                '</div>' +
                '</div>' +
                '<div class="this-bottom-description">' +
                'Tiến độ nhập liệu' +
                '</div>' +
                '</div>' +
                '</div>');

            this.renderTableOfPlaces();

            // render piechart

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
                '</div>' +
                '<div class="children-top-left-text same-top-left-text">TRẺ EM</div>' +
                '</div>' +
                '<div class="ratio-children-top-right">' +
                '<i class="fa fa-child" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-children-bottom ratio-same-bottom">' +
                '<div class="ratio-children-bottom-left">' +
                '</div>' +
                '<div class="ratio-children-bottom-right">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="woman-top-left-number same-top-left-number">' +
                '</div>' +
                '<div class="woman-top-left-text same-top-left-text">PHỤ NỮ</div>' +
                '</div>' +
                '<div class="ratio-woman-top-right">' +
                '<i class="fa fa-female" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-woman-bottom ratio-same-bottom">' +
                '<div class="ratio-woman-bottom-left">' +
                '</div>' +
                '<div class="ratio-woman-bottom-right">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="old-top-left-number same-top-left-number">' +
                '</div>' +
                '<div class="old-top-left-text same-top-left-text">NGƯỜI CAO TUỔI</div>' +
                '</div>' +
                '<div class="ratio-old-top-right">' +
                '<i class="fa fa-wheelchair" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-old-bottom ratio-same-bottom">' +
                '<div class="ratio-old-bottom-left">' +
                '</div>' +
                '<div class="ratio-old-bottom-right">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-ratio-same">' +
                '<div class="ratio-same-top">' +
                '<div class="ratio-same-top-left">' +
                '<div class="all-top-left-number same-top-left-number">' +
                '</div>' +
                '<div class="all-top-left-text same-top-left-text">TỔNG SỐ NGƯỜI</div>' +
                '</div>' +
                '<div class="ratio-all-top-right">' +
                '<i class="fa fa-transgender-alt" aria-hidden="true"></i>' +
                '</div>' +
                '</div>' +
                '<div class="ratio-all-bottom ratio-same-bottom">' +
                '<div class="ratio-all-bottom-left">' +
                '</div>' +
                '<div class="ratio-all-bottom-right">' +
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
                '</div>');

            this.fillRatioTabs();

            //Biểu đồ tổng dân số
            google.charts.load("current", { packages: ['corechart'] });
            google.charts.setOnLoadCallback(async () => {
                const totalCitizenResponse = await axios({ // fill total ratio
                    method: 'GET',
                    url: '/api/analyst/count'
                });

                var data = google.visualization.arrayToDataTable([
                    ["Element", "Dân số", { role: "style" }],
                    ["1990", totalCitizenResponse.data.citizen.countEach[0], "#b87333"],
                    ["2000", totalCitizenResponse.data.citizen.countEach[1], "#76A7FA"],
                    ["2010", totalCitizenResponse.data.citizen.countEach[2], "gold"],
                    ["2020", totalCitizenResponse.data.citizen.countEach[3], "#703593"]
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
            google.charts.setOnLoadCallback(async () => {
                const ageCitizenResponse = await axios({ // fill total ratio
                    method: 'GET',
                    url: '/api/analyst/age'
                });
                var data = google.visualization.arrayToDataTable([
                    ['Age', 'Từ 0-14 tuổi', 'Từ 15-64 tuổi', 'Trên 65 tuổi', { role: 'annotation' }],
                    ['1990', ageCitizenResponse.data.age.kid[0], ageCitizenResponse.data.age.adult[0], ageCitizenResponse.data.age.elder[0], ''],
                    ['2000', ageCitizenResponse.data.age.kid[1], ageCitizenResponse.data.age.adult[1], ageCitizenResponse.data.age.elder[1], ''],
                    ['2010', ageCitizenResponse.data.age.kid[2], ageCitizenResponse.data.age.adult[2], ageCitizenResponse.data.age.elder[2], ''],
                    ['2020', ageCitizenResponse.data.age.kid[3], ageCitizenResponse.data.age.adult[3], ageCitizenResponse.data.age.elder[3], '']
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

            google.charts.setOnLoadCallback(async () => {
                //Biểu đồ Giới tính
                google.charts.load('current', { 'packages': ['corechart'] });
                const genderCitizenResponse = await axios({ // fill total ratio
                    method: 'GET',
                    url: '/api/analyst/gender'
                });
                var data = google.visualization.arrayToDataTable([
                    ['Year', 'Males', 'Female'],
                    ['1990', genderCitizenResponse.data.gender.nam[0], genderCitizenResponse.data.gender.nu[0]],
                    ['2000', genderCitizenResponse.data.gender.nam[1], genderCitizenResponse.data.gender.nu[1]],
                    ['2010', genderCitizenResponse.data.gender.nam[2], genderCitizenResponse.data.gender.nu[2]],
                    ['2020', genderCitizenResponse.data.gender.nam[3], genderCitizenResponse.data.gender.nu[3]]
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
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(async () => {

                const academicCitizenResponse = await axios({ // fill total ratio
                    method: 'GET',
                    url: '/api/analyst/academic-level'
                });

                var data = google.visualization.arrayToDataTable([
                    ['Task', 'Tỉ lệ'],
                    ['Đại học', academicCitizenResponse.data.academic.daihoc],
                    ['Phổ thông', academicCitizenResponse.data.academic.phothong],
                    ['Không có', academicCitizenResponse.data.academic.khong]
                ]);

                var options = {
                    title: 'Dân số theo trình độ văn hóa'
                };
                var chart = new google.visualization.PieChart(document.getElementById('nganhnghechart_values'));
                chart.draw(data, options);

            });
        };
    }
});




