import Marionette, { Object } from "marionette";
import App from "app/app";

class ComponentsRouterController extends Object {

    /**
     * Start features route
     *
     * for some reason, router breaks if it doesn't have this present, but does not use this function anyway.
     */
    startComponentsRoute () {}

    startComponentsRouteWithParam () {}

}

/**
 * Export the controller
 *
 * @exports ComponentsRouterController
 */
export default ComponentsRouterController;
