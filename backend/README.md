# Smart City Explorer - Backend

Django REST Framework backend API.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
copy .env.example .env
# Edit .env with your settings
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run server:
```bash
python manage.py runserver 8000
```

## API Endpoints

- `POST /api/ai/chat` - AI chat assistant
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## Tech Stack

- Django 5.0
- Django REST Framework
- PostgreSQL
- OpenAI API
