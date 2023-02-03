interface IDeerImage {
    file: File;
    ageOfDeerImaged: number;
    mediaType: string;
  }

  export class DeerImage{
    file: File;
    ageOfDeerImaged: number;
    mediaType: string;

    constructor();
    constructor(object: IDeerImage);
    constructor(object?: any){
        this.file = object && object.file || null;
        this.ageOfDeerImaged = object && object.ageOfDeerImaged || 0;
        this.mediaType = object && object.mediaType || null;
    }
  }
