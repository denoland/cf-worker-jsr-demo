import * as JSONC from '@jsr/std__jsonc';
import { renderHtml, respondHTML } from './html';

export interface Env {}

export function isValidJSONC(input: string): boolean {
	try {
		JSONC.parse(input);
		return true;
	} catch (err) {
		return false;
	}
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (req.method === 'GET') {
			const html = renderHtml({ status: 'empty' });
			return respondHTML(html);
		} else if (req.method === 'POST') {
			const form = await req.formData();
			const input = form.get('data') as string;

			const valid = isValidJSONC(input);
			const html = renderHtml({ status: valid ? 'ok' : 'error', input });
			return respondHTML(html);
		} else {
			return new Response('Only supports POST or GET requests');
		}
	},
};
