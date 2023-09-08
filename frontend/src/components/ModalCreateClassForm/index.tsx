import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAgenda } from '../../hooks/useAgenda';
import { LoadingButton } from '../LoadingButton';
import { Container, InputContainer, ModalForm } from './styles';

function ModalCreateClassForm() {
	const {
		createNewClassModalIsOpen,
		openCreateNewClassModal,
		closeCreateNewClassModal,
	} = useAgenda();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	return (
		<Container>
			<Modal
				isOpen={createNewClassModalIsOpen}
				onRequestClose={closeCreateNewClassModal}
				overlayClassName='react-modal-overlay'
				className='react-modal-content'
			>
				<ModalForm>
					<header>
						<h2>Adicionar Aula</h2>
						<button
							type='button'
							className='react-modal-close'
							onClick={closeCreateNewClassModal}
						>
							<FaTimes color='var(--white)' />
						</button>
					</header>
					<main>
						<InputContainer>
							<label htmlFor=''>Nome:</label>
							<input type='text' placeholder='Nome da aula' />
						</InputContainer>

						<InputContainer>
							<label htmlFor=''>Inicio:</label>
							<input type='datetime-local' />
						</InputContainer>

						<InputContainer>
							<label htmlFor=''>Fim:</label>
							<input type='datetime-local' />
						</InputContainer>
					</main>
					<footer>
						<LoadingButton isLoading={false}>Adicionar</LoadingButton>
					</footer>
				</ModalForm>
			</Modal>
		</Container>
	);
}

export { ModalCreateClassForm };
