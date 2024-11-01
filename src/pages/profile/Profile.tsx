import { useState, useEffect } from 'react';
import Head from "../../components/head/Head"
import { useLocation } from 'react-router-dom';
import { usePageContext } from '../../PageContext';
//import './assets/scss/style.scss';

function Profile() {

	return (
		<>
			<Head title="Profile" />
			<section className="profile">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni dolor facilis ex. Veritatis aliquam illum eius labore. Ipsa illo in itaque cum, repellendus soluta! Illo tenetur impedit doloremque earum? Dolores.
			</section>
		</>
	);
}

export default Profile;
