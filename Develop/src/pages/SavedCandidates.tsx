import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";

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
            <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} width={50} />
            <h3>{candidate.name}</h3>
            <p>Username: {candidate.username}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              Profile Link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
