---
titulo: "Escopo do Projeto e Outputs Entregáveis"
camada: interno
status: rascunho
fontes:
  - raw/interno/2026-05-30_anuncio-vaga-consultor-ia.md
  - raw/interno/2026-05-30_audio-primeiro-contato.md
atualizado_em: "2026-06-03"
tags:
  - escopo
  - outputs
  - entregas
---

# Escopo do Projeto e Outputs Entregáveis

Esta nota é o **mapa central do que vamos entregar**. Toda decisão de conteúdo, tecnologia ou produção deve ser confrontada com este documento.

---

## Contexto ampliado — atualização 2026-06-03

> O escopo abaixo nasceu modelado como **consultoria de conteúdo/marketing** (3 outputs).
> O anúncio da vaga e o áudio de primeiro contato da advogada revelaram um pedido **mais
> amplo**, cujo centro de gravidade é **implantação de produtividade com IA + capacitação
> presencial da equipe** — e não a produção de conteúdo isolada.
> Fontes: [[2026-05-30_anuncio-vaga-consultor-ia]], [[2026-05-30_audio-primeiro-contato]].

O que mudou no entendimento:

1. **Eixo transversal novo:** implantar e configurar IA **no escritório, presencialmente**, e
   **treinar a equipe** a operar — ver eixo abaixo. A cliente foi explícita: *"não quero
   aprender a fazer, quero que alguém implante e oriente."*
2. **Stack definida pela cliente:** ecossistema **Claude** (todas as versões) + **skills** +
   **extensões**. Ela **já tem skills prontas** e **já roda algumas IAs** no escritório
   (não é greenfield). Registrado como decisão a validar em [[decisoes-de-projeto]].
3. **Frente de automação interna** (jurídica + administrativa) entrou em pauta — ver seção
   "Frente em avaliação" abaixo. Há tensão com o que hoje está "fora de escopo".
4. **Relação continuada:** atendimento presencial na Região Serrana/RJ com **visitas
   periódicas**, não um projeto pontual.

---

## Eixo transversal — Implantação Claude + Capacitação

**O que é:** instalar, configurar e operacionalizar o ecossistema Claude no escritório, e
treinar a equipe para usar no dia a dia. É o pedido central da cliente e atravessa os 3 outputs.

**Inclui:**
- Implantação do Claude (Desktop / Code / .ai) nas máquinas e contas do escritório
- Configuração de **skills** (inventariar as que a cliente já tem) e **extensões/MCP**
- **Treinamento presencial** da equipe: como fazer pedidos corretos, prompt, skill
- Orientação estratégica recorrente sobre o que aplicar e como

**Pré-requisito de descoberta:** inventário do estado atual (IAs/skills já existentes,
sistemas em uso — CRM, WhatsApp, máquinas, SO). Coletado na reunião inicial / formulário de
descoberta — ver `projeto/atualizacao-formulario-jotform.md`.

**Status:** a validar tecnicamente — ver [[decisoes-de-projeto]].

---

## Frente em avaliação — Automação interna (jurídica + administrativa)

A cliente citou querer espelhar agentes que viu em um curso: **marketing, atendimento,
protocolo nos tribunais e peticionamento**. O anúncio reforça *"automação de tarefas
administrativas e jurídicas"* e *"integração com WhatsApp, CRM e demais ferramentas"*.

> **Decisão (2026-06-04):** automação de intimações e peticionamento **entra no escopo**
> via LegalMail + n8n. Ferramenta: LegalMail (plano VIP ~R$997/mês).
> Dados processuais transitam apenas no orquestrador e no LegalMail — **nunca** neste vault.
> Governança de dados a definir antes do lançamento — ver [[conformidade-lgpd-chatbot]]
> e [[decisoes-de-projeto]].

---

## Os 3 outputs do projeto

### Output 1 — Agente de Atendimento (texto)

**O que é:** Agente conversacional que responde dúvidas institucionais e de fluxo via chat (WhatsApp e/ou site).

**Canal(is):** *(a definir — WhatsApp Business API / widget no site / ambos)*

**Fonte de conhecimento:** `wiki/publico/` — apenas notas com `status: revisado`

