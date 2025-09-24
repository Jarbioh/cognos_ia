'use client';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function ReadingProgress() {
  const [value, setValue] = React.useState(0);
  React.useEffect(()=>{
    const onScroll = () => {
      const h = document.documentElement;
      const height = h.scrollHeight - h.clientHeight;
      const scrolled = height > 0 ? (h.scrollTop / height) * 100 : 0;
      setValue(scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <Box sx={{ position:'fixed', top:0, left:0, right:0, zIndex: 2000, pointerEvents: 'none',}} aria-hidden>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
}
