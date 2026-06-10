---
titulo: "Fluxo Conversacional do Agente de Atendimento"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-10"
tags:
  - agente
  - fluxo
  - conversacao
  - whatsapp
---

# Fluxo Conversacional do Agente de Atendimento

> **Foco primário — recepção de leads de campanha.** O design detalhado do agente
> (persona, estágios, objeções, modelo LLM) está em [[agente-recepcao-leads]].
> Esta nota descreve o fluxo técnico macro e os casos secundários (FAQ, FAQ operacional).

Define como o agente se comporta em cada etapa da conversa — do primeiro contato ao encerramento.

---

## Estrutura geral do fluxo ✅ IMPLEMENTADO

```
1. ACOLHIMENTO
   Cumprimento caloroso + pergunta aberta (nunca menu)
        ↓
2. QUALIFICAÇÃO (máx 3 perguntas)
   Nome + área jurídica + situação básica
   CRÍTICO: não repetir perguntas. Avançar ao ter nome + área + situação.
        ↓
3. VALIDAÇÃO (1 mensagem)
   Mostrar que o lead veio ao lugar certo, sem prometer resultado
        ↓
4. ENCAMINHAMENTO
   "[Nome], vou registrar e encaminhar para o especialista em [área].
    Ele vai entrar em contato em breve. 🙏"
   + tags [NOME][AREA][URGENCIA][STATUS:qualificado][RESUMO][ESCALAR]
        ↓
5. bot_pausado = true
   Bot responde com empatia contextual (via Claude) enquanto advogado atende.
   Quando advogado responde ACEITAR: notificação ao cliente + escalada marcada como aceita.
```

---

## Abertura ✅ IMPLEMENTADO

Agente responde 24h. Não há menu de opções — abertura sempre com pergunta aberta.

Exemplo de resposta para "oi":
> "Olá! Seja bem-vindo ao *Ribeiro Abreu Advogados* 👋 Pode me contar o que está acontecendo? Estou aqui pra te ajudar."

O agente se identifica como assistente virtual quando perguntado diretamente sobre ser robô.

---

## Intenções mapeadas

| Intenção | Resposta do agente | Fonte no vault |
|----------|-------------------|----------------|
| "Quero agendar uma consulta" | Direciona para agendamento | [[fluxo-de-atendimento]] |
| "Quais áreas vocês atendem?" | Lista as áreas de atuação | [[areas-de-atuacao]] |
| "Onde fica o escritório?" | Endereço e horários | [[logistica]] |
| "Quanto custa uma consulta?" | Redireciona para consulta (sem valor) | [[faq]] |
| "Tenho uma dúvida jurídica" | Orienta a buscar consulta, não responde | `SCHEMA.md` §4 (guardrails OAB) |
| "Quero falar com a advogada" | Direciona para canal humano | *(a definir)* |
| Intenção não reconhecida | *(a definir — fallback)* | |

---

## Escalada para humano ✅ IMPLEMENTADO

**Quando escalar:**
- Lead qualificado após 3 perguntas → tag [ESCALAR] automática
- Lead preso / em delegacia / situação de crise → imediato, sem qualificação
- Lead menciona prazo judicial → imediato
- Lead pede falar com humano → imediato

**Como escalar (n8n):**
1. Claude inclui [ESCALAR] nas tags
2. n8n busca advogado pela área em `adv_contatos`
3. Registra em `adv_escaladas` com status `pendente`
4. Envia notificação WhatsApp para o advogado
5. Define `bot_pausado = true`

**O lead é avisado:** sim — recebe mensagem de encaminhamento antes das tags.
**Notificação:** automática via WhatsApp para o advogado da área.
**Advogado responde ACEITAR:** escalada marcada `aceito`, cliente notificado.

Ver tabela de advogados por área em [[agente-recepcao-leads]].

---

## Fallback (quando o agente não sabe responder) ✅ IMPLEMENTADO

O agente nunca improvisa orientação jurídica. Se a área não for reconhecida ou a situação for ambígua, avança com empatia e encaminha para consulta.

Regra absoluta: qualquer dúvida sobre o mérito do caso → redirecionar para consulta, nunca responder.

---

## Encerramento ✅ IMPLEMENTADO

Após encaminhamento (`bot_pausado = true`): o agente responde com mensagens contextuais de "seu caso está com o especialista" geradas pelo Claude. Não há encerramento formal — conversa fica aberta para o advogado assumir.

---

## Histórico de conversa ✅ IMPLEMENTADO

**Conversas são salvas:** sim — PostgreSQL na VPS da cliente (controladora dos dados).

| Tabela | Conteúdo | Retenção |
|--------|----------|----------|
| `adv_leads` | Perfil do lead: nome, área, resumo, status, bot_pausado | Indefinido (cliente decide) |
| `adv_mensagens` | Histórico completo: role, conteúdo, timestamp, modelo LLM | Indefinido (cliente decide) |
| `adv_escaladas` | Registro de escalações: área, advogado, status, timestamps | Indefinido (cliente decide) |

**Quem tem acesso:** Dra. Hyvana (via dashboard) e consultoria (operação). Leads nunca entram no vault Git — LGPD.

**Nova sessão:** inatividade > 24h reinicia a qualificação (lead retorna como `novo`).

---

## Métricas de qualidade (a monitorar)

- Taxa de resolução sem escalada
- Taxa de abandono da conversa
- Intenções não reconhecidas (para melhorar o agente)
- NPS ou avaliação pós-atendimento *(a definir — coletar ou não?)*

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[arquitetura-da-solucao]]
- [[fluxo-de-atendimento]]
- [[conformidade-lgpd-chatbot]]
- [[decisoes-de-projeto]]
