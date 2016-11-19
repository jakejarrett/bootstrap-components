import App from "app/app";
import Marionette, { View } from "marionette";
import Clipboard from "clipboard";
import * as Prism from "prismjs";
import "../controllers/prism-plugins";
import Alert from "Bootstrap/alert";
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
        console.log(options);
        if(options.urlParams) {
            this.component = options.urlParams;
        }
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
        this.registerComponent(this.component);

    }

    registerComponent (component) {
        const that = this;
        const el = that.el.querySelector("[data-role='content-container']");
        const codeEl = that.el.querySelector("[data-role='code-container']");

        Prism.plugins.NormalizeWhitespace.setDefaults({
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true,
            /*'break-lines': 80,
            'indent': 2,
            'remove-initial-line-feed': false,
            'tabs-to-spaces': 4,
            'spaces-to-tabs': 4*/
        });

        switch(component) {
            case "alerts": {
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

                el.querySelectorAll(".alert").forEach(element => new Alert(element))
                const js = Prism.highlight(`
                    // Javascript
                    /** Import the alert **/
                    import Alert from "Bootstrap/alert";

                    // We Assume you already have an element with the alert

                    /** Assign it to the alert **/
                    const alert = new Alert(el.querySelectorAll(".alert"));
                `, Prism.languages.javascript);

                const html = Prism.highlight(`// HTML
                    <div class="alert alert-success" role="alert">
                        <strong>Well done!</strong> You successfully read this important alert message.
                    </div>
                `, Prism.languages.html);

                codeEl.innerHTML = `${html} ${js}`;
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
