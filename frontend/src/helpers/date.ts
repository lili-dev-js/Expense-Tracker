import { format } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm';

export const showDate = (date?: string) => (date ? format(date, DATE_FORMAT) : '-');
