# Dockerfile
# Receita para construir a imagem Docker da aplicação.
# Usamos build multi-stage (2 estágios) para gerar uma imagem final
# menor, sem as ferramentas de build que só são necessárias na hora
# de instalar dependências.

# ---------- Estágio 1: build ----------
# Imagem "builder": usada apenas para instalar as dependências.
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copiamos primeiro só o package.json/package-lock.json.
# Isso aproveita o cache do Docker: se essas dependências não mudarem,
# o "npm ci" não roda de novo em builds futuras.
COPY package*.json ./
RUN npm ci --omit=dev

# Agora copiamos o restante do código da aplicação.
COPY . .

# ---------- Estágio 2: produção ----------
# Imagem final, mais enxuta, usada de fato para rodar a aplicação.
FROM node:20-alpine
WORKDIR /usr/src/app

# Copiamos apenas o que foi gerado no estágio "builder"
# (node_modules já instalado + código da aplicação).
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

# Informa (documentação) que a aplicação escuta na porta 3000.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

EXPOSE 3000

# Comando executado quando o container é iniciado.
CMD ["node", "server.js"]
