import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
	children: ReactNode;
}

interface LoggedUser {
	email: string;
	isAdmin: boolean;
}

interface AuthContextData {
	loggedUser: LoggedUser | undefined;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = function ({ children }: AuthProviderProps) {
	const navigate = useNavigate();

	const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined);

	return (
		<AuthContext.Provider
			value={{
				loggedUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	return context;
}
