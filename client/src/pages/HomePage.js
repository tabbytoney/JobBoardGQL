import JobList from '../components/JobList';
import { getJobs } from '../lib/graphql/queries';
import { useEffect, useState } from 'react';

// getJobs().then((jobs) => console.log(jobs));

function HomePage() {
  const [jobs, setJobs] = useState([]);

  // only run (fetch the data) when component is rendered
  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
