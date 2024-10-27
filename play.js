class car {
    constructor(id, boardTop, boardLeft, direction, sumSquares, color) {
        this.id = id;
        this.boardTop = boardTop;
        this.boardLeft = boardLeft;
        this.direction = direction;
        this.sumSquares = sumSquares;
        this.color = color;
    }
}

class redcar extends car {
    constructor(id, boardTop, boardLeft, direction, sumSquares, color) {
        super(id, boardTop, boardLeft, direction, sumSquares, color);

    }
    goOut = () => {
        window.alert("You did it!!!")
    }
}

class playingBoard {
    constructor(carArray, squaresize, squarecount, exitpoint) {
        this.carArray = carArray;
        this.squaresize = squaresize;
        this.squarecount = squarecount;
        this.exitpoint = exitpoint;

    }
    printBoardStatus = () => { }
    placeIsAvailable = (left, top) => {
        if (mat[top][left] != 1) {
            return true
        }
        else {
            return false
        }

    }
    getCarById = (selectedCar) => {
        return (myboardGame.carArray.find(c => c.id == selectedCar.id));
    }
    setCarPlace = () => { }
    checkWIn = (car, left, board) => {
        if (left == board) {
            window.alert("You did it!!!")
            car.goOut();
        }
    }
}


const load = () => {
    if (localStorage.length > 0) {
        const getMat = JSON.parse(localStorage.getItem("saveData"));
        console.log(getMat);
        dwclareboard(getMat);
    }
     
     else{ 
          fetch('./cars.json')
            .then(res => res.json())
            .then(data => {
                const boardobj = data;
                console.log(boardobj, "boardobj");
                dwclareboard(boardobj);
            })
        }
    
}

let myboardGame;
let carArr=[]
dwclareboard = (boardobj) => {
    declarCar(boardobj.carArray);
   fillMat()
   console.log(mat)
    myboardGame = new playingBoard(
        boardobj.carArray,
        boardobj.squaresize,
        boardobj.squarecount,
        boardobj.exitpoint,
    );

    printBoard(myboardGame);
    printCar(boardobj);

}
printBoard = (myboardGame) => {
    let board = document.getElementById('Board');
    board.style.width = (Math.sqrt(myboardGame.squarecount) * (myboardGame.squaresize)) + "px";
    board.style.height = (Math.sqrt(myboardGame.squarecount) * (myboardGame.squaresize)) + "px";
    board.style.position = 'absolute';
}

//let newCarArray
declarCar = (cars) => {
   cars.map((i) => {
        if (i.id != 1) {
            maCar = new car(
                id = i.id,
                boardTop = i.boardTop,
                boardLeft = i.boardLeft,
                direction = i.direction,
                sumSquares = i.sumSquares,
                color = i.color
            )
            carArr.push(maCar)
        }
        else {
            myRedCar = new redcar(
                id = i.id,
                boardTop = i.boardTop,
                boardLeft = i.boardLeft,
                direction = i.direction,
                sumSquares = i.sumSquares,
                color = i.color
            )
            carArr.push(myRedCar)
        }
    })

}
fillMat = ()=>{
    carArr.forEach(element => {
        if(element.direction==="horizontal"){
            for(let i=element.boardLeft;i<element.boardLeft+element.sumSquares;i++){
             mat[element.boardTop][i]=1
            }
        }
        else{
            for(let i=element.boardTop;i<element.boardTop+element.sumSquares;i++){
                mat[i][element.boardLeft]=1
        }
        }
    });
}
// console.log(newCarArray);
// console.log(carArr)
printCar = (boardobj) => {
    const board = document.getElementById("Board");
    board.innerHTML = "";
    boardobj.carArray.forEach(element => {
        const car = document.createElement('div');
        board.appendChild(car);
        car.addEventListener("click", () => { setCarSelected(car) });
        car.id = element.id;
        car.className = 'car';
        car.style.position = 'absolute';
        car.style.backgroundColor = element.color;
        car.style.top = (element.boardTop * boardobj.squaresize) + "px";
        car.style.left = (element.boardLeft * boardobj.squaresize) + "px";

        if (element.direction === 'horizontal') {
            car.style.width = boardobj.squaresize * element.sumSquares + "px";
            car.style.height = boardobj.squaresize + "px";
        }
        if (element.direction === 'vertical') {
            car.style.width = boardobj.squaresize + "px";
            car.style.height = boardobj.squaresize * element.sumSquares + "px";
        }

    });
}


