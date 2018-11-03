import Dispatcher from "./dispatcher";
import View from "./view";

export default class Store {
  private dispatcher: Dispatcher;
  private state: any;
  private actionCallbacks: any;
  private views: View[];

  constructor(initialState: any = {}) {
    this.state = initialState;
    this.actionCallbacks = {};
    this.views = [];
  }

  public connectDispatcher(dispatcher: Dispatcher): void {
    this.dispatcher = dispatcher;
    this.dispatcher.register(this.processAction);
  }

  public connectView(view: View): void {
    this.views.push(view);
  }

  public onAction(type: string, callback: (payload: any, state: any) => void): void {
    this.actionCallbacks.type = callback;
  }

  public getData(): any {
    return this.state;
  }

  protected processAction (type: string, payload: any): void {
    if (typeof this.actionCallbacks[type] !== 'undefined') {
      this.actionCallbacks[type](payload, this.state);
      this.views.map((view) => {
        view.updateState();
      });
    }
  }
}
