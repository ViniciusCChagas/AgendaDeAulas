import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { Button } from './styles';

type LoadingButtonProps = {
	isLoading: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<any>;

export function LoadingButton({ isLoading, children, ...rest }: LoadingButtonProps) {
	return <Button {...rest}>{isLoading ? <FaSpinner /> : children}</Button>;
}
