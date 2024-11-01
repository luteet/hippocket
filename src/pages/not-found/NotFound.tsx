import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Head from "../../components/head/Head"
import Button from "../../components/button/Button"
import { usePageContext } from '../../PageContext';
import '../../assets/scss/pages/not-found/_main.scss';

function NotFound() {

	const { setMainClassNames, setIsUser, isUser } = usePageContext();

	useEffect(() => {
		if(!isUser) {
			setMainClassNames('is-full');
			if(document.body.classList.contains("is-hidden")) document.body.classList.remove("is-hidden");
			return () => setMainClassNames('');
		}
	}, [setMainClassNames, isUser]);

	return (
		<>
			<Head title="Page not founded" />
			<section className="not-found">
				<div className="not-found__inner">
					<h1 className="not-found__title main-title">
						404
					</h1>
					<div className="not-found__text">
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, voluptates?
						</p>
					</div>
					<Link to="/" className="not-found__link button">
						Back to Home
					</Link>
				</div>
			</section>
		</>
	);
}

export default NotFound;
