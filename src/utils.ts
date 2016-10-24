interface String {
    contains: (str: string, caseInsensitive?: boolean) => boolean;
}

module Utils {
    if (typeof String.prototype.contains !== 'function') {
        String.prototype.contains = function (str: string, caseInsensitive?: boolean): boolean {
            if (caseInsensitive === undefined)
                caseInsensitive = false;

            if (caseInsensitive)
                return this.toUpperCase().indexOf(str.toUpperCase()) != -1;
            else
                return this.indexOf(str) != -1;
        };
    }
}
