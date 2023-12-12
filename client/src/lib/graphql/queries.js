import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { getAccessToken } from '../auth';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { Authorization: `Bearer ${accessToken}` };
//     }
//     return {};
//   },
// });

// Apollo Client links are chainable (links between GQL operations and GQL server), so we can add a link to the chain that
// adds the Authorization header to every request

const authLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

// forwards to the next link in the chain
const customLink = new ApolloLink((operation, forward) => {
  // console.log('[authLink] operation:', operation);
  const accessToken = getAccessToken();
  if (accessToken) {
    // context is an object that is passed to every link in the chain
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  // the order of the links is important - the first link in the chain is the first one to be called
  link: concat(customLink, authLink),
  cache: new InMemoryCache(),
  // use the below if we want data to update automatically when we create a new job
  // watch query is what React hooks use
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only',
  //   },
  //   watchQuery: {
  //     fetchPolicy: 'network-only',
  //   },
  // },
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

const companyDetailFragment = gql`
  fragment CompanyDetail on Company {
    id
    name
    description
    jobs {
      id
      date
      title
    }
  }
`;

const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const companyByIdQuery = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      ...CompanyDetail
    }
  }
  ${companyDetailFragment}
`;

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;
  // const { job } = await client.request(mutation, {
  //   input: { title, description },
  // });
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return data.job;
};

export const getJob = async (id) => {
  const { data } = await apolloClient.query({
    query: jobByIdQuery,
    variables: { id },
  });
  return data.job;
};

export const getJobs = async () => {
  const query = gql`
    query Jobs {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: 'network-only',
  });
  return data.jobs;
};

// export const getCompany = async (id) => {
//   const { data } = await apolloClient.query({
//     query: companyByIdQuery,
//     variables: { id },
//   });
//   return data.company;
// };
