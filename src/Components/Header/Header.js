import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';
const Header = () => {
    const [loggedInUser] = useContext(userContext);
    return (

        <div className="header">
             <h1>Dragon Rider</h1>
             <div className="navigation">
                <ul>
                   <li>
                       <Link to='/home'>Home</Link>
                   </li>
                   <li>
                       <Link to='/destination'>Destination</Link>
                   </li>
                   <li>
                       <Link to='/about'>About</Link>
                   </li>
                   <li>
                       <Link to='/contact'>Contact</Link>
                   </li>
                   <li>
                       <Link to='/login'>Login</Link>
                   </li>
                    {
                      loggedInUser.name
                    }
                </ul>
             </div>
        </div>
    );
};

export default Header;