import { createGlobalStyle } from 'styled-components';
import { device } from './breakpoints';

export const GlobalStyle = createGlobalStyle`

  :root {
    --black: #000000;
    --yellow: #FABB18;

    --white: #ffffff;
    --light-white: #f5f5f5;
    --background: #F0F2F5;

    --text: #000000;
    --light-text: #969CB2;

    --danger: #c00000;
    --success: #009100;

    --max-width: 1150px;

    ${device.md`
    	--max-width: 100vw;
    `};
  }

  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

html{ 
    @media (max-width: 1080px) {
        font-size: 93.75%; // 15px (Desktop)
    }

    @media (max-width: 720px) {
        font-size: 87.5%; // 14px
    }
}

body, button, input, textarea{
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
}

body {
    background: var(--background)
}

button { 
    cursor: pointer;
    outline: 0;
}

[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

a {
    transition: color 0.2s;
    &:hover{
      cursor: pointer;
      filter: brightness(0.8);
    }
}

input,
	textarea {
		resize: none;

		min-height: 3rem;
		font-size: 1rem;

		margin: 0.5rem 0;
		padding: 0.5rem 1rem;

		color: var(--dark-text);
		background: var(--white);

		border: 0.125rem solid var(--light-border);
		border-radius: 0.3rem;
		outline: 0;

		&:focus {
			border-color: var(--dark);
		}
	}

button {
	height: 2.8rem;
	font-size: 1.2rem;
	font-weight: 600;

	margin: 1rem 0 0;
	padding: 0.3rem 1rem;

	color: var(--dark-text);
	background: var(--yellow);

	border: none;
	border-radius: 0.3rem;

	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.8);
	}
}

.react-modal-overlay{
    overflow: auto;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;

    padding: 5vh;

    z-index: 3;
  }
  .react-modal-content{
    max-width: var(--max-width);
    
    position: relative;
    border-radius: 0.5rem;
    outline: none !important;

  }

  .react-modal-close{
    position: absolute;
    height: 0.5rem;
    right: 0.5rem;
    top: 0.5rem;
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    color: #ffffff;
    transition: filter 0.2s;

    font-size: 1.3rem;

    &:hover{
        filter: brightness(0.8)   
    }

    
    ${device.xs`
      right: 0rem;
      left: 0rem;
	  `}
    img {
      position: absolute;
      float: right;

      width: 3rem;

      top: 1rem;
      right: 1rem;

      ${device.xs`
        width: 2rem;
	    `}
    }
  }
  .ReactModal__Body--open {
    overflow-y: hidden;
  }
  .swal12-confirm{
    background: var(--yellow) !important;
  }

  .fc-event{
    overflow: hidden !important;
    color: var(--black) !important;
  }
  .fc-daygrid-event, .fc-v-event, .fc-event-main{
    color: var(--black) !important;
    background-color: unset !important;
    border: unset !important;
    box-shadow: unset !important;
  }
`;
