const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./database/connection');
const Projeto = require('./database/models/Projeto');


sequelize.sync({ alter: true })
    .then(() => {
        console.log(" Banco sincronizado!");
    })
    .catch(err => {
        console.error("Erro ao sincronizar o banco:", err);
        process.exit(1);
    });

app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const portfolioData = {
    nomeCompleto: "Kaique Henrique",
    curso: "Desenvolvimento de Software Multiplataforma",
    instituicao: "Fatec São José dos Campos",
    anoIngresso: 2024,
    titulo: "Software Developer",
    foto: "/img/foto og.png",
    sobreMim: `Olá! Meu nome é Kaique e sou desenvolvedor com foco em back-end...`,
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
    softSkills: ["Trabalho em equipe", "Comunicação", "Proatividade", "Organização"],
    projetos: [
        {
            titulo: "PROJETO API - INTERNO",
            imagem: "/img/Kaytrack.png",
            descricao: `Projeto baseado em dados de importação e exportação...`,
            link: "https://github.com/Templasan/DSM---Projeto-de-API-1-Semestre",
            tecnologias: ["HTML", "CSS", "Python", "Pandas", "Matplotlib"]
        },
        {
            titulo: "PROJETO API - NEWE",
            imagem: "/img/newe.png",
            descricao: `Projeto para centralizar processos da empresa Newe Log...`,
            link: "https://github.com/CodexDSM/CodeX",
            tecnologias: ["HTML", "CSS", "Python"]
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

    res.render('dashboard', {
        pageTitle: 'Dashboard',
        data: portfolioData,
        stats: {
            totalDisciplinas,
            totalProjetos,
            tecnologias: contagemTecnologias
        },
        activePage: 'dashboard'
    });
});




app.get('/crud/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.findAll();
        res.render('crud_projetos', {
            pageTitle: 'CRUD de Projetos',
            data: portfolioData,
            activePage: 'crud',
            projetos
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar projetos');
    }
});


app.post('/crud/projetos', async (req, res) => {
    try {
        const { titulo, descricao, link } = req.body;
        await Projeto.create({ titulo, descricao, link });
        res.redirect('/crud/projetos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar projeto');
    }
});


app.post('/crud/projetos/:id/editar', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, link } = req.body;
        await Projeto.update({ titulo, descricao, link }, { where: { id } });
        res.redirect('/crud/projetos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao editar projeto');
    }
});


app.post('/crud/projetos/:id/deletar', async (req, res) => {
    try {
        const { id } = req.params;
        await Projeto.destroy({ where: { id } });
        res.redirect('/crud/projetos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar projeto');
    }
});


app.put('/crud/projetos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, link } = req.body;
        const projeto = await Projeto.findByPk(id);
        if (!projeto) {
            return res.status(404).json({ erro: "Projeto não encontrado" });
        }
        await projeto.update({ titulo, descricao, link });
        res.json({
            mensagem: "Projeto atualizado com sucesso!",
            projeto
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar projeto" });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
