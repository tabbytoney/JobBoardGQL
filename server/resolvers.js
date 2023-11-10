import { getJobs } from './db/jobs.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    date: (job) => toIsoDate(job.createdAt),
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length, 10);
};

// harcoded data was inside the Query > job object
//   return [
//     {
//       id: 'test-id',
//       title: 'Test Job',
//       description: 'Details of job',
//     },
//     {
//       id: 'test-id2',
//       title: 'Test Job2',
//       description: 'Details of job again',
//     },
//   ];
