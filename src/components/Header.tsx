import React from 'react'
import { Link } from 'react-router'

const Header = () => {
    return (
        <header className='flex items-center bg-blue-600 mb-5'>
            <div className="flex justify-around items-center w-full header__inner">
                <p className="logo-text">Todo service</p>
                <nav className="flex gap-2 py-3 nav--list">
                    <Link to={'/'}><li className="list-item">Home</li></Link>
                    <Link to={'/lists'}><li className="list-item">My lists</li></Link>
                </nav>
            </div>

        </header>
    )
}

export default Header





