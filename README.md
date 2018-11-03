[![npm version](https://badge.fury.io/js/fluppik.svg)](https://badge.fury.io/js/fluppik)

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

Фреймворк позволяет организовать работу приложение и его компонент
по подходу Flux с одним или несколькими хранилищами состояния.
Цикл работы представлен в следующем виде:

1. View компонента генерирует событие Action и отправляет его в Dispatcher.
2. Dispatcher перенаправляет Action в Store.
3. Store обрабатывает событие, изменяя своё состояние State.
4. Store оповещает все компоненты View об изменении состояния.
5. Все компоненты View получают новые данные из Store и перерисовывают себя.

---

### Описание API фреймворка

Смотри [документацию](https://katyamatya21.github.io/ya_flux/index.html) (TypeDoc)

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

---

### TODO

* Заменить все `any` на генерики...
