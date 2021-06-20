const GAME_STATE = {
    FirstCardAwaits: "FirstCardAwaits",
    SecondsCardAwiats: "SecondsCardAwiats",
    CardMatchFailed: "CardMatchFailed",
    CardMatched: "CardMatched",
    GameFinished: "GameFinished",
}

const symbols = [
    `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 225.371 225.371" style="enable-background:new 0 0 225.371 225.371;" xml:space="preserve"><path d="M212.205,85.186c-8.983-15.185-28.005-33.898-56.537-55.622c-11.14-8.481-21.397-15.613-28.042-20.103 c-12.905-8.721-13.281-8.721-14.866-8.721c-1.581,0-1.956,0-14.856,8.675c-6.649,4.473-16.917,11.579-28.064,20.039 c-28.567,21.679-47.643,40.43-56.695,55.731C3.931,100.759,0,115.153,0,133.317C0,179.339,33.921,200.3,65.438,200.3 c13.825,0,24.237-3.495,32.023-8.283l-8.619,32.613h47.343l-8.708-32.948c7.828,4.959,18.383,8.618,32.501,8.618 c31.495,0,65.393-20.961,65.393-66.983C225.371,115.18,221.434,100.786,212.205,85.186z"/></svg>`, // 黑桃
    `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 225.371 225.371" style="enable-background:new 0 0 225.371 225.371;" xml:space="preserve"><path d="M159.933,12.904c-26.386,0-40.36,12.722-47.313,22.892c-6.944-10.17-20.897-22.892-47.228-22.892 C33.897,12.904,0,33.865,0,79.887c0,18.138,3.938,32.532,13.166,48.132c8.983,15.184,28.006,33.897,56.541,55.622 c11.137,8.479,21.396,15.612,28.042,20.103c12.771,8.631,13.271,8.72,14.814,8.721c0.078,0.002,0.153,0.003,0.228,0.003 c1.459,0,2.464-0.465,14.673-8.675c6.65-4.473,16.918-11.579,28.065-20.039c28.57-21.681,47.646-40.433,56.699-55.734 c9.212-15.571,13.143-29.967,13.143-48.132C225.371,33.865,191.45,12.904,159.933,12.904z"/>`, // 愛心
    `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 223.646 223.646" style="enable-background:new 0 0 223.646 223.646;" xml:space="preserve"> <polygon points="111.823,0 16.622,111.823 111.823,223.646 207.025,111.823 "/>`, // 方塊
    `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 216 216" style="enable-background:new 0 0 216 216;" xml:space="preserve"><path d="M161.668,75.201c1.882-5.679,2.832-11.604,2.832-17.701C164.5,26.346,139.154,1,108,1S51.5,26.346,51.5,57.5 c0,6.097,0.95,12.022,2.832,17.701C24.179,76.345,0,101.232,0,131.66c0,31.154,25.346,56.5,56.5,56.5 c14.44,0,27.629-5.45,37.628-14.396L81.962,215h51.733l-12.293-41.665c10.054,9.199,23.43,14.825,38.098,14.825 c31.154,0,56.5-25.346,56.5-56.5C216,101.232,191.821,76.345,161.668,75.201z"/></svg>`, // 梅花
]

