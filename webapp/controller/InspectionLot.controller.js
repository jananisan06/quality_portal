sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel"
], (Controller, UIComponent, ODataModel) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.InspectionLot", {
        onInit() {
            // Debugging: Explicitly create the model to verify connectivity
            var sServiceUrl = "/sap/opu/odata/sap/ZKSJ_INSPECTION_QP_CDS/";
            var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
                useBatch: false,
                defaultBindingMode: "TwoWay"
            });

            oModel.attachMetadataLoaded(function () {
                console.log("Explicit ODataModel: Metadata loaded successfully");
            });

            oModel.attachMetadataFailed(function (oEvent) {
                console.error("Explicit ODataModel: Metadata failed to load", oEvent.getParameter("response"));
            });

            this.getView().setModel(oModel, "inspection");
            console.log("Explicitly set 'inspection' model in onInit");
        },

        onRefresh: function () {
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
