import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappMessage = encodeURIComponent("Olá! Tenho uma dúvida sobre o Método Destrave.");
  
  const socialLinks = [
    {
      label: 'WhatsApp',
      url: `https://wa.me/353834694919?text=${whatsappMessage}`,
      icon: FaWhatsapp,
      color: 'bg-[#25D366]',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/dani_mairaferrenha/',
      icon: FaInstagram,
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    }
  ]

  return (
    <footer className="bg-slate-50 py-12 border-t border-slate-100" id="footer">
      <div className="mx-auto max-w-5xl px-4 flex flex-col items-center gap-6 text-center">
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`${link.color} flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95`}
              aria-label={link.label}
            >
              <link.icon className="text-2xl" />
            </a>
          ))}
        </div>
        <div className="text-slate-400 text-sm font-medium">
          <p>&copy; {currentYear} Destrave. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
