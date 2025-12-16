sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.Login", {
        onInit() {
            console.log("Login Controller Initialized");
        },

        onLogin() {
            const sUsername = this.byId("usernameInput").getValue();
            const sPassword = this.byId("passwordInput").getValue();

            if (!sUsername || !sPassword) {
                MessageToast.show("Enter User ID and Password");
                return;
            }

            // Simple check
            if (sUsername && sPassword) {
                this.getOwnerComponent().getRouter().navTo("Dashboard");
            }
        }
    });
});