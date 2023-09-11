import { EventHoveringArg } from '@fullcalendar/core';
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from 'react-icons/fa6';
import { Container } from './styles';

interface CallendarWeatherWidgetProps {
	mouseEvent: EventHoveringArg | null;
}

function CallendarWeatherWidget({ mouseEvent }: CallendarWeatherWidgetProps) {
	const widgetPosition = {
		left: mouseEvent?.jsEvent.pageX,
		top: mouseEvent?.jsEvent.pageY,
	};

	const weather = mouseEvent?.event.extendedProps.weather;

	return (
		weather && (
			<Container
				style={{
					display: mouseEvent ? 'flex' : 'none',
					position: 'absolute',
					left: widgetPosition.left,
					top: widgetPosition.top,
				}}
			>
				<p>Previsão do tempo</p>
				<img
					src={`https:${weather.condition.icon}`}
					alt={weather.condition.text}
				/>
				<span>{weather.condition.text}</span>
				<div>
					<span>
						<FaTemperatureArrowUp />
						{weather.maxTemp}°C
					</span>
					<span>
						<FaTemperatureArrowDown />
						{weather.minTemp}°C
					</span>
				</div>
			</Container>
		)
	);
}

export { CallendarWeatherWidget };
