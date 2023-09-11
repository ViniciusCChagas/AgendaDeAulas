import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addHours, set } from 'date-fns';

import {
	CalendarOptions,
	DateSelectArg,
	EventClickArg,
	EventHoveringArg,
} from '@fullcalendar/core';
import { useState } from 'react';
import { CallendarEventWidget } from '../../components/CallendarEventWidget';
import { CallendarWeatherWidget } from '../../components/CallendarWeatherWidget';
import { LoadingButton } from '../../components/LoadingButton';
import { ModalBatchCreateClassForm } from '../../components/ModalBatchCreateClassForm';
import { ModalCreateClassForm } from '../../components/ModalCreateClassForm';
import { ModalEditClassForm } from '../../components/ModalEditClassForm';
import { useAgenda } from '../../hooks/useAgenda';
import { Container, Content } from './styles';

const FullCalendarConfigs = {
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	selectable: true,
	selectMirror: true,
	dayMaxEvents: 3,
	locale: 'pt-br',
	headerToolbar: {
		left: 'prev,next today',
		center: 'title',
		right: 'dayGridMonth,timeGridWeek,timeGridDay',
	},
	height: '100%',
	buttonText: {
		day: 'Dia',
		month: 'Mês',
		week: 'Semana',
		list: 'Lista',
		today: 'Hoje',
		next: 'Próximo',
		prev: 'Anterior',
		nextYear: 'Próximo ano',
		prevYear: 'Ano anterior',
	},
	nowIndicator: true,
	slotDuration: {
		hours: 1,
	},
	initialView: 'dayGridMonth',
	weekends: true,
	navLinks: true,
	allDaySlot: false,
} as CalendarOptions;

function AdminPage() {
	const [mouseEvent, setMouseEvent] = useState<EventHoveringArg | null>(null);
	const {
		openCreateNewClassModal,
		openEditClassModal,
		events,
		openBatchCreateNewClassModal,
	} = useAgenda();

	///abrir modal de criação de evento
	const handleDateSelect = (selectInfo: DateSelectArg) => {
		selectInfo.jsEvent?.preventDefault();
		const calendarApi = selectInfo.view.calendar;

		if (selectInfo.view.type === 'dayGridMonth') {
			calendarApi.changeView('timeGridDay', selectInfo.startStr);
			return;
		}

		openCreateNewClassModal({
			startDate: selectInfo.start,
			endDate: selectInfo.end,
		});
	};

	///abrir modal de edição de evento
	const handleEventClick = (clickInfo: EventClickArg) => {
		clickInfo.jsEvent?.preventDefault();

		openEditClassModal(clickInfo.event.toPlainObject());
	};

	const handleEventMouseEnter = (mouseEnterInfo: EventClickArg) => {
		mouseEnterInfo.jsEvent?.preventDefault();

		setMouseEvent(mouseEnterInfo);
	};

	const handleEventMouseLeave = (mouseEnterInfo: EventClickArg) => {
		mouseEnterInfo.jsEvent?.preventDefault();

		setMouseEvent(null);
	};

	const handleClickOpenCreateNewClassModal = (event: React.MouseEvent) => {
		event.preventDefault();

		const startDate = set(new Date(), {
			seconds: 0,
			milliseconds: 0,
		});

		const finalDate = set(new Date(), {
			seconds: 0,
			milliseconds: 0,
		});

		openCreateNewClassModal({
			startDate: addHours(startDate, 1),
			endDate: addHours(finalDate, 2),
		});
	};

	const handleClickOpenBatchCreateNewClassModal = (event: React.MouseEvent) => {
		event.preventDefault();

		openBatchCreateNewClassModal();
	};

	return (
		<Container>
			<h1>Agendamento de aulas</h1>
			<Content>
				<header>
					<LoadingButton
						isLoading={false}
						onClick={handleClickOpenCreateNewClassModal}
					>
						Adicionar Aula
					</LoadingButton>
					<LoadingButton
						isLoading={false}
						onClick={handleClickOpenBatchCreateNewClassModal}
					>
						Adicionar lote de Aulas
					</LoadingButton>
				</header>
				<main>
					<FullCalendar
						{...FullCalendarConfigs}
						events={events}
						select={handleDateSelect}
						eventContent={CallendarEventWidget} // custom render function
						eventClick={handleEventClick}
						eventMouseEnter={handleEventMouseEnter}
						eventMouseLeave={handleEventMouseLeave}
						dateClick={(arg) => {
							const calendarApi = arg.view.calendar;

							if (arg.view.type === 'dayGridMonth') {
								calendarApi.changeView('timeGridDay', arg.dateStr);
							}
						}}
					/>
				</main>
				<footer></footer>
			</Content>
			<ModalCreateClassForm />
			<ModalEditClassForm />
			<ModalBatchCreateClassForm />
			<CallendarWeatherWidget mouseEvent={mouseEvent} />
		</Container>
	);
}

export { AdminPage };
