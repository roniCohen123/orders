/**
 * Abstract class which represent a model that can be converted to json
 *
 */
export abstract class AbstractJsonModel{
    protected constructor(){}

    /**
     * Return a json string representing the model
     */
    public abstract toJson(): string;

    /**
     * Set the model fields from json object
     */
    public abstract fromJson(json: any): void;
}