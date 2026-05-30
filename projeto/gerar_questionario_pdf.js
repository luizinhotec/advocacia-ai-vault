const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'questionario-reuniao-inicial.pdf');

// ── Cores ──────────────────────────────────────────────────────────────────────
const COR = {
  dark:    '#1a1a2e',
  accent:  '#2d5986',
  light:   '#e8f0fb',
  gray:    '#6b7280',
  line:    '#cbd5e1',
  warnBg:  '#fef9c3',
  warnBd:  '#ca8a04',
  white:   '#ffffff',
  textHint:'#9ca3af',
};

const PAGE_W = 595.28;   // A4
const PAGE_H = 841.89;
const MARGIN = 45;
const CONTENT_W = PAGE_W - MARGIN * 2;

const doc = new PDFDocument({ size: 'A4', margin: MARGIN, bufferPages: true });
doc.pipe(fs.createWriteStream(OUTPUT));

// ── Helpers ────────────────────────────────────────────────────────────────────
let y = MARGIN;

function checkPage(needed = 60) {
  if (y + needed > PAGE_H - 60) {
    doc.addPage();
    y = MARGIN;
  }
}

function hr(color = COR.line, thickness = 0.5) {
  doc.save().moveTo(MARGIN, y).lineTo(PAGE_W - MARGIN, y)
    .lineWidth(thickness).strokeColor(color).stroke().restore();
  y += 8;
}

function espaco(h = 8) { y += h; }

function linhasResposta(n = 2) {
  for (let i = 0; i < n; i++) {
    checkPage(14);
    y += 11;
    doc.save().moveTo(MARGIN, y).lineTo(PAGE_W - MARGIN, y)
      .lineWidth(0.4).strokeColor(COR.line).dash(1, { space: 3 }).stroke().restore();
  }
  espaco(6);
}

function rodape(pageNum) {
  doc.save()
    .fontSize(7.5).fillColor(COR.gray).font('Helvetica')
    .text('Uso interno — Projeto de Consultoria de IA | Escritório de Advocacia',
      MARGIN, PAGE_H - 28, { width: CONTENT_W * 0.7 })
    .text(`Página ${pageNum}`, MARGIN, PAGE_H - 28,
      { width: CONTENT_W, align: 'right' })
    .restore();
}

// ── Cabeçalho do documento ────────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(22).fillColor(COR.dark)
  .text('Questionário', MARGIN, y, { width: CONTENT_W });
y += 28;

doc.font('Helvetica-Bold').fontSize(15).fillColor(COR.accent)
  .text('Reunião Inicial com a Advogada', MARGIN, y, { width: CONTENT_W });
y += 24;

// Tabela de metadados
const meta = [
  ['Objetivo:', 'Coletar informações para preencher o vault e iniciar a produção de conteúdo'],
  ['Duração estimada:', '90 minutos'],
  ['Quem conduz:', 'Consultoria (engenheiro / produtor de conteúdo)'],
  ['Quem responde:', 'Advogada responsável pelo escritório'],
  ['Gravação:', 'Sim — obter consentimento verbal antes de iniciar (ver protocolo)'],
  ['Data da reunião:', '_____ / _____ / __________'],
  ['Local / plataforma:', '_'.repeat(42)],
];
const col1 = 105;

meta.forEach(([k, v]) => {
  checkPage(16);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COR.gray)
    .text(k, MARGIN, y, { width: col1 });
  doc.font('Helvetica').fontSize(9).fillColor(COR.dark)
    .text(v, MARGIN + col1 + 4, y, { width: CONTENT_W - col1 - 4 });
  y += 14;
});

espaco(12);
hr(COR.accent, 0.8);
espaco(4);

// ── Caixa de instrução ────────────────────────────────────────────────────────
const instrucao =
  'Este questionário é um roteiro, não um formulário rígido. Deixe a advogada falar ' +
  'livremente — as perguntas são gatilhos. Sinalize quando ela cobrir um item ' +
  'espontaneamente e não repita a pergunta. Ao final de cada bloco, pergunte: ' +
  '"Tem algo neste tema que você gostaria de adicionar antes de avançarmos?"';

const instrH = 52;
doc.save().roundedRect(MARGIN, y, CONTENT_W, instrH, 4)
  .fillColor(COR.warnBg).fill()
  .roundedRect(MARGIN, y, CONTENT_W, instrH, 4)
  .lineWidth(0.8).strokeColor(COR.warnBd).stroke().restore();

doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#713f12')
  .text('Instrução ao entrevistador:  ', MARGIN + 10, y + 10, { continued: true, width: CONTENT_W - 20 });
doc.font('Helvetica').fontSize(8.5).text(instrucao, { width: CONTENT_W - 20 });
y += instrH + 14;

