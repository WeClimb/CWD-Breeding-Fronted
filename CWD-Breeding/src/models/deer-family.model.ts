interface IDeerFamily {
    deer: string;
    LevelOneSire: string;
    LevelOneDam: string;
    LevelTwoSireA: string;
    LevelTwoSireB: string;
    LevelTwoDamA: string;
    LevelTwoDamB: string;
    LevelThreeSireA: string;
    LevelThreeSireB: string;
    LevelThreeSireC: string;
    LevelThreeSireD: string;
    LevelThreeDamA: string;
    LevelThreeDamB: string;
    LevelThreeDamC: string;
    LevelThreeDamD: string;
  }

  export class DeerFamily{
    deer: string;
    LevelOneSire: string;
    LevelOneDam: string;
    LevelTwoSireA: string;
    LevelTwoSireB: string;
    LevelTwoDamA: string;
    LevelTwoDamB: string;
    LevelThreeSireA: string;
    LevelThreeSireB: string;
    LevelThreeSireC: string;
    LevelThreeSireD: string;
    LevelThreeDamA: string;
    LevelThreeDamB: string;
    LevelThreeDamC: string;
    LevelThreeDamD: string;

    constructor();
    constructor(object: IDeerFamily);
    constructor(object?: any){
        this.deer = object && object.deer || null;
        this.LevelOneSire = object && object.LevelOneSire || 'unknown';
        this.LevelOneDam = object && object.LevelOneDam || 'unknown';
        this.LevelTwoSireA = object && object.LevelTwoSireA || 'unknown';
        this.LevelTwoSireB = object && object.LevelTwoSireB || 'unknown';
        this.LevelTwoDamA = object && object.LevelTwoDamA || 'unknown';
        this.LevelTwoDamB = object && object.LevelTwoDamB || 'unknown';
        this.LevelThreeSireA = object && object.LevelThreeSireA || 'unknown';
        this.LevelThreeSireB = object && object.LevelThreeSireB || 'unknown';
        this.LevelThreeSireC = object && object.LevelThreeSireC || 'unknown';
        this.LevelThreeSireD = object && object.LevelThreeSireD || 'unknown';
        this.LevelThreeDamA = object && object.LevelThreeDamA || 'unknown';
        this.LevelThreeDamB = object && object.LevelThreeDamB || 'unknown';
        this.LevelThreeDamC = object && object.LevelThreeDamC || 'unknown';
        this.LevelThreeDamD = object && object.LevelThreeDamD || 'unknown';

    }
  }
