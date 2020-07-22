
export function getCountries() {
    let countries = [{"name":"Afghanistan","id":"AF"},{"name":"Åland Islands","id":"AX"},{"name":"Albania","id":"AL"},{"name":"Algeria","id":"DZ"},{"name":"American Samoa","id":"AS"},{"name":"Andorra","id":"AD"},{"name":"Angola","id":"AO"},{"name":"Anguilla","id":"AI"},{"name":"Antarctica","id":"AQ"},{"name":"Antigua and Barbuda","id":"AG"},{"name":"Argentina","id":"AR"},{"name":"Armenia","id":"AM"},{"name":"Aruba","id":"AW"},{"name":"Australia","id":"AU"},{"name":"Austria","id":"AT"},{"name":"Azerbaijan","id":"AZ"},{"name":"Bahamas","id":"BS"},{"name":"Bahrain","id":"BH"},{"name":"Bangladesh","id":"BD"},{"name":"Barbados","id":"BB"},{"name":"Belarus","id":"BY"},{"name":"Belgium","id":"BE"},{"name":"Belize","id":"BZ"},{"name":"Benin","id":"BJ"},{"name":"Bermuda","id":"BM"},{"name":"Bhutan","id":"BT"},{"name":"\"Bolivia, Plurinational State of\"","id":"BO"},{"name":"\"Bonaire, Sint Eustatius and Saba\"","id":"BQ"},{"name":"Bosnia and Herzegovina","id":"BA"},{"name":"Botswana","id":"BW"},{"name":"Bouvet Island","id":"BV"},{"name":"Brazil","id":"BR"},{"name":"British Indian Ocean Territory","id":"IO"},{"name":"Brunei Darussalam","id":"BN"},{"name":"Bulgaria","id":"BG"},{"name":"Burkina Faso","id":"BF"},{"name":"Burundi","id":"BI"},{"name":"Cambodia","id":"KH"},{"name":"Cameroon","id":"CM"},{"name":"Canada","id":"CA"},{"name":"Cape Verde","id":"CV"},{"name":"Cayman Islands","id":"KY"},{"name":"Central African Republic","id":"CF"},{"name":"Chad","id":"TD"},{"name":"Chile","id":"CL"},{"name":"China","id":"CN"},{"name":"Christmas Island","id":"CX"},{"name":"Cocos (Keeling) Islands","id":"CC"},{"name":"Colombia","id":"CO"},{"name":"Comoros","id":"KM"},{"name":"Congo","id":"CG"},{"name":"\"Congo, the Democratic Republic of the\"","id":"CD"},{"name":"Cook Islands","id":"CK"},{"name":"Costa Rica","id":"CR"},{"name":"Côte d'Ivoire","id":"CI"},{"name":"Croatia","id":"HR"},{"name":"Cuba","id":"CU"},{"name":"Curaçao","id":"CW"},{"name":"Cyprus","id":"CY"},{"name":"Czech Republic","id":"CZ"},{"name":"Denmark","id":"DK"},{"name":"Djibouti","id":"DJ"},{"name":"Dominica","id":"DM"},{"name":"Dominican Republic","id":"DO"},{"name":"Ecuador","id":"EC"},{"name":"Egypt","id":"EG"},{"name":"El Salvador","id":"SV"},{"name":"Equatorial Guinea","id":"GQ"},{"name":"Eritrea","id":"ER"},{"name":"Estonia","id":"EE"},{"name":"Ethiopia","id":"ET"},{"name":"Falkland Islands (Malvinas)","id":"FK"},{"name":"Faroe Islands","id":"FO"},{"name":"Fiji","id":"FJ"},{"name":"Finland","id":"FI"},{"name":"France","id":"FR"},{"name":"French Guiana","id":"GF"},{"name":"French Polynesia","id":"PF"},{"name":"French Southern Territories","id":"TF"},{"name":"Gabon","id":"GA"},{"name":"Gambia","id":"GM"},{"name":"Georgia","id":"GE"},{"name":"Germany","id":"DE"},{"name":"Ghana","id":"GH"},{"name":"Gibraltar","id":"GI"},{"name":"Greece","id":"GR"},{"name":"Greenland","id":"GL"},{"name":"Grenada","id":"GD"},{"name":"Guadeloupe","id":"GP"},{"name":"Guam","id":"GU"},{"name":"Guatemala","id":"GT"},{"name":"Guernsey","id":"GG"},{"name":"Guinea","id":"GN"},{"name":"Guinea-Bissau","id":"GW"},{"name":"Guyana","id":"GY"},{"name":"Haiti","id":"HT"},{"name":"Heard Island and McDonald Islands","id":"HM"},{"name":"Holy See (Vatican City State)","id":"VA"},{"name":"Honduras","id":"HN"},{"name":"Hong Kong","id":"HK"},{"name":"Hungary","id":"HU"},{"name":"Iceland","id":"IS"},{"name":"India","id":"IN"},{"name":"Indonesia","id":"ID"},{"name":"\"Iran, Islamic Republic of\"","id":"IR"},{"name":"Iraq","id":"IQ"},{"name":"Ireland","id":"IE"},{"name":"Isle of Man","id":"IM"},{"name":"Israel","id":"IL"},{"name":"Italy","id":"IT"},{"name":"Jamaica","id":"JM"},{"name":"Japan","id":"JP"},{"name":"Jersey","id":"JE"},{"name":"Jordan","id":"JO"},{"name":"Kazakhstan","id":"KZ"},{"name":"Kenya","id":"KE"},{"name":"Kiribati","id":"KI"},{"name":"\"Korea, Democratic People's Republic of\"","id":"KP"},{"name":"\"Korea, Republic of\"","id":"KR"},{"name":"Kuwait","id":"KW"},{"name":"Kyrgyzstan","id":"KG"},{"name":"Lao People's Democratic Republic","id":"LA"},{"name":"Latvia","id":"LV"},{"name":"Lebanon","id":"LB"},{"name":"Lesotho","id":"LS"},{"name":"Liberia","id":"LR"},{"name":"Libya","id":"LY"},{"name":"Liechtenstein","id":"LI"},{"name":"Lithuania","id":"LT"},{"name":"Luxembourg","id":"LU"},{"name":"Macao","id":"MO"},{"name":"\"Macedonia, the Former Yugoslav Republic of\"","id":"MK"},{"name":"Madagascar","id":"MG"},{"name":"Malawi","id":"MW"},{"name":"Malaysia","id":"MY"},{"name":"Maldives","id":"MV"},{"name":"Mali","id":"ML"},{"name":"Malta","id":"MT"},{"name":"Marshall Islands","id":"MH"},{"name":"Martinique","id":"MQ"},{"name":"Mauritania","id":"MR"},{"name":"Mauritius","id":"MU"},{"name":"Mayotte","id":"YT"},{"name":"Mexico","id":"MX"},{"name":"\"Micronesia, Federated States of\"","id":"FM"},{"name":"\"Moldova, Republic of\"","id":"MD"},{"name":"Monaco","id":"MC"},{"name":"Mongolia","id":"MN"},{"name":"Montenegro","id":"ME"},{"name":"Montserrat","id":"MS"},{"name":"Morocco","id":"MA"},{"name":"Mozambique","id":"MZ"},{"name":"Myanmar","id":"MM"},{"name":"Namibia","id":"NA"},{"name":"Nauru","id":"NR"},{"name":"Nepal","id":"NP"},{"name":"Netherlands","id":"NL"},{"name":"New Caledonia","id":"NC"},{"name":"New Zealand","id":"NZ"},{"name":"Nicaragua","id":"NI"},{"name":"Niger","id":"NE"},{"name":"Nigeria","id":"NG"},{"name":"Niue","id":"NU"},{"name":"Norfolk Island","id":"NF"},{"name":"Northern Mariana Islands","id":"MP"},{"name":"Norway","id":"NO"},{"name":"Oman","id":"OM"},{"name":"Pakistan","id":"PK"},{"name":"Palau","id":"PW"},{"name":"\"Palestine, State of\"","id":"PS"},{"name":"Panama","id":"PA"},{"name":"Papua New Guinea","id":"PG"},{"name":"Paraguay","id":"PY"},{"name":"Peru","id":"PE"},{"name":"Philippines","id":"PH"},{"name":"Pitcairn","id":"PN"},{"name":"Poland","id":"PL"},{"name":"Portugal","id":"PT"},{"name":"Puerto Rico","id":"PR"},{"name":"Qatar","id":"QA"},{"name":"Réunion","id":"RE"},{"name":"Romania","id":"RO"},{"name":"Russian Federation","id":"RU"},{"name":"Rwanda","id":"RW"},{"name":"Saint Barthélemy","id":"BL"},{"name":"\"Saint Helena, Ascension and Tristan da Cunha\"","id":"SH"},{"name":"Saint Kitts and Nevis","id":"KN"},{"name":"Saint Lucia","id":"LC"},{"name":"Saint Martin (French part)","id":"MF"},{"name":"Saint Pierre and Miquelon","id":"PM"},{"name":"Saint Vincent and the Grenadines","id":"VC"},{"name":"Samoa","id":"WS"},{"name":"San Marino","id":"SM"},{"name":"Sao Tome and Principe","id":"ST"},{"name":"Saudi Arabia","id":"SA"},{"name":"Senegal","id":"SN"},{"name":"Serbia","id":"RS"},{"name":"Seychelles","id":"SC"},{"name":"Sierra Leone","id":"SL"},{"name":"Singapore","id":"SG"},{"name":"Sint Maarten (Dutch part)","id":"SX"},{"name":"Slovakia","id":"SK"},{"name":"Slovenia","id":"SI"},{"name":"Solomon Islands","id":"SB"},{"name":"Somalia","id":"SO"},{"name":"South Africa","id":"ZA"},{"name":"South Georgia and the South Sandwich Islands","id":"GS"},{"name":"South Sudan","id":"SS"},{"name":"Spain","id":"ES"},{"name":"Sri Lanka","id":"LK"},{"name":"Sudan","id":"SD"},{"name":"Suriname","id":"SR"},{"name":"Svalbard and Jan Mayen","id":"SJ"},{"name":"Swaziland","id":"SZ"},{"name":"Sweden","id":"SE"},{"name":"Switzerland","id":"CH"},{"name":"Syrian Arab Republic","id":"SY"},{"name":"\"Taiwan, Province of China\"","id":"TW"},{"name":"Tajikistan","id":"TJ"},{"name":"\"Tanzania, United Republic of\"","id":"TZ"},{"name":"Thailand","id":"TH"},{"name":"Timor-Leste","id":"TL"},{"name":"Togo","id":"TG"},{"name":"Tokelau","id":"TK"},{"name":"Tonga","id":"TO"},{"name":"Trinidad and Tobago","id":"TT"},{"name":"Tunisia","id":"TN"},{"name":"Turkey","id":"TR"},{"name":"Turkmenistan","id":"TM"},{"name":"Turks and Caicos Islands","id":"TC"},{"name":"Tuvalu","id":"TV"},{"name":"Uganda","id":"UG"},{"name":"Ukraine","id":"UA"},{"name":"United Arab Emirates","id":"AE"},{"name":"United Kingdom","id":"GB"},{"name":"United States","id":"US"},{"name":"United States Minor Outlying Islands","id":"UM"},{"name":"Uruguay","id":"UY"},{"name":"Uzbekistan","id":"UZ"},{"name":"Vanuatu","id":"VU"},{"name":"\"Venezuela, Bolivarian Republic of\"","id":"VE"},{"name":"Viet Nam","id":"VN"},{"name":"\"Virgin Islands, British\"","id":"VG"},{"name":"\"Virgin Islands, U.S.\"","id":"VI"},{"name":"Wallis and Futuna","id":"WF"},{"name":"Western Sahara","id":"EH"},{"name":"Yemen","id":"YE"},{"name":"Zambia","id":"ZM"},{"name":"Zimbabwe","id":"ZW"}]
    return countries
}
export function getCurrencies() {
    return [{"desc":"Afghanistan Afghani","id":"AFN","symb":"؋"},{"desc":"Albania Lek","id":"ALL","symb":"Lek"},{"desc":"Argentina Peso","id":"ARS","symb":"$"},{"desc":"Aruba Guilder","id":"AWG","symb":"ƒ"},{"desc":"Australia Dollar","id":"AUD","symb":"$"},{"desc":"Azerbaijan Manat","id":"AZN","symb":"₼"},{"desc":"Bahamas Dollar","id":"BSD","symb":"$"},{"desc":"Barbados Dollar","id":"BBD","symb":"$"},{"desc":"Belarus Ruble","id":"BYN","symb":"Br"},{"desc":"Belize Dollar","id":"BZD","symb":"BZ$"},{"desc":"Bermuda Dollar","id":"BMD","symb":"$"},{"desc":"Bolivia Bolíviano","id":"BOB","symb":"$b"},{"desc":"Bosnia and Herzegovina Convertible Mark","id":"BAM","symb":"KM"},{"desc":"Botswana Pula","id":"BWP","symb":"P"},{"desc":"Brazil Real","id":"BRL","symb":"R$"},{"desc":"Brunei Darussalam Dollar","id":"BND","symb":"$"},{"desc":"Bulgaria Lev","id":"BGN","symb":"лв"},{"desc":"Cambodia Riel","id":"KHR","symb":"៛"},{"desc":"Canada Dollar","id":"CAD","symb":"$"},{"desc":"Cayman Islands Dollar","id":"KYD","symb":"$"},{"desc":"Chile Peso","id":"CLP","symb":"$"},{"desc":"China Yuan Renminbi","id":"CNY","symb":"¥"},{"desc":"Colombia Peso","id":"COP","symb":"$"},{"desc":"Costa Rica Colon","id":"CRC","symb":"₡"},{"desc":"Croatia Kuna","id":"HRK","symb":"kn"},{"desc":"Cuba Peso","id":"CUP","symb":"₱"},{"desc":"Czech Republic Koruna","id":"CZK","symb":"Kč"},{"desc":"Denmark Krone","id":"DKK","symb":"kr"},{"desc":"Dominican Republic Peso","id":"DOP","symb":"RD$"},{"desc":"East Caribbean Dollar","id":"XCD","symb":"$"},{"desc":"Egypt Pound","id":"EGP","symb":"£"},{"desc":"El Salvador Colon","id":"SVC","symb":"$"},{"desc":"Euro Member Countries","id":"EUR","symb":"€"},{"desc":"Falkland Islands (Malvinas) Pound","id":"FKP","symb":"£"},{"desc":"Fiji Dollar","id":"FJD","symb":"$"},{"desc":"Ghana Cedi","id":"GHS","symb":"¢"},{"desc":"Gibraltar Pound","id":"GIP","symb":"£"},{"desc":"Guatemala Quetzal","id":"GTQ","symb":"Q"},{"desc":"Guernsey Pound","id":"GGP","symb":"£"},{"desc":"Guyana Dollar","id":"GYD","symb":"$"},{"desc":"Honduras Lempira","id":"HNL","symb":"L"},{"desc":"Hong Kong Dollar","id":"HKD","symb":"$"},{"desc":"Hungary Forint","id":"HUF","symb":"Ft"},{"desc":"Iceland Krona","id":"ISK","symb":"kr"},{"desc":"India Rupee","id":"INR","symb":""},{"desc":"Indonesia Rupiah","id":"IDR","symb":"Rp"},{"desc":"Iran Rial","id":"IRR","symb":"﷼"},{"desc":"Isle of Man Pound","id":"IMP","symb":"£"},{"desc":"Israel Shekel","id":"ILS","symb":"₪"},{"desc":"Jamaica Dollar","id":"JMD","symb":"J$"},{"desc":"Japan Yen","id":"JPY","symb":"¥"},{"desc":"Jersey Pound","id":"JEP","symb":"£"},{"desc":"Kazakhstan Tenge","id":"KZT","symb":"лв"},{"desc":"Korea (North) Won","id":"KPW","symb":"₩"},{"desc":"Korea (South) Won","id":"KRW","symb":"₩"},{"desc":"Kyrgyzstan Som","id":"KGS","symb":"лв"},{"desc":"Laos Kip","id":"LAK","symb":"₭"},{"desc":"Lebanon Pound","id":"LBP","symb":"£"},{"desc":"Liberia Dollar","id":"LRD","symb":"$"},{"desc":"Macedonia Denar","id":"MKD","symb":"ден"},{"desc":"Malaysia Ringgit","id":"MYR","symb":"RM"},{"desc":"Mauritius Rupee","id":"MUR","symb":"₨"},{"desc":"Mexico Peso","id":"MXN","symb":"$"},{"desc":"Mongolia Tughrik","id":"MNT","symb":"₮"},{"desc":"Mozambique Metical","id":"MZN","symb":"MT"},{"desc":"Namibia Dollar","id":"NAD","symb":"$"},{"desc":"Nepal Rupee","id":"NPR","symb":"₨"},{"desc":"Netherlands Antilles Guilder","id":"ANG","symb":"ƒ"},{"desc":"New Zealand Dollar","id":"NZD","symb":"$"},{"desc":"Nicaragua Cordoba","id":"NIO","symb":"C$"},{"desc":"Nigeria Naira","id":"NGN","symb":"₦"},{"desc":"Norway Krone","id":"NOK","symb":"kr"},{"desc":"Oman Rial","id":"OMR","symb":"﷼"},{"desc":"Pakistan Rupee","id":"PKR","symb":"₨"},{"desc":"Panama Balboa","id":"PAB","symb":"B/."},{"desc":"Paraguay Guarani","id":"PYG","symb":"Gs"},{"desc":"Peru Sol","id":"PEN","symb":"S/."},{"desc":"Philippines Peso","id":"PHP","symb":"₱"},{"desc":"Poland Zloty","id":"PLN","symb":"zł"},{"desc":"Qatar Riyal","id":"QAR","symb":"﷼"},{"desc":"Romania Leu","id":"RON","symb":"lei"},{"desc":"Russia Ruble","id":"RUB","symb":"₽"},{"desc":"Saint Helena Pound","id":"SHP","symb":"£"},{"desc":"Saudi Arabia Riyal","id":"SAR","symb":"﷼"},{"desc":"Serbia Dinar","id":"RSD","symb":"Дин."},{"desc":"Seychelles Rupee","id":"SCR","symb":"₨"},{"desc":"Singapore Dollar","id":"SGD","symb":"$"},{"desc":"Solomon Islands Dollar","id":"SBD","symb":"$"},{"desc":"Somalia Shilling","id":"SOS","symb":"S"},{"desc":"South Africa Rand","id":"ZAR","symb":"R"},{"desc":"Sri Lanka Rupee","id":"LKR","symb":"₨"},{"desc":"Suriname Dollar","id":"SRD","symb":"$"},{"desc":"Sweden Krona","id":"SEK","symb":"kr"},{"desc":"Switzerland Franc","id":"CHF","symb":"CHF"},{"desc":"Syria Pound","id":"SYP","symb":"£"},{"desc":"Taiwan New Dollar","id":"TWD","symb":"NT$"},{"desc":"Thailand Baht","id":"THB","symb":"฿"},{"desc":"Trinidad and Tobago Dollar","id":"TTD","symb":"TT$"},{"desc":"Turkey Lira","id":"TRY","symb":""},{"desc":"Tuvalu Dollar","id":"TVD","symb":"$"},{"desc":"Ukraine Hryvnia","id":"UAH","symb":"₴"},{"desc":"United Kingdom Pound","id":"GBP","symb":"£"},{"desc":"United States Dollar","id":"USD","symb":"$"},{"desc":"Uruguay Peso","id":"UYU","symb":"$U"},{"desc":"Uzbekistan Som","id":"UZS","symb":"лв"},{"desc":"Venezuela Bolívar","id":"VEF","symb":"Bs"},{"desc":"Viet Nam Dong","id":"VND","symb":"₫"},{"desc":"Yemen Rial","id":"YER","symb":"﷼"},{"desc":"Zimbabwe Dollar","id":"ZWD","symb":"Z$"}]
}

