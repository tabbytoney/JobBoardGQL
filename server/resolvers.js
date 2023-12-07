import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  deleteJob,
  updateJob,
} from './db/jobs.js';
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

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      // console.log('user:', user);
      // return null;
      const companyId = 'FjcJCHJALA4i';
      return createJob({ companyId, title, description });
    },
    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      // only allow deleting jobs from the same company as the user - see deleteJob in db/jobs.js
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError('No job found with id ' + id);
      }
      return job;
    },
    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }

      const job = await updateJob({
        id,
        title,
        description,
        companyId: user.companyId,
      });
      if (!job) {
        throw notFoundError('No job found with id ' + id);
      }
      return job;
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

const unauthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
};

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'NOT_FOUND',
    },
  });
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
