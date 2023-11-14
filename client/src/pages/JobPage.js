import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { useEffect, useState } from 'react';
import { getJob } from '../lib/graphql/queries';

function JobPage() {
  // get jobId from Url
  const { jobId } = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    getJob(jobId).then(setJob);
  }, [jobId]);

  // will error without this bc job is undefined
  if (!job) {
    return <div>Loading </div>;
  }

  // when using fake data:
  // const job = jobs.find((job) => job.id === jobId);
  return (
    <div>
      <h1 className='title is-2'>{job.title}</h1>
      <h2 className='subtitle is-4'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>
        <div className='block has-text-grey'>
          Posted: {formatDate(job.date, 'long')}
        </div>
        <p className='block'>{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
