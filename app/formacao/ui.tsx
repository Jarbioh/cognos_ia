'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const cursos = [
  { id:1, titulo:'Introdução à IA Responsável', nivel:'Iniciante' },
  { id:2, titulo:'Prompt Engineering Prático', nivel:'Intermédio' },
  { id:3, titulo:'RAG para Educação', nivel:'Avançado' },
];

export default function FormacaoClient(){
  const [ok,setOk]=React.useState(false);
  const inscrever = async (id:number) => {
    await fetch('/api/inscricao',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cursoId:id }) });
    setOk(true);
  };
  const jsonLdCourses = {
    "@context":"https://schema.org",
    "@type":"ItemList",
    "itemListElement": cursos.map((c,idx)=>({"@type":"Course","name":c.titulo,"position": idx+1}))
  };
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Formação</Typography>
      <Grid container spacing={3}>
        {cursos.map(c=>(
          <Grid key={c.id} item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.titulo}</Typography>
                <Chip size="small" label={c.nivel} sx={{ my: 1 }} />
                <Button onClick={()=>inscrever(c.id)} variant="contained">Inscrever</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={ok} autoHideDuration={2200} onClose={()=>setOk(false)}>
        <Alert severity="success" variant="filled">Inscrição registada (simulada).</Alert>
      </Snackbar>
      <script type="application/ld+json">{JSON.stringify(jsonLdCourses)}</script>
    </Container>
  );
}
