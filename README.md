# 🚀 SaaS Control - Backend

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF.svg)](https://stripe.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D.svg)](https://swagger.io/)

Uma solução backend robusta e escalável para controle de assinaturas, usuários e integração com o ecossistema Stripe. Desenvolvido com foco em **Arquitetura Limpa** e **Segurança**.

---

## ✨ Funcionalidades

- 🔐 **Autenticação JWT**: Sistema de login seguro com hashing de senhas via Bcrypt.
- 💳 **Integração Stripe**: Checkout sessions, webhooks automáticos e portal do cliente para gestão de assinaturas.
- 📦 **Gestão de Planos**: Cadastro e controle de planos recorrentes (mensais/anuais).
- 🛡️ **Middleware de Assinatura**: Proteção de rotas premium garantindo que apenas usuários assinantes acessem determinado conteúdo.
- 📚 **Documentação Interativa**: Swagger UI configurado para exploração e teste de todas as rotas da API.
- 🧪 **Testes de Integração**: Suite completa cobrindo fluxos críticos de negócio.

---

## 🛠️ Tecnologias

- **Linguagem**: TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Pagamentos**: Stripe API
- **Validação**: Zod
- **Documentação**: Swagger / OpenAPI 3.0
- **Testes**: Jest & Supertest

---

## 🏗️ Arquitetura

O projeto segue uma estrutura baseada em camadas para garantir separação de responsabilidades:

- **Controllers**: Lida com as requisições HTTP e delega para os serviços.
- **Services**: Contém a regra de negócio centralizada.
- **Repositories**: Responsável direta pela persistência de dados via Prisma.
- **Middlewares**: Filtros e guardas de segurança (Auth, Subscriptions).

---

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js (v20+)
- Docker & Docker Compose
- Conta no Stripe (para chaves de teste)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/saas-control.git
cd saas-control
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o ambiente:
Crie um arquivo `.env` baseado no exemplo:
```env
DATABASE_URL="postgresql://root:root@localhost:5432/saas_control?schema=public"
JWT_SECRET="sua-chave-secreta"
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. Suba o Banco de Dados:
```bash
docker-compose up -d
```

5. Execute as Migrations:
```bash
npx prisma db push
```

6. Inicie em modo desenvolvimento:
```bash
npm run dev
```

---

## 📖 Documentação

Com o servidor rodando, acesse a documentação interativa em:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🧪 Testes

Para garantir a qualidade e funcionamento das regras de negócio, execute:
```bash
npm test
```

---

## 📄 Licença

Este projeto está sob a licença ISC.
