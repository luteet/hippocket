import React, { createContext, useContext, useEffect, useState } from 'react';
//import { useLocation } from 'react-router-dom';

const PageContext = createContext<{
	mainClassNames: string;
	setMainClassNames: (page: string) => void;
	isUser: boolean;
	setIsUser: (user: boolean) => void;
	isPageLoading: boolean;
	setIsPageLoading: (user: boolean) => void;
	slimNavMode: boolean;
	setSlimNavMode: (user: boolean) => void;
	pageTitle: string;
	setPageTitle: (user: string) => void;
	currentPage: string;
	setCurrentPage: (user: string) => void;
} | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const [mainClassNames, setMainClassNames] = useState<string>('');
	const [isUser, setIsUser] = useState<boolean>(false);
	const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
	const [slimNavMode, setSlimNavMode] = useState<boolean>(localStorage.getItem("hippocket-slim-nav") ? true : false);
	const [pageTitle, setPageTitle] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);

	function checkUser() {
		if(localStorage.getItem("hippocket-access_token") && localStorage.getItem("hippocket-refresh_token") && localStorage.getItem("hippocket-user")) {
			return true;
		} else {
			return false;
		}
	}

	useEffect(() => {
		if(checkUser()) setIsUser(true);
		setIsPageLoading(false);
	})

	return (
		<PageContext.Provider value={{ 
			mainClassNames, setMainClassNames, 
			isUser, setIsUser, 
			isPageLoading, setIsPageLoading,
			slimNavMode, setSlimNavMode,
			pageTitle, setPageTitle,
			currentPage, setCurrentPage
		}}>
			{children}
		</PageContext.Provider>
	);
};

export const usePageContext = () => {
	const context = useContext(PageContext);
	if (!context) {
		throw new Error('usePageContext must be used within a PageProvider');
	}
	return context;
};