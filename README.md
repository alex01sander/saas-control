# SaaS Control

**SaaS Control** é uma plataforma Full-stack robusta projetada para gerenciar negócios baseados em assinatura (SaaS) com foco em experiência do usuário premium, controle financeiro facilitado e segurança profunda baseada em papéis.

## 🎯 Visão Geral do Projeto

Este projeto consiste em duas camadas principais: um **Frontend React/Vite** veloz e atraente, e uma **API Node.js/Express** escalável, ambos fortemente tipados com TypeScript. O objetivo principal do SaaS Control é permitir a rápida implementação de produtos baseados em assinatura, lidando com todo o ciclo de vida do cliente:
*   Cadastro e Autenticação Segura (JWT)
*   Integração Direta de Cobrança (Stripe Checkout & Billing Portal)
*   Sincronização de Assinantes via Webhooks
*   Painel de Controle Financeiro para Líderes de Negócios (Admin MRR & Assinantes)
*   Painel de Autoatendimento para o Cliente Final
*   Sistema *Paywall* Dinâmico - Controle de acesso a funcionalidades (Ex: E-book Premium) baseado no status ativo ou pendente da assinatura.

## 🏗️ Arquitetura e Tecnologias

### [Backend](./backend) (Node.js & Express)
A fundação de dados do projeto. Projetado em camadas (Controllers, Services, Repositories) para fácil expansão e manutenção.
*   **TypeScript** (com execução nativa pelo `tsx watch`).
*   **PostgreSQL** gerenciado via **Prisma ORM**.
*   **Stripe SDK** para criação de checkouts, portais de autoatendimento e validação de Webhooks.
*   Segurança: Validações (Zod), criptografia (bcryptjs) e middlewares próprios (`ensureAuthenticated`, `ensureAdmin`, `ensureSubscribed`).
*   Documentação interativa construída através do **Swagger**.

### [Frontend](./frontend) (React & Vite)
A interface de usuário dinâmica focada na melhor experiência possível. Veja o [README específico do Frontend](./frontend/README.md).
*   **React 19** e **Vite**, projetados com suporte ao **Tailwind CSS**.
*   Testes **E2E com Cypress** para validação vital da jornada transacional do usuário.
*   Implementação fluida de Content Blurring para atrair a conversão sem impactar o design original.
*   Gráficos Analíticos Simulados Dinamicamente, suportando "Mock Data" caso nenhuma assinatura seja detectada ainda.

## 🚀 Instalando o Projeto

O SaaS Control exige instalação paralela em seus diretórios locais e configuração individual das variáveis de ambiente de cada ecossistema (banco, portas, API Stripe).

### Passos de Configuração do Backend
```bash
cd backend
npm install

# Configure seu .env baseado em processos que exigem:
# DATABASE_URL="..." (Obrigatório, URI PostgreSQL)
# STRIPE_API_KEY="..." (Acesso Stripe)
# STRIPE_WEBHOOK_SECRET="..." (Para sincronização automática)
# JWT_SECRET="..."

npm run migrate (Caso haja script de migração Prisma no package)
npm run dev
```

### Passos de Configuração do Frontend
Em um novo terminal:
```bash
cd frontend
npm install
npm run dev
```

Acesse o sistema localmente na porta padrão do frontend (normalmente `http://localhost:5173`).


## 🛡️ Gestão de Segurança (RBAC)

O SaaS Control vem com papéis pré-configurados no banco de dados (`role: String`):
-   `ADMIN`: Possui acesso à Gestão de Assinantes, Estatísticas de MRR, Churn e fluxo total da receita global.
-   `CLIENT`: Possui acesso restrito ao próprio fluxo financeiro de assinatura (Plano Escolhido) e aos recursos VIP.

### Sistema de Webhooks e `StripeService`
Ao utilizar o Stripe, não dependemos de chamadas bloqueantes entre front e back no momento crítico do pagamento. O Backend provê uma rota segura (`/webhooks/stripe`) para lidar de forma assíncrona com `checkout.session.completed`, que cria ou finaliza o provisionamento (upsert) da permissão de acesso (Assinatura ATIVA) de forma automática.

## 📝 Licença

A plataforma está disponível em seu status atual e todas as lógicas essenciais estão abertas a reestruturações mediante regras de seu próprio negócio SaaS. Desenvolvido para crescimento escalável.
