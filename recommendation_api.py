from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load trained model and expected feature list
model = joblib.load('cleaning_recommendation_model.pkl')
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
        print("🔥 /predict called")
        print("📦 Request body:", request.data)

        data = request.get_json()
        print("📦 Parsed JSON:", data)

        if not data:
            return jsonify({'error': 'No input received'}), 400

        # Prepare input
        df = pd.DataFrame([data])
        df_encoded = pd.get_dummies(df)

        # Ensure all expected features exist
        for col in model_features:
            if col not in df_encoded:
                df_encoded[col] = 0
        df_encoded = df_encoded[model_features]

        # Make prediction
        result = model.predict(df_encoded)[0]
        return jsonify({'recommendation': result})

    except Exception as err:
        print("❌ Prediction failed:", err)
        return jsonify({'error': str(err)}), 500

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(port=5050, debug=True)

