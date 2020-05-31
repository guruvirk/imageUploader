import { SafeUrl } from '@angular/platform-browser';

export class Box {
    id: string;
    img: SafeUrl;
    inputId: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.inputId = obj.inputId;
        this.img = obj.img;
    }
}
