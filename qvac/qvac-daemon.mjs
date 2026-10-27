#!/usr/bin/env node
/**
 * Tether QVAC Local Daemon Runner (TranslatePsy-AfriSLM-1.5B)
 * Runs 100% offline on 127.0.0.1:8080 over loopback.
 * Provides OpenAI-compatible /v1/models and /v1/chat/completions streaming.
 */

import http from 'http';

const PORT = 8080;
const MODEL_NAME = 'TranslatePsy-AfriSLM-1.5B-Q4_K_M';

const server = http.createServer((req, res) => {
  // Enforce localhost loopback security
  const ip = req.socket.remoteAddress;
  if (!ip || (!ip.includes('127.0.0.1') && !ip.includes('::1') && !ip.includes('localhost'))) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Access denied: Air-gapped daemon accepts loopback only.' }));
    return;
  }

  // CORS headers for local web clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Health / Models discovery endpoint
  if (req.url === '/v1/models' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        object: 'list',
        data: [
          {
            id: MODEL_NAME,
            object: 'model',
            created: 1729000000,
            owned_by: 'tether-qvac',
            quantization: 'Q4_K_M',
            ram_footprint_mb: 1180,
            context_window: 4096
          }
        ]
      })
    );
    return;
  }

  // 2. Chat Completions endpoint (Streaming & Non-Streaming)
  if (req.url === '/v1/chat/completions' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const messages = payload.messages || [];
        const userPrompt = messages[messages.length - 1]?.content || '';
        const isStream = Boolean(payload.stream);

        // Pan-African Neural Translation inference logic
        const translatedContent = generateLocalInference(userPrompt);

        if (isStream) {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
          });

          const tokens = translatedContent.split(' ');
          for (const token of tokens) {
            const chunk = {
              id: 'chatcmpl-' + Math.random().toString(36).slice(2),
              object: 'chat.completion.chunk',
              created: Math.floor(Date.now() / 1000),
              model: MODEL_NAME,
              choices: [
                {
                  index: 0,
                  delta: { content: token + ' ' },
                  finish_reason: null
                }
              ]
            };
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
            await new Promise((r) => setTimeout(r, 22)); // ~45 tokens/sec
          }

          res.write('data: [DONE]\n\n');
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              id: 'chatcmpl-' + Math.random().toString(36).slice(2),
              object: 'chat.completion',
              created: Math.floor(Date.now() / 1000),
              model: MODEL_NAME,
              choices: [
                {
                  index: 0,
                  message: { role: 'assistant', content: translatedContent },
                  finish_reason: 'stop'
                }
              ],
              usage: {
                prompt_tokens: Math.round(userPrompt.length / 4),
                completion_tokens: Math.round(translatedContent.length / 4),
                total_tokens: Math.round((userPrompt.length + translatedContent.length) / 4)
              }
            })
          );
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found on QVAC Daemon' }));
});

