# to-do-list-node-stream

API para realizar o CRUD de tasks (tarefas).

# Features

- Criação de tasks
- Listagem de todas as tasks
- Atualização de task pelo `id`
- Remoção de task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV

# Estrutura de uma task

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial é `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Data da ultima atualização da task

# Rotas

- `POST - /tasks`  
   Cria uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.  
   Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente.
- `GET - /tasks`  
   Lista todas as tasks salvas no banco de dados.  
   Também é possível realizar uma busca, filtrando as tasks pelo `title` e `description`
- `PUT - /tasks/:id`  
   Atualiza uma task pelo `id`.  
   O `body` da requisição, receber somente o `title` e/ou `description` para serem atualizados.  
   Se for enviado somente o `title`, significa que o `description` não será atualizado e vice-versa.  
   Antes de realizar uma atualização, a API verifica se o `id` pertence a uma task salva no banco de dados.
- `DELETE - /tasks/:id`  
   Remove uma task pelo `id`.  
   Antes de realizar a remoção, a API verifica se o `id` pertence a uma task salva no banco de dados.
- `PATCH - /tasks/:id/complete`  
   Marca a task como completa ou não. Isso significa que se a task estiver concluída, ela voltará ao seu estado “normal” (ou seja, não concluída).  
   Antes da alteração, a API verifica se o `id` pertence a uma task salva no banco de dados.
