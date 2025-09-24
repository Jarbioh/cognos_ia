'use client';
import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette { surface: Palette['primary']; card: Palette['primary']; }
  interface PaletteOptions { surface?: PaletteOptions['primary']; card?: PaletteOptions['primary']; }
}

export type UiPrefs = { highContrast?: boolean };

const PRIMARY = '#d54226';
const SECONDARY = '#ff7a66';

const base = {
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'].join(','),
    h1: { fontFamily: 'Poppins, Inter, system-ui' },
    h2: { fontFamily: 'Poppins, Inter, system-ui' },
    h3: { fontFamily: 'Poppins, Inter, system-ui' },
    h4: { fontFamily: 'Poppins, Inter, system-ui' },
    h5: { fontFamily: 'Poppins, Inter, system-ui' },
    h6: { fontFamily: 'Poppins, Inter, system-ui' },
  },
} as const;

export default function getTheme(mode: 'light' | 'dark', prefs: UiPrefs = {}) {
  const isDark = mode === 'dark';
  const palette = isDark
    ? { mode: 'dark' as const, background: { default: '#0D1422', paper: '#131B2E' }, surface: { main: '#131B2E' } as any, card: { main: '#151C30' } as any, primary: { main: PRIMARY }, secondary: { main: SECONDARY }, text: { primary: 'rgba(255,255,255,.94)', secondary: 'rgba(255,255,255,.72)' } }
    : { mode: 'light' as const, background: { default: '#F7F9FC', paper: '#FFFFFF' }, surface: { main: '#FFFFFF' } as any, card: { main: '#F3F5FA' } as any, primary: { main: PRIMARY }, secondary: { main: SECONDARY }, text: { primary: '#0D1422', secondary: 'rgba(13,20,34,.72)' } };

  return createTheme({
    ...base, palette,
    components: {
      MuiCssBaseline: { styleOverrides: () => ({
        body: {
          backgroundColor: palette.background.default,
          backgroundImage: isDark
            ? `radial-gradient(circle at 20% 20%, ${alpha(palette.primary.main,0.18)} 0, transparent 42%),
               radial-gradient(circle at 80% 0%, ${alpha(palette.secondary.main,0.15)} 0, transparent 35%)`
            : `radial-gradient(circle at 18% 18%, ${alpha(palette.primary.main,0.09)} 0, transparent 35%),
               radial-gradient(circle at 85% 10%, ${alpha(palette.secondary.main,0.09)} 0, transparent 28%)`,
          backgroundAttachment: 'fixed',
          transition: 'background-color .3s ease, color .2s ease' as any,
        },
        '*:focus-visible': { outline: `2px solid ${palette.primary.main}`, outlineOffset: 2 },
        '.skip-link': { position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' },
        '.skip-link:focus': { left: 16, top: 16, width: 'auto', height: 'auto', zIndex: 2000, padding: '8px 12px', borderRadius: 8, background: (palette as any).card?.main || palette.background.paper },
        'html': { scrollBehavior: 'smooth' },
        '[id]': { scrollMarginTop: '96px' }
      })},
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiLink: { defaultProps: { underline: 'hover' }, styleOverrides: { root: ({ theme }) => ({ color: theme.palette.primary.main }) } },
      MuiButton: { styleOverrides: { root: { borderRadius: 12, textTransform: 'none', fontWeight: 600 }, containedPrimary: { color: '#fff' } } },
      MuiCard: { styleOverrides: { root: { backgroundColor: isDark ? '#151C30' : '#F3F5FA', borderRadius: 16 } } },
      MuiPaginationItem: { styleOverrides: { root: { '&.Mui-selected': { backgroundColor: alpha(palette.primary.main, 0.15) } } } },
    },
    ...(prefs.highContrast ? {
      palette: { ...palette, primary: { main: '#b1321b' }, secondary: { main: '#bf4f3e' }, divider: '#000' },
    } : {}),
  });
}
