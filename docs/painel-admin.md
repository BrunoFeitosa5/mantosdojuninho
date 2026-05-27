# Painel Administrativo

## Acesso
- **URL:** `mantosdo-juninho.vercel.app/admin.html`
- **Senha:** definida na variável `ADMIN_PASSWORD` no Vercel

> O link do admin não aparece em nenhum lugar do site. Só quem sabe a URL e a senha consegue entrar.

---

## Como adicionar uma camisa

1. Acessa `mantosdo-juninho.vercel.app/admin.html`
2. Digita a senha de acesso
3. Preenche o formulário:
   - **Nome:** nome do time ou camisa (ex: Santos, Bayern de Munique)
   - **Descrição:** breve descrição (ex: Camisa oficial home — Temporada 2025/26)
   - **Preço:** valor com vírgula (ex: 149,90)
   - **Categoria:** Nacional / Internacional / Seleção
   - **Destaque:** opcional — Mais Vendida, Novo, Promoção, Exclusivo
   - **Foto:** upload direto da imagem (JPG, PNG ou WEBP, máximo 4 MB)
4. Clica em **Adicionar Camisa ao Site**
5. Aguarda **1 a 2 minutos** — o site atualiza automaticamente

---

## Como remover uma camisa

1. Entra no painel admin
2. Na seção **Camisas Cadastradas**, clica no **✕** ao lado da camisa
3. Confirma a remoção
4. Aguarda **1 a 2 minutos** para o site atualizar

---

## Como funciona por baixo dos panos

```
Admin preenche formulário
        ↓
POST /api/save-product (Vercel Serverless)
        ↓
Autentica a senha
        ↓
Faz upload da imagem para /camisas/ no GitHub
        ↓
Atualiza produtos.json no GitHub
        ↓
Vercel detecta o commit e redeploya (~1-2 min)
        ↓
Site principal carrega o produtos.json atualizado
```

---

## Importante
- Só funciona pelo link do Vercel. Abrir o `admin.html` direto do computador não funciona.
- Após adicionar ou remover, o site leva 1-2 minutos para atualizar (é normal).
