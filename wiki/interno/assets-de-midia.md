---
titulo: "Assets de Mídia — Onde Vivem os Arquivos"
camada: interno
status: semente
fontes: []
atualizado_em: "2026-05-30"
tags:
  - assets
  - midia
  - armazenamento
  - video
  - imagem
---

# Assets de Mídia

Define onde ficam todos os arquivos de mídia do projeto. O Git armazena apenas texto (Markdown).
Vídeos, imagens, áudios e arquivos de design ficam em armazenamento externo e são **referenciados** aqui.

---

## Estrutura de pastas no armazenamento externo

*(a definir — preencher com o serviço escolhido: Google Drive / Dropbox / S3 / Frame.io / outro)*

```
[Nome do serviço]/
├── 01_identidade-visual/
│   ├── logo/               ← arquivos de logo (SVG, PNG, AI)
│   ├── paleta/             ← swatches, guia de cor
│   └── tipografia/         ← fontes licenciadas
│
├── 02_avatar/
│   ├── modelo-base/        ← arquivos do modelo de avatar
│   ├── voz/                ← arquivos de treino de voz (ACESSO RESTRITO)
│   └── videos-gerados/     ← vídeos finalizados com avatar
│       ├── aprovados/
│       └── rascunhos/
│
├── 03_conteudo-redes/
│   ├── posts/              ← artes finais por data (YYYY-MM-DD_slug)
│   ├── stories/
│   └── reels/
│
├── 04_documentos-legais/   ← contratos, termos de consentimento (ACESSO RESTRITO)
│
└── 05_planilhas/
    ├── calendario-editorial.xlsx (ou Google Sheets)
    └── controle-publicacoes.xlsx (ou Google Sheets)
```

---

## Links de acesso (preencher com URLs reais)

| Recurso | Link | Acesso |
|---------|------|--------|
| Pasta raiz do projeto | *(a preencher)* | *(restrito à equipe)* |
| Calendário editorial | *(a preencher)* | *(restrito à equipe)* |
| Planilha de controle de publicações | *(a preencher)* | *(restrito à equipe)* |
| Arquivos de logo | *(a preencher)* | *(restrito à equipe)* |
| Pasta de vídeos aprovados | *(a preencher)* | *(restrito à equipe)* |
| Pasta de documentos legais | *(a preencher)* | *(ACESSO RESTRITO — somente gestores)* |

---

## Regras de nomenclatura de arquivos

```
Vídeos:    YYYY-MM-DD_[canal]_[slug-do-tema]_[versao].mp4
           ex: 2026-06-01_reels_inventario-explicado_v2.mp4

Posts:     YYYY-MM-DD_[canal]_[slug].[ext]
           ex: 2026-06-01_instagram_dia-do-advogado.png

Roteiros:  YYYY-MM-DD_roteiro_[slug].md  (mantido no vault, raw/interno/)
```

---

## Versionamento de vídeos

| Sufixo | Significado |
|--------|-------------|
| `_v1` | Primeiro rascunho gerado |
| `_v2`, `_v3` | Revisões após feedback |
| `_APROVADO` | Versão final aprovada para publicação |
| `_PUBLICADO` | Versão publicada (pode diferir do aprovado por corte final) |

Nunca deletar versões anteriores — manter para histórico e eventual reprocessamento.

---

## Arquivos de treino de voz — protocolo de segurança

> ⚠️ Arquivos de treino de voz (samples originais gravados pelo advogado) contêm dado biométrico.

- Acesso restrito: apenas o engenheiro responsável e o titular da voz.
- Não compartilhar via e-mail ou WhatsApp.
- Não armazenar em dispositivos pessoais.
- Em caso de revogação do consentimento (ver [[consentimento-voz-clonada]]):
  deletar os arquivos de treino E revogar acesso na ferramenta de clonagem.

---

## Planilha de controle de publicações — campos obrigatórios

| Campo | Descrição |
|-------|-----------|
| Data de publicação | YYYY-MM-DD |
| Canal | Instagram / LinkedIn / YouTube / WhatsApp / Site |
| Tipo | Post / Story / Reels / Vídeo avatar / Atualização vault |
| Título / tema | Descrição curta |
| Pilar | Educativo / Institucional / Informativo / Humanização |
| Aprovado por | Nome do responsável |
| Data de aprovação | YYYY-MM-DD |
| Link publicado | URL do conteúdo ao vivo |
| Observações | *(opcional)* |

---

## Notas relacionadas

- [[identidade-visual]]
- [[identidade-do-avatar]]
- [[consentimento-voz-clonada]]
- [[fluxo-de-aprovacao]]
- [[estrategia-editorial]]
