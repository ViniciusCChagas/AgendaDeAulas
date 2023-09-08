import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import { useEffect, useState } from 'react';
import { ModalCreateClassForm } from '../../components/ModalCreateClassForm';
import { IClassesDto } from '../../models/dtos/IClassesDto';
import { api } from '../../services/api';
import { Container, Content } from './styles';

function IndexPage() {
	const [classes, setClasses] = useState<IClassesDto[]>([]);

	useEffect(() => {
		api.get(
			'/class?initialDate=2023-01-01 00:00:00&finalDate=2024-01-01 23:59:59'
		).then((response) => {
			setClasses(response.data);
		});
	}, []);

	///abrir modal de criação de evento
	const handleDateSelect = (selectInfo: DateSelectArg) => {
		console.log({ selectInfo });
		selectInfo.jsEvent?.preventDefault();
		const calendarApi = selectInfo.view.calendar;

		if (selectInfo.view.type === 'dayGridMonth') {
			calendarApi.changeView('timeGridDay', selectInfo.startStr);
			return;
		}

		calendarApi.addEvent({
			id: 'asda dasdas das',
			title: 'New Event',
			start: selectInfo.startStr,
			end: selectInfo.endStr,
			allDay: selectInfo.allDay,
		});

		calendarApi.unselect(); // clear date selection
	};

	///abrir modal de edição de evento
	const handleEventClick = (clickInfo: EventClickArg) => {
		if (
			prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)
		) {
			clickInfo.event.remove();
		}
	};

	return (
		<Container>
			<Content>
				<header></header>
				<main>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={3}
						locale={'pt-br'}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay',
						}}
						height={'100%'}
						buttonText={{
							day: 'Dia',
							month: 'Mês',
							week: 'Semana',
							list: 'Lista',
							today: 'Hoje',
							next: 'Próximo',
							prev: 'Anterior',
							nextYear: 'Próximo ano',
							prevYear: 'Ano anterior',
						}}
						events={classes}
						nowIndicator={true}
						slotDuration={{
							hours: 1,
						}}
						initialView='timeGridWeek'
						weekends={true}
						navLinks={true}
						select={handleDateSelect}
						eventContent={renderEventContent} // custom render function
						eventClick={handleEventClick}
						allDaySlot={false}
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
		</Container>
	);
}

//widget do evento no calendario
function renderEventContent(eventContent: EventContentArg) {
	return (
		<>
			<b>{eventContent.timeText}</b>
			<i>{eventContent.event.title}</i>
		</>
	);
}

export { IndexPage };
