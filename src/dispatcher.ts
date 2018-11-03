export default class Dispatcher {
  private callbacks: Function[];

  constructor() {
    this.callbacks = [];
  }

  public dispatch(type: string, payload: any) {
    this.callbacks.forEach((callback) => {
      callback(type, payload);
    });
  }

  public register(callback: Function) {
    this.callbacks.push(callback);
  }
}
