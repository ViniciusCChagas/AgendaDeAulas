import Swal, { SweetAlertIcon } from 'sweetalert2';

export function showToast(
	title: string,
	text: string,
	icon: SweetAlertIcon,
	timer = 5000
) {
	Swal.fire({
		position: 'top',
		title,
		text,
		icon,
		showConfirmButton: false,
		timerProgressBar: true,
		timer,
		toast: true,
	});
}

export function showErrorModal(title: string, text: string) {
	Swal.fire({
		title,
		text,
		icon: 'error',
		confirmButtonText: 'Ok',
	});
}

interface ShowDangerConfirmModalParams {
	title: string;
	text: string;
	buttonText: string;
	icon: SweetAlertIcon;
}
export async function showDangerConfirmModal(params: ShowDangerConfirmModalParams) {
	const result = await Swal.fire({
		title: params.title,
		text: params.text,
		icon: params.icon,
		confirmButtonText: 'Cancelar',
		showDenyButton: true,
		confirmButtonColor: 'var(--yellow)',
		denyButtonText: params.buttonText,
		showLoaderOnDeny: true,
	});

	return result;
}

interface ShowConfirmModalParams {
	title: string;
	text: string;
	buttonText: string;
	icon: SweetAlertIcon;
}
export async function showConfirmModal(params: ShowConfirmModalParams) {
	const result = await Swal.fire({
		title: params.title,
		text: params.text,
		icon: params.icon,
		confirmButtonText: params.buttonText,
		showLoaderOnConfirm: true,
		confirmButtonColor: 'var(--yellow)',
		cancelButtonText: 'Cancelar',
		showCancelButton: true,
	});

	return result;
}
