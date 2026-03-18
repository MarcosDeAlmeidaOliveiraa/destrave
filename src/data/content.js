import card1 from '../images/card1.png'
import daniela from '../images/daniela.png'

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
        badge: '🚨 VAGAS LIMITADAS PARA O DESAFIO',
        title1: 'Descubra o código invisível que trava',
        title2: 'o seu dinheiro e os seus relacionamentos',
        tagline: 'O Segredo Revelado',
        description: 'Chega de tentar "pensar positivo" e não ver nada mudar. Existe uma sujeira silenciosa no seu subconsciente bloqueando a sua vida. Aprenda a limpar isso hoje e veja os resultados aparecerem nesta mesma semana.',
        price: {
          main: 'R$ 1,00',
          oldPrice: 'R$ 297,00',
          brl: { main: 'R$ 1,00', oldPrice: 'R$ 297,00' },
          note: 'Oferta Especial (84% de Desconto)'
        },
        features: [
          'Passaporte Completo: Método Destrave',
          'PRESENTE 1: Desafio 30 Dias em Vídeo',
          'PRESENTE 2: SOS Crise Vibracional',
          'Garantia Incondicional de 7 Dias'
        ],
        cta: 'QUERO DESTRAVAR MINHA VIDA AGORA',
        image: card1,
        imageAlt: 'Kit Completo Destrave'
      }
    ],
    ctaLink: '#diagnosis',
    checkoutUrl: 'https://danielaferrenhamove.com.br/finalizar.php'
  },
  sales: {
    templates: {
      title: 'Não acredite apenas em mim',
      text: 'Veja nos meus stories os bastidores de como centenas de mulheres estão hackeando a realidade todos os dias com o Método Destrave.',
      buttonLabel: 'Espiar o Instagram da Daniela',
      buttonHref: 'https://www.instagram.com/dani_mairaferrenha/'
    },
    problem: {
      title: 'Você está exausta de nadar contra a maré?',
      bullets: [
        'Já fez o "quadro dos sonhos", repetiu afirmações positivas e sentiu que foi tudo uma grande perda de tempo?',
        'Vê pessoas menos qualificadas que você ganhando mais dinheiro e vivendo vidas incríveis?',
        'Acorda com ansiedade, sentindo que existe uma parede de vidro invisível bloqueando sua felicidade?',
        'A CULPA NÃO É SUA. O mercado de autoajuda te ensinou a acelerar o carro, mas esqueceu de avisar que o freio de mão estava puxado.'
      ]
    },
    solution: {
      title: 'O Freio de Mão Invisível',
      paragraphs: [
        'A verdade nua e crua é que 95% da sua vida é controlada pelo seu subconsciente. Se você tem "crenças raiz" de escassez instaladas na sua infância, não importa o quanto você trabalhe, você sempre voltará à estaca zero.',
        'O Método Destrave não é "pensamento positivo". É um protocolo prático de limpeza profunda. Nós vamos desinstalar o software da escassez e instalar o drive da abundância.',
        'Quando você solta o freio de mão, a manifestação não exige esforço. Ela se torna o seu estado natural.'
      ]
    },
    product: {
      title: 'O Arsenal Completo para Mudar de Vida',
      items: [
        {
          icon: '💎',
          title: 'Diagnóstico das Crenças Raiz',
          description: 'O raio-x exato para descobrir qual crença silenciosa está drenando sua conta bancária.'
        },
        {
          icon: '⚡',
          title: 'Protocolo de Limpeza Profunda',
          description: 'Exercícios práticos para deletar a autossabotagem e a síndrome da impostora.'
        },
        {
          icon: '🎯',
          title: 'A Engenharia do Pedido Perfeito',
          description: 'Como se comunicar com o universo de uma forma que ele seja OBRIGADO a te responder.'
        },
        {
          icon: '🚀',
          title: 'Blindagem Energética',
          description: 'Como parar de absorver a negatividade e a inveja das pessoas ao seu redor.'
        },
        {
          icon: '🎁',
          title: 'O Acelerador de 30 Dias',
          description: 'Acompanhamento em vídeo para garantir que a mudança seja permanente e definitiva.'
        }
      ],
      note: 'Um investimento ridículo comparado ao dinheiro que você está perdendo por estar travada.'
    },
    benefits: {
      title: 'A dor de ficar onde está é maior do que o preço da mudança',
      bullets: [
        'Volte a ter paz mental e clareza sobre o futuro',
        'Atraia oportunidades financeiras que pareciam impossíveis',
        'Elimine a ansiedade e o ciclo de preocupação com contas',
        'Torne-se magnética para relacionamentos saudáveis',
        'Recupere o controle absoluto sobre a sua realidade'
      ]
    },
    comparison: {
      title: 'Por que o Destrave é diferente?',
      left: {
        title: 'Outros Métodos',
        items: ['Teoria vazia e complicada', 'Foco apenas em "pensar positivo"', 'Resultados que demoram meses', 'Você se sente sozinha e perdida']
      },
      right: {
        title: 'Método Destrave',
        items: ['Protocolo prático e direto', 'Limpeza profunda do subconsciente', 'Mudança vibracional imediata', 'Desafio de 30 dias com guia real']
      }
    },
    primaryCta: {
      id: 'cta-primary',
      title: 'Qual vai ser a sua escolha hoje?',
      text: 'Você pode fechar esta página e continuar exatamente onde está, frustrada e estagnada. Ou pode investir o valor de uma pizza para dar o primeiro passo rumo à vida que você merece.',
      buttonLabel: 'SIM! EU QUERO A MINHA NOVA REALIDADE',
      buttonHref: 'https://danielaferrenhamove.com.br/finalizar.php',
      note: 'Pagamento 100% Seguro. Acesso enviado para o seu e-mail em 2 minutos.'
    },
    testimonials: {
      title: 'Elas soltaram o freio de mão...',
      items: [
        {
          quote: '"Eu achei que era mais um livro bobo de autoajuda. Me enganei feio. Os exercícios do módulo 2 me fizeram chorar, mas tiraram um peso de 10 toneladas das minhas costas. Arrumei um emprego ganhando o dobro em menos de um mês."',
          author: 'Mariana S.',
          description: 'Aluna da Turma 4',
          avatar: 'https://i.pravatar.cc/150?u=mariana'
        },
        {
          quote: '"O Desafio de 30 dias em vídeo vale ouro. A energia da Daniela é contagiante. Hoje eu não corro mais atrás do dinheiro, as oportunidades vêm até mim."',
          author: 'Carla F.',
          description: 'Empreendedora',
          avatar: 'https://i.pravatar.cc/150?u=carla'
        }
      ]
    },
    guarantee: {
      title: 'O Risco é 100% Meu (Garantia de Arrependimento)',
      text: 'Se você baixar o Método Destrave, ler os materiais, assistir aos vídeos e achar que isso não funciona para você, me mande um único e-mail dentro de 7 dias. Eu devolvo cada centavo do seu dinheiro. Sem perguntas. Continuaremos amigas. Você não tem absolutamente nada a perder.'
    },
    bonuses: {
      title: 'Se você agir AGORA, leva de presente (De R$ 141 por R$ 0)',
      bullets: [
        { icon: 'video', text: '🎁 DESAFIO 30 DIAS EM VÍDEO: 30 aulas práticas para manter sua vibração no topo. (Vendido separadamente por R$ 97,00 - Hoje: GRÁTIS)' },
        { icon: 'file', text: '🎁 CHECKLIST DIÁRIO DE MANIFESTAÇÃO: A rotina de 5 minutos das pessoas altamente prósperas. (Vendido separadamente por R$ 27,00 - Hoje: GRÁTIS)' },
        { icon: 'compass', text: '🎁 S.O.S. CRISE VIBRACIONAL: Áudio de emergência para te tirar do buraco do medo e da ansiedade em minutos. (Vendido separadamente por R$ 17,00 - Hoje: GRÁTIS)' }
      ]
    },
    urgency: {
      title: '⏳ O Lote Promocional Está Esgotando',
      text: 'Estou oferecendo o Método Destrave + Todos os Bônus por apenas R$ 1,00 para colher mais depoimentos. Assim que a meta for atingida, o preço retornará automaticamente para o valor normal de R$ 297,00. Não garanto esse preço amanhã.'
    },
    faq: {
      id: 'faq',
      title: 'Dúvidas Frequentes antes de você tomar sua decisão',
      items: [
        {
          question: 'Isso é religião ou espiritismo?',
          answer: 'De forma alguma. O Método Destrave é baseado em princípios de física quântica, neurociência e psicologia comportamental. É prático e focado em resultados reais.'
        },
        {
          question: 'E se eu não tiver tempo para estudar?',
          answer: 'O material foi feito para quem não tem tempo a perder. A leitura é fluida e os vídeos do desafio duram de 5 a 10 minutos por dia.'
        },
        {
          question: 'Como eu acesso o material?',
          answer: 'Logo após o pagamento (que é processado em ambiente blindado), você recebe no seu e-mail os dados de acesso para baixar o E-book e entrar na área de membros dos bônus.'
        }
      ]
    },
    support: {
      title: 'Ainda precisa de ajuda?',
      description: 'Nosso time de sucesso do cliente está pronto para te ajudar.',
      email: 'suporte@danielaferrenha.com.br',
      responseTime: 'Atendimento humanizado de Seg a Sex.'
    },
    secondaryCta: {
      id: 'cta-secondary',
      title: 'Esta é a sua última chance de pagar apenas R$ 47,90',
      text: 'O cronômetro não para. Garanta seu acesso vitalício agora.',
      buttonLabel: 'GARANTIR MEU DESCONTO E BÔNUS',
      buttonHref: 'https://danielaferrenhamove.com.br/finalizar.php'
    },
    finalCta: {
      id: 'cta-final',
      title: 'O Universo Gosta de Velocidade',
      text: 'Pessoas de sucesso tomam decisões rápidas quando encontram a solução. Qual grupo você quer fazer parte?',
      buttonLabel: 'EU ESCOLHO DESTRAVAR HOJE',
      buttonHref: 'https://danielaferrenhamove.com.br/finalizar.php'
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