**O que faz:**
- Responde perguntas sobre o escritório, áreas de atuação, fluxo de atendimento e logística
- Agenda ou direciona para agendamento de consulta
- **Nunca** oferece orientação jurídica concreta
- **Nunca** acessa `wiki/interno/` ou `raw/`

**O que NÃO faz:**
- Não dá pareceres, não analisa documentos, não cita jurisprudência como conselho

**Conformidade:** Guardrails OAB (texto) — ver `SCHEMA.md` seção 4

**Status de desenvolvimento:** *(a preencher — backlog / em construção / em produção)*

---

### Output 2 — Conteúdo para Redes Sociais (imagem + legenda)

**O que é:** Posts, carrosséis, stories e artes gráficas para Instagram e LinkedIn do escritório.

**Canais:** *(a confirmar — Instagram / LinkedIn / outros)*

**Formatos:** *(a definir — carrossel educativo / post único / story / Reels com avatar)*

**Frequência:** *(a definir — ex: 3x/semana)*

**Responsável pela aprovação:** *(a preencher — ver [[fluxo-de-aprovacao]])*

**Tipo de conteúdo permitido:**
- Informativo sobre áreas do direito (sem orientação concreta)
- Institucional (datas comemorativas, trajetória do escritório)
- Educativo ("você sabia que…", "entenda seus direitos em…")
- Bastidores e humanização *(com aprovação do advogado)*

**Tipo de conteúdo proibido:**
- Caso de cliente, mesmo sem identificação, sem autorização expressa e escrita
- Promessas de resultado
- Comparação com outros escritórios
- Honorários como atrativo

**Conformidade:** Guardrails OAB (audiovisual) — ver `SCHEMA.md` seção 4B

**Identidade visual:** ver [[identidade-visual]]

---

### Output 3 — Avatar com Voz Clonada (vídeo)

**O que é:** Vídeos com avatar realista usando voz clonada do(a) advogado(a) para publicação em redes sociais, site e/ou WhatsApp.

**Usos permitidos:**
- Apresentação institucional do escritório
- Explicações gerais sobre áreas do direito (tom educativo)
- Boas-vindas no agente de atendimento (vídeo de entrada)
- Conteúdo de autoridade (formato "você sabia que…")

**Usos proibidos:**
- O avatar nunca deve parecer dar orientação jurídica personalizada
- Nunca usar o avatar para simular uma consulta ou triagem
- Nunca publicar sem aprovação do(a) titular da voz

**Tecnologia:** HeyGen (avatar em vídeo) + ElevenLabs (clonagem de voz + TTS). Decisão registrada em [[decisoes-de-projeto]].

**Autorização:** obrigatória — ver [[consentimento-voz-clonada]]

**Estrutura de roteiro:** obrigatória — ver [[roteiro-padrao-video]]

**Conformidade:** Guardrails OAB (audiovisual) — ver `SCHEMA.md` seção 4B

---

## Matriz de responsabilidades (RACI resumido)

| Atividade | Escritório (cliente) | Consultoria (nós) |
|-----------|---------------------|-------------------|
| Fornecer briefing e conteúdo bruto | **R** (responsável) | A (apoia) |
| Compilar vault e criar roteiros | A (apoia) | **R** (responsável) |
| Aprovar conteúdo antes de publicar | **R** (responsável) | — |
| Publicar nas redes sociais | — | **R** (responsável) |
| Manutenção do vault | A (apoia) | **R** (responsável) |
| Treinamento do agente de atendimento | A (apoia) | **R** (responsável) |

*(R = Responsável, A = Apoia — preencher com nomes reais)*

---

## O que está fora do escopo

- Gestão de casos jurídicos ou documentos processuais — **em revisão:** a cliente pediu
  automação de peticionamento/protocolo; ver "Frente em avaliação" acima e [[decisoes-de-projeto]]
- CRM ou sistema de agenda próprio *(integração pode ser avaliada separadamente — a cliente
  pediu integração com o CRM existente)*
- Suporte técnico ao cliente final
- Produção de conteúdo pago (tráfego pago / mídia)

---

## Notas relacionadas

- [[personas-e-canais]]
- [[estrategia-editorial]]
- [[fluxo-de-aprovacao]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
