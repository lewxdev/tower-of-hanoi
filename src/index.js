const infoMoves = document.querySelector(".info .moves span")
const infoDisks = document.querySelector(".info .disks span")

function startNewGame(numOfDisks) {
	const sets = document.querySelectorAll(".set")
	const startSet = document.querySelector(".set#start")
	const endSet = document.querySelector(".set#end")

	sets.forEach((setBox, index) => {
		function moveAction() {
			const selectedDisk = document.querySelector(".selected")
			const topDisk = setBox.lastElementChild

			// IF a disk is being picked up (no disk is selected)
			// -- [first click]
			if (!selectedDisk) {
				// IF there is a selectable disk
				if (topDisk) topDisk.classList.add("selected")
				// IF a disk has been picked up (a disk is selected)
				// -- [second click]
			} else {
				// IF disk is being dropped (in an empty set/topDisk is bigger than selected)
				if (!topDisk || topDisk.dataset.index > selectedDisk.dataset.index) {
					selectedDisk.remove()
					setBox.appendChild(selectedDisk)
					selectedDisk.classList.remove("selected")
					infoMoves.textContent++
				}
				// IF selected disk is being dropped in its current set
				else if (setBox === selectedDisk.parentElement)
					selectedDisk.classList.remove("selected")
			}

			// IF end set contains all disks
			if (endSet.childElementCount === numOfDisks) {
				alert("You Win!")
				if (confirm("Play again?"))
					startNewGame(numOfDisks)
			}
		}

		setBox.innerHTML = ""
		setBox.style.height = null
		setBox.addEventListener("click", moveAction)
		document.body.addEventListener("keyup", (event) => {
			if (event.keyCode === [49, 50, 51][index])
				moveAction()
		})
	})

	for (let index = 0; index < numOfDisks; index++) {
		let disk = document.createElement("div")
		disk.classList.add("disk")
		disk.dataset.index = index
		disk.style.width = `calc(${20 + ((85 / numOfDisks) * index)}% - 4px)`

		startSet.insertBefore(disk, startSet.firstChild)
	}

	sets.forEach(setBox => setBox.style.height = `${startSet.clientHeight - 14}px`)

	infoMoves.textContent = 0
	infoDisks.textContent = numOfDisks
}

document.querySelector("input[type=range]").addEventListener("change", function () {
	startNewGame(this.value)
})

document.querySelector("input[type=range]").addEventListener("input", function () {
	infoDisks.textContent = this.value
})

startNewGame(4)