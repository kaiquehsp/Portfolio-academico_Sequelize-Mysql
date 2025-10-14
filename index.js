const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

// --- DADOS COMPLETOS DO PORTFÓLIO ---
const portfolioData = {
    nomeCompleto: "Kaique Henrique",
    curso: "Desenvolvimento de Software Multiplataforma",
    instituicao: "Fatec São José dos Campos",
    anoIngresso: 2024,
    titulo: "Software Developer",
    foto: "/img/foto og.png",
    sobreMim: `Olá! Meu nome é Kaique e sou desenvolvedor com foco em back-end...`,
    
    disciplinas: [
        "Algoritmos e Lógica de Programação",
        "Estrutura de dados",
        "Engenharia de Software 2",
        "Técnicas de programação 1",
        "Desenvolvimento Web 2",
        "Banco de dados relacional",
        "Matematica discreta"
    ],
    
    formacoes: [ "FATEC - Desenvolvimento de software multiplataforma", "ETEC - Desenvolvimento de sistemas" ],
    experiencias: [ { empresa: "MULTICARD IDENTIFICAÇÕES", cargo: "Suporte técnico" } ],
    softSkills: [ "Trabalho em equipe", "Comunicação", "Proatividade", "Organização" ],
    
    projetos: [
        {
            titulo: "PROJETO API",
            imagem: "/img/Kaytrack.png",
            descricao: `O tema desse projeto é: Dados de importação e exportação...`,
            link: "https://github.com/...",
            tecnologias: ["Python", "Pandas", "Matplotlib"]
        },
        // ... (outros projetos)
    ],

    contato: { email: "kaiquehsp5@gmail.com", telefone: "(12) 99629-5323" },
    linksSociais: { github: "https://github.com/kaiquehsp", linkedin: "https://www.linkedin.com/in/kaiquehenrique" }
};

// --- ROTAS COM A VARIÁVEL 'activePage' ---

app.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Início', 
        data: portfolioData,
        activePage: 'inicio' // Ativa o link 'Início'
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { 
        pageTitle: 'Sobre Mim', 
        data: portfolioData,
        activePage: 'sobre' // Ativa o link 'Sobre Mim'
    });
});

app.get('/disciplinas', (req, res) => {
    res.render('disciplinas', {
        pageTitle: 'Disciplinas',
        data: portfolioData,
        disciplinas: portfolioData.disciplinas,
        activePage: 'disciplinas' // Ativa o link 'Disciplinas'
    });
});

app.get('/projetos', (req, res) => {
    res.render('projetos', {
        pageTitle: 'Projetos',
        data: portfolioData,
        activePage: 'projetos' // Ativa o link 'Projetos'
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', {
        pageTitle: 'Contato',
        data: portfolioData,
        activePage: 'contato' // Ativa o link 'Contato'
    });
});

app.get('/dashboard', (req, res) => {
    const totalDisciplinas = portfolioData.disciplinas.length;
    const totalProjetos = portfolioData.projetos.length;

    const contagemTecnologias = portfolioData.projetos
        .flatMap(p => p.tecnologias || [])
        .reduce((acc, tech) => {
            acc[tech] = (acc[tech] || 0) + 1;
            return acc;
        }, {});

    const stats = { totalDisciplinas, totalProjetos, tecnologias: contagemTecnologias };
    
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        data: portfolioData,
        stats: stats,
        activePage: 'dashboard' // Ativa o link 'Dashboard'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});