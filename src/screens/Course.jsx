import { useState } from 'react';
import { FiDownload, FiPlayCircle, FiCheckCircle, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ebookCover from '../images/card1.png';

export function CourseScreen({ onBack }) {
  const [activeLesson, setActiveLesson] = useState(0);

  const handleLessonClick = (index) => {
    setActiveLesson(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lista de 30 dias de curso baseada nos seus arquivos
  const lessons = Array.from({ length: 30 }, (_, i) => ({
    title: `Dia ${i + 1}: Treinamento Completo`,
    fileName: `Dia ${i + 1}.mp4`,
    // Os vídeos agora estão na pasta 'public/course'
    videoUrl: `/course/Dia ${i + 1}.mp4`
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Premium da Área de Membros */}
      <header className="bg-brand-dark text-white py-12 px-6 text-center shadow-luxury relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent to-transparent"></div>
        <button 
          onClick={onBack} 
          className="absolute top-8 left-6 text-sm font-bold text-white/70 hover:text-brand-accent transition-colors flex items-center gap-2"
        >
          &larr; Voltar ao Site
        </button>
        <h1 className="text-3xl md:text-5xl font-black mb-3 relative z-10 uppercase tracking-tighter italic">
          Método Destrave: <span className="text-brand-accent">30 Dias</span>
        </h1>
        <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] relative z-10">Área de Membros Exclusiva</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 grid gap-8 lg:grid-cols-[1fr_350px]">
        
        {/* LADO ESQUERDO: Player de Vídeo e Download */}
        <div className="space-y-8">
          
          {/* PLAYER PRINCIPAL */}
          <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-video relative group">
             <video 
               key={lessons[activeLesson].videoUrl}
               controls 
               className="w-full h-full"
               poster={ebookCover}
             >
               <source src={lessons[activeLesson].videoUrl} type="video/mp4" />
               Seu navegador não suporta vídeos.
             </video>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-2">
                     {lessons[activeLesson].title}
                   </h2>
                   <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                     <FiCheckCircle className="text-green-500" /> Aula {activeLesson + 1} de 30 concluída? Continue firme!
                   </p>
                </div>
                
                <a 
                  href="https://danielaferrenhamove.com.br/downloads/ebook.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-gold-glow transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                >
                  <FiDownload className="text-lg" />
                  Baixar eBook
                </a>
             </div>
          </div>

          {/* DICAS DE SUPORTE */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex items-start gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full"></div>
             <FiInfo className="text-4xl text-brand-accent shrink-0" />
             <div>
                <h4 className="font-black uppercase italic mb-2">Dica de Sucesso:</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Não pule os dias! O Método Destrave foi desenhado para ser seguido em ordem. Assista a uma aula por dia e coloque os exercícios do eBook em prática.
                </p>
             </div>
          </div>
        </div>

        {/* LADO DIREITO: PLAYLIST DE 30 DIAS */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px] lg:h-[800px]">
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

      {/* FOOTER DISCRETO */}
      <footer className="mt-20 text-center">
         <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em]">Daniela Ferrenha © 2026 • Todos os Direitos Reservados</p>
      </footer>
    </div>
  );
}
