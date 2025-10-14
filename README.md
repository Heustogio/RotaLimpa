# RotaLimpa
Software na ajuda de coletas de lixo urbana

Visão Geral do Projeto

O RotaLimpa é um aplicativo inovador desenvolvido para otimizar e melhorar a gestão da coleta de lixo urbana. Ele visa resolver problemas comuns enfrentados por cidadãos, coletores de lixo e prefeituras, proporcionando maior transparência, eficiência e engajamento na manutenção da limpeza das cidades. O aplicativo permite que os usuários saibam onde descartar lixos impróprios e, crucialmente, rastreiem em tempo real a localização dos caminhões de lixo via geolocalização, informando quando o caminhão passará em frente à sua residência. Além disso, o RotaLimpa oferece um canal para feedback sobre as rotas e o serviço dos caminhões, promovendo uma comunicação mais eficaz entre a comunidade e os serviços de coleta.

Funcionalidades Principais

•Rastreamento de Rotas em Tempo Real: Acompanhe a localização exata dos caminhões de lixo e preveja o horário de passagem.

•Agendamento de Coleta: Gerencie e visualize agendamentos de coleta de lixo.

•Notificações: Receba alertas sobre a proximidade do caminhão de lixo ou mudanças nas rotas.

•Pontos de Descarte: Identifique locais apropriados para o descarte de lixos específicos ou impróprios.

•Feedback e Avaliação: Envie comentários e avaliações sobre o serviço de coleta, rotas e desempenho dos caminhões.

Público-Alvo
O RotaLimpa atende a três principais grupos de usuários:

•Cidadãos: Para obter informações precisas sobre a coleta de lixo e pontos de descarte, além de fornecer feedback.

•Coletores de Lixo: Para otimizar suas rotas e receber informações em tempo real.

•Prefeituras/Órgãos de Saneamento: Para monitorar a eficiência da coleta, gerenciar rotas e coletar dados para melhorias no serviço.

Tecnologias Utilizadas
O projeto RotaLimpa é construído com uma arquitetura moderna e escalável:

•Frontend: Desenvolvido com React Native e Expo, garantindo uma experiência de usuário fluida e multiplataforma para dispositivos móveis.

•Backend: Implementado em Node.js, oferecendo um ambiente robusto e eficiente para a lógica de negócios e comunicação com o banco de dados.

•Banco de Dados: Utiliza MongoDB para armazenamento de dados, proporcionando flexibilidade e escalabilidade para lidar com informações de rotas, usuários e feedback.

Instalação e Configuração
Para rodar o projeto RotaLimpa localmente, siga os passos abaixo:

Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

•Node.js (versão LTS recomendada)

•npm (gerenciador de pacotes do Node.js)

•Expo CLI (npm install -g expo-cli)

•MongoDB (servidor local ou acesso a um cluster remoto)

Backend

1.Navegue até a pasta backend do projeto:

2.Instale as dependências:

3.Inicie o servidor backend:

Frontend

1.Navegue até a pasta frontend do projeto:

2.Instale as dependências:

3.Configuração da API: No seu código frontend, localize o arquivo onde a URL base da API é configurada (geralmente em src/services/api.js ou similar). Altere a baseURL para apontar para o endereço IP da sua máquina onde o backend está rodando, seguido da porta 5000. Exemplo:

4.Inicie o aplicativo Expo:

5.Escaneie o QR code com o aplicativo Expo Go no seu celular para visualizar o app.

