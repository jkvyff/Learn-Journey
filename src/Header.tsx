import * as React from 'react'
import { NavLink } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {

}

export const Header: React.FC<Props> = () => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();

    let body: any = null;

    if (loading) {
        body = null
    } else if (data && data.me) {
        body = <div>You are logged in as: {data.me.email}</div>
    } else {
        body = <div>You are not logged in</div>
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
                    placeholder="Can't searching yet..."/>
                </form>
            </div>
            <div className="nav-link right last">
                <NavLink to="/helloLock" activeClassName="active">Hello Lock</NavLink>
            </div>
            <div className="nav-link right">
                <NavLink to="/register" activeClassName="active">Register</NavLink>
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
        </header>
    );
}