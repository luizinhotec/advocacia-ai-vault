---
titulo: "Fluxo de Aprovação de Conteúdo"
camada: interno
status: semente
fontes:
  - raw/interno/2026-06-03_respostas-questionario.md
atualizado_em: "2026-06-04"
tags:
  - aprovacao
  - governanca
  - publicacao
---

# Fluxo de Aprovação de Conteúdo

Define quem aprova o quê e em qual prazo, para cada tipo de conteúdo produzido.

> **Regra absoluta:** Nenhum conteúdo é publicado sem aprovação escrita do responsável do escritório.
> "Aprovação verbal" não conta.

---

## Responsáveis (preencher com nomes reais)

| Papel | Nome | Contato | Substituto |
|-------|------|---------|-----------|
| Responsável pelo escritório (sócio/gestor) | *(a preencher)* | *(a preencher)* | *(a preencher)* |
| Advogado revisor de conformidade OAB | *(a preencher)* | *(a preencher)* | *(a preencher)* |
| Responsável pela consultoria (nós) | *(a preencher)* | *(a preencher)* | *(a preencher)* |

---

## Fluxo por tipo de conteúdo

### Post de rede social (imagem + legenda)

```
Consultoria produz rascunho
        ↓
Consultoria faz self-review (checklist SCHEMA.md seção 3 + guardrails OAB)
        ↓
Envio ao escritório via *(canal a definir — ex: pasta GDrive / WhatsApp / email)*
        ↓
Escritório aprova ou solicita ajustes  ←── prazo: *(a definir — ex: 48h úteis)*
        ↓
Aprovação registrada por escrito (mensagem / e-mail / comentário na ferramenta)
        ↓
Publicação
```

**Quem pode aprovar posts:** *(a preencher)*
**O que bloqueia publicação:** qualquer violação dos guardrails OAB ou dado sensível

---

### Roteiro de vídeo com avatar

```
Consultoria redige roteiro (template [[roteiro-padrao-video]])
        ↓
Checklist do roteiro preenchido (ver nota de roteiro)
        ↓
Envio ao escritório para aprovação do roteiro
        ↓
Escritório aprova o roteiro  ←── prazo: *(a definir — ex: 48h úteis)*
        ↓
Produção do vídeo (geração com avatar)
        ↓
Envio do vídeo ao escritório para aprovação final
        ↓
Escritório aprova o vídeo  ←── prazo: *(a definir — ex: 48h úteis)*
        ↓
Publicação
```

**Quem pode aprovar roteiros:** *(a preencher)*
**Quem pode aprovar vídeos:** *(a preencher — titular da voz deve aprovar todo vídeo que usa sua voz)*

---

### Atualização do agente de atendimento (vault público)

```
Consultoria compila nova nota ou atualiza nota existente
        ↓
Lint executado (SCHEMA.md seção 3)
        ↓
Nota enviada para revisão do escritório
        ↓
Escritório aprova  ←── prazo: *(a definir)*
        ↓
Status da nota atualizado para `revisado`
        ↓
Próximo ciclo de atualização do agente inclui a nota
```

---

## Canais de envio para aprovação

*(a definir — ex: pasta compartilhada no Google Drive, comentários no Notion, resposta por e-mail)*

**Canal principal:** *(a preencher)*
**Canal de urgência:** *(a preencher)*

---

## O que fazer se não houver resposta no prazo

1. Consultoria envia lembrete pelo canal de urgência.
2. Aguarda mais *(a definir — ex: 24h)*.
3. Se não houver resposta, a publicação é adiada — nunca publicar sem aprovação.
4. Registrar o ocorrido em [[decisoes-de-projeto]] se gerar impacto no calendário.

---

## Registro de aprovações

Toda aprovação deve ser registrada na planilha de controle de assets — ver [[assets-de-midia]].
Campos mínimos: data, tipo de conteúdo, título/descrição, aprovado por, canal de aprovação.

---

## Notas relacionadas

- [[checklist-publicacao]]
- [[roteiro-padrao-video]]
- [[estrategia-editorial]]
- [[assets-de-midia]]
- [[escopo-e-outputs]]
