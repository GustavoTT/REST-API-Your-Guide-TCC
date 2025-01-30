# API Your Guide 🔊🌐 - (TCC) Projeto Acadêmico
> Projeto desenvolvido com fins acadêmicos, desenvolvido perante demanda para o Trabalho de Conclusão de Curso do técnico em Desenvolvimento de Sistemas realizado no Senai Alvares Romi.

## Observações importantes ❕
Analisando meus repositórios percebi que esse repositório existia em modo privado, portanto, decidi torna-lo público hoje, dois anos após a conclusão do mesmo.
É importante saber que infelizmente a API atualmente não está mais em funcionamento, pois ela estava no plano gratuito de hospedagem no Heroku, que se encerrou.

## Informações do projeto ℹ️
O Your Guide consiste em um "guia de compras" que promove o diferencial de ajudar o consumidor por meio de comandos de voz, utilizando apenas um dispositivo Alexa, que interliga o e-commerce com o consumidor.
Foi desenvolvida uma REST API que interligava o nosso Banco de Dados (BD) com a aplicação, no caso, a Skill criada para a Alexa recebia os resultados da API em ormato JSON e reportava ao usuário as informações.

## Funcionamento ⚙️
Para entender o funcionamento do projeto como um todo é interessante entender como a Alexa foi integrada ao projeto.
Foi criada uma Skill(aplicativos ativados por voz que adicionam recursos a Alexa) para a Alexa, onde seria possível interligar a API desenvolvida com o sistema de assistente virtual desenvolvida pela Amazon.
Portando, o funcionamento do projeto seria:
- O usuário faria o download da nossa Skill para a alexa;
- O usuário que desejasse realizar a consulta de preços através de comandos de voz, pediria para a Alexa por determinado produto;
- A SKILL da Alexa (Python), realiza a requisição do produto para a REST API (Node.js);
- A API cria a consulta para o banco de dados e retorna a informação em formato JSON para a Alexa;
- A Alexa reporta o resultado obtido ao usuário.

![image](https://github.com/user-attachments/assets/be798f2e-68c3-4f8d-99da-0eb50d66132b)
![image](https://github.com/user-attachments/assets/f9f1ee10-d07e-45c8-b82c-61be8cf66ca9)
![image](https://github.com/user-attachments/assets/f29ba63a-81fd-428f-acb9-94623ad28580)
![image](https://github.com/user-attachments/assets/83689b00-b21d-4a08-aa1c-94247116ea9a)

## Grupo 👨👩👩👩
- Gustavo Tagliatelli Teles
- Gisela Gonçalves de Oliveira
- Leticia Alves
- Beatriz Antunes Lutgens
