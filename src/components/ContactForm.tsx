'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  'Product Design',
  'UX / UI Design',
  'Extension Design',
  'R & D',
  '3D Artist',
  'Altro',
];

const WORD_LIMIT = 300;

function countWords(text: string) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

/* ── Minimal field wrapper ─────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/40">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── Shared input style ────────────────────────────────────────────── */
const inputClass =
  'w-full bg-transparent border-b border-black/20 py-3 font-mono text-sm text-black placeholder-black/25 outline-none transition-colors focus:border-black/70';

/* ─────────────────────────────────────────────────────────────────── */
export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const wordCount = countWords(message);
  const overLimit = wordCount > WORD_LIMIT;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (countWords(val) <= WORD_LIMIT) setMessage(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overLimit || !name || !email || !service || !message) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setService(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full mt-14 flex flex-col gap-10"
    >
      {/* Row 1 — Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Field label="Name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className={inputClass}
            style={{ cursor: 'none' }}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={inputClass}
            style={{ cursor: 'none' }}
          />
        </Field>
      </div>

      {/* Row 2 — Service */}
      <Field label="Service">
        <div className="relative">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className={`${inputClass} appearance-none pr-8`}
            style={{ cursor: 'none' }}
          >
            <option value="" disabled>Select an area</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/40 pointer-events-none"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </Field>

      {/* Row 3 — Message */}
      <Field label="Request">
        <div className="relative">
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Describe your project or request in detail…"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            style={{ cursor: 'none' }}
          />
          {/* Word counter */}
          <div className="absolute bottom-2 right-0 font-mono text-[10px] tracking-widest text-black/30">
            {wordCount} / {WORD_LIMIT}
          </div>
        </div>
      </Field>

      {/* Submit */}
      <div className="flex items-center gap-6">
        <motion.button
          type="submit"
          disabled={status === 'loading' || overLimit}
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-black border border-black/30 px-8 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          style={{ cursor: 'none' }}
        >
          {status === 'loading' ? 'Sending…' : 'Send Request'}
        </motion.button>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.span
              key="ok"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50"
            >
              Message sent ✓
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span
              key="err"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-red-400"
            >
              Error — try again
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
