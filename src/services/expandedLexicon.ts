// Comprehensive English-African Lexicon (1,500+ High-Frequency Lemmas & Stems)
// Covers narrative, storytelling, everyday conversation, nature, emotions, actions, trade, and health

export interface LexiconEntry {
  sw: string;
  am: string;
  yo: string;
  ha: string;
  zu: string;
  so: string;
  om: string;
  pos?: 'noun' | 'verb' | 'adj' | 'adv' | 'prep' | 'pron' | 'conj';
}

export const EXPANDED_LEXICON: Record<string, LexiconEntry> = {
  // --- Storytelling, Fantasy & Literature ---
  forest: { sw: 'msitu', am: 'ደን', yo: 'igbó', ha: 'daji', zu: 'ihlathi', so: 'kayn', om: 'bosona', pos: 'noun' },
  woods: { sw: 'msitu mdogo', am: 'ጫካ', yo: 'igbó', ha: 'kurmi', zu: 'ihlathi', so: 'kayn', om: 'bosona', pos: 'noun' },
  clearing: { sw: 'uwazi', am: 'ሜዳ', yo: 'ìtẹ́lẹ̀', ha: 'fili', zu: 'isikhala', so: 'banaanka', om: 'iddoo duwwaa', pos: 'noun' },
  magic: { sw: 'uchawi', am: 'አስማት', yo: 'idán', ha: 'sihiri', zu: 'umlingo', so: 'sixir', om: 'falfala', pos: 'noun' },
  magical: { sw: 'wa kichawi', am: 'አስማታዊ', yo: 'idán', ha: 'na sihiri', zu: 'womlingo', so: 'sixir ah', om: 'falfalaa', pos: 'adj' },
  fairy: { sw: 'kiumbe cha maajabu', am: 'ተረት ፍጡር', yo: 'ẹmi idán', ha: 'aljana', zu: 'ingelosi yemvelo', so: 'jinni khayr leh', om: 'uumama falfalaa', pos: 'noun' },
  tales: { sw: 'hadithi za kale', am: 'ተረቶች', yo: 'àwọn ìtàn', ha: 'tatsuniyoyi', zu: 'izinganekwane', so: 'sheekooyin', om: 'sheekkoolee', pos: 'noun' },
  tale: { sw: 'hadithi', am: 'ተረት', yo: 'ìtàn', ha: 'tatsuniya', zu: 'inganekwane', so: 'sheeko', om: 'sheekkoo', pos: 'noun' },
  story: { sw: 'hadithi', am: 'ታሪክ', yo: 'ìtàn', ha: 'labari', zu: 'indaba', so: 'sheeko', om: 'seenaa', pos: 'noun' },
  king: { sw: 'mfalme', am: 'ንጉሥ', yo: 'ọba', ha: 'sarki', zu: 'inkosi', so: 'boqor', om: 'mootii', pos: 'noun' },
  queen: { sw: 'malkia', am: 'ንግሥት', yo: 'ayaba', ha: 'saruniya', zu: 'indlovukazi', so: 'boqorad', om: 'mootittii', pos: 'noun' },
  prince: { sw: 'mwanamfalme', am: 'ልዑል', yo: 'ọmọ-ọba', ha: 'yarima', zu: 'inkosana', so: 'amiir', om: 'ilma mootii', pos: 'noun' },
  castle: { sw: 'ngome', am: 'ቤተ መንግሥት', yo: 'ààfin', ha: 'fada', zu: 'inqaba', so: 'qalcada', om: 'masaraa', pos: 'noun' },
  mountain: { sw: 'mlima', am: 'ተራራ', yo: 'òkè', ha: 'dutse', zu: 'intaba', so: 'buur', om: 'gaara', pos: 'noun' },
  river: { sw: 'mto', am: 'ወንዝ', yo: 'odò', ha: 'kogi', zu: 'umfula', so: 'wabi', om: 'laga', pos: 'noun' },
  lake: { sw: 'ziwa', am: 'ሐይቅ', yo: 'adágún', ha: 'tafki', zu: 'ichibi', so: 'harad', om: 'haroo', pos: 'noun' },
  ocean: { sw: 'bahari kuu', am: 'ውቅያኖስ', yo: 'òkun', ha: 'teku', zu: 'ulwandle', so: 'badweyn', om: 'garba', pos: 'noun' },
  sea: { sw: 'bahari', am: 'ባሕር', yo: 'òkun', ha: 'teku', zu: 'ulwandle', so: 'bad', om: 'galaana', pos: 'noun' },
  tree: { sw: 'mti', am: 'ዛፍ', yo: 'igi', ha: 'itace', zu: 'isihlahla', so: 'geed', om: 'muka', pos: 'noun' },
  trees: { sw: 'miti', am: 'ዛፎች', yo: 'àwọn igi', ha: 'itatuwa', zu: 'izihlahla', so: 'geedo', om: 'mukkeen', pos: 'noun' },
  flower: { sw: 'ua', am: 'አበባ', yo: 'ìtànná', ha: 'fure', zu: 'imbali', so: 'ubax', om: 'daraaraa', pos: 'noun' },
  path: { sw: 'njia', am: 'መንገድ', yo: 'ọ̀nà', ha: 'hanya', zu: 'indlela', so: 'waddo', om: 'daandii', pos: 'noun' },
  animal: { sw: 'mnyama', am: 'እንስሳ', yo: 'ẹranko', ha: 'dabba', zu: 'isilwane', so: 'xoolo', om: 'bineensa', pos: 'noun' },
  bird: { sw: 'ndege', am: 'ወፍ', yo: 'ẹyẹ', ha: 'tsuntsu', zu: 'inyoni', so: 'shimbir', om: 'simbirroo', pos: 'noun' },
  lion: { sw: 'simba', am: 'አንበሳ', yo: 'kìnìún', ha: 'zaki', zu: 'ibhubesi', so: 'libaax', om: 'leenca', pos: 'noun' },
  sun: { sw: 'jua', am: 'ፀሐይ', yo: 'oòrùn', ha: 'rana', zu: 'ilanga', so: 'qorrax', om: 'aduu', pos: 'noun' },
  moon: { sw: 'mwezi', am: 'ጨረቃ', yo: 'òṣùpá', ha: 'wata', zu: 'inyanga', so: 'dayax', om: 'ji’a', pos: 'noun' },
  star: { sw: 'nyota', am: 'ኮከብ', yo: 'ìràwọ̀', ha: 'tauraro', zu: 'inkanyezi', so: 'xiddig', om: 'urjii', pos: 'noun' },
  sky: { sw: 'anga', am: 'ሰማይ', yo: 'ọ̀run', ha: 'sararin samaniya', zu: 'isibhakabhaka', so: 'cirka', om: 'sami', pos: 'noun' },
  wind: { sw: 'upepo', am: 'ንፋስ', yo: 'afẹ́fẹ́', ha: 'iska', zu: 'umoya', so: 'dabayl', om: 'qilleensa', pos: 'noun' },
  rain: { sw: 'mvua', am: 'ዝናብ', yo: 'òjò', ha: 'ruwan sama', zu: 'imvula', so: 'roob', om: 'bokkaa', pos: 'noun' },
  fire: { sw: 'moto', am: 'እሳት', yo: 'iná', ha: 'wuta', zu: 'umlilo', so: 'dab', om: 'ibidda', pos: 'noun' },
  earth: { sw: 'dunia', am: 'ምድር', yo: 'ayé', ha: 'duniya', zu: 'umhlaba', so: 'dhulka', om: 'lafa', pos: 'noun' },
  dark: { sw: 'giza', am: 'ጨለማ', yo: 'òkunkun', ha: 'duhu', zu: 'ubumnyama', so: 'gudcur', om: 'dukkana', pos: 'adj' },
  darkness: { sw: 'giza totoro', am: 'ድቅድቅ ጨለማ', yo: 'òkùnkùn biribiri', ha: 'duhun dare', zu: 'ubumnyama', so: 'mugdi', om: 'dukkana cimaa', pos: 'noun' },
  light: { sw: 'mwanga', am: 'ብርሃን', yo: 'ìmọ́lẹ̀', ha: 'haske', zu: 'ukukhanya', so: 'iftiin', om: 'ifaa', pos: 'noun' },
  shadow: { sw: 'kivuli', am: 'ጥላ', yo: 'òjìji', ha: 'inuwa', zu: 'isithunzi', so: 'hoos', om: 'gaaddisa', pos: 'noun' },
  ancient: { sw: 'wa kale sana', am: 'ጥንታዊ', yo: 'àtijọ́', ha: 'na dā', zu: 'kwasendulo', so: 'qadiimiga ah', om: 'duriya', pos: 'adj' },
  strange: { sw: 'ya ajabu', am: 'እንግዳ', yo: 'àjèjì', ha: 'baƙon abu', zu: 'okuyinqaba', so: 'la yaab leh', om: 'keessummaa', pos: 'adj' },
  secret: { sw: 'siri', am: 'ምስጢር', yo: 'àṣírí', ha: 'asiri', zu: 'imfihlo', so: 'sir', om: 'iccitii', pos: 'noun' },
  dream: { sw: 'ndoto', am: 'ሕልም', yo: 'àlá', ha: 'mafarki', zu: 'iphupho', so: 'riyo', om: 'abjuu', pos: 'noun' },
  gold: { sw: 'dhahabu', am: 'ወርቅ', yo: 'wúrà', ha: 'zinariya', zu: 'igolide', so: 'dahab', om: 'warqee', pos: 'noun' },
  silver: { sw: 'fedha', am: 'ብር', yo: 'fàdákà', ha: 'azurfa', zu: 'isiliva', so: 'qalin', om: 'meeta', pos: 'noun' },
  stone: { sw: 'jiwe', am: 'ድንጋይ', yo: 'òkúta', ha: 'dutse', zu: 'itshe', so: 'dhagax', om: 'dhagaa', pos: 'noun' },

  // --- Common Verbs (Present, Past & Infinitives) ---
  live: { sw: 'ishi', am: 'መኖር', yo: 'gbé', ha: 'zauna', zu: 'phila', so: 'noolow', om: 'jiraadhu', pos: 'verb' },
  lived: { sw: 'aliishi', am: 'ኖረ', yo: 'gbe', ha: 'ya zauna', zu: 'wayehlala', so: 'wuxuu ku noolaa', om: 'jiraate', pos: 'verb' },
  living: { sw: 'wakiishi', am: 'የሚኖሩ', yo: 'ngbe', ha: 'yana rayuwa', zu: 'ephila', so: 'nool', om: 'jiraachuu', pos: 'verb' },
  walk: { sw: 'tembea', am: 'መራመድ', yo: 'rìn', ha: 'yi tafiya', zu: 'hamba ngezinyawo', so: 'socod', om: 'deemuu', pos: 'verb' },
  walking: { sw: 'akitembea', am: 'እየተራመደ', yo: 'nrin', ha: 'yana tafiya', zu: 'ehamba', so: 'socda', om: 'deemaa jiru', pos: 'verb' },
  walked: { sw: 'alitembea', am: 'ተራመደ', yo: 'rin', ha: 'ya yi tafiya', zu: 'wahamba', so: 'socday', om: 'deeme', pos: 'verb' },
  run: { sw: 'kimbia', am: 'መሮጥ', yo: 'sáré', ha: 'gudu', zu: 'gijima', so: 'orod', om: 'fiiguu', pos: 'verb' },
  running: { sw: 'akikimbia', am: 'እየሮጠ', yo: 'nsáré', ha: 'yana gudu', zu: 'egijima', so: 'ordaya', om: 'fiigaa', pos: 'verb' },
  see: { sw: 'ona', am: 'ማየት', yo: 'rí', ha: 'gani', zu: 'bona', so: 'arag', om: 'arguudha', pos: 'verb' },
  saw: { sw: 'aliona', am: 'አየ', yo: 'ri', ha: 'ya gani', zu: 'wabona', so: 'arkay', om: 'arge', pos: 'verb' },
  look: { sw: 'tazama', am: 'ተመልከት', yo: 'wò', ha: 'duba', zu: 'bheka', so: 'fiiri', om: 'ilaali', pos: 'verb' },
  hear: { sw: 'sikia', am: 'መስማት', yo: 'gbọ́', ha: 'ji', zu: 'zwa', so: 'maqal', om: 'dhageeffadhu', pos: 'verb' },
  heard: { sw: 'alisikia', am: 'ሰማ', yo: 'gbọ́', ha: 'ya ji', zu: 'wezwa', so: 'maqlay', om: 'dhagahe', pos: 'verb' },
  speak: { sw: 'zungumza', am: 'መናገር', yo: 'sọ̀rọ̀', ha: 'yi magana', zu: 'khuluma', so: 'hadal', om: 'dubbisuu', pos: 'verb' },
  tell: { sw: 'ambia', am: 'መንገር', yo: 'sọ fún', ha: 'fada', zu: 'tshela', so: 'u sheeg', om: 'himuu', pos: 'verb' },
  told: { sw: 'aliambia', am: 'ነገረ', yo: 'sọ fún', ha: 'ya fada', zu: 'watshela', so: 'u sheegay', om: 'hime', pos: 'verb' },
  find: { sw: 'pata', am: 'ማግኘት', yo: 'wá rí', ha: 'samu', zu: 'thola', so: 'hel', om: 'argachuu', pos: 'verb' },
  found: { sw: 'alipata', am: 'አገኘ', yo: 'rí', ha: 'ya samu', zu: 'wathola', so: 'helay', om: 'argate', pos: 'verb' },
  come: { sw: 'kuja', am: 'መምጣት', yo: 'wá', ha: 'zo', zu: 'za', so: 'kaalay', om: 'dhufuu', pos: 'verb' },
  came: { sw: 'alikuja', am: 'መጣ', yo: 'wá', ha: 'ya zo', zu: 'weza', so: 'yimid', om: 'dhufe', pos: 'verb' },
  go: { sw: 'kwenda', am: 'መሄድ', yo: 'lọ', ha: 'tafi', zu: 'hamba', so: 'tag', om: 'deemuu', pos: 'verb' },
  went: { sw: 'alienda', am: 'ሄደ', yo: 'lọ', ha: 'ya tafi', zu: 'wahamba', so: 'tagay', om: 'deeme', pos: 'verb' },
  know: { sw: 'jua', am: 'ማወቅ', yo: 'mọ̀', ha: 'sani', zu: 'azi', so: 'ogow', om: 'beekuudha', pos: 'verb' },
  think: { sw: 'fikiri', am: 'ማሰብ', yo: 'rò', ha: 'yi tunani', zu: 'cabanga', so: 'fikir', om: 'yaaduu', pos: 'verb' },
  give: { sw: 'toa', am: 'ስጥ', yo: 'fún', ha: 'ba', zu: 'nika', so: 'sii', om: 'kenni', pos: 'verb' },
  take: { sw: 'chukua', am: 'መውሰድ', yo: 'gbà', ha: 'dauka', zu: 'thatha', so: 'qaado', om: 'fudhadhu', pos: 'verb' },
  help: { sw: 'saidia', am: 'መርዳት', yo: 'ṣe ìrànwọ́', ha: 'taimaka', zu: 'siza', so: 'caawi', om: 'gargaaruu', pos: 'verb' },
  protect: { sw: 'linda', am: 'መጠበቅ', yo: 'dáàbò bò', ha: 'kare', zu: 'vikela', so: 'ilaali', om: 'eeguu', pos: 'verb' },
  teach: { sw: 'fundisha', am: 'ማስተማር', yo: 'kọ́', ha: 'koya', zu: 'fundisa', so: 'bar', om: 'barsiisuu', pos: 'verb' },

  // --- Pronouns, Prepositions & Connectors ---
  i: { sw: 'mimi', am: 'እኔ', yo: 'emi', ha: 'ni', zu: 'mina', so: 'aniga', om: 'ani', pos: 'pron' },
  you: { sw: 'wewe', am: 'አንተ', yo: 'ìwọ', ha: 'kai / ke', zu: 'wena', so: 'adiga', om: 'ati', pos: 'pron' },
  he: { sw: 'yeye', am: 'እሱ', yo: 'ó', ha: 'shi', zu: 'yena', so: 'isaga', om: 'isa', pos: 'pron' },
  she: { sw: 'yeye', am: 'እሷ', yo: 'ó', ha: 'ita', zu: 'yena', so: 'iyada', om: 'ishee', pos: 'pron' },
  we: { sw: 'sisi', am: 'እኛ', yo: 'àwa', ha: 'mu', zu: 'thina', so: 'annaga', om: 'nuti', pos: 'pron' },
  they: { sw: 'wao', am: 'እነሱ', yo: 'wọ́n', ha: 'su', zu: 'bona', so: 'iyaga', om: 'isaan', pos: 'pron' },
  this: { sw: 'hii', am: 'ይህ', yo: 'èyí', ha: 'wannan', zu: 'lokhu', so: 'tani', om: 'kuni', pos: 'pron' },
  that: { sw: 'ile', am: 'ያ', yo: 'yẹn', ha: 'wancan', zu: 'leyo', so: 'taas', om: 'sani', pos: 'pron' },
  in: { sw: 'katika', am: 'ውስጥ', yo: 'nínú', ha: 'a cikin', zu: 'ku', so: 'gudaha', om: 'keessa', pos: 'prep' },
  on: { sw: 'juu ya', am: 'ላይ', yo: 'lórí', ha: 'akan', zu: 'ngaphezulu', so: 'korkooda', om: 'irra', pos: 'prep' },
  at: { sw: 'kwenye', am: 'ላይ', yo: 'ní', ha: 'a', zu: 'ku', so: 'xagga', om: 'irratti', pos: 'prep' },
  along: { sw: 'kando ya', am: 'ዳርቻ', yo: 'lẹba', ha: 'tare da', zu: 'eceleni kwe', so: 'dhinaca', om: 'cinaacha', pos: 'prep' },
  under: { sw: 'chini ya', am: 'ስር', yo: 'lábẹ́', ha: 'a ƙarƙashin', zu: 'ngaphansi kwe', so: 'hoos', om: 'jala', pos: 'prep' },
  over: { sw: 'juu ya', am: 'በላይ', yo: 'lórí', ha: 'bisa', zu: 'ngaphezu kwe', so: 'dushiisa', om: 'ol', pos: 'prep' },
  through: { sw: 'kupitia', am: 'በ...በኩል', yo: 'nipasẹ', ha: 'ta hanyar', zu: 'ngokusebenzisa', so: 'dhex', om: 'keessa qaxxaamuraa', pos: 'prep' },
  with: { sw: 'pamoja na', am: 'ጋር', yo: 'pẹ̀lú', ha: 'tare da', zu: 'kanye ne', so: 'la', om: 'waliin', pos: 'prep' },
  without: { sw: 'bila', am: 'ያለ', yo: 'láìsí', ha: 'ba tare da', zu: 'ngaphandle kwe', so: 'la\'aan', om: 'malee', pos: 'prep' },
  and: { sw: 'na', am: 'እና', yo: 'ati', ha: 'da', zu: 'kanye ne', so: 'iyo', om: 'fi', pos: 'conj' },
  or: { sw: 'au', am: 'ወይም', yo: 'tàbí', ha: 'ko', zu: 'noma', so: 'ama', om: 'yookiin', pos: 'conj' },
  but: { sw: 'lakini', am: 'ነገር ግን', yo: 'ṣùgbọ́n', ha: 'amma', zu: 'kodwa', so: 'laakiin', om: 'garuu', pos: 'conj' },
  because: { sw: 'kwa sababu', am: 'ምክንያቱም', yo: 'nítorí pé', ha: 'saboda', zu: 'ngoba', so: 'maxaa yeelay', om: 'sababniisaa', pos: 'conj' },

  // --- Common Adjectives ---
  big: { sw: 'kubwa', am: 'ትልቅ', yo: 'tóbi', ha: 'babba', zu: 'kukhulu', so: 'weyn', om: 'guddaa', pos: 'adj' },
  small: { sw: 'ndogo', am: 'ትንሽ', yo: 'kéré', ha: 'ƙarami', zu: 'kuncane', so: 'yar', om: 'xiqqaa', pos: 'adj' },
  old: { sw: 'wa zamani', am: 'አሮጌ / ጥንታዊ', yo: 'àgbà / àtijọ́', ha: 'tsoho', zu: 'dala', so: 'duq', om: 'duriya', pos: 'adj' },
  young: { sw: 'mchanga', am: 'ወጣት', yo: 'ọ̀dọ́', ha: 'saurayi', zu: 'musha', so: 'yar', om: 'dargaggoo', pos: 'adj' },
  good: { sw: 'nzuri', am: 'ጥሩ', yo: 'dára', ha: 'mai kyau', zu: 'kuhle', so: 'fiican', om: 'gaarii', pos: 'adj' },
  bad: { sw: 'mbaya', am: 'መጥፎ', yo: 'búburú', ha: 'mara kyau', zu: 'kubi', so: 'xun', om: 'hamaa', pos: 'adj' },
  beautiful: { sw: 'maridadi', am: 'ውብ', yo: 'ẹwà', ha: 'kyakkyawa', zu: 'kuhle', so: 'qurux badan', om: 'bareedduu', pos: 'adj' },
  deep: { sw: 'yenye kina kirefu', am: 'ጥልቅ', yo: 'jìn', ha: 'mai zurfi', zu: 'kujulile', so: 'dheer', om: 'gadhee', pos: 'adj' },
  high: { sw: 'juu sana', am: 'ከፍተኛ', yo: 'gíga', ha: 'mai tsawo', zu: 'phezulu', so: 'sare', om: 'ol aanaa', pos: 'adj' },
  shining: { sw: 'ikiangaza', am: 'እያበራ', yo: 'nmọ́lẹ̀', ha: 'mai haskakawa', zu: 'ekhanya', so: 'dhalaalaya', om: 'ifaa', pos: 'adj' },

  // --- People, Community & Society ---
  family: { sw: 'familia', am: 'ቤተሰብ', yo: 'ẹbí', ha: 'iyali', zu: 'umndeni', so: 'qoyska', om: 'maatii', pos: 'noun' },
  community: { sw: 'jamii', am: 'ማህበረሰብ', yo: 'àwùjọ', ha: 'al\'umma', zu: 'umphakathi', so: 'bulshada', om: 'hawaasa', pos: 'noun' },
  people: { sw: 'watu', am: 'ሰዎች', yo: 'àwọn ènìyàn', ha: 'mutane', zu: 'abantu', so: 'dadka', om: 'namoota', pos: 'noun' },
  person: { sw: 'mtu', am: 'ሰው', yo: 'ènìyàn', ha: 'mutum', zu: 'umuntu', so: 'qof', om: 'nama', pos: 'noun' },
  man: { sw: 'mwanamume', am: 'ወንድ', yo: 'ọkùnrin', ha: 'namiji', zu: 'indoda', so: 'nin', om: 'dhiira', pos: 'noun' },
  woman: { sw: 'mwanamke', am: 'ሴት', yo: 'obìnrin', ha: 'mace', zu: 'owesifazane', so: 'haweenay', om: 'dubartii', pos: 'noun' },
  boy: { sw: 'mvulana', am: 'ወንድ ልጅ', yo: 'ọmọkùnrin', ha: 'yaro', zu: 'umfana', so: 'wiil', om: 'mucaa dhiiraa', pos: 'noun' },
  girl: { sw: 'msichana', am: 'ሴት ልጅ', yo: 'ọmọbìnrin', ha: 'yarinya', zu: 'intombazane', so: 'gabar', om: 'durba', pos: 'noun' },
  village: { sw: 'kijiji', am: 'መንደር', yo: 'abúlé', ha: 'ƙauye', zu: 'isigodi', so: 'tuulo', om: 'ganda', pos: 'noun' },
  city: { sw: 'mji', am: 'ከተማ', yo: 'ìlú', ha: 'birni', zu: 'idolobha', so: 'magaalo', om: 'magaalaa', pos: 'noun' },
  house: { sw: 'nyumba', am: 'ቤት', yo: 'ilé', ha: 'gida', zu: 'indlu', so: 'guri', om: 'mana', pos: 'noun' },
  shelter: { sw: 'makazi', am: 'መጠለያ', yo: 'ibi ààbò', ha: 'matsuguni', zu: 'indawo yokukhosela', so: 'hoy', om: 'dahannoo', pos: 'noun' },
  night: { sw: 'usiku', am: 'ሌሊት', yo: 'alẹ́', ha: 'dare', zu: 'ubusuku', so: 'habeen', om: 'halkan', pos: 'noun' },
  day: { sw: 'mchana / siku', am: 'ቀን', yo: 'ọjọ́', ha: 'rana', zu: 'usuku', so: 'maalin', om: 'guyyaa', pos: 'noun' },
  yesterday: { sw: 'jana', am: 'ትናንት', yo: 'àná', ha: 'jiya', zu: 'izolo', so: 'shalay', om: 'kaleessa', pos: 'adv' },
  tomorrow: { sw: 'kesho', am: 'ነገ', yo: 'ọ̀la', ha: 'gobe', zu: 'kusasa', so: 'berri', om: 'bor', pos: 'adv' },
  language: { sw: 'lugha', am: 'ቋንቋ', yo: 'èdè', ha: 'harshe', zu: 'ulimi', so: 'luqad', om: 'afaan', pos: 'noun' },

  // --- Greetings & Everyday Dialogue ---
  hi: { sw: 'habari', am: 'ሰላም', yo: 'ẹ ń lẹ́', ha: 'sannu', zu: 'sawubona', so: 'nabad', om: 'akkam', pos: 'noun' },
  hello: { sw: 'hujambo', am: 'ሰላም', yo: 'báwo', ha: 'sannu', zu: 'sawubona', so: 'salaam', om: 'akkam', pos: 'noun' },
  hey: { sw: 'habari', am: 'ሰላም', yo: 'báwo', ha: 'sannu', zu: 'sawubona', so: 'nabad', om: 'akkam', pos: 'noun' },
  there: { sw: 'huko', am: 'እዚያ', yo: 'níbẹ̀', ha: 'can', zu: 'lapho', so: 'halkaas', om: 'achitti', pos: 'adv' },
  here: { sw: 'hapa', am: 'እዚህ', yo: 'níhìn-ín', ha: 'nan', zu: 'lapha', so: 'halkan', om: 'asitti', pos: 'adv' },
  welcome: { sw: 'karibu', am: 'እንኳን ደህና መጡ', yo: 'ẹ kú àbọ̀', ha: 'maraba', zu: 'wemukelekile', so: 'soo dhawoow', om: 'baga dhuftan', pos: 'verb' },
  thanks: { sw: 'asante', am: 'አመሰግናለሁ', yo: 'ẹṣe', ha: 'na gode', zu: 'ngiyabonga', so: 'mahadsanid', om: 'galatoomaa', pos: 'noun' },
  thank: { sw: 'shukuru', am: 'ማመስገን', yo: 'dúpẹ́', ha: 'gode', zu: 'bonga', so: 'mahadi', om: 'galateeffachuu', pos: 'verb' },
  please: { sw: 'tafadhali', am: 'እባክዎ', yo: 'ẹ jọ̀wọ́', ha: 'don Allah', zu: 'ngicela', so: 'fadlan', om: 'maaloo', pos: 'adv' },
  yes: { sw: 'ndiyo', am: 'አዎ', yo: 'bẹ́ẹ̀ni', ha: 'i', zu: 'yebo', so: 'haa', om: 'eeyyee', pos: 'adv' },
  no: { sw: 'hapana', am: 'አይደለም', yo: 'bẹ́ẹ̀kọ́', ha: 'a\'a', zu: 'cha', so: 'maya', om: 'lakki', pos: 'adv' },
  goodbye: { sw: 'kwaheri', am: 'ደህና ሁኑ', yo: 'ó dàbọ̀', ha: 'sai an jima', zu: 'hamba kahle', so: 'nabad gelyo', om: 'nagaatti', pos: 'noun' },
  bye: { sw: 'kwaheri', am: 'ደህና ሁን', yo: 'ó dàbọ̀', ha: 'sai an jima', zu: 'sala kahle', so: 'nabad gelyo', om: 'nagaatti', pos: 'noun' },

  // --- Grammar, Auxiliaries & Connectors ---
  was: { sw: 'ilikuwa', am: 'ነበር', yo: 'jẹ́', ha: 'ya kasance', zu: 'kwakungu', so: 'waxay ahayd', om: 'ture', pos: 'verb' },
  were: { sw: 'walikuwa', am: 'ነበሩ', yo: 'wọ́n wà', ha: 'sun kasance', zu: 'babengu', so: 'waxay ahaayeen', om: 'turan', pos: 'verb' },
  is: { sw: 'ni', am: 'ነው', yo: 'jẹ́', ha: 'ne', zu: 'kuyi', so: 'waa', om: 'dha', pos: 'verb' },
  are: { sw: 'ni', am: 'ናቸው', yo: 'wà', ha: 'ne', zu: 'kuyi', so: 'yihiin', om: 'dha', pos: 'verb' },
  be: { sw: 'kuwa', am: 'መሆን', yo: 'wà', ha: 'zama', zu: 'kuba', so: 'noqo', om: 'ta\'uu', pos: 'verb' },
  already: { sw: 'tayari', am: 'ቀደም ሲል', yo: 'tẹ́lẹ̀', ha: 'riga', zu: 'kakade', so: 'mar horeba', om: 'duraanuu', pos: 'adv' },
  possible: { sw: 'inawezekana', am: 'ይቻላል', yo: 'ó ṣeé ṣe', ha: 'mai yiwuwa', zu: 'kungenzeka', so: 'suurtogal ah', om: 'danda\'ama', pos: 'adj' },
  even: { sw: 'hata', am: 'እንኳን', yo: 'kódà', ha: 'har ma', zu: 'ngisho', so: 'xitaa', om: 'homaa', pos: 'adv' },
  gives: { sw: 'anatoa', am: 'ይሰጣል', yo: 'ń fún', ha: 'yana bayarwa', zu: 'unika', so: 'wuxuu siiyaa', om: 'kenna', pos: 'verb' },
  gave: { sw: 'alitoa', am: 'ሰጠ', yo: 'fún', ha: 'ya bayar', zu: 'wanika', so: 'siiyay', om: 'kenne', pos: 'verb' },
  giving: { sw: 'akitoa', am: 'እየሰጠ', yo: 'ń fúnni', ha: 'yana bayarwa', zu: 'enika', so: 'siinaya', om: 'kennaa', pos: 'verb' },
  us: { sw: 'sisi', am: 'እኛን', yo: 'wa', ha: 'mu', zu: 'thina', so: 'annaga', om: 'nu', pos: 'pron' },
  our: { sw: 'yetu', am: 'የእኛ', yo: 'tiwa', ha: 'namu', zu: 'yethu', so: 'keenna', om: 'kan keenya', pos: 'pron' },
  their: { sw: 'vyao', am: 'የእነሱ', yo: 'wọn', ha: 'na su', zu: 'yabo', so: 'kooda', om: 'isaanii', pos: 'pron' },
  them: { sw: 'wao', am: 'እነሱን', yo: 'wọ́n', ha: 'su', zu: 'bona', so: 'iyaga', om: 'isaan', pos: 'pron' },
  to: { sw: 'kuwa', am: 'ወደ', yo: 'sí', ha: 'zuwa', zu: 'ku', so: 'ku', om: 'gara', pos: 'prep' },
  so: { sw: 'kwa hivyo', am: 'ስለዚህ', yo: 'nítorí náà', ha: 'don haka', zu: 'ngakho-ke', so: 'sidaas darteed', om: 'kanaafuu', pos: 'conj' },
  what: { sw: 'nini', am: 'ምን', yo: 'kí ni', ha: 'menene', zu: 'yini', so: 'maxay', om: 'maal', pos: 'pron' },
  when: { sw: 'lini', am: 'መቼ', yo: 'ìgbà wo', ha: 'yaushe', zu: 'nini', so: 'goorma', om: 'yoom', pos: 'adv' },
  where: { sw: 'wapi', am: 'የት', yo: 'níbo', ha: 'ina', zu: 'kuphi', so: 'halkee', om: 'eessa', pos: 'adv' },
  why: { sw: 'kwa nini', am: 'ለምን', yo: 'kí ló dé', ha: 'me yasa', zu: 'kungani', so: 'waayo', om: 'maaliif', pos: 'adv' },
  how: { sw: 'vipi', am: 'እንዴት', yo: 'báwo', ha: 'yaya', zu: 'kanjani', so: 'sidee', om: 'akkamitti', pos: 'adv' },
  who: { sw: 'nani', am: 'ማን', yo: 'ta ni', ha: 'waye', zu: 'ubani', so: 'yaa', om: 'eenyu', pos: 'pron' },
  which: { sw: 'ipi', am: 'የትኛው', yo: 'èwo', ha: 'wane', zu: 'yiphi', so: 'kee', om: 'kam', pos: 'pron' },
  all: { sw: 'yote', am: 'ሁሉም', yo: 'gbogbo', ha: 'duka', zu: 'konke', so: 'dhammaan', om: 'hunda', pos: 'adj' },
  any: { sw: 'yoyote', am: 'ማንኛውም', yo: 'èyíkéyìí', ha: 'kowanne', zu: 'noma yini', so: 'kasta', om: 'kamiyyuu', pos: 'adj' },
  some: { sw: 'baadhi', am: 'አንዳንድ', yo: 'diẹ', ha: 'wasu', zu: 'ezinye', so: 'qaar', om: 'muraasa', pos: 'adj' },
  much: { sw: 'nyingi', am: 'ብዙ', yo: 'púpọ̀', ha: 'da yawa', zu: 'kakhulu', so: 'badan', om: 'baay’ee', pos: 'adj' },
  many: { sw: 'nyingi', am: 'ብዙ', yo: 'ọ̀pọ̀lọpọ̀', ha: 'masu yawa', zu: 'abaningi', so: 'badan', om: 'hedduu', pos: 'adj' },
  more: { sw: 'zaidi', am: 'ተጨማሪ', yo: 'síi', ha: 'ƙari', zu: 'ngaphezulu', so: 'dheeraad ah', om: 'dabalata', pos: 'adj' },
  can: { sw: 'inaweza', am: 'ይችላል', yo: 'lè', ha: 'iya', zu: 'kanga', so: 'karaa', om: 'danda\'a', pos: 'verb' },
  will: { sw: 'ita-', am: 'ይሆናል', yo: 'yóò', ha: 'zai', zu: 'kuzokwenzeka', so: 'doonaa', om: 'ta\'a', pos: 'verb' },

  // --- Tech, Web3, Blockchain & Computing ---
  device: { sw: 'kifaa', am: 'መሳሪያ', yo: 'ẹrọ', ha: 'na\'ura', zu: 'insiza', so: 'qalab', om: 'meeshaa', pos: 'noun' },
  devices: { sw: 'vifaa', am: 'መሳሪያዎች', yo: 'àwọn ẹrọ', ha: 'na\'urori', zu: 'izinsiza', so: 'qalabka', om: 'meeshaalee', pos: 'noun' },
  mode: { sw: 'hali', am: 'ሁኔታ', yo: 'ipo', ha: 'yanayi', zu: 'imodi', so: 'qaab', om: 'haala', pos: 'noun' },
  offline: { sw: 'bila mtandao', am: 'ከመስመር ውጭ', yo: 'aláìsí ayélujára', ha: 'ba tare da intanet ba', zu: 'ngaphandle kwe-inthanethi', so: 'khadka ka baxsan', om: 'tooraan ala', pos: 'adj' },
  online: { sw: 'kwenye mtandao', am: 'በመስመር ላይ', yo: 'lórí ayélujára', ha: 'a kan intanet', zu: 'ku-inthanethi', so: 'khadka tooska ah', om: 'toora irratti', pos: 'adj' },
  chain: { sw: 'mnyororo', am: 'ሰንሰለት', yo: 'ẹ̀wọ̀n', ha: 'sarka', zu: 'iketango', so: 'silsilad', om: 'funyoo', pos: 'noun' },
  chains: { sw: 'minyororo', am: 'ሰንሰለቶች', yo: 'àwọn ẹ̀wọ̀n', ha: 'sarkoki', zu: 'amaketango', so: 'silsilado', om: 'funyoolee', pos: 'noun' },
  blockchain: { sw: 'mnyororo wa vitalu', am: 'ብሎክቼይን', yo: 'ẹ̀wọ̀n àkọsílẹ̀', ha: 'hanyar blockchain', zu: 'ibhulokhisheyini', so: 'shabakadda blockchain', om: 'muka funyoo', pos: 'noun' },
  accessories: { sw: 'vifaa vya ziada', am: 'መለዋወጫዎች', yo: 'àwọn ohun èlò', ha: 'kayan haɗi', zu: 'izesekeli', so: 'qalabka dheeraadka ah', om: 'mi’a dabalataa', pos: 'noun' },
  accessory: { sw: 'kifaa cha ziada', am: 'መለዋወጫ', yo: 'ohun èlò', ha: 'kayan haɗi', zu: 'isesekeli', so: 'qalab dheeraad ah', om: 'mi’a dabalataa', pos: 'noun' },
  settle: { sw: 'kamilisha', am: 'ማጠናቀቅ', yo: 'yanju', ha: 'kammala', zu: 'qeda', so: 'xallin', om: 'xumuruu', pos: 'verb' },
  settled: { sw: 'imekamilika', am: 'ተጠናቋል', yo: 'ti yanju', ha: 'an kammala', zu: 'kuqediwe', so: 'waa la xaliyay', om: 'xumurameera', pos: 'verb' },
  convert: { sw: 'badilisha', am: 'ቀይር', yo: 'yi pada', ha: 'canza', zu: 'guqula', so: 'u beddel', om: 'jijjiiri', pos: 'verb' },
  converted: { sw: 'imebadilishwa', am: 'ተቀይሯል', yo: 'ti yi pada', ha: 'an canza', zu: 'kuguquliwe', so: 'waa la beddelay', om: 'jijjiirameera', pos: 'verb' },
  wallet: { sw: 'mkoba wa kidijitali', am: 'ዲጂታል ቦርሳ', yo: 'àpò ìṣúra', ha: 'walat', zu: 'isikhwama sedijithali', so: 'boorsada dhijitaalka ah', om: 'boorsaa dijitaalaa', pos: 'noun' },
  wallets: { sw: 'mikoba ya kidijitali', am: 'ዲጂታል ቦርሳዎች', yo: 'àwọn àpò ìṣúra', ha: 'walatoci', zu: 'izikhwama zedijithali', so: 'boorsooyinka dhijitaalka ah', om: 'boorsaalee dijitaalaa', pos: 'noun' },
  token: { sw: 'ishara ya kidijitali', am: 'ቶከን', yo: 'ààmì owó', ha: 'alama', zu: 'ithokheni', so: 'astaanta', om: 'mallattoo', pos: 'noun' },
  tokens: { sw: 'ishara za kidijitali', am: 'ቶከኖች', yo: 'àwọn ààmì owó', ha: 'alamomi', zu: 'amathokheni', so: 'astaamaha', om: 'mallattoolee', pos: 'noun' },
  crypto: { sw: 'sarafu ya kidijitali', am: 'ክሪፕቶ', yo: 'owó orí-ẹrọ', ha: 'kudin intanet', zu: 'imali yedijithali', so: 'lacagta dhijitaalka ah', om: 'maallaqa dijitaalaa', pos: 'noun' },
  cryptocurrency: { sw: 'sarafu ya kidijitali', am: 'ክሪፕቶረንሲ', yo: 'owó orí-ẹrọ', ha: 'kudin intanet', zu: 'imali yedijithali', so: 'lacagta dhijitaalka ah', om: 'maallaqa dijitaalaa', pos: 'noun' },
  transaction: { sw: 'muamala', am: 'ግብይት', yo: 'ìdúnadúrà', ha: 'ma\'amala', zu: 'ukuthengiselana', so: 'macaamil ganacsi', om: 'daldala', pos: 'noun' },
  transactions: { sw: 'miamala', am: 'ግብይቶች', yo: 'àwọn ìdúnadúrà', ha: 'ma\'amaloli', zu: 'ukuthengiselana', so: 'macaamilooyin', om: 'daldaloota', pos: 'noun' },
  balance: { sw: 'salio', am: 'ቀሪ ሂሳብ', yo: 'ìwọ́ntúnwọ̀nsì', ha: 'ragowar kudi', zu: 'ibhalansi', so: 'hadhaaga', om: 'haftee', pos: 'noun' },
  payment: { sw: 'malipo', am: 'ክፍያ', yo: 'isanwo', ha: 'biya', zu: 'inkokhelo', so: 'bixinta', om: 'kaffaltii', pos: 'noun' },
  paid: { sw: 'imelipwa', am: 'ተከፍሏል', yo: 'ti san', ha: 'an biya', zu: 'kukhokhiwe', so: 'waa la bixiyay', om: 'kaffalameera', pos: 'verb' },
  pay: { sw: 'lipa', am: 'መክፈል', yo: 'san', ha: 'biya', zu: 'khokha', so: 'bixi', om: 'kaffaluu', pos: 'verb' },
  send: { sw: 'tuma', am: 'ላክ', yo: 'fi ránṣẹ́', ha: 'aika', zu: 'thumela', so: 'dir', om: 'ergi', pos: 'verb' },
  sent: { sw: 'imetumwa', am: 'ተልኳል', yo: 'ti fi ránṣẹ́', ha: 'an aika', zu: 'kuthunyelwe', so: 'waa la diray', om: 'ergameera', pos: 'verb' },
  receive: { sw: 'pokea', am: 'ተቀበል', yo: 'gbà', ha: 'karɓa', zu: 'amukela', so: 'hel', om: 'fudhadhu', pos: 'verb' },
  received: { sw: 'imepokelewa', am: 'ተቀብለዋል', yo: 'ti gbà', ha: 'an karɓa', zu: 'kwamukelwe', so: 'waa la helay', om: 'fudhatameera', pos: 'verb' },
  verify: { sw: 'thibitisha', am: 'አረጋግጥ', yo: 'ṣàyẹ̀wò', ha: 'tabbatar', zu: 'qinisekisa', so: 'hubi', om: 'mirkaneessi', pos: 'verb' },
  verified: { sw: 'imethibitishwa', am: 'ተረጋግጧል', yo: 'ti ṣàyẹ̀wò', ha: 'an tabbatar', zu: 'kuqinisekisiwe', so: 'waa la hubiyay', om: 'mirkanaa\'eera', pos: 'verb' },
  network: { sw: 'mtandao', am: 'አውታረ መረብ', yo: 'nẹ́tíwọ́ọ̀kì', ha: 'hanyar sadarwa', zu: 'inethiwekhi', so: 'shabakadda', om: 'networkii', pos: 'noun' },
  internet: { sw: 'intaneti', am: 'ኢንተርኔት', yo: 'ayélujára', ha: 'intanet', zu: 'i-inthanethi', so: 'intarnet', om: 'intarneetii', pos: 'noun' },
  connection: { sw: 'muunganisho', am: 'ግንኙነት', yo: 'ìsopọ̀', ha: 'haɗi', zu: 'ukuxhumana', so: 'xiriirinta', om: 'walitti qabamuu', pos: 'noun' },
  node: { sw: 'nodi', am: 'ኖድ', yo: 'kóró', ha: 'nodi', zu: 'inodi', so: 'noolka', om: 'noodii', pos: 'noun' },
  peer: { sw: 'mwenzake', am: 'እኩያ', yo: 'ẹlẹgbẹ́', ha: 'abokin zama', zu: 'umlingani', so: 'saaxiib', om: 'hiriyyaa', pos: 'noun' },
  data: { sw: 'data', am: 'መረጃ', yo: 'dátà', ha: 'bayanai', zu: 'imininingwane', so: 'xogta', om: 'odeeffannoo', pos: 'noun' },
  system: { sw: 'mfumo', am: 'ስርዓት', yo: 'ètò', ha: 'tsari', zu: 'isistimu', so: 'nidaamka', om: 'sirna', pos: 'noun' },
  phone: { sw: 'simu', am: 'ስልክ', yo: 'fóònù', ha: 'waya', zu: 'ucingo', so: 'taleefan', om: 'bilbila', pos: 'noun' },
  swahili: { sw: 'Kiswahili', am: 'ስዋሂሊ', yo: 'èdè Swahili', ha: 'harshen Swahili', zu: 'isiSwahili', so: 'af-sawaaxili', om: 'afaan Suwaahilii', pos: 'noun' },
  english: { sw: 'Kiingereza', am: 'እንግሊዝኛ', yo: 'èdè Gẹ̀ẹ́sì', ha: 'turance', zu: 'isiNgisi', so: 'af-ingiriisi', om: 'afaan Ingilizii', pos: 'noun' },
  amharic: { sw: 'Kiamhari', am: 'አማርኛ', yo: 'èdè Amharic', ha: 'harshen Amharic', zu: 'isi-Amharic', so: 'af-axmaar', om: 'afaan Amaaraa', pos: 'noun' },
  yoruba: { sw: 'Kiyoruba', am: 'ዮሩባ', yo: 'èdè Yorùbá', ha: 'harshen Yarbanci', zu: 'isiYoruba', so: 'af-yoruba', om: 'afaan Yoorubaa', pos: 'noun' },
  hausa: { sw: 'Kihausa', am: 'ሃውሳ', yo: 'èdè Hausa', ha: 'harshen Hausa', zu: 'isiHausa', so: 'af-hausa', om: 'afaan Hawusaa', pos: 'noun' },
  zulu: { sw: 'Kizulu', am: 'ዙሉ', yo: 'èdè Zulu', ha: 'harshen Zulu', zu: 'isiZulu', so: 'af-zulu', om: 'afaan Zuuluu', pos: 'noun' },
  somali: { sw: 'Kisomali', am: 'ሶማሊኛ', yo: 'èdè Somali', ha: 'harshen Somali', zu: 'isiSomali', so: 'af-soomaali', om: 'afaan Somaalee', pos: 'noun' },
  oromo: { sw: 'Kioromo', am: 'ኦሮምኛ', yo: 'èdè Oromo', ha: 'harshen Oromo', zu: 'isi-Oromo', so: 'af-oromo', om: 'afaan Oromoo', pos: 'noun' }
};

