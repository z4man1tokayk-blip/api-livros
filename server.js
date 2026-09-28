// Importando o Express para criar o servidor
const express = require('express');
const app = express();

// Permitir que a gente receba dados em formato JSON
app.use(express.json());

// Nossa "lista de livros" guardada na memória (sem banco de dados por enquanto)
let livros = [
    { id: 1, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943 },
    { id: 2, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 }
];

// Rota principal para ver se a API está no ar
app.get('/', (req, res) => {
    res.json({ mensagem: "API de Livros rodando com sucesso!" });
});

// 1. LISTAR TODOS OS LIVROS (GET)
app.get('/livros', (req, res) => {
    res.json(livros);
});

// 2. BUSCAR UM LIVRO PELO ID (GET)
app.get('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const livro = livros.find(l => l.id === id);
    
    if (!livro) {
        return res.status(404).json({ erro: "Ops! Livro não encontrado." });
    }
    
    res.json(livro);
});

// 3. CADASTRAR UM NOVO LIVRO (POST)
app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;
    
    // Criando um ID novo baseado no tamanho da lista
    const novoLivro = {
        id: livros.length + 1,
        titulo,
        autor,
        ano
    };

    livros.push(novoLivro);
    res.status(201).json({ mensagem: "Livro cadastrado com sucesso!", novoLivro });
});

// 4. ATUALIZAR UM LIVRO (PUT)
app.put('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor, ano } = req.body;
    
    const index = livros.findIndex(l => l.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para atualizar." });
    }

    // Atualiza os dados mantendo o que não foi alterado
    livros[index] = {
        id,
        titulo: titulo || livros[index].titulo,
        autor: autor || livros[index].autor,
        ano: ano || livros[index].ano
    };

    res.json({ mensagem: "Livro atualizado com sucesso!", livro: livros[index] });
});

// 5. EXCLUIR UM LIVRO (DELETE)
app.delete('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = livros.findIndex(l => l.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para excluir." });
    }

    livros.splice(index, 1);
    res.json({ mensagem: "Livro removido com sucesso!" });
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando direitinho na porta 3000!");
});
