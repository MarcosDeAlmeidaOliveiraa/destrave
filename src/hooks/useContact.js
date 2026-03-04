import { useState } from 'react';

export function useContact() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const sendEmail = async (formData) => {
    setStatus('loading');
    setError(null);

    // Hardcoded Google Apps Script URL
    const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycbzCnzhb9KXanI4_nYVWnzWZ21AkxRtbFUPTISBcEYg9j-SdiLxu3wqk7ml9VLvGWPLi/exec'; 
    
    const endpoint = GOOGLE_API_URL;

    if (!endpoint || endpoint === 'undefined') {
      setStatus('error');
      setError('Configure o link da sua API do Google no arquivo useContact.js');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors', // Adicionado para evitar erros de CORS comuns com Google Scripts
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Nota: Com 'no-cors', o response.ok sempre será false mesmo se funcionar.
      // Se estiver usando Google Apps Script, o envio costuma funcionar mesmo assim.
      setStatus('success');
      return { ok: true };
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return { status, error, sendEmail };
}
