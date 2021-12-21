define(['user-classes/Manager', 'jquery'], function (Manager, $) {
    class A1 extends Manager {
        constructor(role) {
            super();
        };
        renderChart() {
            console.log('its working for A1');
            $(" <div class='body-left-home'><div class='body-left-home-content'><i class='fa fa-check' aria-hidden='true'></i><span>Báo cáo hoàn thành</span></div></div>")
                .appendTo("div.body-left");
        };
        // renderDeclaringPlace() {

        // };
        // renderCreatingAccount() {

        // };

        // renderViewingCitizen() {

        // };

        // renderMonitoring() {

        // };


    }
    return A1;
});

