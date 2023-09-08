import styled from 'styled-components';

export const Button = styled.button`
	svg {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
`;