import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ImSpinner } from 'react-icons/im';
import { Button } from './styles';

type LoadingButtonProps = {
	isLoading: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<any>;

export function LoadingButton({ isLoading, children, ...rest }: LoadingButtonProps) {
	return <Button {...rest}>{isLoading ? <ImSpinner /> : children}</Button>;
}
