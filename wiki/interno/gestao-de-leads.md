---
titulo: "Gestão de Leads e Funil de Novos Clientes"
camada: interno
status: semente
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-04"
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

| Canal | Ativo hoje? | Vai integrar com o agente? |
|-------|------------|---------------------------|
| WhatsApp (número pessoal) | *(a confirmar)* | *(a decidir)* |
| WhatsApp Business (novo) | *(a implementar)* | Sim |
| Instagram (DM / comentário) | *(a confirmar)* | *(a decidir)* |
| LinkedIn | *(a confirmar)* | *(a decidir)* |
| Site (formulário de contato) | *(a confirmar)* | *(a decidir)* |
| Indicação (offline) | *(a confirmar)* | Não — entrada manual |
| Google Meu Negócio | *(a confirmar)* | Não |

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
| Ferramenta | HubSpot (gratuito) / Pipedrive / Notion / Google Planilhas / CRM próprio no n8n+PostgreSQL | *(a decidir com a cliente)* |
| Quem alimenta | n8n automaticamente a partir das conversas do agente | Preferência — minimiza trabalho manual |
| Integração com agente WhatsApp? | Sim — n8n grava lead ao detectar novo contato | DECIDIDO (consequência da eliminação do Ravi) |
| Migração do Ravi | Exportar leads existentes antes de cancelar | *(a executar antes do desligamento)* |

---

## O que registrar por lead

*(campos mínimos — a validar com a advogada)*

- [ ] Data do primeiro contato
- [ ] Canal de origem
- [ ] Assunto / área jurídica de interesse
- [ ] Status atual (contato > agendado > consultado > contratado > perdido)
- [ ] Data da consulta (se agendada)
- [ ] Motivo de perda (se não converteu)

**O que NÃO registrar:** nome completo, CPF, número de processo, valores de honorários de casos concretos — LGPD.

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
