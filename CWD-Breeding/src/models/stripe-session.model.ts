interface IStripeSession {
    stripeURl: string;
}

export class StripeSession {
    stripeURl: string;

    constructor();
    constructor(object: IStripeSession);
    constructor(object?: any) {
        this.stripeURl = (object && object.stripeURl) || null;
    }
}
