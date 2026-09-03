// server.js
// Responsabilidade única deste arquivo: iniciar o servidor HTTP.
// Ele NÃO contém as rotas (elas ficam no app.js) — assim o pipeline
// de CI consegue testar a aplicação sem precisar abrir uma porta de rede.

const app = require("./app"); // importa a aplicação já configurada (rotas)

// Porta em que o servidor vai rodar.
// process.env.PORT permite configurar a porta externamente (ex: no Docker,
// em produção, etc). Se não for definida, usamos 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Coloca o servidor no ar, escutando requisições na porta definida acima.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
