---
titulo: "Arquitetura da Solução"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
  - raw/interno/2026-06-03_curatela-ferramentas.md
  - projeto/plano-curatela-criacao.md
atualizado_em: "2026-06-07"
tags:
  - arquitetura
  - tecnico
  - stack
---

# Arquitetura da Solução

Mapa das decisões técnicas da solução. Atualizado com as decisões já tomadas na estratégia (Claude-first + n8n) e na curatela de ferramentas. Itens ainda em aberto dependem de confirmação da cliente ou de fornecedor.

Legenda de status: **DECIDIDO** · **A CONFIRMAR (cliente/fornecedor)** · **A DECIDIR**

---

## Princípio da arquitetura: orquestrador único

Estratégia: **integrar → coexistir → substituir, gradualmente.** O orquestrador entra como camada que conecta o que a cliente já usa (não substitui de cara). Ver [[plano-curatela-criacao]].

---

## Agente de Atendimento (Output 1)

### Canal de entrada

| Decisão | Escolhido | Status | Justificativa |
|---------|-----------|--------|---------------|
| Canal | WhatsApp Business API (oficial) | DECIDIDO | É por onde os contatos chegam; resolve a dor da cliente. |
| Provedor WhatsApp API | **Meta Cloud API** | DECIDIDO ✅ IMPLEMENTADO | Evolution API descartada: IPs de VPS/data center bloqueados pela Meta. Meta Cloud API adotada antecipadamente — n8n recebe webhooks e envia via HTTPS para `graph.facebook.com`. Ver [[decisoes-de-projeto]] ADR 2026-06-07. |
| Túnel HTTPS | ngrok (Docker na VPS) | DECIDIDO ✅ IMPLEMENTADO | Meta exige HTTPS para webhooks. ngrok expõe o n8n via túnel TLS. URL atual: `https://constrict-shuffle-helping.ngrok-free.dev` (muda ao reiniciar — estabilizar ao registrar número definitivo). |
| Número WhatsApp | Chip pré-pago dedicado (a adquirir) | DECIDIDO | Chip físico exclusivo para o bot. Teste atual: número sandbox Meta (bloqueado no BR) e número Twilio +1. Ver [[decisoes-de-projeto]] ADR 2026-06-07. |
| Widget no site | Fase posterior | A DECIDIR | Foco inicial é WhatsApp. |

### Orquestração e LLM

| Decisão | Escolhido | Status | Justificativa |
|---------|-----------|--------|---------------|
| Orquestrador | n8n | DECIDIDO | Encanamento/automação; conecta canais e ferramentas. |
| Cérebro / LLM | Claude (Anthropic) | DECIDIDO | Raciocínio, triagem, redação. A própria cliente prefere Claude (Bloco 1B). |
| Roteamento de modelos | Haiku = filtro/triagem · Sonnet = atendente · Opus = tarefas pesadas/raras | DECIDIDO | Controle de custo por tarefa. |
| Como o agente lê o vault | Contexto direto (sem banco de vetores) | DECIDIDO | Padrão LLM Wiki; vault pequeno cabe no contexto. Reavaliar só se passar de ~100 notas/~80k tokens. |
| Base de embeddings | Não usar (por ora) | DECIDIDO | Consequência da decisão acima. Se precisar, Voyage AI + pgvector. |

### Integrações via API (orquestráveis) — ver [[plano-curatela-criacao]]

| Ferramenta | Função | Status | Verificação de API |
|-----------|--------|--------|--------------------|
| ZapSign | Assinatura de contratos | DECIDIDO ✅ | API REST pública documentada (`docs.zapsign.com.br`). Auth Bearer. Sandbox disponível. **Node n8n nativo** (`n8n-nodes-zapsign`) e integração Make.com. MCP server oficial no GitHub. |
| Jusbrasil | Consulta/monitoramento processual | DECIDIDO ⚠️ | API existe (`api.jusbrasil.com.br/docs`) mas requer contrato enterprise — não é acesso aberto. **Usar DataJud (CNJ) como fallback primário:** gratuito, +80 M processos, 90 tribunais, auth por chave pública, sem custo. |
| DataJud (CNJ) | Fallback processual gratuito | DECIDIDO ✅ | API REST pública, gratuita, documentada em `datajud-wiki.cnj.jus.br`. Cobre todos os tribunais obrigados a reportar ao CNJ. |
| RaviCRM | CRM de relacionamento (leads/funil/WhatsApp) | **ELIMINAR** ❌ | Conflito direto: Ravi já tem IA própria no WhatsApp via Meta Cloud API. Decisão: substituir por n8n+Claude. Cancelar conta após migração dos dados de leads. Ver [[decisoes-de-projeto]]. |
| LegalMail | Peticionamento + intimações judiciais | DECIDIDO ✅ | API existe (portal dev autenticado). Plano VIP R$997/mês (2.000 processos). Integrar ao n8n para notificações automáticas e resposta de andamento ao cliente. |
| Astrea | ERP jurídico (processos/prazos) | SUBSTITUIR ❌ | Sem API pública. LegalMail cobre parte da sua função com API. Candidato a substituição completa na Fase 2. Na Fase 1: desligar gradualmente. |

