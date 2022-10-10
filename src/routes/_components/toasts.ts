import { toast as toastLib } from '@zerodevx/svelte-toast';

const infoToast = (msg: string) => {
	// initial 0 is to not show the progress bar
	return toastLib.push(msg, { classes: ['toast-default'] });
};

const successToast = (msg: string) => {
	// initial 0 is to not show the progress bar
	return toastLib.push(msg, { classes: ['toast-green'] });
};

const warnToast = (msg: string) => {
	return toastLib.push(msg, { classes: ['toast-yellow'] });
};

const errorToast = (msg: string, expires = true) => {
	return toastLib.push(msg, { classes: ['toast-red'], initial: expires ? 1 : 0, pausable: true });
};

const terminalToast = (msg: string) => {
	// this type of toast doesn't go on its own
	return toastLib.push(msg, { initial: 0, classes: ['toast-red'] });
};

const toastReferences: Record<string, number> = {};
const changingToast = (key: string, level: 'warn' | 'success', msg: string) => {
	let toastClass = 'toast-default';
	let initial = 1;
	if (level === 'warn') {
		toastClass = 'toast-yellow';
		initial = 0;
	} else if (level === 'success') {
		toastClass = 'toast-green';
	}
	const options = { msg, initial, classes: [toastClass] };
	if (toastReferences[key]) {
		toastLib.pop(toastReferences[key]);
	}
	toastReferences[key] = toastLib.push(options);
};

const removeAll = () => {
	toastLib.pop(0);
};

export const toast = {
	info: infoToast,
	warn: warnToast,
	success: successToast,
	error: errorToast,
	terminal: terminalToast,
	changeable: changingToast,
	removeAll
};
