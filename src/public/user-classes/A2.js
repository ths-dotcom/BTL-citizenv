define(['user-classes/Manager', 'jquery', 'axios'], function (Manager, $, axios) {
    return class A2 extends Manager {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
        };
        start() { //run all the functionalities of A1 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        fillTableOfDistrict() { // fill the table of district
            axios({
                method: 'GET',
                url: '/api/district/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.districts.forEach((e) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.district_id}</td>` +
                            `<td>${e.district_name}</td>` +
                            `<td>chưa có</td>` +
                            `<td>chưa có</td>` +
                            '<td>Chưa hoàn thành' +
                            '<button class="td-detail-btn">Chi tiết</button>' +
                            ' </td>' +
                            '<td>' +
                            '<button class="td-see-btn td-same-btn">' +
                            '<i class="fa fa-eye" aria-hidden="true"></i>' +
                            '<span>Xem</span>' +
                            '</button>' +
                            '<button class="td-fix-btn td-same-btn">' +
                            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
                            '<span>Sửa</span>' +
                            '</button>' +
                            '<button class="td-delete-btn td-same-btn">' +
                            '<i class="fa fa-times" aria-hidden="true"></i>' +
                            '<span>Xóa</span>' +
                            '</button>' +
                            '</td>' +
                            '</tr>');
                    })
                } else {
                    console.log(res);
                }
            })
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();

            this.fillTableOfDistrict();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
            this.fillTableOfDistrict();

            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => { // post District event
                axios({
                    method: 'POST',
                    url: '/api/district',
                    data: {
                        data: {
                            district_name: $('input.name-khaibao-input.same-left-input').val(),
                            district_id: $('input.code-khaibao-input.same-left-input').val(),
                            password: $('input.password-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    $('input.name-khaibao-input.same-left-input').val("");
                    $('input.code-khaibao-input.same-left-input').val("");
                    $('input.password-khaibao-input.same-left-input').val("");
                    if (res.data.success) {
                        this.fillTableOfDistrict();
                    } else {
                        console.log(userResponse);
                    }
                })
            });
        };

        creatingAccountButtonClickEvent() {
            super.creatingAccountButtonClickEvent();
            axios({ // fill the table of district
                method: 'GET',
                url: '/api/district/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.districts.forEach((e) => {
                        let declarePer = '';
                        if (e.declare_per) {
                            declarePer = 'Đã kích hoạt';
                        } else {
                            declarePer = 'Chưa kích hoạt';
                        }
                        $('tbody').append('<tr>' +
                            `<td>${e.district_id}</td>` +
                            `<td>${e.district_name}</td>` +
                            `<td>${declarePer}` +
                            '<button class="change-state-btn">Thay đổi</button>' +
                            '</td>' +
                            '<td>14/12/2021</td>' +
                            '<td>' +
                            '22/12/2021' +
                            '</td>' +
                            '<td>' +
                            '<button class="td-see-btn td-same-btn">' +
                            '<i class="fa fa-eye" aria-hidden="true"></i>' +
                            '<span>Xem</span>' +
                            '</button>' +
                            '<button class="td-fix-btn td-same-btn">' +
                            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
                            '<span>Sửa</span>' +
                            '</button>' +
                            '<button class="td-delete-btn td-same-btn">' +
                            '<i class="fa fa-times" aria-hidden="true"></i>' +
                            '<span>Xóa</span>' +
                            '</button>' +
                            '</td>' +
                            '</tr>');
                    })
                } else {
                    console.log(res);
                }
            })
        };

        citizenInfoButtonClickEvent() {
            super.citizenInfoButtonClickEvent();
            function resetAddressInput() {
                $('#body-address-city').empty();
                $('#body-address-city').append('<option selected disabled>Chon tinh thanh</option>');
                $('#body-address-distric').empty();
                $('#body-address-distric').append('<option selected disabled>Chọn huyện</option>');
                $('#body-address-commune').empty();
                $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                $('#body-address-hamlet').empty();
                $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');
            };
            axios({ // find all districts
                method: 'GET',
                url: '/api/district/list'
            }).then((res) => {
                if (res.data.success) {
                    // reset all the input
                    $('#body-address-city').empty();
                    $('#body-address-city').append(`'<option selected disabled>${this.name}</option>'`);
                    $('#body-address-distric').empty();
                    $('#body-address-distric').append('<option selected disabled>Chọn huyện</option>');
                    $('#body-address-commune').empty();
                    $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                    $('#body-address-hamlet').empty();
                    $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                    res.data.districts.forEach((e) => { // add district to the district input
                        $('#body-address-distric').append(`<option value="${e.district_id}">${e.district_name}</option>`);
                    })
                } else {
                    console.log(res);
                }
            });

            $('#body-address-distric').on('change', () => {
                axios({ // find all wards from a district
                    method: 'GET',
                    url: '/api/ward/list'
                }).then((res) => {
                    if (res.data.success) {
                        // reset the remain input
                        $('#body-address-commune').empty();
                        $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                        $('#body-address-hamlet').empty();
                        $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                        res.data.wards.forEach((e) => { // add communes to the commune input
                            if (e.district_id == $('#body-address-distric').val()) {
                                $('#body-address-commune').append(`<option value="${e.ward_id}">${e.ward_name}</option>`);
                            };
                        })
                    } else {
                        console.log(res);
                    }
                });
            });
            $('#body-address-commune').on('change', () => {
                axios({ // find all hamlets from a ward
                    method: 'GET',
                    url: '/api/hamlet/list'
                }).then((res) => {
                    if (res.data.success) {
                        // reset the remain input
                        $('#body-address-hamlet').empty();
                        $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                        res.data.hamlets.forEach((e) => { // add hamlets to hamlet input
                            if (e.ward_id == $('#body-address-commune').val()) {
                                $('#body-address-hamlet').append(`<option value="${e.hamlet_id}">${e.hamlet_name}</option>`);
                            };
                        })
                    } else {
                        console.log(res);
                    }
                });
            });
        };

        monitoringProgressButtonClickEvent() {
            super.monitoringProgressButtonClickEvent();
            this.fillTableOfDistrict();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
        };
    }
});