import Dispatcher from "./dispatcher";
import View from "./view";

/**
 * Класс хранилища состояния приложения
 */
export default class Store {

  /**
   * Связанный Dispatcher
   */
  private dispatcher: Dispatcher;

  /**
   * Объект состояния хранилища
   */
  private state: any;

  /**
   * Обработчики действий
   */
  private actionCallbacks: any;

  /**
   * Связанный view
   */
  private views: View[];

  /**
   * Конструктор класса
   * @param initialState Начальное состояние хранилища
   */
  constructor(initialState: any = {}) {
    this.state = initialState;
    this.actionCallbacks = {};
    this.views = [];
  }

  /**
   * Связывание с Dispatcher
   * @param dispatcher Ссылка на экземпляр класса Dispatcher
   */
  public connectDispatcher(dispatcher: Dispatcher): void {
    this.dispatcher = dispatcher;
    this.dispatcher.register(this.processAction.bind(this));
  }

  /**
   * Связывание c View
   * @param view Ссылка на экземпляр класса View
   */
  public connectView(view: View): void {
    this.views.push(view);
  }

  /**
   * Добавление обработчика действия по его типу
   * @param type Тип действия
   * @param callback Колбэк по действию
   */
  public onAction(type: string, callback: (payload: any, state: any) => void): void {
    this.actionCallbacks[type] = callback;
  }

  /**
   * Получение состояния хранилища
   */
  public getData(): any {
    return this.state;
  }

  /**
   * Обработка действия пришедшего от Dispatcher
   * @param type Тип действия
   * @param payload Объект состояния действия
   */
  protected processAction (type: string, payload: any): void {
    if (typeof this.actionCallbacks[type] !== 'undefined') {
      this.actionCallbacks[type](payload, this.state);
      this.views.map((view) => {
        view.updateState();
      });
    }
  }
}
