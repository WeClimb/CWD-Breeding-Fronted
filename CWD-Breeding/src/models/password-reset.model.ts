interface IPasswordReset {
    changePasswordId: string;
    password: string;
  }

  export class PasswordReset{
    changePasswordId: string;
    password: string;

    constructor();
    constructor(object: IPasswordReset);
    constructor(object?: any){
        this.changePasswordId = object && object.changePasswordId || null;
        this.password = object && object.firstName || null;
    }
  }
