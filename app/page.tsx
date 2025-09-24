import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import { FadeIn, Reveal } from '@/components/FX';

export const metadata: Metadata = {
  title: 'Cognos IA — Inteligência aplicada ao ensino',
  description: 'Bem-vindo à Cognos IA. Plataforma académica com IA responsável.',
  openGraph: { title: 'Cognos IA — Inteligência aplicada ao ensino', description: 'Plataforma académica com IA responsável.', images:['/logo-wordmark.png'] },
  alternates: { canonical: '/' },
  keywords: ['Cognos IA','educação','inteligência artificial','formação','ética','Moçambique'],
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.cognos-ia.edu';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <FadeIn>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1.2 }}>Plataforma Educacional</Typography>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            <Box component="span" className="chiller" sx={{ mr: 1, color: 'primary.main', fontSize: { xs: 48, md: 64 } }}>Cognos</Box>
            <Box component="span" sx={{ color: 'text.primary' }}>IA</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Um ecossistema de aprendizagem e inovação que combina ciência de dados, IA responsável e formação contínua.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button component={Link} href={appUrl} variant="contained" size="large">Entrar na Plataforma</Button>
            <Button component={Link} href="/missao" variant="outlined" size="large" color="primary">Conhecer a Missão</Button>
          </Box>
        </Box>
      </FadeIn>
      <Reveal>
        <Grid container spacing={3} role="region" aria-label="Resumo de secções">
          {[
            { title: 'Carta de Princípios', desc: 'Compromissos éticos e diretrizes de uso responsável.', href: '/carta' },
            { title: 'Formação', desc: 'Cursos, workshops e capacitação docente e discente.', href: '/formacao' },
            { title: 'Notícias & Eventos', desc: 'Acompanhe atualizações institucionais e agenda.', href: '/noticias' },
          ].map((c) => (
            <Grid key={c.title} item xs={12} md={4}>
              <Card component="article" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{c.desc}</Typography>
                  <Button component={Link} href={c.href} variant="text" color="primary" aria-label={`Abrir ${c.title}`}>Abrir</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Reveal>
    </Container>
  );
}
