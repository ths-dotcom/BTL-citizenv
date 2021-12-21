define(['user-classes/User'], function (User) {
    class A1 extends User {
        constructor(role) {
            super();
        };
        renderChart() {
            console.log('its working for A1');
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

