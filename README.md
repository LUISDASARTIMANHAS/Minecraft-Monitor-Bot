# Minecraft Assistente AO

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

Um bot de monitoramento automatizado para servidores Minecraft desenvolvido com [Mineflayer](https://github.com/PrismarineJS/mineflayer), oferecendo controle remoto, visualização em tempo real e gerenciamento avançado de estado.

## 🎯 Características

- **Conexão Automática**: Conecta-se automaticamente a servidores Minecraft com reconexão inteligente
- **Interface Web**: Dashboard em tempo real para monitoramento e controle do bot
- **Visualizador 3D**: Visualização do mundo do Minecraft em tempo real usando Prismarine Viewer
- **Anti-AFK**: Sistema automático para evitar desconexão por inatividade
- **Sistema de Comandos**: Suporte a comandos customizáveis no jogo
- **Gerenciamento de Estado**: Controle centralizado do estado do bot
- **WebSocket**: Comunicação bidirecional em tempo real entre servidor e cliente

## 📋 Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** ou **yarn**
- Acesso a um servidor Minecraft (online-mode `false` ou conta válida)

## 🚀 Instalação

1. **Clone ou baixe o projeto**
```bash
git clone <seu-repositório>
cd minecraft-bot
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
# Configurações do Servidor Minecraft
MC_HOST=localhost
MC_PORT=25565
MC_USERNAME=BotPlayer
MC_VERSION=1.20.1

# Porta do Viewer (Prismarine)
VIEWER_PORT=3000

# Porta do Servidor Web
WEB_PORT=8080
```

## 💻 Uso

### Iniciar em Modo Produção
```bash
npm start
```

### Iniciar em Modo Desenvolvimento
```bash
npm run dev
```

O servidor web estará disponível em `http://localhost:8080` (ou conforme configurado).

## 📁 Estrutura do Projeto

```
minecraft-bot/
├── src/
│   ├── index.js                 # Arquivo principal
│   ├── config.js                # Configurações globais
│   ├── bot/
│   │   ├── antiAfk.js          # Sistema anti-AFK
│   │   ├── commands.js         # Sistema de comandos
│   │   ├── createBot.js        # Criação e inicialização do bot
│   │   ├── movement.js         # Controle de movimento
│   │   └── reconnect.js        # Reconexão automática
│   ├── state/
│   │   └── botState.js         # Gerenciamento centralizado de estado
│   └── web/
│       ├── server.js           # Servidor HTTP/WebSocket
│       ├── socket.js           # Gerenciamento de conexões WebSocket
│       └── public/
│           ├── app.js          # Lógica frontend
│           ├── index.html      # Interface HTML
│           └── style.css       # Estilos CSS
├── package.json
├── start.cmd                    # Script de inicialização (Windows)
└── README.md
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `MC_HOST` | Endereço do servidor Minecraft | `localhost` |
| `MC_PORT` | Porta do servidor Minecraft | `25565` |
| `MC_USERNAME` | Username do bot | `Bot` |
| `MC_VERSION` | Versão do Minecraft | `false` (detecta automaticamente) |
| `VIEWER_PORT` | Porta do visualizador 3D | `3000` |
| `WEB_PORT` | Porta do servidor web | `8080` |

## 📦 Dependências

- **mineflayer** (^4.37.1) - Cliente Minecraft em Node.js
- **prismarine-viewer** (^1.33.0) - Visualizador 3D do mundo Minecraft
- **canvas** (^3.2.3) - Renderização de gráficos
- **dotenv** (^17.4.2) - Gerenciamento de variáveis de ambiente

## 🎮 Funcionalidades Detalhadas

### Anti-AFK
Mantém o bot ativo no servidor através de ações automáticas, evitando desconexões por inatividade.

### Sistema de Comandos
Processe comandos via interface web ou chat do jogo para controlar o bot remotamente.

### Movimento
Controle completo sobre movimento do bot incluindo caminhada, pulo e navegação.

### Reconexão Automática
Reconecta automaticamente ao servidor em caso de desconexão com backoff exponencial.

## 🌐 API Web

O servidor web fornece endpoints e WebSocket para interagir com o bot:

### WebSocket
Conecte-se em `ws://localhost:8080` para comunicação em tempo real com o bot.

### Mensagens Exemplo
```javascript
// Enviar comando
{ type: 'command', data: { command: 'chat', message: 'Olá!' } }

// Solicitar estado
{ type: 'getState' }

// Ações de movimento
{ type: 'movement', data: { action: 'forward' } }
```

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED"
- Verifique se o servidor Minecraft está rodando
- Confirme o endereço e porta em `.env`

### Bot não conecta
- Certifique-se de que `online-mode=false` no servidor (ou use conta válida)
- Verifique a versão do Minecraft configurada

### Problemas com visualizador
- Instale o Canvas: `npm install canvas`
- No Windows, pode ser necessário Visual Studio Build Tools

## 📝 Logs e Debug

Para mais informações durante a execução, ative logs detalhados:
```bash
DEBUG=* npm start
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para problemas, dúvidas ou sugestões:
- Abra uma [Issue](https://github.com/seu-usuario/minecraft-bot/issues)
- Entre em contato através do Discord/Email

## 🙏 Agradecimentos

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - Cliente Minecraft
- [Prismarine](https://github.com/PrismarineJS) - Ferramentas Minecraft para Node.js
- Comunidade Node.js e Minecraft

---

**Desenvolvido com ❤️ usando Node.js**