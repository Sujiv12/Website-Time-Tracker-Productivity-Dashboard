# ⏱️  – Smart Time Tracking & Productivity Analytics

ChronoTrack is a Chrome extension that tracks time spent on different websites and provides meaningful productivity analytics. It helps users understand their browsing habits by classifying websites as **productive** or **unproductive** and generating weekly productivity reports through an interactive dashboard.

---

## 🚀 Features

* ⌛ **Automatic Time Tracking** – Tracks time spent on each website in real time
* 🧠 **Productivity Classification** – Categorizes websites (e.g., coding platforms vs social media)
* 📊 **Analytics Dashboard** – Visual insights of daily and weekly usage
* 📅 **Weekly Productivity Reports** – Helps users analyze focus and improve efficiency
* 🔐 **Backend Data Storage** – Securely stores user activity data
* 🧩 **Chrome Extension Interface** – Lightweight and easy to use

---

## 🛠️ Tech Stack

### Frontend (Extension & Dashboard)

* HTML5
* CSS3
* JavaScript
* Chrome Extensions API

### Backend

* Node.js
* Express.js
* MongoDB (or PostgreSQL)

---

## 📁 Project Structure

```
ChronoTrack/
│── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│   └── icons/
│
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── config/
│
│── dashboard/
│   ├── index.html
│   ├── dashboard.js
│   └── dashboard.css
│
└── README.md
```

---

## ⚙️ Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/ChronoTrack.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked** and select the `extension` folder
5. Start browsing and track your productivity 🚀

---

## 📊 How It Works

* The extension monitors active tabs and records time spent per website
* URLs are classified as productive or unproductive based on predefined rules
* Data is sent to the backend API and stored securely
* The dashboard fetches this data and displays charts and weekly reports

---

## 🎯 Use Cases

* Students tracking study vs distraction time
* Developers monitoring coding productivity
* Professionals improving focus during work hours

---

## 🔮 Future Enhancements

* AI-based website classification
* User-defined productivity rules
* Export reports as PDF
* Cloud authentication

---

## 👨‍💻 Author

**Sujit**
Aspiring Software Developer | Web & Java Enthusiast

---

