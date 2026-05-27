# Mantos do Juninho — Visão Geral do Projeto

## O que é
Landing page de venda de camisas de time com painel administrativo integrado.  
O dono do site consegue adicionar e remover camisas sem precisar mexer em código.

## URLs
- **Site:** `mantosdo-juninho.vercel.app`
- **Painel Admin:** `mantosdo-juninho.vercel.app/admin.html`

## Repositório
- **GitHub:** `github.com/BrunoFeitosa5/mantosdojuninho`
- **Branch principal:** `main`

## Estrutura de Arquivos

```
/
├── index.html          → Landing page principal (visitantes)
├── admin.html          → Painel administrativo (protegido por senha)
├── styles.css          → Estilos (tema escuro + dourado)
├── script.js           → JS principal (carrega produtos dinamicamente)
├── produtos.json       → Dados de todas as camisas (fonte da verdade)
├── package.json        → Especifica Node 24.x para o Vercel
├── logo.png            → Logo do site
├── camisas/            → Pasta com as fotos das camisas
│   ├── brasil.jpg
│   ├── flamengo.jpg
│   └── ...
├── api/
│   └── save-product.js → Função serverless (Vercel) — salva via GitHub API
└── docs/               → Esta pasta com documentação
```

## Tecnologias
- **Frontend:** HTML, CSS e JavaScript puro (sem framework)
- **Hospedagem:** Vercel
- **Backend:** Vercel Serverless Functions (Node.js 24)
- **Repositório:** GitHub
- **Fonte de dados:** `produtos.json` (arquivo no repositório)
