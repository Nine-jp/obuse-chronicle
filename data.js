// 神社仏閣のデータ
const spotsData = [
    {
        "id": "shrine_001",
        "name": "小布施大元神社",
        "type": "shrine",
        "description": "小布施の総鎮守とされる歴史ある神社",
        "latitude": 36.697810488546864,
        "longitude": 138.30982475328497,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_002",
        "name": "両皇大神宮",
        "type": "shrine",
        "description": "天照大神と天皇を祀る神聖な神宮",
        "latitude": 36.697866013023855,
        "longitude": 138.31598589887426,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_003",
        "name": "金刀比羅神社",
        "type": "shrine",
        "description": "航海・商売繁盛の神様を祀る神社",
        "latitude": 36.6977672234239,
        "longitude": 138.316533498946,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_004",
        "name": "飯綱神社",
        "type": "shrine",
        "description": "修験道ゆかりの山岳信仰の神社",
        "latitude": 36.69316667382505,
        "longitude": 138.31247284958917,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_005",
        "name": "郷原神社",
        "type": "shrine",
        "description": "郷土の守り神として親しまれる神社",
        "latitude": 36.70878116399433,
        "longitude": 138.31731160726005,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_006",
        "name": "河東王嶌神社（かとうおうしまじんじゃ）",
        "type": "shrine",
        "description": "古代豪族に由来する歴史深い神社",
        "latitude": 36.70011426107232,
        "longitude": 138.30343806493084,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_007",
        "name": "逢瀬神社（おうせじんじゃ）",
        "type": "shrine",
        "description": "縁結びの神として信仰される神社",
        "latitude": 36.69197748581369,
        "longitude": 138.31615973655124,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_008",
        "name": "八坂神社",
        "type": "shrine",
        "description": "疫病退散を祈る祇園信仰の神社",
        "latitude": 36.697840400917535,
        "longitude": 138.31589463219564,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_009",
        "name": "中子塚神社",
        "type": "shrine",
        "description": "古墳に由来する歴史的な神社",
        "latitude": 36.70410898762217,
        "longitude": 138.3233908476275,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_010",
        "name": "菅原神社（六川天満宮）",
        "type": "shrine",
        "description": "学問の神・菅原道真を祀る神社",
        "latitude": 36.70097132544265,
        "longitude": 138.32070564958914,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_011",
        "name": "中條神社",
        "type": "shrine",
        "description": "地域の守護神として信仰される神社",
        "latitude": 36.70138138205326,
        "longitude": 138.32696866308294,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_012",
        "name": "白山宮",
        "type": "shrine",
        "description": "白山信仰に基づく自然崇拝の神社",
        "latitude": 36.69404382678205,
        "longitude": 138.30798498317688,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_013",
        "name": "雁田薬師堂",
        "type": "shrine",
        "description": "眼病平癒で有名な薬師如来を祀る堂",
        "latitude": 36.69331579095577,
        "longitude": 138.3335380495892,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_014",
        "name": "皇大神社",
        "type": "shrine",
        "description": "天照大神を祀る格式高い神社",
        "latitude": 36.69777088230024,
        "longitude": 138.31562539549373,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_015",
        "name": "大嶋神社",
        "type": "shrine",
        "description": "水神を祀ると伝わる地域の神社",
        "latitude": 36.69148876921663,
        "longitude": 138.29570593119647,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_016",
        "name": "稲荷社（奥田神社）",
        "type": "shrine",
        "description": "五穀豊穣・商売繁盛の神様を祀る",
        "latitude": 36.70305026380778,
        "longitude": 138.32088840541215,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_017",
        "name": "欅原神社",
        "type": "shrine",
        "description": "欅の名に由来する鎮守の社",
        "latitude": 36.707212170121686,
        "longitude": 138.3180739563361,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_019",
        "name": "雁田水穂神社",
        "type": "shrine",
        "description": "水と農業の守護神を祀る神社",
        "latitude": 36.69750727222477,
        "longitude": 138.33102333304436,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_020",
        "name": "飯田郷元神社",
        "type": "shrine",
        "description": "飯田地区の氏神として信仰される",
        "latitude": 36.698941878608764,
        "longitude": 138.29947652934854,
        "visited": false,
        "achievements": []
    },
    {
        "id": "shrine_021",
        "name": "稲荷社(北岡神社)",
        "type": "shrine",
        "description": "稲荷信仰の小祠、地域に密着",
        "latitude": 36.70705796100007,
        "longitude": 138.3107516600319,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_001",
        "name": "岩松院",
        "type": "temple",
        "description": "葛飾北斎の天井絵がある名刹",
        "latitude": 36.69848146891875,
        "longitude": 138.33423979007046,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_002",
        "name": "浄光寺",
        "type": "temple",
        "description": "真言宗の古刹、温泉の霊泉あり",
        "latitude": 36.69412557572493,
        "longitude": 138.3328601949694,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_003",
        "name": "西證寺",
        "type": "temple",
        "description": "浄土真宗の寺院、地域に根付く",
        "latitude": 36.70593601029807,
        "longitude": 138.3142011351453,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_004",
        "name": "浄照寺",
        "type": "temple",
        "description": "浄土真宗の教えを伝える寺院",
        "latitude": 36.70974328085713,
        "longitude": 138.3153768661441,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_005",
        "name": "玄照寺",
        "type": "temple",
        "description": "静寂な山寺、修行道場として知られる",
        "latitude": 36.69010918473517,
        "longitude": 138.30696760674948,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_006",
        "name": "祥雲寺",
        "type": "temple",
        "description": "臨済宗の禅寺、静寂な佇まい",
        "latitude": 36.69503457193079,
        "longitude": 138.31539529503914,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_007",
        "name": "伝教寺",
        "type": "temple",
        "description": "天台宗の教えを受け継ぐ寺院",
        "latitude": 36.70755558965968,
        "longitude": 138.32450107100976,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_008",
        "name": "龍雲寺",
        "type": "temple",
        "description": "曹洞宗の古刹、山号を持つ",
        "latitude": 36.69647274226572,
        "longitude": 138.31318801185634,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_009",
        "name": "梅松院",
        "type": "temple",
        "description": "小規模ながら歴史ある古寺",
        "latitude": 36.701250890278004,
        "longitude": 138.32066273424752,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_010",
        "name": "大光寺",
        "type": "temple",
        "description": "地域の人々に親しまれる寺院",
        "latitude": 36.701856257175066,
        "longitude": 138.30319129681732,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_011",
        "name": "浄光寺の御霊泉(湧水)",
        "type": "temple",
        "description": "霊験あらたかな湧水が湧く霊泉",
        "latitude": 36.6940627729979,
        "longitude": 138.33341288212037,
        "visited": false,
        "achievements": []
    },
    {
        "id": "temple_012",
        "name": "西永寺",
        "type": "temple",
        "description": "曹洞宗の寺院、落ち着いた境内",
        "latitude": 36.69740410103253,
        "longitude": 138.31869888554004,
        "visited": false,
        "achievements": []
    }
];

