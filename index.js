const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', './views');


const portfolioData = {
    nomeCompleto: "Kaique Henrique",
    curso: "Desenvolvimento de Software Multiplataforma",
    instituicao: "Fatec São José dos Campos",
    anoIngresso: 2024,
    titulo: "Software Developer",
    foto: "/img/foto og.png",
    sobreMim: `Olá! Meu nome é Kaique e sou desenvolvedor com foco em back-end. Gosto de entender a lógica por trás dos sistemas e trabalhar com soluções que tornem os processos mais eficientes e organizados. Tenho interesse especial por tudo que envolve estrutura, desempenho e boas práticas no desenvolvimento. Estou sempre buscando aprender mais, e aplicar o que estudo em projetos reais. Sou uma pessoa dedicada, curiosa e com muita vontade de contribuir com equipes e projetos que tragam desafios e crescimento.`,
    
 
    disciplinasCursadas: [
        "Algoritmos e Lógica de Programação",
        "Design Digital",
        "Desenvolvimento web 1",
        "Engenharia de software 1",
        "Sistemas operacionais e redes de computadores",
        "Modelagem de banco de dados",
    ],

    disciplinasEmAndamento: [
        "Estrutura de Dados",
        "Engenharia de Software 2",
        "Desenvolvimento Web 2",
        "Banco de Dados Relacional",
        "Técnicas de Programação 1",
        "Matemática Discreta",
    ],
    
    formacoes: [
        "FATEC - Desenvolvimento de software multiplataforma",
        "ETEC - Desenvolvimento de sistemas"
    ],
    
    experiencias: [
        { empresa: "MULTICARD IDENTIFICAÇÕES", cargo: "Suporte técnico" },
        { empresa: "DATASIDE", cargo: "Governança de dados" }
    ],
    
    softSkills: [ "Trabalho em equipe", "Comunicação", "Proatividade", "Organização" ],
    
    projetos: [
        {
            titulo: "PROJETO API - INTERNO",
            imagem: "/img/Kaytrack.png",
            descricao: `O tema desse projeto é: Dados de importação e exportação... <br>
                        <br>
                        Nele atuei como parte da equipe de desenvolvedores (DEV TEAM), trabalhando no back-end com Python, usando bibliotecas como Pandas e Matplotlib.
                        Esse projeto no geral, é uma ferramenta que podemos acompanhar dados estatísticos que foram divulgados diretamente pelo site do governo...
                        <br><br>`,
            link: "https://github.com/Templasan/DSM---Projeto-de-API-1-Semestre",
            tecnologias: ["HTML","CSS","Python", "Pandas", "Matplotlib"]
        },
        {
            titulo: "PROJETO API - NEWE",
            imagem: "/img/newe.png",
            descricao: `A Newe Log, nossa empresa parceira, enfrenta desafios operacionais devido à descentralização de seus processos em múltiplas ferramentas, como Microsoft Lists, Google Forms e planilhas diversas. Essa fragmentação resulta em retrabalho, risco de erros, e dificulta a obtenção de uma visão consolidada dos dados comerciais, operacionais e administrativos. 
                        <br>
                        <br>
                        A dor principal é a falta de uma única ferramenta, o que impacta a agilidade na tomada de decisões e a eficiência das equipes.
                        <br>
                        <br>
                        Nosso desafio é desenvolver uma plataforma web integrada que centralize esses processos, automatize tarefas manuais e forneça dashboards com indicadores chaves, garantindo maior controle e eficiência para a empresa.
                        <br><br>`,           
                        link: "https://github.com/CodexDSM/CodeX",
            tecnologias: ["HTML","CSS","Python"]
        },

    ],
    contato: {
        email: "kaiquehsp5@gmail.com",
    },
    
    linksSociais: {
        github: "https://github.com/kaiquehsp",
        linkedin: "https://www.linkedin.com/in/kaiquehenrique"
    }
};



app.get('/', (req, res) => {
    res.render('index', { 
        pageTitle: 'Início', 
        data: portfolioData,
        activePage: 'inicio'
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { 
        pageTitle: 'Sobre Mim', 
        data: portfolioData,
        activePage: 'sobre'
    });
});

app.get('/disciplinas', (req, res) => {
    res.render('disciplinas', {
        pageTitle: 'Disciplinas',
        data: portfolioData,
        disciplinasCursadas: portfolioData.disciplinasCursadas,
        disciplinasEmAndamento: portfolioData.disciplinasEmAndamento,
        activePage: 'disciplinas'
    });
});

app.get('/projetos', (req, res) => {
    res.render('projetos', {
        pageTitle: 'Projetos',
        data: portfolioData,
        activePage: 'projetos'
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', {
        pageTitle: 'Contato',
        data: portfolioData,
        activePage: 'contato'
    });
});

app.get('/dashboard', (req, res) => {
    const totalDisciplinas =
        portfolioData.disciplinasCursadas.length +
        portfolioData.disciplinasEmAndamento.length;
        
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
        activePage: 'dashboard'
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
