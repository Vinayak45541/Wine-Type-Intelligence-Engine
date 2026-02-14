# 🍷 AI Wine Type Classifier (A ML Web App)

A full-stack machine learning web application that predicts whether a wine sample is **Red** or **White** based on its chemical composition.

Built with an end-to-end pipeline: dataset → model training → API → interactive UI.

---

## 🚀 Live Concept

User enters chemical composition values → ML model analyzes → UI shows:

- predicted wine type
- probability confidence
- visual comparison bar (Red vs White likelihood)

---

## 🧠 Problem Statement

Wine classification is traditionally done through lab analysis and expert evaluation.  
This project demonstrates how machine learning can:

- learn patterns from chemical attributes  
- classify wine type automatically  
- expose predictions via a deployable web interface  

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Axios
- Modern responsive UI
- Interactive input controls

### Backend
- FastAPI
- TensorFlow / Keras
- Scikit-learn
- Pydantic

### Machine Learning
- Binary classification model
- Feature scaling using StandardScaler
- Trained on wine chemical dataset

---

## 📊 Model Inputs

The model predicts wine type using **11 chemical features**:

- Fixed acidity  
- Volatile acidity  
- Citric acid  
- Residual sugar  
- Chlorides  
- Free sulfur dioxide  
- Total sulfur dioxide  
- Density  
- pH  
- Sulphates  
- Alcohol  

These are real lab-measured properties used in wine chemistry analysis.

---

## 🧾 Output

The system predicts:

- 🍷 Wine Type → Red / White  
- 📈 Confidence Score → probability percentage  
- 📊 Visual probability comparison bar  

Example:

```
Prediction: White Wine  
Confidence: 78% White | 22% Red
```

---

## 🧪 Machine Learning Pipeline

1. Dataset ingestion  
2. Data preprocessing  
3. Feature scaling  
4. Model training  
5. Model export (.keras)  
6. API integration  
7. Frontend visualization  

---

## ⚙️ Setup & Run

### 1️⃣ Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs at:
```
http://127.0.0.1:8000
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at:
```
http://localhost:5173
```

---

## 🧠 Training the Model

```bash
cd backend
python train/train_model.py
```

Generates:

- trained model
- scaler
- feature order

---

## 📸 Features

- Full ML lifecycle implementation  
- Interactive UI  
- Real-time predictions  
- Confidence visualization  
- Production-ready architecture  
- Resume-grade deployment structure  

---


## 👨‍💻 Author

Engineering student focused on ML + backend systems and production deployment workflows.

---
