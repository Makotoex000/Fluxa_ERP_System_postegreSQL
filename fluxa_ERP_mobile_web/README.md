# Fluxa ERP - Mobile & Web 🚀

O **Fluxa ERP** é um sistema completo e moderno de planejamento de recursos empresariais (ERP) focado no controle dinâmico de estoque, gerenciamento de vendas e organização de fornecedores. Desenvolvido para rodar de forma fluida tanto em dispositivos móveis quanto na web, o projeto foi projetado com arquitetura em nuvem para entregar alta performance, segurança e impacto real no dia a dia dos negócios.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema do projeto foi construído utilizando as melhores práticas de desenvolvimento Full Stack:

* **Frontend & Mobile:** Angular, TypeScript e HTML5/CSS3 (focado em interfaces responsivas).
* **Backend & APIs:** Node.js com JavaScript/TypeScript para uma API RESTful rápida e escalável.
* **Banco de Dados:** SQL para modelagem relacional de dados, garantindo consistência no fluxo de caixa e inventário.
* **Integrações:** Suporte a hardware local, incluindo integração com impressoras térmicas (80mm) para emissão rápida de pedidos de clientes.

---

## 📦 Funcionalidades Principais

* 📦 **Controle de Estoque Inteligente:** Monitoramento de entrada e saída de mercadorias em tempo real.
* 💼 **Gestão de Vendas:** Histórico detalhado de transações e emissão de comandas/pedidos físicos.
* 🤝 **Cadastro de Fornecedores:** Organização de parceiros comerciais e histórico de suprimentos.
* 📊 **Dashboards & Análise:** Painéis visuais para tomadas de decisão rápidas (faturamento, produtos mais vendidos, etc.).

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina o [Node.js](https://nodejs.org/) e o [Git](https://git-scm.com/).

### 1. Clonando o Repositório
```bash
git clone [https://github.com/Makotoex000/fluxa_ERP_mobile_web.git](https://github.com/Makotoex000/fluxa_ERP_mobile_web.git)
cd fluxa_ERP_mobile_web
2. Configurando o Backend (Node.js)
Bash
# Navegue até a pasta do servidor (ajuste o caminho se necessário)
cd backend 

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
3. Configurando o Frontend (Angular)
Bash
# Navegue até a pasta do cliente/frontend
cd ../frontend

# Instale as dependências
npm install

# Inicie a aplicação
ng serve
Abra o navegador em http://localhost:4200/ para ver a aplicação a rodar.

🗺️ Roadmap de Desenvolvimento (Próximos Passos)
[ ] Implementar autenticação robusta de utilizadores.

[ ] Migração da infraestrutura e banco de dados para a AWS (Cloud Computing).

[ ] Otimização de consultas SQL para relatórios mais densos.
