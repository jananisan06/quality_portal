sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.InspectionLot", {
        onInit() {
            // Debugging: Check if model is available
            const oModel = this.getOwnerComponent().getModel("inspection");
            if (oModel) {
                console.log("Inspection model found:", oModel);
                // Force a metadata load check
                oModel.metadataLoaded().then(() => {
                    console.log("Inspection metadata loaded successfully");
                }).catch((err) => {
                    console.error("Inspection metadata failed to load:", err);
                });
            } else {
                console.error("Inspection model not found");
            }
        },

        onRefresh: function() {
            var oTable = this.byId("inspectionTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                sap.m.MessageToast.show("Refreshed");
            } else {
                sap.m.MessageToast.show("No binding found");
            }
        },
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
