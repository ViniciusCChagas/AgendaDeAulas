import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AgendaProvider } from './hooks/useAgenda';
import { IndexPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { PageNotFound } from './pages/PageNotFound';

export function AppRoutes() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: <LoginPage />,
			errorElement: <PageNotFound />,
		},
		{
			path: '/',
			element: (
				<AgendaProvider>
					<IndexPage />
				</AgendaProvider>
			),
			errorElement: <PageNotFound />,
		},
	]);

	return <RouterProvider router={router} />;
}
