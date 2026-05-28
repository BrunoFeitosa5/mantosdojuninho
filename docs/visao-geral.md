# Mantos do Juninho — Visão Geral do Projeto

## O que é
Landing page de venda de camisas de time com painel administrativo integrado.  
O dono do site consegue adicionar e remover camisas sem precisar mexer em código.

## URLs
- **Site:** `mantosdo-juninho.vercel.app`
- **Painel Admin:** `mantosdo-juninho.vercel.app/admin.html`
- **Assistente Juninho:** `mantosdo-juninho.vercel.app/assistente`

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
├── requirements.txt    → Dependências Python para o Vercel (flask, groq)
├── vercel.json         → Configuração de rotas e funções do Vercel
├── package.json        → Especifica Node 24.x para o Vercel
├── logo.png            → Logo do site
├── camisas/            → Pasta com as fotos das camisas
│   ├── brasil.jpg
│   ├── flamengo.jpg
│   └── ...
├── api/
│   ├── save-product.js → Função serverless (Vercel) — salva via GitHub API
│   └── juninho.py      → Assistente Juninho (Flask + Groq) — rota /assistente
├── lojinha-assistente-AI/
│   ├── app.py          → App Flask para desenvolvimento local
│   ├── assistente.py   → Script CLI para testes locais do assistente
│   ├── requirements.txt→ Dependências Python locais
│   └── templates/
│       └── index.html  → Interface do chat do Juninho
└── docs/               → Esta pasta com documentação
```

## Tecnologias
- **Frontend:** HTML, CSS e JavaScript puro (sem framework)
- **Hospedagem:** Vercel
- **Backend:** Vercel Serverless Functions (Node.js 24 + Python/Flask)
- **Repositório:** GitHub
- **Fonte de dados:** `produtos.json` (arquivo no repositório)
- **IA do assistente:** Groq API com modelo `llama-3.3-70b-versatile`

## Assistente Juninho
Chatbot integrado ao site acessível em `/assistente`.

- Avatar de robozinho amarelo sorridente com antena
- Conhece todos os produtos da loja via `produtos.json`
- Responde perguntas sobre camisas, preços, tamanhos, frete e pagamento
- Botão flutuante dourado na landing page abre o chat
- Botão **← Tela inicial** dentro do chat retorna ao site
- API key da Groq configurada como variável de ambiente `GROQ_API_KEY` no Vercel
