import { useState, useEffect, useCallback } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
import CandidateCard from "../components/candidateCard";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformUserToCandidate = async (user: { login: string; id: number; avatar_url: string; html_url: string; }): Promise<Candidate> => {
    const detailedUser = await searchGithubUser(user.login);
    return {
      id: user.id,
      name: detailedUser.name || "Unknown",
      username: user.login,
      location: detailedUser.location || "Unknown",
      avatar: user.avatar_url,
      email: detailedUser.email || "Not Available",
      html_url: user.html_url,
      company: detailedUser.company || "Unknown",
      bio: detailedUser.bio || "No bio provided",
    };
  };

  const fetchCandidates = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const rawUsers = await searchGithub();
      const transformedCandidates = await Promise.all(
        rawUsers.map((user: { login: string; id: number; avatar_url: string; html_url: string; }) => transformUserToCandidate(user))
      );
      setCandidates(transformedCandidates);
    } catch {
      setError("Failed to load candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates] );

  const handleSave = () => {
    if (candidates.length > 0) {
      const [currentCandidate, ...rest] = candidates;
      setPotentialCandidates([...potentialCandidates, currentCandidate]);
      setCandidates(rest);
    }
  };

  const handleSkip = () => {
    if (candidates.length > 0) {
      const [, ...rest] = candidates;
      setCandidates(rest);
    }
  };

  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>{error}</div>;
  if (candidates.length === 0) return <div>No more candidates available!</div>;

  const currentCandidate = candidates[0];

  return (
    <div>
      <h2 style={{fontSize:"60px", display: "flex", justifyContent: "center", margin: "0px"}}>Candidate Search</h2>
      <div>
        <CandidateCard candidate={currentCandidate} onSave={handleSave} onSkip={handleSkip} />
      </div>
    </div>
  );
};

export default CandidateSearch;
