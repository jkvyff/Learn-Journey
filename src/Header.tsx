import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    const [isOpen, setIsOpen] = useState(false);

    // let body: any = null;

    // if (loading) {
    //     body = null
    // } else if (data && data.me) {
    //     body = <div>You are logged in as: {data.me.email}</div>
    // } else {
    //     body = <div>You are not logged in</div>
    // }
    const handleToggle = (ev: any) => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="nav">
            <div className="nav-link first">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </div>
            <div className="nav-link">
                <NavLink exact to="/discover" activeClassName="active">Discover</NavLink>
            </div>
            <div className="nav-link">
                <form>
                    <input className="search"
                    type="text"
                    placeholder="Can't search yet..."/>
                </form>
            </div>
            <div className="relative nav-link py-3 px-4 float-right last">
                <button onClick={handleToggle} className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                    <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="Your avatar"/>
                </button>
                {isOpen && <>
                <button onClick={handleToggle} className="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Account</a>
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign out</a>
                </div>
                </>}
            </div>
            <div className="nav-link right">
                <NavLink to="/helloLock" activeClassName="active">Hello {data && data.me && data.me.username}</NavLink>
            </div>
            <div className="nav-link right">
                <NavLink to="/login" activeClassName="active">Login</NavLink>
            </div>
            <div>
                {!loading && data && data.me ? (
                    <button onClick={async () => {
                        await logout();
                        setAccessToken("");
                        await client!.resetStore();
                    }}>logout</button>
                ) : null}
            </div>
            {/* {body} */}
        </header>
    );
}