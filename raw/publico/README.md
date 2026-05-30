# raw/publico/ — Documentos-Fonte Públicos

Esta pasta recebe os **documentos brutos** que darão origem ao conteúdo da `wiki/publico/`.

## O que entra aqui

- Textos institucionais fornecidos pelo escritório (sobre a firma, áreas de atuação)
- Perguntas frequentes coletadas em atendimentos anteriores *(sem dados de cliente)*
- Descrições de fluxos de atendimento escritas pelos advogados
- Informações de contato, endereço, horários
- Materiais de apresentação pública (folder, site exportado como texto)
- Transcrições de reuniões de briefing *(sem nomes de clientes ou casos)*

## O que NÃO entra aqui

- Dados de clientes (nome, CPF, telefone, e-mail)
- Números de processo judicial ou administrativo
- Petições, contratos, pareceres ou qualquer peça processual
- Valores de honorários de casos concretos
- Qualquer informação sigilosa (art. 34, VII, EOAB)

## Convenção de nomes

```
YYYY-MM-DD_slug-descritivo.md
ex: 2026-05-30_briefing-areas-de-atuacao.md
```

## Fluxo

Após depositar um arquivo aqui, abra uma issue ou notifique o engenheiro para que
o agente LLM processe o documento e compile a nota correspondente na `wiki/publico/`.
Os arquivos raw são **imutáveis após ingestão** — corrija apenas se houver erro factual,
e registre a correção com um commit `fix:`.
