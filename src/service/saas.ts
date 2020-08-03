import { Request, Response } from 'express';
const xsenv = require("@sap/xsenv");

export async function dependencyCallbackRoute(req: Request, res: Response) {
        var dest = xsenv.getServices({ destination: { tag: 'destination' } }).destination;
        var xsappname = dest.xsappname;
        res.status(200).json([{'appId': xsappname, 'appName': 'destination'}]);
}
    
export async function subscribeTenantRoute(req: Request, res: Response) {
    var consumerSubdomain = req.params["0"];
    var tenantAppURL = "https:\/\/" + consumerSubdomain + "-cfdestinationui.cfapps.eu10.hana.ondemand.com";
    res.status(200).send(tenantAppURL);
}


export async function unsubscribeTenantRoute(req: Request, res: Response) {
    res.status(200);
}

