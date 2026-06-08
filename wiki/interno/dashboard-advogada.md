---
titulo: "Dashboard da Advogada"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-08"
tags:
  - dashboard
  - metricas
  - visibilidade
  - negocio
---

# Dashboard da Advogada

Painel de gestão do escritório — focado no negócio jurídico, não na tecnologia. A advogada enxerga clientes, processos, receita e alertas. Detalhes técnicos ficam acessíveis sob demanda, nunca na frente.

---

## Decisões de design

| Decisão | Escolhido |
|---------|-----------|
| Ferramenta | Next.js (orquestrador-dashboard, porta 3001 na VPS) |
| Linguagem visual | Negócio jurídico — sem jargão técnico |
| Dados de leads | Automático — PostgreSQL via n8n |
| Dados de conversão | Integração com agenda (Google Calendar ou Cal.com — a definir) |
| Receita | Agenda × ticket médio configurado uma vez |
| Alertas de prazo | WhatsApp da advogada **e** card no dashboard |
| "Economia vs. ferramentas antigas" | **Fora do dashboard** — argumento de venda, não métrica operacional |

---

## Navegação — o que a advogada vê

| Tela | Foco |
|------|------|
| **Início** | Resumo do dia: leads novos, alertas, resultado do mês em 1 linha |
| **Leads** | Quem entrou em contato, qual assunto, qual status — já implementado |
| **Funil** | Onde cada lead está: novo → consulta marcada → cliente — já implementado |
| **Processos** | Casos ativos, prazos, andamentos *(fase 2 — integração LegalMail)* |
| **Petições** | Documentos enviados, pendentes, retornos *(fase 2 — integração LegalMail)* |
| **ROI** | Investimento × receita gerada — drill-down disponível se quiser detalhe |

Itens removidos do menu: Projetos, Tarefas, Auditoria, qualquer referência a sistemas técnicos.

---

## Tela Início — cards

| Card | Dado | Fonte |
|------|------|-------|
| Leads hoje | Novos contatos nas últimas 24h | PostgreSQL automático |
| Aguardando retorno | Leads com bot pausado (escalados) | PostgreSQL automático |
| Consultas marcadas esta semana | Agendamentos confirmados | Integração de agenda |
| Resultado do mês | Receita − Investimento | Calculado |
| ⚠️ Alertas ativos | Prazos próximos, leads sem resposta | n8n → dashboard |

---

## Tela ROI — métricas operacionais

Sem histórico de "o que foi eliminado". Só o que importa agora:

| Métrica | Fonte |
|---------|-------|
| Investimento mensal | Fixo no sistema (API + VPS — atualizado pela consultoria) |
| Leads gerados | Automático — PostgreSQL |
| Consultas marcadas | Integração com agenda |
| Receita estimada | Agenda × ticket médio (configurado uma vez pela equipe) |
| **Resultado líquido** | Receita − Investimento |

Ticket médio: configurado manualmente uma vez, revisado quando necessário.

---

## Alertas de prazo — dois canais

Disparados pelo n8n automaticamente:

| Gatilho | Canal |
|---------|-------|
| Lead escalado há mais de 2h sem resposta | WhatsApp + dashboard |
| Lead mencionou prazo judicial na conversa | WhatsApp + dashboard |
| Processo com prazo em menos de 3 dias *(fase 2)* | WhatsApp + dashboard |
| Petição com retorno pendente *(fase 2)* | WhatsApp + dashboard |
| Mais de 10 leads em 1 hora (pico de campanha) | WhatsApp |

---

## Roadmap de implementação

| Fase | O que entra |
|------|------------|
| **Agora** | Leads, Funil — estrutura base ✅ |
| **Fase 1b** | Início redesenhado ✅, ROI (investimento + leads) ✅, alertas de lead ✅, Processos/Petições (stubs fase 2) ✅ |
| **Fase 2** | Processos + Petições (LegalMail), alertas de prazo judicial, integração agenda |
| **Fase 3** | Dados de redes sociais e vídeos (Output 2 e 3) |

### Implementado em 2026-06-07

| Tela | Status | Webhook n8n |
|------|--------|-------------|
| Início | ✅ online | GET /webhook/advocacia/inicio (ID: UkKU4BQ9EmmqRgjm) |
| Leads | ✅ online | GET /webhook/advocacia/dashboard |
| Funil | ✅ online | GET /webhook/advocacia/funil |
| ROI | ✅ online (investimento hardcoded, receita pendente agenda) | usa /webhook/advocacia/inicio |
| Processos | ✅ stub fase 2 | — |
| Petições | ✅ stub fase 2 | — |

**Sidebar final:** Início · Leads · Funil · Processos (fase 2) · Petições (fase 2) · ROI

---

## Integração de agenda — decisão pendente

Para Receita e Conversão funcionar, precisamos definir:
- [ ] Qual ferramenta de agendamento a advogada vai usar (Google Calendar, Cal.com, outro)
- [ ] Ticket médio por tipo de consulta (a informar pela advogada)

Decidir na primeira reunião pós-implantação. Ver [[decisoes-de-projeto]].

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[arquitetura-da-solucao]]
- [[agente-recepcao-leads]]
- [[decisoes-de-projeto]]
