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
    goOut() {
        alert("You did it!!!")
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
    placeIsAvailable = () => { }
    getCarById = () => { }
    setCarPlace = () => { }
    checkWIn = () => { }
}


const load = () => {
    fetch('./cars.json')
        .then(res => res.json())
        .then(data => {
            const boardobj = data;
            console.log(boardobj, "boardobj");
            dwclareboard(boardobj);
        })
}

let myboardGame;
dwclareboard = (boardobj) => {
    const carArr = declarCar(boardobj.carArray);

    myboardGame = new playingBoard(
        boardobj.carArray,
        boardobj.squaresize,
        boardobj.squarecount,
        boardobj.exitpoint,
    )

    printBoard(myboardGame);
    printCar(boardobj);

}

printBoard = (myboardGame) => {
    let board = document.createElement('div');
    board.id = 'Board';
    document.body.appendChild(board);
    board.style.width = (Math.sqrt(myboardGame.squarecount) * (myboardGame.squaresize)) + "px";
    board.style.height = (Math.sqrt(myboardGame.squarecount) * (myboardGame.squaresize)) + "px";
    board.style.position = 'absolute';
}


declarCar = (cars) => {
    const newCarArray = cars.map((i) => {
        if (i.id != 1) {
            maCar = new car(
                id = i.id,
                boardTop = i.boardTop,
                boardLeft = i.boardLeft,
                direction = i.direction,
                sumSquares = i.sumSquares,
                color = i.color
            )
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
        }
    })

}

printCar = (boardobj) => {
    boardobj.carArray.forEach(element => {
        const car = document.createElement('div');
        Board.appendChild(car);
        car.addEventListener("click", () => { setCarSelected(car) });
        car.id = element.id;
        car.className ='car';
        car.style.position = 'absolute';
        car.style.backgroundColor = element.color;
        car.style.top = (element.boardTop *boardobj.squaresize ) + "px";
        car.style.left = (element.boardLeft *boardobj.squaresize ) + "px";
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

const setCarSelected = (car) => {
let cars = document.body.getElementsByClassName('car'); 
    // console.log(cars,"cars")
    cars.forEach(element => {
        element.removeAttribute("id","myselected")
        // document.querySelector('elment').removeAttribute('myselect')
    })
    car.setAttribute("id", "myselect");
// document.querySelector('car').setAttribute('myselect','')
}













