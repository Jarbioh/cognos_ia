'use client';

import * as React from 'react';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Author = 'Cognos' | 'Tu' | 'Sistema';
type Msg = { from: Author; text: string; ts: number; actions?: Array<{ label: string; route?: string; href?: string }> };

const STORAGE_KEY = 'cognos-chat-v1';

function saveHistory(msgs: Msg[], memory: Memory) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ msgs, memory }));
  } catch {}
}
function loadHistory(): { msgs: Msg[]; memory: Memory } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

type Memory = {
  name?: string;
  lastIntent?: string;
  acceptedPrivacy?: boolean;
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ------------------------- Motor simples de intenções --------------------------
function detectIntent(utterance: string): { intent: string; slots?: Record<string, string> } {
  const text = utterance.toLowerCase().trim();

  // comandos explícitos
  if (text.startsWith('/limpar')) return { intent: 'clear' };
  if (text.startsWith('/exportar')) return { intent: 'export' };
  if (text.startsWith('/ajuda')) return { intent: 'help' };
  if (text.startsWith('/privacidade')) return { intent: 'privacy' };

  // nome: "meu nome é X" | "chamo-me X" | "sou o X"
  const nomeMatch = text.match(/\b(meu\s+nome\s+é|chamo-?me|sou)\s+([a-zá-úçãõâêîôûäëïöü\- ]{2,})$/i);
  if (nomeMatch) return { intent: 'set_name', slots: { name: nomeMatch[2].trim() } };

  // saudações
  if (/\b(olá|ola|bom dia|boa tarde|boa noite|hey|oi)\b/.test(text)) return { intent: 'greet' };

  // intenções por palavras-chave
  if (/\b(curso|formação|workshop|treinamento)\b/.test(text)) return { intent: 'courses' };
  if (/\b(missão|proposta|objetivo|visão|valores)\b/.test(text)) return { intent: 'mission' };
  if (/\b(carta|princípios|principios|ética|etica)\b/.test(text)) return { intent: 'charter' };
  if (/\b(noticias|notícias|novidades)\b/.test(text)) return { intent: 'news' };
  if (/\b(evento|agenda|calendário|calendario)\b/.test(text)) return { intent: 'events' };
  if (/\b(contacto|contato|email|telefone|morada|endereço|endereco)\b/.test(text)) return { intent: 'contacts' };
  if (/\b(preço|preço|mensalidade|licença|licenca|planos?)\b/.test(text)) return { intent: 'pricing' };
  if (/\b(entrar|login|acesso|plataforma)\b/.test(text)) return { intent: 'platform' };
  if (/\b(horário|horario|funcionamento)\b/.test(text)) return { intent: 'hours' };
  if (/\b(ajuda|help|como usar)\b/.test(text)) return { intent: 'help' };

  return { intent: 'fallback' };
}

function formatWelcome(memory: Memory): Msg[] {
  const hello = memory.name ? `Olá, ${memory.name}!` : 'Olá!';
  return [
    { from: 'Cognos', text: `${hello} Sou o chatbot da Cognos IA. Escreve a tua pergunta ou usa /ajuda para ver comandos.`, ts: Date.now() },
    {
      from: 'Cognos',
      text: 'Queres ver cursos, missão ou a carta de princípios?',
      ts: Date.now(),
      actions: [
        { label: 'Cursos', route: '/formacao' },
        { label: 'Missão', route: '/missao' },
        { label: 'Carta', route: '/carta' },
      ],
    },
  ];
}

async function respond(
  input: string,
  history: Msg[],
  memory: Memory,
): Promise<{ replies: Msg[]; memory: Memory }> {
  const { intent, slots } = detectIntent(input);

  const now = () => Date.now();
  const replies: Msg[] = [];
  let mem = { ...memory, lastIntent: intent };

  // Primeira interação: pedir aceite de privacidade (mock)
  if (!mem.acceptedPrivacy && intent !== 'privacy') {
    replies.push({
      from: 'Cognos',
      text:
        'Antes de começarmos, aceita a nossa política de privacidade fictícia (não guardamos dados sensíveis neste demo). Escreve /privacidade para aceitar.',
      ts: now(),
    });
    return { replies, memory: mem };
  }

  switch (intent) {
    case 'clear':
      return { replies: [{ from: 'Cognos', text: 'Histórico limpo. Podemos recomeçar!', ts: now() }], memory: mem };

    case 'export':
      replies.push({ from: 'Cognos', text: 'A exportação vai gerar um JSON com o teu histórico local.', ts: now() });
      return { replies, memory: mem };

    case 'privacy':
      mem.acceptedPrivacy = true;
      replies.push({ from: 'Cognos', text: 'Perfeito! Privacidade aceite. Como posso ajudar?', ts: now() });
      replies.push({
        from: 'Cognos',
        text: 'Sugestões rápidas:',
        ts: now(),
        actions: [
          { label: 'Ver cursos', route: '/formacao' },
          { label: 'Contactos', route: '/contactos' },
          { label: 'Entrar na plataforma', href: 'https://app.cognos-ia.edu' },
        ],
      });
      return { replies, memory: mem };

    case 'set_name':
      if (slots?.name) {
        mem.name = slots.name.replace(/\b\w/g, (m) => m.toUpperCase());
        replies.push({ from: 'Cognos', text: `Prazer, ${mem.name}!`, ts: now() });
      } else {
        replies.push({ from: 'Cognos', text: 'Como te chamas?', ts: now() });
      }
      return { replies, memory: mem };

    case 'greet':
      replies.push({ from: 'Cognos', text: mem.name ? `Olá, ${mem.name}!` : 'Olá! 👋', ts: now() });
      return { replies, memory: mem };

    case 'courses':
      replies.push({
        from: 'Cognos',
        text:
          'Temos trilhas fictícias: IA Responsável, Fundamentos de ML e LLMs aplicados à educação. Queres ver detalhes na página de Formação?',
        ts: now(),
        actions: [{ label: 'Abrir Formação', route: '/formacao' }],
      });
      return { replies, memory: mem };

    case 'mission':
      replies.push({
        from: 'Cognos',
        text:
          'A nossa missão é promover o uso responsável da IA na educação. Posso abrir a página com a visão e compromissos.',
        ts: now(),
        actions: [{ label: 'Ver Missão', route: '/missao' }],
      });
      return { replies, memory: mem };

    case 'charter':
      replies.push({
        from: 'Cognos',
        text: 'A Carta de Princípios resume ética, transparência e segurança. Queres abrir a Carta?',
        ts: now(),
        actions: [{ label: 'Abrir Carta', route: '/carta' }],
      });
      return { replies, memory: mem };

    case 'news':
      replies.push({
        from: 'Cognos',
        text:
          'Em breve vamos integrar um CMS. Por agora, tens uma lista estática de notícias.',
        ts: now(),
        actions: [{ label: 'Ver Notícias', route: '/noticias' }],
      });
      return { replies, memory: mem };

    case 'events':
      replies.push({
        from: 'Cognos',
        text:
          'Agenda de eventos fictícia disponível e preparada para integração futura.',
        ts: now(),
        actions: [{ label: 'Ver Eventos', route: '/eventos' }],
      });
      return { replies, memory: mem };

    case 'contacts':
      replies.push({
        from: 'Cognos',
        text:
          'Podes falar connosco via e-mail ou formulário. Abro a página de Contactos?',
        ts: now(),
        actions: [{ label: 'Abrir Contactos', route: '/contactos' }],
      });
      return { replies, memory: mem };

    case 'pricing':
      replies.push({
        from: 'Cognos',
        text:
          'Planos fictícios: Educacional (grátis), Pro (instituições) e Enterprise (apoio dedicado). Podemos enviar uma proposta fictícia.',
        ts: now(),
      });
      return { replies, memory: mem };

    case 'platform':
      replies.push({
        from: 'Cognos',
        text: 'Para entrar na plataforma, usa o botão abaixo.',
        ts: now(),
        actions: [{ label: 'Entrar na Plataforma', href: 'https://app.cognos-ia.edu' }],
      });
      return { replies, memory: mem };

    case 'hours':
      replies.push({
        from: 'Cognos',
        text: 'Horário fictício: Seg-Sex 09:00–18:00, GMT+2.',
        ts: now(),
      });
      return { replies, memory: mem };

    case 'help':
      replies.push({
        from: 'Cognos',
        text:
          'Comandos: /ajuda, /limpar, /exportar, /privacidade. Também entendo: cursos, missão, carta, contactos, eventos, notícias, preços, plataforma.',
        ts: now(),
      });
      return { replies, memory: mem };

    default:
      replies.push({
        from: 'Cognos',
        text:
          'Ainda não percebi. Podes reformular? Exemplos: “Quero cursos de IA”, “Mostra a missão”, “Contactos”.',
        ts: now(),
      });
      return { replies, memory: mem };
  }
}

// ------------------------- Componente UI --------------------------
export default function ChatbotButton() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const [memory, setMemory] = React.useState<Memory>({});
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const fabRef = React.useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const saved = loadHistory();
    if (saved) {
      setMsgs(saved.msgs);
      setMemory(saved.memory);
    } else {
      const welcome = formatWelcome({});
      setMsgs(welcome);
    }
  }, []);

  React.useEffect(() => {
    saveHistory(msgs, memory);
    // rolar para o fim quando chegam mensagens
    if (listRef.current) {
      requestAnimationFrame(() => {
        listRef.current!.scrollTop = listRef.current!.scrollHeight;
      });
    }
  }, [msgs, memory]);

  React.useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ msgs, memory }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cognos-chat.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const append = (m: Msg | Msg[]) => setMsgs((old) => [...old, ...(Array.isArray(m) ? m : [m])]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    append({ from: 'Tu', text, ts: Date.now() });
    setInput('');
    setTyping(true);

    // comandos que precisam agir antes de responder
    if (text.startsWith('/limpar')) {
      await delay(200);
      const welcome = formatWelcome(memory);
      setMsgs(welcome);
      setTyping(false);
      return;
    }
    if (text.startsWith('/exportar')) {
      handleExport();
    }

    // “latência” de digitação
    await delay(300);

    const { replies, memory: newMem } = await respond(text, msgs, memory);
    // outra pausa para UX
    await delay(200);
    append(replies);
    setMemory(newMem);
    setTyping(false);
  };

  const handleAction = (action: { label: string; route?: string; href?: string }) => {
    if (action.route) {
      router.push(action.route);
      setOpen(false);
    } else if (action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {!open && (
        <Fab
          ref={fabRef}
          aria-label="Abrir chatbot Cognos"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            width: 80,
            height: 80,
            p: 0,
            minHeight: 0,
            borderRadius: '50%',
            bgcolor: '#d54226',
            color: '#fff',
            boxShadow: 5,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: (t) => t.zIndex.appBar + 1,
            '&:hover': { bgcolor: '#b3341d', boxShadow: 8, transform: 'scale(1.04)' },
          }}
        >
          <Image
            src="/c-cognos.png"
            alt="Chatbot Cognos"
            width={44}
            height={44}
            style={{ width: 44, height: 44, objectFit: 'contain' }}
            priority
          />
        </Fab>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="chatbot-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="chatbot-title" sx={{ pr: 6 }}>
          Chatbot — Cognos
          <IconButton aria-label="Fechar" onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <List
            ref={listRef}
            role="log"
            aria-live="polite"
            sx={{
              p: 2,
              height: 360,
              overflowY: 'auto',
              '& li': { px: 0 },
            }}
          >
            {msgs.map((m, i) => (
              <React.Fragment key={m.ts + '-' + i}>
                <ListItem sx={{ justifyContent: m.from === 'Tu' ? 'flex-end' : 'flex-start' }}>
                  <ListItemText
                    primary={m.text}
                    secondary={m.from}
                    sx={{
                      maxWidth: '85%',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: m.from === 'Tu' ? 'primary.main' : 'action.hover',
                      color: m.from === 'Tu' ? 'primary.contrastText' : 'text.primary',
                      '& .MuiListItemText-secondary': {
                        color: m.from === 'Tu' ? 'primary.contrastText' : 'text.secondary',
                        opacity: 0.8,
                      },
                    }}
                  />
                </ListItem>

                {m.actions && m.actions.length > 0 && (
                  <ListItem sx={{ justifyContent: m.from === 'Tu' ? 'flex-end' : 'flex-start' }}>
                    <Stack direction="row" spacing={1} sx={{ maxWidth: '85%', flexWrap: 'wrap' }}>
                      {m.actions.map((a, idx) => (
                        <Chip
                          key={idx}
                          label={a.label}
                          onClick={() => handleAction(a)}
                          clickable
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </ListItem>
                )}

                {i < msgs.length - 1 && <Divider component="li" sx={{ my: 0.5 }} />}
              </React.Fragment>
            ))}

            {typing && (
              <ListItem>
                <ListItemText
                  primary="Cognos está a escrever…"
                  secondary="Cognos"
                  sx={{
                    maxWidth: '60%',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                  }}
                />
              </ListItem>
            )}
          </List>
        </DialogContent>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <DialogActions sx={{ gap: 1, px: 2, py: 1.5 }}>
            <TextField
              inputRef={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              size="small"
              label="Escreve a tua mensagem"
              placeholder='Dica: experimenta "Quero cursos de IA"'
              autoComplete="off"
            />
            <Button type="submit" variant="contained">Enviar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
