
type State = Record<string, any>;

type Subscriber = (state: State) => void;

interface SubscribeOptions {
    immediate: boolean;
}

class ObservableStore<S extends State> {
    private _state: any;
    private _subscribers: Set<Subscriber>

    constructor(initialState: S) {
        this._state = initialState;
        this._subscribers = new Set<Subscriber>();
    }

    getState() {
        return this._state;
    }

    setState(newState: S) {
        this._state = newState;
        this._subscribers.forEach(subscriber => subscriber(this._state));
    }

    subscribe(subscriber: Subscriber, opts: SubscribeOptions = { immediate: false }) {
        this._subscribers.add(subscriber);
        if (opts.immediate) {
            subscriber(this._state);
        }
    }

    unsubscribe(subscriber: Subscriber) {
        this._subscribers.delete(subscriber);
    }

}

export default ObservableStore;
