import Dispatcher from "./dispatcher";

export default class Store {
  private dispatcher: Dispatcher;
  private state: any;
  private actionCallbacks: any;

  constructor() {
    this.state = {};
    this.actionCallbacks = {};
  }

  public connectDispatcher(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
    this.dispatcher.register(this.processAction);
  }

  processAction (type: string, payload: any) {
    if (typeof this.actionCallbacks[type] !== 'undefined') {
      this.actionCallbacks[type](payload, this.state);
    }
  }

  onAction(type: string, callback: Function) {
    this.actionCallbacks.type = callback;
  }

  getData() {
    return this.state;
  }
}
