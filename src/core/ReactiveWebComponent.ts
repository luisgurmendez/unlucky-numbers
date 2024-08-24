
abstract class ReactiveWebComponent<S extends object> extends HTMLElement {
    state: S;

    constructor(initialState: S) {
        super();
        this.state = this.createReactiveState(initialState);
    }

    connectedCallback() {
        this.render();
    }

    createReactiveState(obj: S) {
        const component = this;
        return new Proxy(obj, {
            set(target: S, property: Extract<keyof S, "string">, value) {
                if (typeof property == "string") {
                    target[property] = value;
                }
                component.render();
                return true;
            }
        });
    }

    abstract render(): void;
}

export default ReactiveWebComponent;
