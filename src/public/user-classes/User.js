define(['jquery', 'axios'], function ($, axios) {
    return class User {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.per_scope = per_scope;
            this.role_id = role_id;
            this.declare_per = declare_per;
            this.address = address;
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
            this.arrayOfAddress = String(address).split(' - ');
        };

        fillRatioTabs() { // fill 4 ratio tabs (children, women, elderly, total)
            let total = 0;
            axios({ // fill total ratio
                method: 'GET',
                url: '/api/analyst/count'
            }).then((res) => {
                if (res.data.success) {
                    total = res.data.citizen.tong;
                    $('div.all-top-left-number.same-top-left-number').empty();
                    $('div.ratio-all-bottom-left').empty();
                    $('div.all-top-left-number.same-top-left-number').append(`${res.data.citizen.tong}`);
                    $('div.ratio-all-bottom-left').append(`TỔNG <span> ${res.data.citizen.tong} </span> NGƯỜI`);


                    axios({ // fill women ratio
                        method: 'GET',
                        url: '/api/analyst/gender'
                    }).then((res) => {
                        if (res.data.success) {
                            $('div.woman-top-left-number.same-top-left-number').empty();
                            $('div.ratio-woman-bottom-left').empty();
                            $('div.ratio-woman-bottom-right').empty();
                            $('div.woman-top-left-number.same-top-left-number').append(`${res.data.gender.tong.countNu}`);
                            $('div.ratio-woman-bottom-left').append(`<span>${res.data.gender.tong.countNu} </span> / <span>${res.data.citizen.tong} </span> NGƯỜI`);
                            $('div.ratio-woman-bottom-right').append(`${((res.data.gender.tong.countNu / res.data.citizen.tong) * 100).toFixed(2)}%`);
                        };
                    });

                    axios({ // fill kid and elderly ratio
                        method: 'GET',
                        url: '/api/analyst/age'
                    }).then((res) => {
                        console.log(res);
                        if (res.data.success) {
                            //fill kid ratio
                            $('div.children-top-left-number.same-top-left-number').empty();
                            $('div.ratio-children-bottom-left').empty();
                            $('div.ratio-children-bottom-right').empty();
                            $('div.children-top-left-number.same-top-left-number').append(`${res.data.age.tong.countKid}`);
                            $('div.ratio-children-bottom-left').append(`<span>${res.data.age.tong.countKid} </span> / <span>${res.data.citizen.tong} </span> NGƯỜI`);
                            $('div.ratio-children-bottom-right').append(`${((res.data.age.tong.countKid / res.data.citizen.tong) * 100).toFixed(2)}%`);

                            //kill elderly ratio
                            $('div.old-top-left-number.same-top-left-number').empty();
                            $('div.ratio-old-bottom-left').empty();
                            $('div.ratio-old-bottom-right').empty();
                            $('div.old-top-left-number.same-top-left-number').append(`${res.data.age.tong.countElder}`);
                            $('div.ratio-old-bottom-left').append(`<span>${res.data.age.tong.countElder} </span> / <span>${res.data.citizen.tong} </span> NGƯỜI`);
                            $('div.ratio-old-bottom-right').append(`${((res.data.age.tong.countElder / res.data.citizen.tong) * 100).toFixed(2)}%`);
                        };
                    });
                };
            });
        };

        resetSelectedButton() {
            $('div.body-left').children().children('.body-left-home-content-active').removeClass('body-left-home-content-active');
        };

        renderMenuLeft() {
            this.homeButton = $("<div></div>", { "class": "body-left-home body-left-home-home" });
            $("<div class='body-left-home-content body-left-home-content-active'><i class='fa fa-home' aria-hidden='true'></i><span>Trang chủ</span></div>")
                .appendTo($(this.homeButton));
            $(this.homeButton).on('click', () => {
                this.resetSelectedButton();
                this.homeButton.children('.body-left-home-content').addClass('body-left-home-content-active');
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
                '</div>');

            this.fillRatioTabs();
        };

        renderInfo() {
            $('div.left-account-name').text(this.name);
            $('span.name-account-text').text(this.name);
            $('div.content-name-address').append(`<span>${this.address}</span>`);
        };

        clearRightContent() {
            $('div.body-right-content').empty();
        };
    }
}
);

