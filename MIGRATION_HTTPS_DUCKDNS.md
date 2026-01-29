# Plan de Migration "Zéro Coût" avec DuckDNS

Ce guide détaille étape par étape comment configurer un accès HTTPS gratuit pour votre backend Node.js existant, afin de permettre le déploiement du frontend sur Vercel sans erreur "Mixed Content".

## Vue d'ensemble
*   **Domaine :** Utilisation d'un sous-domaine gratuit via **DuckDNS** (ex: `mon-projet.duckdns.org`).
*   **Serveur Web :** Installation de **Nginx** sur votre VPS pour gérer le trafic web et sécuriser la connexion.
*   **Certificat SSL :** Génération automatique et gratuite avec **Certbot (Let's Encrypt)**.
*   **Backend :** Votre application Node.js/Express reste inchangée, Nginx lui transmettra les requêtes.

---

## Étape 1 : Obtenir un nom de domaine gratuit

1.  Allez sur [DuckDNS.org](https://www.duckdns.org/).
2.  Connectez-vous (via Google, GitHub, etc.).
3.  Dans le champ "sub domain", choisissez un nom (ex: `quickflow-api`).
4.  Cliquez sur **add domain**.
5.  Mettez à jour l'IP ("current ip") avec l'IP de votre VPS : `5.250.176.153`.
6.  Notez votre nouveau domaine complet (ex: `quickflow-api.duckdns.org`).

---

## Étape 2 : Préparer le VPS

Connectez-vous à votre serveur VPS en SSH.

### 2.1 Installer Nginx
Nginx va servir de "porte d'entrée" sécurisée.

```bash
sudo apt update
sudo apt install nginx -y
```

### 2.2 Configurer le Proxy Inversé (Reverse Proxy)
Nous allons dire à Nginx : "Tout ce qui arrive sur `quickflow-api.duckdns.org`, envoie-le à mon app Node.js sur le port 5026".

1.  Créez le fichier de configuration :
    ```bash
    sudo nano /etc/nginx/sites-available/quickflow
    ```

2.  Collez le contenu suivant (⚠️ **Remplacez `votre-domaine.duckdns.org` par votre vrai domaine DuckDNS**) :

    ```nginx
    server {
        server_name votre-domaine.duckdns.org;

        location / {
            proxy_pass http://localhost:5026; # Le port défini dans votre .env Backend
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            
            # Augmenter la taille max d'upload (important pour vos images)
            client_max_body_size 10M;
        }
    }
    ```

3.  Sauvegardez (`Ctrl+O`, `Entrée`) et quittez (`Ctrl+X`).

4.  Activez le site :
    ```bash
    sudo ln -s /etc/nginx/sites-available/quickflow /etc/nginx/sites-enabled/
    sudo rm /etc/nginx/sites-enabled/default  # Supprime la config par défaut si elle existe
    ```

5.  Vérifiez et redémarrez Nginx :
    ```bash
    sudo nginx -t  # Doit afficher "syntax is ok"
    sudo systemctl restart nginx
    ```

---

## Étape 3 : Activer le HTTPS (SSL)

1.  Installez Certbot :
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    ```

2.  Générez le certificat (⚠️ **Utilisez votre vrai domaine**) :
    ```bash
    sudo certbot --nginx -d votre-domaine.duckdns.org
    ```
    *   Entrez votre email quand demandé.
    *   Acceptez les conditions (`A`).
    *   Si on vous demande de rediriger le trafic HTTP vers HTTPS, choisissez **Oui** (Option 2).

✅ **Votre backend est maintenant accessible en HTTPS via `https://votre-domaine.duckdns.org`.**

---

## Étape 4 : Mettre à jour le code Backend

1.  Dans votre projet local, ouvrez `backend/src/app.js`.
2.  Mettez à jour la liste `allowedOrigins` (CORS) que j'avais annotée avec un TODO :

    ```javascript
    const allowedOrigins = [
      "http://localhost:3000",
      // ... autres ...
      "https://votre-frontend-vercel.app" // L'URL que Vercel vous donnera
    ];
    ```
    *Note : Nginx gère l'arrivée de la requête, mais c'est toujours Express qui valide si l'origine (Vercel) a le droit d'accéder.*

3.  Poussez ces changements sur votre VPS (via git pull) et redémarrez votre app Node.js (ex: `pm2 restart all`).

---

## Étape 5 : Déployer le Frontend sur Vercel

1.  Commitez et poussez vos modifications locales (le fichier `vercel.json` et les corrections d'URLs que j'ai faites).
2.  Allez sur Vercel et importez votre projet Git.
3.  Configurez :
    *   **Root Directory:** `frontend`
    *   **Environment Variable:**
        *   Nom : `VITE_BACKEND_URL`
        *   Valeur : `https://votre-domaine.duckdns.org` (Sans slash à la fin)

4.  Lancez le déploiement ! 🚀

---

## Résumé
Votre architecture finale sera :
1.  **Utilisateur** -> HTTPS -> **Frontend (Vercel)**
2.  **Frontend** -> HTTPS -> **Votre Domaine DuckDNS** -> **VPS (Nginx)**
3.  **Nginx** -> HTTP (Local) -> **Backend Node.js** -> **MySQL**
