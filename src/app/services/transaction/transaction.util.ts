import moment from 'moment';

export const genMemo = (id: string): string => {
    const day = moment().format('d');
    const month = moment().format('MM');
    const year = moment().format('yyyy');

    return `TNBG_${id}_${day}_${month}_${year}`;
};
