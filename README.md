# 🎯 Soutien Conseiller - Prévoyance

Un outil de soutien professionnel et interactif pour la formation des conseillers en assurance, spécialisé dans les produits de "Prévoyance". Développé avec Next.js 15 et une interface moderne utilisant shadcn/ui.

## ✨ Fonctionnalités Principales

### 🎭 Outil de Conversation Complet
- **70 réactions client différentes** réparties sur 11 étapes de vente
- **Scénarios réalistes** basés sur des situations de vente réelles
- **Adaptation dynamique** aux réponses du client avec arguments appropriés
- **Progression visuelle** avec barre de progression et étapes claires
- **Navigation libre entre étapes** avec sauvegarde automatique de l'historique
- **Modification des réponses** possible sans perte de progression
- **Indicateurs visuels** d'état des étapes (actuelle, complétée, non commencée)

### 📚 Lexique Interactif Avancé
- **25 termes techniques** avec définitions complètes
- **Surlignage automatique** des termes dans la conversation
- **Tooltips interactifs** au survol des termes surlignés
- **Recherche et filtrage** par catégories (Assurance, Juridique, Contractuel, etc.)
- **Interface responsive** avec design moderne

### 🏢 Support Multi-Cabinet
- **PHP Courtage** - Courtage en assurances et prévoyance
- **GIF (Groupe International Français des Assurances)** - Courtage international
- **Thèmes personnalisés** pour chaque cabinet (couleurs, branding)
- **Logos et identité visuelle** distincts

### 🛠️ Outils de Validation Professionnels
- **Validateur IBAN** 🏦 - Validation des numéros de compte bancaire internationaux
  - Validation complète des IBAN français avec extraction détaillée
  - Détection automatique des banques et codes BIC
  - Validation mathématique avec modulo 97
  - Gestion des espaces et casse
  - Interface informative avec exemples
  
- **Validateur NIR** 🆔 - Validation des numéros de sécurité sociale français
  - Extraction complète des informations personnelles
  - Gestion des départements Corses (2A/2B)
  - Validation de la clé de contrôle avec modulo 97
  - Format 15 caractères standard
  - Explications détaillées du format et des composants

### 🎨 Interface Moderne et Professionnelle
- **Design responsive** avec Tailwind CSS 4
- **Composants shadcn/ui** de haute qualité
- **Animations fluides** avec Framer Motion
- **Mode sombre/clair** avec next-themes
- **Accessibilité** optimale avec ARIA et sémantique HTML5

### 🔄 Communication en Temps Réel
- **WebSocket/Socket.IO** pour les interactions en temps réel
- **Démo de chat** incluse pour tester les fonctionnalités
- **Gestion des connexions** et des déconnexions
- **Messages système** et notifications

## 🛠️ Stack Technologique

### Core Framework
- **⚡ Next.js 15** - Framework React avec App Router
- **📘 TypeScript 5** - Typage strict et sécurité
- **🎨 Tailwind CSS 4** - CSS utility-first pour un design rapide

### UI & Interactions
- **🧩 shadcn/ui** - Composants accessibles sur Radix UI
- **🎯 Lucide React** - Icônes cohérentes et modernes
- **🌈 Framer Motion** - Animations fluides et micro-interactions
- **🎨 Next Themes** - Gestion thème sombre/clair

### Data & State
- **🐻 Zustand** - Gestion d'état légère et scalable
- **🔄 TanStack Query** - Synchronisation des données
- **🔧 React Hook Form** - Formulaires performants
- **✅ Zod** - Validation de schémas

### Backend & Database
- **🗄️ Prisma** - ORM moderne avec SQLite
- **🌐 Socket.IO** - Communication en temps réel
- **🔐 NextAuth.js** - Authentification prête à l'emploi
- **📡 Axios** - Client HTTP pour les API

### Outils & Utilitaires
- **🤖 Z.ai Web Dev SDK** - Intégration AI pour le développement
- **🎨 Sharp** - Traitement d'images optimisé
- **📊 Recharts** - Visualisation de données
- **🖱️ DND Kit** - Drag & drop moderne

## 📋 Détails des Fonctionnalités

### 🎯 Simulateur de Vente

#### Étape 1: Salutation & Présentation
- Introduction professionnelle avec identité du cabinet
- Gestion des premières réactions (intérêt, mécontentement, curiosité, etc.)
- 7 scénarios de réponses client différents

#### Étape 2: Vérification du Courrier
- Confirmation de réception du courrier d'information
- Gestion des objections liées au courrier
- 7 types de réponses client adaptées

