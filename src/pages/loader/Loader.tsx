import React from 'react';
import Head from "../../components/head/Head"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import './assets/scss/style.scss';

function Loader() {
	return (
		<>
			<Head title="Loading" />
			<h1>loading</h1>
		</>
	);
}

export default Loader;
