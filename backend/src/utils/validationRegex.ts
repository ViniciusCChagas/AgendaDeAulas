const validationRegex = {
	//yy-mm-dd yyyy-mm-dd
	date: new RegExp(
		/^(?:[0-9]{2})?[0-9]{2}-(?:(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])|(3[01]|[12][0-9]|0?[1-9])-(1[0-2]|0?[1-9]))$/
	),
	//hh:mm
	time: new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
};

export { validationRegex };
