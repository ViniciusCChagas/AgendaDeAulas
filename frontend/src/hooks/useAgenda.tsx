import { createContext, ReactNode, useContext, useState } from 'react';

interface AgendaProviderProps {
	children: ReactNode;
}

interface LoggedUser {
	email: string;
	isAdmin: boolean;
}

interface AgendaContextData {
	createNewClassModalIsOpen: boolean;
	openCreateNewClassModal: () => void;
	closeCreateNewClassModal: () => void;
}

const AgendaContext = createContext<AgendaContextData>({} as AgendaContextData);

export const AgendaProvider = function ({ children }: AgendaProviderProps) {
	const [createNewClassModalIsOpen, setCreateNewClassModalIsOpen] = useState(false);

	function openCreateNewClassModal() {
		setCreateNewClassModalIsOpen(true);
	}

	function closeCreateNewClassModal() {
		setCreateNewClassModalIsOpen(false);
	}

	return (
		<AgendaContext.Provider
			value={{
				createNewClassModalIsOpen,
				openCreateNewClassModal,
				closeCreateNewClassModal,
			}}
		>
			{children}
		</AgendaContext.Provider>
	);
};

export function useAgenda() {
	const context = useContext(AgendaContext);

	return context;
}
