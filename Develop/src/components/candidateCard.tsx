import Candidate from "../interfaces/Candidate.interface";
import { Card, Button } from "react-bootstrap";

interface CandidateCardProps {
  candidate: Candidate;
  onSave: (candidate: Candidate) => void;
  onSkip: () => void;
}

const CandidateCard = ({ candidate, onSave, onSkip }: CandidateCardProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={candidate.avatar} />
      <Card.Body>
        <Card.Title>{candidate.name}</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {candidate.username}
        </Card.Text>
        <Card.Text>
          <strong>Location:</strong> {candidate.location}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {candidate.email}
        </Card.Text>
        <Card.Text>
          <strong>Company:</strong> {candidate.company}
        </Card.Text>
        <Button variant="success" onClick={() => onSave(candidate)}>
          Save
        </Button>
        <Button variant="danger" onClick={onSkip}>
          Skip
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;