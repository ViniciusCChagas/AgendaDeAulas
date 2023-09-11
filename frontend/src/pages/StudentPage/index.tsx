import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { CalendarOptions, EventClickArg, EventHoveringArg } from '@fullcalendar/core';
import { useState } from 'react';
import { CallendarEventWidget } from '../../components/CallendarEventWidget';
import { CallendarWeatherWidget } from '../../components/CallendarWeatherWidget';
import { useAgenda } from '../../hooks/useAgenda';
import { showConfirmModal } from '../../utils/SweetAlert';
import { Container, Content } from './styles';

const FullCalendarConfigs = {
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	selectable: false,
	selectMirror: false,
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
	initialView: 'timeGridWeek',
	weekends: true,
	navLinks: true,
	allDaySlot: false,
} as CalendarOptions;

function StudentPage() {
	const [mouseEvent, setMouseEvent] = useState<EventHoveringArg | null>(null);
	const { events, registerStudentInClass } = useAgenda();

	///abrir modal de edição de evento
	const handleEventClick = async (clickInfo: EventClickArg) => {
		clickInfo.jsEvent?.preventDefault();

		const event = clickInfo.event;
		if (event.extendedProps.isRegistered) {
			return;
		}

		const result = await showConfirmModal({
			buttonText: 'Realizar matricular',
			title: 'Atenção!',
			text: `Você deseja se matricular nessa aula?`,
			icon: 'question',
		});

		if (result.isConfirmed) {
			await registerStudentInClass(clickInfo.event.id);
		}
	};

	const handleEventMouseEnter = (mouseEnterInfo: EventClickArg) => {
		mouseEnterInfo.jsEvent?.preventDefault();

		setMouseEvent(mouseEnterInfo);
	};

	const handleEventMouseLeave = (mouseEnterInfo: EventClickArg) => {
		mouseEnterInfo.jsEvent?.preventDefault();

		setMouseEvent(null);
	};

	return (
		<Container>
			<h1>Agendamento de aulas</h1>
			<h3>Clique em uma das aulas para realizar a sua matricula!</h3>
			<Content>
				<main>
					<FullCalendar
						{...FullCalendarConfigs}
						events={events}
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
			<CallendarWeatherWidget mouseEvent={mouseEvent} />
		</Container>
	);
}

export { StudentPage };
