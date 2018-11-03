import Dispatcher from "./dispatcher";
import Store from "./store";

export default class View {
  protected element: HTMLElement;
  private dispatcher: Dispatcher;
  private store: Store;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  public connectDispatcher(dispatcher: Dispatcher): void {
    this.dispatcher = dispatcher;
  }

  public connectStore(store: Store): void {
    this.store = store;
    this.store.connectView(this);
  }

  public updateState() {
    this.element.innerHTML = this.render();
  }

  protected dispatchAction(type: string, payload: any): void {
    this.dispatcher.dispatch(type, payload);
  }

  protected getStoreData(): any {
    return this.store.getData();
  }

  protected render(): string {
    return '';
  }
}
