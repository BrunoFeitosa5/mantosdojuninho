import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))

system_prompt = """
Você é o Max, assistente virtual da Camisetas Brasil.
Responda APENAS sobre os produtos da loja.

Produtos disponíveis:
- Camiseta Brasil Verde - Tamanhos P, M, G, GG - R$79,90
- Camiseta Brasil Amarela - Tamanhos P, M, G - R$79,90
- Camiseta Polo Azul - Tamanhos M, G, GG - R$89,90
- Camiseta Básica Branca - Tamanhos P, M, G, GG, XGG - R$49,90
- Camiseta Estampada Preta - Tamanhos P, M, G - R$69,90

Se perguntarem algo fora da loja, diga: 
'Só posso ajudar com informações sobre nossas camisetas!'
"""

historico = [{"role": "system", "content": system_prompt}]

print("Max — Assistente da Camisetas Brasil")
print("Digite 'sair' para encerrar.\n")

while True:
    pergunta = input("Cliente: ")
    
    if pergunta.lower() == "sair":
        print("Até logo!")
        break
    
    historico.append({"role": "user", "content": pergunta})
    
    resposta = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=historico
    )
    
    texto = resposta.choices[0].message.content
    historico.append({"role": "assistant", "content": texto})
    
    print(f"\nMax: {texto}\n")