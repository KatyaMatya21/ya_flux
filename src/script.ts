import Dispatcher from "./dispatcher";
import Store from "./store";
import View from "./view";

const dispatcher = new Dispatcher();
const store = new Store({
  items: [],
});

store.connectDispatcher(dispatcher);

class ToDoView extends View {
  private clickListener: (event: Event) => void;

  public updateState(): void {

    let buttonAdd: HTMLElement;

    if (this.clickListener) {
      buttonAdd = this.element.querySelector('button');
      buttonAdd.removeEventListener('click', this.clickListener);
    }

    super.updateState();

    buttonAdd = this.element.querySelector('button');
    buttonAdd.addEventListener('click', this.onBtnClick.bind(this));
  }

  protected render(): string {
    const storeData = this.getStoreData();

    let listHtml: string = '';
    storeData.items.map((item: string) => {
      listHtml += `<li>${item}</li>`;
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

  private onBtnClick(event: Event): void {
    event.preventDefault();
    const text: string = (this.element.querySelector('input[type="text"]') as HTMLInputElement).value;
    this.dispatchAction('addItem', text);
  }
}

const container: HTMLElement = document.querySelector('.todo');

const todo: ToDoView = new ToDoView(container);

todo.connectDispatcher(dispatcher);
todo.connectStore(store);

store.onAction('addItem', (text, state) => {
  state.items.push(text);
});

todo.updateState();
