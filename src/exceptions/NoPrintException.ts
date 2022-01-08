export class NoPrintException extends Error {
    constructor(message?) {
      super(message);
  
      this.message = message ?? "N'oubliez pas d'afficher le résultat ! ;)";
    }
  }