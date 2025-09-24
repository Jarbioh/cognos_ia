'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';

const items = [
  { q:'A Cognos IA transformou as minhas aulas, poupando tempo na preparação.', a:'Ana, Docente (fictício)' },
  { q:'Gostei dos workshops práticos — foco no essencial.', a:'Carlos, Estudante (fictício)' },
  { q:'A Carta de Princípios dá confiança no uso da tecnologia.', a:'Helena, Coordenadora (fictício)' },
];

export default function Testimonials(){
  const [i,setI]=React.useState(0);
  const prev=()=>setI((i-1+items.length)%items.length);
  const next=()=>setI((i+1)%items.length);
  React.useEffect(()=>{
    const id = setInterval(next, 6000);
    return ()=>clearInterval(id);
  },[i]);
  const it = items[i];
  return (
    <Box role="region" aria-label="Testemunhos" sx={{ display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:1 }}>
      <IconButton aria-label="Anterior" onClick={prev}><ArrowBackIosNew fontSize="small" /></IconButton>
      <Paper sx={{ p:2 }}>
        <Typography variant="body1" sx={{ fontStyle:'italic' }}>&ldquo;{it.q}&rdquo;</Typography>
        <Typography variant="caption" color="text.secondary">— {it.a}</Typography>
      </Paper>
      <IconButton aria-label="Seguinte" onClick={next}><ArrowForwardIos fontSize="small" /></IconButton>
    </Box>
  );
}
