function getDatetimeLocalDateValue(datetimeDate?: Date) {
	const date = datetimeDate?.toISOString().split('T')[0];
	const time = datetimeDate?.toLocaleTimeString('pt-BR');

	return `${date}T${time}`;
}

export { getDatetimeLocalDateValue };
