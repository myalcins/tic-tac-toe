const blocks = document.getElementsByClassName("block");
const xPlayer = document.getElementById("xPlayer");
const oPlayer = document.getElementById("oPlayer");
let blockArray = ["0","1","2","3","4","5","6","7","8"];
const winnerCombination = [["0","1","2"], 
                            ["3","4","5"], 
                            ["6","7","8"], 
                            ["0","3","6"], 
                            ["1","4","7"], 
                            ["2","5","8"], 
                            ["0","4","8"], 
                            ["2","4","6"]];
const delay = ms => new Promise(res => setTimeout(res, ms));

const gameConfig = {
    turnCount: 9,
    xPointer: "X",
    oPointer: "O",
    xPoint: 0,
    oPoint: 0,
    ended: 0,
};

const move = () => {
    gameConfig.turnCount -= 1;
    winningControl();
    if(gameConfig.turnCount === 0){
        restart();
    }
}

const winningControl = () => {
    winnerCombination.forEach(combination =>{ 
        const firstBlock = document.getElementById(combination[0]).textContent;
        const secondBlock = document.getElementById(combination[1]).textContent;
        const thirdBlock = document.getElementById(combination[2]).textContent;
        if(firstBlock === secondBlock && secondBlock === thirdBlock){
            if(firstBlock === gameConfig.xPointer){
                gameConfig.xPoint += 1;
                xPlayer.textContent = gameConfig.xPoint;
                gameConfig.ended = 1;
                restart();
            }
            if(firstBlock === gameConfig.oPointer){
                gameConfig.oPoint += 1;
                oPlayer.textContent = gameConfig.oPoint;
                gameConfig.ended = 1;
                restart();
            }
        }
    });
}

Array.prototype.remove = function (value) {
    for(let i=0;i<this.length;i++){
        if(this[i] === value){
            this.splice(i,1);
        }
    }
}

Array.prototype.random = function() {
    const blockId = this[Math.floor(Math.random() * this.length)];
    return document.getElementById(blockId);
}

const oTurn = blockArray => {
    const block = blockArray.random();
    block.textContent = gameConfig.oPointer;
    blockArray.remove(block.getAttribute("id"));
    move();
};

[...blocks].forEach(block => block.addEventListener("click", () => {
    if(gameConfig.ended !== 1 && gameConfig.turnCount !== 0 && block.textContent !== gameConfig.xPointer && block.textContent !== gameConfig.oPointer){
        block.textContent = gameConfig.xPointer;
        blockArray.remove(block.getAttribute("id"));
        move();
        if (gameConfig.ended !== 1 && gameConfig.turnCount !== 0){
            oTurn(blockArray);
        }
    };
} ));

const restart = async () => {
    await delay(1000);
    gameConfig.turnCount = 9;
    gameConfig.ended = 0;
    [...blocks].forEach(block => block.textContent = "");
    blockArray = ["0","1","2","3","4","5","6","7","8"];
}