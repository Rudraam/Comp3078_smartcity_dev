# Smart City Explorer - Setup Guide

## ✅ Backend Setup Complete!

Your Django backend is now installed and ready. Here's what to do next:

### 1. Create Environment File
```bash
cd backend
copy .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

### 2. Create Admin User (Optional)
```bash
py manage.py createsuperuser
```

### 3. Run Backend Server
```bash
py manage.py runserver 8000
```

Backend will run on: **http://localhost:8000**

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Frontend Server
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## Testing the Application

1. Start backend: `cd backend && py manage.py runserver 8000`
2. Start frontend: `cd frontend && npm run dev`
3. Open browser: `http://localhost:5173`

## API Endpoints

- `POST /api/ai/chat` - AI chat assistant
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /admin/` - Django admin panel

## Database

Currently using **SQLite** (db.sqlite3) for easy development.

To switch to PostgreSQL later:
1. Install: `pip install psycopg2-binary`
2. Update `settings.py` DATABASES configuration
3. Run migrations: `py manage.py migrate`

## Notes

- Python warnings about "platform independent libraries" can be ignored
- Make sure both servers are running for full functionality
- Frontend proxies API calls to backend automatically
