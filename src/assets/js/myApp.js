import {HomeController} from "./controllers/homeController.js";
import {NavbarController} from "./controllers/navbarController.js";

export class MyApp {

    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_HOME = "home";

    constructor() {
        MyApp.loadController(MyApp.CONTROLLER_NAVBAR);
        MyApp.loadController(MyApp.CONTROLLER_HOME);
    }

    static loadController(controllerName, controllerData = {}) {
        console.log(`LOAD CONTROLLER: ${controllerName}`);

        switch (controllerName) {
            // navbar is an exception
            case MyApp.CONTROLLER_NAVBAR:
                new NavbarController(controllerData)
                return true;

            case MyApp.CONTROLLER_HOME:
                new HomeController(controllerData);
                break;

            default:
                return false;
        }

        MyApp.setCurrentController(controllerName);
        return true;
    }

    static setCurrentController(controllerName) {
        location.hash = controllerName;
    }
}
