import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/queries.js';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  // will error without this bc job is undefined
  if (!company) {
    return <div>Loading...</div>;
  }

  // for use with fake data
  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
    </div>
  );
}

export default CompanyPage;
