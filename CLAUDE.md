# CLAUDE.md — Contexto Permanente do Vault

Leia este arquivo no início de **toda** sessão antes de qualquer outra ação.

---

## O que é este projeto

Consultoria de IA para um **escritório de advocacia no Brasil**. O projeto entrega **três outputs**:

| # | Output | Canal | Nota principal |
|---|--------|-------|---------------|
| 1 | Agente de atendimento (chatbot texto) | WhatsApp / Site | [[escopo-e-outputs]] |
| 2 | Conteúdo para redes sociais (imagem + legenda) | Instagram / LinkedIn | [[estrategia-editorial]] |
| 3 | Avatar com voz clonada (vídeo) | Reels / YouTube / Site | [[identidade-do-avatar]] |

Este repositório é exclusivamente de **conhecimento em Markdown**. Não contém código de aplicação.

---

## Padrão LLM Wiki

O vault segue o padrão "LLM Wiki":

- **`raw/`** — documentos-fonte imutáveis depositados por humanos
- **`wiki/`** — conhecimento compilado e mantido pelo agente LLM
- **`SCHEMA.md`** — regras do bibliotecário (frontmatter, compile, lint, guardrails)

Loop de trabalho: **Ingest → Compile → Lint → Writeback** (detalhes em `README.md`).

---

## Separação público / interno

| Camada | Pasta | Pode alimentar o agente de atendimento? |
|--------|-------|-----------------------------------------|
| Pública | `raw/publico/`, `wiki/publico/` | Sim — apenas notas `status: revisado` |
| Interna | `raw/interno/`, `wiki/interno/` | Não |

A separação é por pasta. Nunca mescle conteúdo entre as camadas.

---

## Conformidade OAB — Inegociável

Todo conteúdo em `wiki/publico/` deve respeitar o Código de Ética e Disciplina da OAB e o Provimento 205/2021. Regras resumidas:

- ❌ Nunca prometer resultado
- ❌ Nunca escrever orientação jurídica concreta como resposta pronta
- ❌ Nunca usar honorários ou descontos como atrativo
- ❌ Nunca comparar com outros escritórios
- ✅ Tom sóbrio, informativo, profissional
- ✅ Redirecionar sempre para agendamento de consulta

Consulte a tabela completa em `SCHEMA.md` seção 4.

---

## LGPD — Sem exceções

Nenhum dado pessoal identificável entra neste repositório:
- Sem nomes de clientes, CPF, e-mail, telefone
- Sem números de processo
- Sem valores de honorários de casos concretos
- Sem peças processuais ou informações sigilosas (art. 34, VII, EOAB)

---

## Convenção de commits

```
chore: scaffold, configuração, infraestrutura do vault
docs:  adição ou atualização de conteúdo wiki ou raw
fix:   correção de link quebrado, frontmatter inválido, erro factual
feat:  nova nota ou nova seção de conteúdo relevante
```

Mensagens em PT-BR, modo imperativo, linha de assunto ≤ 72 caracteres.

---

## Fase atual do projeto

**Estamos na fase de estruturação do conhecimento.**

- ✅ Permitido: criar e compilar notas, atualizar o vault, fazer lint
- ❌ Não permitido sem aprovação explícita: escrever código de aplicação (n8n, scripts, tools, API, integrações)

> **Se o usuário pedir código de aplicação, pergunte antes de escrever.**

---

## Navegação rápida

**Configuração**
- [`README.md`](README.md) — visão geral do padrão LLM Wiki
- [`SCHEMA.md`](SCHEMA.md) — regras do bibliotecário (inclui guardrails OAB texto e audiovisual)

**Conteúdo público (agente de atendimento)**
- [`wiki/publico/_index.md`](wiki/publico/_index.md) — MOC do conteúdo público

**Estratégia e produção (interno)**
- [`wiki/interno/_index.md`](wiki/interno/_index.md) — MOC interno completo
- [`wiki/interno/escopo-e-outputs.md`](wiki/interno/escopo-e-outputs.md) — os 3 entregáveis mapeados
- [`wiki/interno/identidade-do-avatar.md`](wiki/interno/identidade-do-avatar.md) — avatar + voz
- [`wiki/interno/consentimento-voz-clonada.md`](wiki/interno/consentimento-voz-clonada.md) — ⚠️ pré-requisito legal
- [`wiki/interno/fluxo-de-aprovacao.md`](wiki/interno/fluxo-de-aprovacao.md) — governança de publicação
- [`wiki/interno/roteiro-padrao-video.md`](wiki/interno/roteiro-padrao-video.md) — template obrigatório de vídeo

**Raw**
- [`raw/publico/README.md`](raw/publico/README.md) — o que entra no raw público
- [`raw/interno/README.md`](raw/interno/README.md) — o que entra no raw interno
