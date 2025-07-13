let map;
let markers = [];
let infoWindow;
let currentInfoWindow = null; // 現在開いている情報ウィンドウを追跡

// ストーリーテキストの定義
const storyText = "古の書物が語る。\nこの地には、いとしい記憶が眠る。\nさあ、巡礼の旅へ。";

// ローカルストレージからデータをロードする関数
function loadData() {
    const savedData = localStorage.getItem('spotsData');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        // 初回ロード時またはデータがない場合は、data.js から初期データをロード
        return spotsData.map(spot => ({
            ...spot,
            visited: false, // visited プロパティを初期化
            achievements: [] // achievements プロパティを初期化
        }));
    }
}

// ローカルストレージにデータを保存する関数
function saveData(data) {
    localStorage.setItem('spotsData', JSON.stringify(data));
}

let currentSpotsData = loadData();

// Google Mapの初期化
function initMap() {
    const obuse = { lat: 36.695, lng: 138.318 }; // 小布施町の中心
    map = new google.maps.Map(document.getElementById('map'), {
        center: obuse,
        zoom: 14,
        mapTypeControl: false, // マップタイプコントロールを非表示
        streetViewControl: false, // ストリートビューコントロールを非表示
        fullscreenControl: false // フルスクリーンコントロールを非表示
    });

    // ここで infoWindow を初期化するのではなく、マーカーのクリックイベント内で個別に作成します
    // infoWindow = new google.maps.InfoWindow(); // この行は削除またはコメントアウト

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "現在地",
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeWeight: 0,
                    },
                });

                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    addMarkers();
    updateInfoPanel(); // initMap呼び出し時に情報パネルを更新
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    // この infoWindow はローカルスコープで作成されるため、直接アクセスできません。
    // エラー表示のためには、一時的な情報ウィンドウを作成するか、他の方法を検討する必要があります。
    // 今回は、メッセージをコンソールに出力するだけに留めます。
    console.error(
        browserHasGeolocation
            ? "エラー: 位置情報サービスに失敗しました。"
            : "エラー: お使いのブラウザは位置情報に対応していません。"
    );
    // もし infoWindow がグローバルに定義されている場合は、infoWindow.setPosition(pos); infoWindow.open(map); を追加できます。
}

