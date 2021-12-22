define(["jquery", "axios", "A1"], function ($, axios, A1) {
    $(document).ready(() => {
        let currentUser;
        axios({
            method: 'GET',
            url: '/api/user/info'
        }).then((res) => {
            if (res.status === 200) {
                switch (res.data.user.role_id) {
                    case 1:
                        currentUser = new A1(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                    case 2:
                        currentUser = new A2(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                    case 3:
                        currentUser = new A3(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                    case 4:
                        currentUser = new B1(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                    case 5:
                        currentUser = new B2(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                }
            } else {
                console.log(userResponse);
            }
            currentUser.start();
        })


    });
});

