@echo off
SETLOCAL

echo 🚀 Démarrage de l'application Django + React...

REM Lancer le backend dans un terminal séparé
start "Backend - Django" cmd /k "cd backend && call venv\Scripts\activate && python manage.py runserver"

REM Lancer le frontend dans un autre terminal
start "Frontend - React" cmd /k "cd frontend && npm start"

ENDLOCAL
