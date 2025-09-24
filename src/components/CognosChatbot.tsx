'use client';
import * as React from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

type Msg = { from: 'user'|'bot', text: string, ts: number };

export default function CognosChatbot() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [msgs, setMsgs] = React.useState<Msg[]>(() => {
    if (typeof window === 'undefined') return [{ from:'bot', text:'Olá! Sou o Cognos 🤖. Como posso ajudar?', ts: Date.now() }];
    const saved = window.sessionStorage.getItem('cognos-chat');
    return saved ? JSON.parse(saved) : [{ from:'bot', text:'Olá! Sou o Cognos 🤖. Como posso ajudar?', ts: Date.now() }];
  });

  React.useEffect(()=>{
    if (typeof window !== 'undefined') window.sessionStorage.setItem('cognos-chat', JSON.stringify(msgs));
  },[msgs]);

  const sendText = (text: string) => {
    setMsgs(m => [...m, { from:'user', text, ts: Date.now() }]);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = 'Entendi. Obrigado pela mensagem!';
      if (lower.includes('curso') || lower.includes('formação')) reply = 'Veja a página Formação — pode filtrar e encontrar workshops.';
      if (lower.includes('evento')) reply = 'Em Eventos listamos a agenda; integração CMS virá em breve.';
      if (lower.includes('contacto') || lower.includes('email')) reply = 'Contacte-nos pelo formulário em Contactos ou via contacto@cognos-ia.edu.';
      if (lower.includes('olá') || lower.includes('ola')) reply = 'Olá! 🙂';
      setMsgs(m2 => [...m2, { from:'bot', text: reply, ts: Date.now() }]);
    }, 350);
  };

  const send = () => { if (input.trim()) { const t=input.trim(); setInput(''); sendText(t);} };

  const quick = ['Cursos disponíveis','Próximos eventos','Contactos','Ajuda'];
  return (
    <>
      {open && (
        <Box sx={{ position:'fixed', right: 16, bottom: 96, zIndex: 1400, width: { xs: 320, sm: 360 } }}>
          <Paper elevation={6} sx={{ p: 1.5, borderRadius: 2 }} aria-label="Cognos Chatbot">
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Cognos — Assistente</Typography>
              <IconButton size="small" onClick={() => setOpen(false)} aria-label="Fechar chat"><CloseIcon fontSize="small" /></IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display:'flex', gap:1, flexWrap:'wrap', mb:1 }}>
              {quick.map(q => <Chip key={q} label={q} onClick={()=>sendText(q)} clickable size="small" />)}
            </Box>
            <Box sx={{ maxHeight: 280, overflowY: 'auto', display:'grid', gap: 1.5, pr: .5 }}>
              {msgs.map((m, i) => (
                <Box key={i} sx={{ display:'flex', justifyContent: m.from==='user'?'flex-end':'flex-start' }}>
                  <Box sx={{ px:1.25, py:.75, borderRadius: 1.5, bgcolor: m.from==='user'?'primary.main':'card.main', color: m.from==='user'?'#fff':'text.primary', maxWidth:'80%' }}>
                    <Typography variant="body2">{m.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ display:'flex', gap: 1, mt: 1 }}>
              <TextField size="small" fullWidth placeholder="Escreva aqui..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); }}} />
              <Button variant="contained" onClick={send}>Enviar</Button>
            </Box>
          </Paper>
        </Box>
      )}
      <Fab color="primary" aria-label="Abrir chatbot Cognos" onClick={()=>setOpen(o=>!o)} sx={{ position:'fixed', right:16, bottom:16, zIndex:1400 }}>
        <ChatIcon />
      </Fab>
    </>
  );
}
