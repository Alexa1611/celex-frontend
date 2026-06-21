@echo off
set NODE_DIR=%LOCALAPPDATA%\Programs\nodejs
set PATH=%NODE_DIR%;%PATH%

cd /d "%~dp0"

echo Verificando Node.js...
node -v
if errorlevel 1 (
    echo.
    echo ERROR: Node.js no esta instalado.
    echo Descargalo desde https://nodejs.org e instalalo.
    pause
    exit /b 1
)

echo.
echo Verificando dependencias...
if not exist "node_modules\" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo Iniciando servidor Angular...
echo Abre en el navegador la URL que aparezca abajo (normalmente http://localhost:4200)
echo.
echo NO CIERRES esta ventana mientras uses la app.
echo.
call npm start
