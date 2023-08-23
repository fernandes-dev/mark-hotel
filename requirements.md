# Stack
  1. nodejs
  2. prismaORM
  3. typescript
  4. tsup
  5. tsx
  6. vitest
  7. docker
  8. docker-compose
  9. rabbitmq
  10. mysql


# Regras de Negócio
  1. Um quarto não poderá ser reservado durante a mesma data em um mesmo hotel.

  2. Sempre quando uma reserva for realizada, deve-se registrar isto, atualizando a contagem de quartos disponíveis no hotel.

  3. Ao realizar uma reserva, utilize o RabbitMQ para registrar em uma fila e enviar uma mensagem com os dados da reserva.

  4. Crie dados falsos para hotel e quartos. Crie pelo menos 2 hoteis e 20 quartos já previamente cadastrados no banco de dados.

  5. Criar a aplicação usando testes automatizados será um grande diferencial.