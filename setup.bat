@echo off
SETLOCAL

echo Installation du backend Django...

cd backend

IF NOT EXIST venv (
    python -m venv venv
    echo Environnement virtuel créé.
) ELSE (
    echo Environnement virtuel déjà existant.
)

call venv\Scripts\activate

pip install --upgrade pip
pip install -r requirements.txt

python manage.py migrate

cd ..

echo Installation du frontend React...

cd frontend
call npm install
cd ..

echo Installation terminée avec succès.

ENDLOCAL
