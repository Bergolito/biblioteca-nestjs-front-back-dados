#!/bin/bash

echo "========================================="
echo "Instalação do Frontend - Biblioteca"
echo "========================================="
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js versão 18 ou superior."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Verifica se npm está instalado
if ! command -v npm &> /dev/null
then
    echo "❌ npm não encontrado. Por favor, instale o npm."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instala as dependências
echo "📦 Instalando dependências..."
echo ""
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ Instalação concluída com sucesso!"
    echo "========================================="
    echo ""
    echo "Para iniciar o servidor de desenvolvimento, execute:"
    echo "  npm run dev"
    echo ""
    echo "O aplicativo estará disponível em: http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Erro ao instalar dependências."
    exit 1
fi
