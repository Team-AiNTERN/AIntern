# AiNTERN – Internship Portal 🎓💼

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Contributors](https://img.shields.io/github/contributors/Team-AiNTERN/AIntern)](https://github.com/Team-AiNTERN/AIntern/graphs/contributors)  
[![Live Demo](https://img.shields.io/badge/Live-Demo-green.svg)](https://aintern-peach.vercel.app/)  

---

## 📌 About

**AiNTERN** is a web-based internship portal created for the **PM Internship Scheme**.  
It provides students with a simple way to register, log in, and apply for internships — while recruiters and admins can manage applications more effectively.  

🚀 **Live Demo** → [AiNTERN Portal](https://aintern-peach.vercel.app/)  

---

## ✨ Features

- 🔑 **User Authentication** (Register/Login via Firebase)  
- 👤 **Student Profile Management** (store data in Firestore)  
- 📝 **Internship Application System**  
- 📊 **Personalized Dashboard** with route protection  
- 🌐 **Deployment on Netlify / Vercel** for easy access  
- 📱 *(Planned)* Responsive UI for mobile  

---

## 🛠️ Tech Stack

| Area        | Technology |
|-------------|------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend/DB  | Firebase (Auth + Firestore) |
| Hosting     | Netlify / Vercel |
| Other       | FontAwesome, basic JS/CSS libraries |

---

## 🚀 Getting Started

### ✅ Prerequisites
- Git installed  
- Basic knowledge of Firebase  
- (Optional) Node.js if you want to serve locally with a dev server  

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Team-AiNTERN/AIntern.git
   cd AIntern
Add your Firebase configuration.

Create a Firebase project in the Firebase Console.

Enable Authentication (Email/Password) and Firestore Database.

Copy the config snippet from your Firebase project and paste it into firebaseConfig.js (or wherever it’s imported).

Example:

javascript
Copy code
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
Run the project locally:

Open index.html directly in the browser, or

Serve via a simple HTTP server:

bash
Copy code
npx serve .
or

bash
Copy code
python -m http.server 3000
📂 Project Structure
bash
Copy code
AIntern/
├── index.html             # Landing page
├── login.html             # Login page
├── register.html          # Registration page
├── dashboard.html         # Student dashboard
├── admin.html             # Admin panel (planned/partial)
├── assets/                # Images, icons, favicon
├── styles/                # CSS files
├── scripts/               # JavaScript files (Firebase integration, auth, forms)
├── firebaseConfig.js      # Firebase credentials (not committed to repo)
└── README.md
📸 Screenshots (add here)
(You can add screenshots of login, dashboard, applying to an internship, etc.)

⚙️ Configuration
Create a .env file (if you want to keep Firebase keys out of source code):

env
Copy code
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
Update your Firebase initialization code to read from environment variables.

🤝 Contributing
We welcome contributions! To contribute:

Fork this repo

Create a new branch → git checkout -b feature/my-feature

Commit your changes → git commit -m "Added my feature"

Push to your branch → git push origin feature/my-feature

Open a Pull Request 🚀

🛤️ Roadmap
 Recruiter / Admin panel with internship posting

 Internship search & filtering

 Notifications (email / SMS) for new internships

 Profile editing & resume upload

 Fully responsive mobile-first UI

 Unit & integration tests

📜 License
This project is licensed under the MIT License – see the LICENSE file for details.

👥 Authors / Contact
Team AiNTERN

Maintainer: [Your Name(s)]

Contact: [your.email@example.com]

Repo: github.com/Team-AiNTERN/AIntern
