define(['user-classes/Manager', 'user-classes/Operator', 'jquery', 'axios'], function (Manager, Operator, $, axios) {
    return class B1 extends aggregation(Operator, Manager) {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
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
                    res.data.hamlets.forEach((e) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.hamlet_id}</td>` +
                            `<td>${e.hamlet_name}</td>` +
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

        renderMenuLeft() {
            super.renderMenuLeft();

            this.inputCitizenButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-keyboard-o' aria-hidden='true'></i><span>Nhập liệu dân số</span></div>")
                .appendTo($(this.inputCitizenButton));
            $(this.inputCitizenButton).on('click', () => {
                this.inputCitizenButtonClickEvent();
            }); //add input citizen function

            this.printButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-print' aria-hidden='true'></i><span>In phiếu điều tra</span></div>")
                .appendTo($(this.printButton));
            $(this.printButton).on('click', () => {
                this.printButtonClickEvent();
            }); //add printting citizen input form function

            this.reportButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-check' aria-hidden='true'></i><span>Báo cáo hoàn thành</span></div>")
                .appendTo($(this.reportButton));
            $(this.reportButton).on('click', () => {
                this.reportButtonClickEvent();
            }); //add report progress function


            $('div.body-left').append($(this.inputCitizenButton), $(this.printButton), $(this.reportButton));
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();
        };

        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
        };

        creatingAccountButtonClickEvent() {
            super.creatingAccountButtonClickEvent();
        };

        citizenInfoButtonClickEvent() {
            super.citizenInfoButtonClickEvent();
        };

        monitoringProgressButtonClickEvent() {
            super.monitoringProgressButtonClickEvent();
        };

        showStatisticButtonClickEvent() {
            super.showStatisticButtonClickEvent();
        };

        inputCitizenButtonClickEvent() {
            super.inputCitizenButtonClickEvent();
        };

        printButtonClickEvent() {
            super.printButtonClickEvent();
        };

        reportButtonClickEvent() {
            super.reportButtonClickEvent();
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
                if (!prop.match(/^(?:constructor|prototype|arguments|caller|bind|call|apply|toString|length|declare_per|id|name|username|per_scope|role_id|monitoring|supervising)$/)) {
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

