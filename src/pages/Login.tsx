import * as React from 'react'
import { useState } from 'react';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
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
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmail} />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePassword} />
            </div>
            <button>Login</button>
        </form>
    );
}