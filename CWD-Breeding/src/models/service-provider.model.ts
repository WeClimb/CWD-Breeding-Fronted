interface IServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subDataId: string;
  loginDataId: string;
  createDate: Date;
  updateDate: Date;
  status: string;
}

export class ServiceProvider{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subDataId: string;
  loginDataId: string;
  createDate: Date;
  updateDate: Date;
  status: string;

  constructor();
  constructor(object: IServiceProvider);
  constructor(object?: any){
      this.id = object && object.id || null;
      this.firstName = object && object.firstName || null;
      this.lastName = object && object.lastName || null;
      this.email = object && object.email || null;
      this.subDataId = object && object.subDataId || null;
      this.loginDataId = object && object.loginDataId || null;
      this.createDate = object && object.createDate || null;
      this.updateDate = object && object.updateDate || null;
      this.status = object && object.status || null;
  }
}