// マーカーの追加
function addMarkers() {
    // 既存のマーカーをクリア
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    currentSpotsData.forEach((spot) => { // index は不要なので削除
        const marker = new google.maps.Marker({
            position: { lat: spot.latitude, lng: spot.longitude },
            map: map,
            title: spot.name,
            icon: getMarkerIcon(spot.type), // visited パラメータを削除
            opacity: spot.visited ? 0.5 : 1.0 // 訪問済みの場合、半透明にする
        });

        // 情報ウィンドウのコンテンツを作成 (initMap内で作成するように変更)
        const infoWindowContent = `
            <div class="info-window-content">
                <h3>${spot.name}</h3>
                <p><strong>発見状況:</strong> ${spot.visited ? '済' : '未'}</p>
                <p><strong>説明:</strong> ${spot.description}</p>
                ${(spot.type === 'shrine' || spot.type === 'temple') && !spot.visited ? 
                    `<button id="record-visit-${spot.id}">巡礼を記録</button>` : ''}
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        marker.addListener('click', () => {
            // 既に開いている情報ウィンドウがあれば閉じる
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow; // 現在開いている情報ウィンドウを更新

            // 情報パネルの現在地情報を更新
            document.getElementById('current-spot-name').textContent = spot.name;
            document.getElementById('current-spot-description').textContent = spot.description;

            // 情報ウィンドウ内のボタンにイベントリスナーを設定
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                const recordVisitButton = document.getElementById(`record-visit-${spot.id}`);
                if (recordVisitButton) {
                    recordVisitButton.addEventListener('click', () => {
                        recordVisit(spot.id);
                        // 記録後に情報ウィンドウを閉じる
                        infoWindow.close();
                    });
                }
            });
        });
        markers.push(marker);
    });
}

// マーカーアイコンを返す関数 (visited パラメータを削除)
function getMarkerIcon(type) {
    let iconUrl;
    let iconSize = 32; // デフォルトサイズ

    // 画面幅が768px以下の場合、アイコンサイズを調整
    if (window.innerWidth <= 768) {
        iconSize = 40;
    }

    // 青い丸のアイコンを適用
    const blueDotIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8, // アイコンのサイズ
        fillColor: '#0000FF', // 青色
        fillOpacity: 1,
        strokeWeight: 0, // 枠線なし
    };

    // ここで `type` に基づいて異なるアイコンを返すロジックを実装しますが、
    // 今回の指示では青い丸をデフォルトとしています。
    // もし神社/寺/蕎麦で異なるアイコンを使用する場合は、下記を適切に修正してください。
    // 現時点では、全てのスポットで青い丸を使用するようにしています。
    if (type === 'shrine') {
        // 例: iconUrl = 'assets/icon_shrine.png'; return { url: iconUrl, scaledSize: new google.maps.Size(iconSize, iconSize) };
        return blueDotIcon;
    } else if (type === 'temple') {
        // 例: iconUrl = 'assets/icon_temple.png'; return { url: iconUrl, scaledSize: new google.maps.Size(iconSize, iconSize) };
        return blueDotIcon;
    } else if (type === 'soba') {
        // 例: iconUrl = 'assets/icon_soba.png'; return { url: iconUrl, scaledSize: new google.maps.Size(iconSize, iconSize) };
        return blueDotIcon;
    }
    return blueDotIcon; // デフォルトとして青い丸を返す
}


// 訪問を記録
function recordVisit(spotId) {
    const spot = currentSpotsData.find(s => s.id === spotId);
    if (spot && !spot.visited) {
        // 訪問前の発見数を取得
        const discoveryCountBefore = currentSpotsData.filter(s => s.visited).length;

        spot.visited = true;
        saveData(currentSpotsData);
        updateInfoPanel(); // パネルの更新関数を呼び出し
        updateMarkerIcon(spotId, true); // マーカーアイコンを更新

        // 訪問後の発見数を取得
        const discoveryCountAfter = currentSpotsData.filter(s => s.visited).length;

        // 効果音のロジック
        if (discoveryCountAfter === 1) {
            // 初めての訪問
            playSound('se_checkin_normal.mp3');
        } else if (discoveryCountAfter > 0 && discoveryCountAfter % 5 === 0) {
            // 5の倍数回目の訪問
            playSound('se_level_up.mp3');
        } else {
            // その他の訪問
            playSound('se_checkin_normal.mp3');
        }

        // アチーブメントのチェック (ここでは効果音を再生しない)
        checkAchievements();

        // スポット詳細の表示は、情報ウィンドウが閉じることで消えるため、
        // 明示的に更新する必要は少なくなりましたが、updateInfoPanelで全体を更新します。
    }
}

// マーカーアイコンを更新する関数 (opacity を設定)
function updateMarkerIcon(spotId, visited) {
    const markerIndex = currentSpotsData.findIndex(s => s.id === spotId);
    if (markerIndex !== -1 && markers[markerIndex]) { // markers[markerIndex] の存在も確認
        markers[markerIndex].setOpacity(visited ? 0.5 : 1.0);
    }
}

// 進捗の更新 (関数名を updateInfoPanel に変更し、HTMLのIDに合わせる)
function updateInfoPanel() {
    const totalSpots = currentSpotsData.filter(s => s.type === 'shrine' || s.type === 'temple').length;
    const visitedSpots = currentSpotsData.filter(s => (s.type === 'shrine' || s.type === 'temple') && s.visited).length;
    const foundCount = currentSpotsData.filter(s => s.visited).length; // 訪問済みスポットの総数

    // HTMLのIDに合わせてテキストコンテンツを更新
    const visitedCountElement = document.getElementById('visited-count');
    const foundCountElement = document.getElementById('found-count');

    if (visitedCountElement) {
        visitedCountElement.textContent = visitedSpots;
    }
    if (foundCountElement) {
        foundCountElement.textContent = foundCount;
    }

    updateAchievementsDisplay(); // アチーブメント表示も更新
}

// アチーブメントの定義
const achievements = [
    { id: 'achievement_01', name: 'はじめての巡礼者', description: '最初のスポットを訪問する', condition: (data) => data.filter(s => s.visited).length >= 1, badge: 'badge_pilgrim.png' },
    { id: 'achievement_02', name: '小布施探訪者', description: '5箇所のスポットを訪問する', condition: (data) => data.filter(s => s.visited).length >= 5, badge: 'badge_pilgrim.png' },
    { id: 'achievement_03', name: '小布施マスター', description: '全てのスポットを訪問する', condition: (data) => data.filter(s => s.visited).length === data.filter(s => s.type === 'shrine' || s.type === 'temple').length, badge: 'badge_pilgrim.png' }
];

// アチーブメントのチェックと付与 (ブール値を返すように変更)
function checkAchievements() {
    let newAchievementEarned = false;
    achievements.forEach(achievement => {
        if (achievement.condition(currentSpotsData)) {
            // まだ付与されていない場合のみ追加
            // アチーブメントがどのスポットにも紐付いていないかを確認
            const isAchievementEarnedGlobally = currentSpotsData.some(spot => spot.achievements && spot.achievements.includes(achievement.id));

            if (!isAchievementEarnedGlobally) {
                // アチーブメントを付与するスポットを見つける
                // ここでは、最も新しく訪問されたスポット、または単に最初のスポットに紐付けるといったロジックが必要。
                // 簡単のため、全スポットのいずれかに付与されていなければ、最初のスポットに付与することにする。
                if (currentSpotsData.length > 0) {
                    // 全てのスポットの achievements 配列をチェックし、もしどのスポットにもこのアチーブメントがなければ追加
                    let foundSpotToAttach = false;
                    for (let i = 0; i < currentSpotsData.length; i++) {
                        if (!currentSpotsData[i].achievements.includes(achievement.id)) {
                            currentSpotsData[i].achievements.push(achievement.id);
                            foundSpotToAttach = true;
                            break; // 最初の見つけたスポットに紐付けたら終了
                        }
                    }

                    if (foundSpotToAttach) {
                        saveData(currentSpotsData);
                        updateAchievementsDisplay();
                        newAchievementEarned = true; // 新しいアチーブメントを獲得した
                    }
                }
            }
        }
    });
    return newAchievementEarned;
}


// アチーブメント表示の更新
function updateAchievementsDisplay() {
    const achievementsContainer = document.getElementById('achievements');
    if (!achievementsContainer) return; // コンテナが存在しない場合は何もしない

    achievementsContainer.innerHTML = ''; // クリア

    const earnedAchievementIds = new Set();
    currentSpotsData.forEach(spot => {
        if (spot.achievements) { // achievementsプロパティが存在するか確認
            spot.achievements.forEach(achId => earnedAchievementIds.add(achId));
        }
    });

    achievements.forEach(achievement => {
        if (earnedAchievementIds.has(achievement.id)) {
            const badgeElement = document.createElement('div');
            badgeElement.classList.add('achievement-badge');
            badgeElement.innerHTML = `
                <img src="assets/${achievement.badge}" alt="${achievement.name}">
                <span>${achievement.name}</span>
            `;
            achievementsContainer.appendChild(badgeElement);

            // バッジ詳細表示のイベントリスナー（後のタスクで追加するが、ここで構造を考慮）
            badgeElement.addEventListener('click', () => {
                // ポップアップ表示などのロジックをここに実装
                console.log(`Clicked on badge: ${achievement.name}`);
            });
        }
    });
}


// サウンド再生関数
function playSound(filename) {
    const audio = new Audio(`assets/${filename}`);
    audio.play();
}

// 足跡を消すボタンのイベントリスナー
document.getElementById('clear-footsteps').addEventListener('click', () => {
    if (confirm('本当に全ての足跡を消しますか？（訪問情報がリセットされます）')) {
        currentSpotsData.forEach(spot => {
            spot.visited = false;
            spot.achievements = []; // アチーブメントもリセット
        });
        saveData(currentSpotsData);
        // マーカーを全て削除して再追加することでアイコンをリセット
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        addMarkers();
        updateInfoPanel(); // updateProgress から名称変更
        playSound('se_quest_complete_fanfare.mp3'); // リセット音
    }
});

// 冒険をリセットボタンのイベントリスナー
document.getElementById('reset-adventure').addEventListener('click', () => {
    if (confirm('本当に冒険をリセットしますか？（全てのデータが初期状態に戻ります）')) {
        localStorage.removeItem('spotsData'); // ローカルストレージからデータを削除
        currentSpotsData = loadData(); // 初期データを再ロード
        // マーカーを全て削除して再追加することでアイコンをリセット
        markers.forEach(marker => marker.setMap(null));
        markers = [];
        addMarkers();
        updateInfoPanel(); // updateProgress から名称変更
        playSound('se_quest_complete_fanfare.mp3'); // リセット音
    }
});

// 画面表示を制御する関数
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ゲーム開始時の処理
document.addEventListener('DOMContentLoaded', () => {
    showScreen('splash-screen');

    // スタートボタンのイベントリスナー
    document.getElementById('start-button').addEventListener('click', () => {
        showScreen('story-intro');
        // 1秒後にストーリーアニメーションを開始
        setTimeout(() => {
            startStoryAnimation();
        }, 1000);
    });

    // スキップボタンのイベントリスナー (IDをHTMLに合わせて修正)
    document.getElementById('story-intro-skip-button').addEventListener('click', () => {
        endStoryAnimation(); // アニメーションを強制終了
        showScreen('main-game-container');
        // Google Mapsの初期化はメインゲーム画面表示後に行う
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            initMap();
        } else {
            // Google Maps APIがまだロードされていない場合
            window.initMap = initMap; // グローバルに設定してAPIロード後に呼び出されるようにする
        }
    });

    // 情報パネルのトグル機能
    const togglePanelButton = document.getElementById('toggle-panel-button'); // 変数名を合わせる
    const infoPanel = document.getElementById('info-panel');

    if (togglePanelButton && infoPanel) {
        togglePanelButton.addEventListener('click', () => {
            infoPanel.classList.toggle('minimized');
            if (infoPanel.classList.contains('minimized')) {
                togglePanelButton.textContent = '▲'; // 閉じたら上矢印
            } else {
                togglePanelButton.textContent = '▼'; // 開いたら下矢印
            }
        });
    }
    // 初期状態は開いているので、ボタンは下矢印
    if (togglePanelButton) {
        togglePanelButton.textContent = '▼';
    }
});

// ストーリーアニメーションを開始する関数
function startStoryAnimation() {
    const storyTextElement = document.getElementById('story-text');
    storyTextElement.textContent = storyText;

    // フェードイン
    storyTextElement.classList.remove('fade-out');
    storyTextElement.classList.add('fade-in');

    // 4.5秒表示後、フェードアウト開始 (フェードイン1.5秒 + 表示3秒)
    storyAnimationTimeoutId = setTimeout(() => {
        storyTextElement.classList.remove('fade-in');
        storyTextElement.classList.add('fade-out');

        // フェードアウト完了後、メインゲーム画面へ遷移
        storyAnimationTimeoutId = setTimeout(() => {
            showScreen('main-game-container');
            if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
                initMap();
            } else {
                window.initMap = initMap;
            }
        }, 500); // CSSのtransition時間(0.5s)に合わせる
    }, 4500); // 4.5秒後 (フェードイン1.5秒 + 表示3秒)
}

// ストーリーアニメーションを終了する関数
function endStoryAnimation() {
    const storyTextElement = document.getElementById('story-text');
    clearTimeout(storyAnimationTimeoutId); // 進行中のアニメーションタイマーをクリア
    storyTextElement.classList.remove('fade-in', 'fade-out'); // クラスをリセット
    showScreen('main-game-container');
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    } else {
        window.initMap = initMap;
    }
}