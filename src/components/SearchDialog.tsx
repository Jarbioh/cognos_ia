'use client';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

const entries = [
  { title:'Missão', href:'/missao' },
  { title:'Carta de Princípios', href:'/carta' },
  { title:'Formação', href:'/formacao' },
  { title:'Notícias', href:'/noticias' },
  { title:'Eventos', href:'/eventos' },
  { title:'FAQ', href:'/faq' },
  { title:'Contactos', href:'/contactos' },
  { title:'Carta — Transparência', href:'/carta#transparencia' },
  { title:'Carta — Privacidade', href:'/carta#privacidade' },
];

export default function SearchDialog({open,onClose}:{open:boolean; onClose:()=>void}){
  const [q,setQ]=React.useState('');
  const router = useRouter();
  const results = entries.filter(e=>e.title.toLowerCase().includes(q.toLowerCase()));
  const go=(href:string)=>{ onClose(); router.push(href); };
  React.useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); onClose(); go('/'); } };
    return ()=>{};
  },[]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-label="Pesquisa global">
      <DialogTitle>Pesquisar</DialogTitle>
      <Box sx={{ px:3, pb:2 }}>
        <TextField autoFocus fullWidth placeholder="Ex.: Carta, Missão, Eventos… (atalho Ctrl/⌘+K)" value={q} onChange={e=>setQ(e.target.value)} />
      </Box>
      <List>
        {results.map(r=>(
          <ListItem key={r.href} disablePadding>
            <ListItemButton onClick={()=>go(r.href)} component={Link as any} href={r.href}>
              <ListItemText primary={r.title} secondary={r.href} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
