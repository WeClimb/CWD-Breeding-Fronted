interface IRanch {
    id: string;
    name: string;
    ownerFirstName: string;
    ownerLastName: string;
    website: string
    email: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    loginDataId: string;
    createDate: Date;
    updateDate: Date;
    status: string;
  }

  export class Ranch{
    id: string;
    name: string;
    ownerFirstName: string;
    ownerLastName: string;
    website: string
    email: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    loginDataId: string;
    createDate: Date;
    updateDate: Date;
    status: string;


    constructor();
    constructor(object: IRanch);
    constructor(object?: any){
        this.id = object && object.id || null;
        this.name = object && object.name || null;
        this.ownerFirstName = object && object.ownerFirstName || null;
        this.email = object && object.email || null;
        this.loginDataId = object && object.loginDataId || null;
        this.createDate = object && object.createDate || null;
        this.updateDate = object && object.updateDate || null;
        this.status = object && object.status || null;
        this.state = object && object.state || null;
        this.city = object && object.city || null;
        this.ownerLastName = object && object.ownerLastName || null;
        this.zipcode = object && object.zipcode || null;
        this.phoneNumber = object && object.phoneNumber || null;
        this.website = object && object.website || null;
        this.address = object && object.address || null;
    }
  }
