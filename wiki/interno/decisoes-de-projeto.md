---
titulo: "Registro de Decisões de Projeto"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-05-30_anuncio-vaga-consultor-ia.md
  - raw/interno/2026-05-30_audio-primeiro-contato.md
atualizado_em: "2026-06-03"
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

### [2026-06-04] Build próprio para avatar e voz — substituir Humanitech

**Contexto:** A cliente estava negociando com a Humanitech para o Output 3 (avatar + voz
clonada). Humanitech não tem API conhecida — modelo de serviço gerenciado, sem automação.

**Decisão:** **Build próprio com HeyGen (avatar) + ElevenLabs (voz).** Eliminar Humanitech.

**Motivo:** Controle total do pipeline de produção. Ambas as ferramentas têm API, permitem
automação via n8n e integração com o restante do stack. Sem dependência de terceiro para
cada vídeo produzido.

**Ferramentas escolhidas:**
- **HeyGen** — geração de avatar em vídeo. API disponível. Plano Creator $29/mês; API a partir de $5.
- **ElevenLabs** — clonagem de voz + TTS. API disponível. Planos flexíveis por caractere/mês.

**Alternativa descartada:** Humanitech (serviço gerenciado, sem API, custo e controle desconhecidos).

**Consequências:**
- Provisionar contas HeyGen e ElevenLabs antes da Fase 3.
- Clonar a voz da Dra. Hyvana no ElevenLabs **somente após** termo formal assinado — ver [[consentimento-voz-clonada]].
- Roteiro de vídeo segue o template obrigatório — ver [[roteiro-padrao-video]].

**Decidido por:** Consultoria + gestor do projeto (2026-06-04) — confirmar com a cliente

---

### [YYYY-MM-DD] Canal principal do agente de atendimento

*(a preencher — WhatsApp Business API / widget no site / outro)*

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
