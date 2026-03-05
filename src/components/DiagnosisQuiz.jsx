import { useState, useEffect, useRef } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import daniela from '../images/daniela.png';

export function DiagnosisQuiz({ checkoutUrl, onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const initialized = useRef(false);

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
4 - Como um ser infinito vivendo temporariamente uma experiência humana.`,
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
        'Descubra o padrão que está bloqueando sua abundância.',
        (userName) => `${userName}, suas respostas indicam que você está vivendo o que Jung chamava de 'compulsão ao destino' — a repetição inconsciente de padrões. Você tenta mudar na força, mas seu subconsciente puxa você para trás.`,
        'Você está a apenas 3 passos de mudar isso. Apresento o Destrave. Não é um curso, é um protocolo de 30 dias para renovar sua frequência.',
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
      const text = typeof q === 'function' ? q(name) : q;
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
        const nextStep = step + 1;
        setStep(nextStep);
        sendNextQuestions(nextStep);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#efe7de] overflow-hidden md:rounded-[2rem] md:h-[85vh] md:max-w-md md:mx-auto md:shadow-2xl md:border md:border-slate-200">
      {/* Header Estilo WhatsApp */}
      <div className="flex items-center gap-3 bg-[#075e54] p-3 text-white shadow-md z-10">
        {onComplete && (
          <button onClick={onComplete} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
        )}
        <div className="relative">
          <img src={daniela} alt="Daniela" className="h-10 w-10 rounded-full border border-white/20 object-cover" />
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#075e54] bg-[#25d366]"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-bold truncate">Daniela Ferrenha</h3>
          <p className="text-[10px] opacity-80">visto por último hoje às {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Chat Area com Fundo de Pattern */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scroll-smooth"
        style={{ 
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: '400px'
        }}
      >
        <div className="mx-auto my-2 bg-[#d1ebf2] text-[#128c7e] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
          Hoje
        </div>

        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}
          >
            <div className={`relative max-w-[85%] px-3 py-2 text-[15px] shadow-sm ${
              m.sender === 'user' 
                ? 'bg-[#dcf8c6] text-zinc-800 rounded-lg rounded-tr-none ml-8' 
                : 'bg-white text-zinc-800 rounded-lg rounded-tl-none mr-8'
            }`}>
              <p className="whitespace-pre-line leading-snug">{m.text}</p>
              <div className="flex justify-end mt-1">
                <span className="text-[9px] text-zinc-400 font-medium">{m.time}</span>
                {m.sender === 'user' && (
                  <span className="ml-1 text-[#34b7f1]">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.403 7.317-3.254-2.481z"></path><path d="m19.147 8.658-1.506-1.317-7.617 8.704L8.85 14.77l-1.191 1.362 2.364 1.804z"></path></svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-lg rounded-tl-none shadow-sm flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
              <div className="h-1.5 w-1.5 bg-zinc-300 rounded-full animate-bounce delay-75"></div>
              <div className="h-1.5 w-1.5 bg-zinc-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area Estilo WhatsApp */}
      <div className="p-2 bg-[#efe7de] flex items-end gap-2 sticky bottom-0">
        {step < quizSteps.length - 1 ? (
          <>
            <div className="flex-1 bg-white rounded-2xl px-4 py-2 shadow-sm flex items-end">
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
                className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] py-1 max-h-32 resize-none"
                style={{ height: 'auto' }}
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="h-12 w-12 flex items-center justify-center rounded-full bg-[#128c7e] text-white shadow-md active:scale-90 disabled:opacity-50 transition-transform"
            >
              <FiSend className="text-xl ml-0.5" />
            </button>
          </>
        ) : (
          <div className="w-full p-4 bg-white rounded-2xl shadow-lg text-center animate-in zoom-in-95 duration-300">
              <p className="text-sm font-bold text-[#075e54] mb-4 uppercase tracking-tight">🎉 Diagnóstico Concluído!</p>
              <a 
                href={checkoutUrl || "#checkout"} 
                target={checkoutUrl ? "_blank" : "_self"}
                rel="noreferrer"
                className="block w-full bg-[#25d366] text-white font-black py-4 rounded-xl shadow-md uppercase text-sm hover:bg-[#128c7e] transition-colors"
              >
                Quero o Destrave Agora
              </a>
              <button 
                onClick={onComplete}
                className="mt-4 text-xs font-bold text-zinc-400 hover:text-[#075e54] uppercase tracking-widest"
              >
                Voltar para o site
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
