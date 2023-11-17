import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`Job not found with id ${id}`);
      }
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError(`Company not found with id ${id}`);
      }
      return company;
    },
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
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
