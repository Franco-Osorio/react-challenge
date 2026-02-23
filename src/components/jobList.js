import { useState } from "react";

const JobList = ({ jobs, candidate }) => {
  const [repoUrls, setRepoUrls] = useState({});

  // Store repo URLs per jobId to handle multiple inputs independently
  const handleChange = (jobId, value) => {
    setRepoUrls({
      ...repoUrls,
      [jobId]: value,
    });
  };

  const handleSubmit = async (jobId) => {
    const body = {
      uuid: candidate.uuid,
      jobId,
      candidateId: candidate.candidateId,
      repoUrl: repoUrls[jobId],
    };

    // Note: applicationId is required by the API even though it was not specified in the original challenge instructions.
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/candidate/apply-to-job`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    alert("Application submitted!");
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <input
            type="url"
            placeholder="https://github.com/your-username/your-repo"
            onChange={(e) => handleChange(job.id, e.target.value)}
          />
          <button onClick={() => handleSubmit(job.id)}>
            Submit
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;