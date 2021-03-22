import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm mc">
            <Link 
                className="navbar-brand" 
                to="/"
            >
                    <img src="/assets/images/logo-mercado-libre.png" className="logo" alt="mercadolibre" />
            </Link>
        </nav>
    )
}