import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  deleteJob,
} from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: (_root, { id }) => getJob(id),
    company: (_root, { id }) => getCompany(id),
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }) => {
      // TODO - change once we have auth
      const companyId = 'FjcJCHJALA4i';
      return createJob({ companyId, title, description });
    },
    deleteJob: (_root, { id }) => deleteJob(id),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
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
