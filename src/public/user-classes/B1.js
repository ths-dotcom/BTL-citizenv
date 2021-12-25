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

            this.inputCitizenButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-keyboard-o' aria-hidden='true'></i><span>Nhập liệu dân số</span></div>")
                .appendTo($(this.inputCitizenButton));
            $(this.inputCitizenButton).on('click', () => {
                this.resetSelectedButton();
                this.inputCitizenButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.inputCitizenButtonClickEvent();
            }); //add input citizen function

            this.printButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-print' aria-hidden='true'></i><span>In phiếu điều tra</span></div>")
                .appendTo($(this.printButton));
            $(this.printButton).on('click', () => {
                this.resetSelectedButton();
                this.printButton.children('.body-left-home-content').addClass('body-left-home-content-active');
                this.printButtonClickEvent();
            }); //add printting citizen input form function


            $('div.body-left').append($(this.inputCitizenButton), $(this.printButton));
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();
            this.fillTableOfHamlet();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
            this.fillTableOfHamlet();

            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => { // post Hamlet event
                axios({
                    method: 'POST',
                    url: '/api/hamlet',
                    data: {
                        data: {
                            hamlet_name: $('input.name-khaibao-input.same-left-input').val(),
                            hamlet_id: $('input.code-khaibao-input.same-left-input').val(),
                            password: $('input.password-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    $('input.name-khaibao-input.same-left-input').val("");
                    $('input.code-khaibao-input.same-left-input').val("");
                    $('input.password-khaibao-input.same-left-input').val("");
                    if (res.data.success) {
                        this.fillTableOfHamlet();
                    } else {
                        console.log(userResponse);
                    }
                })
            });
        };

        creatingAccountButtonClickEvent() {
            super.creatingAccountButtonClickEvent();

            axios({ // fill the table of hamlet
                method: 'GET',
                url: '/api/hamlet/list'
            }).then((res) => {
                if (res.data.success) {
                    $('tbody').empty();
                    res.data.hamlets.forEach((e) => {
                        let declarePer = '';
                        if (e.declare_per) {
                            declarePer = 'Đã kích hoạt';
                        } else {
                            declarePer = 'Chưa kích hoạt';
                        }
                        $('tbody').append('<tr>' +
                            `<td>${e.hamlet_id}</td>` +
                            `<td><input type="text" class="input-can-change input-ward-change" value="${e.hamlet_id}"></td>` +
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

        monitoringProgressButtonClickEvent() {
            super.monitoringProgressButtonClickEvent();
            this.fillTableOfHamlet();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
        };

        inputCitizenButtonClickEvent() {
            super.inputCitizenButtonClickEvent();

            $('[id=body-address-city]').append(`<option selected value="${this.arrayOfAddress[2]}">${this.arrayOfAddress[2]}</option>`);
            $('[id=body-address-distric]').append(`<option selected value="${this.arrayOfAddress[1]}">${this.arrayOfAddress[1]}</option>`);
            $('[id=body-address-commune]').append(`<option selected value="${this.arrayOfAddress[0]}">${this.arrayOfAddress[0]}</option>`);
            // $('[id=body-address-hamlet]').append(`<option selected value="</option>`);
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

