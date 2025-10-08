# 202510-Demo
- Use NextJS@15.5.4 + react@19.1.0 + typescript@5.9.3 + tailwindcss@4.1.14

## Require for Environment (Pre-Installed)
- NodeJS@v22.20.0
- DockerDesktop

### 1. Clone the Repo

```bash
gh repo clone AllenKaiYueh/202510Test01
```

### 2. Install Dependencies

Open a terminal in the root directory and run:

```bash
npm install
```

### 3. Install Supabase
```bash
npm install supabase --save-dev
```
```bash
npx supabase init
```
```bash
npx supabase start
```
Finish Installed, copy [ Publishable key ] which create by Supabase, update into .env.local file.

### 4. Run Project
```bash
npm run dev
```
Open Browser run this URL

```bash
http://localhost:3000/
```
