const doorContainer = document.getElementById('hall-container')
const doors: HTMLCollectionOf<Element> = document.getElementsByClassName('door')
const message = document.getElementById('message')
const replayButton = document.getElementById('replay-button')

let clicked: Number = 0
let doorNum: Number
let doorClicked: number
function resetGame(): void {
    clicked = 0
    message?.classList.add('hide')
    doorContainer?.classList.remove('disable')
    replayButton?.classList.add('hide')
    doorContainer?.removeChild(doorContainer.lastElementChild!)
    for(let door of doors) {
        door.parentElement!.classList.remove('outline')
        door.parentElement!.classList.remove('prize-door')
        door.classList.remove('active')
        door.classList.remove('doorOpened');
        door.classList.remove('disable');
        (door as HTMLElement).dataset.isPrize = "false"
    }
}

for(let door of doors) {
    door.addEventListener('click', (e: Event) => {
        if(doorClicked != undefined) {
            doors[doorClicked].parentElement?.classList.remove('outline') 
        }
        if(!e.target) {
            return
        }
        let targetEl = e.target as HTMLElement
        targetEl.parentElement?.classList.add('outline')
        targetEl.classList.add('active')
        doorClicked = parseInt(targetEl.dataset.doornum!)
        if(!clicked) {
            (doors[Math.floor(Math.random() * 3)] as HTMLElement).dataset.isPrize = "true"
            let randomChoice = Math.floor(Math.random() * 3)
            let randomDoor = doors[randomChoice] as HTMLElement
            while(parseInt(randomDoor.dataset.doornum!) == doorClicked || randomDoor.dataset.isPrize == "true") {
                randomChoice = Math.floor(Math.random() * 3)
                randomDoor = doors[randomChoice] as HTMLElement
            }
            randomDoor.classList.add('doorOpened')
            randomDoor.classList.add('disable')
            targetEl.classList.remove('active')
            message?.classList.remove("hide")
            clicked = 1
        } else {
            let win: HTMLParagraphElement = document.createElement('p')
            targetEl.parentElement?.classList.add('outline')
            targetEl.classList.add('doorOpened')
            targetEl.classList.remove('active')
            if(targetEl.dataset.isPrize == "true") {
                targetEl.parentElement!.classList.add('prize-door')
                win.textContent = "You Win a Prize!"
            } else {
                win.textContent = "You didn't win anything :("
            }
            doorContainer?.appendChild(win)
            doorContainer?.classList.add('disable')
            replayButton?.classList.remove('hide')
        }
    })
}

replayButton?.addEventListener('click', () => {
    resetGame();
})