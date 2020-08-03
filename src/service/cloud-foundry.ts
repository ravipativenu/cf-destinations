import { Request, Response } from 'express';
import { getDestination, DestinationOptions, DestinationSelectionStrategies } from '@sap-cloud-sdk/core';

let options: DestinationOptions = {}


export async function getCFDestinationsRoute(req: Request, res: Response) {
    var paramdestination = req.query.destination;
    options.selectionStrategy = DestinationSelectionStrategies.subscriberFirst;
    options.userJwt = req.authInfo.getTokenInfo().getTokenValue();
    var destination = await getDestination(paramdestination, options);
    if (req.authInfo !== undefined && req.authInfo.checkLocalScope("read")) {
        res.status(200).send(destination.originalProperties);
    } else {
        res.type("text/plain").status(401).send(`ERROR: Not Authorized. Missing Necessary scope`)
    }
}