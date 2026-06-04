---
titulo: "Custos e Orçamento do Stack"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_curatela-ferramentas.md
  - projeto/plano-curatela-criacao.md
atualizado_em: "2026-06-04"
tags:
  - custos
  - orcamento
  - financeiro
  - stack
---

# Custos e Orçamento do Stack

Registro dos custos certificados (decisão tomada) e a cotar (ferramenta escolhida, valor pendente).
Atualizar sempre que um valor for confirmado ou uma ferramenta for adicionada/removida.

> Câmbio de referência: USD 1 = R$ 5,70 (jun/2026). Atualizar se variar significativamente.

---

## Custos confirmados — Fase 1 (agente de atendimento)

| Item | Ferramenta | Valor | Periodicidade | Observação |
|------|-----------|-------|--------------|------------|
| Orquestrador | n8n (self-host Docker) | **R$ 0** | — | Open-source; roda na VPS da cliente |
| Banco de dados / CRM | PostgreSQL (self-host Docker) | **R$ 0** | — | Roda na VPS da cliente |
| Consulta processual | DataJud (CNJ) | **R$ 0** | — | API pública gratuita do CNJ |
| VPS dedicada da cliente | A contratar na implantação | **~R$ 50–120/mês** | Mensal | 2 vCPU / 4 GB RAM suficiente para Fase 1 |

---

## Custos confirmados — Automação jurídica interna

| Item | Ferramenta | Valor | Periodicidade | Observação |
|------|-----------|-------|--------------|------------|
| Peticionamento + intimações | LegalMail VIP | **~R$ 997/mês** | Mensal | 2.000 processos. Confirmar volume real antes de contratar. |

---

## A cotar — Fase 1

| Item | Ferramenta | Estimativa | Observação |
|------|-----------|-----------|------------|
| LLM — triagem/filtro | Claude Haiku | Por volume de tokens | Custo baixo por mensagem |
| LLM — atendimento | Claude Sonnet | Por volume de tokens | Principal custo de IA |
| LLM — tarefas pesadas | Claude Opus | Por volume de tokens | Uso raro |
| Canal WhatsApp | Meta Cloud API (oficial) | Por conversa/mensagem | Tarifa Meta: verificar tabela atual |
| Assinatura de contratos | ZapSign | Por plano + R$/envio WhatsApp | Cotar plano adequado ao volume |

---

## Custos confirmados — Fase 3 (avatar e vídeo)

| Item | Ferramenta | Valor | Periodicidade | Observação |
|------|-----------|-------|--------------|------------|
| Geração de avatar em vídeo | HeyGen Creator | **~$29/mês (~R$ 165)** | Mensal | API disponível; escala com uso |
| Clonagem de voz + TTS | ElevenLabs | **~$5–22/mês (~R$ 28–125)** | Mensal | Depende do volume de caracteres |
| **Total Fase 3** | | **~R$ 193–290/mês** | | |

---

## Ferramentas eliminadas — economia gerada

| Ferramenta eliminada | Motivo | Custo evitado/mês |
|---------------------|--------|------------------|
| RaviCRM (Pro + CRM + WhatsApp Pro) | Substituído por n8n + Claude + PostgreSQL | ~R$ 594–994 |
| Humanitech (Business + extras) | Substituído por n8n + Claude (Output 1) | ~R$ 1.788 |
| **Total economia** | | **~R$ 2.382–2.782/mês** |
| **Economia anual** | | **~R$ 28.584–33.384/ano** |

---

## Resumo: custo total estimado do stack (Fase 1)

| Categoria | Mín. | Máx. |
|-----------|------|------|
| Infra (VPS) | R$ 50 | R$ 120 |
| IA (Claude — estimativa conservadora) | R$ 100 | R$ 400 |
| WhatsApp Meta API | R$ 50 | R$ 200 |
| ZapSign | R$ 50 | R$ 150 |
| **Total Fase 1** | **~R$ 250/mês** | **~R$ 870/mês** |

*(Valores a refinar após cotação do volume real de conversas e tokens)*

---

## Notas relacionadas

- [[arquitetura-da-solucao]]
- [[decisoes-de-projeto]]
- [[escopo-e-outputs]]
