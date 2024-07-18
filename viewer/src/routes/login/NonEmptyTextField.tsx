import { createSignal } from "solid-js";
import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "../../components/ui/textfield";

export type NonEmptyTextFieldProps = {
	label: string;
	disabled: boolean;
	type: "password" | "text";
	placeholder: string;
	onChange?: (value: string) => void;
};

export default function NonEmptyTextField(props: NonEmptyTextFieldProps) {
	const [value, setValue] = createSignal("");

	return (
		<TextFieldRoot
			class="w-full text-md"
			validationState={value() === "" ? "invalid" : "valid"}
			onChange={(value) => {
				setValue(value);
				props.onChange?.(value);
			}}
		>
			<TextFieldLabel>{props.label}</TextFieldLabel>
			<TextField
				disabled={props.disabled}
				type={props.type}
				placeholder={props.placeholder}
				required
			></TextField>
		</TextFieldRoot>
	);
}
