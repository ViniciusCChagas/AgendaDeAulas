import { setLocale } from 'yup';

setLocale({
	mixed: {
		required: '${path}: Este campo é obrigatório',
		notType: '${path}: Formato digitado é invalido',
		defined: '${path}: Este campo precisa ter um valor definido',
		oneOf: '${path}: Deve ser um dos seguintes valores: ${values}',
		notOneOf: '${path}: Não pode ser um dos seguintes valores: ${values}',
	},
	string: {
		lowercase: '${path}: Deve estar em maiúsculo',
		uppercase: '${path}: Deve estar em minúsculo',
		url: '${path}: Deve ter um formato de URL válida',
		max: '${path}: Deve ter no máximo ${max} caracteres',
		min: '${path}: Deve ter pelo menos ${min} caracteres',
		email: '${path}: Formato de e-mail digitado não é valido',
		length: '${path}: Deve ter exatamente ${length} caracteres',
		uuid: '${path}: Valor digitado não confere a um UUID valido',
		trim: '${path}: Não deve conter espaços no início ou no fim.',
		matches: '${path}: O valor deve corresponder ao padrão: ${regex}',
	},
	number: {
		min: '${path}: Deve ser no mínimo ${min}',
		max: '${path}: Deve ser no máximo ${max}',
		integer: '${path}: Deve ser um número inteiro',
		lessThan: '${path}: Deve ser menor que ${less}',
		moreThan: '${path}: Deve ser maior que ${more}',
		positive: '${path}: Deve ser um número positivo',
		negative: '${path}: Deve ser um número negativo',
	},
	date: {
		min: '${path}: Deve ser maior que a data ${min}',
		max: '${path}: Deve ser menor que a data ${max}',
	},
	array: {
		min: '${path}: Deve ter no mínimo ${min} itens',
		max: '${path}: Deve ter no máximo ${max} itens',
		length: '${path}: Deve conter exatamente ${length} itens',
	},
	object: {
		noUnknown: '${path}: Deve ser passado um valor definido',
	},
});
