# Smart City Explorer

Full-stack web application for exploring city information with AI assistance.

## Project Structure

```
SmartCity/
├── frontend/          # React + TypeScript frontend
│   ├── client/        # React application
│   ├── attached_assets/  # Images and media
│   └── package.json
│
└── backend/           # Django REST API
    ├── smartcity/     # Django project settings
    ├── api/           # API endpoints
    ├── users/         # User authentication
    ├── manage.py
    └── requirements.txt
```

## Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
Backend runs on: http://localhost:8000

## Features

- Real-time city information dashboard
- AI-powered chat assistant
- Weather and air quality data
- Events, restaurants, and hotels
- User authentication
- Interactive city maps

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- TanStack Query

**Backend:**
- Django 5.0
- Django REST Framework
- PostgreSQL
- OpenAI API

## Environment Variables

Create `.env` files in both frontend and backend directories. See `.env.example` files for required variables.
