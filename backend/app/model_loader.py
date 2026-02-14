from keras.models import load_model
import joblib

model = load_model("model/wine_model.keras")
scaler = joblib.load("model/scaler.pkl")