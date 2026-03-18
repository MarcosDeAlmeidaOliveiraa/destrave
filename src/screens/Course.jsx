import { useState } from 'react';
import { FiDownload, FiPlayCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import ebookCover from '../images/card1.png';

export function CourseScreen({ onBack }) {
  const [activeLesson, setActiveLesson] = useState(0);

  // MAPEAR IDS DO GOOGLE DRIVE AQUI
  // Para pegar o ID: Clique com o botão direito no vídeo no Drive > Compartilhar > Copiar Link.
  // O ID é o código que fica entre 'file/d/' e '/view'.
  const videoIds = [
    "1YzIT28GaMCfPLveXUXVUN4_yrCaoMeuL", // Exemplo ID Dia 1 (Troque pelos reais)
    "ID_DO_VIDEO_2",
    "ID_DO_VIDEO_3",
    // ... continue até o 30
  ];

  const handleLessonClick = (index) => {
    setActiveLesson(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const lessons = Array.from({ length: 30 }, (_, i) => ({
    title: `Dia ${i + 1}: Treinamento Completo`,
    // Link de incorporação do Google Drive
    videoUrl: videoIds[i] ? `https://drive.google.com/file/d/${videoIds[i]}/preview` : null
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <header className="bg-brand-dark text-white py-12 px-6 text-center shadow-luxury relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent to-transparent"></div>
        <button onClick={onBack} className="absolute top-8 left-6 text-sm font-bold text-white/70 hover:text-brand-accent transition-colors flex items-center gap-2">
          &larr; Voltar ao Site
        </button>
        <h1 className="text-3xl md:text-5xl font-black mb-3 relative z-10 uppercase tracking-tighter italic">
          Método Destrave: <span className="text-brand-accent">30 Dias</span>
        </h1>
        <p className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] relative z-10">Área de Membros Exclusiva</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-8">
          {/* PLAYER DO GOOGLE DRIVE */}
          <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-video relative">
             {lessons[activeLesson].videoUrl ? (
               <iframe
                 src={lessons[activeLesson].videoUrl}
                 className="w-full h-full"
                 allow="autoplay"
                 allowFullScreen
               ></iframe>
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                  <FiInfo className="text-5xl text-brand-accent mb-4" />
                  <p className="font-bold">Vídeo em processamento ou ID não configurado.</p>
                  <p className="text-sm text-slate-400">Por favor, adicione os IDs dos vídeos no código.</p>
               </div>
             )}
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight mb-2">
                     {lessons[activeLesson].title}
                   </h2>
                   <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                     <FiCheckCircle className="text-green-500" /> Aula {activeLesson + 1} de 30. Foco total!
                   </p>
                </div>
                <a href="https://danielaferrenhamove.com.br/downloads/ebook.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-gold-glow transition-all hover:-translate-y-1 active:scale-95">
                  <FiDownload className="text-lg" /> Baixar eBook
                </a>
             </div>
          </div>
        </div>

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
                    activeLesson === index ? 'bg-brand-primary/5 border-brand-primary/20 text-brand-primary shadow-sm' : 'bg-white border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${activeLesson === index ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {index + 1}
                  </span>
                  <span className="font-bold text-sm text-left line-clamp-1 italic">{lesson.title}</span>
                </button>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
