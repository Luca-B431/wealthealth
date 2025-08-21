# Gestion des Packages dans le Monorepo WealthHealth

## 📁 Structure du Monorepo

```
wealthealth/
├── package.json                 # Configuration racine
├── pnpm-workspace.yaml         # Configuration PNPM workspace
├── pnpm-lock.yaml             # Lockfile global
├── front/                     # Application React Router
│   ├── package.json
│   └── app/
└── modules/                   # Packages partagés
    └── table/                 # Package table
        ├── package.json
        └── src/
```

## ⚙️ Configuration PNPM Workspace

### `pnpm-workspace.yaml`

```yaml
packages:
  - front # Application frontend
  - modules/* # Tous les packages dans modules/
onlyBuiltDependencies:
  - "@tailwindcss/oxide"
  - esbuild
```

Cette configuration permet à PNPM de :

- Gérer les dépendances entre packages
- Créer des liens symboliques automatiques
- Optimiser l'installation des dépendances

## 📦 Packages du Monorepo

### 1. Package Table (`@Luca-B431/wh-table`)

**Localisation :** `modules/table/`

**Configuration :**

```json
{
  "name": "@Luca-B431/wh-table",
  "version": "1.0.0",
  "main": "./src/table.tsx",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@tanstack/react-table": "^8.21.3"
  }
}
```

**Fonctionnalités :**

- Composant de table réutilisable
- Basé sur TanStack React Table
- Support de filtrage et tri
- Types TypeScript inclus

### 2. Application Frontend (`front`)

**Localisation :** `front/`

**Configuration :**

```json
{
  "name": "front",
  "private": true,
  "dependencies": {
    "@Luca-B431/wh-table": "workspace:*"
    // autres dépendances...
  }
}
```

## 🔗 Dépendances Inter-Packages

### Utilisation des Packages Internes

#### Dans `front/package.json` :

```json
{
  "dependencies": {
    "@Luca-B431/wh-table": "workspace:*"
  }
}
```

La syntaxe `workspace:*` indique à PNPM d'utiliser la version locale du package.

#### Import dans le code :

```typescript
// Dans front/app/routes/employee-list.tsx
import { Table } from "@Luca-B431/wh-table";

export default function EmployeeList() {
  return (
    <div>
      <Table data={employees} />
    </div>
  );
}
```

## 🛠️ Commandes de Gestion

### Installation des Dépendances

```bash
# Installation globale (recommandé)
pnpm install

# Installation pour un package spécifique
pnpm --filter @Luca-B431/wh-table install
pnpm --filter front install
```

### Exécution de Scripts

```bash
# Exécuter un script dans tous les packages
pnpm --recursive run build

# Exécuter un script dans un package spécifique
pnpm --filter front run dev
pnpm --filter @Luca-B431/wh-table run build

# Depuis le répertoire racine
pnpm -w run test
```

### Ajout de Dépendances

```bash
# Ajouter une dépendance à un package spécifique
pnpm --filter @Luca-B431/wh-table add lodash
pnpm --filter front add axios

# Ajouter une dépendance de développement
pnpm --filter front add -D typescript

# Ajouter une dépendance workspace
pnpm --filter front add @Luca-B431/wh-table@workspace:*
```

## 🚀 Développement de Nouveaux Packages

### 1. Créer la Structure

```bash
mkdir -p modules/mon-nouveau-package/src
cd modules/mon-nouveau-package
```

### 2. Initialiser le Package

```json
{
  "name": "@Luca-B431/wh-mon-nouveau-package",
  "version": "1.0.0",
  "main": "./src/index.tsx",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

### 3. Ajouter au Workspace

Le package sera automatiquement détecté grâce à `modules/*` dans `pnpm-workspace.yaml`.

### 4. Utiliser dans l'Application

```bash
# Ajouter la dépendance
pnpm --filter front add @Luca-B431/wh-mon-nouveau-package@workspace:*

# Réinstaller les dépendances
pnpm install
```

## 📝 Bonnes Pratiques

### Naming Convention

- **Packages internes :** `@Luca-B431/wh-{nom}`
- **Préfixe wh- :** pour "WealthHealth"
- **Scope :** `@Luca-B431` pour éviter les conflits

### Versioning

- Utiliser semantic versioning (semver)
- Synchroniser les versions des packages liés
- Utiliser `workspace:*` pour les dépendances internes

### Structure des Packages

```
modules/package-name/
├── package.json
├── README.md
├── src/
│   ├── index.tsx          # Point d'entrée principal
│   ├── component.tsx      # Composants
│   └── types/            # Types TypeScript
└── dist/                 # Build output (si nécessaire)
```

### Types TypeScript

- Exporter les types depuis chaque package
- Utiliser des interfaces partagées
- Maintenir la compatibilité des types

## 🔄 Workflow de Développement

### 1. Développement Local

```bash
# Démarrer le dev server
pnpm --filter front run dev

# Les changements dans modules/ sont automatiquement pris en compte
# grâce aux liens symboliques PNPM
```

### 2. Build et Test

```bash
# Build tous les packages
pnpm --recursive run build

# Test spécifique
pnpm --filter @Luca-B431/wh-table run test
```

### 3. Publication (Future)

```bash
# Build avant publication
pnpm --recursive run build

# Publier un package
cd modules/table
npm publish --access public
```

## 🚧 Packages Futurs Planifiés

D'après `todo.md`, les packages suivants sont prévus :

1. **`@Luca-B431/wh-modal`** - Composant modal
2. **`@Luca-B431/wh-select`** - Composant select personnalisé
3. **`@Luca-B431/wh-datepicker`** - Composant de sélection de date

Chacun suivra la même structure et convention que le package table.

## 📚 Ressources

- [PNPM Workspaces Documentation](https://pnpm.io/workspaces)
- [Semantic Versioning](https://semver.org/)
- [NPM Scoped Packages](https://docs.npmjs.com/about-scopes)

---

Cette documentation sera mise à jour au fur et à mesure de l'évolution du monorepo et de l'ajout de nouveaux packages.
