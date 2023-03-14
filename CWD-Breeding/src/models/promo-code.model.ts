export class PromoCode {
    public id: string;
    public createDate: Date;
    public updateDate: Date;
    public code: string;
    public percentageOff: number;
    public uses: number;

    constructor(id: string, createDate: Date, updateDate: Date, code: string, percentageOff: number, uses: number) {
        this.id = id;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.code = code;
        this.percentageOff = percentageOff;
        this.uses = uses;
    }
}