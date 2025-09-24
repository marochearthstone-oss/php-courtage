# Déploiement sur Vercel - Guide Complet

## Prérequis

1. Compte GitHub gratuit
2. Compte Vercel gratuit
3. Projet "Soutien Conseiller" prêt

## Étapes de déploiement

### 1. Configuration de la base de données

Pour Vercel, vous avez deux options :

#### Option A: Utiliser SQLite (recommandé pour le développement)
- Créez un fichier `.env` avec :
  ```
  DATABASE_URL="file:./dev.db"
  ```

#### Option B: Utiliser une base de données cloud (pour la production)
- Créez un compte sur [PlanetScale](https://planetscale.com) (gratuit)
- Ou utilisez [Supabase](https://supabase.com) (gratuit)
- Mettez à jour votre `DATABASE_URL` avec les credentials fournis

### 2. Variables d'environnement sur Vercel

Dans votre projet Vercel, ajoutez ces variables :

```
NODE_ENV=production
DATABASE_URL=votre_url_de_base_de_données
```

### 3. Déploiement

1. **Poussez votre code sur GitHub** :
   ```bash
   git add .
   git commit -m "Configuration pour Vercel"
   git push origin main
   ```

2. **Sur Vercel** :
   - Allez sur votre dashboard Vercel
   - Cliquez sur "New Project"
   - Sélectionnez votre repository GitHub
   - Cliquez sur "Import"

3. **Configuration du build** :
   - Framework Preset: Next.js
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Déployez** :
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes

## Limites connues

### Socket.IO
- Le WebSocket/Socket.IO ne fonctionne pas sur le plan gratuit Vercel
- Cette fonctionnalité est désactivée pour le déploiement Vercel
- L'application fonctionne parfaitement sans Socket.IO

### Base de données
- SQLite fonctionne pour le développement
- Pour la production, utilisez PlanetScale ou Supabase

## Résolution des problèmes

### Si le build échoue

1. **Vérifiez les logs de build** :
   - Allez dans l'onglet "Functions" de votre projet Vercel
   - Cliquez sur le build échoué pour voir les erreurs

2. **Erreurs courantes** :
   - `Module not found`: Exécutez `npm install` localement
   - `Prisma schema error`: Vérifiez votre `DATABASE_URL`
   - `TypeScript error`: Exécutez `npm run lint` localement

3. **Solutions** :
   ```bash
   # Nettoyer et réinstaller
   rm -rf node_modules package-lock.json
   npm install
   
   # Générer Prisma client
   npx prisma generate
   
   # Tester le build localement
   npm run vercel-build
   ```

### Si l'application ne démarre pas

1. **Vérifiez les variables d'environnement**
2. **Vérifiez la connexion à la base de données**
3. **Regardez les logs dans l'onglet "Logs" de Vercel**

## Mises à jour futures

Pour mettre à jour votre application :

```bash
# Faire vos modifications
git add .
git commit -m "Description des changements"
git push origin main
```

Vercel déploiera automatiquement votre mise à jour !

## Avantages du plan gratuit Vercel

- ✅ Déploiements automatiques
- ✅ SSL gratuit
- ✅ CDN mondial
- ✅ 100 GB bande passante/mois
- ✅ 6 000 minutes de build/mois
- ✅ Prévisualisations par branche

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs de build Vercel
2. Testez localement avec `npm run vercel-build`
3. Consultez la documentation Vercel
4. Vérifiez que toutes les dépendances sont dans `package.json`