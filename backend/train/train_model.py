import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from keras.models import Sequential
from keras.layers import Dense
import json

# Load datasets
red = pd.read_csv("data/redwinequality.csv", sep=";")
white = pd.read_csv("data/whitewinequality.csv", sep=";")

# Label
red["type"] = 1
white["type"] = 0

df = pd.concat([red, white], ignore_index=True)

# DROP QUALITY
if "quality" in df.columns:
    df = df.drop("quality", axis=1)

X = df.drop("type", axis=1)
y = df["type"]

# Save feature order
with open("model/features.json", "w") as f:
    json.dump(list(X.columns), f)

# Scale
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Save scaler
import joblib
joblib.dump(scaler, "model/scaler.pkl")

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Model
model = Sequential()
model.add(Dense(64, input_shape=(X_train.shape[1],), activation="relu"))
model.add(Dense(32, activation="relu"))
model.add(Dense(1, activation="sigmoid"))

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(X_train, y_train, epochs=10)

model.save("model/wine_model.keras")

print("Model retrained successfully.")