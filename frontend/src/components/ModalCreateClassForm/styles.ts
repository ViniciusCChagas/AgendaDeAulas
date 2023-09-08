import styled from 'styled-components';

export const Container = styled.div`
	.react-modal-content {
		width: auto;
	}
`;

export const ModalForm = styled.form`
	background: var(--background);

	border-radius: 0.3rem;
	margin: 20vh auto;

	width: 90%;
	max-width: 25rem;

	flex: 1;

	header {
    position: relative;
		background: var(--black);
		color: var(--yellow);

		padding: 0.8rem 1rem;
		border-radius: 0.3rem 0.3rem 0 0;

		h2 {
			font-size: 1.5rem;
			text-align: center;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1.75rem 0;
	}

	footer {
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1.75rem;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	input {
		margin-right: 0.5rem;
	}
`;
