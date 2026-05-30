# raw/interno/ — Documentos-Fonte Internos

Esta pasta recebe os **documentos brutos internos** que darão origem ao conteúdo da `wiki/interno/`.

## O que entra aqui

- Atas e transcrições de reuniões internas de projeto
- Decisões de arquitetura, escolhas tecnológicas e suas justificativas
- Documentação de processos internos do escritório (gestão, operacional)
- Feedback de advogados e colaboradores sobre o projeto de IA
- Rascunhos de scripts, personas e system prompts do agente *(antes de finalizar)*
- Logs de problemas encontrados e soluções adotadas

## O que NÃO entra aqui

Mesmo sendo interno, este repositório **não é sistema de gestão de casos**:
- Dados de clientes (nome, CPF, telefone, e-mail) — zero exceções
- Números de processo judicial ou administrativo
- Petições, contratos ou peças processuais
- Informações cobertas por sigilo profissional (art. 34, VII, EOAB)

## Convenção de nomes

```
YYYY-MM-DD_slug-descritivo.md
ex: 2026-05-30_reuniao-kick-off-projeto-ia.md
```

## Fluxo

Após depositar um arquivo, o agente LLM pode ser acionado para compilar a nota
correspondente em `wiki/interno/`. Revisão humana é necessária antes de marcar
`status: revisado`.
