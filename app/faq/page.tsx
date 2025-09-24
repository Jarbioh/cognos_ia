import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const metadata: Metadata = {
  title: 'FAQ — Cognos IA',
  description: 'Perguntas frequentes sobre a plataforma e princípios.',
  openGraph: { images:['/logo-wordmark.png'] },
  alternates: { canonical: '/faq' },
  keywords: ['Cognos IA','FAQ','dúvidas','suporte'],
};

const faqs = [
  { q: 'A Cognos IA substitui professores?', a: 'Não. A plataforma apoia a prática pedagógica, libertando tempo para atividades criativas e acompanhamento individual.' },
  { q: 'Quem pode usar a plataforma?', a: 'Estudantes, docentes, investigadores e instituições que queiram explorar IA responsável aplicada à educação.' },
  { q: 'Como é assegurada a privacidade dos meus dados?', a: 'Seguimos princípios de proteção de dados (RGPD), com minimização, consentimento informado e transparência.' },
  { q: 'É possível integrar com LMS (ex.: Moodle)?', a: 'Sim. Integrações com LMS fazem parte do roadmap e já estão em fase de testes internos (fictício).' },
  { q: 'Existem custos?', a: 'Para efeitos de demonstração e testes, consideramos acesso gratuito (conteúdo fictício).' },
  { q: 'Há suporte para acessibilidade?', a: 'Sim, seguimos WCAG 2.1 AA: contraste, foco visível, landmarks e navegação por teclado.' },
];

export default function Page(){
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>FAQ</Typography>
      {faqs.map((f, i)=>(
        <Accordion key={i} defaultExpanded={i===0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${i}-content`} id={`faq-%${i}-header`}>
            <Typography variant="subtitle1">{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails id={`faq-${i}-content`}>
            <Typography variant="body2">{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
