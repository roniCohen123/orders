export class EncodeService{

    /**
     * Get a key-value object and return a string contains the keys with encoded values
     *
     */
    public static getURLEncodedString(params: any): string{
        let queryParams = '';

        for (let key in params) {
            let value = params[key];

            if (queryParams.length > 0) {
                queryParams += '&';
            }

            queryParams += key + '=' + encodeURIComponent(value);
        }

        return queryParams;
    }
}