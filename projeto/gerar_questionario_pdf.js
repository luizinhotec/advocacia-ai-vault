const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'questionario-reuniao-inicial.pdf');

const COR = {
  dark:      '#1a1a2e',
  accent:    '#2d5986',
  light:     '#e8f0fb',
  gray:      '#6b7280',
  line:      '#cbd5e1',
  warnBg:    '#fef9c3',
  warnBd:    '#ca8a04',
  white:     '#ffffff',
  hint:      '#9ca3af',
  azulClaro: '#bfdbfe',
  azulEsc:   '#93c5fd',
  laranjaEsc:'#713f12',
};

const MARGIN    = 45;
const PAGE_W    = 595.28;
const PAGE_H    = 841.89;
const CW        = PAGE_W - MARGIN * 2;   // largura útil
const BOTTOM    = PAGE_H - 52;           // limite inferior antes do rodapé

// margin bottom = 0 para desativar quebra automática do pdfkit
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: MARGIN, left: MARGIN, right: MARGIN, bottom: 0 },
  bufferPages: true,
  autoFirstPage: true,
});
doc.pipe(fs.createWriteStream(OUTPUT));

// ── cursor manual ──────────────────────────────────────────────────────────────
let Y = MARGIN;   // cursor Y exclusivo — NUNCA ler doc.y

function novaP() {
  doc.addPage();
  Y = MARGIN;
}

/** Garante `h` pixels disponíveis; se não couber, quebra página. */
function need(h) {
  if (Y + h > BOTTOM) novaP();
}

function sp(h = 8) { Y += h; }

// ── primitivos ─────────────────────────────────────────────────────────────────
function textH(txt, size, w) {
  doc.fontSize(size);
  return doc.heightOfString(txt, { width: w });
}

function hrLine(color = COR.line, thick = 0.4) {
  need(8);
  doc.save()
     .moveTo(MARGIN, Y).lineTo(PAGE_W - MARGIN, Y)
     .lineWidth(thick).strokeColor(color).stroke()
     .restore();
  Y += 8;
}

function linhaResp() {
  Y += 10;
  doc.save()
     .moveTo(MARGIN, Y).lineTo(PAGE_W - MARGIN, Y)
     .lineWidth(0.4).strokeColor(COR.line)
     .dash(1, { space: 3 }).stroke()
     .restore();
}

function linhas(n) {
  for (let i = 0; i < n; i++) { need(14); linhaResp(); }
  Y += 6;
}

// ── rodapé (aplicado no final em todas as páginas) ────────────────────────────
function desenhaRodape(num) {
  doc.save()
     .font('Helvetica').fontSize(7.5).fillColor(COR.gray)
     .text('Uso interno — Projeto de Consultoria de IA | Escritório de Advocacia',
           MARGIN, PAGE_H - 26, { width: CW * 0.75, lineBreak: false })
     .text(`Página ${num}`, MARGIN, PAGE_H - 26,
           { width: CW, align: 'right', lineBreak: false })
     .restore();
}

// ── cabeçalho do documento ─────────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(22).fillColor(COR.dark)
   .text('Questionário', MARGIN, Y, { lineBreak: false });
Y += 30;

doc.font('Helvetica-Bold').fontSize(15).fillColor(COR.accent)
   .text('Reunião Inicial com a Advogada', MARGIN, Y, { width: CW, lineBreak: false });
Y += 22;

// metadados
const META = [
  ['Objetivo:',           'Coletar informações para preencher o vault e iniciar a produção de conteúdo'],
  ['Duração estimada:',   '90 minutos'],
  ['Quem conduz:',        'Consultoria (engenheiro / produtor de conteúdo)'],
  ['Quem responde:',      'Advogada responsável pelo escritório'],
  ['Gravação:',           'Sim — obter consentimento verbal antes de iniciar (ver protocolo)'],
  ['Data da reunião:',    '_____ / _____ / __________'],
  ['Local / plataforma:', '_'.repeat(44)],
];
const COL1 = 108;
META.forEach(([k, v]) => {
  const h = Math.max(
    textH(k, 9, COL1),
    textH(v, 9, CW - COL1 - 4)
  ) + 3;
  need(h);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COR.gray)
     .text(k, MARGIN, Y, { width: COL1, lineBreak: false });
  doc.font('Helvetica').fontSize(9).fillColor(COR.dark)
     .text(v, MARGIN + COL1 + 4, Y, { width: CW - COL1 - 4, lineBreak: false });
  Y += h;
});

