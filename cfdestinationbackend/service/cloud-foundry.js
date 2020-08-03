"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCFDestinationsRoute = void 0;
const core_1 = require("@sap-cloud-sdk/core");
let options = {};
async function getCFDestinationsRoute(req, res) {
    var paramdestination = req.query.destination;
    options.selectionStrategy = core_1.DestinationSelectionStrategies.subscriberFirst;
    options.userJwt = req.authInfo.getTokenInfo().getTokenValue();
    var destination = await core_1.getDestination(paramdestination, options);
    if (req.authInfo !== undefined && req.authInfo.checkLocalScope("read")) {
        res.status(200).send(destination.originalProperties);
    }
    else {
        res.type("text/plain").status(401).send(`ERROR: Not Authorized. Missing Necessary scope`);
    }
}
exports.getCFDestinationsRoute = getCFDestinationsRoute;
//# sourceMappingURL=cloud-foundry.js.map