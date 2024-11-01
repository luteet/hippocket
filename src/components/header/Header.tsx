import { Link } from 'react-router-dom';
import { usePageContext } from "../../PageContext"
import '../../assets/scss/components/header.scss';

interface IHeader {
	title: string
}

export default function Header({ title }: IHeader) {

	const { setCurrentPage } = usePageContext();

	return (
		<>
			<header className="header">
				<div className="header__title">
					{title}
				</div>
				<div className="header__controls">
					<Link to="/chat" className="header__chat" aria-label="Chat">
						<svg width="24" height="24">
							<use href="/img/sprites.svg#chat"></use>
						</svg>
					</Link>
					<button type="button" className="header__notifications" aria-label="Notifications" data-number="1">
						<svg width="24" height="24">
							<use href="/img/sprites.svg#notifications"></use>
						</svg>
					</button>
					<Link to="/profile" className="header__user" onClick={() => setCurrentPage("/profile")}>
						<div className="header__user-avatar">
							<img src="/img/profile/profile-avatar.png" width={45} height={45} loading="lazy" alt="" />
						</div>
						<div className="header__user-info">
							<b>Ben Johnson</b>
							<span>agent</span>
						</div>
					</Link>
				</div>
			</header>
		</>
	);
}
