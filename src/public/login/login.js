// const { default: axios } = require("axios");
requirejs.config({
    paths: {
        jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        axios: "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
    }
});

define(["jquery", "axios"], function () {
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
                        document.cookie = `token=${res.data.token}`;
                        window.location = '/home';
                    }
                })
            }
        })
    });
});

