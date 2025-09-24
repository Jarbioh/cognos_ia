import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PrintButton from '@/components/PrintButton';
import ReadingProgress from '@/components/ReadingProgress';
import StickyToc from '@/components/StickyToc';
import { FadeIn } from '@/components/FX';

export const metadata: Metadata = {
  title: 'Carta de Princípios — Cognos IA',
  description: 'Compromissos éticos e diretrizes para o uso responsável de IA na educação.',
  openGraph: { images:['/logo-wordmark.png'] },
  alternates: { canonical: '/carta' },
  keywords: ['Cognos IA','carta de princípios','ética','IA','educação'],
};

const sections = [
  { id:'transparencia', t:'Transparência', d:'Explicitar objetivos, fontes de dados, limitações dos modelos e política de atualização dos sistemas. Garantir documentação clara e auditável.' },
  { id:'equidade', t:'Equidade', d:'Mitigar enviesamentos, avaliar impactos em grupos vulneráveis e promover acesso inclusivo ao ecossistema tecnológico.' },
  { id:'privacidade', t:'Privacidade e Proteção de Dados', d:'Aplicar princípios de minimização, consentimento informado e segurança por design, em linha com o RGPD e normas internacionais.' },
  { id:'seguranca', t:'Segurança', d:'Realizar avaliações de risco, testes de robustez, monitorização contínua e planos de mitigação para incidentes.' },
  { id:'responsabilidade', t:'Responsabilidade', d:'Atribuir responsabilidades claras e mecanismos de prestação de contas. Incentivar o reporte responsável de vulnerabilidades.' },
  { id:'sustentabilidade', t:'Sustentabilidade', d:'Alinhar práticas com ODS, otimizar consumo energético e incentivar infraestruturas eficientes.' },
  { id:'participacao', t:'Participação', d:'Promover diálogo aberto entre estudantes, docentes, investigadores e sociedade civil, com processos de feedback.' },
];

export default function Page(){
  return (
    <>
      <ReadingProgress />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
          <Typography variant="h3">Carta de Princípios</Typography>
          <PrintButton />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3} sx={{ display: { xs:'none', md:'block' } }}>
            <StickyToc items={sections.map(s=>({ id:s.id, label:s.t }))} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            {sections.map((s, i)=>(
              <Accordion key={s.id} defaultExpanded={i===0} id={s.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FadeIn><Typography variant="h6">{s.t}</Typography></FadeIn>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{s.d}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
