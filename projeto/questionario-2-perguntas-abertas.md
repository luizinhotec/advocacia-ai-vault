# Questionário 2 — Perguntas em Aberto

Documento de trabalho interno. Toda vez que o desenvolvimento esbarra em uma informação
que só a cliente pode fornecer, a pergunta é registrada aqui em vez de travar o andamento.

Ao final de um ciclo de trabalho, este documento vira o roteiro do segundo questionário
formal (ou pauta de reunião).

---

## Como usar

- **Consultoria:** ao encontrar uma dúvida que depende da cliente, adicionar na seção
  temática correspondente. Formato: pergunta clara + contexto de por que precisamos saber.
- **Reunião:** varrer este documento e marcar cada item como `[✅ respondido]` ou
  `[➡️ próxima reunião]`.

---

## Bloco 1 — Agente de Atendimento (Output 1)

### 1.1 Mecanismo de CTA (conversão)

**Pergunta:** Quando um lead está qualificado e pronto para agendar, o que acontece?

- (a) Enviamos um link de calendário para ele escolher o horário sozinho?
- (b) O bot transfere a conversa para o número da advogada/secretária?
- (c) O bot coleta nome e horário preferido e a equipe entra em contato?

**Por que precisamos:** define a última etapa do agente e toda a integração n8n.
Sem isso o system prompt não pode ser finalizado.

---

### 1.2 Status da conta WhatsApp Business

**Pergunta:** O número de WhatsApp do escritório já é uma conta Business verificada pela Meta?

- Tem acesso ao Meta for Developers?
- Já usou alguma API de WhatsApp antes (Twilio, 360dialog, outro)?
- Qual é o número exato que será usado no agente?

**Por que precisamos:** a verificação de negócio pela Meta pode levar semanas. Quanto
antes soubermos o status, antes iniciamos o processo.

---

### 1.3 Horário de funcionamento do agente

**Pergunta:** O agente responde 24 horas por dia ou apenas em horário comercial?

- Se fora do horário: o agente avisa e pede para retornar depois, ou coleta o contato
  e a equipe responde no próximo dia útil?

**Por que precisamos:** define o comportamento de fallback e o fluxo noturno no n8n.

---

### 1.4 Canal de escalada para humano

**Pergunta:** Quando o agente identifica que precisa transferir para uma pessoa, para
qual número vai?

- Número pessoal da Dra. Hyvana?
- Número de uma secretária/assistente?
- Um grupo do WhatsApp interno?

**Por que precisamos:** é o endereço que o n8n usa para o nó de transferência.

---

### 1.5 Retenção de histórico de conversa

**Pergunta:** As conversas dos leads ficam salvas no sistema?

- Se sim: por quanto tempo? (LGPD exige que o prazo seja definido pelo escritório
  como controlador de dados)
- Se não: como fazemos follow-up ou análise de qualidade?

**Por que precisamos:** decisão que só a advogada pode tomar como controladora de dados
(LGPD art. 37). Impacta o aviso de privacidade do chatbot.

---

### 1.6 Inventário das skills Claude existentes

**Pergunta:** A cliente mencionou que já tem skills prontas no Claude. Podemos ter acesso
para revisar antes de construir do zero?

**Por que precisamos:** evitar retrabalho. Se ela já tem skills funcionando para advocacia,
podemos adaptar em vez de criar.

---

## Bloco 2 — Infraestrutura e contas

### 2.1 Conta Claude paga

**Pergunta:** A cliente já tem conta Claude paga (Pro ou Team)?

- Se Team: quantos usuários?
- Se não: precisamos provisionar antes da implantação.

**Por que precisamos:** sem conta Claude ativa não há agente. É pré-requisito de tudo.

---

### 2.2 Confirmação do volume de processos ativos (LegalMail)

**Pergunta:** Quantos processos ativos o escritório acompanha hoje?

- O plano LegalMail VIP cobre 2.000 processos por R$997/mês. Se o volume for menor,
  pode haver plano mais barato.

**Por que precisamos:** definir o plano correto antes de contratar.

---

## Bloco 3 — Conteúdo e marca (Outputs 2 e 3)

### 3.1 Arquivos de marca

**Pergunta:** Pode enviar o logo do escritório (SVG ou PNG fundo transparente) e o
manual de identidade visual (se existir)?

**Por que precisamos:** sem logo não há produção de posts nem vídeos.

---

### 3.2 Referências de comunicação

**Pergunta:** Tem perfis ou canais de advocacia que admira — no estilo de comunicação,
não necessariamente na área?

**Por que precisamos:** calibrar o tom dos posts e roteiros antes de produzir.

---

### 3.3 Frequência de publicação nas redes

**Pergunta:** Quantos posts por semana a cliente consegue revisar e aprovar (SLA de 48h)?

**Por que precisamos:** o calendário editorial depende do SLA de aprovação dela.

---

## Bloco 4 — Governança e jurídico

### 4.1 Responsáveis no fluxo de aprovação

**Pergunta:** Quem aprova cada tipo de conteúdo?

- Posts de redes sociais: ___
- Roteiros de vídeo: ___
- Atualizações do agente (vault público): ___
- Substituto quando a Dra. Hyvana não está disponível: ___

**Por que precisamos:** sem responsável nomeado, nenhum conteúdo pode ser publicado
conforme o [[fluxo-de-aprovacao]].

---

### 4.2 Consentimento de voz — formalização

**Pergunta:** O termo escrito de consentimento para clonagem de voz foi assinado?

- Se não: precisamos assinar antes de qualquer produção com o avatar.

**Por que precisamos:** requisito legal e pré-requisito do Output 3.

---

### 4.3 Ano de fundação do escritório

**Pergunta:** Em que ano o Ribeiro Abreu Advogados foi fundado?

**Contexto:** o site menciona "mais de 17 anos de existência" e o questionário menciona
"18 anos de carreira da advogada". São informações distintas — precisamos do ano real
de abertura do escritório para evitar inconsistência no conteúdo público.

---

## Registro de respostas

| # | Pergunta | Respondido? | Data | Canal |
|---|----------|-------------|------|-------|
| 1.1 | Mecanismo de CTA | ⏳ pendente | — | — |
| 1.2 | Status WhatsApp Business | ⏳ pendente | — | — |
| 1.3 | Horário do agente | ⏳ pendente | — | — |
| 1.4 | Canal de escalada | ⏳ pendente | — | — |
| 1.5 | Retenção de histórico | ⏳ pendente | — | — |
| 1.6 | Skills Claude existentes | ⏳ pendente | — | — |
| 2.1 | Conta Claude paga | ⏳ pendente | — | — |
| 2.2 | Volume de processos (LegalMail) | ⏳ pendente | — | — |
| 3.1 | Arquivos de marca | ⏳ pendente | — | — |
| 3.2 | Referências de comunicação | ⏳ pendente | — | — |
| 3.3 | Frequência de publicação | ⏳ pendente | — | — |
| 4.1 | Responsáveis no fluxo de aprovação | ⏳ pendente | — | — |
| 4.2 | Consentimento de voz assinado | ⏳ pendente | — | — |
| 4.3 | Ano de fundação | ⏳ pendente | — | — |
