sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("com.kaar.qualityportal.controller.ResultRecording", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("ResultRecording").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched(oEvent) {
            const sInspectionLot = oEvent.getParameter("arguments").InspectionLot;
            this.getView().bindElement({
                path: `/ZKSJ_INSPECTION_QP('${sInspectionLot}')`,
                model: "inspection"
            });
        },

        onNavBack() {
            this.getOwnerComponent().getRouter().navTo("InspectionLot");
        },

        onSaveResults() {
            const oModel = this.getView().getModel("inspection");
            // Assuming 2-way binding updates the model locally, we submit changes or update specifically if strict.
            // But usually with OData V2 model, we might need to submitChanges if batch is on, or just set property if update logic is custom.
            // If we relied on 2-way binding, we just need to ensure backend sync (submitChanges).
            // However, explicit update might be safer if we want to validate first.
            if (oModel.hasPendingChanges()) {
                oModel.submitChanges({
                    success: () => MessageToast.show("Results Saved Successfully"),
                    error: () => MessageToast.show("Error saving results")
                });
            } else {
                MessageToast.show("No changes to save");
            }
        },

        onSubmitDecision() {
            const oContext = this.getView().getBindingContext("inspection");
            const fLotDate = parseFloat(oContext.getProperty("LotQuantity")) || 0;
            const fUnrestricted = parseFloat(this.byId("inputUnrestricted").getValue()) || 0;
            const fBlocked = parseFloat(this.byId("inputBlocked").getValue()) || 0;
            const fProduction = parseFloat(this.byId("inputProduction").getValue()) || 0;
            const sDecision = this.byId("decisionSelect").getSelectedKey();

            const fTotalInspected = fUnrestricted + fBlocked + fProduction;

            if (fTotalInspected !== fLotDate) {
                MessageToast.show(`Error: Total inspected quantity (${fTotalInspected}) must match Lot Quantity (${fLotDate}).`);
                return;
            }

            // Save decision
            const oModel = this.getView().getModel("inspection");
            oModel.setProperty(oContext.getPath() + "/UsageDecision", sDecision);

            oModel.submitChanges({
                success: () => MessageToast.show("Usage Decision Submitted"),
                error: () => MessageToast.show("Error submitting decision")
            });
        }
    });
});