export function getPriceCurrency() {
    return "USD"
}
export function getCanadaProvinces() {
    return [{"id":"AB","name":"Alberta"},{"id":"BC","name":"British Columbia"},{"id":"MB","name":"Manitoba"},{"id":"NB","name":"New Brunswick"},{"id":"NL","name":"Newfoundland and Labrador"},{"id":"NS","name":"Nova Scotia"},{"id":"ON","name":"Ontario"},{"id":"PE","name":"Prince Edward Island"},{"id":"QC","name":"Quebec"},{"id":"SK","name":"Saskatchewan"},{"id":"NT","name":"Northwest Territories"},{"id":"NU","name":"Nunavut"},{"id":"YT","name":"Yukon"}]
}
export function getUSStates() {
    return [{"name":"Alabama","id":"AL"},{"name":"Alaska","id":"AK"},{"name":"American Samoa","id":"AS"},{"name":"Arizona","id":"AZ"},{"name":"Arkansas","id":"AR"},{"name":"California","id":"CA"},{"name":"Colorado","id":"CO"},{"name":"Connecticut","id":"CT"},{"name":"Delaware","id":"DE"},{"name":"District Of Columbia","id":"DC"},{"name":"Federated States Of Micronesia","id":"FM"},{"name":"Florida","id":"FL"},{"name":"Georgia","id":"GA"},{"name":"Guam","id":"GU"},{"name":"Hawaii","id":"HI"},{"name":"Idaho","id":"ID"},{"name":"Illinois","id":"IL"},{"name":"Indiana","id":"IN"},{"name":"Iowa","id":"IA"},{"name":"Kansas","id":"KS"},{"name":"Kentucky","id":"KY"},{"name":"Louisiana","id":"LA"},{"name":"Maine","id":"ME"},{"name":"Marshall Islands","id":"MH"},{"name":"Maryland","id":"MD"},{"name":"Massachusetts","id":"MA"},{"name":"Michigan","id":"MI"},{"name":"Minnesota","id":"MN"},{"name":"Mississippi","id":"MS"},{"name":"Missouri","id":"MO"},{"name":"Montana","id":"MT"},{"name":"Nebraska","id":"NE"},{"name":"Nevada","id":"NV"},{"name":"New Hampshire","id":"NH"},{"name":"New Jersey","id":"NJ"},{"name":"New Mexico","id":"NM"},{"name":"New York","id":"NY"},{"name":"North Carolina","id":"NC"},{"name":"North Dakota","id":"ND"},{"name":"Northern Mariana Islands","id":"MP"},{"name":"Ohio","id":"OH"},{"name":"Oklahoma","id":"OK"},{"name":"Oregon","id":"OR"},{"name":"Palau","id":"PW"},{"name":"Pennsylvania","id":"PA"},{"name":"Puerto Rico","id":"PR"},{"name":"Rhode Island","id":"RI"},{"name":"South Carolina","id":"SC"},{"name":"South Dakota","id":"SD"},{"name":"Tennessee","id":"TN"},{"name":"Texas","id":"TX"},{"name":"Utah","id":"UT"},{"name":"Vermont","id":"VT"},{"name":"Virgin Islands","id":"VI"},{"name":"Virginia","id":"VA"},{"name":"Washington","id":"WA"},{"name":"West Virginia","id":"WV"},{"name":"Wisconsin","id":"WI"},{"name":"Wyoming","id":"WY"}]
}
export function getCountryPhonePrefixes(){
    return [{"c":"AC","n":"+247"},{"c":"AD","n":"+376"},{"c":"AE","n":"+971"},{"c":"AF","n":"+93"},{"c":"AG","n":"+1-268"},{"c":"AI","n":"+1-264"},{"c":"AL","n":"+355"},{"c":"AM","n":"+374"},{"c":"AN","n":"+599"},{"c":"AO","n":"+244"},{"c":"AR","n":"+54"},{"c":"AS","n":"+1-684"},{"c":"AT","n":"+43"},{"c":"AU","n":"+61"},{"c":"AW","n":"+297"},{"c":"AX","n":"+358-18"},{"c":"AZ","n":"+374-97"},{"c":"AZ","n":"+994"},{"c":"BA","n":"+387"},{"c":"BB","n":"+1-246"},{"c":"BD","n":"+880"},{"c":"BE","n":"+32"},{"c":"BF","n":"+226"},{"c":"BG","n":"+359"},{"c":"BH","n":"+973"},{"c":"BI","n":"+257"},{"c":"BJ","n":"+229"},{"c":"BM","n":"+1-441"},{"c":"BN","n":"+673"},{"c":"BO","n":"+591"},{"c":"BR","n":"+55"},{"c":"BS","n":"+1-242"},{"c":"BT","n":"+975"},{"c":"BW","n":"+267"},{"c":"BY","n":"+375"},{"c":"BZ","n":"+501"},{"c":"CA","n":"+1"},{"c":"CC","n":"+61"},{"c":"CD","n":"+243"},{"c":"CF","n":"+236"},{"c":"CG","n":"+242"},{"c":"CH","n":"+41"},{"c":"CI","n":"+225"},{"c":"CK","n":"+682"},{"c":"CL","n":"+56"},{"c":"CM","n":"+237"},{"c":"CN","n":"+86"},{"c":"CO","n":"+57"},{"c":"CR","n":"+506"},{"c":"CS","n":"+381"},{"c":"CU","n":"+53"},{"c":"CV","n":"+238"},{"c":"CX","n":"+61"},{"c":"CY","n":"+90-392"},{"c":"CY","n":"+357"},{"c":"CZ","n":"+420"},{"c":"DE","n":"+49"},{"c":"DJ","n":"+253"},{"c":"DK","n":"+45"},{"c":"DM","n":"+1-767"},{"c":"DO","n":"+1-809"},{"c":"DO","n":"+1-829"},{"c":"DZ","n":"+213"},{"c":"EC","n":"+593"},{"c":"EE","n":"+372"},{"c":"EG","n":"+20"},{"c":"EH","n":"+212"},{"c":"ER","n":"+291"},{"c":"ES","n":"+34"},{"c":"ET","n":"+251"},{"c":"FI","n":"+358"},{"c":"FJ","n":"+679"},{"c":"FK","n":"+500"},{"c":"FM","n":"+691"},{"c":"FO","n":"+298"},{"c":"FR","n":"+33"},{"c":"GA","n":"+241"},{"c":"GB","n":"+44"},{"c":"GD","n":"+1-473"},{"c":"GE","n":"+995"},{"c":"GF","n":"+594"},{"c":"GG","n":"+44"},{"c":"GH","n":"+233"},{"c":"GI","n":"+350"},{"c":"GL","n":"+299"},{"c":"GM","n":"+220"},{"c":"GN","n":"+224"},{"c":"GP","n":"+590"},{"c":"GQ","n":"+240"},{"c":"GR","n":"+30"},{"c":"GT","n":"+502"},{"c":"GU","n":"+1-671"},{"c":"GW","n":"+245"},{"c":"GY","n":"+592"},{"c":"HK","n":"+852"},{"c":"HN","n":"+504"},{"c":"HR","n":"+385"},{"c":"HT","n":"+509"},{"c":"HU","n":"+36"},{"c":"ID","n":"+62"},{"c":"IE","n":"+353"},{"c":"IL","n":"+972"},{"c":"IM","n":"+44"},{"c":"IN","n":"+91"},{"c":"IO","n":"+246"},{"c":"IQ","n":"+964"},{"c":"IR","n":"+98"},{"c":"IS","n":"+354"},{"c":"IT","n":"+39"},{"c":"JE","n":"+44"},{"c":"JM","n":"+1-876"},{"c":"JO","n":"+962"},{"c":"JP","n":"+81"},{"c":"KE","n":"+254"},{"c":"KG","n":"+996"},{"c":"KH","n":"+855"},{"c":"KI","n":"+686"},{"c":"KM","n":"+269"},{"c":"KN","n":"+1-869"},{"c":"KP","n":"+850"},{"c":"KR","n":"+82"},{"c":"KW","n":"+965"},{"c":"KY","n":"+1-345"},{"c":"KZ","n":"+7"},{"c":"LA","n":"+856"},{"c":"LB","n":"+961"},{"c":"LC","n":"+1-758"},{"c":"LI","n":"+423"},{"c":"LK","n":"+94"},{"c":"LR","n":"+231"},{"c":"LS","n":"+266"},{"c":"LT","n":"+370"},{"c":"LU","n":"+352"},{"c":"LV","n":"+371"},{"c":"LY","n":"+218"},{"c":"MA","n":"+212"},{"c":"MC","n":"+377"},{"c":"MD","n":"+373-533"},{"c":"MD","n":"+373"},{"c":"ME","n":"+382"},{"c":"MG","n":"+261"},{"c":"MH","n":"+692"},{"c":"MK","n":"+389"},{"c":"ML","n":"+223"},{"c":"MM","n":"+95"},{"c":"MN","n":"+976"},{"c":"MO","n":"+853"},{"c":"MP","n":"+1-670"},{"c":"MQ","n":"+596"},{"c":"MR","n":"+222"},{"c":"MS","n":"+1-664"},{"c":"MT","n":"+356"},{"c":"MU","n":"+230"},{"c":"MV","n":"+960"},{"c":"MW","n":"+265"},{"c":"MX","n":"+52"},{"c":"MY","n":"+60"},{"c":"MZ","n":"+258"},{"c":"NA","n":"+264"},{"c":"NC","n":"+687"},{"c":"NE","n":"+227"},{"c":"NF","n":"+672"},{"c":"NG","n":"+234"},{"c":"NI","n":"+505"},{"c":"NL","n":"+31"},{"c":"NO","n":"+47"},{"c":"NP","n":"+977"},{"c":"NR","n":"+674"},{"c":"NU","n":"+683"},{"c":"NZ","n":"+64"},{"c":"OM","n":"+968"},{"c":"PA","n":"+507"},{"c":"PE","n":"+51"},{"c":"PF","n":"+689"},{"c":"PG","n":"+675"},{"c":"PH","n":"+63"},{"c":"PK","n":"+92"},{"c":"PL","n":"+48"},{"c":"PM","n":"+508"},{"c":"PR","n":"+1-787"},{"c":"PR","n":"+1-939"},{"c":"PS","n":"+970"},{"c":"PT","n":"+351"},{"c":"PW","n":"+680"},{"c":"PY","n":"+595"},{"c":"QA","n":"+974"},{"c":"RE","n":"+262"},{"c":"RO","n":"+40"},{"c":"RS","n":"+381"},{"c":"RU","n":"+7"},{"c":"RW","n":"+250"},{"c":"SA","n":"+966"},{"c":"SB","n":"+677"},{"c":"SC","n":"+248"},{"c":"SD","n":"+249"},{"c":"SE","n":"+46"},{"c":"SG","n":"+65"},{"c":"SH","n":"+290"},{"c":"SI","n":"+386"},{"c":"SJ","n":"+47"},{"c":"SK","n":"+421"},{"c":"SL","n":"+232"},{"c":"SM","n":"+378"},{"c":"SN","n":"+221"},{"c":"SO","n":"+252"},{"c":"SO","n":"+252"},{"c":"SR","n":"+597"},{"c":"ST","n":"+239"},{"c":"SV","n":"+503"},{"c":"SY","n":"+963"},{"c":"SZ","n":"+268"},{"c":"TA","n":"+290"},{"c":"TC","n":"+1-649"},{"c":"TD","n":"+235"},{"c":"TG","n":"+228"},{"c":"TH","n":"+66"},{"c":"TJ","n":"+992"},{"c":"TK","n":"+690"},{"c":"TL","n":"+670"},{"c":"TM","n":"+993"},{"c":"TN","n":"+216"},{"c":"TO","n":"+676"},{"c":"TR","n":"+90"},{"c":"TT","n":"+1-868"},{"c":"TV","n":"+688"},{"c":"TW","n":"+886"},{"c":"TZ","n":"+255"},{"c":"UA","n":"+380"},{"c":"UG","n":"+256"},{"c":"US","n":"+1"},{"c":"UY","n":"+598"},{"c":"UZ","n":"+998"},{"c":"VA","n":"+379"},{"c":"VC","n":"+1-784"},{"c":"VE","n":"+58"},{"c":"VG","n":"+1-284"},{"c":"VI","n":"+1-340"},{"c":"VN","n":"+84"},{"c":"VU","n":"+678"},{"c":"WF","n":"+681"},{"c":"WS","n":"+685"},{"c":"YE","n":"+967"},{"c":"YT","n":"+262"},{"c":"ZA","n":"+27"},{"c":"ZM","n":"+260"},{"c":"ZW","n":"+263"}]
}