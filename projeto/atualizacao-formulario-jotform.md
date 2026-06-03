---
titulo: "Atualização do Formulário de Descoberta (Jotform)"
tipo: documento-de-projeto
status: pronto-para-aplicar
atualizado_em: "2026-06-03"
tags:
  - jotform
  - descoberta
  - formulario
  - reuniao
---

# Atualização do Formulário de Descoberta (Jotform)

> **Para quem aprova a PR (gestor do projeto):** este documento é a **especificação das
> mudanças a aplicar no Jotform**. O Claude com acesso à conta Jotform deve executar as
> alterações abaixo. O autor desta PR (LimaDevBTC) **não tem acesso de edição** ao form
> (ele pertence a outra conta), por isso a mudança vem como spec, não como edição direta.

- **Form:** Questionário de Descoberta
- **Form ID:** `261524820131042`
- **Link de submissão:** https://submit.jotform.com/261524820131042
- **Motivo da atualização:** o áudio de primeiro contato e o anúncio da vaga revelaram que o
  escritório **não é greenfield** — já roda IAs e já tem skills prontas — e que o pedido
  central é **implantação Claude + treinamento**, incluindo possível automação jurídica
  interna. O formulário atual não captura nada disso. Fontes:
  [[2026-05-30_audio-primeiro-contato]], [[2026-05-30_anuncio-vaga-consultor-ia]].

---

## A. Nova seção a ADICIONAR — "Estado atual de IA no escritório"

Inserir **logo após a seção "O escritório"** (é pré-requisito de tudo). Estes são os 3 pontos
cegos mais críticos da reunião.

### A.1 — Inventário de IAs já em uso
- **Pergunta:** "Quais ferramentas de IA ou agentes você já usa no escritório hoje?"
- **Tipo:** texto longo (aberto)
- **Texto de ajuda:** "Liste ferramenta, para que serve e há quanto tempo usa. Ex.: ChatGPT para rascunhos, algum agente de atendimento, etc."

### A.2 — Skills / automações já prontas
- **Pergunta:** "Você já tem skills, prompts ou automações prontas? Pode compartilhá-las?"
- **Tipo:** múltipla escolha (single) + campo de detalhe
- **Opções:** "Sim, tenho e posso enviar os arquivos" / "Sim, mas preciso localizar" / "Não tenho" / "Não sei dizer"
- **Texto de ajuda:** "Se sim, traga/anexe os arquivos na reunião — eles definem boa parte da implantação."

### A.3 — Modelo de agentes desejado
- **Pergunta:** "Quais agentes/IAs você quer ter funcionando? Marque os prioritários."
- **Tipo:** múltipla escolha (multi)
- **Opções:** "Atendimento/triagem de clientes" / "Marketing e redes sociais" / "Protocolo nos tribunais" / "Peticionamento" / "Pesquisa jurídica" / "Gestão de prazos" / "Financeiro/cobrança" / "Outro"
- **Texto de ajuda:** "A cliente citou querer espelhar agentes vistos em um curso: marketing, atendimento, protocolo e peticionamento."

### A.4 — Stack e ferramentas de IA preferidas
- **Pergunta:** "Há preferência de ferramenta/plataforma de IA?"
- **Tipo:** múltipla escolha (single) + detalhe
- **Opções:** "Claude" / "ChatGPT" / "Sem preferência" / "Outro"
- **Valor já conhecido (pré-confirmar na reunião):** a cliente declarou preferir **Claude, todas as versões, com skills e extensões.**

---

## B. Campo a EXPANDIR — "Infraestrutura de TI"

O campo atual é texto aberto e raso. Substituir/complementar com sub-perguntas (ou um texto de
ajuda detalhado), pois orienta a implantação presencial do Claude:

- Sistemas operacionais e nº de máquinas da equipe (Windows / Mac)
- Contas Claude já existentes (plano atual, quem tem acesso)
- Quem é o ponto focal de TI no escritório (ou se não há)
- Qual CRM / software jurídico está em uso (cruzar com o campo já existente: Astrea, Projuris,
  ADVBox, Legal One, Espaider…)
- Como o WhatsApp é operado hoje e por quem

---

## C. Seção a ENRIQUECER — "Conformidade e dados"

O áudio levanta automação jurídica (peticionamento/protocolo), que toca **sigilo e LGPD**.
Garantir que a seção "Conformidade e dados" capture:

- "Você toparia automatizar tarefas que envolvem dados de processos/clientes?" (Sim / Não / Depende)
- "Como os dados sensíveis são armazenados hoje?" (aberto)
- Texto de ajuda referindo que dados sob sigilo (art. 34, VII, EOAB) exigem governança específica.

> Esta frente está **em avaliação** no vault — ver [[escopo-e-outputs]] e [[decisoes-de-projeto]].
> O formulário só **coleta**; a decisão de incluir peticionamento/protocolo é da reunião.

---

## D. Campos que JÁ temos resposta (pré-preencher / só confirmar)

Para não perguntar do zero o que o áudio já respondeu:

| Campo do form | Valor provável (confirmar) |
|---|---|
| Interesse em avatar/clone de voz | **Sim** |
| Disponibilidade para treinamento e visitas | **Alta** (visitas periódicas presenciais) |
| Prazo e urgência | **O quanto antes** (fez curso de imersão recentemente) |
| Quem decide / aprova | **A própria advogada** (confirmar se há mais alguém) |

---

## E. Sincronização com o vault

Ao aplicar as mudanças no Jotform, as mesmas perguntas novas devem refletir no instrumento de
entrevista do vault: [[questionario-reuniao-inicial]] (ver BLOCO 11, adicionado nesta PR).
Manter os dois alinhados evita divergência entre o form online e o roteiro de reunião.

## Notas relacionadas

- [[questionario-reuniao-inicial]]
- [[escopo-e-outputs]]
- [[decisoes-de-projeto]]
- [[2026-05-30_audio-primeiro-contato]]
- [[2026-05-30_anuncio-vaga-consultor-ia]]
