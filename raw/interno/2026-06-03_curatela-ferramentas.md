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

| Ferramenta | Categoria | Para que ela usa (declarado/inferido) | Postura do projeto |
|-----------|-----------|----------------------------------------|--------------------|
| **Claude** | LLM | Uso geral; é a preferência declarada (skills, extensões, templates) | **Cérebro/LLM oficial** (ver arquitetura) |
| ChatGPT | LLM | Uso geral | Coexistir; consolidar no Claude |
| Gemini | LLM | Uso geral | Coexistir; consolidar no Claude |
| Manus | Agente/automação | Tarefas gerais com IA | Avaliar sobreposição |
| **Jusbrasil** | Jurídico (processual) | Consulta/monitoramento de processos | Integrar via API (DECIDIDO) |
| **RaviCRM** | CRM | Relacionamento, leads, funil, WhatsApp | Hub front-office — confirmar API/webhook |
| Adapta | Plataforma de IA | Agentes/conteúdo | Avaliar sobreposição |
| LegalMail | Comunicação jurídica | E-mail/intimações jurídicas | Mapear função exata |
| Humanitech | Conteúdo/avatar/voz | Clone e produção de conteúdo | ⚠️ Build vs buy do Output 3 (avatar/voz) |
| Astrea (Aurum) | ERP jurídico | Processos/prazos (back-office) | Sem API pública aparente — candidato a substituição |

*(Lista não exaustiva — a cliente citou "dentre outras". Completar conforme o acesso for concedido.)*

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
