import { ReactNode, ButtonHTMLAttributes } from 'react';
import '../../assets/scss/components/button.scss';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	children?: ReactNode;
}

export default function Button({ className, type = 'button', children, ...customProps }: IButton) {
	return (
		<button type={type} className={className ? `${className} button` : ""} {...customProps}>
			{children}
		</button>
	);
}