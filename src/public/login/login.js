// const { default: axios } = require("axios");

$(document).ready(() => {
    $('.submit-login-btn').on('click', () => {
        if ($('#username').val() != '' && $('#password').val() != '') {
            axios({
                method: 'POST',
                url: '/api/login',
                data: {
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val()
                    }
                }
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    $('document').cookie = `token=${res.data.token}`;
                    window.location = '/home';
                }
            })
        }
    })
});