define(["jquery", "axios", "A1", "A2", "A3", "B1", "B2"], function ($, axios, A1, A2, A3, B1, B2) {
    $(document).ready(() => {
        let currentUser;
        axios({
            method: 'GET',
            url: '/api/user/info'
        }).then((res) => {
            if (res.status === 200) {
                switch (res.data.user.role_id) {
                    case 1:
                        currentUser = new A1(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per, res.data.user.address);
                        break;
                    case 2:
                        currentUser = new A2(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per, res.data.user.address);
                        break;
                    case 3:
                        currentUser = new A3(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per, res.data.user.address);
                        break;
                    case 4:
                        currentUser = new B1(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per, res.data.user.address);
                        break;
                    case 5:
                        console.log(res.data.user.address);
                        currentUser = new B2(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per, res.data.user.address);
                        break;
                }
            } else {
                console.log(userResponse);
            }
            currentUser.start();
            console.log(currentUser);

            $('ul.navbar__user-menu').children().last().on('click', () => {
                document.cookie = `token=`;
            });
        })


    });
});

