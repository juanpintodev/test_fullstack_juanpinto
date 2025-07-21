#!/bin/bash

echo "=========================================="
echo "  Task List App - Setup Simple"
echo "=========================================="
echo ""

# Check Node.js
echo "1. Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo " Node.js no está instalado"
    echo "   Descarga Node.js desde: https://nodejs.org/"
    echo "   Necesitas la versión 18 o superior"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo " Node.js versión 18+ es requerida"
    echo "   Versión actual: $(node -v)"
    echo "   Actualiza Node.js desde: https://nodejs.org/"
    exit 1
fi

echo " Node.js $(node -v) está instalado"
echo ""

# Install dependencies
echo "2. Instalando dependencias..."
echo "   Esto puede tomar unos minutos..."

npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

echo " Dependencias instaladas"
echo ""

# Create environment files
echo "3. Creando archivos de configuración..."

if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo " Creado backend/.env"
else
    echo "  backend/.env ya existe"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/env.example frontend/.env.local
    echo " Creado frontend/.env.local"
else
    echo "  frontend/.env.local ya existe"
fi

echo ""
echo "=========================================="
echo "  ¡Setup completado!"
echo "=========================================="
echo ""
echo " Próximos pasos:"
echo ""
echo "1. Configura MongoDB Atlas:"
echo "   - Ve a https://www.mongodb.com/atlas"
echo "   - Crea una cuenta gratis"
echo "   - Crea un cluster gratuito"
echo "   - Copia la URL de conexión"
echo "   - Edita backend/.env con tu URL"
echo ""
echo "2. Configura Firebase:"
echo "   - Ve a https://console.firebase.google.com/"
echo "   - Crea un nuevo proyecto"
echo "   - Habilita Authentication (Email/Password)"
echo "   - Obtén la configuración desde Project Settings"
echo "   - Descarga la Service Account key para el backend"
echo "   - Edita frontend/.env.local y backend/.env"
echo ""
echo "3. Ejecuta la aplicación:"
echo "   ./quick-start.sh"
 