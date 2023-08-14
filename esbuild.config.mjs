import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit one of the following:
https://hg.bolt80.com/obsidian-remember-file-state
https://hg.sr.ht/~ludovicchabant/obsidian-remember-file-state
https://github.com/ludovicchabant/obsidian-remember-file-state
*/
`;

const prod = (process.argv[2] === 'production');

var outdir = (process.argv[2] === 'dogfood' ? process.argv[3] : '');
if (outdir != undefined && outdir != '') {
	if (outdir.slice(-1) != '/' && outdir.slice(-1) != "\\") {
		outdir += '/';
	}
} else {
	throw("Please provide an output directory to put the dog food into");
}

const outfile = outdir + 'main.js';

esbuild.build({
	banner: {
		js: banner,
	},
	entryPoints: ['src/main.ts'],
	bundle: true,
	external: [
		'obsidian',
		'electron',
		'@codemirror/autocomplete',
		'@codemirror/closebrackets',
		'@codemirror/collab',
		'@codemirror/commands',
		'@codemirror/comment',
		'@codemirror/fold',
		'@codemirror/gutter',
		'@codemirror/highlight',
		'@codemirror/history',
		'@codemirror/language',
		'@codemirror/lint',
		'@codemirror/matchbrackets',
		'@codemirror/panel',
		'@codemirror/rangeset',
		'@codemirror/rectangular-selection',
		'@codemirror/search',
		'@codemirror/state',
		'@codemirror/stream-parser',
		'@codemirror/text',
		'@codemirror/tooltip',
		'@codemirror/view',
		...builtins],
	format: 'cjs',
	watch: !prod,
	target: 'es2016',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outfile: outfile,
}).catch(() => process.exit(1));
