export interface Trip {
    _id: String, //Internal primary key in MongDB
    code : string,
    name: string,
    length: string;
    start: string,
    resort: string,
    perPerson: string,
    image: string,
    description: string

}