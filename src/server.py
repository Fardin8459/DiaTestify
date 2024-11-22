from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset
csv_file = "src\\Healthcare-Diabetes.csv"
df = pd.read_csv(csv_file)
X = df.drop(columns=["Outcome"]).values
y = df["Outcome"].values

# Preprocessing: Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, stratify=y, random_state=27
)

# Feature Selection (Top 5 Features)
select_k_best = SelectKBest(score_func=f_classif, k=5)
X_train_selected = select_k_best.fit_transform(X_train, y_train)
X_test_selected = select_k_best.transform(X_test)
selected_features = (
    df.drop(columns=["Outcome"]).columns[select_k_best.get_support()].tolist()
)

# Feature Extraction (PCA to 3 Components)
pca = PCA(n_components=3)
X_train_pca = pca.fit_transform(X_train_selected)
X_test_pca = pca.transform(X_test_selected)

# Train Random Forest Model
rf = RandomForestClassifier(n_estimators=100, random_state=0)
rf.fit(X_train_pca, y_train)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Prepare input for prediction
        input_data = np.array(
            [
                [
                    data["pregnancies"],
                    data["glucose"],
                    data["bloodPressure"],
                    data["skinThickness"],
                    data["insulin"],
                    data["bmi"],
                    data["diabetesPedigreeFunction"],
                    data["age"],
                ]
            ]
        )

        # Apply preprocessing (scaling, feature selection, PCA)
        input_scaled = scaler.transform(input_data)
        input_selected = select_k_best.transform(input_scaled)
        input_pca = pca.transform(input_selected)

        # Prediction
        prediction = rf.predict(input_pca)
        result = (
            "Oops! You are at risk for diabetes."
            if prediction[0] == 1
            else "No diabetes detected!"
        )

        return jsonify({"result": result, "selected_features": selected_features})

    except Exception as e:
        error_message = f"Error processing the input: {str(e)}"
        print(error_message)
        return (
            jsonify(
                {"result": "Error processing the input.", "error": str(e)}
            ),
            400,
        )


@app.route("/model-accuracy", methods=["GET"])
def model_accuracy():
    models = {"Random Forest": rf}
    accuracies = {}
    for model_name, model in models.items():
        y_pred = model.predict(X_test_pca)
        accuracy = accuracy_score(y_test, y_pred)
        accuracies[model_name] = accuracy * 100

    return jsonify({"model_accuracies": accuracies})


if __name__ == "__main__":
    app.run(debug=True)
