import Candidate from "../interfaces/Candidate.interface";

interface CandidateCardProps {
  candidate: Candidate;
}

const List = ({ candidate }: CandidateCardProps) => {
  return (
    <div>
      <h1>{candidate.name}</h1>
      <h2>{candidate.username}</h2>
      <h3>{candidate.location}</h3>
      <h4>{candidate.email}</h4>
      <h5>{candidate.company}</h5>
      <h6>{candidate.bio}</h6>
    </div>
  );
};

export default List;

