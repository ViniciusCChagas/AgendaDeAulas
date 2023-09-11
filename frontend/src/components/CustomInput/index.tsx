import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { InputErrorMessage, InputGroup } from './styles';

interface CustomInputProps {
	type: string;
	name: string;
	label: string;
	value?: any;

	validationConfig: RegisterOptions;
	errorMessage?: string;

	register: UseFormRegister<any>;
}

function CustomInput({
	type,
	name,
	label,
	errorMessage,
	validationConfig,
	value,
	register,
}: CustomInputProps) {
	const inputProps = register(name, { ...validationConfig });

	const hasError = !!errorMessage;

	return (
		<InputGroup
			$haserror={hasError ? 'true' : 'false'}
			$ischeckbox={type === 'checkbox' ? 'true' : 'false'}
			style={{display: type === 'hidden' ? 'none' : 'flex'}}
		>
			<label htmlFor={name}>{label}</label>
			<input type={type} {...inputProps} id={name} value={value} />
			{errorMessage && <InputErrorMessage>*{errorMessage}</InputErrorMessage>}
		</InputGroup>
	);
}

export { CustomInput };
