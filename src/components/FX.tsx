'use client';
import { motion } from 'framer-motion';

type Props = React.PropsWithChildren<{ y?: number; duration?: number }>;

export function FadeIn({ children, y = 8, duration = 0.4 }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ duration }}>
      {children}
    </motion.div>
  );
}

export function Reveal({ children, duration = 0.5 }: React.PropsWithChildren<{ duration?: number }>) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration }}>
      {children}
    </motion.div>
  );
}
