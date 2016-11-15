import App from "app/app";
import { View } from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import { className, tagName, template, on } from "modules/common/controllers/decorators";
import Template from "./home.html";
import "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 * @exports HomeView
 */
@className("home")
@template(Template)
class HomeView extends View {

    constructor () {
        super();
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        var that = this;
        if (module.hot) {
            /** Require the template & re-render :) **/
            module.hot.accept("./home.html", (res) => {
                that.$el.find("#content-container").html(_.template(require("./home.html")));
            });
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        let Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("home");
    }
    
}

export default HomeView;
