define(['jquery'], function ($) {
    return class User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.per_scope = per_scope;
            this.role_id = role_id;
            this.declare_per = declare_per;
        };

        renderInfo() {
            $('div.left-account-name').text('Cán bộ ' + this.name);
            $('span.name-account-text').text('Cán bộ ' + this.name);
        }
    }
}
);

