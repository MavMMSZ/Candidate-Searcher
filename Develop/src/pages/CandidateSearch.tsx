import React, { useEffect, useState } from "react";
import { searchGithub } from "../api/API";

type Candidate = {
  id: string;
  name: string;
  username: string;
  location: string;
  email: string;
  company: string;
  avatar: string;
  html_url: string;
};

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates from the API
  const fetchCandidates = async () => {
    try {
      setError(null);
      setLoading(true);
      const fetchedCandidates = await searchGithub(); // Assume this fetches an array of Candidate
      setCandidates(fetchedCandidates);
    } catch (err) {
      setError("Failed to load candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load candidates on component mount
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Save current candidate to potential candidates
  const handleSave = () => {
    if (candidates.length > 0) {
      const [currentCandidate, ...rest] = candidates;
      setPotentialCandidates([...potentialCandidates, currentCandidate]);
      setCandidates(rest);
    }
  };

  // Skip current candidate
  const handleSkip = () => {
    if (candidates.length > 0) {
      const [, ...rest] = candidates; // Remove the first candidate
      setCandidates(rest);
    }
  };

  // Persist potential candidates to localStorage
  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  // Handle loading, error, and no more candidates cases
  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>{error}</div>;
  if (candidates.length === 0) return <div>No more candidates available!</div>;

  const currentCandidate = candidates[0];

  return (
    <div>
      <h2>Candidate Review</h2>
      <div>
        <img src={currentCandidate.avatar} alt={`${currentCandidate.name}'s avatar`} />
        <h3>{currentCandidate.name}</h3>
        <p>Username: {currentCandidate.username}</p>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          Profile Link
        </a>
      </div>
      <button onClick={handleSave}>+</button>
      <button onClick={handleSkip}>-</button>
    </div>
  );
};

export default CandidateSearch;