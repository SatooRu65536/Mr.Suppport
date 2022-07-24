let count = 0;
async function createText(comment, color, font_size, position_y) {
    let div_text = document.createElement('div');
    count++;
    div_text.id = "text" + count; //アニメーション処理で対象の指定に必要なidを設定
    div_text.style.color = color;
    div_text.style.fontSize = String(font_size) + 'px'
    div_text.style.fontFamily = 'HiraKakuProN-W6, Arial Black'
    div_text.style.position = 'fixed'; //テキストのは位置を絶対位置にするための設定
    div_text.style.textShadow = '2px 0 0 black, 0 2px 0 black, -2px 0 0 black, 0 -2px 0 black'
    div_text.style.whiteSpace = 'nowrap' //画面右端での折り返しがなく、画面外へはみ出すようにする
    div_text.style.left = (document.documentElement.clientWidth) + 'px'; //初期状態の横方向の位置は画面の右端に設定
    div_text.style.top = position_y + 'px';  //初期状態の縦方向の位置は画面の上端から下端の間に設定（ランダムな配置に）
    div_text.appendChild(document.createTextNode(comment)); //画面上に表示されるテキストを設定
    document.body.appendChild(div_text); //body直下へ挿入

    await gsap.to(
        "#" + div_text.id,
        {
            duration: 7,
            x: -1 * (document.documentElement.clientWidth + div_text.clientWidth)
        }
    );

    div_text.parentNode.removeChild(div_text); //画面上の移動終了後に削除
}

let probability = 0.05;
const comments = [
    'いいねー', '頑張って', '88888888', 'すげー', '最高かよ', '！？', '！？！', '頑張ってるじゃん', 'うおおおお', 'ざわ...ざわ...',
    'ここすき', 'わっしょいわっしょい', 'ｷﾀｰｰｰｰ', 'ん？', '草', 'ぷぎゃーー', '初見です', 'wwwwwwwwwwwwwww', 'さすが！', 'こころの準備はいいか'
]
createText(`${(probability * 100).toFixed()}%`, 'Yellow', 60, 100);
setInterval(() => {
    if (Math.random() < probability) {
        let i = Math.floor(Math.random() * comments.length);
        let comment = comments[i];
        let color = Math.random() > 0.04 ? 'White' : 'Red';
        let font_size = Math.random() > 0.05 ? 25 : 40;
        let position_y = Math.round(Math.random() * document.documentElement.clientHeight);

        if (color == 'Red') font_size = 50;

        if (Math.random() < 0.01) {
            comment = 'ｷﾀｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰｰ';
            color = 'White';
            font_size = 70;
            position_y = document.documentElement.clientHeight / 2 + 50;
        }

        createText(comment, color, font_size, position_y);
    }
}, 100);


window.electronAPI.handleCounter((event, value) => {
    probability += value;

    if (probability < 0) probability = 0.0001
    else if (probability > 1) probability = 1.0001

    const comment = (probability * 100).toFixed() + '%';
    createText(comment, 'Yellow', 60, 50)
    event.sender.send('counter-value', probability, document.documentElement.clientHeight / 2);
})