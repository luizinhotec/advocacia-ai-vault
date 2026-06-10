---
titulo: "Custos e Orçamento do Stack"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_curatela-ferramentas.md
  - projeto/plano-curatela-criacao.md
atualizado_em: "2026-06-10"
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

## Custos calculados — IA e canal (base: 50 atendimentos/dia)

> Premissas: 50 novas conversas/dia = 1.500/mês · média 4 trocas por conversa = 6.000 chamadas Claude/mês · por chamada: ~3.550 tokens input (~3.000 sistema + ~550 histórico/usuário), ~250 tokens output.

| Item | Ferramenta | Sem prompt cache | Com prompt cache | Observação |
|------|-----------|-----------------|-----------------|------------|
| LLM — atendimento | Claude Sonnet 4.6 (`claude-sonnet-4-6`) | **~R$ 492/mês** ($86) | **~R$ 215/mês** ($38) | $3/MTok input · $15/MTok output. Cache: $0,30/MTok leitura. Prompt caching ativável no n8n. |
| Canal WhatsApp | Meta Cloud API Brasil | **~R$ 25/mês** ($4,40) | — | 1.000 conversas/mês grátis · excedente R$0,05/conversa (service). Para 1.500 conv: 500 × $0,0088 = $4,40. |
| **Total IA + Meta** | | **~R$ 517/mês** | **~R$ 240/mês** | **Estimativa prática: ~R$ 350/mês** (entre os dois cenários, à medida que o caching é ativado) |

> **ROI**: a economia gerada pela eliminação de Humanitech + RaviCRM (~R$ 2.285–2.382/mês) cobre **4–6× o custo total de IA + Meta** no pior cenário. Mesmo sem caching, o stack próprio é ~4× mais barato.

## A cotar — Fase 1

| Item | Ferramenta | Estimativa | Observação |
|------|-----------|-----------|------------|
| Assinatura de contratos | ZapSign Team (80 docs/mês) | ~R$ 124–174/mês | Volume estimado: 50 contratos/mês. Composição: plano Team 80 docs (preço a confirmar ~R$99–149) + WhatsApp 50×R$0,50=R$25. Requer plano Team para acesso à API. |

---

## Custos confirmados — Fase 3 (avatar e vídeo)

| Item | Ferramenta | Valor | Periodicidade | Observação |
|------|-----------|-------|--------------|------------|
| Geração de avatar em vídeo | HeyGen Creator | **~$29/mês (~R$ 165)** | Mensal | API disponível; escala com uso |
| Clonagem de voz + TTS | ElevenLabs | **~$5–22/mês (~R$ 28–125)** | Mensal | Depende do volume de caracteres |
| **Total Fase 3** | | **~R$ 193–290/mês** | | |

---

## Ferramentas eliminadas — economia gerada

Valores confirmados nas páginas oficiais dos fornecedores em 2026-06-09.

| Ferramenta eliminada | Plano | Composição | Custo evitado/mês |
|---------------------|-------|------------|------------------|
| Humanitech | Business | R$1.599 (plano) + R$140 (WhatsApp Pro) + R$49 (CRM) | **R$ 1.788** |
| RaviCRM | Pro (estimado) | R$497 base — plano exato a confirmar com cliente | **R$ 497–594** |
| **Total economia** | | | **~R$ 2.285–2.382/mês** |
| **Economia anual** | | | **~R$ 27.420–28.584/ano** |

> Humanitech: valor exato confirmado — plano Business (2.000 conversas/mês) + add-ons WhatsApp Pro e CRM.
> RaviCRM: plano exato não confirmado pela cliente. Confirmar antes de fechar o ROI definitivo.

---

## Resumo: custo total estimado do stack (Fase 1)

Base: 50 atendimentos/dia. Câmbio USD 1 = R$ 5,70.

| Categoria | Cenário sem cache | Cenário com cache | Nota |
|-----------|------------------|------------------|------|
| Infra (VPS) | R$ 50–120 | R$ 50–120 | Ainda a contratar |
| Claude Sonnet 4.6 | R$ 492 | R$ 215 | **Calculado em 2026-06-10** |
| Meta Cloud API | R$ 25 | R$ 25 | 500 conv. após franquia grátis |
| ZapSign | R$ 124–174 | R$ 124–174 | A confirmar |
| **Total Fase 1** | **~R$ 690–810/mês** | **~R$ 415–535/mês** | |
| **Estimativa prática** | | **~R$ 550/mês** | À medida que caching é ativado no n8n |

> Economia vs. ferramentas eliminadas: ~R$ 2.285–2.382/mês → ROI positivo no mês 1.

---

## Notas relacionadas

- [[arquitetura-da-solucao]]
- [[decisoes-de-projeto]]
- [[escopo-e-outputs]]
