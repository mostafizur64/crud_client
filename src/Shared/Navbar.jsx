
import Container from "./Container";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container>
      <div className="bg-[#0b9bab] text-5xl p-4 uppercase -tracking-tighter rounded-md flex items-center justify-between">
        <Link to="/">Crud</Link>
        <span>///</span>
      </div>
    </Container>
  );
};

export default Navbar;
