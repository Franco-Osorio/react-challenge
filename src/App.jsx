import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./services/candidateService";
import { getJobs } from "./services/jobServices";
import JobList from "./components/jobList";
import './App.css'

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const candidateData = await getCandidateByEmail();
        const jobsData = await getJobs();

        setCandidate(candidateData);
        setJobs(jobsData);

      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Job Challenge</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {candidate && (
        <><p>Welcome candidate: {candidate.candidateId}</p>
          <JobList jobs={jobs} candidate={candidate} />
        </>)}
    </div>
  );
}

export default App;
