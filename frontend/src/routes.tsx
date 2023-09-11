import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AgendaProvider } from './hooks/useAgenda';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
import { StudentPage } from './pages/StudentPage';

export function AppRoutes() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: <LoginPage />,
			errorElement: <PageNotFound />,
		},
		{
			path: '/admin',
			element: (
				<AgendaProvider>
					<AdminPage />
				</AgendaProvider>
			),
			errorElement: <PageNotFound />,
		},
		{
			path: '/',
			element: (
				<AgendaProvider>
					<StudentPage />
				</AgendaProvider>
			),
			errorElement: <PageNotFound />,
		},
	]);

	return <RouterProvider router={router} />;
}
