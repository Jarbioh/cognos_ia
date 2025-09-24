'use client';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';

export default function PrintButton() {
  return (
    <Button
      variant="outlined"
      startIcon={<PrintIcon />}
      onClick={() => window.print()}
      aria-label="Imprimir página"
    >
      Imprimir
    </Button>
  );
}
