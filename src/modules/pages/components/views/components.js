import App from "app/app";
import Marionette, { View } from "marionette";
import Alert from "Bootstrap/alert";
import {className, tagName, template, on} from "modules/common/controllers/decorators";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./components.html";
import Styles from "./components.scss";
import SyntaxHighlighting from "modules/common/components/syntax-highlighting";
import ComponentView from "modules/common/components/component-view";

/**
 * Features view
 *
 * @module modules/pages/features
 */
@className("components")
@template(Template)
class ComponentsView extends ComponentView {

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

        if(options.urlParams) {
            this.component = options.urlParams;
            this.title = `Components - ${this.component.charAt(0).toUpperCase() + this.component.slice(1)}`;
        } else {
            this.title = "Components";
        }

        App.setPageTitle(`${this.title}`);
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        console.log(this.component);
        if(undefined !== this.component) {
            this.el.querySelector(`[data-id="${this.component}"]`).classList.add("active");
        }

        var Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("components");
        this.showComponent(this.component);

    }

    showComponent (component) {
        const that = this;
        const el = that.el.querySelector("[data-role='content-container']");
        const descriptionElement = that.el.querySelector("[data-role='description-container']");

        const componentTitle = that.el.querySelector("[data-role='component-title']");
        const componentDescription = that.el.querySelector("[data-role='component-description']");

        switch(component) {
            case "alerts": {

                componentTitle.innerHTML = "Alerts";
                componentDescription.innerHTML = "Description about alerts";

                el.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <strong>Well done!</strong> You successfully read this important alert message.
                </div>
                <div class="alert alert-info" role="alert">
                    <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                </div>
                <div class="alert alert-warning" role="alert">
                    <strong>Warning!</strong> Better check yourself, you're not looking too good.
                </div>
                <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong> Change a few things up and try submitting again.
                </div>
                `;

                el.querySelectorAll(".alert").forEach(element => new Alert(element));

                this.registerComponent("javascript-content", SyntaxHighlighting, descriptionElement, {
                    source: `
                        // Javascript
                        /** Import the alert **/
                        import Alert from "Bootstrap/alert";

                        // We Assume you already have an element with the alert

                        /** Assign it to the alert **/
                        const alert = new Alert(el.querySelectorAll(".alert"));
                    `,
                    language: "javascript"
                });

                this.registerComponent("html-content", SyntaxHighlighting, descriptionElement, {
                    source: `
                       <!-- HTML -->
                       <div class="alert alert-success" role="alert">
                           <strong>Well done!</strong> You successfully read this important alert message.
                       </div>
                   `,
                    language: "markup"
                });

                break;
            }

            default: {
                return;
            }
        }
    }
}

/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default ComponentsView;
