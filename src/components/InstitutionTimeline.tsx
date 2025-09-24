'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useTheme } from '@mui/material/styles';

type Item = {
  title: string;
  body: string;
  status?: 'done' | 'active' | 'pending';
};

const timeline: Item[] = [
  {
    title: 'Fundação',
    body:
      'A Cognos IA nasce com a missão de levar IA responsável ao ecossistema educativo—com foco em transparência, ' +
      'equidade, explicabilidade e segurança.',
    status: 'done',
  },
  {
    title: 'Primeiros cursos',
    body:
      'Início dos workshops e formações para docentes e estudantes; materiais abertos e práticas de ciência aberta.',
    status: 'done',
  },
  {
    title: 'Expansão',
    body:
      'Parcerias com instituições, laboratórios e projetos de pesquisa aplicada; integração de IA no currículo.',
    status: 'active',
  },
  {
    title: 'Próximos passos',
    body:
      'CMS para gestão de conteúdos, chatbot com IA real, trilhas de formação e certificações modulares.',
    status: 'pending',
  },
];

export default function InstitutionTimeline() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      {/* Linha do tempo “horizontal” sem @mui/lab */}
      <Stepper alternativeLabel sx={{ mb: 3 }}>
        {timeline.map((item, idx) => (
          <Step key={idx} completed={item.status === 'done'} active={item.status === 'active'}>
            <StepLabel
              icon={
                item.status === 'done' ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{
                      color:
                        item.status === 'active'
                          ? theme.palette.primary.main
                          : theme.palette.text.disabled,
                    }}
                  />
                )
              }
            >
              {item.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Cartões detalhados (estilo timeline vertical) */}
      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {timeline.map((item, idx) => (
          <Box component="li" key={idx} sx={{ mb: 2 }}>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                borderColor:
                  item.status === 'active'
                    ? theme.palette.primary.main
                    : 'divider',
              }}
            >
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.body}
              </Typography>
            </Paper>

            {idx < timeline.length - 1 && (
              <Divider
                role="presentation"
                aria-hidden="true"
                sx={{ my: 1.5, borderStyle: 'dashed' }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
