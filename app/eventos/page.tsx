import type { Metadata } from 'next';
import EventosClient from './ui';
export const metadata: Metadata = { title: 'Eventos — Cognos IA', description: 'Agenda fictícia.', openGraph:{ images:['/logo-wordmark.png'] }, alternates:{ canonical:'/eventos' }, keywords:['eventos','agenda','Cognos IA'] };
export default function Page(){ return <EventosClient /> }
