import { renderHtml, respondHTML } from './html';
import { isValidJSONC } from './shared';

export interface Env {}

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
