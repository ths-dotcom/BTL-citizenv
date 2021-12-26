define(['user-classes/Manager', 'user-classes/Operator', 'jquery', 'axios'], function (Manager, Operator, $, axios) {
    return class B1 extends aggregation(Operator, Manager) {
        constructor(id, username, name, per_scope, role_id, declare_per, address) {
            super(id, username, name, per_scope, role_id, declare_per, address);
        };
        start() { //run all the functionalities of B1 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        fillTableOfHamlet() { // fill the table of hamlet
            axios({
                method: 'GET',
                url: '/api/hamlet/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.hamlets.forEach((e, i) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.hamlet_id}</td>` +
                            `<td><input type="text" class="input-can-change input-hamlet-change" value="${e.hamlet_name}"></td>` +
                            `<td>chưa có</td>` +
                            `<td>chưa có</td>` +
                            '<td>Chưa hoàn thành' +
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
                                    this.fillTableOfHamlet();
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
                                    this.fillTableOfHamlet();
                                };
                            });
                        });
                    })
                } else {
                    console.log(res);
                }
            })
        };

        renderMenuLeft() {
            super.renderMenuLeft();



            this.printButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-print' aria-hidden='true'></i><span>In phiếu điều tra</span></div>")
                .appendTo($(this.printButton));
            $(this.printButton).on('click', () => {
                this.resetSelectedButton();
                this.printButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.printButtonClickEvent();
            }); //add printting citizen input form function


            $('div.body-left').append($(this.printButton));
        };


        // fillRatioTabs() { // fill 4 ratio tabs (children, women, elderly, total)
        //     let total = 0;
        //     axios({ // fill total ratio
        //         method: 'GET',
        //         url: '/api/analyst/count'
        //     }).then((res) => {
        //         if (res.data.success) {
        //             total = res.data.count;
        //             $('div.all-top-left-number.same-top-left-number').empty();
        //             $('div.ratio-all-bottom-left').empty();
        //             $('div.all-top-left-number.same-top-left-number').append(`${res.data.count}`);
        //             $('div.ratio-all-bottom-left').append(`TỔNG <span> ${res.data.count} </span> NGƯỜI`);
        //         };
        //     });

        //     axios({ // fill women ratio
        //         method: 'GET',
        //         url: '/api/analyst/gender'
        //     }).then((res) => {
        //         if (res.data.success) {
        //             $('div.woman-top-left-number.same-top-left-number').empty();
        //             $('div.ratio-woman-bottom-left').empty();
        //             $('div.ratio-woman-bottom-right').empty();
        //             $('div.woman-top-left-number.same-top-left-number').append(`${res.data.gender.nu}`);
        //             $('div.ratio-woman-bottom-left').append(`<span>${res.data.gender.nu} </span> / <span>${total} </span> NGƯỜI`);
        //             $('div.ratio-woman-bottom-right').append(`${((res.data.gender.nu / total) * 100).toFixed(2)}%`);
        //         };
        //     });

        //     axios({ // fill kid and elderly ratio
        //         method: 'GET',
        //         url: '/api/analyst/age'
        //     }).then((res) => {
        //         if (res.data.success) {
        //             //fill kid ratio
        //             $('div.children-top-left-number.same-top-left-number').empty();
        //             $('div.ratio-children-bottom-left').empty();
        //             $('div.ratio-children-bottom-right').empty();
        //             $('div.children-top-left-number.same-top-left-number').append(`${res.data.age.kid}`);
        //             $('div.ratio-children-bottom-left').append(`<span>${res.data.age.kid} </span> / <span>${total} </span> NGƯỜI`);
        //             $('div.ratio-children-bottom-right').append(`${((res.data.age.kid / total) * 100).toFixed(2)}%`);

        //             //kill elderly ratio
        //             $('div.old-top-left-number.same-top-left-number').empty();
        //             $('div.ratio-old-bottom-left').empty();
        //             $('div.ratio-old-bottom-right').empty();
        //             $('div.old-top-left-number.same-top-left-number').append(`${res.data.age.elder}`);
        //             $('div.ratio-old-bottom-left').append(`<span>${res.data.age.elder} </span> / <span>${total} </span> NGƯỜI`);
        //             $('div.ratio-old-bottom-right').append(`${((res.data.age.elder / total) * 100).toFixed(2)}%`);
        //         };
        //     });
        // };

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
                        $('input.id-left-input.modify-id-left-input').val(res.data.citizen.number);
                        $('input.name-left-input.modify-name-left-input').val(res.data.citizen.full_name);
                        $('input.date-left-input.modify-date-left-input').val(res.data.citizen.dob);
                        $('input.religion-mid-input.modify-religion-mid-input').val(res.data.citizen.religion);
                        $('input.job-right-input.modify-job-right-input').val(res.data.citizen.job);
                        $('input.study-left-input.modify-study-left-input').val(res.data.citizen.academic_level);
                        $('input.gender-input.modify-render-input').val([res.data.citizen.gender]);
                        const arrayOfhome_address = res.data.citizen.home_address.split(' - ');
                        $('select.body-address-city.modify-body-address-city').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        // $('[id=body-address-city]').append(`<option selected value="${arrayOfhome_address[3]}">${arrayOfhome_address[3]}</option>`);
                        $('select.body-address-district.modify-body-address-district').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        // $('[id=body-address-distric]').append(`<option selected value="${arrayOfhome_address[2]}">${arrayOfhome_address[2]}</option>`);
                        $('select.body-address-commune.modify-body-address-commune').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        // $('[id=body-address-commune]').append(`<option selected value="${arrayOfhome_address[1]}">${arrayOfhome_address[1]}</option>`);
                        $('select.body-address-hamlet.modify-body-address-hamlet').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);
                        // $('[id=body-address-hamlet]').append(`<option selected value="${arrayOfhome_address[0]}">${arrayOfhome_address[0]}</option>`);
                    };
                })

                // close view citizen
                $('button.goback-foot-btn').bind('click', () => { // add index to the event to prevent overlap with other modify button
                    $('#right-content-search-modify').hide();
                    $('#right-content-search-search').show();
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

        homeButtonClickEvent() {
            super.homeButtonClickEvent();
            this.fillTableOfHamlet();
            this.fillRatioTabs();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
            this.fillTableOfHamlet();

            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => { // post city event
                axios({
                    method: 'POST',
                    url: '/api/hamlet',
                    data: {
                        data: {
                            hamlet_name: $('input.name-khaibao-input.same-left-input').val(),
                            hamlet_id: $('input.code-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        this.fillTableOfHamlet();

                        axios({
                            method: 'POST',
                            url: '/api/user/signup',
                            data: {
                                data: {
                                    username: 'b1gov' + $('input.code-khaibao-input.same-left-input').val(),
                                    name: 'B1 ' + $('input.name-khaibao-input.same-left-input').val(),
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

            function fillTableOfUser() {
                let arrayOfHamletUser = {};
                axios({ // fill the table of hamlet account
                    method: 'GET',
                    url: '/api/user/hamlet/list'
                }).then((res) => {
                    if (res.data.success) {
                        $('tbody').empty();
                        $('thead').empty();
                        $('thead').append(
                            '<tr>' +
                            '<th>' +
                            ' Mã tài khoản' +
                            '</th>' +
                            ' <th>Tên tỉnh thành</th>' +
                            '<th>Quyền khai báo</th>' +
                            '<th>Thời điểm bắt đầu</th>' +
                            '<th>Thời điểm kết thúc</th>' +
                            '<th>Trạng thái hoàn thành</th>' +
                            ' </tr>'
                        );
                        res.data.users.forEach((e) => {
                            arrayOfHamletUser[e.id] = e.declare_per;
                            let declarePer = '';
                            let start_date = '';
                            let end_date = '';
                            if (e.declare_per) {
                                declarePer = 'Đã kích hoạt';
                                start_date = e.start_date;
                                end_date = e.end_date;
                            } else {
                                declarePer = 'Chưa kích hoạt';
                            }
                            $('tbody').append('<tr>' +
                                `<td>${e.id}</td>` +
                                `<td>${e.name.slice(3)}</td>` +
                                `<td>${declarePer}` +
                                '</td>' +
                                `<td>${start_date}</td>` +
                                `<td>${end_date}</td>` +
                                '<td>' +
                                '<label class="switch">' +
                                '<input type="checkbox">' +
                                '<span class="slider round"></span>' +
                                '</label>' +
                                '</tr>');
                        })
                    } else {
                        console.log(res);
                    }
                });
                return arrayOfHamletUser;
            }
            let arrayOfHamletUser = fillTableOfUser();


            $('input.name-quyen-input.same-left-input').on('change', () => {
                if (arrayOfHamletUser[$('input.name-quyen-input.same-left-input').val()] == true) {
                    $('button.permission-foot-block-btn').show();
                    $('button.permission-foot-yes-btn.same-foot-yes-btn').hide();
                } else if (arrayOfHamletUser[$('input.name-quyen-input.same-left-input').val()] == false) {
                    $('button.permission-foot-block-btn').hide();
                    $('button.permission-foot-yes-btn.same-foot-yes-btn').show();
                } else {
                    console.log(arrayOfHamletUser[$('input.name-quyen-input.same-left-input').val()]);
                    $('button.permission-foot-block-btn').hide();
                    $('button.permission-foot-yes-btn.same-foot-yes-btn').hide();
                }
            });

            $('button.permission-foot-yes-btn.same-foot-yes-btn').on('click', () => {
                axios({ // change declare date
                    method: 'POST',
                    url: `/api/user/set-date-range/${$('input.name-quyen-input.same-left-input').val()}`,
                    data: {
                        data: {
                            delete: false,
                            start_date: $('input.permission-time-start').val(),
                            end_date: $('input.permission-time-end').val()
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        axios({ // change declare permission of an user to true
                            method: 'PATCH',
                            url: `/api/user/declare-permission/${$('input.name-quyen-input.same-left-input').val()}`
                        }).then((res) => {
                            if (res.data.success) {
                                arrayOfHamletUser = fillTableOfUser();
                                $('button.permission-foot-block-btn').show();
                                $('button.permission-foot-yes-btn.same-foot-yes-btn').show();
                                $('input.name-quyen-input.same-left-input').val('');
                                $('input.permission-time-start').val('');
                                $('input.permission-time-end').val('');
                                $('input.password-quyen-input.same-left-input').val('');
                            } else {
                                console.log(res);
                            }
                        });
                    } else {
                        console.log(res);
                    }
                });
            });

            $('button.permission-foot-block-btn').on('click', () => {
                axios({ // change declare date
                    method: 'POST',
                    url: `/api/user/set-date-range/${$('input.name-quyen-input.same-left-input').val()}`,
                    data: {
                        data: {
                            delete: true,
                            start_date: null,
                            end_date: null
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        axios({ // change declare permission of an user to false
                            method: 'PATCH',
                            url: `/api/user/declare-permission/${$('input.name-quyen-input.same-left-input').val()}`
                        }).then((res) => {
                            if (res.data.success) {
                                arrayOfHamletUser = fillTableOfUser();
                                $('button.permission-foot-block-btn').show();
                                $('button.permission-foot-yes-btn.same-foot-yes-btn').show();
                                $('input.name-quyen-input.same-left-input').val('');
                                $('input.permission-time-start').val('');
                                $('input.permission-time-end').val('');
                                $('input.password-quyen-input.same-left-input').val('');
                            } else {
                                console.log(res);
                            }
                        });
                    } else {
                        console.log(res);
                    }
                });
            });

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
                url: '/api/hamlet/list'
            }).then((res) => {
                if (res.data.success) {
                    // reset all the input
                    $('#body-address-city').empty();
                    $('#body-address-city').append(`'<option selected disabled>${this.arrayOfAddress[2]}</option>'`);
                    $('#body-address-distric').empty();
                    $('#body-address-distric').append(`'<option selected disabled>${this.arrayOfAddress[1]}</option>'`);
                    $('#body-address-commune').empty();
                    $('#body-address-commune').append(`'<option selected disabled>${this.arrayOfAddress[0]}</option>'`);
                    $('#body-address-hamlet').empty();
                    $('#body-address-hamlet').append('<option selected disabled>Chọn Thôn</option>');

                    res.data.hamlets.forEach((e) => { // add district to the district input
                        $('#body-address-hamlet').append(`<option value="${e.hamlet_id}">${e.hamlet_name}</option>`);
                    })
                } else {
                    console.log(res);
                }
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

            axios({ // find all cities and render it in city select
                method: 'GET',
                url: '/api/hamlet/progress'
            }).then((res) => {
                if (res.data.success) {
                    $('div.this-top-left-number.same-top-left-number').text((res.data.progress.finish / (res.data.progress.all) * 100).toFixed(2) + '%');
                    $('div.ratio-this-bottom-left').empty();
                    $('div.ratio-this-bottom-left').append(// Da nhap
                        `<span>${res.data.progress.finish} </span>` +
                        '/ ' +
                        // Tong
                        `<span>${res.data.progress.all} </span>` +
                        `${this.monitoring}`);
                    $('div.ratio-this-bottom-right').text(this.username);
                };
            });
            this.fillTableOfHamlet();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
            this.fillRatioTabs();
        };

        printButtonClickEvent() {
            super.printButtonClickEvent();
        };
    }
});


var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor(...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this, (new mixin));
            });
        }
    }
    let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source))
            .forEach((prop) => {
                if (!prop.match(/^(?:constructor|prototype|arguments|caller|bind|call|apply|toString|length|declare_per|id|name|username|per_scope|role_id|monitoring|supervising|address|Array|arrayOfAddress)$/)) {
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
                }

            })
    }
    mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
}

