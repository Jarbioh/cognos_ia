'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';

const all = Array.from({length:18}).map((_,i)=>({ title:`Notícia ${i+1}`, date:`2025-0${(i%9)+1}-0${(i%27)+1}`.slice(0,10) }));

export default function NoticiasClient(){
  const [q,setQ]=React.useState('');
  const [page,setPage]=React.useState(1);
  const pageSize=6;
  const filtered=all.filter(n=>n.title.toLowerCase().includes(q.toLowerCase()));
  const pageCount=Math.max(1, Math.ceil(filtered.length/pageSize));
  const slice=filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Notícias</Typography>
      <TextField fullWidth placeholder="Procurar..." value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} sx={{ mb:2 }} />
      <List>
        {slice.map((n, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={n.title} secondary={new Date(n.date).toLocaleDateString('pt-PT')} />
          </ListItem>
        ))}
      </List>
      <Pagination count={pageCount} page={page} onChange={(_,v)=>setPage(v)} sx={{ mt:2, display:'flex', justifyContent:'center' }} />
    </Container>
  );
}
