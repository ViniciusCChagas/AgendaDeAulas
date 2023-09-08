import { Link } from 'react-router-dom';
import { NotFoundWrapper } from './styles';

export function PageNotFound() {
	return (
		<NotFoundWrapper>
			<h1>404</h1>
			<h2>Página não encontrada!</h2>
			<Link to={`/`}> Voltar ao inicio </Link>
		</NotFoundWrapper>
	);
}
