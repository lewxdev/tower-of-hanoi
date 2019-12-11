const infoMoves = document.querySelector(".info .moves span")
const infoDisks = document.querySelector(".info .disks span")

function startNewGame(numOfDisks) {
	const sets = Array.from(document.querySelectorAll(".set"))
	const startSet = document.querySelector(".set#start")
	const endSet = document.querySelector(".set#end")


	sets.forEach(setBox => {
		setBox.innerHTML = ""
		setBox.style.height = null
		setBox.onclick = function () {
			const setBox = this
			const selectedDisk = document.querySelector(".selected")
			const topDisk = setBox.lastElementChild
	
			if (!selectedDisk)
				topDisk.classList.add("selected")

			else if (!topDisk || topDisk.dataset.index < selectedDisk.dataset.index) {
				selectedDisk.remove()
				setBox.appendChild(selectedDisk)
				selectedDisk.classList.remove("selected")
				infoMoves.textContent++
			}
			
			else if (setBox === selectedDisk.parentElement)
				selectedDisk.classList.remove("selected")
	
			if (endSet.childElementCount === numOfDisks) {
				alert("You Win!")
				if (confirm("Play again?"))
					startNewGame(numOfDisks)
			}
		}
	})

	for (let index = 0; index < numOfDisks; index++) {
		let disk = document.createElement("div")
		disk.classList.add("disk")
		disk.dataset.index = index
		disk.style.width = `calc(${100 - ((80 / numOfDisks) * index)}% - 4px)`

		startSet.appendChild(disk)
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