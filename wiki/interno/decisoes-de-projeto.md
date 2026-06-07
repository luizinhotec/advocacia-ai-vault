---
titulo: "Registro de Decisões de Projeto"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-05-30_anuncio-vaga-consultor-ia.md
  - raw/interno/2026-05-30_audio-primeiro-contato.md
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-07"
tags:
  - decisoes
  - projeto
  - adr
---

# Registro de Decisões de Projeto

Toda decisão técnica ou de produto relevante é registrada aqui no formato ADR simplificado
(Architecture Decision Record). Serve de histórico e evita repetir discussões já resolvidas.

---

## Como registrar uma decisão

```markdown
### [YYYY-MM-DD] Título da decisão

**Contexto:** O que levou à necessidade desta decisão.
**Decisão:** O que foi decidido.
**Motivo:** Por que esta opção foi escolhida.
**Alternativas descartadas:** O que foi considerado e por quê não foi escolhido.
**Consequências:** O que muda ou precisa ser feito em seguida.
**Decidido por:** Quem participou da decisão.
```

---

## Decisões registradas

### [2026-06-04] Consultoria constrói, implanta e opera tudo

**Contexto:** O modelo de entrega precisava ser definido — a cliente faz sozinha, a consultoria
entrega e a cliente opera, ou a consultoria opera continuamente?

**Decisão:** **A consultoria constrói, implanta e opera todo o stack.** A cliente não precisa
saber fazer — ela aprova, usa e recebe os resultados.

**Motivo:** A cliente foi explícita no áudio de primeiro contato: *"não quero aprender a fazer,
quero que alguém implante e oriente."* Relação continuada com visitas presenciais periódicas
na Região Serrana/RJ.

**O que a consultoria faz:**
- Configura e opera n8n, PostgreSQL, integrações (WhatsApp, ZapSign, DataJud)
- Constrói e mantém o agente de atendimento (Output 1)
- Produz todo o conteúdo para redes sociais (Output 2) — pauta, texto, arte, agendamento
- Gera e edita os vídeos com avatar (Output 3) — roteiro, geração HeyGen, publicação
- Mantém e evolui o vault de conhecimento
- Treina a equipe presencialmente no uso do Claude Desktop/skills

**O que fica com a cliente (escritório):**
- Aprovar conteúdo antes de publicar (SLA 48h, canal WhatsApp, evitar segundas)
- Fornecer briefings, informações novas e feedback
- Assinar termos (DPA, consentimento de voz)
- Decisões jurídicas e estratégicas do negócio

**Infraestrutura:** VPS dedicada provisionada para a cliente no momento da implantação.
Dados ficam na infra dela — consultoria opera remotamente. Ver decisão de infra abaixo.

**Decidido por:** Consultoria + confirmado pela cliente no áudio de primeiro contato

---

### [2026-05-30] Uso do padrão LLM Wiki para o vault

**Contexto:** Precisávamos de uma estrutura de conhecimento versionada, navegável no Obsidian e consumível por agentes LLM.

**Decisão:** Adotar o padrão LLM Wiki com as camadas raw/wiki/SCHEMA, separação publico/interno e loop Ingest → Compile → Lint → Writeback.

**Motivo:** Permite controle de versão via Git, auditabilidade, separação clara entre o que alimenta o agente público e o que é interno, e manutenção iterativa sem reescrita total.

**Alternativas descartadas:** Notion (sem versionamento via Git), Confluence (custo e complexidade), documento Word único (sem estrutura para agente LLM).

**Consequências:** Toda documentação do projeto segue este padrão. Código de aplicação fica em repositório separado.

**Decidido por:** Consultoria + escritório no kick-off.

---

### [2026-06-03] Stack central de IA: ecossistema Claude

**Contexto:** No áudio de primeiro contato ([[2026-05-30_audio-primeiro-contato]]), a advogada
declarou querer usar *"o Claude, todas as versões"*, *"muito bom para advocacia"*, implantado
*"com as extensões, com as skills"* — e afirmou **já ter várias skills prontas** e **já rodar
algumas IAs** no escritório.

**Decisão:** Adotar o ecossistema **Claude (Desktop / Code / .ai) + skills + extensões/MCP**
como stack central da implantação, orquestrado por **n8n**.

