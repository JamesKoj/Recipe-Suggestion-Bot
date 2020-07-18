import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
        <nav>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>How it works?</Link></li>
                </ul>
            </div>
            
        </nav>
)


export default Header;