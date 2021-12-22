define(['jquery'], function ($) {
    return class User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.per_scope = per_scope;
            this.role_id = role_id;
            this.declare_per = declare_per;
            let temp = '';
            switch (role_id) {
                case 1:
                    temp = 'tỉnh thành phố';
                    break;
                case 2:
                    temp = 'quận Huyện';
                    break;
                case 3:
                    temp = 'xã phường';
                    break;
                case 4:
                    temp = 'thôn bản';
                    break;
            };
            this.monitoring = temp;
        };

        renderInfo() {
            $('div.left-account-name').text('Cán bộ ' + this.name);
            $('span.name-account-text').text('Cán bộ ' + this.name);
        };

        clearRightContent() {
            $('div.body-right-content').empty();
        }
    }
}
);

