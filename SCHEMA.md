# SCHEMA.md — Configuração do Bibliotecário LLM

Este arquivo é a **fonte de verdade** sobre como o agente LLM deve compilar, manter e auditar o vault. Leia antes de qualquer operação de escrita.

---

## 1. Frontmatter YAML obrigatório

Toda nota na `wiki/` deve começar com o bloco frontmatter abaixo. Campos com `?` são opcionais.

```yaml
---
titulo: "Título legível da nota"          # string, obrigatório
camada: publico | interno                  # obrigatório
status: semente | rascunho | revisado | arquivado
fontes:                                    # lista de caminhos raw/ que originaram esta nota
  - raw/publico/exemplo.md
atualizado_em: "YYYY-MM-DD"               # data ISO, obrigatório
tags:                                      # lista livre, kebab-case
  - institucional
  - faq
---
```

**Regras de status:**

| Status | Significado |
|--------|-------------|
| `semente` | Estrutura criada, conteúdo a preencher |
| `rascunho` | Conteúdo parcial, ainda não revisado por humano |
| `revisado` | Aprovado por pelo menos um humano do escritório |
| `arquivado` | Conteúdo obsoleto, mantido apenas por histórico |

Notas com status `semente` ou `rascunho` **não devem** alimentar o agente de atendimento.

---

## 2. Convenções de compile (raw → wiki)

Ao transformar um documento raw em nota wiki:

1. **Um assunto por nota.** Se o raw cobre múltiplos assuntos, crie múltiplas notas e link entre elas.
2. **Registre a fonte.** Todo fato afirmado na wiki deve ter a fonte listada no frontmatter (`fontes:`) ou citada inline como `(fonte: [[nome-do-raw]])`.
3. **Crie backlinks.** Sempre que mencionar um conceito que possui ou merece nota própria, use `[[nome-da-nota]]`.
4. **Não parafraseie orientação jurídica.** Extraia apenas fatos institucionais, fluxos de atendimento e informações públicas do escritório. Conteúdo jurídico concreto fica no raw, não na wiki pública.
5. **Camada correta.** Conteúdo extraído de raw/interno vai para wiki/interno. Nunca o contrário.
6. **Kebab-case.** Nomes de arquivo sempre em kebab-case (ex: `areas-de-atuacao.md`).

---

## 3. Checklist de lint

Execute antes de qualquer writeback. Sinalize cada item encontrado como comentário `<!-- LINT: descrição -->` na nota afetada.

### 3.1 Integridade factual
- [ ] Toda afirmação sobre o escritório tem fonte referenciada?
- [ ] Há contradições entre notas? (ex: horários divergentes)
- [ ] Datas e números estão consistentes com o raw?

### 3.2 Estrutura
- [ ] Frontmatter YAML válido e com todos os campos obrigatórios?
- [ ] Links internos `[[...]]` apontam para arquivos que existem?
- [ ] Há notas órfãs (sem nenhum backlink apontando para elas)?
- [ ] O `_index.md` da camada lista todas as notas da pasta?

### 3.3 Segurança e conformidade
- [ ] **Vazamento de camada:** nota pública menciona conteúdo interno?
- [ ] **Dados sensíveis:** CPF, telefone, e-mail, número de processo, nome de cliente?
- [ ] **Sigilo:** conteúdo coberto por sigilo profissional (art. 34, VII, EOAB) na wiki?
- [ ] **Guardrails OAB** (ver seção 4): alguma violação?

### 3.4 LGPD
- [ ] Nenhum dado pessoal identificável (art. 5º, I, LGPD) nas notas?
- [ ] Dados de colaboradores internos estão apenas em wiki/interno e com necessidade justificada?

---

## 4. Guardrails OAB — Conformidade Obrigatória

Todo conteúdo na camada `publico/` deve respeitar as normas do Código de Ética e Disciplina da OAB e o Provimento 205/2021 (publicidade). Regras inegociáveis:

| ❌ Proibido | ✅ Permitido |
|------------|-------------|
| Prometer resultados ("garantimos que…", "você vai ganhar") | Descrever áreas de atuação e experiência do escritório |
| Escrever orientação jurídica concreta como resposta pronta | Orientar o cliente a buscar uma consulta |
| Usar honorários ou descontos como atrativo ("primeira consulta grátis") | Informar que honorários são discutidos em consulta |
| Comparar com outros escritórios ou advogados | Apresentar o perfil e a trajetória do escritório |
| Usar linguagem sensacionalista ou de autopromoção excessiva | Usar tom sóbrio, informativo e profissional |
| Mencionar clientes ou casos sem autorização expressa e por escrito | Mencionar áreas trabalhadas em caráter geral |

**Ao compilar qualquer nota pública, o agente deve checar cada linha contra esta tabela.**

Se houver dúvida, o conteúdo vai para `wiki/interno/` ou `raw/` e aguarda revisão humana.

---

## 4B. Guardrails OAB — Conteúdo Audiovisual (vídeo, imagem, avatar)

As mesmas regras do Provimento 205/2021 se aplicam a **todo** conteúdo audiovisual.
Checklist específico para vídeos e posts visuais:

| ❌ Proibido | ✅ Permitido |
|------------|-------------|
| Avatar ou locutor afirmar "no seu caso você deve..." | Explicar conceitos gerais ("a lei prevê que em situações assim...") |
| Thumbnail com promessa de resultado ("Ganhe sua causa!") | Thumbnail informativa ("Entenda seus direitos em caso de X") |
| Legenda com honorário como atrativo | Legenda com CTA para consulta |
| Vídeo que simule uma consulta jurídica | Vídeo educativo com redirecionamento para consulta |
| Avatar se apresentar como humano (advogado real) | Avatar identificado como IA em toda aparição |
| Usar voz clonada sem consentimento registrado | Usar voz clonada com [[consentimento-voz-clonada]] assinado |
| Publicar vídeo sem aprovação do titular da voz | Publicar apenas após aprovação — ver [[fluxo-de-aprovacao]] |
| Depoimento de cliente sem autorização escrita | Conteúdo institucional geral |

**Checklist audiovisual adicional ao lint:**
- [ ] O avatar é identificado como IA no vídeo?
- [ ] A legenda do post tem alguma orientação jurídica concreta?
- [ ] A thumbnail usa linguagem sensacionalista?
- [ ] O [[consentimento-voz-clonada]] está assinado e o uso está dentro do escopo autorizado?
- [ ] O roteiro seguiu o template [[roteiro-padrao-video]]?
- [ ] A aprovação foi registrada conforme [[fluxo-de-aprovacao]]?

---

## 5. Notas sobre o agente de atendimento (futuro)

Quando o agente de atendimento for implementado, ele deverá:
- Ler apenas notas `wiki/publico/` com `status: revisado`.
- Nunca improvisar orientação jurídica; sempre redirecionar para agendamento de consulta.
- Nunca acessar `wiki/interno/` ou qualquer pasta `raw/`.

Este SCHEMA será expandido com as instruções de system prompt do agente quando a fase de desenvolvimento começar.
