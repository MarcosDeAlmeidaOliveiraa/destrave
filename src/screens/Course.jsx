import { useState } from 'react';
import { FiDownload, FiPlayCircle, FiCheckCircle, FiExternalLink, FiFolder } from 'react-icons/fi';
import ebookCover from '../images/card1.png';

export function CourseScreen({ onBack }) {
  const [activeLesson, setActiveLesson] = useState(0);

  // Link da sua pasta principal
  const folderLink = "https://drive.google.com/drive/folders/1YzIT28GaMCfPLveXUXVUN4_yrCaoMeuL";

  // IDs dos seus vídeos (Você pode preencher aos poucos se quiser o acesso individual)
  const videoIds = [
    "1YzIT28GaMCfPLveXUXVUN4_yrCaoMeuL", // ID do Dia 1
    // Adicione os outros IDs aqui conforme for pegando no Drive
  ];

  const handleLessonClick = (index) => {
    setActiveLesson(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const lessons = Array.from({ length: 30 }, (_, i) => ({
    title: `Dia ${i + 1}: Treinamento Completo`,
    driveUrl: videoIds[i] 
      ? `https://drive.google.com/file/d/${videoIds[i]}/view?usp=sharing` 
      : folderLink // Se não tiver o ID individual, leva para a pasta geral
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-brand-dark text-white py-12 px-6 text-center shadow-luxury relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent to-transparent"></div>
        <h1 className="text-3xl md:text-5xl font-black mb-3 relative z-10 uppercase tracking-tighter italic">
          Método Destrave: <span className="text-brand-accent">30 Dias</span>
        </h1>
        <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] relative z-10 italic">Área de Membros Premium</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 grid gap-8 lg:grid-cols-[1fr_350px]">
        
        <div className="space-y-8">
          {/* PLAYER / CALL TO ACTION */}
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-video relative flex flex-col items-center justify-center text-center p-8">
             <div className="absolute inset-0 opacity-20">
                <img src={ebookCover} alt="Background" className="w-full h-full object-cover blur-sm" />
             </div>
             
             <div className="relative z-10">
                <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold-glow animate-pulse">
                   <FiPlayCircle className="text-4xl text-brand-dark" />
                </div>
                <h2 className="text-white text-2xl md:text-3xl font-black uppercase italic mb-4">
                  {lessons[activeLesson].title}
                </h2>
                <p className="text-slate-300 mb-8 max-w-md mx-auto font-medium">
                  Clique no botão abaixo para abrir o vídeo original em alta definição no Google Drive.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href={lessons[activeLesson].driveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-gold-glow transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <FiExternalLink className="text-xl" />
                    Assistir Aula Agora
                  </a>
                </div>
             </div>
          </div>

          {/* BOTÕES DE SUPORTE E EBOOK */}
          <div className="grid sm:grid-cols-2 gap-4">
             <a 
                href="https://danielaferrenhamove.com.br/downloads/ebook.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-900 p-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:border-brand-primary transition-all shadow-sm"
             >
                <FiDownload className="text-xl text-brand-primary" />
                Baixar Meu eBook
             </a>
             <a 
                href={folderLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-900 p-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:border-brand-primary transition-all shadow-sm"
             >
                <FiFolder className="text-xl text-brand-primary" />
                Acessar Pasta Completa
             </a>
          </div>
        </div>

        {/* LISTA DE AULAS */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
           <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="font-black uppercase italic text-slate-900 flex items-center gap-2">
                <FiPlayCircle className="text-brand-primary" /> Cronograma: 30 Dias
              </h3>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
              {lessons.map((lesson, index) => (
                <button 
                  key={index}
                  onClick={() => handleLessonClick(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                    activeLesson === index 
                    ? 'bg-brand-primary/5 border-brand-primary/20 text-brand-primary shadow-sm' 
                    : 'bg-white border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                    activeLesson === index ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-bold text-sm text-left line-clamp-1 italic">{lesson.title}</span>
                </button>
              ))}
           </div>
        </div>

      </main>

      <footer className="mt-20 text-center">
         <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em]">Daniela Ferrenha © 2026 • Todos os Direitos Reservados</p>
      </footer>
    </div>
  );
}
