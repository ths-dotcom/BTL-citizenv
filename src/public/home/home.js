define(["jquery", "axios", "A1", "A2"], function ($, axios, A1, A2) {
    $(document).ready(() => {
        axios({
            method: 'GET',
            url: '/api/user/infor'
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                switch (res.data.user.role_id) {
                    case 1:
                        const currentUser = new A1(res.data.user.id, res.data.user.username, res.data.user.name, res.data.user.per_scope, res.data.user.role_id, res.data.user.declare_per);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
            } else {
                console.log(res);
            }
        })
        currentUser.renderChart();
    });
});

