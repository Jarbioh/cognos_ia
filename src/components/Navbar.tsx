'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { alpha, useTheme } from '@mui/material/styles';

// Se tiveres estes componentes no projeto, mantém; senão comenta:
// import HighContrastToggle from '@/components/HighContrastToggle';
// import SearchDialog from '@/components/SearchDialog';

// Se usas ThemeRegistry com ColorModeContext:
import { ColorModeContext } from '@/theme/ThemeRegistry';

const nav = [
  { href: '/missao', label: 'Missão' },
  { href: '/carta', label: 'Carta' },
  { href: '/formacao', label: 'Formação' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contactos', label: 'Contactos' },
];

export default function Navbar() {
  const theme = useTheme();
  const pathname = usePathname();
  const colorMode = React.useContext(ColorModeContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const bg = scrolled ? alpha(theme.palette.background.paper, 0.9) : 'transparent';
  const border = scrolled ? 'divider' : 'transparent';

  // ------- Drawer content (declared BEFORE usage) -------
  const renderDrawerList = () => (
    <Box sx={{ width: 300 }} role="menu" aria-label="Menu principal">
      {/* Cabeçalho do Drawer com o logótipo alternativo (maior) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 2.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {/* Wrapper com position: relative para o fill */}
        <Box sx={{ width: '60%', maxWidth: 400 }}>
      <Image
        src="/cognos-ia.png"
        alt="Cognos IA"
        width={1870}
        height={570}
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
      />
        </Box>
      </Box>

      <List sx={{ py: 0 }}>
        {nav.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link as any}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            selected={pathname.startsWith(item.href)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <Box sx={{ display: 'flex', gap: 1, px: 1.25, py: 1 }}>
        <IconButton aria-label="Pesquisar" onClick={() => { setSearchOpen(true); setMobileOpen(false); }}>
          <SearchIcon />
        </IconButton>
        {/* Descomenta se tiveres o componente */}
        {/* <HighContrastToggle /> */}
        <IconButton
          aria-label="Alternar modo de cor"
          onClick={colorMode?.toggle}
          title={colorMode?.mode === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {colorMode?.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
  // ------------------------------------------------------

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 3 : 0}
        color="default"
        component="nav"
        sx={{
          bgcolor: bg,
          backdropFilter: 'saturate(180%) blur(10px)',
          WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          borderBottom: 1,
          borderColor: border,
          transition: 'background-color .2s ease, border-color .2s ease, box-shadow .2s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, minHeight: { xs: 64, md: 80 } }}>
            {/* Logo principal no AppBar (desktop/tablet) */}
            <Link href="/" aria-label="Cognos IA - Home" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Image
                src="/logo-icon.png" // 80×80, ou o teu wordmark
                alt="Cognos IA"
                width={80}
                height={80}
                sizes="(max-width: 600px) 64px, 80px"
                style={{ height: 'auto', width: 'auto', maxWidth: '80px' }}
                priority
              />
            </Link>

            {/* Navegação desktop */}
            <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    color={active ? 'primary' : 'inherit'}
                    variant={active ? 'outlined' : 'text'}
                  >
                    {item.label}
                  </Button>
                );
              })}
              <IconButton aria-label="Pesquisar" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
              {/* Descomenta se tiveres o componente */}
              {/* <HighContrastToggle /> */}
              <IconButton
                aria-label="Alternar modo de cor"
                onClick={colorMode?.toggle}
                title={colorMode?.mode === 'dark' ? 'Modo claro' : 'Modo escuro'}
              >
                {colorMode?.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            {/* Hambúrguer (mobile) */}
            <Box sx={{ ml: 'auto', display: { xs: 'flex', md: 'none' } }}>
              <IconButton aria-label="Abrir menu" onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Descomenta se tiveres o componente */}
        {/* <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} /> */}

        <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          {renderDrawerList()}
        </Drawer>
      </AppBar>

      {/* OFFSET para o conteúdo não ficar escondido atrás do AppBar */}
      <Box aria-hidden sx={{ height: { xs: 64, md: 80 } }} />
    </>
  );
}
