const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const companies = [
  {
    id: 'company1',
    name: 'Kuzco Industries',
    description: LOREM_IPSUM,
  },
  {
    id: 'company2',
    name: 'Yzma, Inc.',
    description: LOREM_IPSUM,
  },
];

export const jobs = [
  {
    id: 'job1',
    title: 'Dazzler',
    date: '2023-11-21',
    company: companies[0],
    description: 'Tell Kuzco how great he is',
  },
  {
    id: 'job2',
    title: 'Henchperson',
    date: '2023-11-22',
    company: companies[1],
    description: 'Pull the correct lever',
  },
];
