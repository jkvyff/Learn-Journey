import * as React from 'react'
import { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps, NavLink } from 'react-router-dom';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [register] = useRegisterMutation();

	const handleEmail = (ev: any) => setEmail(ev.target.value);
	const handleUsername = (ev: any) => setUsername(ev.target.value);
	const handlePassword = (ev: any) => setPassword(ev.target.value);
	const handleSubmit = async (ev: any) => {
		ev.preventDefault()
		console.log('form submit', email, username, password)
		const response = await register({
			variables: {
				email,
				username,
				password
			}
		})
		console.log(response)
		history.push("/")
	}

	return (
		<div className="min-h-screen mx-auto h-full flex justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
				<div className="mb-4 mt-64">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Username</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
						autoComplete="username"
						type="text"
						value={username}
						placeholder="Username"
						onChange={handleUsername} />
				</div>
				<div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
						autoComplete="email"
						type="email"
						value={email}
						placeholder="Email"
						onChange={handleEmail} />
				</div>
				<div className="mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
						autoComplete="new-password"
						type="password"
						value={password}
						placeholder="Password"
						onChange={handlePassword} />
				</div>
				<div className="text-center">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-3">Register</button>
                    <div>Already have an account? 
                        <NavLink className="text-blue-500" to="/login" activeClassName="active"> Login Here</NavLink>
                    </div>
                </div>
			</form>
        </div>
	);
}