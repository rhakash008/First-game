# ML Q&A System

## Backend (FastAPI + RandomForest)
- POST `/learn`: Upload CSV to train model.
- GET `/ask?q=...`: Predict result using trained model.

## Frontend (Next.js)
- `/learn`: Upload CSV file.
- `/ask`: Query with comma-separated features.

## How to Run

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npx create-next-app@latest .  # If not yet created
npm install
npm run dev
```

Then visit: `http://localhost:3000/learn` and `http://localhost:3000/ask`
