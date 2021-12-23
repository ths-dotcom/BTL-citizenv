requirejs.config({
    baseUrl: "/public",
    paths: {
        app: "./config.js",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min",
        axios: "//cdn.jsdelivr.net/npm/axios/dist/axios.min",
        A1: "./user-classes/A1",
        A2: "./user-classes/A2",
        A3: "./user-classes/A3",
        B1: "./user-classes/B1",
        B2: "./user-classes/B2",
    }
});

requirejs(["public/home/home.js"]);
