---
titulo: "Escopo do Projeto e Outputs Entregáveis"
camada: interno
status: semente
fontes: []
atualizado_em: "2026-05-30"
tags:
  - escopo
  - outputs
  - entregas
---

# Escopo do Projeto e Outputs Entregáveis

Esta nota é o **mapa central do que vamos entregar**. Toda decisão de conteúdo, tecnologia ou produção deve ser confrontada com este documento.

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

**Tecnologia:** *(a definir — HeyGen / D-ID / ElevenLabs + ferramenta de avatar / outro)*

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
| Publicar nas redes sociais | *(a definir)* | *(a definir)* |
| Manutenção do vault | A (apoia) | **R** (responsável) |
| Treinamento do agente de atendimento | A (apoia) | **R** (responsável) |

*(R = Responsável, A = Apoia — preencher com nomes reais)*

---

## O que está fora do escopo

- Gestão de casos jurídicos ou documentos processuais
- CRM ou sistema de agenda próprio *(integração pode ser avaliada separadamente)*
- Suporte técnico ao cliente final
- Produção de conteúdo pago (tráfego pago / mídia)

---

## Notas relacionadas

- [[personas-e-canais]]
- [[estrategia-editorial]]
- [[fluxo-de-aprovacao]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