#### Étape 3: Explication de la Garantie
- Description claire des indemnités journalières hospitalières
- Explication des avantages financiers
- Gestion des questions et doutes

#### Étapes 4-11: Argumentation Avancée
- **Traitement des objections** avec 15 arguments professionnels
- **Période de réflexion** (remplacement de "rétractation")
- **Négociation et conclusion** avec techniques de vente avancées
- **Confirmation et finalisation** de la vente
- **Navigation flexible** entre toutes les étapes avec sauvegarde automatique

### 📚 Lexique Interactif

#### Termes par Catégories:
- **Général**: Assurance
- **Organisation**: Cabinet de courtage
- **Institution**: Sécurité sociale, CNIL
- **Assurance**: Mutuelle santé, Prévoyance, Protection juridique, Assurance obsèques
- **Prestation**: Indemnités journalières hospitalières, Capital décès
- **Juridique**: Tutelle, Curatelle
- **Contractuel**: Délai de carence, Date d'effet, Date d'échéance, Tacite reconduction, Résiliation, Réflexion
- **Financier**: Reste à charge
- **Technologique**: Signature électronique
- **Bancaire**: RIB, IBAN
- **Identité**: NIR
- **Réglementation**: RGPD
- **Service**: Bloctel

#### Fonctionnalités du Lexique:
- **Recherche en temps réel** dans termes et définitions
- **Filtrage par catégories** avec badges colorés
- **Tooltips au survol** avec définitions complètes
- **Cartes interactives** avec animations au hover
- **Design responsive** pour mobile et desktop
- **Intégration automatique** dans les conversations du simulateur

### 🔄 Navigation Avancée entre Étapes

#### Système de Navigation Intelligente
Le simulateur inclut un système de navigation avancé qui permet aux utilisateurs de se déplacer librement entre les 11 étapes de vente tout en conservant leur progression.

**Fonctionnalités principales:**
- **Navigation libre**: Accès direct à n'importe quelle étape (1-11) via des boutons numérotés
- **Sauvegarde automatique**: Chaque changement d'étape sauvegarde automatiquement la conversation en cours
- **Historique des étapes**: Conservation de l'historique complet pour chaque étape visitée
- **Modification des réponses**: Possibilité de modifier les réponses précédentes sans perdre les autres progrès
- **Indicateurs visuels**: Code couleur pour l'état de chaque étape
  - 🟦 **Bleu**: Étape actuelle
  - 🟨 **Orange**: Étape complétée avec des réponses
  - ⬜ **Blanc**: Étape non commencée

**Contrôles de navigation:**
- **Boutons Précédent/Suivant**: Navigation séquentielle classique
- **Boutons numérotés**: Accès direct à n'importe quelle étape
- **Barre de progression**: Indication visuelle du pourcentage de completion
- **Légende explicative**: Guide pour comprendre les indicateurs visuels

**Avantages pédagogiques:**
- **Apprentissage non-linéaire**: Les utilisateurs peuvent revenir en arrière pour pratiquer des scénarios spécifiques
- **Correction des erreurs**: Possibilité de modifier des réponses pour explorer différentes approches
- **Progression flexible**: Adaptation à différents rythmes d'apprentissage
- **Révision ciblée**: Focalisation sur les étapes nécessitant plus de pratique

**Exemple d'utilisation:**
1. Commencer à l'étape 1 (salutation)
2. Progresser jusqu'à l'étape 5 (traitement des objections)
3. Revenir à l'étape 3 pour modifier une réponse
4. Avancer directement à l'étape 8 pour pratiquer la conclusion
5. Retourner à l'étape 4 pour essayer une approche différente

### 🎨 Interface Utilisateur

#### Navigation Avancée entre Étapes

Le simulateur inclut un système de navigation avancé qui permet aux utilisateurs de se déplacer librement entre les 11 étapes de vente tout en conservant leur progression.

**Fonctionnalités principales:**
- **Navigation libre**: Accès direct à n'importe quelle étape (1-11) via des boutons numérotés
- **Sauvegarde automatique**: Chaque changement d'étape sauvegarde automatiquement la conversation en cours
- **Historique des étapes**: Conservation de l'historique complet pour chaque étape visitée
- **Modification des réponses**: Possibilité de modifier les réponses précédentes sans perdre les autres progrès
- **Indicateurs visuels**: Code couleur pour l'état de chaque étape
  - 🟦 **Bleu**: Étape actuelle
  - 🟨 **Orange**: Étape complétée avec des réponses
  - ⬜ **Blanc**: Étape non commencée

