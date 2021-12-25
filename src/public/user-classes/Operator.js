define(['user-classes/User', 'jquery'], function (User, $) {
    return class Operator extends User {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
        };
        renderMenuLeft() {
            super.renderMenuLeft();

            this.inputCitizenButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-keyboard-o' aria-hidden='true'></i><span>Nhập liệu dân số</span></div>")
                .appendTo($(this.inputCitizenButton));
            $(this.inputCitizenButton).on('click', () => {
                this.resetSelectedButton();
                this.inputCitizenButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.inputCitizenButtonClickEvent();
            }); //add input citizen function

            this.printButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-print' aria-hidden='true'></i><span>Phát phiếu điều tra</span></div>")
                .appendTo($(this.printButton));
            $(this.printButton).on('click', () => {
                this.resetSelectedButton();
                this.printButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.printButtonClickEvent();
            }); //add printting citizen input form function


            $('div.body-left').append($(this.inputCitizenButton), $(this.printButton));
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();

        }

        inputCitizenButtonClickEvent() {
            super.clearRightContent();

            $('div.body-right-content').append('<div class="right-content-name right-add-people">' +
                '<div class="right-content-text">Nhập dữ liệu dân số</div>' +
                '<div class="right-content-finish">' +
                '<button class="add-finish-btn">' +
                '<i class="fa fa-check" aria-hidden="true"></i>' +
                '<span>Báo cáo hoàn thành</span>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '<div class="right-content-search" id="right-content-search-modify">' +
                '<div class="content-search-head content-same-head">Nhập dữ liệu người dân</div>' +
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
                '<div class="search-body-study search-body-same">' +
                '<div class="dan-study-left search-same-divinput">' +
                '<div class="study-left-text">Trình độ văn hóa</div>' +
                '<input type="text" class="study-left-input">' +
                '</div>' +
                '</div>' +
                '<div class="search-body-address search-body-same">' +
                '<div class="body-address-text">Địa chỉ thường trú</div>' +
                '<div class="body-address-content">' +
                '<select name="tinh" id="body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric">' +
                '<option selected disabled>Chon quan huyen</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune">' +
                '<option selected disabled>Chon phuong xa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet">' +
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
                '<select name="tinh" id="body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '<option>Ha Noi</option>' +
                '<option>HCM</option>' +
                '<option>Da NANG</option>' +
                '<option>Hai Phong</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric">' +
                '<option selected disabled>Chon quan huyen</option>' +
                '<option value="Thach That">Thach That</option>' +
                '<option value="Ba vi">Ba Vi</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune">' +
                '<option selected disabled>Chon phuong xa</option>' +
                '<option value="Tan Phu">Tan Phu</option>' +
                '<option value="Cong Hoa">Cong Hoa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet">' +
                '<option selected disabled>Chon thon ban</option>' +
                '<option value="ha hoa">Ha Hoa</option>' +
                '<option value="yen quan">Yen Quan</option>' +
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
                '<select name="tinh" id="body-address-city">' +
                '<option selected disabled>Chon tinh thanh</option>' +
                '<option>Ha Noi</option>' +
                '<option>HCM</option>' +
                '<option>Da NANG</option>' +
                '<option>Hai Phong</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '<option>Quang Ninh</option>' +
                '</select>' +
                '' +
                '<select name="huyen" id="body-address-distric">' +
                '<option selected disabled>Chon quan huyen</option>' +
                '<option value="Thach That">Thach That</option>' +
                '<option value="Ba vi">Ba Vi</option>' +
                '</select>' +
                '<select name="xa" id="body-address-commune">' +
                '<option selected disabled>Chon phuong xa</option>' +
                '<option value="Tan Phu">Tan Phu</option>' +
                '<option value="Cong Hoa">Cong Hoa</option>' +
                '</select>' +
                '<select name="thon" id="body-address-hamlet">' +
                '<option selected disabled>Chon thon ban</option>' +
                '<option value="ha hoa">Ha Hoa</option>' +
                '<option value="yen quan">Yen Quan</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content-search-foot">' +
                '<button class="search-foot-btn">' +
                '<i class="fa fa-plus" aria-hidden="true"></i>' +
                'THÊM MỚI' +
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

        printButtonClickEvent() {
            super.clearRightContent();

            $('div.body-right-content').append('<div class="right-content-name right-print-phieu">' +
                '<div class="right-content-text">Phát phiếu điều tra dân số</div>' +
                '<div class="right-content-print">' +
                '<a href="https://docs.google.com/document/d/1Q_x4n7pn3WGLODiI4lsPOFbAme9PY0Eu/edit?usp=sharing&ouid=104234781315676327803&rtpof=true&sd=true" target="_blank">' +
                '<button class="add-print-btn">' +
                '<i class="fa fa-print" aria-hidden="true"></i>' +
                '<span>Phát phiếu điều tra</span>' +
                '</button>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '<div class="right-inphieu">' +
                '<div class="right-inphieu-text">Mẫu phiếu điều tra</div>' +
                '<div class="right-inphieu-image">' +
                '<img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.15752-9/262212167_3177410122581424_6179179308854437394_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=8BRA89fZ8ywAX-Tnw0q&tn=Zh_ac8gjx3BYwsnB&_nc_ht=scontent-sin6-4.xx&oh=03_AVIlAIh1OXGAqW0yzvQ_hDGQsUiEXfgKLClkuOJSnDO3SA&oe=61E79C2C" alt="">' +
                '</div>' +
                '</div>');
        };

    }
});

