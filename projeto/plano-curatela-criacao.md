---
titulo: Plano de Curatela e Criação
camada: interno
status: revisado
fontes: [reuniao-inicial-ribeiro-abreu, curatela-ferramentas]
atualizado_em: 2026-06-03
tags: [plano, curatela, orquestrador, ferramentas, mapeamento, estrategia]
---

# Plano de Curatela e Criação

Mapear de ponta a ponta o ecossistema que a cliente (Ribeiro Abreu Advogados)
já usa e desenhar **um orquestrador único** (Claude-first + n8n) que englobe
tudo — primeiro integrando, depois substituindo gradualmente.

## Filosofia de adoção (estratégia central do projeto)
**Integrar → Coexistir → Substituir, gradualmente.**
1. **Integrar:** o orquestrador entra como camada de integração por cima do que
   já existe. Conecta as ferramentas atuais num trilho único (pipeline costurado),
   sem pedir que a cliente abandone nada. Entrega valor com risco baixo.
2. **Coexistir:** as ferramentas atuais seguem funcionando enquanto nossos
   produtos rodam ao lado e provam valor.
3. **Substituir:** conforme a confiança cresce, o agente vai substituindo —
   peça por peça — o que conseguir fazer melhor ou mais barato. A substituição
   vira decisão natural da cliente, não imposição.

Vantagens: adesão rápida (sem ameaça), receita recorrente e crescente (cada fase
é contratável) e substituição como consequência do resultado.

Regra prática: **na fase de integração, priorizar conectar nas ferramentas com
API** — é o que torna a substituição futura possível sem dor. As sem API ficam
integradas "como der" e já entram como candidatas naturais à substituição (porque
prendem os dados).

## Princípios
- Só fontes públicas. Áreas logadas (portal GoldenCompany, painel ZapSign) ficam
  com a cliente.
- Sigilo profissional + LGPD: nenhum dado de cliente/processo entra no vault.
- 4 lentes por ferramenta: A) API/integração; B) sobreposição (manter/cortar/
  unificar); C) conteúdo p/ wiki; D) papel (substitui/conecta/avaliar).

## Diagnóstico — o "problema de CRM" é fragmentação do funil
A maior dor relatada é CRM, com TODAS as sub-dores presentes (dados espalhados,
confuso, não integra com WhatsApp, leads se perdem) e SEM sistema principal claro.
Causa real: o ciclo do lead até o cliente está partido em peças que não se falam,
não falta de um CRM.

> Marketing (Ferpin) gera o lead -> cai onde? -> Ravi (WhatsApp/funil) -> vira
> contrato -> Astrea (processos). Nada conecta de ponta a ponta.

Correção importante: Ferpin NÃO é um CRM — é uma agência de marketing/tráfego pago
(anúncios, criativos, sites, posts) que atende inclusive escritórios. É quem faz o
marketing da cliente hoje, não um software dela.

## Inventário (atualizado)

| Ferramenta | O que é | API? | Papel | Fase |
|---|---|---|---|---|
| RaviCRM | CRM relacionamento/atendimento: WhatsApp+IG+Messenger em funil, follow-up | A confirmar (provável) | Hub de front-office (leads/atendimento) — resolve a dor do WhatsApp | Integrar 1o |
| Astrea | Software jurídico/ERP: processos, prazos, tarefas | Sem API pública | Back-office; integrar "como der"; candidato a substituição | Integrar/avaliar |
| Ferpin | Agência de marketing/tráfego (NÃO é software dela) | — (serviço) | Origem dos leads; candidata a internalizar via orquestrador+conteúdo | Coexistir |
| Humanitech | Clone de voz + postagens jurídicas (em negociação) | — (serviço) | Sobrepõe nossa Fase 3 (avatar/voz): build vs buy | Avaliar |
| ZapSign | Assinatura eletrônica | Sim (API) | Conectar — dispara assinatura | Integrar |
| Jusbrasil | Monitoramento processual / jurisprudência | Tem integração | Conectar — consulta/monitoramento | Integrar |
| LegalMail | E-mail/intimações/publicações jurídicas? | A confirmar | Conectar/avaliar | Curatela |
| Adapta | Plataforma de agentes de IA | Sim | Sobrepõe nosso orquestrador — candidata a substituir | Avaliar |
| Freelaw | IA p/ produção de peças / peticionamento | A confirmar | Avaliar/conectar | Avaliar |
| GoldenCompany | Portal logado — a confirmar | — (logado) | Com a cliente | Curatela |
| Site + redes | Identidade, conteúdo, tom (FB/IG/TikTok/LinkedIn/YouTube) | publicação via API | Fonte da wiki + canais de saída | Integrar |

## Recomendação inicial do bloco de CRM (a confirmar APIs)
- RaviCRM = fonte da verdade do front-office (leads/atendimento): já resolve WhatsApp.
- Astrea = back-office (processos/prazos); sem API, é o ponto sensível.
- Orquestrador (Claude + n8n) = o trilho que liga marketing -> Ravi -> Astrea,
  pra nenhum lead se perder e o dado fluir.

## Decisões estratégicas a fechar
1. Adapta vs. nosso orquestrador — não pagar dois orquestradores.
2. Humanitech vs. nossa Fase 3 — build vs buy de clone/conteúdo.
3. Trilho do funil — RaviCRM (front) + Astrea (back) como definição oficial.

## Próximos passos da curatela
- Confirmar API do RaviCRM (decisivo para ser o hub orquestrável).
- Confirmar como o Astrea expõe dados hoje (webhooks? export?).
- Mapear ZapSign, Jusbrasil, LegalMail, Adapta, Freelaw (lente A — orquestrável?).
- Site + redes -> primeira carga da wiki (identidade, tom, FAQ).

## Pendências com a cliente
- Acesso/print dos portais logados (GoldenCompany, ZapSign), se necessário.
- Status e custo da negociação com a Humanitech.
- Confirmar contrato/escopo atual com a Ferpin (marketing).

## APIs confirmadas (caixas verdes — entram na 1a fase)
### ZapSign — assinatura eletrônica (CONECTA via API)
- API pública e documentada (docs.zapsign.com.br), REST/JSON, auth por token Bearer.
- Cria documento por URL de PDF, base64 OU Markdown (ótimo p/ gerar contrato com IA).
- Webhooks GRATUITOS para todos (criação, assinatura, recusa, conclusão) — sem plano de API.
- Pode enviar link de assinatura por WhatsApp (R$ 0,50/envio); integração nativa Zapier (logo, n8n).
- Uso no orquestrador: gerar contrato -> enviar p/ assinatura -> receber aviso de assinado -> seguir fluxo.

### Jusbrasil Soluções — processual (CONECTA via API)
- API pública documentada (api.jusbrasil.com.br/docs), REST/JSON.
- Consulta por CPF, CNPJ, nome ou CNJ; monitoramento diário de andamentos; cobertura nacional.
- Entrega documentos por peça (reduz custo de tokens em análise por IA).
- Não retorna processos em segredo de justiça (favorável ao sigilo). Contratação via comercial (por volume).
- Alternativa/fallback gratuito: API Pública do DataJud (CNJ) — capas e movimentações de todas as instâncias.
- Uso no orquestrador: consultar/monitorar processos e alimentar andamentos ao agente.
