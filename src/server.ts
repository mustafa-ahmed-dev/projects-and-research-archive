import App from "./api";
import config from "./config";

import AdminController from "./api/admin/admin.controller";

const app = new App([new AdminController()], config.api.port);

app.listen();
