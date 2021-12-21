define(["jquery", "axios", "A1", "A2"], function ($, axios, A1, A2) {
    $(document).ready(() => {
        const user1 = new A1("admin");
        // let user2 = new A2("user");

        user1.renderChart();
    });
});

