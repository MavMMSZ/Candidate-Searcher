import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";
import List from "../components/list";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("potentialCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <div>No candidates have been accepted!</div>;
  }

  return (
    <div>
      <h2>Saved Candidates</h2>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <List candidate={candidate} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
