import { Link } from "react-router-dom";
import './Header.css';


const Header = () => {
    return (
        <nav className="link-container">
            <Link to='/'>Home</Link>
            <Link to='/login'>Log in</Link>
            <Link to='/register'>Register</Link>
        </nav>
    );
};

export default Header;