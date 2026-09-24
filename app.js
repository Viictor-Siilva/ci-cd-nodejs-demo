// app.js
// Este arquivo contém a LÓGICA da aplicação (as rotas).
// Ele é separado do server.js de propósito: assim os testes conseguem
// importar o "app" e simular requisições sem precisar abrir uma porta
// de rede de verdade.

const express = require("express"); // framework web usado para criar as rotas
const app = express(); // instância da aplicação Express

// Rota principal (GET /)
// Quando alguém acessa a raiz do site, respondemos com uma mensagem simples
// e o status HTTP 200 (que significa "sucesso").
app.get("/", (req, res) => {
  res.status(200).send("Olá Mundo DevSecOps!");
});

// Rota de healthcheck (GET /status)
// Em aplicações reais, essa rota costuma ser usada por ferramentas de
// monitoramento (ou balanceadores de carga) para checar se o serviço
// está "vivo". Aqui devolvemos um JSON simples em vez de texto puro.
app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok", service: "ci-cd-nodejs-demo" });
});

// Exportamos o "app" (sem chamar .listen() aqui) para que:
// 1) os testes (app.test.js) possam usá-lo diretamente;
// 2) o server.js seja o único lugar responsável por "ligar" o servidor.
module.exports = app;