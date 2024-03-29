import Marionette, { AppRouter } from "marionette";
import {controller, appRoute} from "modules/common/controllers/decorators";
import ComponentsRouterController from "./router-contoller";
import App from "app/app";

/**
 * Features page Router
 *
 * @module modules/pages/features
 */
@controller(new ComponentsRouterController)
class ComponentsRoute extends AppRouter {

    constructor (...args) {
        super(args);
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    @appRoute("components(/)")
    startComponentsRoute (params) {
        console.log(params);
        System.import("../views/components").then(View => App.getContentContainer().show(new View.default()));
    }

    @appRoute("components/:componentName")
    startComponentsRouteWithParam (params) {
        System.import("../views/components").then(View => App.getContentContainer().show(new View.default({urlParams: params})));
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default ComponentsRoute;