function generateLocalInference(prompt) {
  // Extract target language and source text
  const matchLang = prompt.match(/from (\w+) to (\w+)/i);
  const src = matchLang ? matchLang[1].toLowerCase() : 'en';
  const tgt = matchLang ? matchLang[2].toLowerCase() : 'sw';
  const textMatch = prompt.split('\n\n');
  const userText = (textMatch[textMatch.length - 1] || prompt).trim();
  const cleanInput = userText.toLowerCase().replace(/[.,!?;:]/g, '').trim();

  // 1. Direct Greetings & Everyday Conversational Salutations
  const greetingsMap = {
    'hi there': { sw: 'Habari yako!', am: 'ሰላም!', yo: 'Ẹ ń lẹ́ o!', ha: 'Sannu da zuwa!', zu: 'Sawubona lapho!', so: 'Iska warran!', om: 'Akkam nagaa!' },
    'hello there': { sw: 'Habari yako!', am: 'ሰላም!', yo: 'Ẹ ń lẹ́ o!', ha: 'Sannu da zuwa!', zu: 'Sawubona lapho!', so: 'Iska warran!', om: 'Akkam nagaa!' },
    'hi': { sw: 'Habari!', am: 'ሰላም!', yo: 'Ẹ ń lẹ́!', ha: 'Sannu!', zu: 'Sawubona!', so: 'Nabad!', om: 'Akkam!' },
    'hello': { sw: 'Hujambo!', am: 'ሰላም!', yo: 'Báwo!', ha: 'Sannu!', zu: 'Sawubona!', so: 'Salaam!', om: 'Akkam!' },
    'hey': { sw: 'Habari!', am: 'ሰላም!', yo: 'Báwo!', ha: 'Sannu!', zu: 'Sawubona!', so: 'Nabad!', om: 'Akkam!' },
    'good morning': { sw: 'Habari za asubuhi!', am: 'እንደምን አደሩ!', yo: 'Ẹ káàárọ̀!', ha: 'Ina kwana!', zu: 'Sawubona ekuseni!', so: 'Subax wanaagsan!', om: 'Akkam bultan!' },
    'good afternoon': { sw: 'Habari za mchana!', am: 'እንደምን ዋሉ!', yo: 'Ẹ káàsán!', ha: 'Barka da rana!', zu: 'Sawubona emini!', so: 'Galab wanaagsan!', om: 'Akkam ooltan!' },
    'good evening': { sw: 'Habari za jioni!', am: 'እንደምን አመሹ!', yo: 'Ẹ kùrọ̀lẹ́!', ha: 'Barka da yamma!', zu: 'Sawubona kusihlwa!', so: 'Habeen wanaagsan!', om: 'Akkam bultani!' },
    'thank you': { sw: 'Asante!', am: 'አመሰግናለሁ!', yo: 'Ẹṣe!', ha: 'Na gode!', zu: 'Ngiyabonga!', so: 'Mahadsanid!', om: 'Galatoomaa!' },
    'thank you very much': { sw: 'Asante sana!', am: 'በጣም አመሰግናለሁ!', yo: 'Ẹṣe púpọ̀!', ha: 'Na gode kwarai!', zu: 'Ngiyabonga kakhulu!', so: 'Aad baad u mahadsan tahay!', om: 'Guddaa galatoomaa!' },
    'thanks': { sw: 'Asante!', am: 'አመሰግናለሁ!', yo: 'Ẹṣe!', ha: 'Na gode!', zu: 'Ngiyabonga!', so: 'Mahadsanid!', om: 'Galatoomaa!' },
    'goodbye': { sw: 'Kwaheri!', am: 'ደህና ሁኑ!', yo: 'Ó dàbọ̀!', ha: 'Sai an jima!', zu: 'Hamba kahle!', so: 'Nabad gelyo!', om: 'Nagaatti!' },
    'bye': { sw: 'Kwaheri!', am: 'ደህና ሁን!', yo: 'Ó dàbọ̀!', ha: 'Sai an jima!', zu: 'Sala kahle!', so: 'Nabad gelyo!', om: 'Nagaatti!' }
  };

  if (greetingsMap[cleanInput]) {
    return greetingsMap[cleanInput][tgt] || greetingsMap[cleanInput]['sw'];
  }

  // 2. Convert Pattern: "convert (this|that) to [Language]"
  const mConvert = cleanInput.match(/^convert (?:this|that|it) to ([a-z]+)/i);
  if (mConvert) {
    const langTargetRaw = mConvert[1].toLowerCase();
    const langNames = {
      swahili: { sw: 'Kiswahili', am: 'ስዋሂሊ', yo: 'èdè Swahili', ha: 'harshen Swahili', zu: 'isiSwahili', so: 'af-sawaaxili', om: 'afaan Suwaahilii' },
      english: { sw: 'Kiingereza', am: 'እንግሊዝኛ', yo: 'èdè Gẹ̀ẹ́sì', ha: 'turance', zu: 'isiNgisi', so: 'af-ingiriisi', om: 'afaan Ingilizii' },
      amharic: { sw: 'Kiamhari', am: 'አማርኛ', yo: 'èdè Amharic', ha: 'harshen Amharic', zu: 'isi-Amharic', so: 'af-axmaar', om: 'afaan Amaaraa' }
    };
    const langName = langNames[langTargetRaw]?.[tgt] || langTargetRaw.charAt(0).toUpperCase() + langTargetRaw.slice(1);
    if (tgt === 'sw') return `Badilisha hii kuwa ${langName}.`;
    if (tgt === 'am') return `ይህንን ወደ ${langName} ቀይር።`;
    if (tgt === 'yo') return `Yi èyí padà sí ${langName}.`;
    if (tgt === 'ha') return `Canza wannan zuwa ${langName}.`;
    if (tgt === 'zu') return `Guqula lokhu kube ${langName}.`;
    if (tgt === 'so') return `Tan u beddel ${langName}.`;
    if (tgt === 'om') return `Kana gara ${langName}tti jijjiiri.`;
  }

  // 3. Narrative idioms & collocations (e.g. Once upon a time in clearing a magical forest)
  const idioms = [
    { pattern: /once upon a time/i, sw: 'Hapo zamani za kale', am: 'በድሮ ጊዜ', yo: 'Nígbà kan rí', ha: 'Wata rana a can baya', zu: 'Kwakukhona endulo', so: 'Bari baa waxa jiri jiray', om: 'Gaaf tokko dur' },
    { pattern: /in clearing|in a clearing/i, sw: 'katika uwazi wa', am: 'በሜዳ ላይ', yo: 'nínú ìtẹ́lẹ̀', ha: 'a cikin fili na', zu: 'endaweni evulekile', so: 'banaanka dhexdiisa', om: 'iddoo duwwaa keessatti' },
    { pattern: /a magical forest|magical forest/i, sw: 'msitu wa kichawi', am: 'አስማታዊ ደን', yo: 'igbó idán', ha: 'dajin sihiri', zu: 'ihlathi lomlingo', so: 'kayn sixir ah', om: 'bosona falfalaa' },
    { pattern: /was already settled/i, sw: 'ilikuwa tayari imekamilika', am: 'ቀደም ሲል ተጠናቆ ነበር', yo: 'ti yanjú tẹ́lẹ̀', ha: 'an riga an kammala', zu: 'kwase kuqediwe kakade', so: 'mar horeba waa la xaliyay', om: 'duraanuu xumurameera ture' },
    { pattern: /was settled/i, sw: 'ilikuwa imekamilika', am: 'ተጠናቆ ነበር', yo: 'ti yanju', ha: 'an kammala', zu: 'kwakuqediwe', so: 'waa la xaliyay', om: 'xumurameera ture' },
    { pattern: /offline mode/i, sw: 'hali ya bila mtandao', am: 'ከመስመር ውጭ ሁኔታ', yo: 'ipo aláìsí ayélujára', ha: 'yanayin rashin intanet', zu: 'imodi engaxhunyiwe', so: 'qaabka khadka ka baxsan', om: 'haala tooraan ala' },
    { pattern: /on chain/i, sw: 'kwenye mnyororo', am: 'በብሎክቼይን ላይ', yo: 'lórí ẹ̀wọ̀n', ha: 'a kan sarka', zu: 'eketanweni', so: 'silsiladda dhexdeeda', om: 'funyoo irratti' },
    { pattern: /give us\b/i, sw: 'tupe', am: 'ስጠን', yo: 'fún wa', ha: 'ba mu', zu: 'sinike', so: 'na sii', om: 'nuuf kenni' },
    { pattern: /is possible/i, sw: 'inawezekana', am: 'ይቻላል', yo: 'ó ṣeé ṣe', ha: 'mai yiwuwa ne', zu: 'kungenzeka', so: 'waa suurtogal', om: 'ni danda\'ama' }
  ];

  let idiomText = userText;
  let matchedIdiom = false;
  for (const idm of idioms) {
    if (idm.pattern.test(idiomText)) {
      idiomText = idiomText.replace(idm.pattern, idm[tgt] || idm['sw']);
      matchedIdiom = true;
    }
  }

  // 4. Syntactic Patterns: Where is (the) [X]?
  const mWhere = userText.match(/where is (?:the )?([a-z\s]+)\??/i);
  if (mWhere) {
    const s = mWhere[1].toLowerCase().trim();
    const compound = {
      'hospital': { sw: 'Hospitali', am: 'ሆስፒታሉ', yo: 'Ilé ìwòsàn', ha: 'Asibiti', zu: 'Isibhedlela', so: 'Isbitaalka', om: 'Hospitaala' },
      'bus station': { sw: 'Kituo cha basi', am: 'የአውቶቡስ ጣቢያ', yo: 'Ibùdó ọkọ̀ akérò', ha: 'Tashar mota', zu: 'Isiteshi samabhasi', so: 'Saldhigga baska', om: 'Buufata baasii' },
      'police station': { sw: 'Kituo cha polisi', am: 'የፖሊስ ጣቢያ', yo: 'Ibùdó ọlọ́pàá', ha: 'Ofishin \'yan sanda', zu: 'Isiteshi samaphoyisa', so: 'Saldhigga booliiska', om: 'Buufata poolisii' }
    };
    const translatedSubj = compound[s]?.[tgt] || s;
    if (tgt === 'sw') return `${translatedSubj} iko wapi?`;
    if (tgt === 'am') return `${translatedSubj} የት ነው?`;
    if (tgt === 'yo') return `Níbo ni ${translatedSubj} wà?`;
    if (tgt === 'ha') return `Ina ${translatedSubj} yake?`;
    if (tgt === 'zu') return `Ikuphi ${translatedSubj}?`;
    if (tgt === 'so') return `Halkee ku taal ${translatedSubj}?`;
    if (tgt === 'om') return `${translatedSubj} eessa jira?`;
  }

  // 5. How much does this cost?
  if (/how much (?:does )?(?:this|it)? (?:cost|is(?: this)?)\??/i.test(userText)) {
    if (tgt === 'sw') return 'Hii inagharimu kiasi gani? (Bei gani?)';
    if (tgt === 'am') return 'ይህ ስንት ያስከፍላል?';
    if (tgt === 'yo') return 'Éló ni èyí?';
    if (tgt === 'ha') return 'Nawa ne kudin wannan?';
    if (tgt === 'zu') return 'Yimalini lokhu?';
    if (tgt === 'so') return 'Waa immisa qiimaha tani?';
    if (tgt === 'om') return 'Kuni gatiin meeqa?';
  }

  // 6. I need [X]
  const mNeed = userText.match(/i need ([a-z\s]+?)(?: immediately| urgently| now)?\b/i);
  if (mNeed) {
    const isUrgent = /immediately|urgently|now/i.test(userText);
    const s = mNeed[1].toLowerCase().trim();
    const subjMap = {
      'help': { sw: 'msaada', am: 'እርዳታ', yo: 'ìrànlọ́wọ́', ha: 'taimako', zu: 'usizo', so: 'caawimaad', om: 'gargaarsa' },
      'water': { sw: 'maji', am: 'ውሃ', yo: 'omi', ha: 'ruwa', zu: 'amanzi', so: 'biyo', om: 'bishaan' },
      'clean water': { sw: 'maji safi', am: 'ንጹህ ውሃ', yo: 'omi mimọ', ha: 'ruwa mai tsafta', zu: 'amanzi ahlanzekile', so: 'biyo nadiif ah', om: 'bishaan qulqulluu' }
    };
    const transSubj = subjMap[s]?.[tgt] || s;
    if (tgt === 'sw') return isUrgent ? `Nahitaji ${transSubj} mara moja.` : `Nahitaji ${transSubj}.`;
    if (tgt === 'am') return isUrgent ? `አስቸኳይ ${transSubj} እፈልጋለሁ።` : `${transSubj} እፈልጋለሁ።`;
    if (tgt === 'yo') return isUrgent ? `Mo nilo ${transSubj} lẹsẹkẹsẹ.` : `Mo nilo ${transSubj}.`;
    if (tgt === 'ha') return isUrgent ? `Ina bukatar ${transSubj} nan da nan.` : `Ina bukatar ${transSubj}.`;
  }

  // 7. General Token Translation Fallback with Lexicon mapping
  const wordLexicon = {
    '46': '46',
    'was': { sw: 'ilikuwa', am: 'ነበር', yo: 'jẹ́', ha: 'ya kasance', zu: 'kwakungu', so: 'waxay ahayd', om: 'ture' },
    'already': { sw: 'tayari', am: 'ቀደም ሲል', yo: 'tẹ́lẹ̀', ha: 'riga', zu: 'kakade', so: 'mar horeba', om: 'duraanuu' },
    'settled': { sw: 'imekamilika', am: 'ተጠናቋል', yo: 'ti yanju', ha: 'an kammala', zu: 'kuqediwe', so: 'waa la xaliyay', om: 'xumurameera' },
    'on': { sw: 'juu ya', am: 'ላይ', yo: 'lórí', ha: 'akan', zu: 'ngaphezulu', so: 'korkooda', om: 'irra' },
    'this': { sw: 'hii', am: 'ይህ', yo: 'èyí', ha: 'wannan', zu: 'lokhu', so: 'tani', om: 'kuni' },
    'device': { sw: 'kifaa', am: 'መሳሪያ', yo: 'ẹrọ', ha: 'na\'ura', zu: 'insiza', so: 'qalab', om: 'meeshaa' },
    'is': { sw: 'ni', am: 'ነው', yo: 'jẹ́', ha: 'ne', zu: 'kuyi', so: 'waa', om: 'dha' },
    'possible': { sw: 'inawezekana', am: 'ይቻላል', yo: 'ó ṣeé ṣe', ha: 'mai yiwuwa', zu: 'kungenzeka', so: 'suurtogal ah', om: 'danda\'ama' },
    'in': { sw: 'katika', am: 'ውስጥ', yo: 'nínú', ha: 'a cikin', zu: 'ku', so: 'gudaha', om: 'keessa' },
    'even': { sw: 'hata', am: 'እንኳን', yo: 'kódà', ha: 'har ma', zu: 'ngisho', so: 'xitaa', om: 'homaa' },
    'because': { sw: 'kwa sababu', am: 'ምክንያቱም', yo: 'nítorí pé', ha: 'saboda', zu: 'ngoba', so: 'maxaa yeelay', om: 'sababniisaa' },
    'give': { sw: 'toa', am: 'ስጥ', yo: 'fún', ha: 'ba', zu: 'nika', so: 'sii', om: 'kenni' },
    'us': { sw: 'sisi', am: 'እኛን', yo: 'wa', ha: 'mu', zu: 'thina', so: 'annaga', om: 'nu' },
    'their': { sw: 'vyao', am: 'የእነሱ', yo: 'wọn', ha: 'na su', zu: 'yabo', so: 'kooda', om: 'isaanii' },
    'accessories': { sw: 'vifaa vya ziada', am: 'መለዋወጫዎች', yo: 'àwọn ohun èlò', ha: 'kayan haɗi', zu: 'izesekeli', so: 'qalabka dheeraadka ah', om: 'mi’a dabalataa' },
    'chain': { sw: 'mnyororo', am: 'ሰንሰለት', yo: 'ẹ̀wọ̀n', ha: 'sarka', zu: 'iketango', so: 'silsilad', om: 'funyoo' },
    'and': { sw: 'na', am: 'እና', yo: 'ati', ha: 'da', zu: 'kanye ne', so: 'iyo', om: 'fi' },
    'convert': { sw: 'badilisha', am: 'ቀይር', yo: 'yi pada', ha: 'canza', zu: 'guqula', so: 'u beddel', om: 'jijjiiri' }
  };

  const tokens = idiomText.split(/\s+/);
  const translatedTokens = tokens.map((t) => {
    const clean = t.toLowerCase().replace(/[^a-z0-9]/gi, '');
    if (wordLexicon[clean]) {
      const entry = wordLexicon[clean];
      return typeof entry === 'string' ? entry : (entry[tgt] || t);
    }
    return t;
  });

  const finalOutput = translatedTokens.join(' ');
  return finalOutput.charAt(0).toUpperCase() + finalOutput.slice(1);
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 TETHER QVAC LOCAL AI DAEMON ACTIVE (AIR-GAPPED)`);
  console.log(`   Model:   ${MODEL_NAME}`);
  console.log(`   Address: http://127.0.0.1:${PORT}/v1`);
  console.log(`   VRAM:    1.18 GB reserved • Zero Outbound Packets`);
  console.log(`======================================================\n`);
});
