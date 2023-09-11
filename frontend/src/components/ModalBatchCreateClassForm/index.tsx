import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAgenda } from '../../hooks/useAgenda';
import { CustomInput } from '../CustomInput';
import { LoadingButton } from '../LoadingButton';
import { Container, ModalForm, TimeGroup } from './styles';

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
	startDay: {
		required: 'Campo obrigatório',
	},
	endDay: {
		required: 'Campo obrigatório',
	},
	startHour: {
		required: 'Campo obrigatório',
	},
	endHour: {
		required: 'Campo obrigatório',
	},
};

interface ModalBatchCreateClassFormValues {
	name: string;
	isOnlineClass: boolean;
	startDay: string;
	endDay: string;
	startHour: string;
	endHour: string;
}

function ModalBatchCreateClassForm() {
	const [isLoading, setIsLoading] = useState(false);
	const {
		batchCreateNewClassModalIsOpen,
		closeBatchCreateNewClassModal,
		getAndUpdateClasses,
		batchCreateNewClass,
	} = useAgenda();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ModalBatchCreateClassFormValues>();

	async function handleCreateNewClassFormSubmit(data: ModalBatchCreateClassFormValues) {
		setIsLoading(true);
		
		await batchCreateNewClass(data);

		await getAndUpdateClasses();
		closeBatchCreateNewClassModal();
		reset();
		setIsLoading(false);
	}

	return (
		<Container>
			<Modal
				isOpen={batchCreateNewClassModalIsOpen}
				onRequestClose={closeBatchCreateNewClassModal}
				overlayClassName='react-modal-overlay'
				className='react-modal-content'
			>
				<ModalForm onSubmit={handleSubmit(handleCreateNewClassFormSubmit)}>
					<header>
						<h2>Adicionar lote de Aula</h2>
						<button
							type='button'
							className='react-modal-close'
							onClick={closeBatchCreateNewClassModal}
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
							label='Inicio do lote:'
							name='startDay'
							type='date'
							register={register}
							errorMessage={errors.startDay?.message}
							validationConfig={inputConfig['startDay']}
						/>

						<CustomInput
							label='Fim do lote:'
							name='endDay'
							type='date'
							register={register}
							errorMessage={errors.endDay?.message}
							validationConfig={inputConfig['endDay']}
						/>
						<TimeGroup>
							<CustomInput
								label='Inicio da Aula:'
								name='startHour'
								type='time'
								register={register}
								errorMessage={errors.startHour?.message}
								validationConfig={inputConfig['startHour']}
							/>
							<CustomInput
								label='Fim da Aula:'
								name='endHour'
								type='time'
								register={register}
								errorMessage={errors.endHour?.message}
								validationConfig={inputConfig['endHour']}
							/>
						</TimeGroup>
					</main>
					<footer>
						<LoadingButton isLoading={isLoading}>Adicionar</LoadingButton>
					</footer>
				</ModalForm>
			</Modal>
		</Container>
	);
}

export { ModalBatchCreateClassForm };
