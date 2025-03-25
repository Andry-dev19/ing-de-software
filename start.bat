@echo off
echo Iniciando el servidor y frontend...

REM Iniciar Backend
cd server
if not exist "node_modules" (
    echo Instalando dependencias del backend...
    npm install
)
start cmd /k "npm start"
cd ..

REM Iniciar Frontend
cd public
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    npm install
)
start cmd /k "npm start"
cd ..

echo Todo se ha iniciado correctamente.
exit
