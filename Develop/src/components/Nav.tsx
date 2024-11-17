import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav" style={{wordSpacing: "1px", justifyContent:"space-evenly", width: "20%" }}>
      <Link to="/">Search Candidates</Link>
      <Link to="/SavedCandidates">Saved Candidates</Link>
    </div>
  )
};

export default Nav;