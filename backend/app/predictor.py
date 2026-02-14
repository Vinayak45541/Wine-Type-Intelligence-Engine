import numpy as np
import json
from .model_loader import model, scaler

# load training feature order
with open("model/features.json", "r") as f:
    feature_columns = json.load(f)

# mapping dataset columns → API schema fields
field_mapping = {
    "fixed acidity": "fixed_acidity",
    "volatile acidity": "volatile_acidity",
    "citric acid": "citric_acid",
    "residual sugar": "residual_sugar",
    "chlorides": "chlorides",
    "free sulfur dioxide": "free_sulfur_dioxide",
    "total sulfur dioxide": "total_sulfur_dioxide",
    "density": "density",
    "pH": "pH",
    "sulphates": "sulphates",
    "alcohol": "alcohol"
}

def predict_wine(data):
    input_dict = data.dict()

    # match model training order
    values = [input_dict[field_mapping[col]] for col in feature_columns]

    values = np.array([values])

    # apply scaler
    values = scaler.transform(values)

    prob = model.predict(values)[0][0]

    return {
        "prediction": "Red Wine" if prob >= 0.5 else "White Wine",
        "confidence": float(prob)
    }