import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PageProvider, usePageContext } from "./PageContext"
import Nav from "./components/nav/Nav"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
//import Profile from "./pages/profile/Profile"
import Login from "./pages/login/Login"
import Loader from "./pages/loader/Loader"
import Profile from "./pages/profile/Profile"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from "./pages/not-found/NotFound"
import './assets/scss/style.scss';
import Registration from './pages/registration/Registration';

// Анимация для плавных переходов
const pageVariants = {
	initial: {
		opacity: 0,
	},
	in: {
		opacity: 1,
	},
	out: {
		opacity: 0,
	},
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.5,
};

const App: React.FC = () => {

	//const location = useLocation();
	//const isLoginPage = location.pathname === '/' || location.pathname === '/registration';

	return (
		<PageProvider>
			<Main />
		</PageProvider>
	);
}

const AnimatedRoutes: React.FC = () => {
	const location = useLocation();
	const { isUser } = usePageContext();
  
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="*" element={<motion.div
					initial="initial"
					animate="in"
					exit="out"
					variants={pageVariants}
					transition={pageTransition}
				>
					<NotFound />
				</motion.div>} />
				<Route path="/" element={<motion.div
					initial="initial"
					animate="in"
					exit="out"
					variants={pageVariants}
					transition={pageTransition}
				>
					{isUser ? <Dashboard /> : <Login />}
				</motion.div>} />
				<Route path="/registration" element={
					<motion.div
					initial="initial"
					animate="in"
					exit="out"
					variants={pageVariants}
					transition={pageTransition}
				>
					<Registration />
				</motion.div>} />
				{isUser && <>
					<Route path="/profile" element={<motion.div
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants}
						transition={pageTransition}
					>
						<Profile />
					</motion.div>} />
				</>}
			</Routes>
		</AnimatePresence>
	);
};

const Main: React.FC = () => {
	const { mainClassNames, isUser, isPageLoading, slimNavMode, pageTitle } = usePageContext();

	useEffect(() => {
		if (isUser) document.body.classList.add("is-logged");
		if (localStorage.getItem("hippocket-slim-nav")) document.body.classList.add("slim-nav-mode"); else document.body.classList.remove("slim-nav-mode");
		setTimeout(() => {
			document.body.classList.add("is-init");
		}, 500)
	}, [isUser, slimNavMode]);

	return (
		<Router>
			{isUser && <Nav />}
			<main className={`main${mainClassNames ? " " + mainClassNames : ""}`}>
				{isUser && <Header title={pageTitle} />}
				<div className="main__inner"><AnimatedRoutes /></div>
				{isUser && <Footer />}
			</main>
		</Router>
	);
};

export default App;
