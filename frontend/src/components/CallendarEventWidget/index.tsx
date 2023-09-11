import { EventContentArg } from '@fullcalendar/core';
import { Container } from './styles';

function CallendarEventWidget(eventContent: EventContentArg) {
	const isRegistered = eventContent.event.extendedProps.isRegistered;

	const style = {
		position: 'relative',
		backgroundColor: isRegistered ? 'var(--yellow)' : 'var(--light-text)',
		borderRadius: '5px',
		padding: '5px',
		maxWidth: '100%',
		height: '100%',
	} as React.CSSProperties;

	return (
		<Container style={style}>
			<div>
				<b>{eventContent.timeText}</b> {isRegistered && '[Matriculado]'}
			</div>
			<i>{eventContent.event.title}</i>
		</Container>
	);
}

export { CallendarEventWidget };
