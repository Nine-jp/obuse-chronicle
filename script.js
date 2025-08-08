let map;
let markers = [];
let infoWindow;
let currentInfoWindow = null; // 現在開いている情報ウィンドウを追跡

// ストーリーテキストの定義
const storyText = "古の書物が語る。\nこの地には、深い記憶が眠る。\nさあ、巡礼の旅へ。";

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
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const obuse = { lat: 36.695, lng: 138.318 }; // 小布施町の中心
    map = new Map(document.getElementById('map'), {
        center: obuse,
        zoom: 14,
        mapId: "OBSE_CHRONICLE_MAP",
        disableDefaultUI: true // すべてのデフォルトUIコントロールを非表示
    });

    infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const protagonistIcon = document.createElement('img');
                protagonistIcon.src = 'assets/icon_protagonist.png';
                protagonistIcon.width = 40; // 主人公アイコンのサイズを40に設定
                protagonistIcon.height = 40;

                new AdvancedMarkerElement({
                    position: pos,
                    map: map,
                    title: "現在地",
                    content: protagonistIcon, // 主人公のアイコンを設定
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

    addMarkers(AdvancedMarkerElement);
    updateProgress();

    // 現在地ボタンのイベントリスナー
    document.getElementById('current-location-button').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos);
                    map.setZoom(16); // ズームレベルを調整
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    const contentString = browserHasGeolocation
        ? `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; color: black; height: 50px; text-align: center; line-height: 1;"><span style="color: red;">⚠️ エラー ⚠️</span><br>位置情報サービスに失敗しました。</div>`
        : `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; color: black; height: 50px; text-align: center; line-height: 1;"><span style="color: red;">⚠️ エラー ⚠️</span><br>お使いのブラウザは位置情報に対応していません。</div>`;
    infoWindow.setContent(contentString);
    infoWindow.open(map);
}

// マーカーの追加
function addMarkers(AdvancedMarkerElement) {
    currentSpotsData.forEach((spot, index) => {
        const icon = getMarkerIcon(spot.type);
        const marker = new AdvancedMarkerElement({
            position: { lat: spot.latitude, lng: spot.longitude },
            map: map,
            title: spot.name,
            content: icon,
        });

        marker.content.style.opacity = spot.visited ? 0.5 : 1.0;

        marker.addListener('click', () => {
            // 既に開いている情報ウィンドウがあれば閉じる
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            displaySpotDetails(spot);
            currentInfoWindow = infoWindow; // 現在開いている情報ウィンドウを更新
        });
        markers.push(marker);
    });
}

// マーカーアイコンを返す関数 (visited パラメータを削除)
function getMarkerIcon(type) {
    let iconBase = 'assets/';
    let iconUrl;
    let iconSize = 32; // デフォルトサイズ

    // 画面幅が768px以下の場合、アイコンサイズを調整
    if (window.innerWidth <= 768) {
        iconSize = 40;
    }

    if (type === 'shrine') {
        iconUrl = iconBase + 'icon_shrine.png';
    } else if (type === 'temple') {
        iconUrl = iconBase + 'icon_temple.png';
    } else if (type === 'soba') {
        iconUrl = iconBase + 'icon_soba.png'; // お蕎麦屋さんは訪問済みアイコンなし
    }

    const icon = document.createElement('img');
    icon.src = iconUrl;
    icon.width = iconSize;
    icon.height = iconSize;
    return icon;
}

// スポット詳細の表示
function displaySpotDetails(spot) {
    document.getElementById('spot-name').textContent = spot.name;
    document.getElementById('spot-description').textContent = spot.description;

    const visitedStatusElement = document.getElementById('visited-status');
    const recordVisitButton = document.getElementById('record-visit');
    const spotActions = document.getElementById('spot-actions');

    if (spot.type === 'shrine' || spot.type === 'temple') {
        spotActions.style.display = 'flex';
        if (spot.visited) {
            visitedStatusElement.textContent = '訪問済み';
            visitedStatusElement.style.display = 'block';
            visitedStatusElement.classList.add('visited');
            recordVisitButton.style.display = 'none';
        } else {
            visitedStatusElement.textContent = '';
            visitedStatusElement.style.display = 'none';
            visitedStatusElement.classList.remove('visited');
            recordVisitButton.style.display = 'block';
            recordVisitButton.onclick = () => recordVisit(spot.id);
        }
    } else {
        spotActions.style.display = 'none';
    }
}

