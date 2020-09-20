import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="navbar navbar-dark navbar-expand-lg bg-dark">

            <div className="navbar-brand">
            <Link className="nav-link" to="/">My Contact Book</Link>
            </div>
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <Link className="nav-link" to="/contacts">Контакты </Link>
                </li>
                <li className="navbar-item">
                    <Link className="nav-link" to="/mycontacts">Мои контакты </Link>
                </li>
            </ul>
            
        </div>
    )
}

export default Header; 
