const weekDays = {
	DOMINGO: 0,
	SEGUNDA_FEIRA: 1,
	TERCA_FEIRA: 2,
	QUARTA_FEIRA: 3,
	QUINTA_FEIRA: 4,
	SEXTA_FEIRA: 5,
	SABADO: 6,
};

const months = {
	JANEIRO: 0,
	FEVEREIRO: 1,
	MARCO: 2,
	ABRIL: 3,
	MAIO: 4,
	JUNHO: 5,
	JULHO: 6,
	AGOSTO: 7,
	SETEMBRO: 8,
	OUTUBRO: 9,
	NOVEMBRO: 10,
	DEZEMBRO: 11,
};

const holidaysCache = {};

function isHoliday(date: Date) {
	let holidays = [];
	const year = date.getFullYear();

	if (holidaysCache[year]) {
		holidays = holidaysCache[year];
	} else {
		holidays = getNacionalHolidays(year);
	}

	const isHoliday = holidays.some((holiday) => {
		return (
			holiday.date.getDate() === date.getDate() &&
			holiday.date.getMonth() === date.getMonth()
		);
	}); 

	return isHoliday;
}

function getEasterHoliday(year: number) {
	var f = Math.floor,
		// Golden Number - 1
		G = year % 19,
		C = f(year / 100),
		// related to Epact
		H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
		// number of days from 21 March to the Paschal full moon
		I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
		// weekday for the Paschal full moon
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		// number of days from 21 March to the Sunday on or before the Paschal full moon
		L = I - J,
		month = 3 + f((L + 40) / 44),
		day = L + 28 - 31 * f(month / 4);

	return new Date(year, month - 1, day);
}

function getSextaFeiraSanta(year: number) {
	const easter = getEasterHoliday(year);
	return addDays(easter, -2);
}

function getTercaFeiraDeCarnaval(year: number) {
	const easter = getEasterHoliday(year);
	return addDays(easter, -47);
}

function addDays(date: Date, days: number) {
	return new Date(date.valueOf() + 1000 * 60 * 60 * 24 * days);
}

function getNacionalHolidays(year: number) {
	return [
		{
			date: new Date(year, months.JANEIRO, 1),
			descricao: 'Ano Novo',
		},
		{
			date: getTercaFeiraDeCarnaval(year),
			descricao: 'Terça-feira de Carnaval',
		},
		{
			date: getSextaFeiraSanta(year),
			descricao: 'Sexta-feira santa (Paixão de Cristo)',
		},
		{
			date: new Date(year, months.ABRIL, 21),
			descricao: 'Tiradentes',
		},
		{
			date: new Date(year, months.MAIO, 1),
			descricao: 'Dia do Trabalho',
		},
		{
			date: new Date(year, months.SETEMBRO, 7),
			descricao: 'Independência do Brasil',
		},
		{
			date: new Date(year, months.OUTUBRO, 12),
			descricao: 'Dia de Nossa Senhora Aparecida',
		},
		{
			date: new Date(year, months.NOVEMBRO, 2),
			descricao: 'Finados',
		},
		{
			date: new Date(year, months.NOVEMBRO, 15),
			descricao: 'Proclamação da República',
		},
		{
			date: new Date(year, months.DEZEMBRO, 25),
			descricao: 'Natal',
		},
	];
}

export { getNacionalHolidays, isHoliday, months, weekDays };
