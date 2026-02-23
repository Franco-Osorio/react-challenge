import { useState } from "react";

const JobList = ({ jobs, candidate }) => {
  const [repoUrls, setRepoUrls] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Store repo URLs per jobId to handle multiple inputs independently
  const handleChange = (jobId, value) => {
    setRepoUrls({
      ...repoUrls,
      [jobId]: value,
    });
  };

  const handleSubmit = async (jobId) => {
    try {
      setIsSubmitting(jobId);
      setSubmitError(null);

      const body = {
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrls[jobId],
      };

      if (!repoUrls[jobId]) {
        setSubmitError("Please enter a repository URL");
        return;
      }

      // Note: applicationId is required by the API even though it was not specified in the original challenge instructions.
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/candidate/apply-to-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply");
      }

      alert("Application sent successfully!");

    } catch (err) {
      setSubmitError("Application failed");
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <input
            type="url"
            placeholder="https://github.com/your-username/your-repo"
            onChange={(e) => handleChange(job.id, e.target.value)} />

          {submitError && <p style={{ color: "red" }}>{submitError}</p>}

          <button
            onClick={() => handleSubmit(job.id)}
            disabled={isSubmitting === job.id}>
            {isSubmitting === job.id ? "Submitting..." : "Submit"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;