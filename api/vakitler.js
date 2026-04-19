// Diyanet Namaz Vakitleri API
// GPS koordinatindan en yakin ilceyi bulur, Diyanet'ten vakitleri ceeker

const https = require('https');

// Turkiye'deki tum Diyanet ilceleri ve koordinatlari
const ILCELER = [
  {"id":"9146","ad":"ADANA","lat":36.9863599,"lon":35.3252861},
  {"id":"9147","ad":"ALADAĞ","lat":37.5452473,"lon":35.3944418},
  {"id":"9148","ad":"CEYHAN","lat":37.0288825,"lon":35.8124428},
  {"id":"9149","ad":"FEKE","lat":37.8147609,"lon":35.9116526},
  {"id":"9150","ad":"İMAMOĞLU","lat":37.2577128,"lon":35.6613373},
  {"id":"9151","ad":"KARAISALI","lat":37.2571843,"lon":35.0586409},
  {"id":"9152","ad":"KARATAŞ","lat":36.5646007,"lon":35.3841416},
  {"id":"9153","ad":"KOZAN","lat":37.4477857,"lon":35.8166308},
  {"id":"9154","ad":"POZANTI","lat":37.4229083,"lon":34.8731665},
  {"id":"9155","ad":"SAİMBEYLİ","lat":37.9845639,"lon":36.0888261},
  {"id":"9156","ad":"TUFANBEYLİ","lat":38.2603004,"lon":36.222074},
  {"id":"9157","ad":"YUMURTALIK","lat":36.7675867,"lon":35.7915869},
  {"id":"9158","ad":"ADIYAMAN","lat":37.7602985,"lon":38.2772986},
  {"id":"9159","ad":"BESNİ","lat":37.6910896,"lon":37.8622739},
  {"id":"9160","ad":"ÇELİKHAN","lat":38.0333091,"lon":38.2423891},
  {"id":"9161","ad":"GERGER","lat":38.029339,"lon":39.0333202},
  {"id":"9162","ad":"GÖLBAŞI","lat":37.7844045,"lon":37.6395601},
  {"id":"9163","ad":"KAHTA","lat":37.7860716,"lon":38.6217178},
  {"id":"9164","ad":"SAMSAT","lat":37.5784978,"lon":38.4809171},
  {"id":"9165","ad":"SİNCİK","lat":38.0291332,"lon":38.6194328},
  {"id":"9166","ad":"TUT","lat":37.7944486,"lon":37.9149485},
  {"id":"9167","ad":"AFYONKARAHİSAR","lat":38.7568597,"lon":30.5387044},
  {"id":"9168","ad":"BAŞMAKÇI","lat":37.8973577,"lon":30.0097784},
  {"id":"9169","ad":"BAYAT","lat":38.9844235,"lon":30.925576},
  {"id":"9170","ad":"BOLVADİN","lat":38.7115866,"lon":31.0454865},
  {"id":"9171","ad":"ÇAY","lat":38.6283416,"lon":31.0355492},
  {"id":"9172","ad":"ÇOBANLAR","lat":38.6882335,"lon":30.73887},
  {"id":"9173","ad":"DAZKIRI","lat":37.9021127,"lon":29.8623942},
  {"id":"9174","ad":"DİNAR","lat":38.0656331,"lon":30.1562047},
  {"id":"9175","ad":"EMİRDAĞ","lat":39.0195014,"lon":31.1502583},
  {"id":"9176","ad":"EVCİLER","lat":38.0270542,"lon":29.921358},
  {"id":"9177","ad":"HOCALAR","lat":38.5808125,"lon":29.9668799},
  {"id":"9178","ad":"İHSANİYE","lat":39.0134902,"lon":30.4031955},
  {"id":"9179","ad":"İSCEHİSAR","lat":38.8620854,"lon":30.7509711},
  {"id":"9180","ad":"KIZILÖREN","lat":38.2578342,"lon":30.1491611},
  {"id":"9181","ad":"SANDIKLI","lat":38.4647643,"lon":30.272542},
  {"id":"9182","ad":"SİNANPAŞA","lat":38.7451878,"lon":30.2452121},
  {"id":"9183","ad":"SUHUT","lat":38.5339612,"lon":30.5461288},
  {"id":"9184","ad":"SULTANDAĞI","lat":38.5479273,"lon":31.2682411},
  {"id":"9185","ad":"AĞRI","lat":39.719125,"lon":43.0504894},
  {"id":"9186","ad":"DİYADİN","lat":39.5397685,"lon":43.671203},
  {"id":"9187","ad":"DOĞUBEYAZIT","lat":39.5483366,"lon":44.0793593},
  {"id":"9188","ad":"ELEŞKİRT","lat":39.7983792,"lon":42.6754699},
  {"id":"9189","ad":"PATNOS","lat":39.2334202,"lon":42.8612338},
  {"id":"9190","ad":"TAŞLIÇAY","lat":39.6333304,"lon":43.3776762},
  {"id":"9191","ad":"TUTAK","lat":39.5393558,"lon":42.7727501},
  {"id":"9192","ad":"AĞAÇÖREN","lat":38.8689718,"lon":33.9155769},
  {"id":"9193","ad":"AKSARAY","lat":38.3705416,"lon":34.026907},
  {"id":"9194","ad":"ESKİL","lat":38.4017027,"lon":33.412823},
  {"id":"9195","ad":"GÜLAĞAÇ","lat":38.3940894,"lon":34.3460521},
  {"id":"9196","ad":"GÜZELYURT","lat":38.2778702,"lon":34.3714161},
  {"id":"17877","ad":"ORTAKÖY","lat":38.736624,"lon":34.0412195},
  {"id":"9197","ad":"SARIYAHŞİ","lat":38.9849345,"lon":33.8455368},
  {"id":"20069","ad":"SULTANHANI","lat":38.2474175,"lon":33.5489796},
  {"id":"9198","ad":"AMASYA","lat":40.6503248,"lon":35.8329148},
  {"id":"9199","ad":"GÖYNÜCEK","lat":40.3971472,"lon":35.5236928},
  {"id":"9200","ad":"GÜMÜŞHACIKÖY","lat":40.8736228,"lon":35.2158969},
  {"id":"9201","ad":"HAMAMÖZÜ","lat":40.7831959,"lon":35.0242149},
  {"id":"9202","ad":"MERZİFON","lat":40.8721392,"lon":35.4635383},
  {"id":"9203","ad":"SULUOVA","lat":40.8364128,"lon":35.6455569},
  {"id":"9204","ad":"TAŞOVA","lat":40.7603491,"lon":36.321973},
  {"id":"9205","ad":"AKYURT","lat":40.1307529,"lon":33.0870676},
  {"id":"9206","ad":"ANKARA","lat":39.9207759,"lon":32.8540497},
  {"id":"9207","ad":"AYAŞ","lat":40.015144,"lon":32.3324224},
  {"id":"9208","ad":"BALA","lat":39.553364,"lon":33.1237528},
  {"id":"9209","ad":"BEYPAZARI","lat":40.1656491,"lon":31.9204553},
  {"id":"9210","ad":"ÇAMLIDERE","lat":40.4914804,"lon":32.4758257},
  {"id":"9211","ad":"CUBUK","lat":40.2388964,"lon":33.028947},
  {"id":"9212","ad":"ELMADAĞ","lat":39.9173198,"lon":33.2343945},
  {"id":"9213","ad":"EVREN","lat":39.0221203,"lon":33.8078573},
  {"id":"9214","ad":"GÜDÜL","lat":40.2104614,"lon":32.2432252},
  {"id":"9215","ad":"HAYMANA","lat":39.4341352,"lon":32.4987922},
  {"id":"9217","ad":"KAHRAMANKAZAN","lat":40.2054445,"lon":32.6813148},
  {"id":"9216","ad":"KALECİK","lat":40.0763983,"lon":33.4450431},
  {"id":"9218","ad":"KIZILCAHAMAM","lat":40.4700945,"lon":32.6528555},
  {"id":"9219","ad":"NALLIHAN","lat":40.188822,"lon":31.3503453},
  {"id":"9220","ad":"POLATLI","lat":39.58567,"lon":32.1417303},
  {"id":"9221","ad":"ŞEREFLİKOÇHİSAR","lat":38.9389329,"lon":33.5438843},
  {"id":"9222","ad":"AKSEKİ","lat":37.0456391,"lon":31.789676},
  {"id":"9223","ad":"AKSU","lat":36.9475051,"lon":30.847705},
  {"id":"9224","ad":"ALANYA","lat":36.8865728,"lon":30.7030242},
  {"id":"9225","ad":"ANTALYA","lat":36.8865728,"lon":30.7030242},
  {"id":"9226","ad":"DEMRE","lat":36.244569,"lon":29.9876151},
  {"id":"9227","ad":"ELMALI","lat":36.7383786,"lon":29.9183623},
  {"id":"9228","ad":"FİNİKE","lat":36.3046148,"lon":30.1445334},
  {"id":"9229","ad":"GAZİPAŞA","lat":36.2682712,"lon":32.3175066},
  {"id":"9230","ad":"GÜNDOĞMUŞ","lat":36.814338,"lon":31.9983333},
  {"id":"9231","ad":"İBRADI","lat":37.0969444,"lon":31.5969351},
  {"id":"9232","ad":"KAŞ","lat":36.1993752,"lon":29.6413365},
  {"id":"9233","ad":"KEMER","lat":36.6013823,"lon":30.5638561},
  {"id":"9234","ad":"KORKUTELİ","lat":37.0666523,"lon":30.1970497},
  {"id":"9235","ad":"KUMLUCA","lat":36.3669046,"lon":30.2858418},
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
  {"id":"9553","ad":"BAYINDIR","lat":38.2200254,"lon":27.6483683},
  {"id":"9554","ad":"BERGAMA","lat":39.1189476,"lon":27.1773642},
  {"id":"9555","ad":"BEYDAĞ","lat":38.0870318,"lon":28.2106924},
  {"id":"9556","ad":"CEŞME","lat":38.3244044,"lon":26.3029604},
  {"id":"9557","ad":"DİKİLİ","lat":39.0749706,"lon":26.8892495},
  {"id":"9558","ad":"FOÇA","lat":38.668916,"lon":26.7547749},
  {"id":"9559","ad":"GÜZELBAHÇE","lat":38.375516,"lon":26.8755527},
  {"id":"9560","ad":"İZMİR","lat":38.4192537,"lon":27.128469},
  {"id":"9561","ad":"KARABURUN","lat":38.6354423,"lon":26.5098027},
  {"id":"9562","ad":"KEMALPAŞA","lat":38.4275667,"lon":27.4164281},
  {"id":"9563","ad":"KINIK","lat":39.0875983,"lon":27.3804752},
  {"id":"9564","ad":"KİRAZ","lat":38.230372,"lon":28.2015786},
  {"id":"17868","ad":"MENDERES","lat":38.2551566,"lon":27.1381399},
  {"id":"17869","ad":"MENEMEN","lat":38.6081926,"lon":27.0860884},
  {"id":"9565","ad":"ÖDEMİŞ","lat":38.2220533,"lon":27.965566},
  {"id":"9566","ad":"SEFERIHİSAR","lat":38.1950292,"lon":26.8342193},
  {"id":"9567","ad":"SELÇUK","lat":37.9479646,"lon":27.3685018},
  {"id":"9568","ad":"TİRE","lat":38.089497,"lon":27.7318214},
  {"id":"9569","ad":"TORBALI","lat":38.1513559,"lon":27.3616214},
  {"id":"9570","ad":"URLA","lat":38.3192337,"lon":26.789535},
  {"id":"9819","ad":"SAMSUN","lat":41.2946149,"lon":36.3320596},
  {"id":"17911","ad":"ATAKUM","lat":41.3322588,"lon":36.2704652},
  {"id":"9813","ad":"BAFRA","lat":41.5665954,"lon":35.9024777},
  {"id":"9814","ad":"ÇARŞAMBA","lat":41.1982911,"lon":36.7270196},
  {"id":"9815","ad":"HAVZA","lat":40.9657067,"lon":35.6671033},
  {"id":"9820","ad":"TEKKEKÖY","lat":41.2134984,"lon":36.4578038},
  {"id":"9821","ad":"TERME","lat":41.2090393,"lon":36.9721685},
  {"id":"9822","ad":"VEZİRKÖPRÜ","lat":41.1433899,"lon":35.4604721},
  {"id":"9335","ad":"BURSA","lat":40.1825734,"lon":29.0675039},
  {"id":"9337","ad":"GEMLİK","lat":40.4301652,"lon":29.1570698},
  {"id":"9339","ad":"İNEGÖL","lat":40.0800359,"lon":29.5096528},
  {"id":"9340","ad":"İZNİK","lat":40.4303445,"lon":29.7223732},
  {"id":"9341","ad":"KARACABEY","lat":40.2159844,"lon":28.3590588},
  {"id":"9343","ad":"MUDANYA","lat":40.3752582,"lon":28.8837929},
  {"id":"9345","ad":"ORHANGAZİ","lat":40.4955352,"lon":29.3108324},
  {"id":"9346","ad":"YENİŞEHİR","lat":40.2626316,"lon":29.6521948},
  {"id":"9402","ad":"DİYARBAKIR","lat":37.9162222,"lon":40.2363542},
  {"id":"9397","ad":"BİSMİL","lat":37.8527687,"lon":40.6619924},
  {"id":"9404","ad":"ERGANİ","lat":38.2329371,"lon":39.755019},
  {"id":"9410","ad":"SİLVAN","lat":38.1411514,"lon":41.0056103},
  {"id":"9414","ad":"DÜZCE","lat":40.8391531,"lon":31.1595361},
  {"id":"9411","ad":"AKÇAKOCA","lat":41.0882278,"lon":31.1239833},
  {"id":"9419","ad":"EDİRNE","lat":41.6759327,"lon":26.5587225},
  {"id":"9423","ad":"KEŞAN","lat":40.8548793,"lon":26.6303057},
  {"id":"9427","ad":"UZUNKÖPRÜ","lat":41.2960052,"lon":26.6896238},
  {"id":"9432","ad":"ELAZIĞ","lat":38.6747164,"lon":39.2227135},
  {"id":"9440","ad":"ERZİNCAN","lat":39.7467552,"lon":39.49103},
  {"id":"9451","ad":"ERZURUM","lat":39.90632,"lon":41.2727715},
  {"id":"9449","ad":"AZİZİYE","lat":39.9454672,"lon":41.1060051},
  {"id":"9461","ad":"PASİNLER","lat":39.9773129,"lon":41.674491},
  {"id":"9470","ad":"ESKİŞEHİR","lat":39.7743941,"lon":30.519116},
  {"id":"9479","ad":"GAZİANTEP","lat":37.0628317,"lon":37.3792617},
  {"id":"9480","ad":"İSLAHİYE","lat":37.0306836,"lon":36.6366559},
  {"id":"9482","ad":"NİZİP","lat":37.0012502,"lon":37.7889478},
  {"id":"9494","ad":"GİRESUN","lat":40.9174453,"lon":38.3847864},
  {"id":"9487","ad":"BULANCAK","lat":40.9389231,"lon":38.2318776},
  {"id":"9495","ad":"GÖRELE","lat":41.0335207,"lon":38.998624},
  {"id":"9501","ad":"GÜMÜŞHANE","lat":40.4617844,"lon":39.4757339},
  {"id":"9507","ad":"HAKKARİ","lat":37.5766959,"lon":43.7377862},
  {"id":"9509","ad":"YÜKSEKOVA","lat":37.5717687,"lon":44.2821698},
  {"id":"9516","ad":"İSKENDERUN","lat":36.5902266,"lon":36.1710354},
  {"id":"20089","ad":"HATAY","lat":36.2025471,"lon":36.1602908},
  {"id":"9517","ad":"KIRIKHAN","lat":36.4989553,"lon":36.3621728},
  {"id":"9519","ad":"REYHANLI","lat":36.2684483,"lon":36.5672311},
  {"id":"9528","ad":"ISPARTA","lat":37.7636722,"lon":30.5550569},
  {"id":"9526","ad":"EĞİRDİR","lat":37.8741257,"lon":30.8490411},
  {"id":"9533","ad":"YALVAÇ","lat":38.3002867,"lon":31.1743457},
  {"id":"9522","ad":"IĞDIR","lat":40.0483139,"lon":30.6431072},
  {"id":"9581","ad":"KARABÜK","lat":41.1955402,"lon":32.6231154},
  {"id":"9587","ad":"KARAMAN","lat":37.1808502,"lon":33.2194554},
  {"id":"9586","ad":"ERMENEK","lat":36.6389037,"lon":32.8888721},
  {"id":"9594","ad":"KARS","lat":40.6070761,"lon":43.0947521},
  {"id":"9595","ad":"SARIKAMIŞ","lat":40.33589,"lon":42.5769437},
  {"id":"9609","ad":"KASTAMONU","lat":41.3765359,"lon":33.7770087},
  {"id":"9614","ad":"TOSYA","lat":41.0164957,"lon":34.0386079},
  {"id":"9620","ad":"KAYSERİ","lat":38.7219011,"lon":35.4873214},
  {"id":"9617","ad":"DEVELİ","lat":38.3879285,"lon":35.4900997},
  {"id":"9629","ad":"KİLİS","lat":36.7165552,"lon":37.1146069},
  {"id":"9635","ad":"KIRIKKALE","lat":39.8410483,"lon":33.5058536},
  {"id":"9638","ad":"KIRKLARELİ","lat":41.7370223,"lon":27.2235523},
  {"id":"9639","ad":"LULEBURGAZ","lat":41.4041358,"lon":27.3554651},
  {"id":"9646","ad":"KIRŞEHİR","lat":39.1461142,"lon":34.1605587},
  {"id":"9654","ad":"KOCAELİ","lat":40.7653892,"lon":29.9407361},
  {"id":"9651","ad":"GEBZE","lat":40.8006696,"lon":29.431767},
  {"id":"9648","ad":"ÇAYIROVA","lat":40.8105337,"lon":29.3473731},
  {"id":"9652","ad":"KANDIRA","lat":41.0703914,"lon":30.1523298},
  {"id":"9676","ad":"KONYA","lat":37.872734,"lon":32.4924376},
  {"id":"9658","ad":"AKŞEHİR","lat":38.3588503,"lon":31.4201959},
  {"id":"9660","ad":"BEYŞEHİR","lat":37.6754536,"lon":31.7269088},
  {"id":"9669","ad":"EREĞLİ","lat":37.5140718,"lon":34.0473423},
  {"id":"9689","ad":"KÜTAHYA","lat":39.4199106,"lon":29.9857886},
  {"id":"9693","ad":"TAVŞANLI","lat":39.5451154,"lon":29.4955339},
  {"id":"9687","ad":"GEDİZ","lat":38.9898441,"lon":29.3939571},
  {"id":"9703","ad":"MALATYA","lat":38.3487153,"lon":38.3190674},
  {"id":"9698","ad":"DOĞANŞEHİR","lat":38.0934102,"lon":37.8784394},
  {"id":"9716","ad":"MANİSA","lat":38.6125793,"lon":27.4333969},
  {"id":"9708","ad":"AKHİSAR","lat":38.9240528,"lon":27.8401895},
  {"id":"9709","ad":"ALAŞEHİR","lat":38.3507471,"lon":28.516575},
  {"id":"9717","ad":"SALİHLİ","lat":38.4829405,"lon":28.1309046},
  {"id":"9722","ad":"TURGUTLU","lat":38.5000458,"lon":27.7084176},
  {"id":"9726","ad":"MARDİN","lat":37.3132581,"lon":40.7354383},
  {"id":"9725","ad":"KIZILTEPE","lat":37.1916551,"lon":40.5847974},
  {"id":"9728","ad":"MİDYAT","lat":37.4152662,"lon":41.3733325},
  {"id":"9729","ad":"NUSAYBİN","lat":37.0691755,"lon":41.2164671},
  {"id":"9737","ad":"MERSİN","lat":36.7978381,"lon":34.6298391},
  {"id":"9740","ad":"TARSUS","lat":36.9164834,"lon":34.895149},
  {"id":"9735","ad":"ERDEMLİ","lat":36.6057089,"lon":34.3102872},
  {"id":"9731","ad":"ANAMUR","lat":36.080323,"lon":32.8312106},
  {"id":"9739","ad":"SİLİFKE","lat":36.3778166,"lon":33.9260372},
  {"id":"9747","ad":"MUĞLA","lat":37.2151784,"lon":28.363733},
  {"id":"9741","ad":"BODRUM","lat":37.0343987,"lon":27.430651},
  {"id":"9744","ad":"FETHİYE","lat":36.6221154,"lon":29.1153384},
  {"id":"17883","ad":"MARMARİS","lat":36.8522547,"lon":28.2742661},
  {"id":"9746","ad":"MİLAS","lat":37.3162709,"lon":27.7799762},
  {"id":"9755","ad":"MUŞ","lat":38.7322221,"lon":41.4898925},
  {"id":"9760","ad":"NEVŞEHİR","lat":38.5871556,"lon":34.7196633},
  {"id":"9761","ad":"ÜRGÜP","lat":38.6300508,"lon":34.9116025},
  {"id":"9766","ad":"NİĞDE","lat":37.969849,"lon":34.6764495},
  {"id":"9782","ad":"ORDU","lat":40.9852301,"lon":37.8797732},
  {"id":"9783","ad":"ÜNYE","lat":41.1262405,"lon":37.2853616},
  {"id":"9773","ad":"FATSA","lat":41.0308808,"lon":37.500221},
  {"id":"9788","ad":"OSMANİYE","lat":37.0733588,"lon":36.2507673},
  {"id":"9787","ad":"KADİRLİ","lat":37.4617702,"lon":36.1694093},
  {"id":"9799","ad":"RİZE","lat":41.0248249,"lon":40.5199142},
  {"id":"9791","ad":"ARDEŞEN","lat":41.191875,"lon":40.9894178},
  {"id":"9793","ad":"ÇAYELİ","lat":41.0878328,"lon":40.7236973},
  {"id":"9807","ad":"SAKARYA","lat":40.7726291,"lon":30.4038575},
  {"id":"9800","ad":"AKYAZI","lat":40.6814188,"lon":30.6246106},
  {"id":"9802","ad":"HENDEK","lat":40.7955034,"lon":30.7452727},
  {"id":"9831","ad":"ŞANLIURFA","lat":37.1596239,"lon":38.791929},
  {"id":"9825","ad":"BİRECİK","lat":37.0315322,"lon":37.9800265},
  {"id":"9832","ad":"SİVEREK","lat":37.7540905,"lon":39.3177426},
  {"id":"9839","ad":"SİİRT","lat":37.9273623,"lon":41.94218},
  {"id":"9847","ad":"SİNOP","lat":42.0265798,"lon":35.1511512},
  {"id":"9841","ad":"BOYABAT","lat":41.4689736,"lon":34.7672274},
  {"id":"9854","ad":"ŞIRNAK","lat":37.548722,"lon":42.3618788},
  {"id":"9850","ad":"CİZRE","lat":37.3324374,"lon":42.1854699},
  {"id":"9853","ad":"SİLOPİ","lat":37.2491577,"lon":42.4707504},
  {"id":"9868","ad":"SİVAS","lat":39.7503574,"lon":37.0145173},
  {"id":"9858","ad":"DİVRİĞİ","lat":39.3686911,"lon":38.1138482},
  {"id":"9867","ad":"ŞARKIŞLA","lat":39.3640928,"lon":36.4031578},
  {"id":"9879","ad":"TEKİRDAĞ","lat":40.9781214,"lon":27.5107799},
  {"id":"9872","ad":"ÇERKEZKÖY","lat":41.2862482,"lon":27.999468},
  {"id":"9873","ad":"ÇORLU","lat":41.1590875,"lon":27.8041066},
  {"id":"9887","ad":"TOKAT","lat":40.3233534,"lon":36.552162},
  {"id":"9888","ad":"TURHAL","lat":40.3895887,"lon":36.078043},
  {"id":"17910","ad":"ERBAA","lat":40.6727976,"lon":36.5715055},
  {"id":"9905","ad":"TRABZON","lat":41.0054605,"lon":39.7301463},
  {"id":"9891","ad":"AKÇAABAT","lat":41.0216276,"lon":39.5706735},
  {"id":"9901","ad":"OF","lat":40.947642,"lon":40.2694068},
  {"id":"9903","ad":"SÜRMENE","lat":40.9127715,"lon":40.1134808},
  {"id":"9906","ad":"VAKFIKEBİR","lat":41.047236,"lon":39.2761909},
  {"id":"9914","ad":"TUNCELİ","lat":39.1060641,"lon":39.5482693},
  {"id":"9919","ad":"UŞAK","lat":38.6740401,"lon":29.4058419},
  {"id":"9930","ad":"VAN","lat":38.500875,"lon":43.3946051},
  {"id":"9925","ad":"ERCİŞ","lat":39.0289887,"lon":43.3591059},
  {"id":"9935","ad":"YALOVA","lat":40.6582529,"lon":29.2699916},
  {"id":"9949","ad":"YOZGAT","lat":39.8221974,"lon":34.8080972},
  {"id":"9946","ad":"SORGUN","lat":39.8098675,"lon":35.1854305},
  {"id":"9955","ad":"ZONGULDAK","lat":41.4506981,"lon":31.7919867},
  {"id":"9954","ad":"KARADENİZ EREĞLİ","lat":41.2795516,"lon":31.4229672},
  {"id":"9951","ad":"ÇAYCUMA","lat":41.4269456,"lon":32.0728211},
  {"id":"9238","ad":"ARDAHAN","lat":41.1102966,"lon":42.7035585},
  {"id":"9246","ad":"ARTVİN","lat":41.1830811,"lon":41.8287448},
  {"id":"9248","ad":"HOPA","lat":41.3853867,"lon":41.4631932},
  {"id":"9252","ad":"AYDIN","lat":37.8483767,"lon":27.8435878},
  {"id":"9256","ad":"DİDİM","lat":37.3696865,"lon":27.2684841},
  {"id":"9263","ad":"KUŞADASI","lat":37.8632398,"lon":27.266873},
  {"id":"9265","ad":"NAZİLLİ","lat":37.9140609,"lon":28.3270857},
  {"id":"9266","ad":"SÖKE","lat":37.7519762,"lon":27.4056294},
  {"id":"9270","ad":"BALIKESİR","lat":39.6473917,"lon":27.8879787},
  {"id":"17917","ad":"BANDIRMA","lat":40.3554705,"lon":27.9697603},
  {"id":"9275","ad":"EDREMİT","lat":39.5938352,"lon":27.0156844},
  {"id":"9269","ad":"AYVALIK","lat":39.3180962,"lon":26.6916708},
  {"id":"9285","ad":"BARTIN","lat":41.6350461,"lon":32.3366205},
  {"id":"9288","ad":"BATMAN","lat":37.8835738,"lon":41.1277565},
  {"id":"9292","ad":"KOZLUK","lat":38.1933398,"lon":41.4886025},
  {"id":"9295","ad":"BAYBURT","lat":40.2551608,"lon":40.2205036},
  {"id":"9297","ad":"BİLECİK","lat":40.1435101,"lon":29.9752911},
  {"id":"9298","ad":"BOZÜYÜK","lat":39.9042599,"lon":30.0372781},
  {"id":"9303","ad":"BİNGÖL","lat":38.8861265,"lon":40.4972333},
  {"id":"9304","ad":"KARLIOVA","lat":39.2945998,"lon":41.0102383},
  {"id":"9311","ad":"BİTLİS","lat":38.4020539,"lon":42.1084568},
  {"id":"9314","ad":"TATVAN","lat":38.4931961,"lon":42.2878112},
  {"id":"9315","ad":"BOLU","lat":40.7332953,"lon":31.6110479},
  {"id":"9317","ad":"GEREDE","lat":40.7987548,"lon":32.2009075},
  {"id":"9327","ad":"BURDUR","lat":37.7248394,"lon":30.2887286},
  {"id":"9326","ad":"BUCAK","lat":37.4567447,"lon":30.5855392},
  {"id":"9352","ad":"ÇANAKKALE","lat":40.146271,"lon":26.4028892},
  {"id":"9349","ad":"BİGA","lat":40.2269793,"lon":27.2428365},
  {"id":"9353","ad":"GELİBOLU","lat":40.4054063,"lon":26.6722539},
  {"id":"9359","ad":"ÇANKIRI","lat":40.5971947,"lon":33.6212704},
  {"id":"9370","ad":"ÇORUM","lat":40.5499106,"lon":34.9537344},
  {"id":"9378","ad":"OSMANCIK","lat":40.9714839,"lon":34.8010408},
  {"id":"9392","ad":"DENİZLİ","lat":37.7827875,"lon":29.0966476},
  {"id":"19020","ad":"ACIPAYAM","lat":37.4273777,"lon":29.3505097},
  {"id":"9391","ad":"ÇİVRİL","lat":38.3005877,"lon":29.7373813},
  {"id":"9581","ad":"KARABÜK","lat":41.1955402,"lon":32.6231154},
  {"id":"9238","ad":"ARDAHAN","lat":41.1102966,"lon":42.7035585}
];

