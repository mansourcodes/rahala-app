export class User {
  constructor(
    private _token: string,
    private tokenType: string,
    private expiresAt: Date,
    public id?: string,
    public email?: string
  ) {}

  get token() {
    if (!this.expiresAt || this.expiresAt <= new Date()) {
      return null;
    }
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    const expiresAtDate = new Date(this.expiresAt);
    return expiresAtDate.getTime() - new Date().getTime();
  }
}
