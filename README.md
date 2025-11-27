📚 Portfólio Acadêmico — Node.js + Express + Sequelize + MySQL​
Este projeto é um portfólio acadêmico desenvolvido com Node.js, Express, EJS, Sequelize e MySQL, com funcionalidades completas de CRUD para projetos e páginas dinâmicas.​

Seu objetivo é apresentar informações pessoais, disciplinas, projetos acadêmicos e estatísticas gerais através de um dashboard.​

🚀 Tecnologias Utilizadas​
Tecnologia	Função
Node.js	Back-end da aplicação ​
Express	Criação de rotas e servidor ​
EJS	Template engine para páginas dinâmicas ​
MySQL	Banco de dados ​
Sequelize	ORM para interação com o MySQL ​
dotenv	Gestão de variáveis de ambiente ​
🔧 Como rodar o projeto​

1️⃣ Instalar dependências
No terminal, execute o comando para instalar as bibliotecas listadas no package.json:​

npm install

2️⃣ Configurar o Banco de Dados (.env)

Crie um arquivo chamado .env na raiz do projeto. Sem isso o projeto não conecta ao banco.​

Cole o seguinte conteúdo dentro dele, substituindo as informações de acordo com as credenciais do seu banco:
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
DB_HOST=localhost

DB_USER=root

DB_PASS=sua_senha_aqui

DB_NAME=portfolio

DB_DIALECT=mysql

DB_PORT=3306

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
⚠️ Atenção: Caso sua instalação do MySQL não tenha senha, deixe o campo vazio: DB_PASS=​

3️⃣ Iniciar o servidor
Para rodar a aplicação, execute:​

bash
node index.js


Acesse no seu navegador: **http://localhost:3000**
