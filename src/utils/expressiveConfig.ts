import expressiveCode, { pluginFramesTexts } from 'astro-expressive-code';

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

const expressiveConfig = expressiveCode({
  themes: ['snazzy-light', 'vesper'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => {
    if (theme.type === 'dark') return '.dark';
    else return false;
  },
  frames: {
    removeCommentsWhenCopyingTerminalFrames: true,
  },
  defaultProps: {
    wrap: true,
  },
  styleOverrides: {
    borderColor: (context) => {
      return context.theme.type === 'dark'
        ? `theme('colors.neutral.800')`
        : `theme('colors.neutral.300')`;
    },
    codeBackground: `theme('colors.transparent')`,
    codeFontFamily: `theme('fontFamily.mono')`,
    uiFontFamily: `theme('fontFamily.sans')`,
    frames: {
      shadowColor: `theme('colors.transparent')`,
      inlineButtonBorderOpacity: '0%',
      inlineButtonBackground: `theme('colors.transparent')`,
      inlineButtonForeground: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.600')`
          : `theme('colors.neutral.500')`;
      },
      tooltipSuccessForeground: `theme('colors.neutral.500')`,
      tooltipSuccessBackground: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.800')`
          : `theme('colors.neutral.300')`;
      },
      terminalTitlebarBackground: `theme('colors.transparent')`,
      terminalTitlebarForeground: `theme('colors.neutral.500')`,
      terminalBackground: `theme('colors.transparent')`,
      terminalTitlebarDotsOpacity: '100%',
      terminalTitlebarDotsForeground: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.700')`
          : `theme('colors.neutral.400')`;
      },
      terminalTitlebarBorderBottomColor: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.800')`
          : `theme('colors.neutral.300')`;
      },
      editorActiveTabIndicatorBottomColor: `theme('colors.neutral.500')`,
      editorActiveTabIndicatorTopColor: `theme('colors.transparent')`,
      editorActiveTabBackground: `theme('colors.transparent')`,
      editorActiveTabForeground: `theme('colors.neutral.500')`,
      editorTabBarBackground: `theme('colors.transparent')`,
      editorTabBarBorderBottomColor: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.800')`
          : `theme('colors.neutral.300')`;
      },
      editorActiveTabBorderColor: (context) => {
        return context.theme.type === 'dark'
          ? `theme('colors.neutral.800')`
          : `theme('colors.neutral.300')`;
      },
    },
  },
});

export default expressiveConfig;
