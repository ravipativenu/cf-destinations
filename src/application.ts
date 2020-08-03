import * as express from "express";
import {getCFDestinationsRoute} from "./service/cloud-foundry";
import {dependencyCallbackRoute, subscribeTenantRoute, unsubscribeTenantRoute} from "./service/saas";
const xsenv = require("@sap/xsenv");
const passport = require('passport');
const { JWTStrategy } = require('@sap/xssec');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.loadMiddlewares()
    this.config();
    this.routes();
  }

  private loadMiddlewares() {

    // XSUAA middleware
    passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa))
    this.app.use(passport.initialize())
    this.app.use(passport.authenticate('JWT', { session: false }))


  }

  private config(): void {
    // make sure to NOT register this stuff on paths where CDS services are hosted!
    this.app.use("/api", express.json());
    this.app.use("/api", express.urlencoded({ extended: false }));
  }

  private routes(): void {
    const router = express.Router();
    router.get("/api/cloudfoundry/destinations", getCFDestinationsRoute);
    router.get('/callback/v1.0/dependencies', dependencyCallbackRoute);
    router.put('/callback/v1.0/tenants/*', subscribeTenantRoute);
    router.delete('/callback/v1.0/tenants/*', unsubscribeTenantRoute);
    this.app.use("/", router);
  }

}

const setupApp = () => {
  const _app = new App().app;
  return _app;
};

export default setupApp();
