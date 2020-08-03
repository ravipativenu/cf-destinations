"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cloud_foundry_1 = require("./service/cloud-foundry");
const saas_1 = require("./service/saas");
const xsenv = require("@sap/xsenv");
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');
class App {
    constructor() {
        this.app = express();
        this.loadMiddlewares();
        this.config();
        this.routes();
    }
    loadMiddlewares() {
        passport.use(new JWTStrategy(xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa));
        this.app.use(passport.initialize());
        this.app.use(passport.authenticate('JWT', { session: false }));
    }
    config() {
        this.app.use("/api", express.json());
        this.app.use("/api", express.urlencoded({ extended: false }));
    }
    routes() {
        const router = express.Router();
        router.get("/api/cloudfoundry/destinations", cloud_foundry_1.getCFDestinationsRoute);
        router.get('/callback/v1.0/dependencies', saas_1.dependencyCallbackRoute);
        router.put('/callback/v1.0/tenants/*', saas_1.subscribeTenantRoute);
        router.delete('/callback/v1.0/tenants/*', saas_1.unsubscribeTenantRoute);
        this.app.use("/", router);
    }
}
const setupApp = () => {
    const _app = new App().app;
    return _app;
};
exports.default = setupApp();
//# sourceMappingURL=application.js.map