# 📦 Inventory Management System

A full-stack Inventory Management System built using modern web technologies.

This application allows users to manage inventory items, customers, sales, and generate reports with export functionality.

---

## 🚀 Live Deployment

- 🌐 Frontend: Deployed on **Vercel**
- 🖥 Backend: Deployed on **Render**
- 🗄 Database: **MongoDB Atlas**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- React Router
- Context API (Authentication)
- XLSX (Excel Export)
- jsPDF (PDF Export)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication (Access + Refresh Token)
- Nodemailer (Email Reports)
- Cookie-based Authentication

---

# 🔐 Features

## 1️⃣ Authentication
- Login system
- JWT-based authentication
- Access & Refresh token mechanism
- Secure httpOnly cookies
- Protected frontend routes (Auth Guard)
- Backend JWT middleware validation

---

## 2️⃣ Inventory Management
- Add new inventory items
- Edit item details
- Delete items
- Search items by name or description

Each item contains:
- Name
- Description
- Quantity
- Price

---

## 3️⃣ Customer Management
- Add customers
- Edit customer details
- Delete customers

Customer details:
- Name
- Address
- Mobile Number

---

## 4️⃣ Sales Management
- Record sales transactions
- Select existing product
- Select customer or Cash
- Store quantity and sale price
- Track date of transaction

---

## 5️⃣ Reports
- Sales Report
- Item Report
- Customer Ledger (All transactions related to a customer)

---

## 6️⃣ Data Export
- 🖨 Print
- 📊 Export to Excel
- 📄 Export to PDF
- 📧 Send Report via Email

---

# 🧠 Architecture Overview

Frontend (Vercel - CDN Hosted)
        ↓
Backend API (Render - Node Server)
        ↓
MongoDB Atlas (Cloud Database)

This separation ensures:
- Better scalability
- Independent deployments
- Clean architecture
- Industry-standard SPA + API structure

---

# 💻 Run Project Locally

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

---

# 🖥 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder:

```env
PORT=5000
MONGO_ATLAS_URL=your_mongodb_connection_string
ACCESS_SECRET=your_access_secret_key
REFRESH_SECRET=your_refresh_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🌐 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder:

```env
VITE_BACKEND_ROUTE=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Environment Variables Explained

## Backend

| Variable | Description |
|-----------|-------------|
| PORT | Server Port |
| MONGO_ATLAS_URL | MongoDB Atlas connection string |
| ACCESS_SECRET | JWT Access Token Secret |
| REFRESH_SECRET | JWT Refresh Token Secret |
| EMAIL_USER | Gmail address for sending reports |
| EMAIL_PASS | Gmail App Password |

---

## Frontend

| Variable | Description |
|-----------|-------------|
| VITE_BACKEND_ROUTE | Backend API Base URL |

---

# 📂 Project Structure

```
root
│
├── frontend
│   ├── src
│   ├── .env
│   └── package.json
│
├── backend
│   ├── src
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# 🔄 Authentication Flow

1. User logs in
2. Backend generates:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
3. Tokens stored as secure httpOnly cookies
4. Backend middleware verifies access token
5. If expired → refresh token generates new access token
6. Frontend Auth Context controls protected routing

---

# ⚡ Deployment Notes

- Frontend hosted on Vercel
- Backend hosted on Render
- SPA routing handled via `vercel.json`
- Cookies configured with:
  - `httpOnly`
  - `secure`
  - `sameSite: "none"`

---

# 📈 Learning Highlights

This project demonstrates:

- Full-stack development
- JWT authentication implementation
- Protected route architecture
- Report generation (Excel + PDF)
- Email attachments using Nodemailer
- Production deployment
- Environment variable management
- CORS configuration
- Cookie-based authentication

---

# 👨‍💻 Author

**Akash Surendran**

---

# 📌 Future Improvements

- Role-based authentication
- Dashboard analytics
- Pagination
- Docker containerization
- CI/CD pipeline
- Microservices migration

---

⭐ If you found this project helpful, feel free to star the repository.
