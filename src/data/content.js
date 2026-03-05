import card1 from '../images/card1.png'
import daniela from '../images/daniela.png'

export const languages = [
  { code: 'pt', label: 'Português', flag: 'BR' },
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'zh-CN', label: '中文', flag: 'CN' }
]

export const baseContent = {
  nav: {
    home: 'Início',
    details: 'O Método',
    faq: 'Dúvidas',
    tagline: 'Daniela Ferrenha'
  },
  hero: {
    slides: [
      {
        id: 'destrave-principal',
        badge: '✨ MÉTODO EXCLUSIVO',
        title1: 'Alinhe sua Mente e Energia para',
        title2: 'Criar a Realidade que Você Deseja',
        tagline: 'Daniela Ferrenha',
        description: 'Descubra como eliminar os bloqueios invisíveis que travam sua vida e ative o poder da Lei da Atração com um passo a passo prático e validado.',
        price: {
          main: 'R$ 47,90',
          oldPrice: 'R$ 95,80',
          brl: { main: 'R$ 47,90', oldPrice: 'R$ 95,80' },
          note: 'Acesso Imediato • +500 Alunas'
        },
        features: [
          'Download Imediato (PDF)',
          'Bônus: Desafio 30 Dias',
          '7 Dias de Garantia',
          'Acesso Vitalício'
        ],
        cta: 'QUERO DESTRAVAR AGORA',
        image: card1,
        imageAlt: 'Capa do Livro Destrave'
      }
    ],
    ctaLink: '#diagnosis',
    checkoutUrl: 'https://pay.kiwify.com.br/DFb06bi'
  },
  sales: {
    templates: {
      title: 'Me Siga no Instagram',
      text: 'Acompanhe dicas diárias sobre manifestação, energia e o método Destrave.',
      buttonLabel: 'Ver Instagram da Daniela',
      buttonHref: 'https://www.instagram.com/dani_mairaferrenha/'
    },
    problem: {
      title: 'Você sente que sua vida está Travada?',
      bullets: [
        'A maioria das pessoas conhece a teoria da Lei da Atração, mas falha na aplicação.',
        'Sente que seus esforços não trazem os resultados desejados.',
        'Vive em um ciclo de escassez e pensamentos limitantes.',
        'O "Destrave" não é sobre mágica, é sobre psicologia, foco e energia.'
      ]
    },
    solution: {
      title: 'O Poder do Invisível',
      paragraphs: [
        'Aprenda que semelhante atrai semelhante. Entenda como seus pensamentos moldam sua realidade física.',
        'Recalibre sua Frequência: Pare de emitir sinais de escassez. Aprenda a sintonizar na frequência exata dos seus sonhos.',
        'Elimine Bloqueios: Identifique e destrua as crenças limitantes que sabotam seu sucesso antes mesmo de você começar.'
      ]
    },
    product: {
      title: 'O que você vai aprender no Destrave',
      items: [
        {
          icon: '1',
          title: 'Os Fundamentos da Frequência',
          description: 'Entenda como a energia funciona e como você se conecta com o universo.'
        },
        {
          icon: '2',
          title: 'A Fórmula da Criação',
          description: 'Peça, Acredite e Receba: o mapa exato para manifestar seus desejos.'
        },
        {
          icon: '3',
          title: 'Ferramentas de Potencialização',
          description: 'Técnicas práticas para acelerar seus resultados dia após dia.'
        },
        {
          icon: '4',
          title: 'Bloqueios e Como Superá-los',
          description: 'Identifique o que te trava e limpe o caminho para a abundância.'
        },
        {
          icon: '★',
          title: 'BÔNUS EXCLUSIVO',
          description: 'Desafio de 30 Dias de Prática para transformar sua rotina e vibração.'
        }
      ],
      note: 'Conteúdo prático e validado para aplicação imediata.'
    },
    benefits: {
      title: 'Por que começar hoje?',
      bullets: [
        'Método passo a passo e fácil de seguir',
        'Alinhamento vibracional consciente e duradouro',
        'Acesso imediato ao material após a compra',
        'Garantia incondicional de 7 dias',
        'Oferta especial por tempo limitado'
      ]
    },
    primaryCta: {
      id: 'cta-primary',
      title: 'Comece sua transformação hoje',
      text: 'Ao garantir sua cópia agora, você recebe acesso vitalício ao E-book completo + Acesso aos vídeos do Desafio de 30 Dias.',
      buttonLabel: 'COMPRAR AGORA',
      buttonHref: 'https://pay.kiwify.com.br/DFb06bi',
      note: 'Pagamento único e seguro via Checkout.'
    },
    testimonials: {
      title: 'Sobre a Autora: Daniela Ferrenha',
      items: [
        {
          quote: '"O universo está pronto. E você?"',
          author: 'Daniela Ferrenha',
          description: 'Especialista em desenvolvimento pessoal e energética, Daniela Ferrenha compilou neste livro não apenas teorias, mas um mapa prático. Sua missão é ajudar pessoas a saírem do campo das ideias e entrarem no campo da realização através do alinhamento vibracional consciente.',
          avatar: daniela
        }
      ]
    },
    faq: {
      id: 'faq',
      title: 'Perguntas Frequentes',
      items: [
        {
          question: 'Como recebo o conteúdo?',
          answer: 'O acesso é imediato. Após a confirmação do pagamento, você receberá o link para download do PDF e acesso aos bônus no seu e-mail.'
        },
        {
          question: 'O pagamento é seguro?',
          answer: 'Sim, utilizamos as plataformas de pagamento mais seguras do mercado com criptografia de ponta a ponta.'
        },
        {
          question: 'Tenho garantia?',
          answer: 'Sim! Você tem 7 dias de garantia incondicional. Se não gostar do conteúdo, devolvemos seu dinheiro.'
        }
      ]
    },
    support: {
      title: 'Suporte ao Aluno',
      description: 'Dúvidas sobre o método ou acesso? Entre em contato:',
      email: 'suporte@danielaferrenha.com.br',
      responseTime: '© 2026 Daniela Ferrenha. Todos os direitos reservados.'
    }
  },
  contact: {
    title: 'Esta com dúvidas ou quer saber mais?',
    subtitle: 'Preencha os dados para finalizar sua inscrição e começar sua jornada de manifestação.',
    disclaimer: 'Compra Segura • Seus dados estão protegidos.',
    form: {
      name: 'Nome Completo',
      email: 'Seu melhor e-mail',
      message: 'Alguma dúvida adicional?',
      button: 'Enviar',
      loading: 'Processando...',
      success: 'Inscrição realizada com sucesso! Verifique seu e-mail.',
      error: 'Ocorreu um erro. Tente novamente ou entre em contato com o suporte.'
    }
  },
  footer: {
    title: 'Daniela Ferrenha',
    links: []
  },
  limitedOffer: {
    title: 'OFERTA POR TEMPO LIMITADO: 50% OFF',
    subtitle: 'A oferta expira em:',
    targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    timerLabels: {
      days: 'Dias',
      hours: 'Hours',
      minutes: 'Min',
      seconds: 'Seg'
    }
  }
}
