# AiNTERN – Internship Portal 🎓💼

## 📌 About

**AiNTERN** is a web-based internship portal created for the **PM Internship Scheme**.  
It provides students with a simple way to register, log in, and apply for internships — while recruiters and admins can manage applications more effectively.  

🚀 **Live Demo** → [AiNTERN Portal](https://ainternnn.netlify.app/)  

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
   apiKey: "AIzaSyBbMUoq3Cjx3IvWo-b2hPsp-s9E3cAHRsY",
  authDomain: "aintern-285f9.firebaseapp.com",
  projectId: "aintern-285f9",
  storageBucket: "aintern-285f9.firebasestorage.app",
  messagingSenderId: "1035209257137",
  appId: "1:1035209257137:web:dd20ce2d10842d6f127290",
  measurementId: "G-4QSNCJQYFY"
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

⚙️ Configuration
Create a .env file (if you want to keep Firebase keys out of source code):

env
Copy code
  NEXT_PUBLIC_SUPABASE_URL=https://xozzpzasbdvgpyysuvew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvenpwemFzYmR2Z3B5eXN1dmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MDA0NjMsImV4cCI6MjA3MzI3NjQ2M30.SiiaH38cNz21EHpvGOZNQCQ5vW2f6H2GBocGn4qYfGM
  apiKey: "AIzaSyBbMUoq3Cjx3IvWo-b2hPsp-s9E3cAHRsY",
  authDomain: "aintern-285f9.firebaseapp.com",
  projectId: "aintern-285f9",
  storageBucket: "aintern-285f9.firebasestorage.app",
  messagingSenderId: "1035209257137",
  appId: "1:1035209257137:web:dd20ce2d10842d6f127290",
  measurementId: "G-4QSNCJQYFY"

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
Maintainer: Pritish, Sarthak, Srijan 
Contact: Support@aintern.netlify.app
Repo: github.com/Team-AiNTERN/AIntern


⭐ If you like this project, don’t forget to star this repo on GitHub!
