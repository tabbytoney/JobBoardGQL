import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries.js';
import JobList from '../components/JobList.js';

function CompanyPage() {
  const { companyId } = useParams();
  // const [company, setCompany] = useState();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // getCompany(companyId).then(setCompany);

    // the () is a away to call the function immediately
    // and be able to use async within useEffect
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({ company, loading: false, error: false });
      } catch (error) {
        console.log('error:', JSON.stringify(error, null, 2));
        setState({ company: null, loading: false, error: true });
      }
    })();
  }, [companyId]);

  // will error without this bc job is undefined
  // if (!company) {
  //   return <div>Loading...</div>;
  // }
  console.log('[CompanyPage] state:', state);
  const { company, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className='has-text-danger'>Data unavailable</div>;
  }

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
