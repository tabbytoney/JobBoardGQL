import { useParams } from 'react-router';
import JobList from '../components/JobList.js';
import { useQuery } from '@apollo/client';
import { companyByIdQuery } from '../lib/graphql/queries.js';

function CompanyPage() {
  const { companyId } = useParams();
  // const [company, setCompany] = useState();

  // this runs the getCompanyById query and returns the data
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: companyId },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className='has-text-danger'>Data unavailable</div>;
  }
  const company = data.company;

  // for use with fake data
  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
      <h2 className='title is-5'>Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