// ── Função de bloco ───────────────────────────────────────────────────────────
function bloco(num, titulo, tempo, alimenta) {
  checkPage(80);

  // Barra azul escura (número)
  doc.save().rect(MARGIN, y, 42, 32).fillColor(COR.dark).fill().restore();
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COR.white)
    .text(`BLOCO`, MARGIN, y + 4, { width: 42, align: 'center' });
  doc.font('Helvetica-Bold').fontSize(13).fillColor(COR.white)
    .text(`${num}`, MARGIN, y + 14, { width: 42, align: 'center' });

  // Barra azul médio (título + tempo)
  doc.save().rect(MARGIN + 42, y, CONTENT_W - 42, 32).fillColor(COR.accent).fill().restore();
  doc.font('Helvetica-Bold').fontSize(11).fillColor(COR.white)
    .text(titulo, MARGIN + 52, y + 7, { width: CONTENT_W - 42 - 70, continued: false });
  doc.font('Helvetica').fontSize(9).fillColor('#bfdbfe')
    .text(tempo, PAGE_W - MARGIN - 65, y + 10, { width: 60, align: 'right' });

  // Faixa de "alimenta"
  doc.save().rect(MARGIN, y + 32, CONTENT_W, 14).fillColor(COR.dark).fill().restore();
  doc.font('Helvetica-Oblique').fontSize(7.5).fillColor('#93c5fd')
    .text(`  Alimenta: ${alimenta}`, MARGIN + 8, y + 35, { width: CONTENT_W });

  y += 52;
  espaco(6);
}

// ── Função de pergunta ────────────────────────────────────────────────────────
function pergunta(num, texto, hint, linhas = 2) {
  const hintH = hint ? 14 : 0;
  const totalH = 20 + hintH + linhas * 14 + 10;
  checkPage(totalH);

  // Número
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COR.accent)
    .text(`${num}.`, MARGIN, y, { width: 18, continued: false });

  // Texto da pergunta
  doc.font('Helvetica-Bold').fontSize(10).fillColor(COR.dark)
    .text(texto, MARGIN + 20, y, { width: CONTENT_W - 20 });
  y += doc.currentLineHeight() + 2;

  if (hint) {
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(COR.textHint)
      .text(hint, MARGIN + 20, y, { width: CONTENT_W - 20 });
    y += 13;
  }

  linhasResposta(linhas);
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCOS
// ═══════════════════════════════════════════════════════════════════════════════

bloco(1, 'O Escritório', '15 min', 'nota: institucional');
pergunta(1,  'Qual é o nome completo do escritório?', 'razão social e nome de fantasia, se houver', 1);
pergunta(2,  'Em que ano o escritório foi fundado? Como surgiu?', 'história, motivação, trajetória', 3);
pergunta(3,  'Quem são os sócios ou advogados principais?', 'nomes, número OAB, formação, especialização — apenas o que for público', 3);
pergunta(4,  'Como você definiria a missão do escritório em duas ou três frases?', 'sem jargão, como você explicaria para um cliente leigo', 3);
pergunta(5,  'Quais são os valores que guiam o trabalho de vocês?', 'ex: escuta ativa, transparência, celeridade...', 2);
pergunta(6,  'O que diferencia este escritório — na sua visão — do ponto de vista da experiência que o cliente tem?', 'não "somos os melhores", mas o que é concreto e observável', 3);
pergunta(7,  'Vocês têm alguma certificação, especialização ou atuação em tribunal relevante para apresentar publicamente?', null, 2);

bloco(2, 'Áreas de Atuação', '20 min', 'nota: areas-de-atuacao');
pergunta(8,  'Quais são as áreas jurídicas em que o escritório atua?', 'lista completa — não pule nenhuma', 4);
pergunta(9,  'Qual é a área principal — aquela que representa a maior parte dos casos?', null, 2);
pergunta(10, 'Para cada área, qual é a situação mais comum que leva um cliente a buscar vocês?', 'pense em exemplos genéricos, sem identificar pessoas', 4);
pergunta(11, 'Existe alguma área que vocês preferem NÃO atender mais, ou que estão deixando de atender?', 'importante para não prometer algo que não se entrega', 2);
pergunta(12, 'Para o cliente leigo, como você explicaria cada área em uma frase?', 'vamos usar isso no conteúdo educativo — linguagem simples é o objetivo', 4);

bloco(3, 'Público-Alvo e Canais', '15 min', 'notas: personas-e-canais, estrategia-editorial');
pergunta(13, 'Quem é o cliente típico do escritório?', 'faixa etária aproximada, perfil, situação de vida — sem dados reais', 3);
pergunta(14, 'Como a maioria dos clientes chega até vocês hoje?', 'indicação, Google, redes sociais, OAB, outro', 2);
pergunta(15, 'Quais redes sociais o escritório já usa ou quer usar?', 'Instagram, LinkedIn, YouTube, TikTok, outro — e qual a prioridade', 2);
pergunta(16, 'O escritório já tem seguidores/audiência formada em algum canal? Quantos, aproximadamente?', null, 2);
pergunta(17, 'Qual canal você acredita que seu público mais usa no dia a dia?', null, 1);
pergunta(18, 'Como os clientes entram em contato hoje para dúvidas rápidas?', 'WhatsApp pessoal? E-mail? Telefone? Nenhum canal estruturado?', 2);

