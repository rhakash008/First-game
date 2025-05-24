from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.pkl"
DATA_PATH = "temp.csv"

@app.post("/learn")
async def learn(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    df.to_csv(DATA_PATH, index=False)
    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, MODEL_PATH)
    return {"message": "Model trained successfully"}

@app.get("/ask")
def ask(q: str = Query(...)):
    if not os.path.exists(MODEL_PATH) or not os.path.exists(DATA_PATH):
        return {"error": "Model not trained"}
    model = joblib.load(MODEL_PATH)
    df = pd.read_csv(DATA_PATH)
    features = list(map(float, q.split(",")))
    if len(features) != df.shape[1] - 1:
        return {"error": "Input does not match training features"}
    prediction = model.predict([features])[0]
    return {"prediction": str(prediction)}
