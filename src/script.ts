import Dispatcher from "./dispatcher";
import Store from "./store";
import View from "./view";

const dispatcher = new Dispatcher();
const store = new Store({
  items: [],
});

store.connectDispatcher(dispatcher);

class ToDoView extends View {
  protected render(): string {
    const storeData = this.getStoreData();

    const listHtml = storeData.items.map((item: string) => {
      return `<li>${item}</li>`;
    });

    return `
      <h1>Todo</h1>

      <ul>
        ${listHtml}
      </ul>

      <form>
        <label for="text">Название задачи</label>
        <input type="text" id="text">
        <button type="submit">Добавить</button>
      </form>`;
  }
}

const container: HTMLElement = document.querySelector('.todo');

const todo = new ToDoView(container);

todo.connectDispatcher(dispatcher);
todo.connectStore(store);
todo.updateState();
