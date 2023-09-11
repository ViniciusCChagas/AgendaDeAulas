import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoadingButton } from '../../components/LoadingButton';
import { api } from '../../services/api';
import { Container, Form } from './styles';

const inputConfig = {
	email: {
		required: {
			value: true,
			message: 'Campo obrigatório',
		},
		minLength: {
			value: 3,
			message: 'Mínimo de 3 caracteres',
		},
		maxLength: {
			value: 255,
			message: 'Máximo de 255 caracteres',
		},
		type: {
			value: 'email',
			message: 'Email inválido',
		},
	},
};

interface LoginFormData {
	email: string;
}

function LoginPage() {
	const navigate = useNavigate();
	const [isButtonLoading, setIsButtonLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormData>();

	async function onSubmit(data: LoginFormData) {
		setIsButtonLoading(true);
		const response = await api.post('/session', data);
		setIsButtonLoading(false);

		if (response.status !== 201) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Email inválido!',
			});
		}

		reset();
		if (data.email.includes('@aprovatotal.com.br')) {
			navigate('/admin');
			return;
		}
		
		navigate('/');
		return;
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit((data) => onSubmit(data))}>
				<header>
					<h2>Login</h2>
				</header>
				<main>
					<input
						type='email'
						placeholder='Digite seu email'
						spellCheck={false}
						{...register('email', { ...inputConfig['email'] })}
					/>
				</main>

				<footer>
					<LoadingButton type='submit' isLoading={isButtonLoading}>
						Entrar
					</LoadingButton>
				</footer>
			</Form>
		</Container>
	);
}

export { LoginPage };