// お蕎麦屋さんのデータ
const sobaRestaurantsData = [
    {
        "id": "soba_001",
        "name": "木挽",
        "type": "soba",
        "description": "落ち着いた空間で味わう本格手打ちそば",
        "latitude": 36.69602439261122,
        "longitude": 138.31825173712684,
        "url": ""
    },
    {
        "id": "soba_002",
        "name": "そば歳時記 富蔵家",
        "type": "soba",
        "description": "旬の食材とそばが楽しめる老舗店",
        "latitude": 36.69459717179149,
        "longitude": 138.31591161550892,
        "url": ""
    },
    {
        "id": "soba_003",
        "name": "生そば 朝日屋",
        "type": "soba",
        "description": "風味豊かな生そばが人気の地元店",
        "latitude": 36.695646166884536,
        "longitude": 138.31600743150418,
        "url": ""
    },
    {
        "id": "soba_004",
        "name": "桂亭",
        "type": "soba",
        "description": "庭園を眺めながら楽しめるそばの名店",
        "latitude": 36.69610417434816,
        "longitude": 138.31545833208244,
        "url": ""
    },
    {
        "id": "soba_005",
        "name": "小布施手打そば処 つくし",
        "type": "soba",
        "description": "香り高いそばと家庭的な雰囲気が魅力",
        "latitude": 36.69809278154701,
        "longitude": 138.3150234748328,
        "url": ""
    },
    {
        "id": "soba_006",
        "name": "お食事処 (道の駅 オアシスおぶせ)",
        "type": "soba",
        "description": "観光途中に立ち寄れる便利な食事処",
        "latitude": 36.689539351549676,
        "longitude": 138.29483389040956,
        "url": ""
    },
    {
        "id": "soba_007",
        "name": "そば処 蕎花",
        "type": "soba",
        "description": "風味豊かな手打ちそばが味わえる店",
        "latitude": 36.69475363865146,
        "longitude": 138.31598449958065,
        "url": ""
    },
    {
        "id": "soba_008",
        "name": "桜井甘精堂 泉石亭",
        "type": "soba",
        "description": "栗菓子で有名な老舗の本格そばも提供",
        "latitude": 36.696585040845285,
        "longitude": 138.31685126888334,
        "url": ""
    },
    {
        "id": "soba_009",
        "name": "手打そば処 かなえ",
        "type": "soba",
        "description": "細打ちで喉越しの良い手打ちそば",
        "latitude": 36.69811743701515,
        "longitude": 138.31757552881098,
        "url": ""
    },
    {
        "id": "soba_010",
        "name": "手打百藝おぶせ",
        "type": "soba",
        "description": "職人技が光る創作そばが自慢の店",
        "latitude": 36.69924739179002,
        "longitude": 138.3188980711731,
        "url": ""
    },
    {
        "id": "soba_011",
        "name": "小布施 鈴花",
        "type": "soba",
        "description": "モダンな空間で味わう創作そば料理",
        "latitude": 36.6973186483868,
        "longitude": 138.31913177738733,
        "url": ""
    },
    {
        "id": "soba_012",
        "name": "そば処 せきざわ",
        "type": "soba",
        "description": "ミシュラン掲載の名高いそばの名店",
        "latitude": 36.70382102262227,
        "longitude": 138.32779409636296,
        "url": ""
    },
    {
        "id": "soba_013",
        "name": "栗庵風味堂",
        "type": "soba",
        "description": "栗の名店が提供する風味豊かなそば",
        "latitude": 36.69407925156682,
        "longitude": 138.31684543612707,
        "url": ""
    },
    {
        "id": "soba_014",
        "name": "竹風堂 小布施本店",
        "type": "soba",
        "description": "栗ごはんと共に楽しむ上品なそば",
        "latitude": 36.6948180116161,
        "longitude": 138.31574602992416,
        "url": ""
    },
    {
        "id": "soba_015",
        "name": "そば処 月",
        "type": "soba",
        "description": "地元産のそば粉を使用したこだわりの味",
        "latitude": 36.696069118083216,
        "longitude": 138.31630065179388,
        "url": ""
    },
    {
        "id": "soba_016",
        "name": "小布施堂 本店",
        "type": "soba",
        "description": "栗菓子と共に味わえる上品なそば処",
        "latitude": 36.69531129831073,
        "longitude": 138.31620499304748,
        "url": ""
    },
    {
        "id": "soba_017",
        "name": "薬師豆富茶房まめ家",
        "type": "soba",
        "description": "豆富とそばを組み合わせた健康志向の店",
        "latitude": 36.69374987620966,
        "longitude": 138.332171377432,
        "url": ""
    }
];
