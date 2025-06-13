const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Роут для отправки писем
app.post('/send', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Настрой свой Gmail — лучше создать отдельный ящик и пароль приложения
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ervin.sults@gmail.com',       // <-- Замени на свой email
            pass: 'qpol uzfs gatm dden'           // <-- Пароль приложения (не обычный пароль!)
        }
    });

    let mailOptions = {
        from: email,
        to: 'ervin.sults@gmail.com',           // <-- На какой email отправлять
        subject: 'Новое сообщение с сайта',
        text: `Имя: ${firstName} ${lastName}\nПочта: ${email}\nСообщение: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'We have received your message and will respond as soon as possible.' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