**Contrôles de navigation:**
- **Boutons Précédent/Suivant**: Navigation séquentielle classique
- **Boutons numérotés**: Accès direct à n'importe quelle étape
- **Barre de progression**: Indication visuelle du pourcentage de completion
- **Légende explicative**: Guide pour comprendre les indicateurs visuels

**Avantages pédagogiques:**
- **Apprentissage non-linéaire**: Les utilisateurs peuvent revenir en arrière pour pratiquer des scénarios spécifiques
- **Correction des erreurs**: Possibilité de modifier des réponses pour explorer différentes approches
- **Progression flexible**: Adaptation à différents rythmes d'apprentissage
- **Révision ciblée**: Focalisation sur les étapes nécessitant plus de pratique

#### Design Adaptatif:
- **Thèmes personnalisés** pour PHP (bleu/orange) et GIF (rouge/noir)
- **Barre de progression** visuelle avec étapes claires
- **Layout optimisé** (conversation 2/3, réactions 1/3)
- **Composants modernes** avec ombres et dégradés
- **Animations fluides** pour les transitions

#### Accessibilité:
- **Navigation au clavier** complète
- **Contraste élevé** pour une meilleure lisibilité
- **Balises ARIA** pour les lecteurs d'écran
- **Responsive design** pour tous les appareils

### 🛠️ Outils de Validation Professionnels

#### Validateur IBAN 🏦
Le validateur IBAN permet de vérifier la validité des numéros de compte bancaire internationaux selon les normes ISO 13616, avec une spécialisation pour les IBAN français.

**Fonctionnalités avancées:**
- **Validation complète des IBAN français**: Format FR + 2 chiffres (clé) + 5 chiffres (banque) + 5 chiffres (guichet) + 11 caractères (compte) + 2 chiffres (clé RIB)
- **Extraction détaillée des informations**:
  - Code pays (FR)
  - Code banque (5 chiffres)
  - Code guichet (5 chiffres)
  - Numéro de compte (11 caractères alphanumériques)
  - Clé RIB (2 chiffres)
- **Détection automatique des banques**: Mapping des codes banques vers codes BIC pour plus de 25 banques françaises majeures
  - BNP Paribas, Société Générale, La Banque Postale, HSBC, Crédit Agricole, etc.
- **Algorithmes avancés**: Utilise le modulo 97 pour la validation mathématique par morceaux
- **Format flexible**: Accepte les espaces et gère la casse automatiquement
- **Feedback détaillé**: Affiche toutes les composantes extraites pour les IBAN valides
- **Gestion d'erreurs précise**: Messages d'erreur spécifiques selon le type d'erreur détectée

**Exemples d'utilisation:**
```
FR14 2004 1010 0505 0001 3M02 606 (exemple fourni)
FR1420041010050500013M02606 (sans espaces)
FR76 3000 6000 0112 3456 7890 189 (BNP Paribas)
FR14 2004 1010 0505 0001 3M02 606 (La Banque Postale)
```

**Informations extraites pour un IBAN valide:**
```
✅ IBAN valide

Détails :
• Pays : FR
• Code banque : 20041
• Code guichet : 01005
• Numéro de compte : 0500013M026
• Clé RIB : 06
• BIC : PSSTFRPP (La Banque Postale)
```

#### Validateur NIR 🆔
Le validateur NIR vérifie la validité des numéros de sécurité sociale français selon le format INSEE, avec extraction complète des informations personnelles.

