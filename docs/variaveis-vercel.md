# Variáveis de Ambiente — Vercel

Estas variáveis ficam em:  
**Vercel → Projeto → Settings → Environment Variables**

---

## Variáveis necessárias

| Variável | Descrição |
|---|---|
| `ADMIN_PASSWORD` | Senha de acesso ao painel admin |
| `GITHUB_TOKEN` | Token do GitHub para salvar arquivos via API |
| `GITHUB_OWNER` | Usuário do GitHub (BrunoFeitosa5) |
| `GITHUB_REPO` | Nome do repositório (mantosdojuninho) |

---

## Como criar o GitHub Token

1. Acessa **github.com** → foto do perfil → **Settings**
2. Menu lateral → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
3. Clica em **Generate new token**
4. Preenche:
   - **Token name:** `mantos-admin`
   - **Expiration:** No expiration (ou 1 ano)
   - **Repository access:** Only select repositories → `mantosdojuninho`
   - **Permissions → Repository permissions → Contents:** Read and write
5. Clica em **Generate token**
6. **Copia o token** (começa com `github_pat_...`) — aparece só uma vez!
7. Cola no campo Value da variável `GITHUB_TOKEN` no Vercel

> **NUNCA compartilhe o token com ninguém nem cole em chats.** Se isso acontecer, revogue imediatamente em GitHub → Settings → Developer settings → Fine-grained tokens → Delete, e gere um novo.

---

## Após salvar as variáveis

Vá em **Deployments** no Vercel → clique nos 3 pontinhos do deploy mais recente → **Redeploy** para aplicar as variáveis.