const symbolNames = ["spade", "heart", "diamond", "club"]
const view = {
    //製作出單張牌的外觀
    getcardContent(index) {
        const number = this.transformNumber((index % 13) + 1)
        /* % --> 餘數賦值 前值除以後值得到的餘數值 */
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
        const symbol = symbols[Math.floor(index / 13)]
        return `
        <p>${number}</p>
        ${symbol}
        <p>${number}</p>
        `
    },

    getCardElement(index) {
        const symbol = symbols[Math.floor(index / 13)]
        const color = symbols.indexOf(symbol)
        return `
        <div class="card back" data-color="${color}" data-index="${index}"></div>
        `
    },

    //將1, 11, 12, 13轉換成A, J, Q, K
    transformNumber(number) {
        //switch 用法
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
        switch (number) {
            case 1:
                return "A"
            case 11:
                return "J"
            case 12:
                return "Q"
            case 13:
                return "K"
            default:
                return number
        }
    },

    displayCards(indexes) {
        const rootElement = document.querySelector("#cards")
        rootElement.innerHTML = indexes
            .map((index) => this.getCardElement(index))
            .join("")
        //map() 建立一個新的陣列, 其內容會是原陣列經由函式運算後所得的結果
        //join() 會將陣列的元素連接合併成一個字串
    },

    //加上...展開運算子, 可以呼叫一個或多個參數
    //flipCards(1,2,3,4,5)
    //cards = [1,2,3,4,5]
    flipCards(...cards) {
        //如果是正面 回傳背面
        cards.map((card) => {
            if (card.classList.contains("back")) {
                card.classList.remove("back")
                card.innerHTML = this.getcardContent(Number(card.dataset.index))
                return
            }
            //如果是背面 回傳正面
            card.classList.add("back")
            card.innerHTML = null
        })
    },

    pairCards(...cards) {
        cards.map((card) => {
            card.classList.add("paired")
        })
    },

    renderScore(score) {
        document.querySelector(".score").textContent = `Score:${score}`
    },

    renderTriedTimes(times) {
        document.querySelector(
            ".tried"
        ).textContent = `You've tried: ${times} times`
    },

    appendWrongAnimation(...cards) {
        cards.map((card) => {
            card.classList.add("wrong")
            card.addEventListener(
                "animationend",
                (e) => {
                    card.classList.remove("wrong")
                },
                { once: true }
            )
        })
    },
    showGameFinished() {
        const div = document.createElement("div")
        div.classList.add("completed")
        div.innerHTML = `
            <h3>Complete!</h3>
            <p>Score: ${model.score}</p>
            <p>You've tried: ${model.triedTimes} times</p>
        `
        const container = document.querySelector(".container")
        //在container之後插入div
        container.after(div)
    },
}

const model = {
    revealedCards: [],

    isRevealedCardsMatched() {
        return (
            this.revealedCards[0].dataset.index % 13 ===
            this.revealedCards[1].dataset.index % 13
        )
    },

    score: 0,

    triedTimes: 0,
}

const controller = {
    currentState: GAME_STATE.FirstCardAwaits,

    generateCards() {
        view.displayCards(utility.getRandomNumberArray(52))
    },

    displayCardAction(card) {
        if (!card.classList.contains("back")) {
            return
        }
        switch (this.currentState) {
            case GAME_STATE.FirstCardAwaits:
                view.flipCards(card)
                model.revealedCards.push(card)
                this.currentState = GAME_STATE.SecondsCardAwiats
                break

            case GAME_STATE.SecondsCardAwiats:
                //卡片變化
                view.flipCards(card)
                model.revealedCards.push(card)
                //次數變化
                view.renderTriedTimes(++model.triedTimes)
                if (model.isRevealedCardsMatched()) {
                    //配對正確
                    //分數變化
                    view.renderScore((model.score += 10))
                    //卡片變化
                    this.currentState = GAME_STATE.CardMatched
                    view.pairCards(...model.revealedCards)
                    model.revealedCards = []
                    //分數最大值時結束遊戲
                    if (model.score === 260) {
                        controller.currentState = GAME_STATE.GameFinished
                        view.showGameFinished()
                        return
                    }
                    this.currentState = GAME_STATE.FirstCardAwaits
                } else {
                    //配對失敗
                    this.currentState = GAME_STATE.CardMatchFailed
                    view.appendWrongAnimation(...model.revealedCards)
                    setTimeout(this.resetCards, 1000)
                }
                break
        }
    },

    resetCards() {
        view.flipCards(...model.revealedCards)
        model.revealedCards = []
        controller.currentState = GAME_STATE.FirstCardAwaits
    },
}

const utility = {
    getRandomNumberArray(count) {
        const number = Array.from(Array(count).keys())
        for (let index = number.length - 1; index > 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1))
                //;分號用意是為了讓Math.floor();[] 把執行句隔開, 才不會發生錯誤
                ;[number[index], number[randomIndex]] = [
                    number[randomIndex],
                    number[index],
                ]
            //解構賦值語法:
        }
        return number
    },
}

controller.generateCards()

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
        controller.displayCardAction(card)
    })
})
