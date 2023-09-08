import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	min-width: 95%;
	min-height: 100vh;

	background: var(--yellow);
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 80%;
	height: 60%;
	max-width: 90vw;

	padding: 3rem 2rem;

	background: var(--background);
	color: var(--dark-text);

	main {
    height: 70vh;
	}
`;
