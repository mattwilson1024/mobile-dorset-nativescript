import * as moment from 'moment';

export default class Event {
    id: string;
    date: string;
    talks: any;

    constructor(json) {
        (<any>Object).assign(this, json);
    }

    get dateFormatted(): string {
        return moment(this.date).format('ddd Do MMMM YYYY');
    }

    get timeFormatted(): string {
        return moment(this.date).format('LT');
    }
}