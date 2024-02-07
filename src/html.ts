import { escape } from '@jsr/std__html';

const DEFAULT = `{
	// This is a comment
	"foo": "bar",
	"baz": [
		1,
		// This is another comment
		2,
		3
	]
}`;

export function renderHtml({ status, input = DEFAULT }: { status: 'ok' | 'error' | 'empty'; input?: string }) {
	return `
<!DOCTYPE html>
<html>
<head>
	<title>JSONC validator</title>
	<style>
		* { box-sizing: border-box; }
		body { font-family: sans-serif; }
		.page { max-width: 40rem; margin: 4rem auto; text-align: center}
		.page * + * { margin-top: 1rem; }
		textarea {
			text-align: left;
			display: block;
			width: 100%;
			height: 12rem;
			tab-size: 2;
		}
		.button-62 {
			background: linear-gradient(to bottom right, #EF4765, #FF9A5A);
			border: 0;
			border-radius: 12px;
			color: #FFFFFF;
			cursor: pointer;
			display: inline-block;
			font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
			font-size: 16px;
			font-weight: 500;
			line-height: 2.5;
			outline: transparent;
			padding: 0 1rem;
			text-align: center;
			text-decoration: none;
			transition: box-shadow .2s ease-in-out;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
			white-space: nowrap;
		}

		.button-62:not([disabled]):focus {
			box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
		}

		.button-62:not([disabled]):hover {
			box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
		}

		.message {
			display: block;
			padding: .5rem;
		}
		.success {
			color: green;
		}
		.error {
			color: red;
		}
	</style>
</head>
<body>
	<div class="page">
		<h1>CF Worker JSONC validator</h1>
		<form method="POST">
			<textarea name="data">${escape(input)}</textarea>
			${
				status === 'error'
					? `<div class="error message">This is invalid JSONC</div>`
					: status === 'ok'
					? `<div class="success message">This is valid JSONC</div>`
					: ''
			}
			<button class="button-62">validate</button>
	</div>
</body>
</html>
`;
}

export function respondHTML(html: string) {
	return new Response(html, {
		headers: {
			'content-type': 'text/html;charset=UTF-8',
		},
	});
}
