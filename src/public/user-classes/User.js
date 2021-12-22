define(['jquery'], function ($) {
    return class User {
        constructor(id, username, name, per_scope, role_id, declare_per) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.per_scope = per_scope;
            this.role_id = role_id;
            this.declare_per = declare_per;
            let temp1 = '';
            let temp2 = '';
            switch (role_id) {
                case 1:
                    temp1 = 'tỉnh thành phố';
                    temp2 = 'A2';
                    break;
                case 2:
                    temp1 = 'quận Huyện';
                    temp2 = 'A3';
                    break;
                case 3:
                    temp1 = 'xã phường';
                    temp2 = 'B1';
                    break;
                case 4:
                    temp1 = 'thôn bản';
                    temp2 = 'B2';
                    break;
            };
            this.monitoring = temp1;
            this.supervising = temp2;
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