Y += 8;
hrLine(COR.accent, 0.8);
Y += 4;

// caixa instrução
const instrTxt =
  'Este questionário é um roteiro, não um formulário rígido. Deixe a advogada falar ' +
  'livremente — as perguntas são gatilhos. Ao final de cada bloco pergunte: ' +
  '"Tem algo neste tema que você gostaria de adicionar antes de avançarmos?"';
const instrH = textH(instrTxt, 8.5, CW - 20) + 20;
need(instrH + 10);
doc.save()
   .roundedRect(MARGIN, Y, CW, instrH, 4).fillColor(COR.warnBg).fill()
   .roundedRect(MARGIN, Y, CW, instrH, 4).lineWidth(0.8).strokeColor(COR.warnBd).stroke()
   .restore();
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COR.laranjaEsc)
   .text('Instrução:  ', MARGIN + 10, Y + 10, { continued: true, width: CW - 20 });
doc.font('Helvetica').text(instrTxt, { width: CW - 20, lineBreak: false });
Y += instrH + 12;

// ── bloco ──────────────────────────────────────────────────────────────────────
function bloco(num, titulo, tempo, alimenta) {
  need(60);
  Y += 8;
  const BH = 30, FAH = 14;

  // lado escuro (número)
  doc.save().rect(MARGIN, Y, 44, BH).fillColor(COR.dark).fill().restore();
  doc.font('Helvetica-Bold').fontSize(7).fillColor(COR.white)
     .text('BLOCO', MARGIN, Y + 4, { width: 44, align: 'center', lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(13).fillColor(COR.white)
     .text(`${num}`, MARGIN, Y + 14, { width: 44, align: 'center', lineBreak: false });

  // lado azul (título + tempo)
  doc.save().rect(MARGIN + 44, Y, CW - 44, BH).fillColor(COR.accent).fill().restore();
  doc.font('Helvetica-Bold').fontSize(11).fillColor(COR.white)
     .text(titulo, MARGIN + 54, Y + 9, { width: CW - 44 - 70, lineBreak: false });
  doc.font('Helvetica').fontSize(9).fillColor(COR.azulClaro)
     .text(tempo, MARGIN + 44, Y + 11, { width: CW - 44 - 6, align: 'right', lineBreak: false });

  // faixa alimenta
  doc.save().rect(MARGIN, Y + BH, CW, FAH).fillColor(COR.dark).fill().restore();
  doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(COR.azulEsc)
     .text(`  Alimenta: ${alimenta}`, MARGIN + 8, Y + BH + 3,
           { width: CW - 16, lineBreak: false });

  Y += BH + FAH + 8;
}

// ── pergunta ───────────────────────────────────────────────────────────────────
function pergunta(num, texto, hint, nLinhas = 2) {
  const tH  = textH(texto, 10, CW - 22);
  const hH  = hint ? textH(hint, 8.5, CW - 22) + 4 : 0;
  const tot = tH + hH + nLinhas * 14 + 22;
  need(tot);

  // número
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COR.accent)
     .text(`${num}.`, MARGIN, Y, { width: 18, lineBreak: false });
  // texto
  doc.font('Helvetica-Bold').fontSize(10).fillColor(COR.dark)
     .text(texto, MARGIN + 20, Y, { width: CW - 20, lineBreak: false });
  Y += tH + 3;

  if (hint) {
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(COR.hint)
       .text(hint, MARGIN + 20, Y, { width: CW - 20, lineBreak: false });
    Y += hH;
  }
  linhas(nLinhas);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTEÚDO
// ═══════════════════════════════════════════════════════════════════════════════

bloco(1, 'O Escritório', '15 min', 'nota: institucional');
pergunta(1, 'Qual é o nome completo do escritório?', 'razão social e nome de fantasia, se houver', 1);
pergunta(2, 'Em que ano o escritório foi fundado? Como surgiu?', 'história, motivação, trajetória', 3);
pergunta(3, 'Quem são os sócios ou advogados principais?', 'nomes, OAB, formação — apenas o que for público', 3);
pergunta(4, 'Como você definiria a missão do escritório em duas ou três frases?', 'sem jargão, como você explicaria para um cliente leigo', 3);
pergunta(5, 'Quais são os valores que guiam o trabalho de vocês?', 'ex: escuta ativa, transparência, celeridade...', 2);
pergunta(6, 'O que diferencia este escritório do ponto de vista da experiência que o cliente tem?', 'não "somos os melhores" — o que é concreto e observável', 3);
pergunta(7, 'Vocês têm certificação, especialização ou atuação em tribunal relevante para apresentar publicamente?', null, 2);

bloco(2, 'Áreas de Atuação', '20 min', 'nota: areas-de-atuacao');
pergunta(8,  'Quais são as áreas jurídicas em que o escritório atua?', 'lista completa — não pule nenhuma', 4);
pergunta(9,  'Qual é a área principal — a que representa a maior parte dos casos?', null, 2);
pergunta(10, 'Para cada área, qual é a situação mais comum que leva um cliente a buscar vocês?', 'exemplos genéricos, sem identificar pessoas', 4);
pergunta(11, 'Existe alguma área que vocês preferem NÃO atender mais?', 'importante para não prometer algo que não se entrega', 2);
pergunta(12, 'Para o cliente leigo, como você explicaria cada área em uma frase?', 'vamos usar isso no conteúdo educativo — linguagem simples é o objetivo', 4);

bloco(3, 'Público-Alvo e Canais', '15 min', 'notas: personas-e-canais, estrategia-editorial');
pergunta(13, 'Quem é o cliente típico do escritório?', 'faixa etária, perfil, situação de vida — sem dados reais', 3);
pergunta(14, 'Como a maioria dos clientes chega até vocês hoje?', 'indicação, Google, redes sociais, OAB, outro', 2);
pergunta(15, 'Quais redes sociais o escritório já usa ou quer usar?', 'Instagram, LinkedIn, YouTube, TikTok — e qual a prioridade', 2);
pergunta(16, 'O escritório já tem seguidores/audiência formada em algum canal? Quantos?', null, 1);
pergunta(17, 'Qual canal você acredita que seu público mais usa no dia a dia?', null, 1);
pergunta(18, 'Como os clientes entram em contato hoje para dúvidas rápidas?', 'WhatsApp pessoal? E-mail? Telefone? Nenhum canal estruturado?', 2);

bloco(4, 'Fluxo de Atendimento', '10 min', 'nota: fluxo-de-atendimento');
pergunta(19, 'Descreva o caminho de um novo cliente: do primeiro contato até a assinatura do contrato.', 'como é hoje, sem idealizar', 4);
pergunta(20, 'Quem responde o primeiro contato hoje? Você mesma, uma assistente, ninguém?', null, 2);
pergunta(21, 'Qual é o tempo médio de resposta ao primeiro contato?', null, 1);
pergunta(22, 'A primeira consulta é presencial, online ou ambos?', null, 1);
pergunta(23, 'Após a consulta, como é feita a proposta de honorários?', 'não precisa de valores — só o processo', 2);
pergunta(24, 'Como o cliente acompanha o andamento do caso depois de contratar?', 'canal, frequência de atualizações', 2);

bloco(5, 'Logística e Contato', '5 min', 'nota: logistica');
pergunta(25, 'Qual é o endereço completo do escritório?', null, 2);
pergunta(26, 'Quais são os horários de funcionamento?', null, 2);
pergunta(27, 'Quais são os canais de contato públicos?', 'telefone, WhatsApp, e-mail, site — os que podem ser publicados', 2);
pergunta(28, 'O escritório atende online (videoconferência)?', null, 1);
pergunta(29, 'Como funciona o agendamento hoje?', 'tem um sistema, WhatsApp, ligação...', 2);

bloco(6, 'Perguntas Frequentes', '10 min', 'nota: faq');
pergunta(30, 'Quais são as 5 perguntas que os clientes mais fazem antes de contratar?', null, 5);
pergunta(31, "Tem alguma pergunta que você recebe com frequência e que te 'cansa' de responder?", 'essas são as melhores para o agente de atendimento resolver', 3);
pergunta(32, 'O que os clientes mais temem ou têm dúvida antes da primeira consulta?', 'ajuda a calibrar o tom acolhedor do agente', 3);

bloco(7, 'Avatar, Voz e Presença em Vídeo', '10 min', 'notas: identidade-do-avatar, consentimento-voz-clonada');
pergunta(33, 'Você tem interesse em aparecer pessoalmente nos vídeos, ou prefere um avatar?', 'ambos são possíveis — explorar a preferência dela', 2);
pergunta(34, 'Se usarmos um avatar com sua voz: você se sente confortável com isso?', 'explicar o que é clonagem de voz antes de perguntar', 2);
pergunta(35, 'Que tipo de vídeo você imagina para o escritório? Educativo, institucional, os dois?', null, 2);
pergunta(36, 'Tem referências de canais jurídicos ou advogados que você admira na comunicação?', 'links, nomes — para calibrar estilo sem copiar', 2);
pergunta(37, 'Tem referências de canais que você NÃO quer parecer?', null, 2);
pergunta(38, 'Como você descreveria o tom de voz ideal para representar o escritório?', 'ex: séria e direta / acolhedora e didática / equilibrada...', 2);

bloco(8, 'Identidade Visual', '5 min', 'nota: identidade-visual');
pergunta(39, 'O escritório já tem logo?', 'se sim: pedir SVG ou PNG de alta resolução ao final da reunião', 1);
pergunta(40, 'Tem paleta de cores ou manual de marca definido?', null, 1);
pergunta(41, 'Tem preferência de estilo visual para os posts?', 'ex: minimalista / colorido / foto pessoal / ilustrações', 2);
pergunta(42, 'Tem alguma cor ou elemento que definitivamente não quer no conteúdo?', null, 2);

bloco(9, 'Governança e Aprovação', '5 min', 'nota: fluxo-de-aprovacao');
pergunta(43, 'Quem vai aprovar os conteúdos antes de publicar?', null, 2);
pergunta(44, 'Qual canal prefere usar para receber e aprovar conteúdos?', 'WhatsApp, e-mail, Google Drive, Notion...', 1);
pergunta(45, 'Qual prazo você consegue se comprometer para dar feedback em rascunhos?', '24h? 48h?', 1);
pergunta(46, 'Tem algum período do mês em que seria difícil aprovar conteúdos?', 'para o calendário editorial respeitar sua agenda', 2);

bloco(10, 'Encerramento', '5 min', '—');
pergunta(47, 'Tem alguma coisa importante sobre o escritório ou o projeto que ainda não perguntamos?', null, 3);
pergunta(48, 'Qual é a sua maior expectativa com este projeto de IA e conteúdo?', null, 3);
pergunta(49, 'Qual é o seu maior medo ou preocupação com relação a isso?', 'pergunta valiosa — mostra respeito e ajuda a calibrar a entrega', 3);

// ── checklist pós-reunião ──────────────────────────────────────────────────────
const CHECKS = [
  'Gravação salva conforme protocolo de gravação',
  'Arquivos solicitados recebidos: logo, paleta, referências visuais',
  'Decisão sobre voz clonada registrada',
  'Próximos passos combinados e anotados',
  'Enviar resumo por escrito à advogada em até 48h',
  'Depositar transcrição em raw/interno/YYYY-MM-DD_reuniao-inicial.md',
  'Iniciar compilação das notas-semente no vault',
];
const CKH = CHECKS.length * 15 + 24;
need(CKH + 50);
Y += 12;
hrLine(COR.accent, 1);
Y += 6;
doc.font('Helvetica-Bold').fontSize(11).fillColor(COR.dark)
   .text('Checklist pós-reunião', MARGIN, Y, { width: CW, lineBreak: false });
Y += 16;
doc.save()
   .rect(MARGIN, Y, CW, CKH).fillColor(COR.light).fill()
   .rect(MARGIN, Y, CW, CKH).lineWidth(0.5).strokeColor(COR.accent).stroke()
   .restore();
Y += 10;
CHECKS.forEach(item => {
  doc.font('Helvetica').fontSize(9.5).fillColor(COR.dark)
     .text(`☐  ${item}`, MARGIN + 12, Y, { width: CW - 24, lineBreak: false });
  Y += 15;
});
Y += 14;
doc.font('Helvetica').fontSize(7.5).fillColor(COR.gray)
   .text('Documento de uso interno — Projeto de Consultoria de IA  ·  Não contém dados de clientes  ·  2026-05-30',
         MARGIN, Y, { width: CW, align: 'center', lineBreak: false });

// ── rodapés em todas as páginas ────────────────────────────────────────────────
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(range.start + i);
  desenhaRodape(i + 1);
}

doc.end();
console.log(`PDF gerado com ${range.count} páginas: ${OUTPUT}`);
