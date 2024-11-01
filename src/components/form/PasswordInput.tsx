import { useState } from 'react';
//import '../../assets/scss/components/button.scss'

interface IInput {
	name: string,
	autocomplete?: string,
	className?: string,
	label?: string,
	placeholder?: string,
	onFocus?: () => void
}

export default function PasswordInput({ name, autocomplete, label, placeholder, className, onFocus } : IInput) {

	const [isVisible, setIsVisible] = useState<boolean | null>(false);

	return (
		<label className={`${className ? className + " " : ""}form-label${isVisible ? " is-visible" : ""}`}>
			{label && <span>{label}</span>}
			<input type={isVisible ? "text" : "password"} name={name} 
			placeholder={placeholder ? placeholder : label ? label : ""} 
			required 
			autoComplete={autocomplete || "password"} 
			onFocus={onFocus ? () => onFocus() : undefined}
			/>
			<button type="button" onClick={() => setIsVisible(!isVisible)}>
				<svg width="24" height="24">
					<use href={`/img/sprites.svg#password-${isVisible ? "hidden" : "view"}`}></use>
				</svg>
			</button>
		</label>
	)
}
