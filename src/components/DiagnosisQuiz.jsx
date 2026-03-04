import { useState, useEffect, useRef } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import daniela from '../images/daniela.png';

export function DiagnosisQuiz({ checkoutUrl }) {
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
        `1 - “Deve ter feito coisa errada” ou “Teve sorte”.
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
    setMessages((prev) => [...prev, { text, sender, id: `${sender}-${Date.now()}-${Math.random()}` }]);
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
    <div className="mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 bg-brand-dark p-4 text-white">
        <div className="relative">
          <img src={daniela} alt="Daniela" className="h-10 w-10 rounded-full border-2 border-brand-accent object-cover" />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-brand-dark bg-green-500"></div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Daniela Ferrenha</h3>
          <p className="text-[10px] text-brand-accent">Online agora • Diagnóstico</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="h-[500px] overflow-y-auto bg-slate-50 p-4 scrollbar-hide flex flex-col gap-3"
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
              m.sender === 'user' 
                ? 'bg-brand-primary text-white rounded-tr-none' 
                : 'bg-white text-zinc-800 rounded-tl-none border border-slate-100'
            }`}>
              <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
              <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
              <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {step < quizSteps.length - 1 ? (
        <div className="border-t border-slate-100 p-4 bg-white flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={step === 0 ? "Digite seu nome..." : "Responda com 1, 2, 3 ou 4..."}
            className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="h-11 w-11 flex items-center justify-center rounded-full bg-brand-primary text-white shadow-lg transition-transform active:scale-90 disabled:opacity-50"
          >
            <FiSend />
          </button>
        </div>
      ) : (
        <div className="p-6 bg-brand-primary text-center">
            <a 
              href={checkoutUrl || "#checkout"} 
              target={checkoutUrl ? "_blank" : "_self"}
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-primary font-black px-8 py-4 rounded-full shadow-xl uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <FiCheckCircle /> Quero o Destrave Agora
            </a>
            <p className="mt-3 text-[10px] text-white/70 font-bold uppercase tracking-widest">
              Made with Love & Structure
            </p>
        </div>
      )}
    </div>
  );
}
