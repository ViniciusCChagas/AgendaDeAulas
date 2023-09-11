import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	max-width: 200px;

	background: var(--white);
	border-radius: 10px;

	padding: 0.5rem 1rem;

	font-size: 0.9rem;

	z-index: 2;

	text-align: center;

	img {
		margin: auto;
	}

	div {
		display: flex;
		flex-direction: row;

		margin-top: 1rem;

		justify-content: space-between;
	}
`;
