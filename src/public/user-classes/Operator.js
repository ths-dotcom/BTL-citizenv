define(['user-classes/User'], function (User) {
    return class Operator extends User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            super(id, username, name, per_scope, role_id, declare_per);
        };
        renderMenuLeft() {

        };

    }
});

