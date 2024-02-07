import * as JSONC from '@jsr/std__jsonc';
import { escape } from '@jsr/std__html';

export function escapeHtml(input: string) {
	// FIXME
	return escape(input);
}

export function isValidJSONC(input: string): boolean {
	try {
		// FIXME: validate
		JSONC.parse(input);
		return true;
	} catch (err) {
		return false;
	}
}
