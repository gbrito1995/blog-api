# API DE CONSUMO DO BLOG

API desenvolvida para consumo da base de dados do blog

# Instalação

Para instalar os módulos usados executar o comando:

```bash
npm install
```

# Uso

O comando de inicilização da aplicação é: 

```bash
npm run start
```

# Autorização

<p>A autorização para todas as rotas(exceto /login) é feita por meio de token jwt adquirido através autenticação via post login e senha.</p>
<p>Inserir o token nos headers para todas as outras requisições.</p>

exemplo:
```bash
{
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

rota de login:
```bash
localhost:5000/users/login
```

corpo:
```bash
{
	user: teste
	password: teste
}
```

# Rotas de acesso aos conteúdos

Buscar todos os posts:

```bash
localhost:5000
```

Buscar um post em específico:

```bash
localhost:5000/1
```

Criar um post:

```bash
localhost:5000/
```
corpo:
```bash
{
	"id": 0,
	"title": "teste",
	"content": "<p>TESTE</p>",
	"create_date": null
}
```

Excluir um post em específico:

```bash
localhost:5000/1
```