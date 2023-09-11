import styled from 'styled-components';

interface InputGroupProps {
	$haserror: string;
	$ischeckbox: string;
}

export const InputGroup = styled.div<InputGroupProps>`
	${(props) =>
		props.$haserror === 'true' &&
		`
		label {
			color: var(--danger);
		}

		input {
			border-color: var(--danger);
		}
	`}

	display: flex;

	${(props) =>
		props.$ischeckbox === 'true'
			? `
		flex-direction: row-reverse;
		align-items: center;
    justify-content: left;

		label {
			margin-left: 0.5rem;
		}
		input {
			min-height: unset !important;
			height: 1rem !important;
		}
	`
			: `flex-direction: column;`}

	margin-top: 1rem;
`;

export const InputErrorMessage = styled.span`
	display: block;

	color: var(--danger);
	font-size: 0.875rem;
`;
