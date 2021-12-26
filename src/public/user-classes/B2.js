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

        addCitizenEvent() { // add citizen event, use after deleting, modifying citizen event and input citizen event at first
            axios({
                method: 'POST',
                url: `/api/citizen`,
                data: {
                    data: {
                        number: $('input.id-left-input').val(),
                        full_name: $('input.name-left-input').val(),
                        dob: $('input.date-left-input').val(),
                        gender: $('input:radio[name=gender]:checked').val(),
                        home_address: $('[id=body-address-hamlet]').eq(2).val() + ' - ' + $('[id=body-address-commune]').eq(2).val() + ' - ' + $('[id=body-address-distric]').eq(2).val() + ' - ' + $('[id=body-address-city]').eq(2).val(),
                        permanent_address: $('[id=body-address-hamlet]').eq(0).val() + ' - ' + $('[id=body-address-commune]').eq(0).val() + ' - ' + $('[id=body-address-distric]').eq(0).val() + ' - ' + $('[id=body-address-city]').eq(0).val(),
                        temporary_address: $('[id=body-address-hamlet]').eq(1).val() + ' - ' + $('[id=body-address-commune]').eq(1).val() + ' - ' + $('[id=body-address-distric]').eq(1).val() + ' - ' + $('[id=body-address-city]').eq(1).val(),
                        religion: $('input.religion-mid-input').val(),
                        academic_level: $('input.study-left-input').val(),
                        job: $('input.job-right-input').val()
                    }
                }
            }).then((res) => {
                if (res.data.success) {
                    $('input.id-left-input').val("");
                    $('input.name-left-input').val("");
                    $('input.date-left-input').val("");
                    $('input:radio[name=gender]').prop('checked', false);
                    $('input.religion-mid-input').val("");
                    $('input.study-left-input').val("");
                    $('input.job-right-input').val("");
                    $('[id=body-address-city]').find('option:eq(0)').prop('selected', true);
                    $('[id=body-address-distric]').find('option:eq(0)').prop('selected', true);
                    $('[id=body-address-commune]').find('option:eq(0)').prop('selected', true);
                    $('[id=body-address-hamlet]').find('option:eq(0)').prop('selected', true);

                    this.fillTableOfCitizen();
                }
            });
        };

        fillTableOfCitizenUtility(e, i) { // helper method for fillTableOfCitizen()
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

            // view citizen event
            $('button.td-see-btn.td-same-btn.citizen-see-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                axios({
                    method: 'GET',
                    url: `/api/citizen/detail/${e.citizen_id}`,
                }).then((res) => {
                    if (res.data.success) {
                        $('input.id-left-input').val(res.data.citizen.number);
                        $('input.name-left-input').val(res.data.citizen.full_name);
                        $('input.date-left-input').val(res.data.citizen.dob);
                        $('input.religion-mid-input').val(res.data.citizen.religion);
                        $('input.job-right-input').val(res.data.citizen.job);
                        $('input.study-left-input').val(res.data.citizen.academic_level);
                        $('div.dan-code-right.search-same-divinput input').val([res.data.citizen.gender]);
                        const arrayOfhome_address = res.data.citizen.home_address.split(' - ');
                        const arrayOftemporary_address = res.data.citizen.temporary_address.split(' - ');
                        const arrayOfpermanent_address = res.data.citizen.permanent_address.split(' - ');

                        //permanent address
                        $('div.search-body-address.search-body-same select.body-address-city').append(`<option selected value="${arrayOfpermanent_address[3]}">${arrayOfpermanent_address[3]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-district').append(`<option selected value="${arrayOfpermanent_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-commune').append(`<option selected value="${arrayOfpermanent_address[1]}">${arrayOfpermanent_address[1]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOfpermanent_address[0]}">${arrayOfpermanent_address[0]}</option>`);

                        //temporary address
                        $('div.search-body-tamtru search-body-same select.body-address-city').append(`<option selected value="${arrayOftemporary_address[3]}">${arrayOftemporary_address[3]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-district').append(`<option selected value="${arrayOftemporary_address[2]}">${arrayOftemporary_address[2]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-commune').append(`<option selected value="${arrayOftemporary_address[1]}">${arrayOftemporary_address[1]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOftemporary_address[0]}">${arrayOftemporary_address[0]}</option>`);

                        //home address
                        $('div.search-body-hometown search-body-same select.body-address-city').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-district').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-commune').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);

                        // change title and hide button
                        $('div.content-search-head.content-same-head').text('Xem dữ liệu người dân');
                        $('button.search-foot-btn').hide();
                    };
                });
            });

            // modify citizen event
            $('button.td-fix-btn.td-same-btn.citizen-fix-btn').eq(i).bind('click', () => {
                axios({
                    method: 'GET',
                    url: `/api/citizen/detail/${e.citizen_id}`,
                }).then((res) => {
                    if (res.data.success) {
                        $('input.id-left-input').val(res.data.citizen.number);
                        $('input.name-left-input').val(res.data.citizen.full_name);
                        $('input.date-left-input').val(res.data.citizen.dob);
                        $('input.religion-mid-input').val(res.data.citizen.religion);
                        $('input.job-right-input').val(res.data.citizen.job);
                        $('input.study-left-input').val(res.data.citizen.academic_level);
                        $('input:radio[name=gender]').val([res.data.citizen.gender]);
                        const arrayOfhome_address = res.data.citizen.home_address.split(' - ');
                        const arrayOftemporary_address = res.data.citizen.temporary_address.split(' - ');
                        const arrayOfpermanent_address = res.data.citizen.permanent_address.split(' - ');

                        //permanent address
                        $('div.search-body-address.search-body-same select.body-address-city').append(`<option selected value="${arrayOfpermanent_address[3]}">${arrayOfpermanent_address[3]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-district').append(`<option selected value="${arrayOfpermanent_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-commune').append(`<option selected value="${arrayOfpermanent_address[1]}">${arrayOfpermanent_address[1]}</option>`);
                        $('div.search-body-address.search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOfpermanent_address[0]}">${arrayOfpermanent_address[0]}</option>`);

                        //temporary address
                        $('div.search-body-tamtru search-body-same select.body-address-city').append(`<option selected value="${arrayOftemporary_address[3]}">${arrayOftemporary_address[3]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-district').append(`<option selected value="${arrayOftemporary_address[2]}">${arrayOftemporary_address[2]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-commune').append(`<option selected value="${arrayOftemporary_address[1]}">${arrayOftemporary_address[1]}</option>`);
                        $('div.search-body-tamtru search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOftemporary_address[0]}">${arrayOftemporary_address[0]}</option>`);

                        //home address
                        $('div.search-body-hometown search-body-same select.body-address-city').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-district').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-commune').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        $('div.search-body-hometown search-body-same select.body-address-hamlet').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);

                        // change title and add event for modify button
                        $('div.content-search-head.content-same-head').text('Sửa dữ liệu người dân');
                        $('button.search-foot-btn').text('Sửa');

                        $('button.search-foot-btn').show();
                        $('button.search-foot-btn').off();
                        $('button.search-foot-btn').on('click', () => {
                            axios({
                                method: 'PUT',
                                url: `/api/citizen/${e.citizen_id}`,
                                data: {
                                    data: {
                                        number: $('input.id-left-input').val(),
                                        full_name: $('input.name-left-input').val(),
                                        dob: $('input.date-left-input').val(),
                                        gender: $('input:radio[name=gender]:checked').val(),
                                        home_address: $('[id=body-address-hamlet]').eq(2).val() + ' - ' + $('[id=body-address-commune]').eq(2).val() + ' - ' + $('[id=body-address-distric]').eq(2).val() + ' - ' + $('[id=body-address-city]').eq(2).val(),
                                        permanent_address: $('[id=body-address-hamlet]').eq(0).val() + ' - ' + $('[id=body-address-commune]').eq(0).val() + ' - ' + $('[id=body-address-distric]').eq(0).val() + ' - ' + $('[id=body-address-city]').eq(0).val(),
                                        temporary_address: $('[id=body-address-hamlet]').eq(1).val() + ' - ' + $('[id=body-address-commune]').eq(1).val() + ' - ' + $('[id=body-address-distric]').eq(1).val() + ' - ' + $('[id=body-address-city]').eq(1).val(),
                                        religion: $('input.religion-mid-input').val(),
                                        academic_level: $('input.study-left-input').val(),
                                        job: $('input.job-right-input').val()
                                    }
                                }
                            }).then((res) => {
                                if (res.data.success) {
                                    //after modify, reset the add field
                                    $('input.id-left-input').val("");
                                    $('input.name-left-input').val("");
                                    $('input.date-left-input').val("");
                                    $('input:radio[name=gender]').prop('checked', false);
                                    $('input.religion-mid-input').val("");
                                    $('input.study-left-input').val("");
                                    $('input.job-right-input').val("");
                                    $('[id=body-address-city]').find('option:eq(0)').prop('selected', true);
                                    $('[id=body-address-distric]').find('option:eq(0)').prop('selected', true);
                                    $('[id=body-address-commune]').find('option:eq(0)').prop('selected', true);
                                    $('[id=body-address-hamlet]').find('option:eq(0)').prop('selected', true);

                                    this.fillTableOfCitizen();
                                    $('button.search-foot-btn').off();
                                    $('button.search-foot-btn').text('Thêm');
                                    $('button.search-foot-btn').on('click', () => {
                                        this.addCitizenEvent();
                                    });
                                }
                            });
                        });
                    };
                })
            });

            // delete citizen event
            $('button.td-delete-btn.td-same-btn.citizen-delete-btn').eq(i).bind('click', () => {
                axios({
                    method: 'DELETE',
                    url: `/api/citizen/${e.citizen_id}`,
                }).then((res) => {
                    if (res.data.success) {
                        this.fillTableOfCitizen();

                        // after delete, reset add field
                        $('input.id-left-input').val("");
                        $('input.name-left-input').val("");
                        $('input.date-left-input').val("");
                        $('input:radio[name=gender]').prop('checked', false);
                        $('input.religion-mid-input').val("");
                        $('input.study-left-input').val("");
                        $('input.job-right-input').val("");
                        $('[id=body-address-city]').find('option:eq(0)').prop('selected', true);
                        $('[id=body-address-distric]').find('option:eq(0)').prop('selected', true);
                        $('[id=body-address-commune]').find('option:eq(0)').prop('selected', true);
                        $('[id=body-address-hamlet]').find('option:eq(0)').prop('selected', true);
                        $('button.search-foot-btn').off();
                        $('button.search-foot-btn').show();
                        $('button.search-foot-btn').text('Thêm');
                        $('button.search-foot-btn').on('click', () => {
                            this.addCitizenEvent();
                        });
                    } else {
                        console.log(res);
                    }
                });
            });
        };

        fillTableOfCitizen() { // add citizen to the citizen table
            axios({
                method: 'GET',
                url: '/api/citizen/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.citizens.forEach((e, i) => {
                        this.fillTableOfCitizenUtility(e, i);
                    })
                } else {
                    console.log(res);
                }
            });
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
                    $('div.woman-top-left-number.same-top-left-number').append(`${res.data.gender.tong.countNu}`);
                    $('div.ratio-woman-bottom-left').append(`<span>${res.data.gender.tong.countNu} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-woman-bottom-right').append(`${((res.data.gender.tong.countNu / total) * 100).toFixed(2)}%`);
                };
            });

            axios({ // fill kid and elderly ratio
                method: 'GET',
                url: '/api/analyst/age'
            }).then((res) => {
                if (res.data.success) {
                    //fill kid ratio
                    $('div.children-top-left-number.same-top-left-number').empty();
                    $('div.ratio-children-bottom-left').empty();
                    $('div.ratio-children-bottom-right').empty();
                    $('div.children-top-left-number.same-top-left-number').append(`${res.data.age.tong.countKid}`);
                    $('div.ratio-children-bottom-left').append(`<span>${res.data.age.tong.countKid} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-children-bottom-right').append(`${((res.data.age.tong.countKid / total) * 100).toFixed(2)}%`);

                    //kill elderly ratio
                    $('div.old-top-left-number.same-top-left-number').empty();
                    $('div.ratio-old-bottom-left').empty();
                    $('div.ratio-old-bottom-right').empty();
                    $('div.old-top-left-number.same-top-left-number').append(`${res.data.age.tong.countElder}`);
                    $('div.ratio-old-bottom-left').append(`<span>${res.data.age.tong.countElder} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-old-bottom-right').append(`${((res.data.age.tong.countElder / total) * 100).toFixed(2)}%`);
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

            this.fillTableOfCitizen();
            $('button.search-foot-btn').off();
            $('button.search-foot-btn').text('Thêm');
            $('button.search-foot-btn').on('click', () => {
                this.addCitizenEvent();
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