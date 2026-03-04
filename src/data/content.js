import card1 from '../images/card1.png'
import card2 from '../images/card2.png'
import card3 from '../images/card3.png'

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
    home: 'Home',
    brl: { home: 'Inicio'},
    details: 'Plans',
    faq: 'FAQ',
    tagline: 'Expand Your Business'
  },
  hero: {
    slides: [
      {
        id: 'FraseTitulo',
        badge: '✨ LEADER IN DIGITAL TRANSFORMATION',
        title1: 'Your Company in the',
        title2: 'Digital Storefront',
        tagline: 'High-Performance Digital Presence',
        description: 'Gain credibility and attract new customers with a professional, fast, and optimized website. We handle all the technology so you can focus on growing.',
        price: {
          main: '$99/year',
          oldPrice: '$330',
          brl: { main: 'R$ 599/year', oldPrice: 'R$ 1,999' },
          note: 'Static hosting (GitHub/Render) included'
        },
        features: [
          '1-Page Static Website',
          'Custom Domain Connection',
          '1 Minor Update per month',
          'Up to 3 Marketing Photos Included',
          'Direct Support (Email & WhatsApp)'
        ],
        cta: 'Subscribe to Basic Plan',
        image: card1,
        imageAlt: 'Basic Website Plan'
      },
      {
        id: 'professional-plan',
        title: 'Professional Plan',
        tagline: 'Growth and Authority',
        description: 'Dynamic website of up to 5 pages with a database. Perfect for businesses that need more space and SEO optimization.',
        price: {
          main: '$199/year',
          oldPrice: '$660',
          brl: { main: 'R$ 1,199/year', oldPrice: 'R$ 3,999' },
          note: 'Database + 5GB Storage included'
        },
        features: [
          'Up to 5-Page Dynamic Website',
          'Database Integration (Supabase)',
          'Removal of "Built By" watermark',
          '3 Minor Updates per month',
          // 'Google Analytics and SEO Setup'
        ],
        cta: 'Subscribe to Professional Plan',
        image: card2,
        imageAlt: 'Professional Website Plan'
      },
      {
        id: 'premium-plan',
        title: 'Premium Plan',
        tagline: 'Complete Solution and Autonomy',
        description: 'A complete, dynamic platform. Log into the CMS to edit your own content and accept online payments.',
        price: {
          main: '$499/year',
          oldPrice: '$1000',
          brl: { main: 'R$ 2,999/year', oldPrice: 'R$ 5,999' },
          note: '50GB Bandwidth + 20GB Storage included'
        },
        features: [
          'Client CMS Login Panel',
          'Payment Integration (Stripe)',
          'Unlimited Photos and Updates',
          'Custom Domain + Analytics',
          'VIP Support (WhatsApp and Calls)'
        ],
        cta: 'Subscribe to Premium Plan',
        image: card3,
        imageAlt: 'Premium Website Plan'
      }
    ],
    ctaLink: '#contact'
  },
  sales: {
    templates: {
      title: 'Discover Our Templates',
      text: 'Check out our Instagram for exclusive templates we can adapt for your business.',
      buttonLabel: 'View our Templates on Instagram',
      buttonHref: 'https://www.instagram.com/mundo_online_world/'
    },
    problem: {
      title: 'Struggling with your current website?',
      bullets: [
        'No time or technical knowledge to update the site',
        'Paying high monthly fees to traditional agencies',
        'Slow website or not mobile-friendly',
        'Difficulty integrating forms and databases',
        'Lack of fast support when you need to make changes'
      ]
    },
    solution: {
      title: 'We Build and Manage It For You',
      paragraphs: [
        'Forget complicated website builders. Our "Done-For-You" structure ensures your business has a professional digital presence without the headache of technical maintenance.',
        'From an ultra-fast static page to dynamic platforms with their own CMS and Stripe payments, our annual plans cover everything: design, hosting, and continuous updates.'
      ]
    },
    product: {
      title: 'Features Included in Our Plans',
      items: [
        {
          icon: 'device',
          title: 'Custom Domain',
          description: 'Bring your own domain. We handle all the technical setup for free on every plan.'
        },
        {
          icon: 'clipboard',
          title: 'Integrated Database',
          description: 'Starting from the Professional plan, your website is backed by the power of Supabase for data and form management.'
        },
        {
          icon: 'chart',
          title: 'Continuous Updates',
          description: 'Need to change a photo or text? We offer minor monthly updates, or unlimited edits on the Premium plan.'
        },
        // {
        //   icon: 'file',
        //   title: 'Google Analytics and SEO',
        //   description: 'Search engine optimization and visitor tracking included in the Professional and Premium plans.'
        // },
        {
          icon: 'shield',
          title: 'Accept Online Payments',
          description: 'On the Premium plan, we integrate Stripe so you can sell products or services directly on your website.'
        },
        {
          icon: 'chart',
          title: 'Dedicated Support',
          description: 'Speak directly with our team via Email or WhatsApp. Premium clients have access to VIP support and phone calls.'
        }
      ],
      note: 'All websites are fully responsive, ensuring a perfect experience on desktops, tablets, and mobile phones.'
    },
    benefits: {
      title: 'Why choose our subscription?',
      bullets: [
        'Transparent costs with a single annual billing cycle',
        'Hosting and maintenance are fully included',
        'Hand-coded websites optimized for maximum speed',
        'Zero technical knowledge required on your part',
        'Modern design that reflects the quality of your company'
      ]
    },
    differentiators: {
      title: 'Differentiators that drive results',
      bullets: [
        'Easy transition from a Static (Basic) to a Dynamic (Pro/Premium) website',
        'Watermark removal starting from the Professional plan',
        'Generous storage limits (Up to 20GB on the Premium plan)',
        'Direct integration with your social media networks and WhatsApp',
        'Optional CMS Panel for total control (Premium)'
      ]
    },
    primaryCta: {
      id: 'cta-primary',
      title: 'Ready to launch your website?',
      text: 'Click the button below to schedule your free consultation and choose the ideal plan for your business.',
      buttonLabel: 'I want my professional website',
      buttonHref: '#contact',
      note: 'Setup and design guided by our expert team.'
    },
    testimonials: {
      title: 'Who trusts our work',
      items: [
        {
          quote: 'The basic plan was perfect for my consulting business. The site went live quickly, without any hassle, and with direct support on WhatsApp.',
          author: 'Ricardo S., Independent Consultant',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          quote: 'We upgraded to the Premium plan and now we manage our own content through the CMS, plus we accept payments via Stripe!',
          author: 'Mariana L., E-commerce Owner',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
        },
        {
          quote: 'The team handles all the text and photo updates on the Professional plan. I save hours every single month.',
          author: 'Carlos E., Clinic Owner',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
        }
      ]
    },
    faq: {
      id: 'faq',
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is considered a "Minor Update"?',
          answer: 'A minor update includes text changes, image replacements, or link adjustments. Complete layout changes or redesigns are not included.'
        },
        {
          question: 'Do you buy the domain for me?',
          answer: 'You must purchase and bring your own domain (e.g., GoDaddy, Namecheap). From there, we handle all the technical connection entirely for free on any plan.'
        },
        {
          question: 'How does the CMS access work on the Premium plan?',
          answer: 'On the Premium plan, we create a secure control panel (CMS) where you can log in yourself to edit text, add new services, or upload photos with no limits.'
        },
        {
          question: 'Can I start with the Basic plan and upgrade later?',
          answer: 'Absolutely! You can upgrade your static website to a dynamic version (Professional or Premium) at any time by simply paying the difference.'
        }
      ]
    },
    support: {
      title: 'Support and Contact',
      description: 'Questions or new projects? Talk to us at',
      email: 'contatomoveeuropa@gmail.com',
      responseTime: 'Priority support given to active clients.'
    }
  },
  contact: {
    title: 'Start Your Project Now',
    subtitle: 'Fill out the form below and we will get in touch to understand your needs and propose the best plan.',
    disclaimer: 'Your data is safe with us and will only be used for business contact purposes.',
    form: {
      name: 'Your name or company name',
      email: 'Your best email',
      message: 'Tell us a bit about your project or which plan interested you',
      button: 'Send Request',
      loading: 'Sending...',
      success: 'Your request has been sent! We will get back to you soon.',
      error: 'Unable to send your message. Please try again.'
    }
  },
  footer: {
    title: '',
    links: []
  },
  limitedOffer: {
    title: 'Limited Time Offer: 50% OFF first year',
    subtitle: 'Expires in:',
    targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    timerLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs'
    }
  }
}