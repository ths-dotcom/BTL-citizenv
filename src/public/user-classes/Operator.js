define(['user-classes/User', 'jquery'], function (User, $) {
    return class Operator extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        renderMenuLeft() {
            this.inputCitizenButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-keyboard-o' aria-hidden='true'></i><span>Nhập liệu dân số</span></div>")
                .appendTo($(this.inputCitizenButton));

            this.printButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-print' aria-hidden='true'></i><span>In phiếu điều tra</span></div>")
                .appendTo($(this.printButton));

            this.reportButton = $("<div></div>", { "class": "body-left-home" });
            $("<div class='body-left-home-content'><i class='fa fa-check' aria-hidden='true'></i><span>Báo cáo hoàn thành</span></div>")
                .appendTo($(this.reportButton));


            $('div.body-left').append($(this.inputCitizenButton), $(this.printButton), $(this.reportButton));
        };

    }
});

