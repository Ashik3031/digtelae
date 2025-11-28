'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-black px-6 py-8 md:px-10 lg:px-12 flex items-center">
      <div className="w-full border border-gray-800">
        <div className="grid md:grid-cols-2">
          {/* Left Section - Form */}
          <div className="border-b md:border-b-0 md:border-r border-gray-800 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="max-w-xl">
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">
                  Get in touch
                </h1>
                <p className="text-gray-400">
                  Share your project details and we will respond shortly.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                    className="w-full border-b border-gray-700 bg-transparent px-0 py-4 text-white text-lg placeholder-gray-600 outline-none transition focus:border-white"
                  />
                </div>

                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full border-b border-gray-700 bg-transparent px-0 py-4 text-white text-lg placeholder-gray-600 outline-none transition focus:border-white"
                  />
                </div>

                <div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone (optional)"
                    className="w-full border-b border-gray-700 bg-transparent px-0 py-4 text-white text-lg placeholder-gray-600 outline-none transition focus:border-white"
                  />
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Project details"
                    className="w-full border-b border-gray-700 bg-transparent px-0 py-4 text-white text-lg placeholder-gray-600 outline-none transition focus:border-white resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="text-white border border-white px-12 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                  </button>
                </div>

                {status === 'success' && (
                  <p className="text-sm text-green-400">
                    Message sent successfully.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="max-w-xl">
              <div className="space-y-10">
                <div className="border-l-2 border-gray-700 pl-6">
                  <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">
                    Phone
                  </p>
                  <div className="text-gray-300 space-y-2 text-lg">
                    <div>
                      <a href="tel:+97145547292" className="hover:text-white transition">
                        +971-4554-7292
                      </a>
                    </div>
                    <div>
                      <a href="tel:+971523853344" className="hover:text-white transition">
                        +971-52385-3344
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-gray-700 pl-6">
                  <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:info@techbahn.ae"
                    className="text-gray-300 text-lg hover:text-white transition"
                  >
                    info@digtel.ae
                  </a>
                </div>

                <div className="border-l-2 border-gray-700 pl-6">
                  <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">
                    Office
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                   City Bay Business Center, 
                    <br />
                    Abhuhail, Dubai, UAE
                  </p>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8">
                  <p className="text-gray-500 text-sm">
                    We typically respond within one business day. For urgent matters,
                    calling is the fastest way to reach us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
