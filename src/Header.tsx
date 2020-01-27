import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (ev: any) => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="flex items-center flex-wrap bg-gray-800">
            <div className="text-gray-200 flex-initial ml-4 px-2 md:ml-32">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </div>
            <div className="text-gray-200 flex-initial px-2">
                <NavLink exact to="/discover" activeClassName="active">Discover</NavLink>
            </div>
            <div className="text-gray-200 flex-1 mx-4 md:mr-12 lg:mr-48">
                <form>
                    <input className="search w-full rounded flex-1 py-1 px-2"
                    type="text"
                    placeholder="Can't search yet..."/>
                </form>
            </div>
            <div className="text-gray-200 flex-initial px-2">
                <NavLink to="/helloLock" activeClassName="active">Hello {data && data.me && data.me.username}</NavLink>
            </div>
            <div className="text-gray-200 flex-initial px-2">
                <NavLink to="/login" activeClassName="active">Login</NavLink>
            </div>
            <div className="px-2 py-3 mr-4 md:mr-32">
                <button onClick={handleToggle} className="z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                    <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="Your avatar"/>
                </button>
                {isOpen && <>
                <button onClick={handleToggle} className="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <Link to="/discover" className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white">Account</Link>
                <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white">Sign out</Link>
                </div>
                </>}
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