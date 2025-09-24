import type { Metadata } from 'next';
import FormacaoClient from './ui';
export const metadata: Metadata = { title: 'Formação — Cognos IA', description: 'Cursos e workshops (fictícios).', openGraph:{ images:['/logo-wordmark.png'] }, alternates:{ canonical:'/formacao' }, keywords:['formação','cursos','workshops','Cognos IA'] };
export default function Page(){ return <FormacaoClient /> }
