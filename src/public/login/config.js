requirejs.config({
    paths: {
        app: "./config.js",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min",
        axios: "//cdn.jsdelivr.net/npm/axios/dist/axios.min"
    }
});

requirejs(["public/login/login.js"]);
