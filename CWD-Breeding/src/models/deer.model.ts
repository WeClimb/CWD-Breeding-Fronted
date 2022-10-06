import { DeerFamily } from "./deer-family.model";
import { Ranch } from "./ranch.model";

interface IDeer {
    id: string;
    name: string;
    nadr: string;
    dob: Date;
    age: number;
    gebu: string
    codon: string;
    sciScore: number;
    isApproved: boolean;
    semenAvailable: boolean;
    semenCost: string;
    ranchId: string;
    deerFamily: DeerFamily;
    createDate: Date;
    updateDate: Date;
    status: string;
    ranch: Ranch;
  }

  export class Deer{
    id: string;
    name: string;
    nadr: string;
    dob: Date;
    age: number;
    gebu: string
    codon: string;
    sciScore: number;
    isApproved: boolean;
    semenAvailable: boolean;
    semenCost: string;
    ranchId: string;
    deerFamily: DeerFamily;
    createDate: Date;
    updateDate: Date;
    status: string;
    ranch: Ranch;

    constructor();
    constructor(object: IDeer);
    constructor(object?: any){
        this.id = object && object.id || null;
        this.name = object && object.name || null;
        this.nadr = object && object.nadr || null;
        this.dob = object && object.dob || null;
        this.age = object && object.age || null;
        this.createDate = object && object.createDate || null;
        this.updateDate = object && object.updateDate || null;
        this.status = object && object.status || null;
        this.gebu = object && object.gebu || null;
        this.codon = object && object.codon || null;
        this.sciScore = object && object.sciScore || null;
        this.isApproved = object && object.isApproved || null;
        this.semenAvailable = object && object.semenAvailable || null;
        this.semenCost = object && object.semenCost || null;
        this.ranchId = object && object.ranchId || null;
        this.ranch = object && object.ranch || null;
        this.deerFamily = object && object.deerFamily || null;
    }
  }
