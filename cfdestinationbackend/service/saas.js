"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeTenantRoute = exports.subscribeTenantRoute = exports.dependencyCallbackRoute = void 0;
const xsenv = require("@sap/xsenv");
async function dependencyCallbackRoute(req, res) {
    var dest = xsenv.getServices({ destination: { tag: 'destination' } }).destination;
    var xsappname = dest.xsappname;
    res.status(200).json([{ 'appId': xsappname, 'appName': 'destination' }]);
}
exports.dependencyCallbackRoute = dependencyCallbackRoute;
async function subscribeTenantRoute(req, res) {
    var consumerSubdomain = req.params["0"];
    var tenantAppURL = "https:\/\/" + consumerSubdomain + "-cfdestinationui.cfapps.eu10.hana.ondemand.com";
    res.status(200).send(tenantAppURL);
}
exports.subscribeTenantRoute = subscribeTenantRoute;
async function unsubscribeTenantRoute(req, res) {
    res.status(200);
}
exports.unsubscribeTenantRoute = unsubscribeTenantRoute;
//# sourceMappingURL=saas.js.map