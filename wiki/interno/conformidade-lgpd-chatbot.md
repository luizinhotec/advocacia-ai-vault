---
titulo: "Conformidade LGPD — Chatbot e Canais Digitais"
camada: interno
status: semente
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-04"
tags:
  - lgpd
  - privacidade
  - conformidade
  - chatbot
---

# Conformidade LGPD — Chatbot e Canais Digitais

Obrigações legais específicas para o atendimento digital (chatbot, redes sociais, site). Complementa as regras gerais de LGPD do vault.

> Esta nota trata da LGPD aplicada aos **sistemas digitais do projeto**. As regras de LGPD do repositório em si estão em [`CLAUDE.md`](../../CLAUDE.md) e [`README.md`](../../README.md).

---

## Dados coletados pelo chatbot (a mapear)

*(preencher após decisão de arquitetura — [[arquitetura-da-solucao]])*

| Dado | Coletado? | Base legal (LGPD art. 7º) | Necessário? |
|------|-----------|--------------------------|-------------|
| Número de telefone (WhatsApp) | Sim (implícito) | Legítimo interesse / consentimento | *(a avaliar)* |
| Nome informado pelo usuário | *(a definir)* | *(a definir)* | *(a definir)* |
| Conteúdo das mensagens | *(a definir — salvo ou não?)* | *(a definir)* | *(a definir)* |
| Histórico de conversa | *(a definir)* | *(a definir)* | *(a definir)* |
| Assunto jurídico mencionado | *(a definir)* | *(a definir)* | Minimização de dados |

**Princípio da minimização:** coletar apenas o estritamente necessário para o atendimento.

---

## Documentos obrigatórios (a produzir)

- [ ] **Aviso de privacidade do chatbot** — informar ao usuário, no início da conversa, o que é coletado, por quê e por quanto tempo *(texto a redigir)*
- [ ] **Política de privacidade do site** — se houver widget de chat ou formulário no site *(a redigir)*
- [ ] **DPA (Data Processing Agreement)** — contrato entre a consultoria (operador) e o escritório (controlador), conforme LGPD art. 39 *(a redigir e assinar antes do lançamento)*
- [ ] **Registro de atividades de tratamento** — obrigação do controlador (escritório) conforme LGPD art. 37 *(a orientar a advogada)*

---

## Prazo de retenção de dados

*(a definir — a consultoria não decide sozinha; a advogada como controladora define, com orientação jurídica)*

| Dado | Retenção proposta | Aprovado pelo escritório? |
|------|------------------|--------------------------|
| Histórico de conversa | *(a definir)* | *(pendente)* |
| Dados de lead (CRM) | *(a definir)* | *(pendente)* |
| Logs de sistema | *(a definir)* | *(pendente)* |

---

## Direitos dos titulares (como o chatbot responde)

*(a definir — o que acontece se um usuário pedir para excluir seus dados?)*

| Direito (LGPD art. 18) | Como o sistema atende | Responsável |
|-----------------------|----------------------|-------------|
| Acesso | *(a definir)* | *(a definir)* |
| Correção | *(a definir)* | *(a definir)* |
| Exclusão | *(a definir)* | *(a definir)* |
| Oposição | *(a definir)* | *(a definir)* |

---

## Sigilo profissional (EOAB art. 34, VII)

O chatbot pode receber relatos de situações jurídicas sensíveis dos usuários. Regras:
- O chatbot **nunca** armazena relatos detalhados de casos — redireciona para consulta
- Conteúdo de mensagens com dados sensíveis **não deve** ser usado para treinar modelos
- A advogada é a controladora e responde pelo tratamento de dados de seus clientes/prospects

---

## Notas relacionadas

- [[arquitetura-da-solucao]]
- [[fluxo-conversacional]]
- [[gestao-de-leads]]
- [[decisoes-de-projeto]]
