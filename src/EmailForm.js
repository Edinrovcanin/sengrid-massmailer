import React, { useState } from 'react';
import axios from 'axios';
import './EmailForm.css'; // Kreirajte EmailForm.css fajl u istom direktorijumu kao EmailForm.js

const EmailForm = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSendEmail = () => {
        setIsSending(true);

        const data = {
            personalizations: [
                {
                    to: [{ email: recipient }],
                },
            ],
            from: { email: 'vas_email@primer.com' }, // Unesite vašu e-mail adresu ovde
            subject: subject,
            content: [{ type: 'text/plain', value: content }],
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_SENDGRID_API_KEY', // Zamenite YOUR_SENDGRID_API_KEY sa vašim API ključem
        };

        axios
            .post('https://api.sendgrid.com/v3/mail/send', data, { headers })
            .then(() => {
                alert('E-mail je poslat!');
                setIsSending(false);
            })
            .catch((error) => {
                console.error('Došlo je do greške prilikom slanja e-maila:', error);
                alert('Došlo je do greške prilikom slanja e-maila.');
                setIsSending(false);
            });
    };

    return (
        <div className="email-form">
            <h2>Slanje e-maila putem SendGrid-a</h2>
            <input
                type="email"
                placeholder="Primalac"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="text"
                placeholder="Naslov"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                placeholder="Sadržaj"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSendEmail} disabled={isSending}>
                {isSending ? 'Slanje...' : 'Pošalji'}
            </button>
        </div>
    );
};

export default EmailForm;
