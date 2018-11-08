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

    public nextPage(): void{
        this.page++;
    }

    get page(): number {
        return this._pageNumber;
    }

    set page(value: number) {
        this._pageNumber = value;
    }
}

