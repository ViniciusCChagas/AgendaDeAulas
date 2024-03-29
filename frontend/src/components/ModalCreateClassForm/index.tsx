import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAgenda } from '../../hooks/useAgenda';
import { getDatetimeLocalDateValue } from '../../utils';
import { CustomInput } from '../CustomInput';
import { LoadingButton } from '../LoadingButton';
import { Container, ModalForm } from './styles';

Modal.setAppElement('#root');

const inputConfig = {
	name: {
		required: 'Campo obrigatório',
		minLength: {
			value: 3,
			message: 'O Nome deve ter no mínimo 3 caracteres',
		},
		maxLength: {
			value: 120,
			message: 'O Nome deve ter no máximo 120 caracteres',
		},
	},
	startDate: {
		required: 'Campo obrigatório',
	},
	endDate: {
		required: 'Campo obrigatório',
	},
};

interface ModalCreateClassFormValues {
	name: string;
	isOnlineClass: boolean;
	startDate: string;
	endDate: string;
}

function ModalCreateClassForm() {
	const [isLoading, setIsLoading] = useState(false);
	const {
		createNewClassModalIsOpen,
		closeCreateNewClassModal,
		selectedDateInterval,
		createNewClass,
		getAndUpdateClasses,
	} = useAgenda();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<ModalCreateClassFormValues>();

	useEffect(() => {
		reset();
		setValue('startDate', getDatetimeLocalDateValue(selectedDateInterval.startDate));
		setValue('endDate', getDatetimeLocalDateValue(selectedDateInterval.endDate));
	}, [selectedDateInterval]);

	async function handleCreateNewClassFormSubmit(data: ModalCreateClassFormValues) {
		setIsLoading(true);
		await createNewClass({
			...data,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
		});

		await getAndUpdateClasses();
		closeCreateNewClassModal();
		reset();
		setIsLoading(false);
	}

	return (
		<Container>
			<Modal
				isOpen={createNewClassModalIsOpen}
				onRequestClose={closeCreateNewClassModal}
				overlayClassName='react-modal-overlay'
				className='react-modal-content'
			>
				<ModalForm onSubmit={handleSubmit(handleCreateNewClassFormSubmit)}>
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
						<CustomInput
							label='Nome:'
							name='name'
							type='text'
							register={register}
							errorMessage={errors.name?.message}
							validationConfig={inputConfig['name']}
						/>

						<CustomInput
							label='É aula EAD'
							name='isOnlineClass'
							register={register}
							type='checkbox'
							validationConfig={{}}
						/>

						<CustomInput
							label='Inicio:'
							name='startDate'
							type='datetime-local'
							register={register}
							errorMessage={errors.startDate?.message}
							validationConfig={inputConfig['startDate']}
						/>

						<CustomInput
							label='Fim:'
							name='endDate'
							type='datetime-local'
							register={register}
							errorMessage={errors.endDate?.message}
							validationConfig={inputConfig['endDate']}
						/>
					</main>
					<footer>
						<LoadingButton isLoading={isLoading}>Adicionar</LoadingButton>
					</footer>
				</ModalForm>
			</Modal>
		</Container>
	);
}

export { ModalCreateClassForm };
