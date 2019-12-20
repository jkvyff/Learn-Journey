import * as React from 'react'
import { useState } from 'react';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { setAccessToken } from '../accessToken';


export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    const handleEmail = (ev: any) => setEmail(ev.target.value);
    const handlePassword = (ev: any) => setPassword(ev.target.value);
    const handleSubmit = async (ev: any) => {
        ev.preventDefault()
        console.log('form submit', email, password)
        const response = await login({
            variables: {
                email,
                password
            },
            update: (store, { data }) => {
                if (!data) {
                    return null;
                }
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: "Query",
                        me: data.login.user
                    }
                });
            }
        })
        console.log(response)

        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
        }

        history.push("/")
    }


    return (
        <div className="min-h-screen mx-auto h-full flex justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4 my-64">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                        aria-label="Email"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleEmail} />
                </div>
                <div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
                        aria-label="Password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={handlePassword} />
                </div>
                <div className="text-center">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">Login</button>
                    <div>Dont have an account? 
                        <NavLink className="text-blue-500" to="/register" activeClassName="active"> Register Here</NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
}