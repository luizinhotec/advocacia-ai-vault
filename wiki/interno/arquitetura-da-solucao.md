---
titulo: "Arquitetura da Solução"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
  - raw/interno/2026-06-03_curatela-ferramentas.md
  - projeto/plano-curatela-criacao.md
atualizado_em: "2026-06-04"
tags:
  - arquitetura
  - tecnico
  - stack
---

# Arquitetura da Solução

Mapa das decisões técnicas da solução. Atualizado com as decisões já tomadas na estratégia (Claude-first + n8n) e na curatela de ferramentas. Itens ainda em aberto dependem de confirmação da cliente ou de fornecedor.

Legenda de status: **DECIDIDO** · **A CONFIRMAR (cliente/fornecedor)** · **A DECIDIR**

---

## Princípio da arquitetura: orquestrador único

Estratégia: **integrar → coexistir → substituir, gradualmente.** O orquestrador entra como camada que conecta o que a cliente já usa (não substitui de cara). Ver [[plano-curatela-criacao]].

---

## Agente de Atendimento (Output 1)

### Canal de entrada

| Decisão | Escolhido | Status | Justificativa |
|---------|-----------|--------|---------------|
| Canal | WhatsApp Business API (oficial) | DECIDIDO | É por onde os contatos chegam; resolve a dor da cliente. |
| Provedor WhatsApp API | Meta Cloud API (oficial) | DECIDIDO | Evita risco de banimento de soluções não-oficiais. Avaliar BSP (360dialog) só se precisar de onboarding mais fácil. |
| Widget no site | Fase posterior | A DECIDIR | Foco inicial é WhatsApp. |

### Orquestração e LLM

| Decisão | Escolhido | Status | Justificativa |
|---------|-----------|--------|---------------|
| Orquestrador | n8n | DECIDIDO | Encanamento/automação; conecta canais e ferramentas. |
| Cérebro / LLM | Claude (Anthropic) | DECIDIDO | Raciocínio, triagem, redação. A própria cliente prefere Claude (Bloco 1B). |
| Roteamento de modelos | Haiku = filtro/triagem · Sonnet = atendente · Opus = tarefas pesadas/raras | DECIDIDO | Controle de custo por tarefa. |
| Como o agente lê o vault | Contexto direto (sem banco de vetores) | DECIDIDO | Padrão LLM Wiki; vault pequeno cabe no contexto. Reavaliar só se passar de ~100 notas/~80k tokens. |
| Base de embeddings | Não usar (por ora) | DECIDIDO | Consequência da decisão acima. Se precisar, Voyage AI + pgvector. |

### Integrações via API (orquestráveis) — ver [[plano-curatela-criacao]]

| Ferramenta | Função | Status | Verificação de API |
|-----------|--------|--------|--------------------|
| ZapSign | Assinatura de contratos | DECIDIDO ✅ | API REST pública documentada (`docs.zapsign.com.br`). Auth Bearer. Sandbox disponível. **Node n8n nativo** (`n8n-nodes-zapsign`) e integração Make.com. MCP server oficial no GitHub. |
| Jusbrasil | Consulta/monitoramento processual | DECIDIDO ⚠️ | API existe (`api.jusbrasil.com.br/docs`) mas requer contrato enterprise — não é acesso aberto. **Usar DataJud (CNJ) como fallback primário:** gratuito, +80 M processos, 90 tribunais, auth por chave pública, sem custo. |
| DataJud (CNJ) | Fallback processual gratuito | DECIDIDO ✅ | API REST pública, gratuita, documentada em `datajud-wiki.cnj.jus.br`. Cobre todos os tribunais obrigados a reportar ao CNJ. |
| RaviCRM | CRM de relacionamento (leads/funil/WhatsApp) | A CONFIRMAR ❓ | **Não encontrado em buscas públicas** — pode ser nome informal ou regional. Confirmar com a cliente o nome correto / URL do sistema. |
| Astrea | ERP jurídico (processos/prazos) | A CONFIRMAR ❌ | **Confirmado: sem API pública.** Tem integração nativa apenas com Clieent CRM (parceria Aurum). Candidato a substituição na Fase 2. Na Fase 1: passo manual + notificação via n8n. |

### Integração de agenda

| Decisão | Escolhido | Status |
|---------|-----------|--------|
| Ferramenta de agendamento | A definir (Google Calendar + link / Cal.com) | A DECIDIR |
| Integração automática | Preferir via API | A DECIDIR |

### Hospedagem e infra

| Decisão | Escolhido | Status | Observação |
|---------|-----------|--------|------------|
| Onde roda o n8n | A decidir (VPS / Railway / self-host) | A DECIDIR | Confirmar infra da cliente (Bloco 1B). |
| Banco de dados | PostgreSQL (se precisar de estado/CRM próprio) | A DECIDIR | Pode não ser necessário na Fase 1. |
| Repositório de código | GitHub, repo SEPARADO deste vault | DECIDIDO | Vault só com conhecimento; código não entra aqui (CLAUDE.md). |
| Conta(s) Claude | A confirmar com a cliente | A CONFIRMAR (cliente) | Bloco 1B: ela já usa Claude e tem skills prontas. |

---

## Conteúdo para Redes Sociais (Output 2)

Fase 3. Sobreposição com Humanitech (clone/conteúdo) e Ferpin (agência atual) — decisão build vs buy. Ver [[pipeline-conteudo]] e [[plano-curatela-criacao]].

| Decisão | Status |
|---------|--------|
| Geração de artes (Canva / IA) | A DECIDIR |
| Agendamento (Buffer / Meta Suite) | A DECIDIR |
| Armazenamento de assets (Drive) | A DECIDIR |
| Quem publica | A DECIDIR |

---

## Avatar com Voz Clonada (Output 3)

Fase 3. Atenção: a cliente está negociando com a Humanitech justamente isso — decidir build (ElevenLabs/HeyGen) vs buy (Humanitech) antes de investir.

| Decisão | Opções | Status |
|---------|--------|--------|
| Ferramenta de avatar | HeyGen / D-ID / Synthesia | A DECIDIR |
| Ferramenta de voz | ElevenLabs / Play.ht | A DECIDIR |
| Hospedagem de vídeos | YouTube / Drive | A DECIDIR |
| Consentimento de voz | Obrigatório explicar e autorizar antes | DECIDIDO (regra) |

---

## Custos estimados (a preencher na proposta da Fase 1)

| Item | Ferramenta | Status |
|------|-----------|--------|
| WhatsApp API | Meta Cloud API | a cotar |
| LLM (tokens) | Claude (Haiku/Sonnet/Opus) | a estimar por volume |
| Orquestrador | n8n (self-host ou cloud) | a cotar |
| Assinatura | ZapSign | a cotar (plano + R$/envio WhatsApp) |
| Processual | Jusbrasil API | a cotar (por volume) / DataJud grátis |
| Avatar + voz | (Fase 3) | a cotar |
| Hospedagem | (infra n8n) | a cotar |

---

## O que falta decidir (resumo)

- Cliente: infra (máquinas/contas Claude), agenda, confirmar Ravi/Astrea.
- Fornecedor: API do RaviCRM e do Astrea.
- Projeto: ferramenta de agendamento, hospedagem do n8n, build vs buy do conteúdo/avatar.

## Notas relacionadas

- [[plano-curatela-criacao]]
- [[decisoes-de-projeto]]
- [[fluxo-conversacional]]
- [[conformidade-lgpd-chatbot]]
- [[gestao-de-leads]]
- [[dashboard-advogada]]
