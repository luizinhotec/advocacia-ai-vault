# Curatela de Ferramentas — Inventário do Estado Atual (Ribeiro Abreu)

> **Documento-fonte (raw interno).** Inventário das ferramentas que a cliente já usa no
> escritório, levantado a partir do questionário de descoberta (Jotform 2026-06-03, Bloco 1B)
> e do áudio de primeiro contato. Resolve a fonte `curatela-ferramentas` citada por
> [[arquitetura-da-solucao]].
>
> A cliente **ofereceu acesso a todas as ferramentas** ("posso dar o acesso aos sistemas") para
> abastecer o projeto com o máximo de dados. Os acessos em si **não entram no Git** — credenciais
> e dados de clientes ficam fora do vault (LGPD / sigilo). Aqui registramos apenas o mapa.
>
> Detalhamento e decisões de integrar/coexistir/substituir vivem em
> `projeto/plano-curatela-criacao.md`.

---

## Ferramentas em uso hoje (declaradas pela cliente)

| Ferramenta | Categoria | Para que ela usa | API / Integração | Postura do projeto |
|-----------|-----------|-----------------|------------------|--------------------|
| **Claude** | LLM | Preferência declarada — skills, extensões, templates | API Anthropic ✅ | **Cérebro/LLM oficial** |
| **WhatsApp Business** | Canal | Atendimento (2 números) | Meta Cloud API ✅ — node n8n nativo | **Canal principal do Output 1** |
| **ZapSign** | Assinatura digital | Contratos de honorários | API REST ✅ — node n8n nativo, MCP server | **Integrar na Fase 1** |
| **Jusbrasil** | Jurídico (processual) | Consulta/monitoramento de processos | API enterprise ⚠️ — usar DataJud (CNJ) grátis | **DataJud como primário** |
| **RaviCRM** | CRM / WhatsApp + IA | Leads, funil, atendimento com IA 24/7 | API + webhook (Pro R$497/mês) — docs não públicas | **ELIMINAR** — substituído por n8n+Claude. Migrar dados de leads antes de cancelar. |
| **Astrea (Aurum)** | ERP jurídico | Processos, prazos, back-office | ❌ Sem API pública | Fase 1: manual; Fase 2: substituir |
| **LegalMail** | Intimações / petições | Peticionar + capturar intimações | ✅ API (portal dev autenticado) — obter docs após contratar | **INTEGRAR** — automação de intimações e peticionamento. Plano VIP ~R$997/mês. |
| **Manus** | Agente autônomo | Tarefas gerais com IA | Compatível com MCP — **adquirida pela Meta** | Coexistir; consolidar no Claude |
| **Adapta** | Agregador de LLMs | Interface unificada Claude/GPT/Gemini | ❌ Sem API de integração externa (só interface web) | Coexistir; cliente migra para Claude direto |
| **Humanitech** | Chatbot WhatsApp IA (≠ avatar/voz) | Atendimento WhatsApp 24h, leads, CRM | API + n8n nativos | **ELIMINAR** — sobreposição total com Output 1 (n8n+Claude). Economia ~R$1.688/mês. |
| ChatGPT | LLM | Uso geral | API OpenAI ✅ | Coexistir; consolidar no Claude |
| Gemini | LLM | Uso geral | API Google ✅ | Coexistir; consolidar no Claude |

*(Lista não exaustiva — a cliente citou "dentre outras". Completar conforme o acesso for concedido.)*

---

## ⚠️ Conflito arquitetural — RaviCRM × agente Claude no WhatsApp

O RaviCRM já opera **IA própria no WhatsApp usando a Meta Cloud API oficial**. O Output 1 do projeto
também usa WhatsApp + Claude via n8n. Dois sistemas não podem controlar o mesmo número de WhatsApp
simultaneamente. A decisão precisa ser tomada antes da Fase 1:

| Opção | Descrição | Prós | Contras |
|-------|-----------|------|---------|
| **A — Substituir o RaviCRM** | n8n + Claude assume o WhatsApp; RaviCRM é desativado | Controle total, sem duplicação, custo menor | Perda de funcionalidades de CRM/pipeline do Ravi |
| **B — Integrar Claude dentro do RaviCRM** | RaviCRM recebe a mensagem; repassa via webhook ao n8n+Claude; devolve a resposta | Mantém o CRM e o pipeline; sem troca de ferramenta | Latência extra; depende de webhook do Ravi; custo duplo |
| **C — Ravi no número 1, Claude no número 2** | Cada IA em um número diferente | Sem conflito técnico | Confuso para o cliente final; divide a audiência |

**Recomendação provisória:** Opção A (substituir o RaviCRM pelo n8n+Claude) ou Opção B se a
advogada depender fortemente do pipeline Kanban do Ravi. **Decidir com a cliente na próxima reunião.**

## Infraestrutura declarada (Bloco 1B)

- **2 números de WhatsApp** de atendimento.
- **5 computadores** na operação.
- **Conta Claude:** ainda **não há plano pago** — provisionar é pré-requisito da Fase 1.

## Oferta da cliente — feedback de campo

A cliente se ofereceu para compartilhar **os bugs que mais identifica e o que dá certo** nas
plataformas que usa. Input valioso: orienta a curatela (o que integrar vs. substituir) e a
priorização. `[COLETAR — roteiro curto por ferramenta.]`

## Fronteira de dados (LGPD / sigilo)

- Dados processuais (andamentos do Jusbrasil), dados de leads (RaviCRM) e qualquer dado de
  cliente **transitam no orquestrador/CRM, nunca neste vault Git**.
- Credenciais de acesso **nunca** são versionadas — ver gestão de segredos fora do repositório.

## Notas relacionadas

- [[arquitetura-da-solucao]] · [[plano-curatela-criacao]] · [[gestao-de-leads]] · [[conformidade-lgpd-chatbot]]
- Fontes: `raw/interno/2026-06-03_respostas-questionario.md` · `raw/interno/2026-05-30_audio-primeiro-contato.md`
