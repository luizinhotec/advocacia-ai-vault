---
titulo: "Fluxo Conversacional do Agente de Atendimento"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-04"
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

## Estrutura geral do fluxo

```
1. ABERTURA
   Usuário envia primeira mensagem
        ↓
2. IDENTIFICAÇÃO DE INTENÇÃO
   O que o usuário quer? (dúvida / agendamento / informação)
        ↓
3. RESPOSTA
   Agente responde com base no vault (wiki/publico/ — status: revisado)
        ↓
4. ENCAMINHAMENTO
   Agente direciona para agendamento ou canal de contato
        ↓
5. ENCERRAMENTO
   Agente conclui e registra a interação
```

---

## Abertura

**Mensagem de boas-vindas:** *(a redigir — tom acolhedor, sem promessas)*

Elementos obrigatórios:
- Identificar que é um atendimento automatizado por IA
- Informar o que o agente pode e não pode fazer
- Oferecer opções claras de navegação (menu ou linguagem natural)

**Horário de funcionamento do agente:** *(a definir — 24h? Apenas horário comercial?)*

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

## Escalada para humano

**Quando escalar:**
- [ ] Usuário solicita explicitamente falar com humano
- [ ] Agente não reconhece a intenção após *(a definir — ex: 2 tentativas)*
- [ ] Assunto envolve urgência explícita (ex: "preciso de socorro", "processo urgente")
- [ ] *(outros gatilhos a definir)*

**Como escalar:**
- Canal de escalada: *(a definir — WhatsApp pessoal da advogada / outro)*
- Notificação: *(a definir — aviso automático à advogada?)*
- O usuário é avisado que um humano irá atender? *(sim/não — a definir)*

---

## Fallback (quando o agente não sabe responder)

*(a definir — ex: "Não tenho essa informação. Posso te ajudar a agendar uma consulta onde a advogada poderá responder diretamente.")*

**Regra absoluta:** O agente nunca improvisa orientação jurídica. Se não souber, redireciona.

---

## Encerramento

**Mensagem de encerramento:** *(a redigir)*

**O agente pergunta se o usuário tem mais dúvidas antes de encerrar?** *(a definir — sim/não)*

---

## Histórico de conversa

**As conversas são salvas?** *(a definir — sim para análise / não por privacidade)*

**Se sim:**
- Onde ficam armazenadas? *(a definir)*
- Por quanto tempo? *(a definir — LGPD: mínimo necessário)*
- Quem tem acesso? *(a definir)*

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
