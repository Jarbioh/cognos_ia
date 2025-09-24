'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';

const LazyChat = dynamic(() => import('@/components/CognosChatbot'), { ssr: false, loading: () => null });

export default function ChatLauncher(){
  const [mounted, setMounted] = React.useState(false);
  const onClick = () => setMounted(true);
  if (mounted) return <LazyChat />;
  return (
    <button onClick={onClick} aria-label="Abrir chatbot Cognos"
      style={{position:'fixed', right:16, bottom:16, zIndex:1400, width:56, height:56, borderRadius:'50%', background:'#d54226', color:'#fff', border:'none', cursor:'pointer'}}>
      💬
    </button>
  );
}
