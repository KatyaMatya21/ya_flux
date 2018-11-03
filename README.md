# Fluppik

Фреймворк использующий Flux подход для создания архитектуры приложения.

---

### Требования

- TypeScript

---

### Установка

- `npm i fluppik`

---

### Принцип работы



### Описание API фреймворка

Смотри [документацию](http://google.com) (TypeDoc)

---

### Простйшее приложение

```typescript

// Подключение модулей
import Dispatcher from "./node_modules/fluppik/src/dispatcher";
import Store from "./node_modules/fluppik/src/store";
import View from "./node_modules/fluppik/src/view";

// Создание экземпляра класса Dispatcher
const dispatcher = new Dispatcher();

// Создание экземпляра класса Store
const store = new Store({
  // Начальное состояние Store
  items: []
});

// Связывание Store с Dispatcher
store.connectDispatcher(dispatcher);

// Наследование класса View
class YourView extends View {
  
  // Переопределение метода отрисовки
  protected render(): string {
    const data = this.getStoreData();
    return '<div>' + data.items + '</div>';
  }
  
  // Переопределение метода обновления DOM
  public updateState() {
    super.updateState();
    this.element.querySelector.addEventListener('click', () => {
      // ...
    })
  }
}

// Создание экземпляра класса YourView
const yourView: YourView = new YourView(
  document.querySelector('.container')
);

// Связывание YourView с Dispatcher
yourView.connectDispatcher(dispatcher);

// Связывание YourView с Store
yourView.connectStore(store);

// Добавление обработчика действия по его типу
store.onAction('type', (payload, storeState) => {
  storeState.items.push({ a: true });
});

// Первоначальная отрисовка
yourView.updateState();

```
Для более подробного примера смотрите `./src/demo.ts`.

---

### Демо

Демо-страничка находится в папке `./demo/index.html`
