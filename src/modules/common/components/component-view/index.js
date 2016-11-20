import App from "app/app";
import Marionette, { View } from "marionette";
import { attributes } from "modules/common/controllers/decorators";

@attributes({
    components: {},
    componentChannels: {}
})
class ComponentView extends View {

    /**
     * Register the component.
     *
     * @param componentName {String} Name the component will be registered under.
     * @param component {HTMLElement} The component you're registering.
     * @param el {jQuery} Container/Element you're putting the component into.
     * @param properties {Object} Properties you wish to apply to the component.
     */
    registerComponent (componentName, component, el, properties) {
        let Component = App.Compontents;
        Component.register(componentName, component, properties);

        let componentObject = Component.getComponent(componentName);

        /** Store references to the component & radio channels **/
        this.components[componentObject.elementName] = {
            element: componentObject.component,
            module: componentObject.componentModule
        };

        this.componentChannels[componentObject.elementName] = componentObject.radioChannel || {};

        el.append(componentObject.component);
    }

}


/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default ComponentView;
