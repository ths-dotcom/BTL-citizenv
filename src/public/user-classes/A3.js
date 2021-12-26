define(['user-classes/Manager', 'jquery', 'axios'], function (Manager, $, axios) {
    return class A3 extends Manager {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
        };
        start() { //run all the functionalities of A1 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        fillTableOfWard() { // fill the table of ward
            axios({
                method: 'GET',
                url: '/api/ward/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.wards.forEach((e, i) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.ward_id}</td>` +
                            `<td><input type="text" class="input-can-change input-ward-change" value="${e.ward_name}"></td>` +
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

                        // delete ward event
                        $('button.td-delete-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other delete button
                            axios({
                                method: 'DELETE',
                                url: `/api/ward/${e.ward_id}`,
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfWard();
                                };
                            });
                        });

                        // modify ward event
                        $('button.td-fix-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                            axios({
                                method: 'PUT',
                                url: `/api/ward/${e.ward_id}`,
                                data: {
                                    data: {
                                        ward_name: $('input.input-can-change.input-ward-change').eq(i).val()
                                    }
                                }
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfWard();
                                };
                            });
                        });

                        // view ward event
                        $('button.td-see-btn.td-same-btn').eq(i).bind('click', () => {
                            $('div.table-head-title').text('Danh sách các thôn bản');
                            $('thead tr').children().eq(0).text('Mã thôn bản');
                            $('thead tr').children().eq(1).text('Tên thôn bản');
                            this.fillTableOfHamlet(e.ward_id);
                        });
                    })
                } else {
                    console.log(res);
                }
            })
        };

        fillTableOfHamlet(ward_id) { // fill the table of city (A1, A2, A3, B1)
            axios({
                method: 'GET',
                url: '/api/hamlet/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    const filteredHamlets = res.data.hamlets.filter(e => e.ward_id == ward_id);
                    filteredHamlets.forEach((e, i) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.hamlet_id}</td>` +
                            `<td><input type="text" class="input-can-change input-hamlet-change" value="${e.hamlet_name}"></td>` +
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

                        // delete hamlet event
                        $('button.td-delete-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other delete button
                            axios({
                                method: 'DELETE',
                                url: `/api/hamlet/${e.hamlet_id}`,
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfHamlet(ward_id);
                                };
                            });
                        });

                        // modify hamlet event
                        $('button.td-fix-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                            axios({
                                method: 'PUT',
                                url: `/api/hamlet/${e.hamlet_id}`,
                                data: {
                                    data: {
                                        hamlet_name: $('input.input-can-change.input-hamlet-change').eq(i).val()
                                    }
                                }
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfHamlet(ward_id);
                                };
                            });
                        });
                    })
                } else {
                    console.log(res);
                }
            })
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

            axios({ // fill kid and elderly ratio
                method: 'GET',
                url: '/api/analyst/age'
            }).then((res) => {
                if (res.data.success) {
                    //fill kid ratio
                    $('div.children-top-left-number.same-top-left-number').empty();
                    $('div.ratio-children-bottom-left').empty();
                    $('div.ratio-children-bottom-right').empty();
                    $('div.children-top-left-number.same-top-left-number').append(`${res.data.age.kid}`);
                    $('div.ratio-children-bottom-left').append(`<span>${res.data.age.kid} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-children-bottom-right').append(`${((res.data.age.kid / total) * 100).toFixed(2)}%`);

                    //kill elderly ratio
                    $('div.old-top-left-number.same-top-left-number').empty();
                    $('div.ratio-old-bottom-left').empty();
                    $('div.ratio-old-bottom-right').empty();
                    $('div.old-top-left-number.same-top-left-number').append(`${res.data.age.elder}`);
                    $('div.ratio-old-bottom-left').append(`<span>${res.data.age.elder} </span> / <span>${total} </span> NGƯỜI`);
                    $('div.ratio-old-bottom-right').append(`${((res.data.age.elder / total) * 100).toFixed(2)}%`);
                };
            });
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();
            this.fillTableOfWard();
            this.fillRatioTabs();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
            this.fillTableOfWard();

            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => { // post Ward event
                axios({
                    method: 'POST',
                    url: '/api/ward',
                    data: {
                        data: {
                            ward_name: $('input.name-khaibao-input.same-left-input').val(),
                            ward_id: $('input.code-khaibao-input.same-left-input').val(),
                            password: $('input.password-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    $('input.name-khaibao-input.same-left-input').val("");
                    $('input.code-khaibao-input.same-left-input').val("");
                    $('input.password-khaibao-input.same-left-input').val("");
                    if (res.data.success) {
                        this.fillTableOfWard();
                    } else {
                        console.log(userResponse);
                    }
                })
            });
        };

        creatingAccountButtonClickEvent() {
            super.creatingAccountButtonClickEvent();

            axios({ // fill the table of ward
                method: 'GET',
                url: '/api/ward/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.wards.forEach((e) => {
                        let declarePer = '';
                        if (e.declare_per) {
                            declarePer = 'Đã kích hoạt';
                        } else {
                            declarePer = 'Chưa kích hoạt';
                        }
                        $('tbody').append('<tr>' +
                            `<td>${e.ward_id}</td>` +
                            `<td><input type="text" class="input-can-change input-ward-change" value="${e.ward_name}"></td>` +
                            `<td>${declarePer}` +
                            '<button class="change-state-btn">Thay đổi</button>' +
                            '</td>' +
                            '<td><input type="text" class="input-can-change input-time-start-change" value="14/12/2021"></td>' +
                            '<td><input type="text" class="input-can-change input-time-end-change" value="22/12/2021"></td>' +
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
            axios({ // find all wards
                method: 'GET',
                url: '/api/ward/list'
            }).then((res) => {
                if (res.data.success) {
                    // reset all the input
                    $('#body-address-city').empty();
                    $('#body-address-city').append(`'<option selected disabled>${this.arrayOfAddress[1]}</option>'`);
                    $('#body-address-distric').empty();
                    $('#body-address-distric').append(`'<option selected disabled>${this.arrayOfAddress[0]}</option>'`);
                    $('#body-address-commune').empty();
                    $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                    $('#body-address-hamlet').empty();
                    $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                    res.data.wards.forEach((e) => { // add district to the district input
                        $('#body-address-commune').append(`<option value="${e.ward_id}">${e.ward_name}</option>`);
                    })
                } else {
                    console.log(res);
                }
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

            axios({ // add citizen to the district table
                method: 'GET',
                url: '/api/citizen/list'
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    res.data.citizens.forEach((e) => { // add disitict to the distict input
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
                            '<span>Xem chi tiết</span>' +
                            '</td>' +
                            '</tr>');
                    })
                } else {
                    console.log(res);
                }
            });
        };

        monitoringProgressButtonClickEvent() {
            super.monitoringProgressButtonClickEvent();

            this.fillTableOfWard();

        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
            this.fillRatioTabs();
        };
    }
});