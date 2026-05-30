---
titulo: "Protocolo de Gravação de Reunião"
tipo: documento-de-projeto
status: pronto-para-uso
atualizado_em: "2026-05-30"
tags:
  - reuniao
  - gravacao
  - lgpd
  - protocolo
---

# Protocolo de Gravação de Reunião

Este protocolo deve ser seguido em **toda** reunião gravada do projeto.
Gravações contêm voz humana e podem conter dados pessoais — são tratadas como dados sensíveis (LGPD).

---

## Antes da reunião

### 1. Consentimento de gravação (obrigatório)

A gravação só pode iniciar **após** consentimento verbal explícito da advogada, registrado na própria gravação.

**Frase de abertura obrigatória** (ler em voz alta antes de iniciar a gravação):

> *"Antes de começarmos, quero confirmar que esta reunião será gravada para fins de documentação
> do projeto — a transcrição vai alimentar nossa base de conhecimento interna.
> A gravação não será compartilhada com terceiros e será armazenada de forma segura.
> Você concorda com a gravação?"*

Aguardar resposta verbal afirmativa. Só então iniciar a gravação.

### 2. Preparação técnica

- [ ] Testar o equipamento de gravação antes da reunião (microfone, app, conexão se for online)
- [ ] Garantir bateria/energia suficiente para a duração total
- [ ] Ter o [[questionario-reuniao-inicial]] aberto e pronto
- [ ] Ter papel e caneta para anotações rápidas (não depender só da gravação)
- [ ] Se for online: testar gravação no próprio software (Zoom, Meet, Teams têm gravação nativa)

### 3. Ferramentas recomendadas de gravação

| Situação | Ferramenta sugerida |
|----------|---------------------|
| Reunião online | Gravação nativa do Zoom/Meet/Teams |
| Presencial (smartphone) | Gravador nativo do iOS/Android |
| Presencial (computador) | Audacity (gratuito) / OBS / Whisper App |
| Transcrição automática | Whisper (OpenAI) / Otter.ai / Fireflies.ai |

---

## Durante a reunião

- Anunciar quando a gravação iniciar: *"Estou iniciando a gravação agora."*
- Seguir o [[questionario-reuniao-inicial]] como roteiro.
- **Não interromper** a advogada para anotar — a gravação captura tudo.
- Se ela mencionar nome de cliente, número de processo ou dado sensível:
  → Agradecer a informação e gentilmente lembrar que esse detalhe não entrará no vault.
- Ao final: *"Vou encerrar a gravação agora. Obrigado!"* — registrar o encerramento na gravação.

---

## Após a reunião

### Passo 1 — Salvar a gravação (até 2h após a reunião)

- Renomear o arquivo: `YYYY-MM-DD_reuniao-inicial-advogada.[mp3/mp4/m4a]`
- Salvar na pasta segura de documentos legais do projeto *(ver [[assets-de-midia]] — pasta `04_documentos-legais/`)*
- **Não enviar por WhatsApp ou e-mail sem criptografia**
- **Não armazenar no Git**

### Passo 2 — Transcrição (em até 24h)

Gerar transcrição automática com a ferramenta escolhida. Revisar e corrigir erros críticos manualmente.

**Formato do arquivo de transcrição:**

```markdown
# Transcrição — Reunião Inicial — YYYY-MM-DD

**Participantes:** [Nome do entrevistador], [Nome/iniciais da advogada]
**Duração:** __min
**Ferramenta de transcrição:** [nome]
**Revisado por:** [nome] em YYYY-MM-DD

---

[transcrição aqui]
```

### Passo 3 — Sanitização da transcrição (obrigatório antes de depositar no vault)

Antes de salvar em `raw/interno/`, revisar a transcrição e:

- [ ] Remover nomes de clientes mencionados acidentalmente → substituir por `[CLIENTE]`
- [ ] Remover números de processo → substituir por `[Nº PROCESSO]`
- [ ] Remover valores de honorários específicos de casos → substituir por `[VALOR]`
- [ ] Remover dados de terceiros (CPF, telefone, e-mail de não-participantes)
- [ ] Manter: nomes dos participantes da reunião, dados do escritório, conteúdo de briefing

### Passo 4 — Depositar no vault

Salvar a transcrição sanitizada em:
```
raw/interno/YYYY-MM-DD_reuniao-inicial.md
```

Criar nota de ingestão em `wiki/interno/` se necessário, ou referenciar a partir de [[decisoes-de-projeto]].

### Passo 5 — Processar o questionário

Com a transcrição em mãos, preencher as notas-semente do vault:

| Bloco do questionário | Nota a preencher |
|-----------------------|-----------------|
| Bloco 1 — O Escritório | `wiki/publico/institucional.md` |
| Bloco 2 — Áreas de Atuação | `wiki/publico/areas-de-atuacao.md` |
| Bloco 3 — Público-alvo | `wiki/interno/personas-e-canais.md` |
| Bloco 3 — Canais | `wiki/interno/estrategia-editorial.md` |
| Bloco 4 — Fluxo | `wiki/publico/fluxo-de-atendimento.md` |
| Bloco 5 — Logística | `wiki/publico/logistica.md` |
| Bloco 6 — FAQ | `wiki/publico/faq.md` |
| Bloco 7 — Avatar/Voz | `wiki/interno/identidade-do-avatar.md` + `wiki/interno/consentimento-voz-clonada.md` |
| Bloco 8 — Visual | `wiki/interno/identidade-visual.md` |
| Bloco 9 — Aprovação | `wiki/interno/fluxo-de-aprovacao.md` |

### Passo 6 — Enviar resumo à advogada (em até 48h)

Redigir um resumo em linguagem simples com:
- Principais decisões tomadas
- Próximos passos (quem faz o quê, com prazo)
- Lista de itens pendentes que ela precisa fornecer

Enviar pelo canal combinado (e-mail ou WhatsApp).

---

## Retenção e descarte

| Arquivo | Retenção | Descarte |
|---------|----------|---------|
| Gravação de áudio/vídeo original | *(a definir — ex: 6 meses após fim do projeto)* | Deletar com confirmação |
| Transcrição bruta (não sanitizada) | *(a definir — ex: 30 dias)* | Deletar após sanitização e validação |
| Transcrição sanitizada no vault | Indefinido — histórico do projeto | Arquivar com `status: arquivado` |

---

## Notas relacionadas

- [[questionario-reuniao-inicial]]
- [[assets-de-midia]]
- [[consentimento-voz-clonada]]
- [[decisoes-de-projeto]]
