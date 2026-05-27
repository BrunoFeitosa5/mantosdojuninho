# produtos.json — Como funciona

O arquivo `produtos.json` é a fonte de dados de todas as camisas do site.  
O site lê esse arquivo e monta os cards automaticamente.

> **Normalmente você não precisa editar este arquivo manualmente** — o painel admin faz isso automaticamente. Esta documentação existe para caso precise fazer algum ajuste manual.

---

## Estrutura de um produto

```json
{
  "id": 1,
  "nome": "Seleção Brasileira",
  "descricao": "Camisa oficial da CBF — Amarela e Verde",
  "preco": "149,90",
  "categoria": "selecao",
  "imagem": "camisas/brasil.jpg",
  "badge": "Mais Vendida",
  "badge_novo": false
}
```

## Campos

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | número | Identificador único (não repetir) |
| `nome` | texto | Nome do time/camisa |
| `descricao` | texto | Descrição curta |
| `preco` | texto | Preço com vírgula (ex: `"149,90"`) |
| `categoria` | texto | `"nacional"`, `"internacional"` ou `"selecao"` |
| `imagem` | texto | Caminho da foto (ex: `"camisas/brasil.jpg"`) |
| `badge` | texto | Texto do destaque ou `""` para nenhum |
| `badge_novo` | boolean | `true` = badge verde, `false` = badge dourado |

---

## Categorias disponíveis (filtros do site)

- `nacional` → aparece no filtro "Nacionais"
- `internacional` → aparece no filtro "Internacionais"
- `selecao` → aparece no filtro "Seleções"
