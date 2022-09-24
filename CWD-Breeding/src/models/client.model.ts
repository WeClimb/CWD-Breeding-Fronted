interface IClient {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subDataId: string;
    loginDataId: string;
    createDate: Date;
    updateDate: Date;
    status: string;
    ratingAverage: number;
    state: string;
    city: string;
    reviewCount: number;
  }

  export class Client{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subDataId: string;
    loginDataId: string;
    createDate: Date;
    updateDate: Date;
    status: string;
    ratingAverage: number;
    state: string;
    city: string;
    reviewCount: number;


    constructor();
    constructor(object: IClient);
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
        this.ratingAverage = object && object.ratingAverage || null;
        this.state = object && object.state || null;
        this.city = object && object.city || null;
        this.reviewCount = object && object.reviewCount || null;

    }
  }
