#!/bin/bash

echo "🚀 Démarrage du backend Django..."
cd backend || exit
source venv/bin/activate
gnome-terminal -- bash -c "python manage.py runserver; exec bash"

cd ../frontend || exit
echo "🚀 Démarrage du frontend React..."
gnome-terminal -- bash -c "npm start; exec bash"
