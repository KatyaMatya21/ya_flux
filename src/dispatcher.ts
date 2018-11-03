/**
 * Класс диспетчера приложения
 */
export default class Dispatcher {

  /**
   * Обработчики событий
   */
  private callbacks: Array<(type: string, payload: any) => void>;

  /**
   * Конструктор класса
   */
  constructor() {
    this.callbacks = [];
  }

  /**
   * Отправка действий
   * @param type Тип действия
   * @param payload Полезная нагрузка действия
   */
  public dispatch(type: string, payload: any): void {
    this.callbacks.forEach((callback) => {
      callback(type, payload);
    });
  }

  /**
   * Регистрация обработчика действия хранилища
   * @param callback Обработчик
   */
  public register(callback: (type: string, payload: any) => void): void {
    this.callbacks.push(callback);
  }
}
