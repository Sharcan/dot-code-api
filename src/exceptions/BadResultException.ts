export class BadResultException extends Error {
  constructor(message?) {
    super(message);

    this.message = message ?? "Oups, c'est un mauvais résultat.";
  }
}