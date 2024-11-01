import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from 'react';
import { usePageContext } from '../../PageContext';

interface IHead {
	title: string	
}

const siteName = "Hoppocket";

export default function Head({ title }: IHead) {

	const { setPageTitle } = usePageContext();

	useEffect(() => {
		setPageTitle(title);
	}, [title])

	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
			</Helmet>
		</HelmetProvider>
	)
}
