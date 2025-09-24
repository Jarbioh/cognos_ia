'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Image from 'next/image';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const year = new Date().getFullYear();
const BRAND = '#d54226';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', width: '100%' }}>
      {/* Secção principal do footer */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Coluna 1: Marca/Descrição */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                {/* Logo pequeno + wordmark “Cognos IA” */}
                <Image src="/logo-icon.png" alt="Cognos IA" width={40} height={40} priority />
                <Typography variant="h6" component="div" sx={{ fontWeight: 800, display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                  <span className="chiller" style={{ lineHeight: 1, color: BRAND }}>Cognos</span>
                  <span style={{ lineHeight: 1 }}>IA</span>
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Plataforma de inteligência aplicada ao ensino — conteúdos, formação e princípios para uma IA responsável,
                acessível e centrada nas pessoas.
              </Typography>

              {/* Redes sociais (restaurado) */}
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="Twitter" component={Link as any} href="#" target="_blank" rel="noreferrer">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Instagram" component={Link as any} href="#" target="_blank" rel="noreferrer">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn" component={Link as any} href="#" target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="YouTube" component={Link as any} href="#" target="_blank" rel="noreferrer">
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Coluna 2: Navegação principal (restaurado) */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Navegação</Typography>
            <Stack spacing={0.75}>
              <Link href="/missao">Missão</Link>
              <Link href="/carta">Carta</Link>
              <Link href="/formacao">Formação</Link>
              <Link href="/noticias">Notícias</Link>
              <Link href="/eventos">Eventos</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contactos">Contactos</Link>
            </Stack>
          </Grid>

          {/* Coluna 3: Legal/Recursos (restaurado) */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Recursos</Typography>
            <Stack spacing={0.75}>
              <Link href="/acessibilidade">Acessibilidade</Link>
              <Link href="/privacidade">Política de Privacidade</Link>
              <Link href="/termos">Termos de Uso</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/mapa-do-site">Mapa do Site</Link>
              <Link href="/documentacao">Documentação</Link>
            </Stack>
          </Grid>

          {/* Coluna 4: Contactos + Newsletter (restaurado) */}
          <Grid item xs={12} sm={8} md={4}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Contactos</Typography>
            <Stack spacing={0.25} sx={{ mb: 2 }}>
              <Typography variant="body2">📍 Avenida da Inovação, 123 — Maputo</Typography>
              <Typography variant="body2">📞 (+258) 84 000 0000</Typography>
              <Typography variant="body2">✉️ contacto@cognos-ia.edu</Typography>
            </Stack>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Newsletter</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField size="small" type="email" label="O teu email" aria-label="Email para newsletter" />
              <Button variant="contained" color="primary" endIcon={<ArrowOutwardIcon />}>
                Subscrever
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Recebe novidades sobre cursos, eventos e publicações.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Barra inferior (sempre alinhada) */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            © {year} <span className="chiller">Cognos</span> IA — Todos os direitos reservados.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <Link href="/cookies">Cookies</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}