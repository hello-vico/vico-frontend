# Deploy Automatico - VICO Dashboard

## 🚀 Deploy su Netlify (Consigliato)

1. **Collega il repository su Netlify:**
   - Vai su [netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Seleziona il repository GitHub/GitLab

2. **Configurazione automatica:**
   - Build command: `npm run build` ✓ (già configurato in `netlify.toml`)
   - Publish directory: `dist` ✓ (già configurato)
   - Node version: 20 ✓

3. **Abilita deploy automatico:**
   - Settings → Build & Deploy → Continuous Deployment
   - Assicurati che "Auto-deploy" sia attivo

4. **Variabili d'ambiente (se necessarie):**
   - Settings → Environment variables
   - Aggiungi chiavi che iniziano con `VITE_` (es: `VITE_API_URL`)
   - In codice: `import.meta.env.VITE_API_URL`

5. **React Router funzionante:**
   - Il redirect SPA è già configurato in `netlify.toml`
   - Puoi navigare direttamente a `/dashboard` senza errori 404

## 🚂 Deploy su Railway (Alternativa)

1. **Collega il repository su Railway:**
   - Vai su [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub repo"

2. **Configurazione:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start` (serve la cartella `dist` sulla porta 3000)
   - Porta: 3000

3. **Variabili d'ambiente:**
   - Dashboard → Variables
   - Aggiungi le stesse variabili `VITE_*`

## ⚙️ File Creati

- `netlify.toml` - Configurazione Netlify completa
- `package.json` - Aggiunto script `start` per Railway

## 🔧 Script Disponibili

```bash
npm run dev      # Sviluppo locale
npm run build    # Build produzione
npm run preview  # Preview build locale
npm run start    # Server produzione (porta 3000)
npm run lint     # Controllo codice
```

## 📋 Prossimi Passi

- [ ] Scegli la piattaforma (Netlify consigliato per frontend)
- [ ] Configura le variabili d'ambiente (API URL, etc.)
- [ ] Testa il deploy con un push su main
- [ ] Verifica che le route di React Router funzionino

## 🌍 URL di Test

Dopo il deploy, avrai:
- Netlify: `https://vico-dashboard-xxx.netlify.app`
- Railway: `https://vico-dashboard-xxx.up.railway.app`
