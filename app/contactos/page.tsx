import type { Metadata } from 'next';
import ContactosClient from './ui';
export const metadata: Metadata = { title: 'Contactos — Cognos IA', description: 'Fale connosco.', openGraph:{ images:['/logo-wordmark.png'] }, alternates:{ canonical:'/contactos' }, keywords:['contactos','email','telefone'] };
export default function Page(){ return <ContactosClient /> }
