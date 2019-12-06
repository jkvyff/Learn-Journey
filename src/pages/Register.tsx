import * as React from 'react'
import { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';


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
		<form onSubmit={handleSubmit}>
			<div>
				<input
					value={username}
					placeholder="Username"
					onChange={handleUsername} />
			</div>
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
			<button>Register</button>
		</form>
	);
}