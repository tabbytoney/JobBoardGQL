export const resolvers = {
  Query: {
    job: () => {
      return {
        id: 'test-id',
        title: 'Test Job',
        description: 'Details of job',
      };
    },
  },
};