const setCarSelected = (singleCar) => {
    const prevSelectedCars = document.querySelectorAll('[selected]');

    prevSelectedCars.forEach(car => {
        car.removeAttribute("selected");
    });
    singleCar.setAttribute("selected", "selected");

}

///1.get selected car
// 2. take id from selectedCar
// 3. check if car can drive to selecet direction
let mat = [[0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0]]
    // [1, 1, 0, 0, 0, 1],
    // [1, 0, 0, 0, 1, 1],
    // [1, 1, 1, 0, 1, 1],
    // [1, 1, 1, 1, 1, 1],
    // [1, 0, 0, 0, 1, 1],
    // [1, 0, 0, 0, 1, 1]];


const up = () => {
    const selectedCar = document.querySelector('[selected]');
    const car = myboardGame.getCarById(selectedCar);   // myboardGame.carArray.find(c=>c.id==selectedCar.id)  
    if (car.direction == 'vertical') {
        if (car.boardTop - 1 >= 0 && myboardGame.placeIsAvailable(car.boardLeft, car.boardTop - 1) == true) {
            mat[car.boardTop + car.sumSquares - 1][car.boardLeft] = 0
            mat[car.boardTop - 1][car.boardLeft] = 1
            car.boardTop -= 1;
            selectedCar.style.top = car.boardTop * myboardGame.squaresize + "px"
        }
    }
}
left = () => {
    const selectedCar = document.querySelector('[selected]');
    const car = myboardGame.getCarById(selectedCar);
    if (car.direction == 'horizontal') {
        if (car.boardLeft - 1 >= 0 && myboardGame.placeIsAvailable(car.boardLeft - 1, car.boardTop) == true) {
            mat[car.boardTop][car.boardLeft + car.sumSquares - 1] = 0
            mat[car.boardTop][car.boardLeft - 1] = 1
            car.boardLeft -= 1;
            selectedCar.style.left = car.boardLeft * myboardGame.squaresize + "px"
        }
    }
}
let count = 3;
right = () => {
    const selectedCar = document.querySelector('[selected]');
    const car = myboardGame.getCarById(selectedCar);
    if (car.direction == 'horizontal') {
        if (car.boardLeft + car.sumSquares + 1 <= Math.sqrt(myboardGame.squarecount)
            && myboardGame.placeIsAvailable(car.boardLeft + car.sumSquares, car.boardTop) == true && car.id != 1) {
            mat[car.boardTop][car.boardLeft] = 0
            mat[car.boardTop][car.boardLeft + car.sumSquares] = 1
            car.boardLeft += 1;
            selectedCar.style.left = car.boardLeft * myboardGame.squaresize + "px"
        }

        if (car.id == 1) {
            if (myboardGame.placeIsAvailable(car.boardLeft + car.sumSquares, car.boardTop) == true && count != 8) {
                mat[car.boardTop][car.boardLeft] = 0
                mat[car.boardTop][car.boardLeft + car.sumSquares] = 1
                car.boardLeft += 1;
                selectedCar.style.left = car.boardLeft * myboardGame.squaresize + "px";
                count++;
                myboardGame.checkWIn(car, car.boardLeft + car.sumSquares, Math.sqrt(myboardGame.squarecount) + 1);
            }
        }
    }
}

down = () => {
    const selectedCar = document.querySelector('[selected]');
    const car = myboardGame.getCarById(selectedCar);
    if (car.direction == 'vertical') {
        if (car.boardTop + car.sumSquares + 1 <= Math.sqrt(myboardGame.squarecount)
            && myboardGame.placeIsAvailable(car.boardLeft, car.boardTop + car.sumSquares) == true) {
            mat[car.boardTop][car.boardLeft] = 0
            mat[car.boardTop + car.sumSquares][car.boardLeft] = 1
            car.boardTop += 1;
            selectedCar.style.top = car.boardTop * myboardGame.squaresize + "px"
        }
    }
}

State = () => {
    const state=document.getElementById("status");
    state.innerHTML=''
    
    for(let i=0;i<mat.length;i++){
        for(let j=0;j<=mat[0].length;j++){
            if(mat[i][j]==0)
            {
                state.innerHTML+=`'תפוס'[${i}][${j}] `

            }
            else{
                state.innerHTML+=`'פנוי'[${i}][${j}] `
            }
        }

    }
}

SaveGo = () => {
    const saveData = JSON.stringify(myboardGame);
    localStorage.setItem("saveData", saveData);
    window.location.href="./Login.html"
}

Zeroing = () =>{
    localStorage.clear();
    load();
}









