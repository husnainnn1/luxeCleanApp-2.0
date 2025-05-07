
# LuxeClean-app  
**Author:** Muhammad Hasnain Sohail  
**Project:** LuxeClean – AI-Driven Dry Cleaning Web App  

---

##  Overview

LuxeClean is an AI-powered dry-cleaning platform that streamlines the customer journey—from intelligent service recommendations to eco-friendly pricing, cart management, and secure checkout using Stripe. Built with Node.js, Flask, and MySQL, it delivers a seamless experience for modern laundry services.

##  Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/husnainnn1/luxeCleanApp-2.0.git
cd luxeCleanApp-2.0
```

---

### 2. Install Node.js Dependencies

```bash
npm install
```

Required Node modules include:
- express  
- ejs  
- mysql  
- dotenv  
- bcryptjs  
- express-validator  
- helmet  
- cors  
- sequelize  

---

### 3. Set Up Python Flask API

Navigate to the `python-backend/` or Flask folder.

Install dependencies:

```bash
pip install flask flask-cors scikit-learn numpy pandas joblib
```

Ensure these `.pkl` files are in the Flask directory:
- `cleaning_recommendation_model.pkl`  
- `label_encoders.pkl`  
- `target_encoder.pkl`  
- `model_features.pkl`  

Create a `.env` file in the Node project root:

```
FLASK_API_URL=http://localhost:10000/predict
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

Run the Flask API:

```bash
python ai_recommendation.py
```

By default, it runs at `http://127.0.0.1:10000`.

---

### 4. Set Up MySQL Database

Log into MySQL:

```bash
mysql -u root -p
```

Run:

```sql
source create_db.sql;
source insert_test_data.sql;
```

Ensure the database name matches what's in your Sequelize config.

---

### 5. Start the Node.js Server

```bash
node index.js
```

App will run at: `http://localhost:8000`

## 🧪 Usage

Once the servers are running, you can:

- Register: `http://localhost:8000/register`
- Login: `http://localhost:8000/login`
- Browse services: `/price-list`
- Use AI Recommendation: `/AI-recommendation`
- Search services: `/search`
- View cart & checkout: `/cart`
- Final payment: via Stripe

---

##  Features

1. **User Registration/Login**  
Secure authentication using bcrypt.

2. **AI Recommendation System**  
Predicts the best cleaning service using a RandomForest model trained on fabric type, stain, urgency, etc.

3. **Eco-Friendly Price List**  
Sustainability-focused services are tagged and priced accordingly.

4. **Dynamic Cart**  
Users can add/remove services, select delivery dates, and proceed to checkout.

5. **Stripe Checkout**  
Payment gateway integration for seamless transactions.

6. **Service Search**  
Fast, filtered lookup across multiple categories.

7. **Data Persistence**  
Uses MySQL with Sequelize ORM for all data handling.

---

##  Model Training

Trained using a balanced dataset (`Balanced_Training_Data.csv`) and encoded using `LabelEncoder`. Stored models:
- `cleaning_recommendation_model.pkl`  
- `label_encoders.pkl`  
- `target_encoder.pkl`  
- `model_features.pkl`

Model is integrated via a Flask API running on port 10000.

---

##  Optional Deployment

To deploy LuxeClean on a cloud server:

```bash
git clone ...
cd luxeCleanApp-2.0
npm install
mysql < create_db.sql
mysql < insert_test_data.sql
node index.js
python ai_recommendation.py
```
