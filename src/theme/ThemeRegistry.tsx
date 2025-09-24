'use client';
import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme, { UiPrefs } from './theme';

type Mode = 'light' | 'dark';
export const ColorModeContext = React.createContext<{ mode: Mode; toggle: () => void; prefs: UiPrefs; setPrefs: (p:UiPrefs)=>void }>({
  mode: 'light', toggle: () => {}, prefs: {}, setPrefs: ()=>{}
});

function createEmotionCache() { return createCache({ key: 'mui', prepend: true }); }

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createEmotionCache(), []);
  const [mode, setMode] = React.useState<Mode>('light');
  const [prefs, setPrefs] = React.useState<UiPrefs>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(()=>{
    try {
      const stored = window.localStorage.getItem('cognos-mode') as Mode | null;
      setMode(stored || 'light');
      const prefsRaw = window.localStorage.getItem('cognos-prefs');
      if(prefsRaw) setPrefs(JSON.parse(prefsRaw));
    } catch {}
    setHydrated(true);
  },[]);

  const toggle = React.useCallback(()=>{
    setMode(prev=>{
      const next = prev==='dark' ? 'light':'dark';
      try { window.localStorage.setItem('cognos-mode', next); } catch {}
      return next;
    });
  },[]);

  const theme = React.useMemo(()=>getTheme(mode, prefs),[mode, prefs]);

  useServerInsertedHTML(() => {
    const styles = (cache as any).inserted ? Object.values((cache as any).inserted).join('') : '';
    return <style data-emotion={`${cache.key}`}>{styles}</style>;
  });

  return (
    <CacheProvider value={cache}>
      <ColorModeContext.Provider value={{ mode, toggle, prefs, setPrefs:(p)=>{ setPrefs(p); try{ window.localStorage.setItem('cognos-prefs', JSON.stringify(p)); }catch{} } }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {hydrated ? children : null}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
