# ⚙️ Configuración Final - Frontend + Backend

## 🎯 Puertos Configurados

| Aplicación | Puerto | URL |
|-----------|--------|-----|
| **Frontend (Vite)** | **5173** | http://localhost:5173 |
| **Backend (NestJS)** | **3000** | http://localhost:3000 |

---

## 🚀 Iniciar Proyectos

### Terminal 1 - Backend

```bash
cd mcp-service
npm run start:dev
```

**Output esperado:**
```
[Nest] xxxxx - 12/11/2025, 11:47:57     LOG [NestFactory] Starting Nest application...
Servidor backend escuchando en http://localhost:3000
```

### Terminal 2 - Frontend

```bash
cd react-frontend
npm run dev
```

**Output esperado:**
```
VITE v5.4.21  ready in 235 ms
➜  Local:   http://localhost:5173/
```

---

## 🔧 Variables de Entorno

### Backend (mcp-service/.env)

```env
# Tu API Key de Google Gemini
GEMINI_API_KEY=CodeApi

# Puerto del servidor
PORT=3000

# Configuración del chatbot
CHATBOT_NAME=EduBot Assistant
CHATBOT_VERSION=1.0.0

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Node Environment
NODE_ENV=development
```

### Frontend (react-frontend/.env)

```env
# Server Configuration
VITE_PORT=5173

# API Configuration
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=EduBot Panel Unificado
VITE_APP_VERSION=1.0.0

# Node Environment
NODE_ENV=development
```

---

## ✅ Cambios Realizados

### Frontend
- ✅ **vite.config.ts**: Puerto actualizado a 5173
- ✅ **.env**: `VITE_PORT=5173` (actualizado)
- ✅ **VITE_API_URL**: Apunta a `http://localhost:3000`

### Backend
- ✅ **.env**: Limpiado y reorganizado
- ✅ **main.ts**: Lee puerto de `process.env.PORT`
- ✅ **dotenv.config()**: Mejorado para cargar correctamente `.env`
- ✅ **GeminiService**: Ahora carga `GEMINI_API_KEY` correctamente

---

## 🔄 Flujo de Comunicación

```
Frontend (http://localhost:5173)
         ↓
      Axios
         ↓
Backend API (http://localhost:3000)
         ↓
   Google Gemini
```

---

## 📝 Notas Importantes

1. **El backend necesita la clave de Gemini** - Está configurada en `.env`
2. **CORS está habilitado** - El backend acepta solicitudes desde cualquier origen
3. **Watch mode activado** - Cambios automáticos en desarrollo se recargan
4. **HMR en Vite** - Cambios de frontend se reflejan instantáneamente

---

## ⚡ Comandos Rápidos

### Build para Producción

**Frontend:**
```bash
cd react-frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd mcp-service
npm run build
npm start
```

---

## 🐛 Solución de Problemas

### Backend no arranca
- ✅ Verificar que `.env` existe y tiene `GEMINI_API_KEY`
- ✅ Verificar que el puerto 3000 no está en uso
- ✅ Ejecutar `npm install` nuevamente

### Frontend no se conecta al backend
- ✅ Verificar que `VITE_API_URL=http://localhost:3000`
- ✅ Verificar que el backend está ejecutándose en puerto 3000
- ✅ Abrir DevTools (F12) → Console para ver errores de red

### Vite corriendo en puerto equivocado
- ✅ Verificar `vite.config.ts` tiene `port: 5173`
- ✅ Verificar `.env` tiene `VITE_PORT=5173`
- ✅ Verificar que puerto 5173 no está en uso

---

**Última actualización:** 12 de noviembre de 2025
