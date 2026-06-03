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

**Decisão:** *(PROPOSTA — a validar tecnicamente na reunião inicial)* Adotar o ecossistema
**Claude (Desktop / Code / .ai) + skills + extensões/MCP** como stack central da implantação.

**Motivo:** É a preferência explícita da cliente, reduz curva de adoção (ela já conhece) e
aproveita as skills que ela já possui.

**Alternativas descartadas:** *(a registrar após validação — ex: plataformas no-code de
agentes, outros LLMs)*. Não descartar formalmente antes de inventariar o que já existe.

**Consequências:**
- Inventariar **as skills prontas** da cliente e **as IAs já em uso** (pedir export/arquivos).
- Levantar infraestrutura: SO e máquinas da equipe, contas Claude, ponto focal de TI.
- Definir como o ecossistema Claude se integra ao **CRM/software jurídico** e ao **WhatsApp**.

**Decidido por:** *(pendente — proposta da consultoria a confirmar com a cliente e o gestor do projeto)*

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

### [YYYY-MM-DD] Ferramenta de avatar

*(a preencher quando a ferramenta for escolhida)*

---

### [YYYY-MM-DD] Ferramenta de clonagem de voz

*(a preencher quando a ferramenta for escolhida)*

---

### [YYYY-MM-DD] Canal principal do agente de atendimento

*(a preencher — WhatsApp Business API / widget no site / outro)*

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
