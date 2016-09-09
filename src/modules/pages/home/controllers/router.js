import * as Marionette from "marionette";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
let HomeRouter = Marionette.AppRouter.extend({

    /**
     * Specify the controller
     *
     * @protected
     */
    controller: new HomeRouterController,

    /**
     * Routes
     *
     * @protected
     */
    appRoutes: {
        "(/)": "startIndexRoute"
    },

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    startIndexRoute: function () {
        if (typeof require.ensure == "function") {
            /* Asynchronous loading of a component that is inside of require.ensure */
            require.ensure([], (require) => {
                var HomeView = require("../views/home");
                App.getContentContainer().show(new HomeView.default());
            });
        } else {
            /* Server side synchronous loading */
            var HomeView = require("../views/home");
            App.getContentContainer().show(new HomeView.default());
        }
    }

});

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default HomeRouter;