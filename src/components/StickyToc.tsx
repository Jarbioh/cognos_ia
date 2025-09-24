'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type Item = { id: string; label: string };

export default function StickyToc({ items }: { items: Item[] }) {
  const [active, setActive] = React.useState<string>(items[0]?.id || '');

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0% -45% 0%', threshold: 0.01 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  const go = (id: string) => (ev: React.MouseEvent) => {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // evita o auto-scroll do Next e usa o nosso
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // atualiza o hash manualmente (sem jump)
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 88,
        alignSelf: 'flex-start',
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        minWidth: 220,
        maxHeight: '70vh',
        overflow: 'auto',
      }}
      aria-label="Sumário"
    >
      {items.map((i) => (
        <Button
          key={i.id}
          href={`#${i.id}`}
          size="small"
          variant={active === i.id ? 'contained' : 'text'}
          sx={{ display: 'block', width: '100%', justifyContent: 'flex-start', mb: 0.5 }}
          onClick={go(i.id)}
        >
          {i.label}
        </Button>
      ))}
    </Box>
  );
}
// baseado em https://mui.com/material-ui/react-drawer/#persistent-drawer
// e https://mui.com/material-ui/react-list/#nested-list
// e https://mui.com/material-ui/react-button/#button
// e https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// e https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
// e https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState 