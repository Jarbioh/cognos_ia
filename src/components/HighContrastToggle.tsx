'use client';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ContrastIcon from '@mui/icons-material/Contrast';
import Tooltip from '@mui/material/Tooltip';
import { ColorModeContext } from '@/theme/ThemeRegistry';

export default function HighContrastToggle(){
  const { prefs, setPrefs } = React.useContext(ColorModeContext);
  const enabled = !!prefs.highContrast;
  return (
    <Tooltip title={enabled ? 'Desativar alto contraste' : 'Ativar alto contraste'}>
      <IconButton aria-label="Alternar alto contraste" onClick={()=>setPrefs({ ...prefs, highContrast: !enabled })}>
        <ContrastIcon />
      </IconButton>
    </Tooltip>
  );
}
