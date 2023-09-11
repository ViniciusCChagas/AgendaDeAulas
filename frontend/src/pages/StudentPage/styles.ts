import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;

	flex-direction: column;

	min-width: 95%;
	min-height: 100vh;

	background: var(--yellow);

	header {
		display: flex;
		align-items: center;
		justify-content: center;

		button {
			margin: 2rem 1rem;
		}
	}

	& > h1 {
		margin: 2rem 1rem 0 1rem;

		color: var(--dark-text);
	}

	& > h3 {
		margin: 2rem 1rem;
		color: var(--dark-text);
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 90%;
	height: 60%;
	max-width: 90vw;

	padding: 2rem;

	border-radius: 0.5rem;

	background: var(--background);
	color: var(--dark-text);

	main {
		height: 70vh;
	}
`;
