import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./services/candidateService";
import './App.css'

function App() {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByEmail();
        setCandidate(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCandidate();
  }, []);

  return (
    <div>
      <h1>Job Challenge</h1>
      {candidate && <p>Welcome candidate: {candidate.candidateId}</p>}
    </div>
  );
}

export default App;
