import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotButton from '@/components/ChatbotButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cognos IA',
  description: 'Plataforma institucional Cognos IA',
  openGraph: { title: 'Cognos IA', description: 'Plataforma institucional Cognos IA' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ThemeRegistry>
          {/* Link de salto para acessibilidade */}
          <a className="skip-link" href="#conteudo-principal">Saltar para o conteúdo</a>

          <Navbar />

          {/* O offset do Navbar já é feito no próprio componente; aqui só marcamos o main */}
          <main id="conteudo-principal">{children}</main>

          <Footer />

          {/* Botão/Janela do chatbot (Client Component) */}
          <ChatbotButton />
        </ThemeRegistry>
      </body>
    </html>
  );
}
