sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], (Controller, MessageToast) => {
  "use strict";

  return Controller.extend("com.kaar.qualityportal.controller.App", {
    onInit() {
      console.log("App Controller Initialized");
    }
  });
});