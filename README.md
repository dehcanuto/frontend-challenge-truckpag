# Frontend Challenge — Truckpag - André Canuto

Aplicação desenvolvida como parte de um desafio técnico **Frontend Truckpag**, que exibe filmes do estúdio **Studio Ghibli** consumindo a API pública [GhibliAPI](https://ghibliapi.vercel.app).  
O projeto inclui recursos de listagem, busca, filtros dinâmicos, ordenação e persistência de dados no LocalStorage, além de uma camada de gerenciamento de estado com Redux e testes automatizados.

---

## 🚀 Tecnologias e Ferramentas

| Categoria | Ferramenta |
|------------|-------------|
| **Framework** | [React 19](https://react.dev/) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilização** | [TailwindCSS](https://tailwindcss.com/) |
| **Gerenciamento de Estado** | [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Requisições HTTP** | [Axios](https://axios-http.com/) |
| **Query Cache / Async State** | [@tanstack/react-query](https://tanstack.com/query) |
| **Feedbacks visuais** | [React Hot Toast](https://react-hot-toast.com/) |
| **Ícones** | [React Icons](https://react-icons.github.io/react-icons/) |
| **Testes** | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| **Formatação e lint** | [Prettier](https://prettier.io/) + ESLint padrão CRA |

---

## ⚙️ Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/frontend-challenge-truckpag.git
cd frontend-challenge-truckpag
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz e adicione:

```bash
VITE_GHIBLI_API=https://ghibliapi.vercel.app
```

> ⚠️ O valor padrão já é utilizado internamente, então esse passo é opcional.

### 4. Rodar o projeto localmente

```bash
npm start
```

A aplicação ficará disponível em:
```
http://localhost:3000
```

---

## 🧩 Funcionalidades Implementadas

**Listagem de Filmes**  
Exibe os filmes obtidos da API pública do Studio Ghibli.

**Busca Dinâmica**  
Filtra por título e opcionalmente por descrição (sinopse).

**Filtros Combináveis**  
Permite combinar os seguintes filtros simultaneamente:
- Filmes assistidos  
- Filmes favoritos  
- Filmes com anotações  
- Filtros por nota (⭐ 1–5, não avaliados, etc.)

**Ordenação Personalizada**
Ordenação por:
- Título (A-Z / Z-A)  
- Duração (menor / maior)  
- Avaliação pessoal  
- Score (Rotten Tomatoes)

**Anotações e Avaliações**
Cada filme pode ser avaliado e receber notas e comentários personalizados.

**Persistência Local**
Todos os dados (notas, favoritos, assistidos, filtros e ordenação) são salvos no `LocalStorage`.

**Layout Responsivo**
Interface moderna e responsiva construída com **TailwindCSS**.

**Mensagens Toast**
Feedbacks visuais amigáveis ao realizar ações como:
- Marcar/desmarcar filme como assistido ou favorito.  
- Adicionar, editar ou excluir anotações.

**Testes Automatizados**
Testes unitários cobrindo slices do Redux e comportamento de componentes principais.

---

## 🧪 Rodando os Testes

O projeto utiliza **Jest + React Testing Library**.

### Executar todos os testes:
```bash
npm test
```

### Executar uma única vez (sem watch mode):
```bash
npm test -- --watchAll=false
```

Os principais testes cobrem:
- `moviesSlice` — manipulação de notas, favoritos e assistidos.  
- `filtersSlice` — persistência e reset de filtros.  
- `MovieCard` — renderização de dados de filmes.  
- `MovieList` — busca e filtragem dinâmica.

---

## 🧠 Estrutura de Pastas

```
src/
├── components/
│   ├── atoms/
│   ├── └── Button/
│   ├── molecules/
│   │   ├── MovieCard/
│   │   └── BaseLayout/
│   └── organisms/
│       ├── MovieList/
│       ├── MovieFilters/
│       └── NotesModal/
├── constants/
│   └── sortOptions.ts
├── redux/
│   └── slices/
│       ├── filtersSlice.ts
│       └── moviesSlice.ts
│   ├── hooks.ts
│   └── store.ts
├── services/
│   └── ghibli.ts
├── types/
├── __tests__/           # testes unitários de slices
└── setupTests.ts        # configuração Jest + mocks globais
```

---

## 🧰 Scripts Disponíveis

| Script | Descrição |
|---------|------------|
| `npm start` | Executa a aplicação localmente |
| `npm run build` | Cria a build de produção |
| `npm test` | Executa os testes |
| `npm run format` | Formata os arquivos com Prettier |

---

## 🔎 **Requisitos Funcionais**

### ✅ Obrigatórios

- [x]  Listar filmes com as seguintes informações
    - Imagem do filme
    - Título
    - Ano de lançamento
    - Duração
    - Sinopse
    - Diretor e Produtor
    - Nota de avaliação (campo `rt_score`)
- [x]  Marcar o filme como assistido
- [x]  Marcar o filme como favorito
- [x]  Filtrar os filmes por título através de um campo de texto
- [x]  Buscar palavras do filtro de texto na sinopse do filme
    - Ao selecionar a opção “Incluir sinopse na busca**”,** além de filtrar os filmes, também deve destacar o texto buscado na sinopse com alguma cor.
- [x]  Adicionar anotações de texto a um filme
- [x]  Adicionar, junto à anotação, uma avaliação pessoal de 1 a 5 estrelas
- [x]  Filtrar os filmes por:
    - Assistido
    - Favorito
    - Com anotação.
    - Número de estrelas
- [x]  Ordenar filmes (de forma crescente e decrescente) por:
    - Título
    - Duração
    - Avaliação pessoal
    - Nota de avaliação (campo `rt_score`)

### ✨ Desejáveis

- [x]  Utilizar **TypeScript**
- [x]  Implementar responsividade básica
- [x]  Persistir os seguintes dados no LocalStorage:
    - Lista de filmes e suas características (assistido / favorito / anotação / avaliação)
    - Filtros selecionados
    - Opção de ordenação selecionada
- [x]  Adicionar mensagens toast para as operações
    - Marcar/desmarcar o filme como assistido, favorito;
    - Adicionar/editar/remover anotação;
- [x]  Escrever pelo menos 1 **teste unitário** (ex: botão de favorito ou função de marcação)
- [x]  Separação clara de responsabilidades (componentes, serviços de API, etc.)
- [x]  Utilizar biblioteca de estilo (Styled-components, Tailwind, Shadcn-ui, etc.)
- [x]  Utilizar Context API ou uma solução de estado global (Redux, zustand, etc.)
- [x]  Utilizar solução para gerenciar estado assíncrono (axios, tanstack query, etc.)

---

## 👨‍💻 Autor

Desenvolvido por **André Canuto**  
📧 [LinkedIn](https://www.linkedin.com/in/andrecanuto) • [GitHub](https://github.com/seuusuario)

---

## 📜 Licença

Este projeto é distribuído sob a licença MIT.  
Sinta-se à vontade para estudar, modificar e utilizar o código.