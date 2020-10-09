export interface ICountry {
    name: string,
    topLevelDomain: string[],
    alpha2Code: string,
    alpha3Code: string,
    callingCodes: string[],
    capital:string,
    altSpelling:string,
    region:string,
    subregion:string,
    population:number,
    latlng:number[],
    demonym:string,
    area:number,
    gini:number,
    timezones:string[],
    borders:string[],
    nativeName: string[],
    numericCode: number,
    currencies: ICurrencies,
    flag:string
}

export interface ICurrencies {
    code:string,
    name:string,
    symbol:string
}