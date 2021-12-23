define(['user-classes/Manager', 'user-classes/Operator', 'jquery', 'axios'], function (Manager, Operator, $, axios) {
    return class B1 extends aggregation(Operator, Manager) {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        start() { //run all the functionalities of A1 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
            this.inputCitizenButtonClickEvent();
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
                if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            })
    }
    mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
} // multiple inheritance

