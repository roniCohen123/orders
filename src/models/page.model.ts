import {Properties as Prop} from "../shared/properties";
import {AbstractJsonModel} from "./abstract-json.model";

export class PageModel extends AbstractJsonModel {
    constructor(private _pageNumber: number) {
        super();
    }

    public toJson(): string {
        return `{"page":${this._pageNumber}}`;
    }

    public fromJson(json: any): void {
        // Does nothing
    }


    get pageNumber(): number {
        return this._pageNumber;
    }

    set pageNumber(value: number) {
        this._pageNumber = value;
    }
}

