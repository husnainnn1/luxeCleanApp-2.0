# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load model and supporting encoders/features
model = joblib.load('cleaning_recommendation_model.pkl')
label_encoders = joblib.load('label_encoders.pkl')
target_encoder = joblib.load('target_encoder.pkl')
model_features = joblib.load('model_features.pkl')

@app.route("/", methods=["GET"])
def home():
    return "Flask server is running!"

# Handle CORS preflight
@app.route('/predict', methods=['OPTIONS'])
def handle_preflight():
    response = app.make_default_options_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print(" /predict called")
        data = request.get_json()
        print(" Parsed JSON:", data)

        if not data:
            return jsonify({'error': 'No input received'}), 400

        # Convert to DataFrame
        df = pd.DataFrame([data])

        # Apply label encoders to each feature
        for col in df.columns:
            if col in label_encoders:
                le = label_encoders[col]
                try:
                    df[col] = le.transform(df[col])
                except ValueError as e:
                    return jsonify({'error': f'Invalid input for "{col}": {df[col].values[0]}. Please select a valid option.'}), 400
            

        # Align columns with expected model features
        for col in model_features:
            if col not in df.columns:
                df[col] = 0
        df = df[model_features]

        # Predict and decode result
        prediction = model.predict(df)[0]
        decoded_result = target_encoder.inverse_transform([prediction])[0]

        return jsonify({'recommendation': decoded_result})

    except Exception as err:
        print(" Prediction failed:", err)
        return jsonify({'error': str(err)}), 500

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

#if __name__ == '__main__':
#   app.run(port=5050, debug=True)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)