import { useMemo, useState } from 'react';
import { useContact } from '../hooks/useContact';

const defaultLabels = {
  name: 'Nome',
  email: 'E-mail',
  message: 'Mensagem',
  button: 'Enviar'
};

export function ContactForm({ labels }) {
  const formLabels = useMemo(() => ({ ...defaultLabels, ...labels }), [labels]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { status, error, sendEmail } = useContact();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await sendEmail(formData);
    if (result) {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        {formLabels.name}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-primary"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        {formLabels.email}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-primary"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        {formLabels.message}
        <textarea
          rows="5"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-primary"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900 px-8 py-4 text-base font-black uppercase text-white shadow-md transition-all duration-300 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (formLabels.loading || 'Sending...') : formLabels.button}
      </button>
      {status === 'success' && (
        <p className="text-sm font-medium text-emerald-600">{formLabels.success || 'Your request has been sent! We will get back to you soon.'}</p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-500">{error || formLabels.error || 'Unable to send your message. Please try again.'}</p>
      )}
    </form>
  );
}
