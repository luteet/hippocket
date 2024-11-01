import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Head from "../../components/head/Head"
import Button from "../../components/button/Button"
import PasswordInput from "../../components/form/PasswordInput"
//import { Img } from 'react-image';
import { usePageContext } from '../../PageContext';

import '../../assets/scss/pages/auth/_main.scss';

function Login() {

	const { setMainClassNames, setIsUser, isUser } = usePageContext();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		setMainClassNames('is-full');
		if(document.body.classList.contains("is-hidden")) document.body.classList.remove("is-hidden");
		return () => setMainClassNames('');
	}, [setMainClassNames, isUser]);

	function handleOnFocus() {
		setError("");
	}

	const handleLogin = async (event: any) => {
		event.preventDefault();

		const data = new FormData(event.target);

		// Данные для отправки
		const loginData = {
			email: data.get("email"),
			password: data.get("password")
		};

		if (loginData.email && loginData.password) {

			setIsLoading(true);
			
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}auth/sign_in/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(loginData)
				});

				if (response.ok) {
					const data = await response.json();

					localStorage.setItem('hippocket-access_token', data.access_token);
					localStorage.setItem('hippocket-refresh_token', data.refresh_token);
					localStorage.setItem('hippocket-user', data.user.email);

					setError('');

					setTimeout(() => {
						setIsHidden(true);
						document.body.classList.remove("is-init");
						setTimeout(() => setIsUser(true), 500)
					},1500)
				} else {
					setTimeout(() => {
						setError('Invalid username or password');
						setIsLoading(false);
					},1500)
				}
			} catch (error) {
				console.error('Error logging in:', error);
				setError('Something went wrong. Please try again later.');
			}
		} else {
			setError('Please enter username and password');
		}
	};

	return (
		<>
			<Head title="Login" />
			<section className={`login${isHidden ? " to-hidden" : ""}`}>
				<h1 className="login__title title">
					Login
				</h1>
				<div className="login__note">
					Need a Hippocket Account?  <Link to="/registration">Create a Free Account!</Link>
				</div>
				<ul className="login__methods">
					<li>
						<button type="button">
							<img src="/img/login/login-google-icon.svg" alt="Login by Google" width={22} height={22} loading="lazy" />
							<span>
								Google
							</span>
						</button>
					</li>
					<li>
						<button type="button">
							<img src="/img/login/login-facebook-icon.svg" alt="Login by Facebook" width={22} height={22} loading="lazy" />
							<span>
								Facebook
							</span>
						</button>
					</li>
					<li>
						<button type="button">
							<img src="/img/login/login-apple-icon.svg" alt="Login by Apple" width={22} height={22} loading="lazy" />
							<span>
								Apple
							</span>
						</button>
					</li>
				</ul>
				<form className={`login__form${isLoading ? " is-loading" : ""}`} onSubmit={handleLogin}>
					<div className="login__form-col">
						<label className="login__label form-label">
							<span>Email</span>
							<input type="email" name="email" onFocus={() => handleOnFocus()} placeholder="Email" required autoComplete="email" />
						</label>
						<PasswordInput
							name="password"
							label="Password"
							onFocus={() => handleOnFocus()}
						/>
					</div>
					<div className="login__footer">
						<Button className="login__submit" type="submit">
							Login
						</Button>
						<a href="#">Forgot password?</a>
					</div>
				</form>
				<div className={`login__error${error ? " is-active" : ""}`}>{error}</div>
			</section>
		</>
	);
}

export default Login;
