import fs from 'node:fs';
import {
	ExpressiveCodeTheme,
	defineEcConfig,
	pluginFramesTexts,
} from 'astro-expressive-code';

const jsoncString = fs.readFileSync(
	new URL('./src/utils/ec-mono-light.jsonc', import.meta.url),
	'utf-8',
);
const custom = ExpressiveCodeTheme.fromJSONString(jsoncString);

pluginFramesTexts.addLocale('en', {
	terminalWindowFallbackTitle: 'Terminal',
	copyButtonTooltip: 'Copy code into clipboard',
	copyButtonCopied: 'copied to clipboard',
});

pluginFramesTexts.addLocale('de', {
	terminalWindowFallbackTitle: 'Terminal',
	copyButtonTooltip: 'Code-Abschnitt in die Zwischenablage kopieren',
	copyButtonCopied: 'erfolgreich kopiert',
});

export default defineEcConfig({
	themes: [custom, 'vesper'],
	useDarkModeMediaQuery: false,
	themeCssSelector: (theme) => {
		if (theme.type === 'dark') return '.dark';
		return false;
	},
	minSyntaxHighlightingColorContrast: 0,
	frames: {
		removeCommentsWhenCopyingTerminalFrames: true,
	},
	defaultProps: {
		wrap: true,
	},
	styleOverrides: {
		borderColor: (context) => {
			return context.theme.type === 'dark'
				? 'var(--color-neutral-800)'
				: 'var(--color-neutral-300)';
		},
		codeBackground: 'var(--color-transparent)',
		codeFontFamily: 'var(--font-mono)',
		uiFontFamily: 'var(--font-sans)',
		frames: {
			shadowColor: 'var(--color-transparent)',
			inlineButtonBorderOpacity: '0%',
			inlineButtonBackground: 'var(--color-transparent)',
			inlineButtonForeground: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-600)'
					: 'var(--color-neutral-500)';
			},
			tooltipSuccessForeground: 'var(--color-neutral-500)',
			tooltipSuccessBackground: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-800)'
					: 'var(--color-neutral-300)';
			},
			terminalTitlebarBackground: 'var(--color-transparent)',
			terminalTitlebarForeground: 'var(--color-neutral-500)',
			terminalBackground: 'var(--color-transparent)',
			terminalTitlebarDotsOpacity: '100%',
			terminalTitlebarDotsForeground: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-700)'
					: 'var(--color-neutral-400)';
			},
			terminalTitlebarBorderBottomColor: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-800)'
					: 'var(--color-neutral-300)';
			},
			editorActiveTabIndicatorBottomColor: 'var(--color-neutral-500)',
			editorActiveTabIndicatorTopColor: 'var(--color-transparent)',
			editorActiveTabBackground: 'var(--color-transparent)',
			editorActiveTabForeground: 'var(--color-neutral-500)',
			editorTabBarBackground: 'var(--color-transparent)',
			editorTabBarBorderBottomColor: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-800)'
					: 'var(--color-neutral-300)';
			},
			editorActiveTabBorderColor: (context) => {
				return context.theme.type === 'dark'
					? 'var(--color-neutral-800)'
					: 'var(--color-neutral-300)';
			},
		},
	},
});
