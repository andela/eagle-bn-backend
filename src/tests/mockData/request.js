import moment from 'moment';
import 'moment-timezone';

const now = moment().toDate();
now.setDate(now.getDate() + 1);

export default [
  {
    country: 'RW',
    city: 'Kigali',
    returnTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 11:59 pm`,
    timeZone: 'africa/kigali',
    trips: [
      {
        country: 'KE',
        city: 'Nairobi',
        departureTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 10:30 am`,
        reason: 'no reason for this',
      },
      {
        country: 'UG',
        city: 'kampala',
        departureTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 11:30 am`,
        reason: 'no reason for this',
      }
    ]
  },
  {
    country: 'R',
    city: 'Kigali-ngali',
    returnTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 10:30 am`,
    timeZone: 'africa/kigali',
    trips: [
      {
        country: 'UG',
        city: 'ntral',
        departureTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 10:30 am`,
        reason: 'no reason for this',
      }
    ]
  },
  {
    country: 'RW',
    city: 'Kigali-ngali',
    timeZone: 'kgl',
    trips: [
      {
        country: 'ZW',
        city: 'Nairobi',
        departureTime: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} 10:30 am`,
        reason: 'no reason for this',
      }
    ]
  }
];
