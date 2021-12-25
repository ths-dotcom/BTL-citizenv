define(['user-classes/Operator', 'jquery', 'axios'], function (Operator, $, axios) {
    return class B2 extends Operator {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
        };
        start() { //run all the functionalities of B2 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        fillRatioTabs() { // fill 4 ratio tabs (children, women, elderly, total)
            let total = 0;
            axios({ // fill total ratio
                method: 'GET',
                url: '/api/analyst/count'
            }).then((res) => {
                if (res.data.success) {
                    total = res.data.count;
                    $('div.all-top-left-number.same-top-left-number').empty();
                    $('div.ratio-all-bottom-left').empty();
                    $('div.all-top-left-number.same-top-left-number').append(`${res.data.count}`);
                    $('div.ratio-all-bottom-left').append(`TỔNG <span> ${res.data.count} </span> NGƯỜI`);
                };
            });

            axios({ // fill women ratio
                method: 'GET',
                url: '/api/analyst/gender'
            }).then((res) => {
                if (res.data.success) {
                    $('div.woman-top-left-number.same-top-left-number').empty();
                    $('div.ratio-woman-bottom-left').empty();
                    $('div.ratio-woman-bottom-right').empty();
                    $('div.woman-top-left-number.same-top-left-number').append(`${res.data.gender.nu}`);
                    $('div.ratio-woman-bottom-left').append(`<span>${res.data.gender.nu} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-woman-bottom-right').append(`${((res.data.gender.nu / total) * 100).toFixed(2)}%`);
                };
            });
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();

            this.fillRatioTabs();

        };

        inputCitizenButtonClickEvent() {
            super.inputCitizenButtonClickEvent();

            $('[id=body-address-city]').append(`<option selected value="${this.arrayOfAddress[3]}">${this.arrayOfAddress[3]}</option>`);
            $('[id=body-address-distric]').append(`<option selected value="${this.arrayOfAddress[2]}">${this.arrayOfAddress[2]}</option>`);
            $('[id=body-address-commune]').append(`<option selected value="${this.arrayOfAddress[1]}">${this.arrayOfAddress[1]}</option>`);
            $('[id=body-address-hamlet]').append(`<option selected value="${this.arrayOfAddress[0]}">${this.arrayOfAddress[0]}</option>`);
            axios({ // add citizen to the citizen table
                method: 'GET',
                url: '/api/citizen/list'
            }).then((res) => {
                if (res.data.success) {
                    res.data.citizens.forEach((e) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.citizen_id}</td>` +
                            `<td>${e.number}</td>` +
                            '<td>' +
                            `${e.full_name}` +
                            '</td>' +
                            `<td>${e.dob}</td>` +
                            '<td>' +
                            `${e.gender}` +
                            '</td>' +
                            `<td>${e.permanent_address}</td>` +
                            '<td>' +
                            '<button class="td-see-btn td-same-btn citizen-see-btn">' +
                            '<i class="fa fa-eye" aria-hidden="true"></i>' +
                            '<span>Xem</span>' +
                            '</button>' +
                            '<button class="td-fix-btn td-same-btn citizen-fix-btn">' +
                            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
                            '<span>Sửa</span>' +
                            '</button>' +
                            '<button class="td-delete-btn td-same-btn citizen-delete-btn">' +
                            '<i class="fa fa-times" aria-hidden="true"></i>' +
                            '<span>Xóa</span>' +
                            '</button>' +
                            '</td>' +
                            '</tr>');
                    })
                } else {
                    console.log(res);
                }
            });
        };

        printButtonClickEvent() {
            super.printButtonClickEvent();
        };

        reportButtonClickEvent() {
            super.reportButtonClickEvent();
        };

    }
});