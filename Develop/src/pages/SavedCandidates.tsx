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
          <List candidate={candidate} onRemove={(candidate) => {
            const updatedCandidates = savedCandidates.filter((c) => c.id !== candidate.id);
            setSavedCandidates(updatedCandidates);
            localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
          }} />
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
