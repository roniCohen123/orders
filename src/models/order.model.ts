import {Properties as Prop} from "../shared/properties";
import {AbstractJsonModel} from "./abstract-json.model";

export class OrderModel extends AbstractJsonModel{
    protected _title: String;
    private _customerId: number;

    constructor(){
        super();
    }

    /**
     * Convert a json property to OrderModel
     */
    public fromJson(json: any): void{
        if (json.customer){
            this.customerId = json.customer.id;
        }

        this.title = json.orderDetails;
    }

    public toJson(): string{
        return `{"customer_id":${this.customerId},"title":"${this.title}"}`
    }

    public get title(): String{
        if (!this._title) return Prop.NULL_STRING_VALUE;

        return this._title;
    }

    public set title(details: String){
        if ((details != null) && (details.length <= Prop.MAX_TITLE_LEN) && (details.length >= Prop.MIN_TITLE_LEN)) {
            this._title = details;
        }
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(customerId: number) {
        if (customerId == undefined) this._customerId = Prop.NULL_NUMBER_VALUE;

        this._customerId = customerId;
    }

    public isValid(): boolean{
        return (!!this._title) && (this.customerId != Prop.NULL_NUMBER_VALUE);
    }
}