import { EventInput, EventSourceInput } from '@fullcalendar/core';
import { AxiosError } from 'axios';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IParamsBatchCreateNewClassesDto } from '../models/dtos/IParamsBatchCreateNewClassesDto';
import { IParamsCreateNewClassDto } from '../models/dtos/IParamsCreateNewClassDto';
import { IParamsUpdateClassDto } from '../models/dtos/IParamsUpdateClassDto';
import { api } from '../services/api';
import { getDatetimeLocalDateValue } from '../utils';
import { showErrorModal, showToast } from '../utils/SweetAlert';

interface AgendaProviderProps {
	children: ReactNode;
}

interface LoggedUser {
	email: string;
	isAdmin: boolean;
}

interface AgendaContextData {
	createNewClassModalIsOpen: boolean;
	selectedDateInterval: SelectedDateInterval;
	openCreateNewClassModal: (selectedDateInterval: SelectedDateInterval) => void;
	closeCreateNewClassModal: () => void;

	batchCreateNewClassModalIsOpen: boolean;
	openBatchCreateNewClassModal: () => void;
	closeBatchCreateNewClassModal: () => void;

	editClassModalIsOpen: boolean;
	selectedClassToEdit: EventInput;
	openEditClassModal: (selectedClassToEdit: EventInput) => void;
	closeEditClassModal: () => void;

	getAndUpdateClasses: () => Promise<void>;

	createNewClass: (newClass: IParamsCreateNewClassDto) => Promise<void>;
	batchCreateNewClass: (newClass: IParamsBatchCreateNewClassesDto) => Promise<void>;
	deleteClass: (classId: string) => Promise<void>;
	registerStudentInClass: (classId: string) => Promise<void>;
	editClass: (newClass: IParamsUpdateClassDto) => Promise<void>;
	events: EventSourceInput;
}

interface SelectedDateInterval {
	startDate: Date;
	endDate: Date;
}

const AgendaContext = createContext<AgendaContextData>({} as AgendaContextData);

export const AgendaProvider = function ({ children }: AgendaProviderProps) {
	const [selectedDateInterval, setSelectedDateInterval] =
		useState<SelectedDateInterval>({} as SelectedDateInterval);
	const [createNewClassModalIsOpen, setCreateNewClassModalIsOpen] = useState(false);
	const [batchCreateNewClassModalIsOpen, setBatchCreateNewClassModalIsOpen] =
		useState(false);
	const [selectedClassToEdit, setSelectedClassToEdit] = useState<EventInput>(
		{} as EventInput
	);
	const [editClassModalIsOpen, setEditClassModalIsOpen] = useState(false);

	const [events, setEvents] = useState<EventInput[]>([]);

	useEffect(() => {
		getAndUpdateClasses();
	}, []);

	async function getAndUpdateClasses() {
		try {
			const { data } = await api.get(
				'/class?initialDate=2023-01-01 00:00:00&finalDate=2024-01-01 23:59:59'
			);

			const events = data.map((item: any) => {
				return {
					id: item._id,
					title: item.name,
					start: item.startDate.split('.')[0],
					end: item.endDate.split('.')[0],
					allDay: false,
					isOnlineClass: item.isOnlineClass,
					weather: item.weather,
					isRegistered: item.isRegistered,
				};
			});
			console.log({ events });
			setEvents(events);
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal(
					'Atenção!',
					`Probrema ao buscar aulas cadastradas: ${errorsMessages}`
				);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao buscar aulas! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	function openCreateNewClassModal(selectedDateInterval: SelectedDateInterval) {
		setSelectedDateInterval({} as SelectedDateInterval);
		setSelectedDateInterval(selectedDateInterval);
		setCreateNewClassModalIsOpen(true);
	}

	function closeCreateNewClassModal() {
		setSelectedDateInterval({} as SelectedDateInterval);
		setCreateNewClassModalIsOpen(false);
	}

	function openBatchCreateNewClassModal() {
		setBatchCreateNewClassModalIsOpen(true);
	}

	function closeBatchCreateNewClassModal() {
		setBatchCreateNewClassModalIsOpen(false);
	}

	function openEditClassModal(selectedClassToEdit: EventInput) {
		setSelectedClassToEdit(selectedClassToEdit);
		setEditClassModalIsOpen(true);
	}

	function closeEditClassModal() {
		setEditClassModalIsOpen(false);
	}

	async function createNewClass(newClass: IParamsCreateNewClassDto) {
		try {
			const data = {
				...newClass,
				startDate: getDatetimeLocalDateValue(newClass.startDate),
				endDate: getDatetimeLocalDateValue(newClass.endDate),
			};

			await api.post('/class', data);

			showToast('Sucesso!', 'Aula criada com sucesso!', 'success');
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal('Atenção!', `Probrema ao criar aula: ${errorsMessages}`);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao criar aula! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	async function batchCreateNewClass(newClass: IParamsBatchCreateNewClassesDto) {
		try {
			await api.post('/class/batchCreate', newClass);

			showToast('Sucesso!', 'Aula criada com sucesso!', 'success');
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal('Atenção!', `Probrema ao criar aula: ${errorsMessages}`);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao criar aula! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	async function deleteClass(classId: string) {
		try {
			await api.delete(`/class/${classId}`);

			const newEvents = events.filter((event) => event.id !== classId);

			setEvents(newEvents);

			showToast('Sucesso!', 'Aula deletada com sucesso!', 'success');
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal('Atenção!', `Probrema ao deletar aula: ${errorsMessages}`);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao deletar aula! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	async function editClass(newClass: IParamsUpdateClassDto) {
		debugger;
		const data = {
			...newClass,
			startDate: getDatetimeLocalDateValue(newClass.startDate),
			endDate: getDatetimeLocalDateValue(newClass.endDate),
		};
		try {
			await api.put(`/class`, data);

			await getAndUpdateClasses();

			showToast('Sucesso!', 'Aula modificada com sucesso!', 'success');
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal(
					'Atenção!',
					`Probrema ao modificar aula: ${errorsMessages}`
				);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao modificar aula! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	async function registerStudentInClass(classId: string) {
		try {
			await api.post(`/class/${classId}/addStudent`);

			await getAndUpdateClasses();

			showToast('Sucesso!', 'Matricula realizada com sucesso!', 'success');
		} catch (error: any) {
			if (error instanceof AxiosError) {
				const errorsMessages = error.response?.data?.errors?.join('\n') ?? '';
				showErrorModal(
					'Atenção!',
					`Probrema ao realizar matricula: ${errorsMessages}`
				);
			} else {
				showErrorModal(
					'Atenção!',
					'Falha ao realizar matricula! Contate um administrador.'
				);
			}
			console.log(error);
		}
	}

	return (
		<AgendaContext.Provider
			value={{
				createNewClassModalIsOpen,
				selectedDateInterval,
				openCreateNewClassModal,
				closeCreateNewClassModal,

				batchCreateNewClassModalIsOpen,
				openBatchCreateNewClassModal,
				closeBatchCreateNewClassModal,

				editClassModalIsOpen,
				selectedClassToEdit,
				openEditClassModal,
				closeEditClassModal,

				getAndUpdateClasses,

				createNewClass,
				batchCreateNewClass,
				editClass,
				registerStudentInClass,
				deleteClass,
				events,
			}}
		>
			{children}
		</AgendaContext.Provider>
	);
};

export function useAgenda() {
	const context = useContext(AgendaContext);

	return context;
}
