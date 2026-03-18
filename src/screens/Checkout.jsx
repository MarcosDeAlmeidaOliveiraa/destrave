import { useState, useEffect } from 'react';
import { FiCheckCircle, FiLock, FiShield, FiCreditCard, FiCopy, FiDownload } from 'react-icons/fi';
import { FaPix } from 'react-icons/fa6';
import InputMask from 'react-input-mask';

export function CheckoutScreen({ content, onBack, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'credit_card'
  const [hasCoupon, setHasCoupon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null); // { id, qr_code, qr_code_base64 }
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'approved'
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', cpf: '', phone: '',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '', installments: '1', coupon: ''
  });

  // Efeito para monitorar o pagamento PIX
  useEffect(() => {
    let interval;
    if (pixData?.id && paymentStatus === 'pending') {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/payment_status/${pixData.id}`);
          if (!response.ok) throw new Error('Servidor fora do ar');
          const data = await response.json();
          console.log('Status do Pagamento:', data.status); // LOG PARA DEBUG
          if (data.status === 'approved') {
            setPaymentStatus('approved');
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Erro de conexão com o servidor:', error);
        }
      }, 5000); // Checa a cada 5 segundos
    }
    return () => clearInterval(interval);
  }, [pixData, paymentStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          paymentMethod,
          token: 'dummy_token_for_now' // Mercado Pago SDK will generate this for cards later
        })
      });

      const data = await response.json();

      if (data.status === 'pending' && paymentMethod === 'pix') {
        setPixData({
          id: data.id,
          qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64,
          qr_code: data.point_of_interaction.transaction_data.qr_code
        });
      } else if (data.status === 'approved') {
        setPaymentStatus('approved');
      } else {
        alert('Status do pagamento: ' + data.status);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixData.qr_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Checkout Header Minimalista */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-brand-primary">
          &larr; Voltar
        </button>
        <div className="flex items-center gap-2">
           <FiLock className="text-green-600" />
           <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Checkout Seguro</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr] items-start">
        
        {/* Coluna Esquerda: Formulário ou Resumo do Pix */}
        {!pixData ? (
          <form onSubmit={handleCheckout} className="space-y-8">
            
            {/* Seção 1: Dados Pessoais */}
            <section className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary text-sm">1</span>
                Seus Dados
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="Como no seu documento" />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="Para receber o acesso" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">CPF ou CNPJ</label>
                  <InputMask mask="999.999.999-99" maskChar={null} required name="cpf" value={formData.cpf} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="000.000.000-00" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Celular / WhatsApp</label>
                  <InputMask mask="(99) 99999-9999" maskChar={null} required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </section>

            {/* Seção 2: Pagamento */}
            <section className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary text-sm">2</span>
                Pagamento
              </h2>

              <p className="text-sm font-medium text-slate-500 mb-4">Escolha como deseja pagar:</p>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                >
                  <FaPix className={`text-2xl ${paymentMethod === 'pix' ? 'text-green-600' : 'text-slate-400'}`} />
                  <span className="font-bold text-sm">Pix</span>
                  {paymentMethod === 'pix' && <span className="absolute -top-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Aprovação Imediata</span>}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'credit_card' ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                >
                  <FiCreditCard className={`text-2xl ${paymentMethod === 'credit_card' ? 'text-brand-primary' : 'text-slate-400'}`} />
                  <span className="font-bold text-sm">Cartão</span>
                  {paymentMethod === 'credit_card' && <span className="absolute -top-3 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Até 12x</span>}
                </button>
              </div>

              {/* Formulário do Cartão */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm font-bold border border-yellow-200 mb-4">
                    ⚠️ Módulo de Cartão em construção (Requer SDK Frontend). Por favor, use PIX para testes.
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Número do Cartão</label>
                    <InputMask mask="9999 9999 9999 9999" maskChar={null} name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nome no Cartão</label>
                    <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="Exatamente como impresso" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Validade</label>
                      <InputMask mask="99/99" maskChar={null} name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">CVV</label>
                      <InputMask mask="9999" maskChar={null} name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Parcelas</label>
                    <select name="installments" value={formData.installments} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all font-medium">
                      <option value="1">1x de R$ 47,90 sem juros</option>
                      <option value="2">2x de R$ 25,03</option>
                      <option value="3">3x de R$ 16,92</option>
                      <option value="4">4x de R$ 12,87</option>
                      <option value="5">5x de R$ 10,45</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Aviso Pix */}
              {paymentMethod === 'pix' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <FiCheckCircle className="text-green-600 text-xl shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-green-900 leading-snug">
                    Ao clicar em comprar, você receberá o <strong>QR Code</strong> e o código <strong>Copia e Cola</strong> para realizar o pagamento. O acesso é liberado em menos de 1 minuto!
                  </p>
                </div>
              )}

              <div className="mt-8 border-t border-slate-100 pt-6">
                {!hasCoupon ? (
                  <button type="button" onClick={() => setHasCoupon(true)} className="text-sm font-bold text-brand-primary hover:underline">
                    Possui Cupom de Desconto?
                  </button>
                ) : (
                  <div className="flex gap-2 animate-in fade-in slide-in-from-left-4">
                    <input type="text" name="coupon" value={formData.coupon} onChange={handleInputChange} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brand-primary uppercase text-sm font-bold" placeholder="DIGITE O CUPOM" />
                    <button type="button" className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-black">Aplicar</button>
                  </div>
                )}
              </div>
              
            </section>

            <button 
              type="submit" 
              disabled={loading || paymentMethod !== 'pix'} 
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-5 rounded-full font-black uppercase tracking-widest text-lg shadow-[0_10px_30px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
               {loading ? (
                 <span className="animate-pulse">Processando...</span>
               ) : (
                 <>
                   <FiLock />
                   {paymentMethod === 'pix' ? 'Gerar Pix Agora' : 'Comprar Agora'}
                 </>
               )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <FiShield /> Pagamento 100% Seguro via Mercado Pago
            </div>

          </form>
        ) : (
          /* Tela de Sucesso PIX ou Download */
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 text-center animate-in zoom-in-95 duration-500">
            {paymentStatus === 'approved' ? (
              /* CONTEÚDO LIBERADO - REDIRECIONAMENTO PARA O CURSO */
              <div className="animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
                  <FiCheckCircle className="text-6xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase italic">Acesso Liberado!</h2>
                <p className="text-slate-600 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                  Seu pagamento foi confirmado com sucesso. Sua Área de Membros com o eBook e as aulas já está pronta!
                </p>
                
                <button 
                  onClick={onSuccess}
                  className="w-full flex items-center justify-center gap-4 bg-brand-primary hover:bg-brand-dark text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-lg shadow-luxury transition-all hover:-translate-y-1 active:scale-95 border-b-4 border-black/20"
                >
                  <FiPlayCircle className="text-2xl" />
                  Acessar Área de Membros
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                   <FiShield /> Acesso Vitalício Garantido
                </div>
              </div>
            ) : (
              /* AGUARDANDO PAGAMENTO (QR CODE) */
              <>
                <FaPix className="text-5xl text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Quase lá!</h2>
                <p className="text-slate-600 font-medium mb-6 text-sm md:text-base px-2">Abra o app do seu banco e escaneie o QR Code ou copie o código abaixo para pagar.</p>
                
                <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-200 mb-6">
                  <img 
                    src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} 
                    alt="QR Code Pix" 
                    className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto"
                  />
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 overflow-hidden">
                     <div className="break-all font-mono text-[10px] md:text-xs text-slate-500 leading-tight">
                       {pixData.qr_code}
                     </div>
                  </div>
                  
                  <button 
                    onClick={copyPixCode} 
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${copied ? 'bg-green-500 text-white' : 'bg-brand-primary text-white hover:bg-brand-dark'}`}
                  >
                    {copied ? (
                      <>
                        <FiCheckCircle className="text-xl" />
                        Copiado com Sucesso!
                      </>
                    ) : (
                      <>
                        <FiCopy className="text-xl" />
                        Copiar Código PIX
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-6 flex flex-col items-center gap-2">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Aguardando Pagamento...</p>
                   </div>
                   <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto">Após o pagamento, esta tela irá atualizar automaticamente para o download.</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Coluna Direita: Resumo do Pedido */}
        <aside className="bg-brand-dark rounded-3xl p-4 md:p-8 text-white shadow-luxury sticky top-24">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-6">Resumo do Pedido</h3>
          
          <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
            <img src={content.hero.slides[0].image} alt="Destrave" className="w-20 h-auto object-contain drop-shadow-lg" />
            <div>
              <h4 className="font-black text-lg leading-tight">Método Destrave Completo</h4>
              <p className="text-xs text-white/70 mt-1">Acesso Imediato + Todos os Bônus</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm font-medium text-white/80 mb-6">
             {content.hero.slides[0].features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FiCheckCircle className="text-brand-accent mt-0.5 shrink-0" />
                  {f}
                </li>
             ))}
          </ul>

          <div className="border-t border-white/10 pt-6 space-y-2">
            <div className="flex justify-between text-sm text-white/60 line-through">
              <span>Valor Original</span>
              <span>R$ 297,00</span>
            </div>
            <div className="flex justify-between text-sm text-brand-accent font-bold">
              <span>Desconto Aplicado</span>
              <span>- R$ 249,10</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Total a Pagar</span>
              <div className="text-right">
                <span className="text-3xl font-black text-white">R$ 47,90</span>
                {paymentMethod === 'credit_card' && <p className="text-[10px] text-white/60">Ou em até 5x no cartão</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/5 rounded-2xl p-4 flex gap-3 border border-white/10">
             <FiShield className="text-brand-accent text-2xl shrink-0" />
             <p className="text-[11px] text-white/70 leading-relaxed font-medium">
               <strong>Risco Zero.</strong> Se você não gostar do conteúdo, devolvemos 100% do seu dinheiro dentro de 7 dias. Basta enviar um e-mail para o suporte.
             </p>
          </div>
        </aside>

      </main>
    </div>
  );
}
