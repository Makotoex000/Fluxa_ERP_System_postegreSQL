# Fluxa ERP - Mobile Application

Este repositório contém o subsistema mobile do **Fluxa ERP**, desenvolvido utilizando o framework **Ionic** para fornecer uma experiência nativa e responsiva em dispositivos móveis (Android). O aplicativo integra-se ao ecossistema do Fluxa ERP, permitindo que gestores e colaboradores acessem dados estratégicos, relatórios e dashboards em tempo real diretamente de seus smartphones.

---

## 🚀 Sobre o Módulo Mobile

O Fluxa ERP Mobile foi projetado para portar a robustez e as funcionalidades analíticas do sistema web para o ecossistema móvel. Focado em usabilidade e performance, o app permite a rápida tomada de decisões por meio de componentes interativos e sincronização ágil de dados.

### 🌟 Principais Funcionalidades Implementadas
- **Dashboards Interativos:** Visualização gráfica de métricas de vendas, faturamento e fluxo de caixa otimizada para telas menores.
- **Exportação de Dados:** Geração e exportação de relatórios gerenciais diretamente em formato PDF pelo dispositivo.
- **Sincronização de Banco de Dados:** Comunicação estruturada consumindo dados com persistência integrada e consultas ao SQL Server através de camadas de API dedicada.
- **Interface Responsiva & Nativa:** Componentização utilizando elementos modernos do Ionic e TypeScript para garantir fluidez e consistência visual.

---

## 🛠️ Tecnologias Utilizadas

O desenvolvimento da vertente mobile baseia-se nas seguintes ferramentas e frameworks:

- **[Ionic Framework](https://ionicframework.com/):** Framework open-source para construção de aplicativos móveis híbridos de alta performance.
- **[Angular](https://angular.io/):** Plataforma de desenvolvimento utilizada como base para a arquitetura e lógica estrutural do app.
- **[TypeScript](https://www.typescriptlang.org/):** Supersuposto JavaScript que adiciona tipagem estática e recursos avançados ao projeto.
- **[Android Studio](https://developer.android.com/studio):** Ambiente de desenvolvimento utilizado para a compilação do projeto, geração de builds nativas e exportação do arquivo final em formato **APK**.
- **SQL Server:** Banco de dados relacional que sustenta as regras de negócio e o armazenamento centralizado do ecossistema ERP.

---

## 📱 Estrutura e Compilação Nativa

O projeto foi portado para a plataforma mobile utilizando os recursos nativos do ecossistema Capacitor/Cordova integrados ao Ionic. 

Para a geração do executável final:
1. Os recursos web do Ionic foram compilados e vinculados ao projeto Android.
2. O **Android Studio** foi empregado para gerenciar as dependências do Gradle, simular o ambiente de execução e realizar o build de release.
3. O resultado final gerado foi uma **APK** otimizada e pronta para instalação em dispositivos Android.

---

## ⚙️ Pré-requisitos para Desenvolvimento

Antes de rodar o projeto localmente, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente (`npm install -g @ionic/cli`)
- [Android Studio](https://developer.android.com/studio) (para builds e emulação Android)
- SDK do Android configurado corretamente nas variáveis de ambiente

---

## 🔧 Como Executar o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/Makotoex000/fluxa_ERP_mobile_SQLServer.git](https://github.com/Makotoex000/fluxa_ERP_mobile_SQLServer.git)
   cd fluxa_ERP_mobile_SQLServer
