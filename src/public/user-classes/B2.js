define(['user-classes/Operator', 'jquery', 'axios'], function (Operator, $, axios) {
    return class B2 extends Operator {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        start() { //run all the functionalities of B2 user
            this.homeButtonClickEvent();
            this.renderMenuLeft();
            this.renderInfo();
        };

        homeButtonClickEvent() {
            super.homeButtonClickEvent();
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