### Integração de agenda

| Decisão | Escolhido | Status |
|---------|-----------|--------|
| Ferramenta de agendamento | A definir (Google Calendar + link / Cal.com) | A DECIDIR |
| Integração automática | Preferir via API | A DECIDIR |

### Hospedagem e infra

| Decisão | Escolhido | Status | Observação |
|---------|-----------|--------|------------|
| Onde roda o n8n | VPS dedicada da cliente (self-host Docker) | DECIDIDO ✅ IMPLEMENTADO | VPS provisionada (IP: interno — não publicar). n8n rodando em Docker. Consultoria opera e mantém remotamente. Dados da cliente ficam na infra dela (LGPD — cliente é controladora). |
| Banco de dados | PostgreSQL | DECIDIDO ✅ IMPLEMENTADO | Rodando na VPS. Tabelas criadas: `adv_leads`, `adv_mensagens`, `adv_escaladas`. n8n lê/escreve via node Postgres (credencial ID `ghIH8LiX7JjxKTBb`). |
| Workflow n8n principal | `ADV — Agente de Atendimento WhatsApp` | IMPLEMENTADO ✅ | ID `m1m57ANtiYdWrCjA`. Pipeline completo: webhook → normalizar → upsert lead → histórico → contexto Claude → API Claude → processar → salvar → escalar? → enviar WhatsApp. Testado e funcionando em 2026-06-07. |
| Workflow n8n webhook verify | `ADV — Meta Webhook Verify` | IMPLEMENTADO ✅ | ID `aAYNgNGzLtHQ3ajo`. Responde ao GET de verificação da Meta com hub.challenge. |
| Modelo LLM em produção | `claude-haiku-4-5` | IMPLEMENTADO ✅ | Haiku usado no lançamento por custo-benefício. Migrar para Sonnet ou Opus após validação com a cliente. Ver [[agente-recepcao-leads]] seção de custo. |
| Repositório de código | GitHub, repo SEPARADO deste vault | DECIDIDO | Vault só com conhecimento; código não entra aqui (CLAUDE.md). |
| Conta(s) Claude | Consultoria usa a própria na Fase 1 | DECIDIDO ✅ | Consultoria usa conta própria durante desenvolvimento. Conta da cliente provisionada antes da entrega final. Não é pré-requisito bloqueante. |

---

## Conteúdo para Redes Sociais (Output 2)

Fase 3. Sobreposição com Humanitech (clone/conteúdo) e Ferpin (agência atual) — decisão build vs buy. Ver [[pipeline-conteudo]] e [[plano-curatela-criacao]].

| Decisão | Status |
|---------|--------|
| Geração de artes (Canva / IA) | A DECIDIR |
| Agendamento (Buffer / Meta Suite) | A DECIDIR |
| Armazenamento de assets (Drive) | A DECIDIR |
| Quem publica | A DECIDIR |

---

## Avatar com Voz Clonada (Output 3)

Fase 3. Atenção: a cliente está negociando com a Humanitech justamente isso — decidir build (ElevenLabs/HeyGen) vs buy (Humanitech) antes de investir.

| Decisão | Opções | Status |
|---------|--------|--------|
| Ferramenta de avatar | HeyGen | DECIDIDO ✅ | API disponível. Planos a partir de $29/mês (Creator). API a partir de $5. Build próprio — não usar Humanitech. |
| Ferramenta de voz | ElevenLabs | DECIDIDO ✅ | API TTS + clonagem de voz. Build próprio — não usar Humanitech. |
| Hospedagem de vídeos | YouTube / Drive | A DECIDIR | |
| Consentimento de voz | Obrigatório antes de qualquer produção | DECIDIDO (regra) | Ver [[consentimento-voz-clonada]] |

---

## Custos estimados

Ver nota dedicada: [[custos-e-orcamento]]

---

## O que falta decidir (resumo)

- Cliente: infra (máquinas/contas Claude), agenda, confirmar Astrea, validar eliminação do Ravi.
- Fornecedor: API do Astrea (candidato a substituição na Fase 2).
- Projeto: ferramenta de agendamento, hospedagem do n8n, build vs buy do conteúdo/avatar.

## Notas relacionadas

- [[plano-curatela-criacao]]
- [[decisoes-de-projeto]]
- [[fluxo-conversacional]]
- [[conformidade-lgpd-chatbot]]
- [[gestao-de-leads]]
- [[dashboard-advogada]]
