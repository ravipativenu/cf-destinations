"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const port = 8080;
application_1.default.listen(port, () => {
    console.log("Express server listening on port " + port);
});
//# sourceMappingURL=index.js.map