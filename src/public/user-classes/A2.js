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
                    res.data.districts.forEach((e, i) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.district_id}</td>` +
                            `<td><input type="text" class="input-can-change input-district-change" value="${e.district_name}"></td>` +
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

                        // delete district event
                        $('button.td-delete-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other delete button
                            axios({
                                method: 'DELETE',
                                url: `/api/district/${e.district_id}`,
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfDistrict();
                                };
                            });
                        });

                        // modify district event
                        $('button.td-fix-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                            axios({
                                method: 'PUT',
                                url: `/api/district/${e.district_id}`,
                                data: {
                                    data: {
                                        district_name: $('input.input-can-change.input-district-change').eq(i).val()
                                    }
                                }
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfDistrict();
                                };
                            });
                        });

                        // view district event
                        $('button.td-see-btn.td-same-btn').eq(i).bind('click', () => {
                            $('div.table-head-title').text('Danh sách các xã phường');
                            $('thead tr').children().eq(0).text('Mã xã phường');
                            $('thead tr').children().eq(1).text('Tên xã phường');
                            this.fillTableOfWard(e.district_id);
                        });
                    })
                } else {
                    console.log(res);
                }
            })

        };

        fillTableOfWard(district_id) { // fill the table of city (A1, A2, A3)
            axios({
                method: 'GET',
                url: '/api/ward/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    const filteredWards = res.data.wards.filter(e => e.district_id == district_id);
                    filteredWards.forEach((e, i) => {
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
                                    this.fillTableOfWard(district_id);
                                };
                            });
                        });

                        // modify district event
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
                                    this.fillTableOfWard(district_id);
                                };
                            });
                        });

                        // view city event
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
                '<button class="td-delete-btn td-same-btn citizen-see-btn">' +
                '<i class="fa fa-eye" aria-hidden="true"></i>' +
                '<span>Xem chi tiết</span>' +
                '</button>' +
                '</td>' +
                '</tr>');

            // view citizen event
            $('button.td-delete-btn.td-same-btn.citizen-see-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                $('#right-content-search-search').hide();
                $('#right-content-search-modify').show();

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
                        $('[id=body-address-city]').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        $('[id=body-address-distric]').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('[id=body-address-commune]').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        $('[id=body-address-hamlet]').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);
                    };
                })
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


        homeButtonClickEvent() {
            super.homeButtonClickEvent();

            this.fillTableOfDistrict();
            this.fillRatioTabs();
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
                            `<td><input type="text" class="input-can-change input-district-change" value="${e.district_name}"></td>` +
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
            axios({ // find all districts
                method: 'GET',
                url: '/api/district/list'
            }).then((res) => {
                if (res.data.success) {
                    // reset all the input
                    $('#body-address-city').empty();
                    $('#body-address-city').append(`'<option selected disabled>${this.arrayOfAddress[0]}</option>'`);
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

            $('button.search-foot-btn').off();
            $('button.search-foot-btn').on('click', () => {
                let gender = '';
                let permanent_address = '';
                if ($('input:radio[name=gender]:checked').eq(0).val()) {
                    gender = $('input:radio[name=gender]:checked').eq(0).val();
                }

                if ($('[id=body-address-hamlet]').eq(0).val() != null) {
                    permanent_address += $('[id=body-address-hamlet]').eq(0).children("option").filter(":selected").text();
                };
                if ($('[id=body-address-commune]').eq(0).val() != null) {
                    if (permanent_address) {
                        permanent_address += ' - ';
                    }
                    permanent_address += $('[id=body-address-commune]').eq(0).children("option").filter(":selected").text();
                };
                if ($('[id=body-address-distric]').eq(0).val() != null) {
                    if (permanent_address) {
                        permanent_address += ' - ';
                    }
                    permanent_address += $('[id=body-address-distric]').eq(0).children("option").filter(":selected").text();
                };
                if ($('[id=body-address-city]').eq(0).val() != null) {
                    if (permanent_address) {
                        permanent_address += ' - ';
                    }
                    permanent_address += $('[id=body-address-city]').eq(0).children("option").filter(":selected").text();
                };
                axios({
                    method: 'POST',
                    url: `/api/citizen/list`,
                    data: {
                        data: { // eq + 0 because the modify form having the same class as the search form, the modify form is display = none
                            number: $('input.id-left-input').eq(0).val(),
                            full_name: $('input.name-left-input').eq(0).val(),
                            dob: $('input.date-left-input').eq(0).val(),
                            gender: gender,
                            permanent_address: permanent_address,
                            religion: $('input.religion-mid-input').eq(0).val(),
                            academic_level: $('input.study-left-input').eq(0).val(),
                            job: $('input.job-right-input').eq(0).val()
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        $('tbody').empty();
                        res.data.citizens.forEach((e, i) => {
                            this.fillTableOfCitizenUtility(e, i);
                        });
                    }
                });
            });

            this.fillTableOfCitizen();
        };

        monitoringProgressButtonClickEvent() {
            super.monitoringProgressButtonClickEvent();
            this.fillTableOfDistrict();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
            this.fillRatioTabs();
        };
    }
});