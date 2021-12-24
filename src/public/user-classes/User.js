define(['jquery'], function ($) {
    return class User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.per_scope = per_scope;
            this.role_id = role_id;
            this.declare_per = declare_per;
            let temp1 = '';
            let temp2 = '';
            switch (role_id) {
                case 1:
                    temp1 = 'tỉnh thành phố';
                    temp2 = 'A2';
                    break;
                case 2:
                    temp1 = 'quận Huyện';
                    temp2 = 'A3';
                    break;
                case 3:
                    temp1 = 'xã phường';
                    temp2 = 'B1';
                    break;
                case 4:
                    temp1 = 'thôn bản';
                    temp2 = 'B2';
                    break;
            };
            this.monitoring = temp1;
            this.supervising = temp2;
        };

        renderMenuLeft() {
            this.homeButton = $("<div></div>", { "class": "body-left-home body-left-home-home" });
            $("<div class='body-left-home-content body-left-home-content-active'><i class='fa fa-home' aria-hidden='true'></i><span>Trang chủ</span></div>")
                .appendTo($(this.homeButton));
            $(this.homeButton).on('click', () => {
                this.homeButtonClickEvent();
            }); // Add home function

            $('div.body-left').append($(this.homeButton));
        };

        homeButtonClickEvent() {
            this.clearRightContent();
            $('div.body-right-content').append('<div class="right-content-name">Trang chủ</div>' +
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
                '<span>12 </span>' +
                '/ ' +
                '<span>99 </span>' +
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
                '<span>44 </span>' +
                '/ ' +
                '<span>99 </span>' +
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
                '<span>12 </span>' +
                '/ ' +
                '<span>99 </span>' +
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
                '<span> 99 </span>' +
                'NGƯỜI' +
                '</div>' +
                '<div class="ratio-all-bottom-right">' +
                '100%' +
                '</div>' +
                '</div>' +
                '</div>' +
                '' +
                '</div>');
        };

        renderInfo() {
            $('div.left-account-name').text('Cán bộ ' + this.name);
            $('span.name-account-text').text('Cán bộ ' + this.name);
        };

        clearRightContent() {
            $('div.body-right-content').empty();
        };
    }
}
);

