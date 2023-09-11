import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAgenda } from '../../hooks/useAgenda';
import { getDatetimeLocalDateValue } from '../../utils';
import { showDangerConfirmModal } from '../../utils/SweetAlert';
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

interface ModalEditClassFormValues {
	id: string;
	name: string;
	isOnlineClass: boolean;
	startDate: string;
	endDate: string;
}

function ModalEditClassForm() {
	const [isLoadingSaveButton, setIsLoadingSaveButton] = useState(false);
	const [isLoadingDeleteButton, setIsLoadingDeleteButton] = useState(false);
	const {
		editClassModalIsOpen,
		closeEditClassModal,
		selectedClassToEdit,
		deleteClass,
		editClass,
		getAndUpdateClasses,
	} = useAgenda();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
		setValue,
	} = useForm<ModalEditClassFormValues>();

	useEffect(() => {
		if (selectedClassToEdit.id) {
			const startDate = new Date(selectedClassToEdit.start?.toLocaleString() ?? '');
			const endDate = new Date(selectedClassToEdit.end?.toLocaleString() ?? '');

			setValue('id', selectedClassToEdit.id ?? '');
			setValue('name', selectedClassToEdit.title ?? '');
			setValue('isOnlineClass', selectedClassToEdit.extendedProps?.isOnlineClass);
			setValue('startDate', getDatetimeLocalDateValue(startDate));
			setValue('endDate', getDatetimeLocalDateValue(endDate));
		}
	}, [selectedClassToEdit]);

	async function handleEditClassFormSubmit(data: ModalEditClassFormValues) {
		setIsLoadingSaveButton(true);
		await editClass({
			...data,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
		});

		await getAndUpdateClasses();
		closeEditClassModal();
		reset();
		setIsLoadingSaveButton(false);
	}

	async function handleDeleteClass(event: any) {
		event.preventDefault();

		const response = await showDangerConfirmModal({
			title: 'Tem certeza que deseja excluir esta aula?',
			text: 'Esta ação não poderá ser desfeita.',
			buttonText: 'Excluir',
			icon: 'warning',
		});

		if (response.isDenied) {
			setIsLoadingDeleteButton(true);
			await deleteClass(selectedClassToEdit.id ?? '');
			closeEditClassModal();
			reset();
			setIsLoadingDeleteButton(false);
		}
	}

	return (
		<Container>
			<Modal
				isOpen={editClassModalIsOpen}
				onRequestClose={closeEditClassModal}
				overlayClassName='react-modal-overlay'
				className='react-modal-content'
			>
				<ModalForm onSubmit={handleSubmit(handleEditClassFormSubmit)}>
					<header>
						<h2>Aula</h2>
						<button
							type='button'
							className='react-modal-close'
							onClick={closeEditClassModal}
						>
							<FaTimes color='var(--white)' />
						</button>
					</header>
					<main>
						<CustomInput
							label=''
							name='id'
							type='hidden'
							register={register}
							errorMessage={errors.id?.message}
							validationConfig={{}}
						/>

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
						<LoadingButton
							style={{
								backgroundColor: 'var(--danger)',
								color: 'var(--white)',
							}}
							isLoading={isLoadingDeleteButton}
							onClick={handleDeleteClass}
						>
							Remover
						</LoadingButton>
						<LoadingButton isLoading={isLoadingSaveButton}>
							Salvar
						</LoadingButton>
					</footer>
				</ModalForm>
			</Modal>
		</Container>
	);
}

export { ModalEditClassForm };
