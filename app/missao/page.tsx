import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PrintButton from '@/components/PrintButton';
import InstitutionTimeline from '@/components/InstitutionTimeline';
import Testimonials from '@/components/Testimonials';
import StickyToc from '@/components/StickyToc';

export const metadata: Metadata = {
  title: 'Missão — Cognos IA',
  description: 'Promover o uso responsável de IA na educação, capacitando estudantes, docentes e instituições.',
  openGraph: { images:['/cognos-ia.png'] },
  alternates: { canonical: '/missao' },
  keywords: ['Cognos IA','missão','educação','ética','Moçambique'],
};

const toc = [
  { id:'missao', label:'Missão' },
  { id:'compromissos', label:'Compromissos' },
  { id:'timeline', label:'Linha do tempo' },
  { id:'testemunhos', label:'Testemunhos' },
];

export default function Page(){
  const jsonLd = { "@context":"https://schema.org", "@type":"EducationalOrganization", "name":"Cognos IA", "url":"https://cognos-ia.edu" };
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
        <Typography variant="h3">Missão</Typography>
        <PrintButton />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3} sx={{ display: { xs:'none', md:'block' } }}>
          <StickyToc items={toc} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Typography id="missao" variant="h3" gutterBottom>Missão</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            A Cognos IA tem como missão central promover o uso responsável da Inteligência Artificial no contexto educativo,
            capacitando estudantes, docentes e instituições para um futuro em que tecnologia e humanidade caminham juntas.
          </Typography>
          <Typography id="compromissos" variant="h6" sx={{ mt: 3 }}>Compromissos</Typography>
          <Box component="ul" sx={{ pl: 3, lineHeight: 1.9 }}>
            <li><b>Formação contínua</b> em competências digitais e pensamento crítico.</li>
            <li><b>Transparência</b> no uso de IA como ferramenta de apoio à aprendizagem.</li>
            <li><b>Inclusão</b> e acessibilidade digital para todos os públicos.</li>
            <li><b>Investigação aplicada</b> que contribua para ciência aberta e inovação sustentável.</li>
          </Box>

          <Typography id="timeline" variant="h6" sx={{ mt: 4, mb:1 }}>Linha do tempo</Typography>
          <InstitutionTimeline />

          <Typography id="testemunhos" variant="h6" sx={{ mt: 4, mb:1 }}>Testemunhos</Typography>
          <Testimonials />
        </Grid>
      </Grid>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Container>
  );
}