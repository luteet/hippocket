import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { usePageContext } from "../../PageContext"
import '../../assets/scss/components/nav.scss';

const navLinks = [
	{
		title: "Dashboard",
		icon: "dashboard-icon.png",
		to: "/"
	},
	{
		title: "Contacts",
		icon: "contacts-icon.png",
		to: "/contacts"
	},
	{
		title: "Partners",
		icon: "partners-icon.png",
		to: "/partners"
	},
	{
		title: "Money",
		icon: "money-icon.png",
		to: "/money"
	}
]

function Nav() {

	const { slimNavMode, setSlimNavMode, setIsUser, currentPage, setCurrentPage } = usePageContext();

	function handleLogout() {
		document.body.classList.add("is-hidden");

		setTimeout(() => {
			setIsUser(false);
			document.body.classList.remove("is-logged");
			localStorage.removeItem("hippocket-user");
			localStorage.removeItem("hippocket-accent_token");
			localStorage.removeItem("hippocket-refresh_token");
			<Navigate to="/" />
		},1000)
	}

	return (
		<div className="nav">
			<div className="nav__hero">
				<div className="nav__logo">
					<img src="/img/logo.svg" width={48} height={59} loading="lazy" alt="" />
					<span>
						HipPocket
					</span>
				</div>
				<button className="nav__collapse" type="button" aria-label="Collapse" onClick={() => {
					if(localStorage.getItem("hippocket-slim-nav")) {
						localStorage.removeItem("hippocket-slim-nav");
						setSlimNavMode(false)
					} else {
						localStorage.setItem("hippocket-slim-nav", "true");
						setSlimNavMode(true)
					}
				}}>
					<img src="/img/collapse-icon.svg" width={19} height={19} loading="lazy" alt="" />
				</button>
			</div>
			<ul className="nav__list">
				{navLinks.map((link,index) => (
					<li key={index}>
						<Link to={link.to} aria-label={link.title} className={currentPage === link.to ? "is-current" : ""} onClick={() => setCurrentPage(link.to)}>
							<img src={`/img/nav/${link.icon}`} width={30} height={30} loading="lazy" alt="" />
							<span>
								{link.title}
							</span>
						</Link>
					</li>
				))}
			</ul>
			<div className="nav__footer">
				<button className="nav__logout" type="button" aria-label="Exit" onClick={handleLogout}>
					<svg width="24" height="24">
						<use href="/img/sprites.svg#logout"></use>
					</svg>
					<span>
						Exit
					</span>
				</button>
			</div>
		</div>
	);
}

export default Nav;
