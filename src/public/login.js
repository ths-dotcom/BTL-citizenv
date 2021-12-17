$(document).ready(() => {
    $('.submit-login-btn').on('click', () => {
        if ($('#username').value != '' && $('#password').value != '') {
            axios.post('POST', {
                username: $('#username').value,
                password: $('#password').value
            }).then((res) => {
                console.log(res);
            })
        }
    })
});