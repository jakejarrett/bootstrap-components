import App from "app/app";
import { Component, on } from "@jakejarrett/marionette-component";
import * as Prism from "prismjs";
import "./prism-plugins";
import Template from "./index.html";
import * as Styles from "!css-loader?modules!sass-loader!./style.scss";

/**
 * Entry point for login component
 */
class SyntaxHighlighting extends Component {

    /**
     * Setup our component.
     */
    constructor (elementName, props={}) {
        super(elementName);
        this.props = props;
        this.render(elementName);
        return this;
    }

    /**
     * Render the component
     */
    render (elementName) {
        var that = this;
        this.setupPrism();
        const renderedTemplate = _.template(Template)({
            language: that.props.language,
            html: that.highlightedEl
        });
        this.renderComponent(elementName, renderedTemplate, Styles);
    }

    setupPrism () {
        /**
         * TODO- Get plugins working. (they're registered in the global/window namespace)
         */
        Prism.plugins.NormalizeWhitespace.setDefaults({
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true
        });

        this.highlightedEl = Prism.highlight(this.props.source, Prism.languages[this.props.language]);
    }

    @on("click")
    onClick () {
        console.log(this);
    }

}

/**
 *  Export the Component
 *
 * @exports LoginComponent
 */
export default SyntaxHighlighting;
