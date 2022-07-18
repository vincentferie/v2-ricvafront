import {Injectable} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';

export const FILTER_API_DATE_FORMAT = 'YYYYMMDDHHmmss';
export const DISPLAY_DATE_FORMAT = 'MM/DD/YYYY';
export const TABLE_DISPLAY_DATE_FORMAT = 'MM/DD/YYYY h:mm:ssA';

@Injectable()
export class DateUtils {
  constructor() {
    moment.locale('fr');
  }

  static fromJsonDate(jDate: any): string {
    const bDate: Date = new Date(jDate);
    try {
      jDate = bDate.toISOString().substring(0, 10);
    } catch (e) {
    }
    return jDate;
  }
}
