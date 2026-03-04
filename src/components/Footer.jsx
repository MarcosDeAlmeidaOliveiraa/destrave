export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 py-8 pb-24 md:pb-12 border-t border-slate-100" id="footer">
      <div className="mx-auto max-w-5xl px-4 text-center text-slate-400 text-sm font-medium">
        <p>&copy; {currentYear} Mundo Online World. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
