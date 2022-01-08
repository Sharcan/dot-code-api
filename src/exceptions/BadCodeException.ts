export class BadCodeException extends Error {
    constructor(message?) {
      super(message);
  
      this.message = message ?? "Oups, le code ne correspond pas à celui de départ.";
    }
  }