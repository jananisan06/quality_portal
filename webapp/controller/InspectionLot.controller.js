sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.InspectionLot", {
        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("Dashboard");
        },
        onPressLot(oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext("inspection");
            const sLotId = oContext.getProperty("InspectionLot");

            this.getOwnerComponent().getRouter().navTo("ResultRecording", {
                InspectionLot: sLotId
            });
        }
    });
});
