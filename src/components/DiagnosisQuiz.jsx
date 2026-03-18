import { useState, useEffect, useRef } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import daniela from '../images/daniela.png';

export function DiagnosisQuiz({ checkoutUrl, onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const initialized = useRef(false);

  const getProfile = () => {
    const total = answers.reduce((a, b) => a + b, 0);
    if (total <= 8) return 'escassez';
    if (total <= 12) return 'buscador';
    return 'manifestador';
  };

  const quizSteps = [
    {
      id: 'welcome',
      questions: ['Olá!!! 👋', 'Me conte mais sobre você.', 'Qual o seu nome?'],
      type: 'text',
    },
    {
      id: 'define',
      questions: [
        'Como você se define principalmente?',
        `1 - Pelos meus problemas e limitações.
2 - Pelos meus papéis sociais (trabalho, família, etc.).
3 - Pelos meus sonhos e o que quero conquistar.
4 - Como um ser infinito vivendo temporariamente uma experiencial humana.`,
      ],
      type: 'choice',
    },
    {
      id: 'impossible',
      questions: [
        (userName) => `Qual é a sua relação com o que parece “impossível”, ${userName}?`,
        `1 - “Vamos ser realistas… tudo tem seus limites.”
2 - “Talvez seja possível para os outros, mas não pra mim.”
3 - “Eu sei que é possível, só não sei como chegar lá.”
4 - “O impossível é apenas aquilo que eu ainda não aprendi a manifestar.”`,
      ],
      type: 'choice',
    },
    {
      id: 'success',
      questions: [
        'O que você sente quando vê alguém com muito sucesso financeiro?',
        `1 - “Deve feito coisa errada” ou “Teve sorte”.
2 - Admiração misturada com “isso não é pra mim”.
3 - Inspiração… mas frustração por não saber como chegar lá.
4 - Reconhecimento de que é uma prova de que também é possível pra mim.`,
      ],
      type: 'choice',
    },
    {
      id: 'future',
      questions: [
        'Quando você imagina a sua vida daqui a 5 anos, o que predomina?',
        `1 - Medo de continuar igual.
2 - Esperança moderada.
3 - Visão clara, mas com dúvidas.
4 - Entusiasmo pelas infinitas possibilidades.`,
      ],
      type: 'choice',
    },
    {
      id: 'result',
      questions: [
        'Diagnóstico Pronto 🚀',
        (userName, userAnswers) => {
          const total = userAnswers.reduce((a, b) => a + b, 0);
          if (total <= 8) {
            return `${userName}, seu perfil é: "Prisioneira da Escassez". Suas respostas indicam que você está operando no modo sobrevivência. Seu subconsciente está programado para enxergar apenas perigos e limitações, o que trava qualquer entrada de dinheiro ou alegria. Você precisa de uma limpeza profunda de crenças raiz imediatamente.`;
          } else if (total <= 12) {
            return `${userName}, seu perfil é: "Buscadora Frustrada". Você já sabe que a Lei da Atração existe, mas sente que ela "funciona para os outros e não para você". Isso acontece porque há um desalinhamento entre o que você pede e o que você sente. Você tem a teoria, mas falta o método prático para destravar a sua frequência.`;
          } else {
            return `${userName}, seu perfil é: "Manifestadora Desalinhada". Você tem uma consciência elevada, mas ainda não viu os resultados físicos. Isso indica "micro-bloqueios de merecimento". É como se você estivesse com o rádio quase na estação certa, mas o chiado impede a música de tocar. Só falta o ajuste fino.`;
          }
        },
        'O Método Destrave foi criado exatamente para resolver o seu padrão específico.',
        'Ao garantir seu acesso agora, você recebe o E-book completo + o Desafio de 30 Dias em Vídeo de bônus.',
      ],
      type: 'final',
    },
  ];

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      sendNextQuestions(0);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { 
      text, 
      sender, 
      id: `${sender}-${Date.now()}-${Math.random()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const sendNextQuestions = async (stepIndex) => {
    setIsTyping(true);
    const currentStep = quizSteps[stepIndex];
    
    for (const q of currentStep.questions) {
      await new Promise((r) => setTimeout(r, 1200));
      const text = typeof q === 'function' ? q(name, answers) : q;
      addMessage(text, 'bot');
    }
    
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const currentStep = quizSteps[step];
    const userResponse = inputValue.trim();
    
    addMessage(userResponse, 'user');
    setInputValue('');

    if (step === 0) {
      setName(userResponse);
      const nextStep = step + 1;
      setStep(nextStep);
      sendNextQuestions(nextStep);
    } else if (currentStep.type === 'choice') {
      const num = parseInt(userResponse);
      if (isNaN(num) || num < 1 || num > 4) {
        setIsTyping(true);
        await new Promise((r) => setTimeout(r, 1000));
        addMessage('Lamento, sua resposta deve ser um número de 1 a 4 🧐', 'bot');
        setIsTyping(false);
      } else {
        setAnswers(prev => [...prev, num]);
        const nextStep = step + 1;
        setStep(nextStep);
        sendNextQuestions(nextStep);
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden md:h-[85vh] md:max-h-[800px] md:max-w-md md:mx-auto md:shadow-2xl md:border md:border-slate-200 md:rounded-[2rem] md:my-auto">
      {/* Header Estilo Premium Purple */}
      <div 
        className="flex items-center gap-3 bg-brand-dark px-3 pb-3 text-white shadow-md z-10 shrink-0"
        style={{ paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))' }}
      >
        {onComplete && (
          <button onClick={onComplete} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
        )}
        <div className="relative">
          <img src={daniela} alt="Daniela" className="h-10 w-10 rounded-full border border-white/20 object-cover" />
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-brand-dark bg-brand-primary"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-bold truncate">Daniela Ferrenha</h3>
          <p className="text-[10px] opacity-80">Online</p>
        </div>
      </div>

      {/* Chat Area com Fundo Branco Limpo */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scroll-smooth bg-white"
        style={{ 
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: '400px',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255,255,255,0.95)'
        }}
      >
        <div className="mx-auto my-2 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
          Hoje
        </div>

        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}
          >
            <div className={`relative max-w-[85%] px-3 py-2 text-[15px] shadow-sm border border-slate-100 ${
              m.sender === 'user' 
                ? 'bg-brand-accent/40 text-black rounded-lg rounded-tr-none ml-8' 
                : 'bg-white text-black rounded-lg rounded-tl-none mr-8'
            }`}>
              <p className="whitespace-pre-line leading-snug font-medium">{m.text}</p>
              <div className="flex justify-end mt-1">
                <span className="text-[9px] font-bold text-slate-400">{m.time}</span>
                {m.sender === 'user' && (
                  <span className="ml-1 text-brand-primary">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.403 7.317-3.254-2.481z"></path><path d="m19.147 8.658-1.506-1.317-7.617 8.704L8.85 14.77l-1.191 1.362 2.364 1.804z"></path></svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm border border-slate-100 flex gap-1">
              <div className="h-1.5 w-1.5 bg-brand-primary/30 rounded-full animate-bounce"></div>
              <div className="h-1.5 w-1.5 bg-brand-primary/30 rounded-full animate-bounce delay-75"></div>
              <div className="h-1.5 w-1.5 bg-brand-primary/30 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area Limpa */}
      <div 
        className="px-3 pt-3 bg-white flex items-end gap-2 shrink-0 border-t border-slate-100"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {step < quizSteps.length - 1 ? (
          <>
            <div className="flex-1 bg-slate-50 rounded-2xl px-4 py-2 shadow-inner flex items-end border border-slate-200">
              <textarea
                rows="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={step === 0 ? "Digite seu nome..." : "Responda com 1, 2, 3 ou 4..."}
                className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] py-1 max-h-32 resize-none text-black font-medium placeholder:text-slate-400"
                style={{ height: 'auto' }}
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-primary text-white shadow-lg active:scale-90 disabled:opacity-50 transition-transform"
            >
              <FiSend className="text-xl ml-0.5" />
            </button>
          </>
        ) : (
          <div className="w-full p-6 bg-white rounded-2xl shadow-luxury border-2 border-brand-accent text-center animate-in zoom-in-95 duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-black text-brand-dark mb-2 uppercase tracking-tight">O Seu Diagnóstico Está Pronto</h4>
              <p className="text-sm font-medium text-slate-600 mb-6">A falha não é sua, é do seu padrão subconsciente. O Método Destrave é a chave para mudar isso hoje.</p>
              
              <button 
                onClick={() => {
                  if (checkoutUrl && checkoutUrl.startsWith('http')) {
                    window.open(checkoutUrl, '_blank');
                  } else if (onComplete) {
                    onComplete();
                  }
                }}
                className="block w-full bg-gold-gradient text-brand-dark font-black py-4 rounded-xl shadow-gold-glow uppercase text-sm hover:brightness-110 transition-all animate-pulse-slow"
              >
                EU QUERO ACESSAR O MÉTODO DESTRAVE
              </button>
              <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Você será redirecionado para a página de pagamento seguro.
              </p>
          </div>
        )}
      </div>
    </div>
  );
}
