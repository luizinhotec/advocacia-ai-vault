---
titulo: "Índice — Conteúdo Interno"
camada: interno
status: revisado
fontes: []
atualizado_em: "2026-05-30"
tags:
  - indice
  - moc
---

# Mapa de Conteúdo Interno (MOC)

Documentação do projeto de consultoria de IA. Este conteúdo **nunca** alimenta o agente de atendimento público.

---

## 1. Estratégia e escopo

| Nota | O que cobre | Status |
|------|-------------|--------|
| [[escopo-e-outputs]] | Os 3 entregáveis do projeto, canais, responsabilidades | semente |
| [[personas-e-canais]] | Para quem comunicamos em cada canal | semente |
| [[estrategia-editorial]] | Calendário, formatos, frequência de publicação | semente |
| [[decisoes-de-projeto]] | Registro de decisões técnicas e de produto | semente |

## 2. Arquitetura e operação da solução

| Nota | O que cobre | Status |
|------|-------------|--------|
| [[arquitetura-da-solucao]] | Stack técnica completa — agente, conteúdo, avatar, infra, custos | semente |
| [[fluxo-conversacional]] | Design da conversa do agente: abertura, intenções, escalada, fallback | semente |
| [[pipeline-conteudo]] | Geração, armazenamento, agendamento e publicação de posts e vídeos | semente |
| [[gestao-de-leads]] | Funil de novos clientes, CRM, follow-up, fontes de entrada | semente |
| [[dashboard-advogada]] | Métricas e visibilidade do negócio para a advogada | semente |

## 3. Identidade e produção de conteúdo

| Nota | O que cobre | Status |
|------|-------------|--------|
| [[identidade-visual]] | Paleta, tipografia, logo, estilo fotográfico | semente |
| [[identidade-do-avatar]] | Nome, aparência, personalidade, voz do avatar | semente |
| [[consentimento-voz-clonada]] | Autorização, escopo e limites legais da voz clonada | semente |
| [[roteiro-padrao-video]] | Estrutura obrigatória de todo vídeo gerado | semente |
| [[assets-de-midia]] | Onde vivem arquivos de vídeo/imagem (fora do Git) | semente |

## 4. Governança, aprovação e conformidade

| Nota | O que cobre | Status |
|------|-------------|--------|
| [[fluxo-de-aprovacao]] | Quem aprova o quê, por canal, antes de publicar | semente |
| [[checklist-publicacao]] | Lista de verificação pré-publicação (texto, vídeo, avatar) | semente |
| [[conformidade-lgpd-chatbot]] | LGPD aplicada ao chatbot — aviso de privacidade, DPA, retenção | semente |

---

## Regras desta camada

- Nunca expor ao agente de atendimento público.
- Nunca armazenar dados de clientes, números de processo ou peças jurídicas.
- Toda decisão relevante de projeto deve ser registrada em [[decisoes-de-projeto]].
