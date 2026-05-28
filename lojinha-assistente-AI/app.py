import json
import os
from flask import Flask, render_template, request, jsonify, session

app = Flask(__name__)
app.secret_key = "mantos-do-juninho-max-secret-key-2024"

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL = "llama-3.3-70b-versatile"

PRODUTOS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "produtos.json")


def carregar_produtos():
    try:
        with open(PRODUTOS_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def montar_system_prompt():
    produtos = carregar_produtos()

    categorias = {"selecao": [], "nacional": [], "internacional": []}
    for p in produtos:
        cat = p.get("categoria", "nacional")
        if cat in categorias:
            categorias[cat].append(p)

    prompt = (
        "Você é o Juninho, assistente virtual da loja Mantos do Juninho — "
        "especializada em camisas de futebol autênticas.\n"
        "Atenda os clientes com simpatia, tire dúvidas e ajude nas compras.\n\n"
        "PRODUTOS DISPONÍVEIS:\n"
    )

    rotulos = {
        "selecao": "🇧🇷 SELEÇÃO",
        "nacional": "🏟️ TIMES NACIONAIS",
        "internacional": "🌍 TIMES INTERNACIONAIS",
    }

    for cat, rotulo in rotulos.items():
        lista = categorias[cat]
        if not lista:
            continue
        prompt += f"\n{rotulo}:\n"
        for p in lista:
            badge = f" ⭐ {p['badge']}" if p.get("badge") else ""
            prompt += (
                f"- {p['nome']} — {p['descricao']} — R$ {p['preco']}{badge}\n"
                f"  Tamanhos: P, M, G, GG\n"
            )

    prompt += (
        "\nINFORMAÇÕES GERAIS:\n"
        "- Frete grátis em compras acima de R$ 150,00\n"
        "- Entrega: 3 a 7 dias úteis\n"
        "- Pagamento: Pix (5% desconto), cartão até 12x sem juros, boleto\n"
        "- Para comprar, o cliente deve acessar o site ou entrar em contato pelo WhatsApp\n\n"
        "REGRAS:\n"
        "- Responda APENAS sobre a loja e seus produtos\n"
        "- Seja simpático, objetivo e use linguagem informal amigável\n"
        "- Se perguntarem algo fora da loja, diga: "
        "'Sou especializado em camisas de futebol! Posso te ajudar com nossos produtos? ⚽'\n"
        "- Quando o cliente demonstrar interesse, incentive a finalizar a compra\n"
    )
    return prompt


_system_prompt = None


def get_system_prompt():
    global _system_prompt
    if _system_prompt is None:
        _system_prompt = montar_system_prompt()
    return _system_prompt


def chamar_groq(mensagens):
    from groq import Groq
    client = Groq(api_key=GROQ_API_KEY)
    resposta = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=mensagens,
        max_tokens=512,
        temperature=0.7,
    )
    return resposta.choices[0].message.content


@app.route("/assistente")
def index():
    session["historico"] = []
    return render_template("index.html")


@app.route("/assistente/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"erro": "JSON inválido"}), 400

    mensagem = data.get("mensagem", "").strip()
    if not mensagem:
        return jsonify({"erro": "Mensagem vazia"}), 400

    if "historico" not in session:
        session["historico"] = []

    historico = session["historico"]
    historico.append({"role": "user", "content": mensagem})

    messages = [{"role": "system", "content": get_system_prompt()}] + historico

    try:
        texto = chamar_groq(messages)
    except Exception as e:
        return jsonify({"erro": f"Erro ao chamar a IA: {str(e)}"}), 500

    historico.append({"role": "assistant", "content": texto})
    session["historico"] = historico[-20:]  # mantém só as últimas 20 mensagens

    return jsonify({"resposta": texto})


@app.route("/assistente/reset", methods=["POST"])
def reset():
    session["historico"] = []
    return jsonify({"ok": True})


if __name__ == "__main__":
    print("Juninho — Assistente Mantos do Juninho")
    print("Acesse: http://localhost:5000")
    app.run(debug=True, port=5000)
