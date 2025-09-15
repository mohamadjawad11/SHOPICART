import React, { useState } from 'react';
import * as emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || !name.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      user_message: message,
      to_email: 'hamdanjawad789@gmail.com',
    };

    setLoading(true); // start loading
    try {
      const res = await emailjs.send(
        'service_ssgt7ft',
        'template_xnbweug',
        templateParams,
        'R7wov8wBSFe35AJlN'
      );

      if (res.status === 200) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSuccess(false), 4000); // success message disappears
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please try again.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <form
      className="flex flex-col items-center text-sm text-slate-800 pt-10"
      onSubmit={handleSend}
    >
      <p className="text-xs bg-primary text-primary font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>
      <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch.</h1>
      <p className="max-md:text-sm text-gray-500 pb-10 text-center">
        Or just reach out manually to us at{' '}
        <a href="mailto:hamdanjawad789@gmail.com" className="text-primary hover:underline">
          hamdanjawad789@gmail.com
        </a>
      </p>

      <div className="max-w-96 w-full px-4">
        {/* Full Name */}
        <label htmlFor="name" className="font-medium">Full Name</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-primary transition-all overflow-hidden">
          <input
            type="text"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <label htmlFor="email" className="font-medium mt-4">Email Address</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-primary transition-all overflow-hidden">
          <input
            type="email"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message */}
        <label htmlFor="message" className="font-medium mt-4">Message</label>
        <textarea
          rows="4"
          className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-primary transition-all"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 mt-5 bg-primary text-white py-2.5 w-full rounded-full transition-all cursor-pointer
                      ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#9BACB7FF]'}`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'Submit Form'
          )}
        </button>

        {/* Messages */}
        {success && (
          <p className="text-green-600 mt-2 transition-all duration-500 ease-in-out animate-pulse">
            Message sent successfully!
          </p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </form>
  );
};

export default Contact;
