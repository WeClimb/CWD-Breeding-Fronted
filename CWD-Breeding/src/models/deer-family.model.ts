interface IDeerFamily {
    deer: string;
    levelOneSire: string;
    levelOneDam: string;
    levelTwoSireA: string;
    levelTwoSireB: string;
    levelTwoDamA: string;
    levelTwoDamB: string;
    levelThreeSireA: string;
    levelThreeSireB: string;
    levelThreeSireC: string;
    levelThreeSireD: string;
    levelThreeDamA: string;
    levelThreeDamB: string;
    levelThreeDamC: string;
    levelThreeDamD: string;
  }

  export class DeerFamily{
    deer: string;
    levelOneSire: string;
    levelOneDam: string;
    levelTwoSireA: string;
    levelTwoSireB: string;
    levelTwoDamA: string;
    levelTwoDamB: string;
    levelThreeSireA: string;
    levelThreeSireB: string;
    levelThreeSireC: string;
    levelThreeSireD: string;
    levelThreeDamA: string;
    levelThreeDamB: string;
    levelThreeDamC: string;
    levelThreeDamD: string;

    constructor();
    constructor(object: IDeerFamily);
    constructor(object?: any){
        this.deer = object && object.deer || null;
        this.levelOneSire = object && object.levelOneSire || 'unknown';
        this.levelOneDam = object && object.levelOneDam || 'unknown';
        this.levelTwoSireA = object && object.levelTwoSireA || 'unknown';
        this.levelTwoSireB = object && object.levelTwoSireB || 'unknown';
        this.levelTwoDamA = object && object.levelTwoDamA || 'unknown';
        this.levelTwoDamB = object && object.levelTwoDamB || 'unknown';
        this.levelThreeSireA = object && object.levelThreeSireA || 'unknown';
        this.levelThreeSireB = object && object.levelThreeSireB || 'unknown';
        this.levelThreeSireC = object && object.levelThreeSireC || 'unknown';
        this.levelThreeSireD = object && object.levelThreeSireD || 'unknown';
        this.levelThreeDamA = object && object.levelThreeDamA || 'unknown';
        this.levelThreeDamB = object && object.levelThreeDamB || 'unknown';
        this.levelThreeDamC = object && object.levelThreeDamC || 'unknown';
        this.levelThreeDamD = object && object.levelThreeDamD || 'unknown';

    }
  }
