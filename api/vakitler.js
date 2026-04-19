// Diyanet Namaz Vakitleri API
// GPS koordinatindan en yakin ilceyi bulur, ezanvakti.emushaf.net JSON API kullanir

const https = require('https');

const ILCELER = [
  {"id":"9146","ad":"ADANA","lat":36.9863599,"lon":35.3252861},
  {"id":"9148","ad":"CEYHAN","lat":37.0288825,"lon":35.8124428},
  {"id":"9153","ad":"KOZAN","lat":37.4477857,"lon":35.8166308},
  {"id":"9158","ad":"ADIYAMAN","lat":37.7602985,"lon":38.2772986},
  {"id":"9163","ad":"KAHTA","lat":37.7860716,"lon":38.6217178},
  {"id":"9167","ad":"AFYONKARAHİSAR","lat":38.7568597,"lon":30.5387044},
  {"id":"9170","ad":"BOLVADİN","lat":38.7115866,"lon":31.0454865},
  {"id":"9174","ad":"DİNAR","lat":38.0656331,"lon":30.1562047},
  {"id":"9185","ad":"AĞRI","lat":39.719125,"lon":43.0504894},
  {"id":"9187","ad":"DOĞUBEYAZIT","lat":39.5483366,"lon":44.0793593},
  {"id":"9189","ad":"PATNOS","lat":39.2334202,"lon":42.8612338},
  {"id":"9193","ad":"AKSARAY","lat":38.3705416,"lon":34.026907},
  {"id":"9198","ad":"AMASYA","lat":40.6503248,"lon":35.8329148},
  {"id":"9200","ad":"GÜMÜŞHACIKÖY","lat":40.8736228,"lon":35.2158969},
  {"id":"9202","ad":"MERZİFON","lat":40.8721392,"lon":35.4635383},
  {"id":"9203","ad":"SULUOVA","lat":40.8364128,"lon":35.6455569},
  {"id":"9204","ad":"TAŞOVA","lat":40.7603491,"lon":36.321973},
  {"id":"9206","ad":"ANKARA","lat":39.9207759,"lon":32.8540497},
  {"id":"9209","ad":"BEYPAZARI","lat":40.1656491,"lon":31.9204553},
  {"id":"9215","ad":"HAYMANA","lat":39.4341352,"lon":32.4987922},
  {"id":"9217","ad":"KAHRAMANKAZAN","lat":40.2054445,"lon":32.6813148},
  {"id":"9218","ad":"KIZILCAHAMAM","lat":40.4700945,"lon":32.6528555},
  {"id":"9220","ad":"POLATLI","lat":39.58567,"lon":32.1417303},
  {"id":"9224","ad":"ALANYA","lat":36.5610745,"lon":31.9978936},
  {"id":"9225","ad":"ANTALYA","lat":36.8865728,"lon":30.7030242},
  {"id":"9232","ad":"KAŞ","lat":36.1993752,"lon":29.6413365},
  {"id":"9236","ad":"MANAVGAT","lat":36.7870124,"lon":31.4406667},
  {"id":"9237","ad":"SERİK","lat":36.9168682,"lon":31.1047478},
  {"id":"9535","ad":"ARNAVUTKOY","lat":41.184471,"lon":28.7412446},
  {"id":"17865","ad":"AVCILAR","lat":40.9799389,"lon":28.7216689},
  {"id":"17866","ad":"BAŞAKŞEHİR","lat":41.1075794,"lon":28.7950711},
  {"id":"9536","ad":"BEYLİKDÜZÜ","lat":41.0037541,"lon":28.6372583},
  {"id":"9537","ad":"BÜYÜKÇEKMECE","lat":41.021654,"lon":28.579757},
  {"id":"9538","ad":"ÇATALCA","lat":41.1436804,"lon":28.4605154},
  {"id":"9539","ad":"ÇEKMEKÖY","lat":41.0351579,"lon":29.1739149},
  {"id":"9540","ad":"ESENYURT","lat":41.0342862,"lon":28.6801113},
  {"id":"9541","ad":"İSTANBUL","lat":41.006381,"lon":28.9758715},
  {"id":"9542","ad":"KARTAL","lat":40.88858,"lon":29.1856536},
  {"id":"9543","ad":"KÜÇÜKÇEKMECE","lat":40.9918737,"lon":28.7711956},
  {"id":"9544","ad":"MALTEPE","lat":40.9247539,"lon":29.1310782},
  {"id":"9545","ad":"PENDİK","lat":40.8768715,"lon":29.2349672},
  {"id":"9546","ad":"SANCAKTEPE","lat":40.9905196,"lon":29.2288624},
  {"id":"9547","ad":"ŞİLE","lat":41.1744067,"lon":29.6125216},
  {"id":"9548","ad":"SİLİVRİ","lat":41.0742476,"lon":28.2481709},
  {"id":"9549","ad":"SULTANBEYLİ","lat":40.9670242,"lon":29.2671314},
  {"id":"9550","ad":"SULTANGAZİ","lat":41.1043344,"lon":28.8614367},
  {"id":"9551","ad":"TUZLA","lat":40.8161732,"lon":29.3034194},
  {"id":"9552","ad":"ALİAĞA","lat":38.8034265,"lon":26.9713731},
  {"id":"9554","ad":"BERGAMA","lat":39.1189476,"lon":27.1773642},
  {"id":"9560","ad":"İZMİR","lat":38.4192537,"lon":27.128469},
  {"id":"9562","ad":"KEMALPAŞA","lat":38.4275667,"lon":27.4164281},
  {"id":"9565","ad":"ÖDEMİŞ","lat":38.2220533,"lon":27.965566},
  {"id":"9567","ad":"SELÇUK","lat":37.9479646,"lon":27.3685018},
  {"id":"9819","ad":"SAMSUN","lat":41.2946149,"lon":36.3320596},
  {"id":"17911","ad":"ATAKUM","lat":41.3322588,"lon":36.2704652},
  {"id":"9813","ad":"BAFRA","lat":41.5665954,"lon":35.9024777},
  {"id":"9814","ad":"ÇARŞAMBA","lat":41.1982911,"lon":36.7270196},
  {"id":"9335","ad":"BURSA","lat":40.1825734,"lon":29.0675039},
  {"id":"9337","ad":"GEMLİK","lat":40.4301652,"lon":29.1570698},
  {"id":"9339","ad":"İNEGÖL","lat":40.0800359,"lon":29.5096528},
  {"id":"9340","ad":"İZNİK","lat":40.4303445,"lon":29.7223732},
  {"id":"9343","ad":"MUDANYA","lat":40.3752582,"lon":28.8837929},
  {"id":"9345","ad":"ORHANGAZİ","lat":40.4955352,"lon":29.3108324},
  {"id":"9402","ad":"DİYARBAKIR","lat":37.9162222,"lon":40.2363542},
  {"id":"9410","ad":"SİLVAN","lat":38.1411514,"lon":41.0056103},
  {"id":"9414","ad":"DÜZCE","lat":40.8391531,"lon":31.1595361},
  {"id":"9419","ad":"EDİRNE","lat":41.6759327,"lon":26.5587225},
  {"id":"9432","ad":"ELAZIĞ","lat":38.6747164,"lon":39.2227135},
  {"id":"9440","ad":"ERZİNCAN","lat":39.7467552,"lon":39.49103},
  {"id":"9451","ad":"ERZURUM","lat":39.90632,"lon":41.2727715},
  {"id":"9470","ad":"ESKİŞEHİR","lat":39.7743941,"lon":30.519116},
  {"id":"9479","ad":"GAZİANTEP","lat":37.0628317,"lon":37.3792617},
  {"id":"9494","ad":"GİRESUN","lat":40.9174453,"lon":38.3847864},
  {"id":"9501","ad":"GÜMÜŞHANE","lat":40.4617844,"lon":39.4757339},
  {"id":"9507","ad":"HAKKARİ","lat":37.5766959,"lon":43.7377862},
  {"id":"9516","ad":"İSKENDERUN","lat":36.5902266,"lon":36.1710354},
  {"id":"20089","ad":"HATAY","lat":36.2025471,"lon":36.1602908},
  {"id":"9519","ad":"REYHANLI","lat":36.2684483,"lon":36.5672311},
  {"id":"9528","ad":"ISPARTA","lat":37.7636722,"lon":30.5550569},
  {"id":"9526","ad":"EĞİRDİR","lat":37.8741257,"lon":30.8490411},
  {"id":"9581","ad":"KARABÜK","lat":41.1955402,"lon":32.6231154},
  {"id":"9587","ad":"KARAMAN","lat":37.1808502,"lon":33.2194554},
  {"id":"9594","ad":"KARS","lat":40.6070761,"lon":43.0947521},
  {"id":"9609","ad":"KASTAMONU","lat":41.3765359,"lon":33.7770087},
  {"id":"9620","ad":"KAYSERİ","lat":38.7219011,"lon":35.4873214},
  {"id":"9629","ad":"KİLİS","lat":36.7165552,"lon":37.1146069},
  {"id":"9635","ad":"KIRIKKALE","lat":39.8410483,"lon":33.5058536},
  {"id":"9638","ad":"KIRKLARELİ","lat":41.7370223,"lon":27.2235523},
  {"id":"9646","ad":"KIRŞEHİR","lat":39.1461142,"lon":34.1605587},
  {"id":"9654","ad":"KOCAELİ","lat":40.7653892,"lon":29.9407361},
  {"id":"9651","ad":"GEBZE","lat":40.8006696,"lon":29.431767},
  {"id":"9676","ad":"KONYA","lat":37.872734,"lon":32.4924376},
  {"id":"9660","ad":"BEYŞEHİR","lat":37.6754536,"lon":31.7269088},
  {"id":"9669","ad":"EREĞLİ","lat":37.5140718,"lon":34.0473423},
  {"id":"9689","ad":"KÜTAHYA","lat":39.4199106,"lon":29.9857886},
  {"id":"9703","ad":"MALATYA","lat":38.3487153,"lon":38.3190674},
  {"id":"9716","ad":"MANİSA","lat":38.6125793,"lon":27.4333969},
  {"id":"9708","ad":"AKHİSAR","lat":38.9240528,"lon":27.8401895},
  {"id":"9726","ad":"MARDİN","lat":37.3132581,"lon":40.7354383},
  {"id":"9729","ad":"NUSAYBİN","lat":37.0691755,"lon":41.2164671},
  {"id":"9737","ad":"MERSİN","lat":36.7978381,"lon":34.6298391},
  {"id":"9740","ad":"TARSUS","lat":36.9164834,"lon":34.895149},
  {"id":"9735","ad":"ERDEMLİ","lat":36.6057089,"lon":34.3102872},
  {"id":"9731","ad":"ANAMUR","lat":36.080323,"lon":32.8312106},
  {"id":"9747","ad":"MUĞLA","lat":37.2151784,"lon":28.363733},
  {"id":"9741","ad":"BODRUM","lat":37.0343987,"lon":27.430651},
  {"id":"9744","ad":"FETHİYE","lat":36.6221154,"lon":29.1153384},
  {"id":"17883","ad":"MARMARİS","lat":36.8522547,"lon":28.2742661},
  {"id":"9755","ad":"MUŞ","lat":38.7322221,"lon":41.4898925},
  {"id":"9760","ad":"NEVŞEHİR","lat":38.5871556,"lon":34.7196633},
  {"id":"9766","ad":"NİĞDE","lat":37.969849,"lon":34.6764495},
  {"id":"9782","ad":"ORDU","lat":40.9852301,"lon":37.8797732},
  {"id":"9783","ad":"ÜNYE","lat":41.1262405,"lon":37.2853616},
  {"id":"9788","ad":"OSMANİYE","lat":37.0733588,"lon":36.2507673},
  {"id":"9799","ad":"RİZE","lat":41.0248249,"lon":40.5199142},
  {"id":"9807","ad":"SAKARYA","lat":40.7726291,"lon":30.4038575},
  {"id":"9831","ad":"ŞANLIURFA","lat":37.1596239,"lon":38.791929},
  {"id":"9832","ad":"SİVEREK","lat":37.7540905,"lon":39.3177426},
  {"id":"9839","ad":"SİİRT","lat":37.9273623,"lon":41.94218},
  {"id":"9847","ad":"SİNOP","lat":42.0265798,"lon":35.1511512},
  {"id":"9854","ad":"ŞIRNAK","lat":37.548722,"lon":42.3618788},
  {"id":"9850","ad":"CİZRE","lat":37.3324374,"lon":42.1854699},
  {"id":"9868","ad":"SİVAS","lat":39.7503574,"lon":37.0145173},
  {"id":"9879","ad":"TEKİRDAĞ","lat":40.9781214,"lon":27.5107799},
  {"id":"9873","ad":"ÇORLU","lat":41.1590875,"lon":27.8041066},
  {"id":"9887","ad":"TOKAT","lat":40.3233534,"lon":36.552162},
  {"id":"17910","ad":"ERBAA","lat":40.6727976,"lon":36.5715055},
  {"id":"9905","ad":"TRABZON","lat":41.0054605,"lon":39.7301463},
  {"id":"9891","ad":"AKÇAABAT","lat":41.0216276,"lon":39.5706735},
  {"id":"9901","ad":"OF","lat":40.947642,"lon":40.2694068},
  {"id":"9914","ad":"TUNCELİ","lat":39.1060641,"lon":39.5482693},
  {"id":"9919","ad":"UŞAK","lat":38.6740401,"lon":29.4058419},
  {"id":"9930","ad":"VAN","lat":38.500875,"lon":43.3946051},
  {"id":"9925","ad":"ERCİŞ","lat":39.0289887,"lon":43.3591059},
  {"id":"9935","ad":"YALOVA","lat":40.6582529,"lon":29.2699916},
  {"id":"9949","ad":"YOZGAT","lat":39.8221974,"lon":34.8080972},
  {"id":"9955","ad":"ZONGULDAK","lat":41.4506981,"lon":31.7919867},
  {"id":"9238","ad":"ARDAHAN","lat":41.1102966,"lon":42.7035585},
  {"id":"9246","ad":"ARTVİN","lat":41.1830811,"lon":41.8287448},
  {"id":"9252","ad":"AYDIN","lat":37.8483767,"lon":27.8435878},
  {"id":"9266","ad":"SÖKE","lat":37.7519762,"lon":27.4056294},
  {"id":"9270","ad":"BALIKESİR","lat":39.6473917,"lon":27.8879787},
  {"id":"17917","ad":"BANDIRMA","lat":40.3554705,"lon":27.9697603},
  {"id":"9275","ad":"EDREMİT","lat":39.5938352,"lon":27.0156844},
  {"id":"9285","ad":"BARTIN","lat":41.6350461,"lon":32.3366205},
  {"id":"9288","ad":"BATMAN","lat":37.8835738,"lon":41.1277565},
  {"id":"9295","ad":"BAYBURT","lat":40.2551608,"lon":40.2205036},
  {"id":"9297","ad":"BİLECİK","lat":40.1435101,"lon":29.9752911},
  {"id":"9303","ad":"BİNGÖL","lat":38.8861265,"lon":40.4972333},
  {"id":"9311","ad":"BİTLİS","lat":38.4020539,"lon":42.1084568},
  {"id":"9315","ad":"BOLU","lat":40.7332953,"lon":31.6110479},
  {"id":"9327","ad":"BURDUR","lat":37.7248394,"lon":30.2887286},
  {"id":"9352","ad":"ÇANAKKALE","lat":40.146271,"lon":26.4028892},
  {"id":"9359","ad":"ÇANKIRI","lat":40.5971947,"lon":33.6212704},
  {"id":"9370","ad":"ÇORUM","lat":40.5499106,"lon":34.9537344},
  {"id":"9392","ad":"DENİZLİ","lat":37.7827875,"lon":29.0966476}
];

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dlat = (lat2 - lat1) * Math.PI / 180;
  const dlon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dlat/2)**2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dlon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function enYakinIlce(lat, lon) {
  let minDist = Infinity;
  let enYakin = ILCELER[0];
  for (const ilce of ILCELER) {
    const d = haversine(lat, lon, ilce.lat, ilce.lon);
    if (d < minDist) { minDist = d; enYakin = ilce; }
  }
  return { ilce: enYakin, mesafe: minDist };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        'Accept': 'application/json',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse hatasi: ' + data.slice(0, 200))); }
      });
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat ve lon gerekli' });

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  if (isNaN(latNum) || isNaN(lonNum)) return res.status(400).json({ error: 'Gecersiz koordinat' });

  try {
    const { ilce, mesafe } = enYakinIlce(latNum, lonNum);
    const url = `https://ezanvakti.emushaf.net/vakitler/${ilce.id}`;
    const data = await fetchJson(url);
    const bugun = Array.isArray(data) ? data[0] : data;

    return res.status(200).json({
      ilce: ilce.ad,
      ilce_id: ilce.id,
      mesafe_km: Math.round(mesafe * 10) / 10,
      imsak: bugun.Imsak,
      gunes: bugun.Gunes,
      ogle: bugun.Ogle,
      ikindi: bugun.Ikindi,
      aksam: bugun.Aksam,
      yatsi: bugun.Yatsi,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
