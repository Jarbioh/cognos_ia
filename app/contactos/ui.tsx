'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ContactosClient() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ name: 'Inês Fictícia', email: 'ines.ficticia@cognos-ia.edu', subject: 'Parceria académica', message: 'Olá, gostaria de saber mais sobre os workshops e a adesão institucional.' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    setOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Contactos</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Informações</Typography>
            <Typography variant="body2" color="text.secondary">Email: contacto@cognos-ia.edu<br/>Telefone: +258 21 000 000<br/>Morada: Campus Universitário, Beira, Moçambique</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Box component="form" noValidate aria-label="Formulário de contacto" onSubmit={submit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField required fullWidth label="Nome" name="name" value={values.name} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField required fullWidth type="email" label="Email" name="email" value={values.email} onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Assunto" name="subject" value={values.subject} onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Mensagem" name="message" multiline minRows={4} value={values.message} onChange={handleChange} /></Grid>
              </Grid>
              <Button sx={{ mt: 2 }} type="submit" variant="contained">Enviar</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={2500} onClose={()=>setOpen(false)}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>Mensagem enviada (simulada).</Alert>
      </Snackbar>
    </Container>
  );
}
