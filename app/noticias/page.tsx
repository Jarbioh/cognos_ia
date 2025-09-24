import type { Metadata } from 'next';
import NoticiasClient from './ui';
export const metadata: Metadata = { title: 'Notícias — Cognos IA', description: 'Atualizações fictícias.', openGraph:{ images:['/logo-wordmark.png'] }, alternates:{ canonical:'/noticias' }, keywords:['notícias','blog','Cognos IA'] };
export default function Page(){ return <NoticiasClient /> }
