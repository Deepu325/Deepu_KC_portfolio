# Portfolio Website

A full-stack personal portfolio built with:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB

## 🚀 Features
- Responsive design (black + neon green)
- Smooth transitions & animations
- Contact form connected to MongoDB
- Project and achievements showcase

## 🧩 Setup
1. Clone the repo
2. Install dependencies:
```bash
npm install
```
3. Add your `.env` file with MongoDB URI
4. Start the server:
```bash
npm run dev
```
5. Open [http://localhost:5000](http://localhost:5000)

## Environment Variables
Create a `.env` file in the root directory with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Directory Structure
```
portfolio-website/
│
├── server.js              # Express server & API routes
├── package.json          # Project dependencies
├── .env                  # Environment variables
│
├── models/
│   └── Contact.js       # MongoDB schema for contact form
│
├── portfolio/           # Frontend files
│   ├── index.html      # Main HTML file
│   ├── css/
│   │   └── style.css   # Styles
│   ├── js/
│   │   └── script.js   # Frontend JavaScript
│   ├── images/
│   │   └── profile.jpg # Your profile picture
│   └── assets/
│       └── resume.pdf  # Your resume
```

## Contact Form
The contact form data is stored in MongoDB. Each message includes:
- Name
- Email
- Message
- Timestamp

## Development
Run the development server with hot reload:
```bash
npm run dev
```