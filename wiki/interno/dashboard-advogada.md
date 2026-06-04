---
titulo: "Dashboard da Advogada"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-04"
tags:
  - dashboard
  - metricas
  - visibilidade
  - negocio
---

# Dashboard da Advogada

Define quais informações a advogada precisa enxergar sobre o negócio e como ela acessa isso.

---

## Objetivo

Dar à advogada visibilidade do projeto sem exigir que ela acesse múltiplas ferramentas. Um único painel com o estado do negócio digital.

---

## O que o dashboard deve mostrar

### Atendimento (Agente WhatsApp)

| Métrica | Frequência | Fonte de dados |
|---------|-----------|----------------|
| Total de conversas iniciadas | Diária / Semanal | *(a definir)* |
| Conversas resolvidas pelo agente | Semanal | *(a definir)* |
| Escaladas para humano | Semanal | *(a definir)* |
| Agendamentos gerados pelo agente | Semanal | *(a definir)* |
| Perguntas mais frequentes (top 5) | Mensal | *(a definir)* |
| Horários de pico de contato | Mensal | *(a definir)* |

### Conteúdo (Redes Sociais)

| Métrica | Frequência | Fonte de dados |
|---------|-----------|----------------|
| Posts publicados no período | Semanal | *(a definir — Buffer / Meta / planilha)* |
| Posts pendentes de aprovação | Em tempo real | *(a definir)* |
| Alcance / impressões (Instagram) | Semanal | *(a definir)* |
| Alcance / impressões (LinkedIn) | Semanal | *(a definir)* |
| Seguidores (variação) | Mensal | *(a definir)* |

### Avatar e Vídeos

| Métrica | Frequência | Fonte de dados |
|---------|-----------|----------------|
| Vídeos produzidos no período | Mensal | *(a definir)* |
| Vídeos pendentes de aprovação | Em tempo real | *(a definir)* |
| Visualizações (YouTube / Reels) | Mensal | *(a definir)* |

### Vault / Conhecimento

| Métrica | Frequência | Fonte de dados |
|---------|-----------|----------------|
| Notas com `status: revisado` | Mensal | Git / manual |
| Notas aguardando revisão | Mensal | Git / manual |

---

## Formato do dashboard

| Decisão | Opções | Escolhido |
|---------|--------|-----------|
| Ferramenta | Retool / Metabase / Notion / Google Looker Studio / planilha / custom | *(a decidir)* |
| Acesso | Link privado / app / e-mail semanal | *(a decidir)* |
| Atualização | Tempo real / diária / semanal | *(a decidir)* |
| Quem mantém os dados | Automatizado / Consultoria alimenta manualmente | *(a decidir)* |

---

## Alertas (notificações proativas)

*(a definir — quais situações geram alerta automático para a advogada?)*

Exemplos:
- [ ] Conteúdo aguardando aprovação há mais de 48h
- [ ] Pico de atendimentos no WhatsApp
- [ ] Novo seguidor em quantidade expressiva
- [ ] Agente respondeu algo fora do esperado (erro detectado)

---

## Notas relacionadas

- [[escopo-e-outputs]]
- [[arquitetura-da-solucao]]
- [[fluxo-conversacional]]
- [[pipeline-conteudo]]
- [[decisoes-de-projeto]]
