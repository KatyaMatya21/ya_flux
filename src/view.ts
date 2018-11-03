import Dispatcher from "./dispatcher";
import Store from "./store";

/**
 * Класс view компонента
 */
export default class View {

  /**
   * DOM контейнер
   */
  protected element: HTMLElement;

  /**
   * Связанный Dispatcher
   */
  private dispatcher: Dispatcher;

  /**
   * Связанный Store
   */
  private store: Store;

  /**
   * Конструктор класса
   * @param element Контейнер
   */
  constructor(element: HTMLElement) {
    this.element = element;
  }

  /**
   * Связывание с Dispatcher
   * @param dispatcher Ссылка на экземпляр класса Dispatcher
   */
  public connectDispatcher(dispatcher: Dispatcher): void {
    this.dispatcher = dispatcher;
  }

  /**
   * Связывание со Store
   * @param store Ссылка на экземпляр класса Store
   */
  public connectStore(store: Store): void {
    this.store = store;
    this.store.connectView(this);
  }

  /**
   * Обновление DOM-элемента
   */
  public updateState() {
    this.element.innerHTML = this.render();
  }

  /**
   * Отправка действия в Dispatcher
   * @param type Тип действия
   * @param payload Полезная нагрузка действия
   */
  protected dispatchAction(type: string, payload: any): void {
    this.dispatcher.dispatch(type, payload);
  }

  /**
   * Получение состояния связанного хранилища
   */
  protected getStoreData(): any {
    return this.store.getData();
  }

  /**
   * Генерирование шаблона
   */
  protected render(): string {
    return '';
  }
}
