import App from "app/app";
import { Component, on } from "marionette.component";
import * as Prism from "prismjs";
import "./prism-plugins";
import Template from "./index.html";
import * as Styles from "!css?modules!sass!./style.scss";

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
            html: that.highlightedEl,
            prism: Prism
        });

        this.renderComponent(elementName, renderedTemplate, Styles);
    }

    setupPrism () {
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

        this.highlightedEl = Prism.highlight(this.props.source, Prism.languages[this.props.language]);
    }

}

/**
 *  Export the Component
 *
 * @exports LoginComponent
 */
export default SyntaxHighlighting;
