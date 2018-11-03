import Dispatcher from "./dispatcher";
import Store from "./store";

export default class View {
  private dispatcher: Dispatcher;
  private store: Store;

  public connectDispatcher(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
  }

  public connectStore(store: Store) {
    this.store = store;
  }

  dispatchAction(type: string, payload: any) {
    this.dispatcher.dispatch(type, payload);
  }

  getStoreData() {
    return this.store.getData();
  }

  render() {

  }
}
