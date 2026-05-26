module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { senha, acao, produto, imagemBase64, imagemExtensao, produtoId } = req.body || {};

  if (!senha || senha !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  if (acao === 'verificar') {
    return res.status(200).json({ ok: true });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const BRANCH = process.env.GITHUB_BRANCH || 'main';

  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Mantos-Admin/1.0',
  };

  async function getFile(path) {
    const r = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      { headers: ghHeaders }
    );
    if (!r.ok) throw new Error(`Arquivo não encontrado: ${path}`);
    return r.json();
  }

  async function putFile(path, content, sha, message) {
    const body = {
      message,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH,
    };
    if (sha) body.sha = sha;
    const r = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      { method: 'PUT', headers: ghHeaders, body: JSON.stringify(body) }
    );
    if (!r.ok) {
      const err = await r.json();
      throw new Error(err.message || 'Erro ao salvar arquivo no GitHub');
    }
    return r.json();
  }

  try {
    if (acao === 'adicionar') {
      let imagemPath = '';

      if (imagemBase64 && imagemExtensao) {
        const ts = Date.now();
        const nomeSanitizado = (produto.nome || 'camisa')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 30);
        imagemPath = `camisas/${ts}_${nomeSanitizado}.${imagemExtensao}`;

        const imgRes = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${imagemPath}`,
          {
            method: 'PUT',
            headers: ghHeaders,
            body: JSON.stringify({
              message: `Adicionar imagem: ${imagemPath}`,
              content: imagemBase64,
              branch: BRANCH,
            }),
          }
        );
        if (!imgRes.ok) {
          const err = await imgRes.json();
          throw new Error(`Erro ao enviar imagem: ${err.message}`);
        }
      }

      const file = await getFile('produtos.json');
      const decoded = Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf-8');
      const produtos = JSON.parse(decoded);

      const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
      produtos.push({
        id: novoId,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        categoria: produto.categoria,
        imagem: imagemPath,
        badge: produto.badge || '',
        badge_novo: produto.badge_novo || false,
      });

      await putFile(
        'produtos.json',
        JSON.stringify(produtos, null, 2),
        file.sha,
        `Adicionar produto: ${produto.nome}`
      );
      return res.status(200).json({ ok: true, id: novoId });

    } else if (acao === 'excluir') {
      const file = await getFile('produtos.json');
      const decoded = Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf-8');
      const produtos = JSON.parse(decoded);
      const filtrados = produtos.filter(p => p.id !== produtoId);

      await putFile(
        'produtos.json',
        JSON.stringify(filtrados, null, 2),
        file.sha,
        `Remover produto ID: ${produtoId}`
      );
      return res.status(200).json({ ok: true });

    } else {
      return res.status(400).json({ error: 'Ação inválida' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