// 訪問を記録
function recordVisit(spotId) {
    const spot = currentSpotsData.find(s => s.id === spotId);
    if (spot && !spot.visited) {
        // 訪問前の発見数を取得
        const discoveryCountBefore = currentSpotsData.filter(s => s.visited).length;

        spot.visited = true;
        saveData(currentSpotsData);
        updateProgress();
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

        // スポット詳細の表示を更新
        displaySpotDetails(spot);
    }
}

// マーカーアイコンを更新する関数 (opacity を設定)
function updateMarkerIcon(spotId, visited) {
    const markerIndex = currentSpotsData.findIndex(s => s.id === spotId);
    if (markerIndex !== -1) {
        // アイコン自体は変更せず、透明度のみを変更
        markers[markerIndex].content.style.opacity = visited ? 0.5 : 1.0;
    }
}

// 進捗の更新
function updateProgress() {
    const totalSpots = currentSpotsData.filter(s => s.type === 'shrine' || s.type === 'temple').length;
    const visitedSpots = currentSpotsData.filter(s => (s.type === 'shrine' || s.type === 'temple') && s.visited).length;
    document.getElementById('overall-progress').textContent = `踏破率: ${visitedSpots} / ${totalSpots} 箇所`;

    updateAchievementsDisplay();
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
            if (!currentSpotsData.some(spot => spot.achievements.includes(achievement.id))) {
                // 実際にはどのスポットに紐付けるかロジックが必要だが、ここでは全スポットのいずれかに付与されると仮定
                // 簡単のため、最初のスポットに付与することにする
                if (currentSpotsData.length > 0) {
                    currentSpotsData[0].achievements.push(achievement.id);
                    saveData(currentSpotsData);
                    updateAchievementsDisplay();
                    newAchievementEarned = true; // 新しいアチーブメントを獲得した
                }
            }
        }
    });
    return newAchievementEarned;
}

// アチーブメント表示の更新
function updateAchievementsDisplay() {
    const badgeGrid = document.getElementById('badge-popup-grid');
    badgeGrid.innerHTML = ''; // クリア

    const earnedAchievementIds = new Set();
    currentSpotsData.forEach(spot => {
        spot.achievements.forEach(achId => earnedAchievementIds.add(achId));
    });

    achievements.forEach(achievement => {
        if (earnedAchievementIds.has(achievement.id)) {
            const badgeElement = document.createElement('div');
            badgeElement.classList.add('achievement-badge');
            badgeElement.innerHTML = `
                <img src="assets/${achievement.badge}" alt="${achievement.name}">
                <span>${achievement.name}</span>
            `;
            badgeGrid.appendChild(badgeElement);
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
        addMarkers(google.maps.marker.AdvancedMarkerElement);
        updateProgress();
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
        addMarkers(google.maps.marker.AdvancedMarkerElement);
        updateProgress();
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

// Google Maps APIのスクリプトを動的に読み込む
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&loading=async&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
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

    // スキップボタンのイベントリスナー
    document.getElementById('skip-button').addEventListener('click', () => {
        endStoryAnimation();
        showScreen('main-game-container');
        // Google Mapsの初期化はメインゲーム画面表示後に行う
        loadGoogleMapsScript();
    });

    // 情報パネルのトグル機能
    const toggleButton = document.getElementById('toggle-panel-button');
    const infoPanel = document.getElementById('info-panel');

    if (toggleButton && infoPanel) {
        toggleButton.addEventListener('click', () => {
            infoPanel.classList.toggle('minimized');
            if (infoPanel.classList.contains('minimized')) {
                toggleButton.textContent = '書を開く';
            } else {
                toggleButton.textContent = '書を閉じる';
            }
        });
    }

    // Badge Popup Logic
    const badgePopupOverlay = document.getElementById('badge-popup-overlay');
    const showBadgesButton = document.getElementById('show-badges-button');
    const closeBadgePopupButton = document.getElementById('close-badge-popup');

    showBadgesButton.addEventListener('click', () => {
        badgePopupOverlay.style.display = 'flex';
    });

    closeBadgePopupButton.addEventListener('click', () => {
        badgePopupOverlay.style.display = 'none';
    });

    badgePopupOverlay.addEventListener('click', (event) => {
        if (event.target === badgePopupOverlay) {
            badgePopupOverlay.style.display = 'none';
        }
    });
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
            loadGoogleMapsScript();
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

// 画面サイズが変更されたときにマーカーアイコンを更新
window.addEventListener('resize', () => {
    // マップが初期化されている場合のみ実行
    if (map) {
        markers.forEach((marker, index) => {
            const spot = currentSpotsData[index];
            const icon = getMarkerIcon(spot.type);
            marker.content = icon;
        });
    }
});