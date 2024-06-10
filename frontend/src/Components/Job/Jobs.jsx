import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios.get("http://localhost:4000/api/v1/job/getAllJobs", { withCredentials: true }).then(res => {
        setJobs(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  // Filter jobs based on the search query
  const filteredJobs = jobs.jobs?.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className='jobs page'>
        <div className="container ">
          <h1>All Jobs</h1>
          <input class="form-control"
          style={{"width": "1000px" , "borderRadius": "30px"}}
          
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="banner">
            {filteredJobs && filteredJobs.map(element => (
              <div className="card" key={element._id}>
                <div className="card-header">
                  {element.category}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">{element.country}</p>
                  <Link className="btn btn-primary" to={`/job/${element._id}`}>Job Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
