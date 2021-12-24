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
                    res.data.wards.forEach((e) => {
                        $('tbody').append('<tr>' +
                            `<td>${e.ward_id}</td>` +
                            `<td>${e.ward_name}</td>` +
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