**Fonctionnalités avancées:**
- **Validation complète**: Vérification du format 15 caractères et de la clé de contrôle avec modulo 97
- **Extraction détaillée des informations personnelles**:
  - Sexe (1=Homme, 2=Femme)
  - Année de naissance (2 derniers chiffres)
  - Mois de naissance (01-12)
  - Département de naissance (01-95, 2A/2B pour la Corse, 99 pour l'étranger)
  - Code commune ou pays (3 chiffres)
  - Numéro d'ordre (001-999)
  - Clé de contrôle (2 chiffres)
- **Gestion des cas spéciaux**: Conversion automatique 2A→19, 2B→18 pour le calcul de la clé (Corse)
- **Validation mathématique**: Calcul de la clé de contrôle par modulo 97
- **Format flexible**: Accepte les espaces et gère la casse automatiquement
- **Feedback détaillé**: Affiche toutes les composantes extraites avec interprétation
- **Gestion d'erreurs précise**: Messages d'erreur spécifiques selon le type d'erreur détectée

**Format NIR détaillé:**
```
Positions 1-1: Sexe (1=homme, 2=femme)
Positions 2-3: Année de naissance (ex: 55 pour 1955)
Positions 4-5: Mois de naissance (01-12)
Positions 6-7: Département (01-95, 2A/2B, 99)
Positions 8-10: Commune ou code pays (3 chiffres)
Positions 11-13: Numéro d'ordre (001-999)
Positions 14-15: Clé de contrôle (modulo 97)
```

**Exemples d'utilisation:**
```
255081416802538 (exemple fourni)
285072A01312345 (avec Corse 2A)
185012B01234567 (avec Corse 2B)
285072501312345 (sans Corse)
```

**Informations extraites pour un NIR valide:**
```
✅ NIR valide

Détails :
• Sexe : Homme (1)
• Année de naissance : 55
• Mois de naissance : 08
• Département : 14
• Commune : 168
• Numéro d'ordre : 025
• Clé de contrôle : 38
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn
- SQLite (inclus avec Prisma)

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd <project-directory>

# Installer les dépendances
npm install

# Configurer la base de données
npm run db:push

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production

# Base de données
npm run db:push      # Pousser le schéma Prisma
npm run db:generate  # Générer le client Prisma
npm run db:migrate   # Migrer la base de données
npm run db:reset     # Réinitialiser la base de données

# Qualité
npm run lint         # Vérifier le code avec ESLint
```

### Utilisation

1. **Accéder à l'application**: Ouvrir [http://localhost:3000](http://localhost:3000)
2. **Choisir un cabinet**: Sélectionner PHP ou GIF
3. **Commencer la simulation**: Cliquer sur "Commencer la simulation"
4. **Naviguer entre les étapes**: 
   - Utiliser les boutons **Précédent/Suivant** pour une navigation séquentielle
   - Cliquer sur les **boutons numérotés (1-11)** pour accéder directement à une étape spécifique
   - Les couleurs indiquent l'état : bleu (actuelle), orange (complétée), blanc (non commencée)
5. **Modifier les réponses**: Revenir à une étape précédente pour modifier votre réponse sans perdre la progression
6. **Utiliser le lexique**: Cliquer sur le bouton "Lexique" en haut à droite
7. **Interagir avec les tooltips**: Survoler les termes surlignés en jaune
8. **Utiliser les validateurs**:
   - **Validateur IBAN**: Cliquer sur le bouton **IBAN** pour accéder au validateur IBAN
   - **Validateur NIR**: Cliquer sur le bouton **NIR** pour accéder au validateur NIR
9. **Bénéficier de la sauvegarde automatique**: Votre progression est sauvegardée à chaque changement d'étape
10. **Réinitialiser**: Cliquer sur **Reset** pour recommencer une nouvelle simulation

## 📁 Structure du Projet

```
src/
├── app/                          # Pages Next.js avec App Router
│   ├── page.tsx                  # Page principale du simulateur
│   ├── layout.tsx                # Layout racine
│   ├── globals.css               # Styles globaux
│   └── api/                     # Routes API
│       └── health/route.ts       # Vérification santé
├── components/                   # Composants React
│   ├── ui/                      # Composants shadcn/ui
│   ├── Lexique.tsx              # Lexique interactif principal
│   └── LexiqueTooltip.tsx       # Tooltips pour termes techniques
├── hooks/                       # Hooks personnalisés
│   ├── use-mobile.ts            # Détection mobile
│   └── use-toast.ts             # Notifications toast
└── lib/                         # Utilitaires et configurations
    ├── db.ts                    # Client Prisma
    ├── utils.ts                 # Fonctions utilitaires
    └── socket.ts                # Configuration Socket.IO

examples/
└── websocket/
    └── page.tsx                 # Démo WebSocket

public/                          # Assets statiques
├── php-logo.png                 # Logo PHP Courtage
├── gif-logo.png                 # Logo GIF
└── robots.txt                   # Configuration robots

prisma/
└── schema.prisma                # Schéma de base de données

db/
└── custom.db                    # Base de données SQLite
```

## 🎯 Cas d'Utilisation

### Formation des Conseillers
- **Entraînement réaliste** avec scénarios variés
- **Apprentissage des arguments** de vente professionnels
- **Maîtrise du lexique** technique de l'assurance
- **Gestion des objections** avec réponses adaptées

### Validation et Vérification
- **Validation IBAN** pour les prélèvements bancaires
- **Vérification NIR** pour l'identification des clients
- **Contrôle qualité** des informations collectées
- **Réduction des erreurs** administratives

### Développement de Compétences
- **Communication téléphonique** professionnelle
- **Techniques de vente** avancées
- **Connaissance produit** approfondie
- **Confiance en soi** dans les situations réelles

### Évaluation et Performance
- **Suivi de la progression** avec étapes claires
- **Analyse des réponses** client
- **Amélioration continue** des compétences
- **Certification** des conseillers

## 🔧 Configuration et Personnalisation

### Personnalisation des Cabinets
```typescript
// Modifier les couleurs et informations dans src/app/page.tsx
const cabinets = [
  {
    id: "php",
    name: "PHP Courtage",
    description: "Courtage en assurances et prévoyance",
    colors: {
      primary: "bg-blue-800",
      secondary: "bg-orange-500",
      // ... autres couleurs
    }
  }
]
```

### Ajout de Termes au Lexique
```typescript
// Ajouter dans src/components/Lexique.tsx
const lexiqueData: LexiqueTerm[] = [
  {
    term: "Nouveau terme",
    definition: "Définition du nouveau terme",
    category: "Nouvelle catégorie"
  }
]
```

### Personnalisation du Script de Vente
```typescript
// Modifier dans src/app/page.tsx
const scriptSteps: Record<number, ScriptStep> = {
  1: {
    id: 1,
    title: "1. NOUVELLE ÉTAPE",
    conseillerMessage: "Nouveau message du conseiller",
    categories: [
      // ... nouvelles catégories de réponses
    ]
  },
  // ... jusqu'à l'étape 11
}
```

### Personnalisation de la Navigation

#### Ajout ou Modification d'Étapes
```typescript
// Modifier le nombre total d'étapes dans src/app/page.tsx
// Mettre à jour les boutons de navigation et la logique de sauvegarde
const totalSteps = 11; // ou plus si nécessaire

// Mettre à jour les boutons numérotés
{Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
  <Button key={step} onClick={() => goToStep(step)}>
    {step}
  </Button>
))}
```

#### Personnalisation des Indicateurs Visuels
```typescript
// Modifier les couleurs et styles dans src/app/page.tsx
// Couleurs pour les états des étapes
step === currentStep
  ? `${getCabinetColors().primary} text-white`  // Étape actuelle
  : stepHistory[step] && stepHistory[step]?.length > 0
  ? `${getCabinetColors().secondary} text-white` // Étape complétée
  : ""                                            // Étape non commencée
```

### Personnalisation des Outils de Validation

#### Amélioration du Validateur IBAN

**Ajout de Banques au Mapping BIC**
```typescript
// Ajouter dans la fonction parseIbanFR dans src/app/page.tsx
const bicMap = {
  // Banques existantes...
  "30004": "BNPAFRPP",    // BNP PARIBAS
  "30003": "SOGEFRPP",    // SOCIETE GENERALE
  // Ajouter nouvelles banques
  "12345": "NEWBFRPP",    // Nouvelle banque exemple
  "67890": "OTHRFRPP",    // Autre banque exemple
};
```

**Personnalisation des Messages de Validation**
```typescript
// Modifier dans la fonction handleIBANValidation
if (result.valid) {
  setIbanResult(`✅ IBAN valide\n\nDétails :\n` +
    `• Pays : ${result.country}\n` +
    `• Code banque : ${result.bankCode}\n` +
    `• Code guichet : ${result.branchCode}\n` +
    `• Numéro de compte : ${result.accountNumber}\n` +
    `• Clé RIB : ${result.ribKey}` +
    (result.bic ? `\n• BIC : ${result.bic}` : '') +
    (result.customInfo ? `\n• Info perso : ${result.customInfo}` : ''))
} else {
  setIbanResult(`❌ ${result.error}`)
}
```

#### Amélioration du Validateur NIR

**Ajout d'Informations Personnelles**
```typescript
// Étendre la fonction parseNIR pour plus de détails
return {
  valid,
  sexe: sex,
  annee: year,
  mois: month,
  departement: dept,
  commune: commune,
  ordre: ordre,
  cle: key,
  // Ajouter des informations dérivées
  sexeTexte: sex === '1' ? 'Homme' : 'Femme',
  anneeComplete: year < '50' ? '20' + year : '19' + year,
  departementNom: getDepartementName(dept), // Fonction à implémenter
};
```

**Validation de Départements Spécifiques**
```typescript
// Ajouter des règles de validation spécifiques
if (dept === "99") {
  // Logique spéciale pour les nés à l'étranger
  result.paysNaissance = getPaysFromCode(commune);
}
```

## 🤝 Contribuer

1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commiter les changements (`git commit -m 'Add amazing feature'`)
4. Pusher la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Z.ai** - Pour l'assistance AI dans le développement
- **shadcn/ui** - Pour les composants UI de haute qualité
- **Next.js** - Pour le framework React incroyable
- **Tailwind CSS** - Pour le système de design utilitaire

---

**Développé avec ❤️ pour la formation professionnelle en assurance**  
**Propulsé par Z.ai 🚀**