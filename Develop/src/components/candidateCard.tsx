import Candidate from "../interfaces/Candidate.interface";
import { Card, Button } from "react-bootstrap";

interface CandidateCardProps {
  candidate: Candidate;
  onSave: (candidate: Candidate) => void;
  onSkip: () => void;
}

const CandidateCard = ({ candidate, onSave, onSkip }: CandidateCardProps) => {
  return (
    <Card style= {{ backgroundColor: "black", width: "100%", borderRadius: "40px"}}>
      <Card.Img variant="top" src={candidate.avatar} style= {{borderRadius: "40px 40px 0px 0px"}}/>
      <Card.Body>
        <Card.Title>{candidate.name}({candidate.username})</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {candidate.location}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {candidate.email}
        </Card.Text>
        <Card.Text>
          <strong>Company:</strong> {candidate.company}
        </Card.Text>
        <Card.Text>
          <strong>Bio:</strong> {candidate.bio}
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