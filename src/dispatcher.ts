export default class Dispatcher {
  private callbacks: Array<(type: string, payload: any) => void>;

  constructor() {
    this.callbacks = [];
  }

  public dispatch(type: string, payload: any): void {
    this.callbacks.forEach((callback) => {
      callback(type, payload);
    });
  }

  public register(callback: (type: string, payload: any) => void): void {
    this.callbacks.push(callback);
  }
}