// Haversine mesafe hesaplama (km)
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dlat = (lat2 - lat1) * Math.PI / 180;
  const dlon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dlat/2)**2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dlon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// En yakin ilceyi bul
function enYakinIlce(lat, lon) {
  let minDist = Infinity;
  let enYakin = ILCELER[0];
  for (const ilce of ILCELER) {
    const d = haversine(lat, lon, ilce.lat, ilce.lon);
    if (d < minDist) {
      minDist = d;
      enYakin = ilce;
    }
  }
  return { ilce: enYakin, mesafe: minDist };
}

// Diyanet sitesinden HTML cek ve parse et
function diyanettenCek(ilceId) {
  return new Promise((resolve, reject) => {
    const url = `https://namazvakitleri.diyanet.gov.tr/tr-TR/${ilceId}`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'tr-TR,tr;q=0.9',
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // Vakitleri HTML'den parse et
          // Diyanet sitesi: <div class="vakit-item"> veya table formatinda
          const vakitler = parseVakitler(data);
          resolve(vakitler);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function parseVakitler(html) {
  // Diyanet'in HTML yapisi:
  // Vakitler genellikle <span> veya <td> icerisinde HH:MM formatinda
  // Siralama: Imsak, Gunes, Ogle, Ikindi, Aksam, Yatsi

  // JSON-LD veya meta tag kontrolu
  const jsonLdMatch = html.match(/"Fajr"[:\s]+"(\d{2}:\d{2})"/);

  // Alternatif: tablo icindeki vakitler
  // Diyanet sitesinde <div id="oggi-vakit-zamani"> gibi bir yapi var
  // Saat pattern: iki rakam : iki rakam
  const timePattern = /(\d{2}):(\d{2})/g;
  const times = [];
  let match;

  // Sadece gece yarisi oncesindeki saatleri al
  const body = html.replace(/<!--[\s\S]*?-->/g, ''); // HTML yorumlarini temizle

  // Daha spesifik: vakit kutucuklarini bul
  // Diyanet'in yeni sitesinde .vakit-item veya benzer class
  const vakitItemRegex = /<(?:td|div|span)[^>]*class="[^"]*vakit[^"]*"[^>]*>[\s\S]*?(\d{2}:\d{2})[\s\S]*?<\/(?:td|div|span)>/gi;
  const vakitMatches = [];
  let vm;
  while ((vm = vakitItemRegex.exec(body)) !== null) {
    vakitMatches.push(vm[1]);
    if (vakitMatches.length >= 6) break;
  }

  if (vakitMatches.length >= 6) {
    return {
      imsak: vakitMatches[0],
      gunes: vakitMatches[1],
      ogle: vakitMatches[2],
      ikindi: vakitMatches[3],
      aksam: vakitMatches[4],
      yatsi: vakitMatches[5],
    };
  }

  // Fallback: Sayfadaki tum HH:MM formatlarini bul
  const allTimes = [...body.matchAll(/\b([01]\d|2[0-3]):([0-5]\d)\b/g)]
    .map(m => m[0])
    .filter((t, i, arr) => arr.indexOf(t) === i); // unique

  // Imsak genellikle 03:xx - 06:xx arasi
  // Gunes 06:xx - 08:xx
  // Ogle 11:xx - 14:xx
  // Ikindi 14:xx - 17:xx
  // Aksam 17:xx - 21:xx
  // Yatsi 19:xx - 23:xx

  // Diyanet'in HTML'sinden dogru siralamayi cek
  // Sayfada ilk 6 benzersiz vakit saati genellikle dogru sirayla gelir
  const vakitSaatleri = allTimes.slice(0, 6);

  if (vakitSaatleri.length >= 6) {
    return {
      imsak: vakitSaatleri[0],
      gunes: vakitSaatleri[1],
      ogle: vakitSaatleri[2],
      ikindi: vakitSaatleri[3],
      aksam: vakitSaatleri[4],
      yatsi: vakitSaatleri[5],
    };
  }

  throw new Error('Vakitler parse edilemedi');
}

// Ana handler
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat ve lon parametreleri gerekli' });
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (isNaN(latNum) || isNaN(lonNum)) {
    return res.status(400).json({ error: 'Gecersiz koordinat' });
  }

  try {
    const { ilce, mesafe } = enYakinIlce(latNum, lonNum);
    const vakitler = await diyanettenCek(ilce.id);

    return res.status(200).json({
      ilce: ilce.ad,
      ilce_id: ilce.id,
      mesafe_km: Math.round(mesafe * 10) / 10,
      ...vakitler
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
