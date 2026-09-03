# ci-cd-nodejs-demo

Aplicação Node.js (Express) simples, criada como exemplo prático de
Integração Contínua (CI) com GitHub Actions e Docker — atividade da
disciplina de DevOps (UNIVAS).

## Estrutura do projeto

```
ci-cd-nodejs-demo/
├── app.js                     # lógica da aplicação (rotas / e /status)
├── server.js                  # inicialização do servidor
├── app.test.js                # testes automatizados (jest + supertest)
├── package.json
├── Dockerfile                 # build multi-stage da imagem
├── .dockerignore
├── .gitignore
└── .github/
    └── workflows/
        └── ci.yml              # pipeline de CI (GitHub Actions)
```

## Rodando localmente

```bash
npm install
npm start
```

Acesse http://localhost:3000 → "Pipeline de CI funcionando com sucesso!"
Acesse http://localhost:3000/status → `{"status":"ok","service":"ci-cd-nodejs-demo"}`

## Rodando os testes

```bash
npm test
```

## Rodando com Docker

```bash
docker build -t ci-cd-nodejs-demo .
docker run -p 3000:3000 -d ci-cd-nodejs-demo
```

## Subindo para o GitHub e disparando o pipeline

1. Crie um repositório vazio no GitHub (público ou privado).
2. No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Commit inicial - pipeline de CI"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>.git
git push -u origin main
```

3. Assim que o push terminar, abra a aba **Actions** do repositório no
   GitHub: o workflow `.github/workflows/ci.yml` roda automaticamente,
   executando checkout, instalação de dependências, testes (Jest) e o
   build da imagem Docker.

## Em quais situações essa abordagem com CI pode ser útil dentro de uma empresa

A Integração Contínua é útil em praticamente qualquer empresa que
mantenha software em produção com mais de uma pessoa desenvolvendo ao
mesmo tempo. Em times pequenos, ela evita que mudanças de diferentes
desenvolvedores quebrem o sistema sem que ninguém perceba, já que cada
push é testado automaticamente antes de chegar à branch principal. Em
times maiores, torna-se ainda mais importante: com muitas alterações
por dia, testar tudo manualmente seria inviável, e o CI garante um
retorno rápido para quem introduziu um erro, permitindo corrigi-lo
enquanto o contexto da mudança ainda está fresco. A prática também é
essencial antes de lançamentos, pois assegura que a branch principal
esteja sempre estável e pronta para ser implantada, além de servir de
base para pipelines de Entrega Contínua (CD), que automatizam o deploy
em produção. Por fim, reduz o retrabalho e o risco de erro humano em
tarefas repetitivas — como rodar testes e gerar builds — liberando a
equipe para focar no desenvolvimento de funcionalidades.
