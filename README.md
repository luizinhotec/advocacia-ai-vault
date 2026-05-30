# Vault LLM Wiki — Escritório de Advocacia

## O que é este repositório

Este é um **vault de conhecimento** no padrão **LLM Wiki**: o conhecimento vive em arquivos Markdown versionados no Git, um agente LLM atua como compilador e bibliotecário, e o Obsidian é apenas o frontend de navegação (opcional).

O vault alimentará, futuramente, um agente de atendimento ao cliente. Por isso toda nota pública segue as normas da OAB e da LGPD.

---

## As três camadas

| Camada | Pasta | Mutabilidade | Quem escreve |
|--------|-------|-------------|--------------|
| **Raw** | `raw/publico/` e `raw/interno/` | Imutável após ingestão | Humano (advogados, gestores) |
| **Wiki** | `wiki/publico/` e `wiki/interno/` | Mantida pelo agente LLM | Agente (com revisão humana) |
| **Schema** | `SCHEMA.md` | Editado pelo engenheiro | Engenheiro do projeto |

- **Raw** recebe documentos-fonte: textos brutos, transcrições, PDFs convertidos, anotações avulsas. Nunca são reescritos — apenas referenciados.
- **Wiki** é o conhecimento compilado, normalizado e linkado. É o que o agente de atendimento lerá.
- **Schema** define as regras que o agente LLM deve seguir ao compilar e manter a wiki.

---

## Separação público / interno

| Camada pública (`publico/`) | Camada interna (`interno/`) |
|-----------------------------|-----------------------------|
| Conteúdo que **pode** alimentar o agente de atendimento | Documentação do projeto, decisões de arquitetura, controles internos |
| Tom sóbrio, conformidade OAB | Sem restrição de tom — uso exclusivo da equipe |
| **Nunca** contém dados de cliente, números de processo ou orientação jurídica concreta | Também **nunca** contém dados de cliente (LGPD) |

A separação é por **pasta**, não por controle de acesso do Git. Não misture conteúdo entre as camadas.

---

## Loop de trabalho: Ingest → Compile → Lint → Writeback

```
1. INGEST
   Humano deposita documento bruto em raw/publico/ ou raw/interno/.
   Nomeia com data ISO + slug descritivo (ex: 2026-05-30_reuniao-kick-off.md).

2. COMPILE
   Agente LLM lê o raw, extrai informações, cria ou atualiza notas na wiki/,
   adiciona frontmatter YAML, cria backlinks [[...]] e registra a fonte.

3. LINT
   Agente executa o checklist de lint definido em SCHEMA.md:
   afirmações sem fonte, contradições, links quebrados, notas órfãs,
   vazamento de camada, dados sensíveis.

4. WRITEBACK
   Agente propõe diff para revisão humana. Humano aprova e faz commit
   seguindo a convenção: docs: ou chore: + descrição curta em PT-BR.
```

---

## Convenção de commits

```
chore: scaffold, configuração, infraestrutura do vault
docs:  adição ou atualização de conteúdo wiki ou raw
fix:   correção de link quebrado, frontmatter inválido, erro factual
feat:  nova nota ou nova seção de conteúdo relevante
```

---

## O que NÃO entra neste repositório

- Dados de clientes (nome, CPF, e-mail, telefone)
- Números de processo judicial ou administrativo
- Valores de honorários de casos concretos
- Qualquer informação coberta por sigilo profissional (art. 34, VII, EOAB)
- Código de aplicação (n8n, scripts, tools) — esse código vai em repositório separado

---

## Navegação rápida

- [`SCHEMA.md`](SCHEMA.md) — regras do bibliotecário LLM
- [`wiki/publico/_index.md`](wiki/publico/_index.md) — mapa do conteúdo público
- [`wiki/interno/_index.md`](wiki/interno/_index.md) — mapa do conteúdo interno *(a criar)*
- [`raw/publico/README.md`](raw/publico/README.md) — o que entra no raw público
- [`raw/interno/README.md`](raw/interno/README.md) — o que entra no raw interno
