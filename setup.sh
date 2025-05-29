#!/bin/bash

echo "📦 Installation du backend Django..."
cd backend || exit

# Création de l'environnement virtuel
python3 -m venv venv
source venv/bin/activate

# Installation des dépendances
pip install -r requirements.txt

# Migrations de la base de données
python manage.py migrate

cd ..

echo "🖼️ Installation du frontend React..."
cd frontend || exit

npm install

cd ..

echo "✅ Installation terminée."
