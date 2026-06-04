---
titulo: "Pendências e Governança — Jotform"
tipo: documento-de-projeto
status: acao-requerida
atualizado_em: "2026-06-04"
tags:
  - jotform
  - governanca
  - pendencias
  - lgpd
---

# Pendências e Governança — Jotform

Consolida o estado dos formulários Jotform do projeto e as ações de governança.
Origem: auditoria do vault (`melhoriaswiki.md`, seções 6 e 7).

---

## Inventário de formulários (3 IDs em circulação — atenção para não confundir)

| Form ID | O que é | Situação |
|---------|---------|----------|
| `261534437014047` | **Questionário de descoberta — usado de verdade.** Respondido pela cliente em 2026-06-03 19:52. | **Manter.** Já compilado no vault (raw + notas públicas). |
| `261524820131042` | Form de descoberta referenciado na spec inicial (`atualizacao-formulario-jotform.md`). | Conferir se é o mesmo fluxo ou um rascunho antigo; consolidar num só. |
| `261534971062053` | **Form DUPLICADO de testes** ("…com a Advogada"). | ⛔ **APAGAR — ver ação abaixo.** |

---

## 🔴 AÇÃO REQUERIDA — apagar o form duplicado de testes

> **Responsável: luizinhotec** (titular da conta Jotform; o autor desta PR, LimaDevBTC, **não
> tem acesso** ao Jotform). O Claude do luizinhotec deve executar:
>
> **Apagar o formulário `261534971062053`** (duplicado de teste "…com a Advogada").
>
> Motivo: evita que respostas reais caiam no form errado e reduz superfície de dados pessoais
> espalhados (LGPD). Antes de apagar, confirmar que não há submissões reais nele — se houver,
> exportar/migrar para o form oficial (`261534437014047`) antes de excluir.

- [ ] Form duplicado `261534971062053` apagado (ou submissões migradas + apagado).

---

## ✅ Decisão registrada — webhook Jotform → `raw/` NÃO será construído

A auditoria (seção 7) sugeria um webhook (Next.js + Octokit) para novas respostas virarem
depósito raw automaticamente.

**Decisão (2026-06-04): não construir.** O formulário **já cumpriu seu papel** — a descoberta
foi feita e o questionário já está respondido e compilado no vault. Não há fluxo recorrente de
novas respostas que justifique a automação. Reabrir só se surgir necessidade de coleta contínua.

---

## ⏳ Governança ainda em aberto (auditoria seção 6 — decisão do gestor)

Não bloqueiam o projeto agora, mas ficam registradas:

- [ ] **Titularidade da conta Jotform + DPA:** hoje as respostas do escritório caem em conta
  pessoal. Definir controlador/operador e formalizar o tratamento (LGPD).
- [ ] **Data center:** avaliar Jotform no data center **EU** (LGPD/GDPR) para os dados do escritório.

---

## Notas relacionadas

- `projeto/atualizacao-formulario-jotform.md`
- `raw/interno/2026-06-03_respostas-questionario.md`
- [[conformidade-lgpd-chatbot]]
