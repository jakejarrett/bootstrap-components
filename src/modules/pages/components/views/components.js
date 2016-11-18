import App from "app/app";
import Marionette, { View } from "marionette";
import {className, tagName, template, on} from "modules/common/controllers/decorators";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./components.html";
import Styles from "./components.scss";

/**
 * Features view
 *
 * @module modules/pages/features
 */
@className("components")
@template(Template)
class ComponentsView extends View {

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize (options) {
        var that = this;

        if(module.hot) {
            /** Require the template & re-render :) **/
            module.hot.accept("./components.html", () => that.$el.html(_.template(require("./components.html"))));
        }
        console.log(options.urlParms);
        if(options.urlParms) {
            this.registerComponent(options.urlParms)
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        var Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("features");
    }

    registerComponent (component) {
        console.log(component);
    }
}

/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default ComponentsView;