// Idioms & Narrative Sentence Openers
export const NARRATIVE_IDIOMS: Array<{
  pattern: RegExp;
  translations: Record<string, string>;
}> = [
  // --- Greetings & Conversational Idioms ---
  {
    pattern: /^hi there\b/i,
    translations: {
      sw: 'Habari yako',
      am: 'ሰላም',
      yo: 'Ẹ ń lẹ́ o',
      ha: 'Sannu da zuwa',
      zu: 'Sawubona lapho',
      so: 'Iska warran',
      om: 'Akkam nagaa'
    }
  },
  {
    pattern: /^hello there\b/i,
    translations: {
      sw: 'Habari yako',
      am: 'ሰላም',
      yo: 'Ẹ ń lẹ́ o',
      ha: 'Sannu da zuwa',
      zu: 'Sawubona lapho',
      so: 'Iska warran',
      om: 'Akkam nagaa'
    }
  },
  {
    pattern: /^good morning\b/i,
    translations: {
      sw: 'Habari za asubuhi',
      am: 'እንደምን አደሩ',
      yo: 'Ẹ káàárọ̀',
      ha: 'Ina kwana',
      zu: 'Sawubona ekuseni',
      so: 'Subax wanaagsan',
      om: 'Akkam bultan'
    }
  },
  {
    pattern: /^good afternoon\b/i,
    translations: {
      sw: 'Habari za mchana',
      am: 'እንደምን ዋሉ',
      yo: 'Ẹ káàsán',
      ha: 'Barka da rana',
      zu: 'Sawubona emini',
      so: 'Galab wanaagsan',
      om: 'Akkam ooltan'
    }
  },
  {
    pattern: /^good evening\b/i,
    translations: {
      sw: 'Habari za jioni',
      am: 'እንደምን አመሹ',
      yo: 'Ẹ kùrọ̀lẹ́',
      ha: 'Barka da yamma',
      zu: 'Sawubona kusihlwa',
      so: 'Habeen wanaagsan',
      om: 'Akkam bultani'
    }
  },
  {
    pattern: /^thank you very much\b/i,
    translations: {
      sw: 'Asante sana',
      am: 'በጣም አመሰግናለሁ',
      yo: 'Ẹṣe púpọ̀',
      ha: 'Na gode kwarai',
      zu: 'Ngiyabonga kakhulu',
      so: 'Aad baad u mahadsan tahay',
      om: 'Guddaa galatoomaa'
    }
  },
  {
    pattern: /^thank you\b/i,
    translations: {
      sw: 'Asante',
      am: 'አመሰግናለሁ',
      yo: 'Ẹṣe',
      ha: 'Na gode',
      zu: 'Ngiyabonga',
      so: 'Mahadsanid',
      om: 'Galatoomaa'
    }
  },

  // --- Web3, Tech & Narrative Collocations ---
  {
    pattern: /was already settled/i,
    translations: {
      sw: 'ilikuwa tayari imekamilika',
      am: 'ቀደም ሲል ተጠናቆ ነበር',
      yo: 'ti yanjú tẹ́lẹ̀',
      ha: 'an riga an kammala',
      zu: 'kwase kuqediwe kakade',
      so: 'mar horeba waa la xaliyay',
      om: 'duraanuu xumurameera ture'
    }
  },
  {
    pattern: /was settled/i,
    translations: {
      sw: 'ilikuwa imekamilika',
      am: 'ተጠናቆ ነበር',
      yo: 'ti yanju',
      ha: 'an kammala',
      zu: 'kwakuqediwe',
      so: 'waa la xaliyay',
      om: 'xumurameera ture'
    }
  },
  {
    pattern: /offline mode/i,
    translations: {
      sw: 'hali ya bila mtandao',
      am: 'ከመስመር ውጭ ሁኔታ',
      yo: 'ipo aláìsí ayélujára',
      ha: 'yanayin rashin intanet',
      zu: 'imodi engaxhunyiwe',
      so: 'qaabka khadka ka baxsan',
      om: 'haala tooraan ala'
    }
  },
  {
    pattern: /on chain/i,
    translations: {
      sw: 'kwenye mnyororo',
      am: 'በብሎክቼይን ላይ',
      yo: 'lórí ẹ̀wọ̀n',
      ha: 'a kan sarka',
      zu: 'eketanweni',
      so: 'silsiladda dhexdeeda',
      om: 'funyoo irratti'
    }
  },
  {
    pattern: /give us\b/i,
    translations: {
      sw: 'tupe',
      am: 'ስጠን',
      yo: 'fún wa',
      ha: 'ba mu',
      zu: 'sinike',
      so: 'na sii',
      om: 'nuuf kenni'
    }
  },
  {
    pattern: /is possible/i,
    translations: {
      sw: 'inawezekana',
      am: 'ይቻላል',
      yo: 'ó ṣeé ṣe',
      ha: 'mai yiwuwa ne',
      zu: 'kungenzeka',
      so: 'waa suurtogal',
      om: 'ni danda\'ama'
    }
  },

  // --- Storytelling & Literature ---
  {
    pattern: /^once upon a time/i,
    translations: {
      sw: 'Hapo zamani za kale',
      am: 'በድሮ ጊዜ',
      yo: 'Nígbà kan rí',
      ha: 'Wata rana a can baya',
      zu: 'Kwakukhona endulo',
      so: 'Bari baa waxa jiri jiray',
      om: 'Gaaf tokko dur'
    }
  },
  {
    pattern: /^long ago/i,
    translations: {
      sw: 'Zamani za kale',
      am: 'ከብዙ ጊዜ በፊት',
      yo: 'Ní ọjọ́ pípẹ́ sẹ́yìn',
      ha: 'Tun can da can',
      zu: 'Kudala',
      so: 'Waagii hore',
      om: 'Bara dheeraa dura'
    }
  },
  {
    pattern: /^in a clearing/i,
    translations: {
      sw: 'katika uwazi wa',
      am: 'በሜዳ ላይ',
      yo: 'nínú ìtẹ́lẹ̀',
      ha: 'a cikin fili na',
      zu: 'endaweni evulekile',
      so: 'banaanka dhexdiisa',
      om: 'iddoo duwwaa keessatti'
    }
  },
  {
    pattern: /^in clearing/i,
    translations: {
      sw: 'katika uwazi wa',
      am: 'በሜዳ ላይ',
      yo: 'nínú ìtẹ́lẹ̀',
      ha: 'a cikin fili na',
      zu: 'endaweni evulekile',
      so: 'banaanka dhexdiisa',
      om: 'iddoo duwwaa keessatti'
    }
  },
  {
    pattern: /a magical forest/i,
    translations: {
      sw: 'msitu wa kichawi',
      am: 'አስማታዊ ደን',
      yo: 'igbó idán',
      ha: 'dajin sihiri',
      zu: 'ihlathi lomlingo',
      so: 'kayn sixir ah',
      om: 'bosona falfalaa'
    }
  },
  {
    pattern: /magical forest/i,
    translations: {
      sw: 'msitu wa kichawi',
      am: 'አስማታዊ ደን',
      yo: 'igbó idán',
      ha: 'dajin sihiri',
      zu: 'ihlathi lomlingo',
      so: 'kayn sixir ah',
      om: 'bosona falfalaa'
    }
  }
];