bloco(4, 'Fluxo de Atendimento', '10 min', 'nota: fluxo-de-atendimento');
pergunta(19, 'Descreva o caminho de um novo cliente: desde o primeiro contato até a assinatura do contrato.', 'passo a passo real, sem idealizar — como é hoje, não como deveria ser', 4);
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
pergunta(34, 'Se usarmos um avatar com sua voz: você se sente confortável com isso?', 'explicar claramente o que é clonagem de voz antes de perguntar', 2);
pergunta(35, 'Que tipo de vídeo você imagina para o escritório? Educativo, institucional, os dois?', null, 2);
pergunta(36, 'Tem referências de canais jurídicos ou advogados que você admira na comunicação?', 'links, nomes — para calibrar estilo sem copiar', 2);
pergunta(37, 'Tem referências de canais que você NÃO quer parecer?', 'igualmente útil', 2);
pergunta(38, 'Como você descreveria o tom de voz ideal para representar o escritório?', 'ex: séria e direta / acolhedora e didática / equilibrada...', 2);

bloco(8, 'Identidade Visual', '5 min', 'nota: identidade-visual');
pergunta(39, 'O escritório já tem logo?', 'se sim: pedir os arquivos ao final da reunião — SVG ou PNG de alta resolução', 1);
pergunta(40, 'Tem paleta de cores ou manual de marca definido?', null, 1);
pergunta(41, 'Tem preferência de estilo visual para os posts?', 'ex: limpo e minimalista / mais colorido / usa muito foto pessoal / prefere ilustrações', 2);
pergunta(42, 'Tem alguma cor, estilo ou elemento que definitivamente não quer no conteúdo?', null, 2);

bloco(9, 'Governança e Aprovação', '5 min', 'nota: fluxo-de-aprovacao');
pergunta(43, 'Quem vai aprovar os conteúdos antes de publicar? Você mesma, ou tem mais alguém?', null, 2);
pergunta(44, 'Qual canal prefere usar para receber e aprovar conteúdos?', 'WhatsApp, e-mail, Google Drive, Notion...', 1);
pergunta(45, 'Qual prazo você consegue se comprometer para dar feedback em rascunhos?', '24h? 48h? A pergunta é importante para o fluxo de produção', 1);
pergunta(46, 'Tem algum período do mês em que você está mais ocupada e seria difícil aprovar conteúdos?', 'para o calendário editorial respeitar sua agenda', 2);

bloco(10, 'Encerramento', '5 min', '—');
pergunta(47, 'Tem alguma coisa sobre o escritório ou sobre o projeto que você acha importante a gente saber e que ainda não perguntamos?', null, 3);
pergunta(48, 'Qual é a sua maior expectativa com este projeto de IA e conteúdo?', null, 3);
pergunta(49, 'Qual é o seu maior medo ou preocupação com relação a isso?', 'pergunta valiosa — mostra respeito e ajuda a calibrar a entrega', 3);

// ── Checklist pós-reunião ─────────────────────────────────────────────────────
checkPage(160);
espaco(10);
hr(COR.accent, 1);
espaco(6);

doc.font('Helvetica-Bold').fontSize(11).fillColor(COR.dark)
  .text('Checklist pós-reunião', MARGIN, y, { width: CONTENT_W });
y += 18;

const checkItems = [
  'Gravação salva conforme protocolo de gravação',
  'Arquivos solicitados recebidos: logo, paleta, referências visuais',
  'Decisão sobre voz clonada registrada',
  'Próximos passos combinados e anotados',
  'Enviar resumo por escrito à advogada em até 48h',
  'Depositar transcrição em raw/interno/YYYY-MM-DD_reuniao-inicial.md',
  'Iniciar compilação das notas-semente no vault',
];

const checkH = 14 * checkItems.length + 20;
doc.save().rect(MARGIN, y, CONTENT_W, checkH).fillColor(COR.light).fill()
  .rect(MARGIN, y, CONTENT_W, checkH).lineWidth(0.5).strokeColor(COR.accent).stroke().restore();

let cy = y + 10;
checkItems.forEach(item => {
  doc.font('Helvetica').fontSize(9.5).fillColor(COR.dark)
    .text(`☐  ${item}`, MARGIN + 12, cy, { width: CONTENT_W - 24 });
  cy += 14;
});
y = cy + 10;

espaco(16);
doc.font('Helvetica').fontSize(7.5).fillColor(COR.gray)
  .text(
    'Documento de uso interno — Projeto de Consultoria de IA para Escritório de Advocacia  ·  ' +
    'Não contém dados de clientes  ·  Gerado em 2026-05-30',
    MARGIN, y, { width: CONTENT_W, align: 'center' }
  );

// ── Rodapés em todas as páginas ───────────────────────────────────────────────
const total = doc.bufferedPageRange().count;
for (let i = 0; i < total; i++) {
  doc.switchToPage(i);
  rodape(i + 1);
}

doc.end();
console.log(`PDF gerado: ${OUTPUT}`);
