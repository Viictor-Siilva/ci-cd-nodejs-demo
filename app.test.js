// app.test.js
// Testes automatizados da aplicação, usando Jest (framework de testes)
// e Supertest (biblioteca que simula requisições HTTP sem precisar
// subir um servidor de verdade na rede).
//
// É esse arquivo que o pipeline de CI executa (npm test) para garantir
// que o código continua funcionando antes de qualquer merge/build.

const request = require("supertest"); // simula requisições HTTP
const app = require("./app"); // importa o app (sem servidor rodando)

// Agrupa os testes relacionados à rota "/"
describe("Rota /", () => {
  it("deve responder com status 200 e a mensagem esperada", async () => {
    // Simula um GET na rota "/"
    const response = await request(app).get("/");

    // Verifica se o status HTTP retornado é 200 (sucesso)
    expect(response.statusCode).toBe(200);

    // Verifica se o texto retornado é exatamente o esperado
    expect(response.text).toBe("Olá Mundo DevSecOps!");
  });
});

// Agrupa os testes relacionados à rota "/status"
describe("Rota /status", () => {
  it("deve responder com status 200 e um JSON de healthcheck", async () => {
    // Simula um GET na rota "/status"
    const response = await request(app).get("/status");

    // Verifica o status HTTP
    expect(response.statusCode).toBe(200);

    // Verifica se o corpo (JSON) da resposta é exatamente o esperado
    expect(response.body).toEqual({ status: "ok", service: "ci-cd-nodejs-demo" });
  });
});