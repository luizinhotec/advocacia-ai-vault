---
titulo: "Gestão de Leads e Funil de Novos Clientes"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-10"
tags:
  - leads
  - crm
  - funil
  - atendimento
---

# Gestão de Leads e Funil de Novos Clientes

Define como um lead (contato inicial) é rastreado desde o primeiro contato até virar cliente — e o que acontece se não converter.

---

## Fontes de entrada de leads

| Canal | Status | Integrado com o agente? |
|-------|--------|--------------------------|
| WhatsApp Business +5522997883353 | ✅ ATIVO (Meta Cloud API, Development Mode) | Sim — canal principal |
| Instagram (DM / comentário) | *(a decidir — Fase 2)* | Não (ainda) |
| LinkedIn | *(a decidir — Fase 2)* | Não (ainda) |
| Site (formulário de contato) | *(a decidir — Fase 2)* | Não (ainda) |
| Indicação (offline) | Manual | Não — entrada manual no DB |
| Google Meu Negócio | Não integrado | Não |

---

## Funil atual (a mapear na reunião)

```
Contato inicial
      ↓
Primeiro atendimento (agente ou humano)
      ↓
Agendamento de consulta
      ↓
Consulta realizada
      ↓
Proposta de honorários
      ↓
Contratação
```

*(Preencher com tempos médios e taxas de conversão em cada etapa — dados virão da reunião inicial)*

---

## Ferramenta de CRM

> **Decisão tomada (2026-06-04):** RaviCRM será eliminado — ver [[decisoes-de-projeto]].
> O CRM de substituição precisa ser escolhido antes do lançamento da Fase 1.

| Decisão | Opções | Escolhido |
|---------|--------|-----------|
| Ferramenta | PostgreSQL (instância do orquestrador) | **DECIDIDO** |
| Quem alimenta | n8n automaticamente a partir das conversas do agente | Preferência — minimiza trabalho manual |
| Integração com agente WhatsApp? | Sim — n8n grava lead ao detectar novo contato | DECIDIDO (consequência da eliminação do Ravi) |
| Migração do Ravi | Exportar leads existentes antes de cancelar | *(a executar antes do desligamento)* |

---

## O que registrar por lead ✅ IMPLEMENTADO

Tabela `adv_leads` (PostgreSQL, VPS da cliente):

| Campo | Tipo | Fonte |
|-------|------|-------|
| `id` | serial PK | automático |
| `telefone` | varchar | Meta Webhook (from) |
| `primeiro_nome` | varchar | Claude extrai via tag [NOME] |
| `area_juridica` | varchar | Claude extrai via tag [AREA] |
| `resumo_situacao` | text | Claude extrai via tag [RESUMO] |
| `urgencia` | varchar | Claude extrai via tag [URGENCIA] |
| `status_funil` | varchar | novo → qualificado → agendado / perdido |
| `bot_pausado` | boolean | true quando advogado assumiu |
| `criado_em` | timestamp | automático |
| `atualizado_em` | timestamp | automático |

Tabela `adv_mensagens`: histórico completo de conversas (role, conteúdo, modelo LLM, timestamp).

Tabela `adv_escaladas`: cada escalação (lead_id, advogado_id, área, resumo, urgência, status, timestamps).

**O que NÃO registrar:** CPF, endereço, número de processo, valores de honorários — LGPD. Esses dados nunca entram no vault Git.

---

## Follow-up automático

*(a decidir — o agente faz follow-up com leads que agendaram mas não apareceram?)*

| Situação | Ação | Responsável | Prazo |
|----------|------|-------------|-------|
| Agendou mas não foi | *(a definir)* | *(a definir)* | *(a definir)* |
| Consultou mas não contratou | *(a definir)* | *(a definir)* | *(a definir)* |
| Sem resposta após 1ª mensagem | *(a definir)* | *(a definir)* | *(a definir)* |

---

## Notas relacionadas

- [[fluxo-conversacional]]
- [[fluxo-de-atendimento]]
- [[arquitetura-da-solucao]]
- [[dashboard-advogada]]
- [[conformidade-lgpd-chatbot]]
