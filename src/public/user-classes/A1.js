define(['user-classes/Manager', 'jquery', 'axios'], function (Manager, $, axios) {
    return class A1 extends Manager {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
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
                    res.data.cities.forEach((e, i) => {
                        // add content to the city table
                        $('tbody').append('<tr>' +
                            `<td>${e.city_id}</td>` +
                            `<td><input type="text" class="input-can-change input-citi-change" value="${e.city_name}"></td>` +
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

                        // delete city event
                        $('button.td-delete-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other delete button
                            axios({
                                method: 'DELETE',
                                url: `/api/city/${e.city_id}`,
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfCity();
                                };
                            });
                        });

                        // modify city event
                        $('button.td-fix-btn.td-same-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                            axios({
                                method: 'PUT',
                                url: `/api/city/${e.city_id}`,
                                data: {
                                    data: {
                                        city_name: $('input.input-can-change.input-citi-change').eq(i).val()
                                    }
                                }
                            }).then((res) => {
                                if (res.data.success) {
                                    this.fillTableOfCity();
                                };
                            });
                        });
                    })
                } else {
                    console.log(res);
                }
            })
        };

        fillTableOfCitizenUtility(e, i) {
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
                        if (res.data.citizen.gender == 'nam') {
                            $('input:radio[name=gender]').val(['nam']);
                        } else if (res.data.citizen.gender == 'nữ') {
                            $('input:radio[name=gender]').val(['nu']);
                        };

                        const arrayOfhome_address = res.data.citizen.home_address.split(' - ');
                        $('[id=body-address-city]').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        $('[id=body-address-distric]').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('[id=body-address-commune]').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        $('[id=body-address-hamlet]').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);
                    };
                })
            });
        };

        fillTableOfCitizen() {
            axios({ // add citizen to the citizen table
                method: 'GET',
                url: '/api/citizen/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.citizens.forEach((e, i) => {
                        this.fillTableOfCitizenUtility(e, i);

                        // // delete citizen event
                        // $('button.td-delete-btn.td-same-btn.citizen-delete-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other delete button
                        //     axios({
                        //         method: 'DELETE',
                        //         url: `/api/citizen/${e.citizen_id}`,
                        //     }).then((res) => {
                        //         if (res.data.success) {
                        //             this.fillTableOfCitizen();
                        //         };
                        //     });
                        // });

                        // // modify citizen event
                        // $('button.td-fix-btn.td-same-btn.citizen-fix-btn').eq(i).bind('click', () => { // add index to the event to prevent overlap with other modify button
                        //     $('#right-content-search-search').hide();
                        //     $('#right-content-search-modify').css('display', 'block');

                        //     axios({
                        //         method: 'GET',
                        //         url: `/api/citizen/detail/${e.citizen_id}`,
                        //     }).then((res) => {
                        //         if (res.data.success) {
                        //             $('input.id-left-input').val(res.data.citizen.number);
                        //             $('input.name-left-input').val(res.data.citizen.full_name);
                        //             $('input.date-left-input').val(res.data.citizen.dob);
                        //             $('input.religion-mid-input').val(res.data.citizen.religion);
                        //             $('input.job-right-input').val(res.data.citizen.job);
                        //             $('input.study-left-input').val(res.data.citizen.academic_level);
                        //             if (res.data.citizen.gender == 'nam') {
                        //                 $('input:radio[name=gender]').val(['nam']);
                        //             } else if (res.data.citizen.gender == 'nữ') {
                        //                 $('input:radio[name=gender]').val(['nu']);
                        //             };

                        //             const arrayOfhome_address = res.data.citizen.home_address.split(' - ');
                        //             $('[id=body-address-city]').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        //             $('[id=body-address-distric]').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        //             $('[id=body-address-commune]').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        //             $('[id=body-address-hamlet]').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);

                        //             $('button.search-foot-btn').off();
                        //             $('button.search-foot-btn').on('click', () => {
                        //                 axios({
                        //                     method: 'PUT',
                        //                     url: `/api/citizen/${e.citizen_id}`,
                        //                     data: {
                        //                         data: { // eq + 1 because the search form having display none have the same class as modify form
                        //                             number: $('input.id-left-input').eq(1).val(),
                        //                             full_name: $('input.name-left-input').eq(1).val(),
                        //                             dob: $('input.date-left-input').eq(1).val(),
                        //                             gender: $('input:radio[name=gender]').eq(1).val(),
                        //                             home_address: $('[id=body-address-hamlet]').eq(2 + 1).val() + ' - ' + $('[id=body-address-distric]').eq(2 + 1).val() + ' - ' + $('[id=body-address-commune]').eq(2 + 1).val() + ' - ' + $('[id=body-address-city]').eq(2 + 1).val(),
                        //                             permanent_address: $('[id=body-address-hamlet]').eq(0 + 1).val() + ' - ' + $('[id=body-address-distric]').eq(0 + 1).val() + ' - ' + $('[id=body-address-commune]').eq(0 + 1).val() + ' - ' + $('[id=body-address-city]').eq(0 + 1).val(),
                        //                             temporary_address: $('[id=body-address-hamlet]').eq(1 + 1).val() + ' - ' + $('[id=body-address-distric]').eq(1 + 1).val() + ' - ' + $('[id=body-address-commune]').eq(1 + 1).val() + ' - ' + $('[id=body-address-city]').eq(1 + 1).val(),
                        //                             religion: $('input.religion-mid-input').eq(1).val(),
                        //                             academic_level: $('input.study-left-input').eq(1).val(),
                        //                             job: $('input.job-right-input').eq(1).val()
                        //                         }
                        //                     }
                        //                 }).then((res) => {
                        //                     if (res.success) {
                        //                         $('input.id-left-input').eq(1).val("");
                        //                         $('input.name-left-input').eq(1).val("");
                        //                         $('input.date-left-input').eq(1).val("");
                        //                         $('input:radio[name=gender]').eq(1).val("");
                        //                         $('input.religion-mid-input').eq(1).val("");
                        //                         $('input.study-left-input').eq(1).val("");
                        //                         $('input.job-right-input').eq(1).val("");
                        //                         $('[id=body-address-city]').val("");
                        //                         $('[id=body-address-distric]').val("");
                        //                         $('[id=body-address-commune]').val("");
                        //                         $('[id=body-address-hamlet]').val("");

                        //                         this.fillTableOfCitizen();
                        //                     }
                        //                 });
                        //             });
                        //         };
                        //     });

                        // });
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

        //overloading all function from manager class for A1
        homeButtonClickEvent() {
            super.homeButtonClickEvent();

            this.fillRatioTabs();
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
                            city_id: $('input.code-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        this.fillTableOfCity();

                        axios({
                            method: 'POST',
                            url: '/api/user/signup',
                            data: {
                                data: {
                                    username: 'a2gov' + $('input.code-khaibao-input.same-left-input').val(),
                                    name: 'A2 ' + $('input.name-khaibao-input.same-left-input').val(),
                                    password: $('input.password-khaibao-input.same-left-input').val()
                                }
                            }
                        }).then((res) => {
                            if (!res.data.success) console.log(res);
                        });
                    } else {
                        console.log(userResponse);
                    }
                    $('input.name-khaibao-input.same-left-input').val("");
                    $('input.code-khaibao-input.same-left-input').val("");
                    $('input.password-khaibao-input.same-left-input').val("");
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
                        let declarePer = '';
                        if (e.declare_per) {
                            declarePer = 'Đã kích hoạt';
                        } else {
                            declarePer = 'Chưa kích hoạt';
                        }
                        $('tbody').append('<tr>' +
                            `<td>${e.id}</td>` +
                            `<td><input type="text" class="input-can-change input-citi-change" value="${e.name.slice(3)}">
                            </td>` +
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

            axios({ // find all cities and render it in city select
                method: 'GET',
                url: '/api/city/list'
            }).then((res) => {
                if (res.data.success) {
                    // reset all the input
                    $('#body-address-city').empty();
                    $('#body-address-city').append('<option selected disabled>Chọn tỉnh thành</option>');
                    $('#body-address-distric').empty();
                    $('#body-address-distric').append('<option selected disabled>Chọn huyện</option>');
                    $('#body-address-commune').empty();
                    $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                    $('#body-address-hamlet').empty();
                    $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                    res.data.cities.forEach((e) => { // add city to the city input
                        $('#body-address-city').append(`<option value="${e.city_name}">${e.city_name}</option>`);
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
                        //reset the remain input
                        $('#body-address-distric').empty();
                        $('#body-address-distric').append('<option selected disabled>Chọn huyện</option>');
                        $('#body-address-commune').empty();
                        $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                        $('#body-address-hamlet').empty();
                        $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                        res.data.districts.forEach((e) => { // add districts to the district input
                            if (e.city_name == $('#body-address-city').val()) {
                                $('#body-address-distric').append(`<option value="${e.district_name}">${e.district_name}</option>`);
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
                        // reset the remain input
                        $('#body-address-commune').empty();
                        $('#body-address-commune').append('<option selected disabled>Chọn xã</option>');
                        $('#body-address-hamlet').empty();
                        $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                        res.data.wards.forEach((e) => { // add communes to the commune input
                            if (e.district_name == $('#body-address-distric').val()) {
                                $('#body-address-commune').append(`<option value="${e.ward_name}">${e.ward_name}</option>`);
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
                            if (e.ward_name == $('#body-address-commune').val()) {
                                $('#body-address-hamlet').append(`<option value="${e.hamlet_name}">${e.hamlet_name}</option>`);
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
                let home_address = '';
                if ($('input:radio[name=gender]:checked').eq(0).val()) {
                    gender = $('input:radio[name=gender]:checked').eq(0).val();
                }

                if ($('[id=body-address-hamlet]').eq(0).val() != null) {
                    home_address += $('[id=body-address-hamlet]').eq(0).val();
                };
                if ($('[id=body-address-distric]').eq(0).val() != null) {
                    if (home_address) {
                        home_address += ' - ';
                    }
                    home_address += $('[id=body-address-distric]').eq(0).val();
                };
                if ($('[id=body-address-commune]').eq(0).val() != null) {
                    if (home_address) {
                        home_address += ' - ';
                    }
                    home_address += $('[id=body-address-commune]').eq(0).val();
                };
                if ($('[id=body-address-city]').eq(0).val() != null) {
                    if (home_address) {
                        home_address += ' - ';
                    }
                    home_address += $('[id=body-address-city]').eq(0).val();
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
                            home_address: home_address,
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

            this.fillTableOfCity();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();

            this.fillRatioTabs();
        };
    }
});

