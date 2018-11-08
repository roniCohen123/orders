import {AbstractJsonModel} from "./abstract-json.model";

/**
 * A page model which can be converted to/from json
 *
 */
export class PageModel extends AbstractJsonModel {
    constructor(private _pageNumber: number) {
        super();
    }

    public toJson(): string {
        return `{"page":${this._pageNumber}}`;
    }

    public fromJson(json: any): void {
        this.page = json.page;
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

