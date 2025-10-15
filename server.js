import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Contact from './models/Contact.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files with proper headers for downloads
app.use('/assets', express.static(path.join(__dirname, 'portfolio', 'assets'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.pdf')) {
            res.set('Content-Type', 'application/pdf');
            res.set('Content-Disposition', 'attachment; filename="Deepu KC_Resume.pdf"');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Cache-Control', 'no-cache');
        }
    }
}));

// Serve other static files
app.use(express.static(path.join(__dirname, 'portfolio')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('MongoDB Error:', err));

// API Routes
app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

const PORT = 5000;

// Error handling for the server
const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use. Please try another port.`);
                process.exit(1);
            } else {
                console.error('❌ Server error:', error);
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();