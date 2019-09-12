export class User {
  public nombre: string;
  public email: string;
  public uid: string

  constructor(user: IUser) {
    this.nombre = user.nombre
    this.email = user.email
    this.uid = user.uid
  }
}

export interface IUser {
  nombre: string,
  email: string,
  uid: string
}
