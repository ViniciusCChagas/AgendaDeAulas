import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;
	display: flex;

	align-items: center;
	justify-content: space-between;

	background: var(--yellow);
	color: var(--black);

	img {
		flex: 2;
		max-width: 40%;
		margin: auto;
	}

	@media (max-width: 800px) {
		flex-direction: column;

		justify-content: center;

		img {
			max-width: 23rem;
		}

		img,
		form {
			flex: none;
			margin: 2rem auto;
		}
	}
`;

export const Form = styled.form`
	background: var(--background);

	border-radius: 0.3rem;
	margin: 20vh auto;

	width: 90%;
	max-width: 25rem;

	flex: 1;

	header {
		background: var(--black);
		color: var(--yellow);

		padding: 0.8rem 1rem;
		border-radius: 0.3rem 0.3rem 0 0;

		h2 {
			font-size: 2rem;
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
