/**
 * Inserts parameters to given url
 * @param url
 * @param params
 *
 * @return string | false
 */
export const insertParamsToUrl: ( url: string, params: Record<string, string | number> ) => string | false =
    ( url: string, params: Record<string, string | number> ): string | false => {
    try {
        const urlObj: URL = new URL(url);

        for( const key in params ) {
            urlObj.searchParams.append( key, params[key].toString() );
        }

        return urlObj.href;
    } catch (e) {
        return false;
    }
};