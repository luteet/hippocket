import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from "../../components/head/Head"
import Button from "../../components/button/Button"
import PasswordInput from "../../components/form/PasswordInput"
import { usePageContext } from '../../PageContext';

import '../../assets/scss/pages/auth/_main.scss';

export default function Registration() {

	const { setMainClassNames, setIsUser } = usePageContext();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	const { isUser } = usePageContext();
	const navigate = useNavigate();

	useEffect(() => {
		if(isUser) navigate("/");
	},[isUser])

	useEffect(() => {
		setMainClassNames('is-full');
		return () => setMainClassNames('');
	}, [setMainClassNames]);

	function handleOnFocus() {
		setError("");
	}

	const handleRegistration = async (event: any) => {
		event.preventDefault();

		const data = new FormData(event.target);

		// Данные для отправки
		const loginData = {
			email: data.get("email"),
			password: data.get("password"),
			role: "source",
		};

		if(loginData.password !== data.get("confirm-password")) {
			setError("Passwords don't match");
			return false;
		}

		if (loginData.email && loginData.password) {

			setIsLoading(true);
			
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}auth/sign_up/`, {
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
			<Head title="Registration" />
			<section className={`login is-min${isHidden ? " to-hidden" : ""}`}>
				<h1 className="login__title title">
					Sign up for Hippocket
				</h1>
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
				<form className={`login__form is-large${isLoading ? " is-loading" : ""}`} onSubmit={handleRegistration}>
					<div className="login__form-row">
						<label className="login__label form-label">
							<span>First Name</span>
							<input type="text" name="firstname" onFocus={() => handleOnFocus()} placeholder="First Name" required autoComplete="firstname" />
						</label>
						<label className="login__label form-label">
							<span>Last Name</span>
							<input type="text" name="lastname" onFocus={() => handleOnFocus()} placeholder="Last Name" required autoComplete="lastname" />
						</label>
						<label className="login__label form-label">
							<span>Email</span>
							<input type="email" name="email" onFocus={() => handleOnFocus()} placeholder="Email" required autoComplete="email" />
						</label>
						<label className="login__label form-label">
							<span>Phone Number</span>
							<input type="tel" name="phone" onFocus={() => handleOnFocus()} placeholder="Phone Number" required autoComplete="phone" />
						</label>
						<PasswordInput
							name="password"
							label="Password"
							onFocus={() => handleOnFocus()}
						/>
						<PasswordInput
							name="confirm-password"
							label="Confirm Password"
							onFocus={() => handleOnFocus()}
						/>
					</div>
					<div className="login__footer">
						<Button className="login__submit" type="submit">
							Sign Up
						</Button>
						<p>
							<b>Already have an account? <Link to="/">sign in!</Link></b>
						</p>
						<p>
							By creating an account, you agree to our Terms and have read and acknowledge the Global Privacy Statement.
						</p>
						<p>
							You also agree to receive text messages and other forms or communications from HipPocket.
						</p>
					</div>
				</form>
				<div className={`login__error${error ? " is-active" : ""}`}>{error}</div>
			</section>
		</>
	);
}
