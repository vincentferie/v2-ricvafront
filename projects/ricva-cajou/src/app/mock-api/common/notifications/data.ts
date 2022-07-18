/* eslint-disable */
import * as moment from 'moment';

export const notifications = [
  {
    id: '493190c9-5b61-4912-afe5-78c21f1044d7',
    icon: 'heroicons_solid:star',
    title: 'Daily challenges',
    description: 'Your submission has been accepted',
    time: moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
    read: false,
  },
  {
    id: '6e3e97e5-effc-4fb7-b730-52a151f0b641',
    image: 'assets/images/avatars/male-04.jpg',
    description:
      '<strong>Leo Gill</strong> added you to <em>Top Secret Project</em> group and assigned you as a <em>Project Manager</em>',
    time: moment().subtract(50, 'minutes').toISOString(), // 50 minutes ago
    read: true,
    link: '/dashboards/project',
    useRouter: true,
  },
];
