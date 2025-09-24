'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';

const all = Array.from({length:15}).map((_,i)=>({ title:`Evento ${i+1}`, date:`2025-1${(i%2)}-1${(i%9)}`, place: i%2? 'Auditório Principal':'Online' }));

export default function EventosClient(){
  const [q,setQ]=React.useState('');
  const [page,setPage]=React.useState(1);
  const pageSize=5;
  const filtered=all.filter(e=>e.title.toLowerCase().includes(q.toLowerCase()));
  const pageCount=Math.max(1, Math.ceil(filtered.length/pageSize));
  const slice=filtered.slice((page-1)*pageSize, page*pageSize);
  const jsonLdEvents = {
    "@context":"https://schema.org",
    "@type":"ItemList",
    "itemListElement": all.map((e,i)=>({
      "@type":"Event",
      "name": e.title,
      "startDate": e.date,
      "eventAttendanceMode": e.place==='Online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode'
    }))
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Eventos</Typography>
      <TextField fullWidth placeholder="Procurar..." value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} sx={{ mb:2 }} />
      <List>
        {slice.map((e, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={e.title} secondary={`${new Date(e.date).toLocaleDateString('pt-PT')} · ${e.place}`} />
          </ListItem>
        ))}
      </List>
      <Pagination count={pageCount} page={page} onChange={(_,v)=>setPage(v)} sx={{ mt:2, display:'flex', justifyContent:'center' }} />
      <script type="application/ld+json">{JSON.stringify(jsonLdEvents)}</script>
    </Container>
  );
}
