sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.Dashboard", {
        onPressInspectionLot() {
            this.getOwnerComponent().getRouter().navTo("InspectionLot");
        },
        onPressResultRecording() {
            this.getOwnerComponent().getRouter().navTo("InspectionLot");
        },
        onPressUsageDecision() {
            this.getOwnerComponent().getRouter().navTo("InspectionLot");
        },
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("Login");
        }
    });
});
