import * as Marionette from "marionette";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
class HomeRouter extends Marionette.AppRouter {

    constructor (...args) {
        super(args);
        this.controller = new HomeRouterController;
        this.appRoutes = {
            "(/)": "startIndexRoute"
        };
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    startIndexRoute () {

        if (typeof require.ensure == "function") {
            /**
             * Lazily load the features chunk of code
             * (This is the only documented way to do this with ES6 as of writing this)
             */
            require.ensure([], (require) => {
                var HomeView = require("../views/home");
                console.log(HomeView);
                App.getContentContainer().show(new HomeView.default());
            });
        } else {
            /**
             * Synchronously load the home view.
             */
            var HomeView = require("../views/home");
            App.getContentContainer().show(new HomeView.default());
        }
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default HomeRouter;
