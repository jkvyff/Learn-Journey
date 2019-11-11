import * as React from 'react'
import { useState } from 'react';

interface Props { }

export const Login: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (ev: any) => setEmail(ev.target.value);
    const handlePassword = (ev: any) => setPassword(ev.target.value);
    const handleSubmit = (ev: any) => {
        ev.preventDefault()
        console.log('form submit')
        console.log(email, password)
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