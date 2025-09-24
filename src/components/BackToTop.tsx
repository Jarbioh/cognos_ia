'use client';
import * as React from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';

export default function BackToTop(){
  const [show, setShow] = React.useState(false);
  React.useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <Zoom in={show}>
      <Fab aria-label="Voltar ao topo" size="small" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}
           sx={{ position:'fixed', right:16, bottom:80, zIndex:1400 }}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
