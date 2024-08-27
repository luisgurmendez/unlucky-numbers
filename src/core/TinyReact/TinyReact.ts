


(async () => {
    interface VNode {
        type: string | Function;
        props: Record<string, any>;
        children: VNode[];
    }

    function createElement(type: string | Function, props: Record<string, any> = {}, ...children: any[]): VNode {
        return { type, props: { ...props, children }, children };
    }

    function createDomNode(vnode: VNode): HTMLElement | Text {
        if (typeof vnode === "string") {
            return document.createTextNode(vnode);
        }

        const { type, props } = vnode;

        // Handle functional components
        if (typeof type === "function") {
            return createDomNode((type as Function)(props));
        }

        const node = document.createElement(type as string);

        // Set properties
        for (const [key, value] of Object.entries(props)) {
            if (key !== "children") {
                console.log(value);
                node.setAttribute(key, value);
            }
        }

        // Render children
        const children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach((child) => node.appendChild(createDomNode(child)));

        return node;
    }


    function reconcile(parent: HTMLElement, oldVNode: VNode | null, newVNode: VNode) {
        if (!oldVNode) {
            parent.appendChild(createDomNode(newVNode));
        } else if (!newVNode) {
            parent.removeChild(parent.firstChild!);
        } else if (typeof oldVNode === "string" || typeof newVNode === "string") {
            if (oldVNode !== newVNode) {
                parent.replaceChild(createDomNode(newVNode), parent.firstChild!);
            }
        } else if (oldVNode.type === newVNode.type) {
            updateDomProps(parent.firstChild as HTMLElement, oldVNode.props, newVNode.props);
            reconcileChildren(parent.firstChild as HTMLElement, oldVNode.children, newVNode.children);
        } else {
            // Replace the old node with the new one
            parent.replaceChild(createDomNode(newVNode), parent.firstChild!);
        }
    }

    function updateDomProps(dom: HTMLElement, oldProps: Record<string, any>, newProps: Record<string, any>) {
        for (const [key, value] of Object.entries(newProps)) {
            if (key !== "children") {
                dom.setAttribute(key, value);
            }
        }
        for (const key in oldProps) {
            if (!(key in newProps)) {
                dom.removeAttribute(key);
            }
        }
    }

    function reconcileChildren(dom: HTMLElement, oldChildren: VNode[], newChildren: VNode[]) {
        const maxLength = Math.max(oldChildren.length, newChildren.length);
        for (let i = 0; i < maxLength; i++) {
            reconcile(dom, oldChildren[i], newChildren[i]);
        }
    }


    let currentComponent: any = null;
    let currentHookIndex = 0;

    function useState<T>(initialValue: T): [T, (newValue: T) => void] {
        const hookState = currentComponent.hooks[currentHookIndex] || initialValue;
        const component = currentComponent;
        const setState = (newValue: T) => {
            component.hooks[currentHookIndex] = newValue;
            renderComponent(component);
        };
        currentHookIndex++;
        return [hookState, setState];
    }

    function renderComponent(component: any) {
        currentHookIndex = 0;
        const vnode = component.render();
        reconcile(component.dom, component.vnode, vnode);
        component.vnode = vnode;
    }


    function useEffect(callback: () => void, dependencies: any[]) {
        const hookDependencies = currentComponent.hooks[currentHookIndex] || [];
        const hasChanged = dependencies.some((dep, i) => dep !== hookDependencies[i]);
        if (hasChanged) {
            callback();
            currentComponent.hooks[currentHookIndex] = dependencies;
        }
        currentHookIndex++;
    }


    class TinyReactFunctionalComponent {
        hooks: any[] = [];
        dom: HTMLElement;
        vnode: VNode;

        constructor(dom: HTMLElement, renderFn: () => VNode) {
            this.dom = dom;
            this.vnode = renderFn();
            this.render = renderFn;
        }

        render: () => VNode;
    }


    function renderFunctionalComponent(vnode: VNode, container: HTMLElement) {
        const component = new TinyReactFunctionalComponent(container, () => vnode);
        currentComponent = component;
        component.dom.appendChild(createDomNode(vnode));
        currentComponent = null;
    }


    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            console.log(`Count updated: ${count}`);
        }, [count]);

        console.log(count);

        return createElement(
            "div",
            undefined,
            createElement("p", undefined, `Count: ${count}`),
            createElement(
                "button",
                { onclick: () => setCount(count + 1) },
                "Increment"
            )
        );
    }

    // Usage
    const app = createElement(Counter, {});
    renderFunctionalComponent(app, document.getElementById("root")!);

})()