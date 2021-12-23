define(['user-classes/User', 'jquery'], function (User, $) {
    return class Operator extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
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

        inputCitizenButtonClickEvent() {
            console.log('function of operator');
        };

        printButtonClickEvent() {

        };

        reportButtonClickEvent() {

        };
    }
});

