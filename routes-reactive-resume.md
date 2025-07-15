# Liste des pages - Reactive Resume AcadeNice

Ce document récapitule les routes/pages définies dans `apps/client/src/router/index.tsx` et a été réaliser avec l'aide de ChatGPT.

---

## Structure des routes

```
/
├── HomePage                         → "/"
├── auth/                            → "/auth"
│   ├── login                        → "/auth/login"
│   ├── register                     → "/auth/register"
│   ├── forgot-password              → "/auth/forgot-password"
│   ├── reset-password               → "/auth/reset-password"
│   ├── verify-otp                   → "/auth/verify-otp"
│   ├── backup-otp                   → "/auth/backup-otp"
│   ├── verify-email                 → "/auth/verify-email"
│   ├── callback                     → "/auth/callback" (loader: authLoader)
│   └── (index redirect)             → "/auth" → redirect to "/auth/login"
├── dashboard/                       → "/dashboard"
│   ├── resumes                      → "/dashboard/resumes"
│   ├── settings                     → "/dashboard/settings"
│   └── (index redirect)             → "/dashboard" → redirect to "/dashboard/resumes"
├── builder/                         → "/builder"
│   ├── :id                          → "/builder/:id" (loader: builderLoader)
│   └── (index redirect)             → "/builder" → redirect to "/dashboard/resumes"
├── Public Résumé                    → "/:username/:slug" (loader: publicLoader)
└── ErrorPage                        → toutes les erreurs de chargement
```

---

## Tableau récapitulatif

| Route                   | Composant/Page       | Loader          | Protection |
| ----------------------- | -------------------- | --------------- | ---------- |
| `/`                     | `HomePage`           | –               | Public     |
| `/auth/login`           | `LoginPage`          | –               | Guest only |
| `/auth/register`        | `RegisterPage`       | –               | Guest only |
| `/auth/forgot-password` | `ForgotPasswordPage` | –               | Guest only |
| `/auth/reset-password`  | `ResetPasswordPage`  | –               | Guest only |
| `/auth/verify-otp`      | `VerifyOtpPage`      | –               | Guest only |
| `/auth/backup-otp`      | `BackupOtpPage`      | –               | Guest only |
| `/auth/verify-email`    | `VerifyEmailPage`    | –               | Auth only  |
| `/auth/callback`        | `<div />`            | `authLoader`    | Public     |
| `/dashboard/resumes`    | `ResumesPage`        | –               | Auth only  |
| `/dashboard/settings`   | `SettingsPage`       | –               | Auth only  |
| `/builder/:id`          | `BuilderPage`        | `builderLoader` | Auth only  |
| `/:username/:slug`      | `PublicResumePage`   | `publicLoader`  | Public     |

---

**Remarques** :

- Les routes protégées par `AuthGuard` nécessitent une session active.
- Les routes sous `GuestGuard` ne sont accessibles que pour les utilisateurs non connectés.
- `ErrorPage` est utilisé pour afficher les erreurs globales de chargement.
