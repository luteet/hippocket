import Select, { Props as SelectProps, GroupBase } from 'react-select';

interface CustomSelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>
	extends SelectProps<Option, IsMulti, Group> {
}

export default function CustomSelect<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
>(props: CustomSelectProps<Option, IsMulti, Group>) {
	return (
		<Select
			{...props}
			className="react-select-container"
  			classNamePrefix="react-select"
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					borderRadius: 25,
					padding: "0.5125rem",
					borderColor: '#ccc',
					outline: "none",
					boxShadow: "none",
					backgroundColor: "#fff",
					cursor: "pointer",
					":hover": {
						borderColor: '#ccc',
					}
				}),
				menu: ( styles ) => {
					return {
						...styles,
						top: "50%",
						padding: "1.25rem",
						boxShadow: "none",
						borderRadius: "1.5625rem",
						background: "#FBFAFA",
						//zIndex: -1
					};
				},
				option: (styles, { data, isDisabled, isFocused, isSelected }) => {
					return {
						...styles,
						padding: "0.3125rem 0",
						cursor: "pointer",
						backgroundColor: "transparent",
						borderBottom: (isFocused || isSelected) ? "1px solid #ccc" : "1px solid transparent",
						color: isSelected ? "#111111" : "#111111",
						":active": {
							backgroundColor: "transparent",
						}
					};
				},

			}}
		/>
	);
}