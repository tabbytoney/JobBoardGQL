import { getJobs } from './db/jobs.js';

export const resolvers = {
  Query: {
    jobs: () => {
      return getJobs();

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
    },
  },
};
