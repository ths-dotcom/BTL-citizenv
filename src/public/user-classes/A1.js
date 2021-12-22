define(['user-classes/Manager', 'jquery', 'axios'], function (Manager, $, axios) {
    return class A1 extends Manager {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        start() {
            this.renderMenuLeft();
            this.renderInfo();
        };

        //overloading creating city function for A1
        creatingPlaceButtonClickEvent() {
            super.creatingPlaceButtonClickEvent();
            $('button.code-foot-yes-btn.same-foot-yes-btn').on('click', () => {
                axios({
                    method: 'POST',
                    url: '/api/city',
                    data: {
                        data: {
                            city_name: $('input.name-khaibao-input.same-left-input').val(),
                            city_id: $('input.code-khaibao-input.same-left-input').val(),
                            password: $('input.password-khaibao-input.same-left-input').val()
                        }
                    }
                }).then((res) => {
                    if (res.data.success) {
                        console.log(userResponse);
                    } else {
                        console.log(userResponse);
                    }
                })
            });
        }
    }
});

