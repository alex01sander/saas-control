# SaaS Control - Frontend

Este é o front-end do **SaaS Control**, uma aplicação moderna construída com React e Vite para gerenciar assinaturas, pagamentos via Stripe e painéis administrativos para empresas SaaS (Software as a Service).

## 🚀 Tecnologias Utilizadas

-   **React 19** com **Vite** para um ecossistema rápido e eficiente.
-   **TypeScript** para garantir segurança de tipos e melhor escalabilidade de código.
-   **Tailwind CSS** para estilização rápida, moderna e responsiva.
-   **React Router DOM** para navegação e rotas protegidas (Role-Based Access Control).
-   **Zod** & **React Hook Form** para validação ágil e segura de formulários.
-   **Lucide React** para iconografia elegante e leve.
-   **Axios** para solicitações HTTP e integração com o backend.
-   **Cypress** para testes E2E (Ponta a Ponta), garantindo o funcionamento do fluxo de pagamentos.

## 🌟 Funcionalidades Principais

-   **Autenticação**: Login e registro com validação robusta.
-   **RBAC (Controle de Acesso baseado em Papel)**: Rotas distintas para `ADMIN` (Painel financeiro, Gestão de Usuários) e `CLIENT` (Assinaturas, Área Premium).
-   **Dashboard Financeiro (Admin)**: Visualização em tempo real de MRR, total de assinantes e crescimento (com suporte a mock data nativo para demonstrações).
-   **Gestão de Assinantes (Admin)**: Tabela de clientes com status de assinatura integrados ao painel do Stripe.
-   **Paywall Dinâmico**: Ocultação inteligente de conteúdo premium (E-book) com "blur" visual para não-assinantes.
-   **Testes Automatizados**: Conjunto E2E para simular o fluxo de sucesso pós-checkout do Stripe.

## 🛠️ Como Executar o Projeto Localmente

### 1. Pré-requisitos
Certifique-se de que você tem o **Node.js** e o **npm** instalados na sua máquina.

### 2. Instalação

Navegue até o diretório `frontend` e instale as dependências:
```bash
cd frontend
npm install
```

### 3. Execução

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`.

### 4. Testes (Cypress)
Este projeto conta com uma suíte de testes E2E para validar jornadas críticas (ex.: Fluxo Stripe).

-   Abrir Interface do Cypress: `npm run cypress:open`
-   Executar silenciosamente: `npm run cypress:run`

## 📂 Estrutura de Rotas
As principais rotas da aplicação incluem:
- `/login` e `/register`: Acesso público e criação de conta.
- `/dashboard`: Rota restrita. Diferencia usuários clientes de administradores.
- `/admin/customers` e `/admin/finance`: Gestão administrativa financeira.
- `/plans`, `/success`, `/cancel`: Fluxos de assinatura do produto via Stripe.
- `/app/ebook`: Visualização da funcionalidade protegida (Paywall).
