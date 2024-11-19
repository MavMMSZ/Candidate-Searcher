import Candidate from "../interfaces/Candidate.interface";
import { Card, Button } from "react-bootstrap";

interface CandidateCardProps {
  candidate: Candidate;
  onRemove: (candidate: Candidate) => void;
}

const List = ({ candidate, onRemove }: CandidateCardProps) => {
    return (
        <div>
            <Card style={{display:"flex", justifyContent:"center",flexDirection:"row", flexWrap:"wrap"}}>
                <Card.Body>
                    <Card.Img src={candidate.avatar} />
                    <Card.Text>{candidate.name}({candidate.username})</Card.Text>
                    <Card.Text>{candidate.location}</Card.Text>
                    <Card.Text>{candidate.email}</Card.Text>
                    <Card.Text>{candidate.company}</Card.Text>
                    <Card.Text>{candidate.bio}</Card.Text>
                    <Button style={{color: "black",backgroundColor: "red", borderRadius: "50%",
                    fontWeight: "bold", fontSize: "20px"                
                    }} variant="danger" onClick={() => onRemove(candidate)}>-</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default List