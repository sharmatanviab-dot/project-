// Comprehensive 30+ Pan-African Cross-Border Emergency & Trade Phrasebook
// Languages: English (en), Swahili (sw), Amharic (am), Yoruba (yo), Hausa (ha), Zulu (zu), Somali (so), Oromo (om)

export interface PhraseItem {
  id: string;
  category: 'trade' | 'medical' | 'customs' | 'transit' | 'emergency';
  title: string;
  en: string;
  sw: string;
  am: string;
  yo: string;
  ha: string;
  zu: string;
  so: string;
  om: string;
}

export const OFFLINE_PHRASEBOOK: PhraseItem[] = [
  // --- TRADE & MARKET (1 - 7) ---
  {
    id: 'trade-price',
    category: 'trade',
    title: 'Final Price / Bargaining',
    en: 'What is the final discounted price for this item?',
    sw: 'Bei ya mwisho yenye punguzo kwa bidhaa hii ni ngapi?',
    am: 'ለዚህ ዕቃ የመጨረሻው ቅናሽ የተደረገበት ዋጋ ስንት ነው?',
    yo: 'Kini iye owo ti o kẹhin pẹlu ẹdinwo fun nkan yii?',
    ha: 'Nawa ne kudin karshe tare da ragi na wannan abu?',
    zu: 'Yimalini inani lokugcina elinephromoshini lale nto?',
    so: 'Waa immisa qiimaha ugu dambeeya ee dhimista leh ee alaabtan?',
    om: 'Gatiin dhumaa kan hir’ifamee mi’a kanaaf meeqa?'
  },
  {
    id: 'trade-bulk',
    category: 'trade',
    title: 'Wholesale Grain Sacks',
    en: 'I want to purchase ten sacks of dry maize and beans.',
    sw: 'Ninataka kununua magunia kumi ya mahindi makavu na maharagwe.',
    am: 'አስር ከረጢት የደረቀ በቆሎ እና ባቄላ መግዛት እፈልጋለሁ።',
    yo: 'Mo fẹ ra apo mẹwa ti agbado gbigbe ati ewa.',
    ha: 'Ina son sayen buhuna goma na busasshen masara da wake.',
    zu: 'Ngifuna ukuthenga izikhwama eziyishumi zombila owomile nobhontshisi.',
    so: 'Waxaan rabaa inaan iibsado toban kiish oo galley qalalan iyo digir ah.',
    om: 'Boqqoolloo gogaa fi baaqelaa kiishii kudhan bituu barbaada.'
  },
  {
    id: 'trade-payment-mpesa',
    category: 'trade',
    title: 'Mobile Money / M-Pesa',
    en: 'Do you accept mobile money transfer or only cash shillings?',
    sw: 'Je, unakubali malipo ya simu (M-Pesa) au fedha taslimu pekee?',
    am: 'የሞባይል ገንዘብ ዝውውር ትቀበላላችሁ ወይስ የጥሬ ገንዘብ ሽልንግ ብቻ?',
    yo: 'Ṣe o gba gbigbe owo alagbeka tabi owo sisan nikan?',
    ha: 'Kuna karbar kudin wayar hannu ko kudi a hannu kawai?',
    zu: 'Ingabe uyayemukela imali yeselula noma ukheshi kuphela?',
    so: 'Ma aqbashaa lacagta mobaylka mise lacag caddaan ah oo kaliya?',
    om: 'Kaffaltii moobaayilaa ni fudhattuu moo maallaqa callaa qofa?'
  },
  {
    id: 'trade-receipt',
    category: 'trade',
    title: 'Official Commercial Receipt',
    en: 'Please provide a stamped official receipt for tax clearance.',
    sw: 'Tafadhali nipe risiti rasmi yenye muhuri kwa ukaguzi wa ushuru.',
    am: 'እባክዎ ለግብር ማጣሪያ የታሸገ ይፋዊ ደረሰኝ ይስጡኝ።',
    yo: 'Jọwọ pese iwe-ẹri osise ti o ni ontẹ fun ifasilẹ owo-ori.',
    ha: 'Da fatan za a ba da takardar kudi ta hukuma mai hatimi don haraji.',
    zu: 'Sicela unikeze irisidi esemthethweni enesitembu sokuhlolwa kwentela.',
    so: 'Fadlan bixi rasiid rasmi ah oo shaabadeysan si loogu xisaabiyo canshuurta.',
    om: 'Adaraa nagahee seeraa kan chaappaa qabu kaffaltii gibiraaf naaf kennaa.'
  },
  {
    id: 'trade-quality',
    category: 'trade',
    title: 'Damaged Goods Inspection',
    en: 'Three cartons arrived damaged and broken; replace them.',
    sw: 'Maboksi matatu yamefika yakiwa yameharibika na kuvunjika; yabadilishe.',
    am: 'ሦስት ሳጥኖች ተጎድተው እና ተሰብረው ደርሰዋል፤ እባክዎ ይቀይሯቸው።',
    yo: 'Awọn paali mẹta de pẹlu ibajẹ ati fifọ; rọpo wọn.',
    ha: 'Katoni uku sun isa sun lalace kuma sun karye; maye gurbinsu.',
    zu: 'Amabhokisi amathathu afike elimele futhi ephukile; washintshe.',
    so: 'Saddex kartoon waxay yimaadeen iyagoo burbursan oo jabay; baddal iyaga.',
    om: 'Saanduqni sadii miidhamanii fi cabanii dhufan; naaf jijjiiraa.'
  },
  {
    id: 'trade-weight-scale',
    category: 'trade',
    title: 'Certified Weighing Scale',
    en: 'Please weigh these produce sacks on the calibrated digital scale.',
    sw: 'Tafadhali pima magunia haya ya mazao kwenye mzani wa dijitali uliothibitishwa.',
    am: 'እባክዎ እነዚህን የሰብል ከረጢቶች በተረጋገጠው ዲጂታል ሚዛን ላይ ይመዝኗቸው።',
    yo: 'Jọwọ wọn awọn baagi oko wọnyi lori iwọn oni-nọmba ti a fọwọsi.',
    ha: 'Da fatan a auna wadannan buhunan amfanin gona a kan sikelin dijital.',
    zu: 'Sicela ulinganise lezi zikhwama zesivuno esikalini sedijithali esiqinisekisiwe.',
    so: 'Fadlan ku miisaan kiishashkan miisaanka dijitaalka ah ee la hubiyey.',
    om: 'Adaraa kiishii oomisha kana madaallii dijitaalaa mirkanaa’e irratti madaalaa.'
  },
  {
    id: 'trade-exchange-rate',
    category: 'trade',
    title: 'Currency Exchange Rate',
    en: 'What is the current exchange rate between US Dollars and local currency?',
    sw: 'Kiwango cha sasa cha kubadilisha Dola za Marekani na sarafu ya hapa ni ngapi?',
    am: 'የአሜሪካ ዶላር እና የአገር ውስጥ ገንዘብ የአሁኑ የምንዛሪ ዋጋ ስንት ነው?',
    yo: 'Kini oṣuwọn paṣipaarọ lọwọlọwọ laarin Dọla ati owo agbegbe?',
    ha: 'Menene kudin canjin yanzu tsakanin Dalar Amurka da kudin gida?',
    zu: 'Ithini intengo yokushintshanisa yemali yaseMelika nemali yendawo?',
    so: 'Waa intee heerka sarrifka ee u dhexeeya Doolarka iyo lacagta maxalliga ah?',
    om: 'Doolaara Ameerikaa fi maallaqa naannoo gidduutti gatiin jijjiirraa meeqa?'
  },

  // --- MEDICAL & CLINICAL EMERGENCY (8 - 14) ---
  {
    id: 'med-chest',
    category: 'medical',
    title: 'Severe Acute Chest Pain',
    en: 'The patient has severe crushing chest pain and shortness of breath.',
    sw: 'Mgonjwa ana maumivu makali ya kubana kifuani na kukosa pumzi.',
    am: 'በሽተኛው ከባድ የደረት መቆንጠጥ ህመም እና የትንፋሽ እጥረት አለበት።',
    yo: 'Alaisan naa ni irora lile ni agbegbe àyà ati iṣoro mimi.',
    ha: 'Majiyyacin yana da matsanancin ciwon kirji mai tsanani da wahalar numfashi.',
    zu: 'Isiguli sinobuhlungu obukhulu obucindezelayo esifubeni kanye nokuphelelwa umoya.',
    so: 'Bukaanku wuxuu dareemayaa xanuun daran oo cadaadinaya laabta iyo neefta oo qabata.',
    om: 'Dhukkubsataan qoma ciniinsuu cimaa fi hafuura dhabuu qaba.'
  },
  {
    id: 'med-malaria',
    category: 'medical',
    title: 'High Malaria Fever & Chills',
    en: 'The child has high fever, violent shivering, and vomiting since yesterday.',
    sw: 'Mtoto ana homa kali, anatetemeka sana, na anatapika tangu jana.',
    am: 'ልጁ ከትናንት ጀምሮ ከፍተኛ ትኩሳት፣ ኃይለኛ ብርድ ብርድ ማለት እና ማስታወክ አለበት።',
    yo: 'Ọmọ naa ni ibà giga, gbigbọn lile, ati eebi lati ana wa.',
    ha: 'Yaron yana da zazzabi mai zafi, rawar jiki mai karfi, da amai tun jiya.',
    zu: 'Ingane inomkhuhlane ophakeme, iyaqhaqhazela kakhulu, futhi iyahlanza kusukela izolo.',
    so: 'Ilmaha waxaa haya qandho daran, gariir xooggan, iyo matag ilaa shalay.',
    om: 'Daa’imni qorrisiisa cimaa, hoollachuufi haqqisuu kaleessaa eegalee qaba.'
  },
  {
    id: 'med-maternal',
    category: 'medical',
    title: 'Maternal Labor Contractions',
    en: 'The expectant mother is in active labor contractions every three minutes.',
    sw: 'Mama mjamzito ana uchungu mkali wa uzazi kila baada ya dakika tatu.',
    am: 'ነፍሰ ጡር እናቷ በየሦስት ደቂቃው ኃይለኛ የምጥ ህመም ላይ ትገኛለች።',
    yo: 'Iya ti o loyun wa ninu irora ibimọ ni gbogbo iṣẹju mẹta.',
    ha: 'Mace mai ciki tana fama da nakuda a kowane minti uku.',
    zu: 'Umama okhulelwe uhelelwa yimihelo yobuhlungu njalo ngemizuzu emithathu.',
    so: 'Hooyada uurka leh waxay dareemeysaa fool daran saddexdii daqiiqaba mar.',
    om: 'Haati ulfaa daqiiqaa sadii sadiin ciniinsuu da’umsaa cimaa keessa jirti.'
  },
  {
    id: 'med-dehydration',
    category: 'medical',
    title: 'Severe Dehydration & ORS',
    en: 'Prepare oral rehydration salts immediately; the patient is severely dehydrated.',
    sw: 'Andaa chumvi ya maji mwilini (ORS) mara moja; mgonjwa amepungukiwa maji sana.',
    am: 'የአፍ ድርቀት መከላከያ ጨው (ORS) በአስቸኳይ ያዘጋጁ፤ በሽተኛው በከፍተኛ ሁኔታ ደርቋል።',
    yo: 'Pese omi iyọ ati suga (ORS) lẹsẹkẹsẹ; alaisan ti gbẹ omi lara pupọ.',
    ha: 'Shirya maganin ruwan gishiri da sukari (ORS) nan take; majiyyacin ya rasa ruwa sosai.',
    zu: 'Lungiselela usawoti wokubuyisela amanzi emzimbeni (ORS) ngokushesha; isiguli siphelelwe amanzi.',
    so: 'U diyaari cusbada fuuqcelinta (ORS) degdeg; bukaanka aad buu u fuuqbaxay.',
    om: 'Dhadha’aa soogidda fuulaa (ORS) battalumatti qopheessaa; dhukkubsataan garmalee dheeboteera.'
  },
  {
    id: 'med-allergy',
    category: 'medical',
    title: 'Severe Drug Allergy',
    en: 'Does the patient have any known allergies to penicillin or sulfur drugs?',
    sw: 'Je, mgonjwa ana mzio wowote unaojulikana wa dawa za penisilini au salfa?',
    am: 'በሽተኛው ለፔኒሲሊን ወይም ለሰልፈር መድኃኒቶች የታወቀ አለርጂ አለበት?',
    yo: 'Ṣe alaisan naa ni eyikeyi inira ti a mọ si awọn oogun penicillin tabi sulfur?',
    ha: 'Shin majiyyacin yana da wani rashin lafiyar da aka sani ga maganin penicillin ko sulfur?',
    zu: 'Ingabe isiguli sinokungezwani okwaziwayo nemithi ye-penicillin noma ye-sulfur?',
    so: 'Ma leeyahay bukaanku xasaasiyad la yaqaan oo ku saabsan daawada penicillin ama sulfur?',
    om: 'Dhukkubsataan qoricha peenisiliinii yookiin sulfeerii irratti alarjii qabaa?'
  },
  {
    id: 'med-bleeding',
    category: 'medical',
    title: 'Severe Wound Hemorrhage',
    en: 'Apply direct pressure and a sterile tourniquet to stop arterial bleeding.',
    sw: 'Kandamiza moja kwa moja na funga bandeji tasa kuzuia damu inayotiririka.',
    am: 'የደም መፍሰስን ለማቆም ቀጥተኛ ጫና ያድርጉ እና ንጹህ ማሰሪያ ያስሩ።',
    yo: 'Tẹ taara ki o so aṣọ abẹrẹ to mọ lati da ẹjẹ to n san duro.',
    ha: 'Latsa kai tsaye kuma a daure bandeji mai tsafta don dakatar da zubar jini.',
    zu: 'Cindezela ngqo bese ubopha ibhandeshi elihlanzekile ukuvimba ukopha kwegazi.',
    so: 'Si toos ah u cadaadi oo ku xir faashad nadiif ah si aad u joojiso dhiigbaxa.',
    om: 'Dhiiga dhaabuuf dhiibbaa kallattii godhaa fi boocoo qulqulluu hidhaa.'
  },
  {
    id: 'med-snakebite',
    category: 'medical',
    title: 'Venomous Snake Bite',
    en: 'The victim was bitten by a venomous viper; keep the limb immobilized.',
    sw: 'Mhanga ameng\'atwa na nyoka mwenye sumu; usiutikishe mguu au mkono.',
    am: 'ተጎጂው መርዛማ እባብ ነድፎታል፤ የተነደፈውን እጅ ወይም እግር እንዳይንቀሳቀስ አድርጉ።',
    yo: 'Ejò olóró bu ẹni naa jẹ; ma ṣe jẹ ki apa tabi ẹsẹ rẹ gbe.',
    ha: 'Maciji mai dafi ya ciji wanda abin ya shafa; kar a motsa gabar jiki.',
    zu: 'Isisulu silunywe yinyoka enesihlungu; gcina ilungu lomzimba linganyakazi.',
    so: 'Dhibbanaha waxaa qaniinay mas sun leh; ha dhaqaajin gacanta ama lugta.',
    om: 'Miidhamaan bofa summaa’aan ciniiname; miila yookiin harkasaa hin sochoosinaa.'
  },

  // --- BORDER CUSTOMS & CHECKPOINTS (15 - 20) ---
  {
    id: 'customs-passport',
    category: 'customs',
    title: 'Passport & Border Pass Inspection',
    en: 'Please present your international passport, yellow fever card, and visa.',
    sw: 'Tafadhali onyesha pasipoti yako ya kimataifa, kadi ya homa ya manjano, na visa.',
    am: 'እባክዎ ዓለም አቀፍ ፓስፖርትዎን፣ የቢጫ ወባ ካርድዎን እና ቪዛዎን ያሳዩ።',
    yo: 'Jọwọ fi iwe irinna agbaye rẹ, kaadi ibà ofeefee, ati iwe iwọle visa han.',
    ha: 'Da fatan a nuna fasfo dinka na kasa da kasa, katin zazzabin rawaya, da biza.',
    zu: 'Sicela uveze iphasiphothi yakho yamazwe ngamazwe, ikhadi lomkhuhlane ophuzi, ne-visa.',
    so: 'Fadlan tus baasaboorkaaga caalamiga ah, kaarka qandhada hurdiga ah, iyo fiisaha.',
    om: 'Adaraa paaspoortii keessan, kaardii boba’aa keelloofi viizaa agarsiisaa.'
  },
  {
    id: 'customs-declare',
    category: 'customs',
    title: 'Commercial Cargo Declaration',
    en: 'Do you have commercial merchandise or electronics to declare at the border?',
    sw: 'Je, una bidhaa za kibiashara au vifaa vya kielektroniki vya kutangaza mpakani?',
    am: 'በድንበሩ ላይ የሚገለጹ የንግድ ሸቀጦች ወይም ኤሌክትሮኒክስ ዕቃዎች አሉዎት?',
    yo: 'Ṣe o ni awọn ọja iṣowo tabi awọn ẹrọ itanna lati kede ni aala?',
    ha: 'Kuna da kayan kasuwanci ko kayan lantarki da zaku bayyana a kan iyaka?',
    zu: 'Ingabe unezimpahla zokuhweba noma izinto zikagesi zokubika emngceleni?',
    so: 'Ma haysaa alaab ganacsi ama qalab elektaroonik ah oo aad ku dhawaaqdo xadka?',
    om: 'Mi’a daldalaa yookiin meeshaalee elektirooniksii daangaa irratti himattan qabduu?'
  },
  {
    id: 'customs-vehicle',
    category: 'customs',
    title: 'Cross-Border Vehicle Permit (COMESA)',
    en: 'Show the vehicle logbook, insurance yellow card, and cross-border transit permit.',
    sw: 'Onyesha kitabu cha gari, bima ya kadi ya manjano, na kibali cha kuvuka mpaka.',
    am: 'የተሽከርካሪውን ሰነድ፣ የቢጫ ካርድ ኢንሹራንስ እና የድንበር ማቋረጫ ፈቃድ ያሳዩ።',
    yo: 'Fi iwe iforukọsilẹ ọkọ ayọkẹlẹ, iṣeduro kaadi ofeefee, ati iwe aṣẹ irekọja han.',
    ha: 'Nuna takardar mota, inshorar katin rawaya, da izinin wucewar iyaka.',
    zu: 'Veza incwadi yemoto, umshwalense wekhadi eliphuzi, nemvume yokunqamula umngcele.',
    so: 'Tus buugga gaariga, caymiska kaarka jaalaha ah, iyo rukhsadda gudubka xadka.',
    om: 'Waraqaa konkolaataa, inshuraansii kaardii keelloofi hayyama daangaa ce’uu agarsiisaa.'
  },
  {
    id: 'customs-tariff',
    category: 'customs',
    title: 'Import Duty & Customs Tax Payment',
    en: 'What is the required customs duty fee for importing agricultural machinery?',
    sw: 'Ushuru unaohitajika wa forodha kwa kuingiza mitambo ya kilimo ni kiasi gani?',
    am: 'የእርሻ ማሽኖችን ወደ አገር ለማስገባት የሚፈለገው የጉምሩክ ቀረጥ ስንት ነው?',
    yo: 'Kini iye owo-ori aṣa ti a beere fun gbigbe awọn ẹrọ ogbin wọle?',
    ha: 'Nawa ne kudin harajin kwastam da ake bukata don shigo da injunan noma?',
    zu: 'Yimalini intela yempahla edingekayo yokungenisa imishini yezolimo?',
    so: 'Waa immisa lacagta canshuurta kastamka ee looga baahan yahay keenista qalabka beeraha?',
    om: 'Maashinii qonnaa biyya keessa galchuuf gibirri gumruukaa meeqa kaffalama?'
  },
  {
    id: 'customs-luggage',
    category: 'customs',
    title: 'Luggage Search & X-Ray',
    en: 'Please open all travel bags for security inspection and x-ray scanning.',
    sw: 'Tafadhali fungua mikoba yote ya kusafiri kwa ukaguzi wa usalama na mashine ya eksirei.',
    am: 'እባክዎ ለደህንነት ፍተሻ እና ለኤክስሬይ ምርመራ ሁሉንም የጉዞ ቦርሳዎች ይክፈቱ።',
    yo: 'Jọwọ ṣii gbogbo awọn baagi irin-ajo fun ayewo aabo ati ayẹwo x-ray.',
    ha: 'Da fatan a bude dukkan jakunkunan tafiya don binciken tsaro da na\'urar x-ray.',
    zu: 'Sicela uvule zonke izikhwama zokuhamba ukuze zihlolwe ezokuphepha kanye ne-x-ray.',
    so: 'Fadlan fur dhammaan boorsooyinka safarka si loo baaro amniga iyo x-ray-ga.',
    om: 'Adaraa sakkatta’iinsa nageenyaafi x-ray’f boorsaa imalaa hunda banaa.'
  },
  {
    id: 'customs-stamp',
    category: 'customs',
    title: 'Immigration Entry Stamp',
    en: 'I need an official immigration entry stamp into the country for thirty days.',
    sw: 'Nahitaji muhuri rasmi wa kuingia nchini kutoka idara ya uhamiaji kwa siku thelathini.',
    am: 'ለሠላሳ ቀናት ወደ አገሩ የሚያስገባ ይፋዊ የኢሚግሬሽን ማህተም እፈልጋለሁ።',
    yo: 'Mo nilo ontẹ osise ti iṣiwa lati wọ orilẹ-ede fun ọgbọn ọjọ.',
    ha: 'Ina son hatimin shiga kasar na hukuma daga ofishin shige da fice na kwanaki talatin.',
    zu: 'Ngidinga isitembu esisemthethweni sokungena ezweni sezinsuku ezingamashumi amathathu.',
    so: 'Waxaan u baahanahay shaabadda rasmiga ah ee gelitaanka dalka ee soddonka maalmood.',
    om: 'Guyyoota soddomaaf chaappaa seensa biyyaa seeraa imigireeshinii irraa nan barbaada.'
  },

  // --- TRANSIT & LOGISTICS (21 - 25) ---
  {
    id: 'transit-bus-schedule',
    category: 'transit',
    title: 'Cross-Border Coach Schedule',
    en: 'What time does the morning express coach leave for the capital city?',
    sw: 'Basi la asubuhi laendalo mji mkuu linaondoka saa ngapi?',
    am: 'ወደ ዋና ከተማው የሚሄደው የጠዋቱ ፈጣን አውቶቡስ ስንት ሰዓት ይነሳል?',
    yo: 'Agogo melo ni ọkọ akero owurọ ti o lọ si olu-ilu yoo lọ?',
    ha: 'Wane lokaci ne motar safiya mai zuwa babban birnin zata tashi?',
    zu: 'Ibhesi lasekuseni eliya enhlokodolobha lihamba ngasiphi isikhathi?',
    so: 'Waqtigee buu baska subaxdii u baxaya magaalada madaxda baxayaa?',
    om: 'Basiin ganamaa gara magaalaa guddootti deemu sa’aatii meeqatti ka’a?'
  },
  {
    id: 'transit-breakdown',
    category: 'transit',
    title: 'Engine Breakdown Assistance',
    en: 'Our lorry engine overheated and stalled; we need a qualified mechanic and tow truck.',
    sw: 'Injini ya lori letu imechemka na kuzimika; tunahitaji fundi stadi na gari la kuvuta.',
    am: 'የጭነት መኪናችን ሞተር በጣም ሞቆ ቆሟል፤ ባለሙያ መካኒክ እና መጎተቻ መኪና እንፈልጋለን።',
    yo: 'Ẹrọ ọkọ nla wa gbona pupọ o si duro; a nilo makaniki ati ọkọ fifa.',
    ha: 'Injin motar dakon kayanmu ya yi zafi ya mutu; muna bukatar makanike da motar janyo kaya.',
    zu: 'Injini yeloli lethu lishise kakhulu lama; sidinga umakhenikha nemoto yokudonsa.',
    so: 'Mishiinka xamuulka qaada aad buu u kululaaday wuu damay; waxaan u baahanahay makaanik.',
    om: 'Mootorri lori keenyaa garmalee oo’ee dhaame; makaanikaafi konkolaataa harkisu barbaanna.'
  },
  {
    id: 'transit-fuel',
    category: 'transit',
    title: 'Diesel Fuel Station',
    en: 'Where is the nearest petrol station with available diesel fuel?',
    sw: 'Kituo cha mafuta kilicho karibu chenye mafuta ya dizeli kiko wapi?',
    am: 'የናፍታ ነዳጅ ያለው በአቅራቢያ የሚገኝ የነዳጅ ማደያ የት አለ?',
    yo: 'Nibo ni ibudo epo ti o sunmọ julọ ti o ni epo diesel wa?',
    ha: 'Ina ne gidan mai mafi kusa da ke da man dizal?',
    zu: 'Iphi igaraji eliseduze elinikaphethiloli eline-diesel?',
    so: 'Halkee ku taal kaalinta shidaalka ee ugu dhow ee haysa naaftada?',
    om: 'Buufanni boba’aa dhiyeenya jiru kan boba’aa diizilii qabu eessa jira?'
  },
  {
    id: 'transit-ferry',
    category: 'transit',
    title: 'River Ferry Crossing',
    en: 'Is the river ferry operational for heavy freight trucks today?',
    sw: 'Je, kivuko cha mto kinafanya kazi kwa malori mazito ya mizigo leo?',
    am: 'የወንዙ ጀልባ መሻገሪያ ዛሬ ለከባድ የጭነት መኪናዎች አገልግሎት ይሰጣል?',
    yo: 'Ṣe ọkọ oju-omi odo n ṣiṣẹ fun awọn ọkọ ayọkẹlẹ ẹru nla loni?',
    ha: 'Jirgin ruwan ketare kogin yana aiki don manyan motocin dakon kaya yau?',
    zu: 'Ingabe isikebhe somfula siyasebenza ezimotweni ezisindayo zempahla namuhla?',
    so: 'Doonida wabiga ma shaqeyneysaa maanta baabuurta xamuulka culus?',
    om: 'Bikannaan lagaa har’a loriilee ulfaatoof tajaajila ni kennaa?'
  },
  {
    id: 'transit-distance',
    category: 'transit',
    title: 'Kilometers to Next Border Town',
    en: 'How many kilometers of dirt road remain until the next border outpost?',
    sw: 'Bado kilomita ngapi za barabara ya vumbi kuelekea kituo kijacho cha mpakani?',
    am: 'እስከሚቀጥለው የድንበር ኬላ ድረስ ስንት ኪሎ ሜትር የጠጠር መንገድ ይቀራል?',
    yo: 'Kilomita melo ti ọna erupẹ lo ku titi de ibudo aala ti o tẹle?',
    ha: 'Kilomita nawa na hanyar kasa suka rage zuwa shingen iyaka na gaba?',
    zu: 'Kusele amakhilomitha amangaki omgwaqo wenhlabathi ukuya emngceleni olandelayo?',
    so: 'Immisa kiiloomitir oo waddo ciid ah ayaa hadhay ilaa saldhigga xadka ee xiga?',
    om: 'Hanga buufata daangaa itti aanutti daandiin cirrachaa kiiloomeetira meeqatu hafa?'
  },

  // --- SAFETY & COMMUNITY EMERGENCY (26 - 31) ---
  {
    id: 'emerg-police',
    category: 'emergency',
    title: 'Police Assistance Required',
    en: 'I need urgent police assistance; our cargo vehicle was ambushed on the road.',
    sw: 'Nahitaji msaada wa dharura wa polisi; gari letu la mizigo lilivamiwa barabarani.',
    am: 'አስቸኳይ የፖሊስ እርዳታ እፈልጋለሁ፤ የጭነት መኪናችን መንገድ ላይ ጥቃት ደርሶበታል።',
    yo: 'Mo nilo iranlọwọ ọlọpa ni kiakia; ọkọ ẹru wa ni a kọlu ni oju-ọna.',
    ha: 'Ina bukatar taimakon \'yan sanda na gaggawa; an kai wa motarmu hari a hanya.',
    zu: 'Ngidinga usizo lwamaphoyisa oluphuthumayo; imoto yethu yempahla ihlaselwe endleleni.',
    so: 'Waxaan u baahanahay caawimaad booliis oo degdeg ah; baabuurkayaga xamuulka waa la weeraray.',
    om: 'Gargaarsa poolisii ariifachiisaa nan barbaada; konkolaataan keenya daandii irratti weerarame.'
  },
  {
    id: 'emerg-safe-shelter',
    category: 'emergency',
    title: 'Safe Night Shelter for Women & Children',
    en: 'Where is the secure community shelter for displaced women and children?',
    sw: 'Kituo salama cha jamii cha makazi ya wanawake na watoto waliokimbia makazi kiko wapi?',
    am: 'ለተፈናቀሉ ሴቶች እና ሕፃናት ደህንነቱ የተጠበቀ የማህበረሰብ መጠለያ የት አለ?',
    yo: 'Nibo ni ibi aabo agbegbe ti o ni aabo fun awọn obinrin ati awọn ọmọde wa?',
    ha: 'Ina ne matsugunin al\'umma mai aminci ga mata da yara da suka rasa muhallansu?',
    zu: 'Iphi indawo yokukhosela yomphakathi ephephile yabesifazane nezingane ezihambile?',
    so: 'Halkee ku taal hoyga bulshada ee aaminka ah ee haweenka iyo carruurta barakacay?',
    om: 'Dubartootaa fi daa’imman buqqa’aniif iddoon qubannaa nageenyaa eessa jira?'
  },
  {
    id: 'emerg-clean-water',
    category: 'emergency',
    title: 'Drinkable Clean Water Point',
    en: 'Is there a solar-powered borehole with safe, tested drinking water here?',
    sw: 'Je, kuna kisima chenye pampu ya jua chenye maji safi na salama ya kunywa hapa?',
    am: 'እዚህ በፀሐይ ኃይል የሚሰራ ንጹህ የመጠጥ ውሃ ጉድጓድ አለ?',
    yo: 'Ṣe kanga kan wa ti o ni agbara oorun pẹlu omi mimu ti o ni aabo nibi?',
    ha: 'Shin akwai rijiyar burtsatse mai aiki da hasken rana mai ruwan sha mai tsafta anan?',
    zu: 'Ingabe kukhona umthombo osebenza ngelanga onamanzi okuphuza ahlanzekile lapha?',
    so: 'Ma ka jirtaa halkan ceel cadceedda ku shaqeeya oo leh biyo nadiif ah oo la cabbo?',
    om: 'Boolli bishaanii anniisaa aduutiin hojjetu kan bishaan dhugaatii qulqulluu qabu as jiraa?'
  },
  {
    id: 'emerg-lost-child',
    category: 'emergency',
    title: 'Lost Child Search in Market',
    en: 'A six-year-old child wearing a red shirt is separated and lost in the crowded market.',
    sw: 'Mtoto wa miaka sita aliyevaa shati jekundu amepotea ndani ya soko lililojaa watu.',
    am: 'ቀይ ሸሚዝ የለበሰ የስድስት ዓመት ልጅ በገበያው ውስጥ ተለይቶ ጠፍቷል።',
    yo: 'Ọmọ ọdun mẹfa kan ti o wọ aṣọ pupa ti sọnu ninu ọja ti o kun fun eniyan.',
    ha: 'Wani yaro dan shekara shida sanye da jar riga ya bace a cikin kasuwar da ke cike da mutane.',
    zu: 'Ingane eneminyaka eyisithupha egqoke ihembe elibomvu ilahlekile emakethe egcwele abantu.',
    so: 'Ilmo lix jir ah oo qaba shaati gaduudan ayaa ku lumay suuqa dadku ku badan yihiin.',
    om: 'Daa’imni waggaa ja’aa kootii diimaa uffate gabaa namaan guute keessatti badeera.'
  },
  {
    id: 'emerg-embassy',
    category: 'emergency',
    title: 'Consulate / Embassy Liaison',
    en: 'I lost all my identification papers and need to contact my consular embassy.',
    sw: 'Nimepoteza vitambulisho vyangu vyote na ninahitaji kuwasiliana na ubalozi wangu.',
    am: 'ሁሉንም መታወቂያዎቼን አጥቻለሁ፤ የቆንስላ ኤምባሲዬን ማነጋገር አለብኝ።',
    yo: 'Mo padanu gbogbo awọn iwe idanimọ mi mo si nilo lati kan si ile-iṣẹ aṣoju mi.',
    ha: 'Na rasa dukkan takardun shaida ta kuma ina bukatar tuntubar ofishin jakadancina.',
    zu: 'Ngilahlekelwe yiwo wonke amaphepha ami kamazisi futhi ngidinga ukuxhumana nenxusa lami.',
    so: 'Waxaan waayay dhammaan dukumeentiyadaydii aqoonsiga waxaanan u baahanahay safaaraddayda.',
    om: 'Waraqaalee eenyummaa koo hunda dhabeera; embaasii koo qunnamsiisuu nan barbaada.'
  },
  {
    id: 'emerg-curfew',
    category: 'emergency',
    title: 'Night Road Security Curfew',
    en: 'Is there a mandatory night travel curfew enforced by military checkpoints?',
    sw: 'Je, kuna amri ya kutotoka nje usiku inayotekelezwa na vizuizi vya kijeshi barabarani?',
    am: 'በመንገድ ወታደራዊ ኬላዎች የሚተገበር የግዴታ የሌሊት እላፊ ገደብ አለ?',
    yo: 'Ṣe ofin ihamọ wa ni alẹ ti awọn ọmọ-ogun n fi agbara mu ni awọn aaye ayẹwo?',
    ha: 'Shin akwai dokar hana fita da daddare da shingen sojoji ke aiwatarwa a hanya?',
    zu: 'Ingabe kukhona umthetho wokungaphumi ebusuku ophoqelelwa amaphoyisa emgwaqeni?',
    so: 'Ma jiraa bandow xilliga habeenkii ah oo ay ciidanku ka dhaqan geliyeen jidadka?',
    om: 'Daandii irratti sa’aatii dhoorkaa halkan kan waraanni dirqisiisu jiraa?'
  }
];