**Motivo:** Preferência explícita da cliente (questionário Bloco 1B: "Claude, todas as versões,
com skills e extensões"). Reduz curva de adoção (ela já usa) e aproveita skills existentes.
Confirmado pelo questionário de 2026-06-03.

**Alternativas descartadas:** outros LLMs (ChatGPT, Gemini) — a cliente tem preferência
declarada pelo Claude. Plataformas no-code puras — limitam customização do agente.

**Consequências confirmadas pós-questionário:**
- Cliente ainda não tem conta Claude paga — adquirir antes da implantação.
- 5 computadores, 2 números de WhatsApp de atendimento.
- Skills prontas existem — a cliente ofereceu acesso; coletar antes de redesenhar o que já funciona.

**Decidido por:** Consultoria + cliente (confirmado em 2026-06-03 via questionário)

---

### [2026-06-03] QUESTÃO ABERTA — Automação jurídica interna (peticionamento / protocolo)

**Contexto:** A cliente pediu agentes de **peticionamento** e **protocolo nos tribunais**
(espelhando um curso que fez), e o anúncio cita *"automação de tarefas administrativas e
jurídicas"*. Isso conflita com o escopo atual, que lista gestão de casos/peças como **fora de
escopo**, e com o `SCHEMA.md`, que **veda** número de processo, peças e dados sob sigilo
(art. 34, VII, EOAB) no vault.

**Decisão:** **EM ABERTO — não decidir unilateralmente.** Levar à reunião inicial.

**Pontos a resolver antes de aceitar a frente:**
- Onde os dados sensíveis residiriam (nunca neste vault) e qual a governança LGPD.
- Se peticionamento/protocolo entram na **fase 1** ou ficam para **fase 2**.
- Compatibilidade com sigilo profissional e responsabilidade técnica da advogada.

**Consequências:** Enquanto aberta, a frente fica marcada como "em avaliação" em
[[escopo-e-outputs]]. Resolver gera novas notas de governança de dados.

**Decidido por:** *(pendente — reunião inicial com a advogada e o gestor do projeto)*

---

### [2026-06-04] Volume de processos — omitir do conteúdo público

**Contexto:** A cliente citou "~2.000 processos" no questionário (Bloco 1). O site menciona
"mais de 800 processos com sucesso". Há divergência entre as duas fontes.

**Decisão:** **Não publicar nenhum dos números** no conteúdo público (wiki/publico, posts, vídeos).

**Motivo:** Citar volume de processos pode ser lido como autopromoção sob o Provimento 205/2021
da OAB. Além disso, a afirmação "com sucesso" (site) insinua resultado — vedado pelo Código de
Ética. A divergência entre 800 e 2.000 também levanta questão de precisão.

**Consequências:** Substituir por afirmações de experiência sem número: "mais de 18 anos de
atuação", "ampla experiência multidisciplinar". Se a advogada quiser incluir um número após
validação jurídica, registrar a autorização explícita aqui antes de publicar.

**Decidido por:** Consultoria (2026-06-04) — sujeito à confirmação da advogada

---

### [2026-06-04] Procedimento padrão para integração sem API oficial

**Contexto:** Algumas ferramentas do stack (RaviCRM, Astrea) podem não ter API pública
documentada. É necessário um critério claro de decisão antes de verificar cada uma.

**Decisão:** Seguir a ordem abaixo. Parar no primeiro nível que for viável.

| Nível | Abordagem | Viabilidade |
|-------|-----------|-------------|
| 1 | **API oficial documentada** | Melhor caso — usar diretamente no n8n |
| 2 | **API interna não-documentada** | Inspecionar tráfego de rede da ferramenta; frágil mas funcional |
| 3 | **Webhooks ou triggers por e-mail** | Suficiente para o n8n reagir a eventos |
| 4 | **Integração nativa** (Zapier / Make / n8n node) | Verificar catálogo de integrações da ferramenta |
| 5 | **Automação de browser** (Playwright/Puppeteer via n8n) | Último recurso técnico; quebra com atualizações de UI |
| 6 | **Passo manual + notificação** | Aceitar a etapa como humana; n8n notifica e registra |
| 7 | **Substituir a ferramenta** | Quando a integração é crítica e nenhum nível acima funciona |

**Critério de substituição:** só substituir se a integração for no caminho crítico do Output 1
(agente de atendimento). Ferramentas de back-office (ex: Astrea) podem permanecer manuais na
Fase 1 sem bloquear o lançamento.

**Decidido por:** Consultoria (2026-06-04)

---

### [2026-06-04] Substituir RaviCRM por n8n + Claude

**Contexto:** O RaviCRM já operava IA própria no WhatsApp via Meta Cloud API, criando conflito
direto com o agente Claude do Output 1. Dois sistemas não podem controlar o mesmo número
WhatsApp simultaneamente.

**Decisão:** **Eliminar o RaviCRM.** O n8n + Claude assume integralmente o WhatsApp —
atendimento, triagem, funil e CRM.

**Motivo:** Controle total da experiência do cliente, sem custo duplo (R$497–897/mês do Ravi),
sem latência extra de webhook intermediário, e stack unificado no ecossistema Claude.

**Alternativas descartadas:**
- Integrar via webhook (mantinha custo duplo e complexidade)
- Dois números separados (confuso para o cliente final)

**Consequências:**
- CRM de substituição: **PostgreSQL** na mesma instância do orquestrador (já provisionada). n8n grava/lê leads nativamente via node Postgres.
- Dados de leads hoje no Ravi precisam ser migrados antes do desligamento.
- A conta RaviCRM pode ser cancelada após migração validada.
- Tabela `usuarios` já existe no banco — mapear schema de leads a partir daí.

**Decidido por:** Consultoria + gestor do projeto (2026-06-04) — confirmar com a cliente

---

### [2026-06-04] Eliminar Humanitech — sobreposição com Output 1

**Contexto:** A cliente usava a Humanitech acreditando ser uma solução de avatar/voz clonada.
Verificação do site (`humanitech.com.br`) revelou que é um **chatbot WhatsApp com IA** —
sobreposição direta com o Output 1 do projeto (n8n + Claude no WhatsApp).

**Planos Humanitech verificados:**
- Starter: R$ 397/mês (400 conversas)
- Pro: R$ 719/mês (800 conversas)
- Business: R$ 1.599/mês (2.000 conversas)
- Extras: CRM R$ 49/mês, WhatsApp Pro R$ 140/mês

**Custo estimado atual da cliente:** ~R$ 1.788/mês (Business + CRM + WhatsApp Pro).

**Decisão:** **Eliminar Humanitech.** n8n + Claude assume integralmente o atendimento WhatsApp.

**Motivo:** Sobreposição total de função. Claude com o vault do escritório entrega qualidade
de atendimento superior à IA genérica da Humanitech. Economia estimada: **~R$ 1.688/mês**
(R$ 20.256/ano).

**Consequências:**
- Confirmar com a cliente o plano atual do Humanitech antes de cancelar.
- Exportar histórico de conversas/leads antes do desligamento.
- **Output 3 (avatar + voz):** a Humanitech nunca foi fornecedora disso — cliente pode ter
  confundido. Confirmar com ela quem (se alguém) estava cotando para avatar/voz. Ferramentas
  escolhidas para build próprio: HeyGen + ElevenLabs.

**Decidido por:** Consultoria + gestor do projeto (2026-06-04) — confirmar com a cliente

---

### [2026-06-04] Incluir LegalMail — automação de intimações e peticionamento

**Contexto:** A cliente citou "como está o meu processo?" como a pergunta que mais cansa de
responder. O LegalMail captura intimações judiciais automaticamente e centraliza o
peticionamento — elimina o monitoramento manual de tribunais. É a frente de automação
jurídica interna que estava "em avaliação" em [[escopo-e-outputs]].

**Decisão:** **Incluir o LegalMail no stack.** Integrar ao n8n para automação de:
- Recebimento e notificação de intimações (aviso automático à advogada)
- Peticionamento centralizado (sem acessar cada tribunal individualmente)
- Notificação ao cliente sobre andamento processual via WhatsApp
  *(apenas o que a advogada autorizar a compartilhar — nunca dado sigiloso raw)*

**Plano provável:** VIP (2.000 processos) — R$ 997/mês.
Confirmar volume real de processos ativos com a cliente antes de contratar.

**API:** portal dev existe (`app.legalmail.com.br/dev/`) — documentação acessível após autenticação.
Obter acesso às docs ao contratar o plano.

**Consequências:**
- Frente de automação jurídica interna confirmada — [[escopo-e-outputs]] atualizado.
- Governança de dados processual a definir antes do lançamento — ver [[conformidade-lgpd-chatbot]].
- O Astrea passa a candidato a substituição mais forte (LegalMail cobre parte da sua função).
- Custo adicionado: ~R$ 997/mês — ver [[custos-e-orcamento]].

**Decidido por:** Consultoria + gestor do projeto (2026-06-04) — confirmar plano com a cliente

---

### [2026-06-04] Build próprio para avatar e voz — HeyGen + ElevenLabs

**Contexto:** Output 3 (avatar + voz clonada) precisava de ferramentas com API para automação.

**Decisão:** **HeyGen** (avatar em vídeo) + **ElevenLabs** (clonagem de voz + TTS).

**Ferramentas:**
- HeyGen: API disponível, plano Creator $29/mês (~R$ 165), API a partir de $5.
- ElevenLabs: API TTS + clonagem. Planos flexíveis por caractere/mês.
- Total estimado Output 3: ~R$ 200–300/mês.

**Consequências:**
- Provisionar contas HeyGen e ElevenLabs antes da Fase 3.
- Clonar voz da Dra. Hyvana **somente após** termo formal assinado — ver [[consentimento-voz-clonada]].
- Roteiro segue template obrigatório — ver [[roteiro-padrao-video]].

**Decidido por:** Consultoria + gestor do projeto (2026-06-04) — confirmar com a cliente

---

### [2026-06-04] Canal principal do agente de atendimento

**Contexto:** Precisávamos definir o canal de entrada do Output 1.

**Decisão:** **WhatsApp Business API (Meta Cloud API oficial)** como canal primário. Widget no site avaliado na Fase 2.

**Motivo:** É o canal onde os contatos já chegam hoje. Resolve a dor central da cliente sem mudar o comportamento dos usuários.

**Alternativas descartadas:** Widget no site como canal primário — foco inicial é WhatsApp; site pode ser adicionado depois.

**Consequências:** Requer verificação de negócio pela Meta (processo pode levar semanas — iniciar cedo). Número de WhatsApp Business da cliente deve ser migrado para a API.

**Decidido por:** Consultoria + confirmado pela cliente no questionário (2026-06-03) e arquitetura (2026-06-04). Ver [[arquitetura-da-solucao]].

---

### [2026-06-05] CTA do agente — três caminhos, lead escolhe

**Contexto:** O system prompt v1 tinha três opções de CTA (link de calendário, transferência para humano, coleta de dados para retorno) mas exigia escolher uma antes de produção.

**Decisão:** Manter os três caminhos. O agente os oferece ao lead e ele escolhe o que prefere no momento da conversa.

**Consequências:** System prompt atualizado para v1.1 — seção Estágio 5 reescrita. Nenhuma opção é descartada em produção.

**Decidido por:** Gestor do projeto (2026-06-05)

---

### [2026-06-05] Canal de escalada para humano

**Contexto:** O system prompt v1 tinha `[PENDENTE 1.4]` para o canal de escalada quando o agente precisa transferir para humano.

**Decisão:** Canal de escalada = **WhatsApp da Dra. Hyvana** (número principal) + **notificação no dashboard do orquestrador**. O n8n pausa o bot, dispara os dois canais e aguarda o humano assumir.

**Consequências:** Sem bloqueio para produção. Dashboard já prevê notificação de escalada. Número exato da Dra. Hyvana a configurar no n8n no momento da implantação.

**Decidido por:** Gestor do projeto (2026-06-05)

---

### [2026-06-05] WhatsApp API — Evolution API na Fase 1, Meta Cloud API avaliada no final

**Contexto:** A Meta Cloud API oficial requer verificação de negócio (processo pode levar semanas) e configuração burocrática. Para a Fase 1, precisamos de agilidade.

**Decisão:** Usar **Evolution API** (self-hosted, conecta WhatsApp sem Meta approval) na Fase 1 para desenvolvimento e testes. Ao final do projeto, a cliente decide se migra para a **Meta Cloud API oficial** ou continua com a Evolution.

**Consequências:**
- Sem bloqueio por burocracia da Meta na Fase 1.
- Evolution API roda na mesma VPS do n8n.
- Migração para Meta Cloud API (se decidida) é feita no encerramento do projeto — requer apenas reconfigurar o node de WhatsApp no n8n.

**Decidido por:** Gestor do projeto (2026-06-05)

---

### [2026-06-05] Conta Claude — consultoria usa a própria, transfere ao final

**Contexto:** A cliente ainda não tem conta Claude paga. Isso estava listado como pré-requisito bloqueante.

**Decisão:** A consultoria usa a **própria conta Claude** durante o desenvolvimento e implantação. Ao final do projeto, a conta (ou uma nova conta da cliente) é configurada com a chave de API dela na VPS.

**Consequências:** Não é mais pré-requisito bloqueante para a Fase 1. Provisionar conta da cliente antes da entrega final.

**Decidido por:** Gestor do projeto (2026-06-05)

---

### [2026-06-07] Evolution API descartada — migração antecipada para Meta Cloud API

**Contexto:** A Evolution API foi a escolha inicial (2026-06-05) por evitar burocracia da Meta. Ao tentar implantá-la na VPS, a Meta bloqueou a conexão com código `401 Unauthorized` — IPs de data center/VPS são rejeitados pela Meta para conexão via protocolo não-oficial. Não há contorno viável sem mudar de provedor de hospedagem.

**Decisão:** Migrar imediatamente para a **Meta Cloud API oficial**. A decisão de "avaliar ao final do projeto" foi antecipada por necessidade operacional.

**Motivo:** Meta Cloud API não requer que o n8n se conecte ao WhatsApp diretamente — os servidores da Meta fazem o trabalho. A VPS recebe webhooks (POST) e envia respostas via HTTPS para `graph.facebook.com`. Sem bloqueio de IP.

**O que foi implementado:**
- App Meta criado: **advocacia-wp** (App ID: `1322412393370846`)
- Phone Number ID de teste (sandbox): `1127481100446979`
- Webhook de verificação GET: workflow n8n `ADV — Meta Webhook Verify` (ID: `aAYNgNGzLtHQ3ajo`)
- Webhook de recebimento POST: workflow n8n `ADV — Agente de Atendimento WhatsApp` (ID: `m1m57ANtiYdWrCjA`)
- Túnel HTTPS: **ngrok** rodando na VPS via Docker (obrigatório — Meta exige HTTPS)
- Credencial n8n para token Meta: `httpHeaderAuth` (ID: `R1e3XKx3Y8w9oxhC`)

**Status do pipeline em 2026-06-07:** pipeline completo testado e funcionando de ponta a ponta. Claude gera respostas. Único bloqueio: número de telefone de produção.

**Alternativas descartadas:** mover VPS para IP residencial (operacionalmente inviável); usar proxy reverso (não resolve o bloqueio de IP de origem).

**Consequências:**
- ngrok precisa de URL estático ou reinicialização atualiza a URL no painel Meta — prioridade baixa, tratar ao registrar número definitivo.
- Token Meta de desenvolvimento expira em 24h — usar **System User Token** permanente ao registrar número de produção.
- Ver [[arquitetura-da-solucao]] seção atualizada.

**Decidido por:** Gestor do projeto (2026-06-07) — forçado por bloqueio técnico

---

### [2026-06-07] Número WhatsApp de produção — chip pré-pago dedicado

**Contexto:** O número de sandbox Meta (+1 555 638-6509) é filtrado pelo WhatsApp no Brasil por ser número de teste compartilhado por milhares de desenvolvedores. O número fixo do escritório (22) 2050-xxxx já está no WhatsApp Business App — migrar para Cloud API desconectaria o app e perderia histórico. O número pessoal do contato do projeto já tem WhatsApp ativo.

**Decisão:** Adquirir um **chip pré-pago físico dedicado** exclusivamente para o bot WhatsApp.

**Motivo:** Chip físico é número real, não compartilhado, não filtrado pelo WhatsApp. Custo único (~R$15) + recarga mínima a cada 180 dias. O chip pode ser entregue ao escritório ao final do projeto — o número segue com eles independentemente da consultoria.

**Para o período de teste (até comprar o chip):** número Twilio americano (+1) — funcional, sem filtro de sandbox, baixo custo mensal (~$1,15/mês descontado do crédito de avaliação).

**Regras:**
- O chip do bot **nunca** deve ter WhatsApp pessoal — manter exclusivo para Cloud API.
- Ao registrar o número definitivo na Meta, usar **System User Token permanente** (não token temporário 24h).
- Recarregar o chip a cada 6 meses para não perder o número.

**Consequências:** Ao registrar o chip na Meta (Etapa 2 — Configuração da produção), atualizar o `phone_number_id` no nó `Enviar WhatsApp` do n8n e na URL da credencial.

**Decidido por:** Gestor do projeto (2026-06-07)

---

### [2026-06-07] Modelo LLM do agente de atendimento — lançar com Sonnet 4.6

**Contexto:** O agente estava usando `claude-haiku-4-5-20251001` por custo-benefício no desenvolvimento. A cliente expressou desejo de qualidade conversacional alta (referência: Claude Opus 4.8). Antes de comprometer o custo do Opus, convém validar com dados reais.

**Decisão:** Migrar para **`claude-sonnet-4-6`** no lançamento com usuários reais.

**Motivo:** Sonnet 4.6 oferece qualidade conversacional muito superior ao Haiku ao custo de ~R$150–400/mês para o volume esperado — muito abaixo do Opus (~R$800–2.000/mês). A diferença de qualidade conversacional entre Haiku e Sonnet justifica a migração antes de ir a produção. Se o Sonnet não satisfizer a cliente após 30 dias de conversas reais, migramos para Opus com uma linha de mudança no n8n.

**O que foi alterado em 2026-06-07:**
- `Chamar Claude` → `model: "claude-sonnet-4-6"`
- `Salvar Mensagens` → referência no campo `modelo_llm` atualizada
- VAULT_CONTEXT enriquecido com todas as 7 áreas jurídicas + palavras-chave

**Alternativas descartadas:** Manter Haiku (qualidade insuficiente para conversa com leads reais); migrar direto para Opus (custo desnecessário antes de validar).

**Consequências:** Custo mensal estimado aumenta de ~R$30–80 (Haiku) para ~R$150–400 (Sonnet). Se a cliente aprovar a qualidade, manter. Se exigir Opus, mudar em uma linha.

**Decidido por:** Gestor do projeto (2026-06-07)

---

### [2026-06-07] Segmentação de leads por área jurídica — tag [AREA:xxx]

**Contexto:** Para criar funis de conversão por especialidade (previdenciário, cível, família, consumidor, imobiliário, trabalhista, tributário), precisamos saber qual área o lead representa. Isso permite encaminhar para o profissional certo, priorizar campanhas por área e analisar volume de demanda por especialidade.

**Decisão:** Claude identifica a área e a comunica via **tag estruturada no final de cada resposta** — `[AREA:xxx]`. O n8n extrai, armazena e limpa a tag antes de enviar ao lead.

**Arquitetura implementada:**
1. System prompt instrui Claude a incluir `[AREA:previdenciario]` / `[AREA:civel]` / etc. no final de **cada** resposta
2. `Processar Resposta` (n8n Code node) extrai a tag com regex e limpa da resposta visível ao lead
3. Novo node `Atualizar Area Lead` (n8n Postgres) salva em `adv_leads.area_juridica` com COALESCE (preserva área já identificada se nova for 'indefinido')
4. VAULT_CONTEXT enriquecido com palavras-chave por área para orientar o modelo

**Tags disponíveis:** `previdenciario` · `civel` · `familia` · `consumidor` · `imobiliario` · `trabalhista` · `tributario` · `indefinido`

**Migração de banco:** coluna `area_juridica VARCHAR(50)` adicionada à tabela `adv_leads` via `ALTER TABLE` na VPS em 2026-06-07.

**Fora do escopo do escritório:** Direito Penal/Criminal, Militar, Internacional — Claude é instruído a informar gentilmente e oferecer encaminhamento.

**Consequências:**
- Dashboard pode segmentar leads por área automaticamente
- Campanhas de marketing podem ser personalizadas por área
- Escalonamento pode ser direcionado ao profissional da especialidade correta

**Decidido por:** Gestor do projeto (2026-06-07)

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
