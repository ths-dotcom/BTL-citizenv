define(['user-classes/Manager', 'jquery', 'axios'], function (Manager, $, axios) {
    return class A1 extends Manager {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        start() { //run all the functionalities of A1 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        fillTableOfCity() { // fill the table of city
            axios({
                method: 'GET',
                url: '/api/city/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.cities.forEach((e) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.city_id}</td>` +
                            `<td>${e.city_name}</td>` +
                            `<td>chưa có</td>` +
                            `<td>chưa có</td>` +
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
                            '</tr>');
                    })
                } else {
                    console.log(res);
                }
            })
        };

        //overloading all function from manager class for A1
        homeButtonClickEvent() {
            super.homeButtonClickEvent();

            this.fillTableOfCity();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent(); // render structure of this functionality

            this.fillTableOfCity();

            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => { // post city event
                axios({
                    method: 'POST',
                    url: '/api/city',
                    data: {
                        data: {
                            city_name: $('input.name-khaibao-input.same-left-input').val(),
                            city_id: $('input.code-khaibao-input.same-left-input').val(),
                            password: $('input.password-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    $('input.name-khaibao-input.same-left-input').val("");
                    $('input.code-khaibao-input.same-left-input').val("");
                    $('input.password-khaibao-input.same-left-input').val("");
                    if (res.data.success) {
                        this.fillTableOfCity();
                    } else {
                        console.log(userResponse);
                    }
                })
            });
        };

        creatingAccountButtonClickEvent() {
            super.creatingAccountButtonClickEvent();

            axios({ // fill the table of city
                method: 'GET',
                url: '/api/user/city/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.users.forEach((e) => {
                        $('tbody').append('<tr>' +
                            '<td>01</td>' +
                            '<td>Hà Nội</td>' +
                            '<td>Đã kích hoạt' +
                            '<button class="change-state-btn">Thay đổi</button>' +
                            '</td>' +
                            '<td>14/12/2021</td>' +
                            '<td>' +
                            '22/12/2021' +
                            '</td>' +
                            '<td>' +
                            '<button>Xem</button>' +
                            '<button>Sua</button>' +
                            '<button>Xoa</button>' +
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

            axios({ // find all cities
                method: 'GET',
                url: '/api/city/list'
            }).then((res) => {
                if (res.data.success) {
                    $('#body-address-city').empty();
                    $('#body-address-city').append('<option selected disabled>Chọn tỉnh thành</option>');
                    res.data.cities.forEach((e) => {
                        $('#body-address-city').append(`<option value="${e.city_id}">${e.city_name}</option>`);
                    })
                } else {
                    console.log(res);
                }
            });

            $('#body-address-city').on('change', () => {
                axios({ // find all district from a city
                    method: 'GET',
                    url: '/api/district/list'
                }).then((res) => {
                    if (res.data.success) {
                        $('#body-address-distric').empty();
                        $('#body-address-distric').append('<option selected disabled>Chọn huyện</option>');
                        res.data.districts.forEach((e) => {
                            if (e.city_id == $('#body-address-city').val()) {
                                $('#body-address-distric').append(`<option value="${e.district_id}">${e.district_name}</option>`);
                            };

                        })
                    } else {
                        console.log(res);
                    }
                });
            });

            $('#body-address-distric').on('change', () => {
                axios({ // find all wards from a district
                    method: 'GET',
                    url: '/api/ward/list'
                }).then((res) => {
                    if (res.data.success) {
                        $('#body-address-commune').empty();
                        $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                        res.data.wards.forEach((e) => {
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
                        $('#body-address-hamlet').empty();
                        $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');
                        res.data.wards.forEach((e) => {
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

            this.fillTableOfCity();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
        };
    }
});

