import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'

export function FloatingActions() {
  const links = [
    {
      label: 'WhatsApp',
      url: 'https://wa.me/353834694919',
      icon: FaWhatsapp,
      color: 'bg-[#25D366]',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/mundo_online_world/',
      icon: FaInstagram,
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
    }
  ]

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-4 md:bottom-8">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`${link.color} flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95`}
          aria-label={link.label}
        >
          <link.icon className="text-3xl" />
        </a>
      ))}
    </div>
  )
}
