---
titulo: "Arquitetura da Solução"
camada: interno
status: semente
fontes: []
atualizado_em: "2026-05-30"
tags:
  - arquitetura
  - tecnico
  - stack
---

# Arquitetura da Solução

Mapa das decisões técnicas da solução completa. Cada item em aberto deve ser decidido antes do início do desenvolvimento.

---

## Agente de Atendimento (Output 1)

### Canal de entrada

| Decisão | Opções | Escolhido | Justificativa |
|---------|--------|-----------|---------------|
| Canal | WhatsApp Business API / Widget no site / Ambos | *(a decidir)* | |
| Provedor WhatsApp API | Meta direto / Twilio / 360dialog / Wati / outro | *(a decidir)* | |

### Orquestração e LLM

| Decisão | Opções | Escolhido | Justificativa |
|---------|--------|-----------|---------------|
| Orquestrador | n8n / Make / Langchain / LlamaIndex / custom | *(a decidir)* | |
| Modelo de linguagem | Claude (Anthropic) / GPT-4o / Gemini / outro | *(a decidir)* | |
| Como o agente lê o vault | RAG (embeddings) / contexto direto / híbrido | *(a decidir)* | |
| Base de embeddings | Pinecone / Weaviate / pgvector / outro | *(a decidir — só se RAG)* | |

### Integração de agenda

| Decisão | Opções | Escolhido | Justificativa |
|---------|--------|-----------|---------------|
| Ferramenta de agendamento | Calendly / Cal.com / Google Calendar + link / manual | *(a decidir)* | |
| Integração automática? | Sim (API) / Não (link externo) | *(a decidir)* | |

### Hospedagem e infra

| Decisão | Opções | Escolhido | Justificativa |
|---------|--------|-----------|---------------|
| Onde roda o agente | Railway / Render / VPS / serverless (Vercel, Lambda) | *(a decidir)* | |
| Banco de dados | PostgreSQL / SQLite / sem banco | *(a decidir)* | |
| Repositório de código | GitHub (repo separado deste vault) | *(a confirmar)* | |

---

## Conteúdo para Redes Sociais (Output 2)

| Decisão | Opções | Escolhido |
|---------|--------|-----------|
| Geração de artes | Canva (manual) / Adobe Express / IA generativa (DALL-E, Midjourney, Ideogram) | *(a decidir)* |
| Ferramenta de agendamento | Buffer / Later / Meta Business Suite / manual | *(a decidir)* |
| Armazenamento de assets | Google Drive / Dropbox / Notion | *(a decidir)* |
| Quem publica | Consultoria / Escritório / Ferramenta automatizada | *(a decidir)* |

---

## Avatar com Voz Clonada (Output 3)

| Decisão | Opções | Escolhido |
|---------|--------|-----------|
| Ferramenta de avatar | HeyGen / D-ID / Synthesia / Runway / outro | *(a decidir)* |
| Ferramenta de voz | ElevenLabs / Play.ht / Azure Speech / outro | *(a decidir)* |
| Hospedagem dos vídeos | YouTube (privado/público) / Google Drive / Vimeo | *(a decidir)* |

---

## Custos estimados (a preencher)

| Item | Ferramenta | Plano | Custo/mês estimado |
|------|-----------|-------|-------------------|
| WhatsApp API | *(a decidir)* | | |
| LLM (tokens) | *(a decidir)* | | |
| Orquestrador | *(a decidir)* | | |
| Avatar | *(a decidir)* | | |
| Voz clonada | *(a decidir)* | | |
| Hospedagem | *(a decidir)* | | |
| **Total estimado** | | | |

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[fluxo-conversacional]]
- [[infraestrutura-e-custos]]
- [[decisoes-de-projeto]]
