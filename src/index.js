const infoMoves = document.querySelector(".info .moves span")
const infoDisks = document.querySelector(".info .disks span")

function startNewGame(numOfDisks) {
	document.querySelectorAll(".set").forEach((setBox, index) => {
		function moveAction() {
			console.log("bang")
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
				if (!topDisk || topDisk.dataset.size > selectedDisk.dataset.size) {
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
			if (document.querySelector(".set#end").childElementCount === numOfDisks) {
				alert("You Win!")
				Array.from(document.querySelector(".set#end").childNodes).forEach(disk => {
					disk.remove()
					document.querySelector(".set#start").appendChild(disk)
				})
			}

			// IF start set contains all disks
			if (document.querySelector(".set#start").childElementCount === numOfDisks)
				infoMoves.textContent = 0
		}

		setBox.innerHTML = null
		setBox.style.height = null

		setBox.onclick = moveAction
	})

	for (let index = 0; index < numOfDisks; index++) {
		let disk = document.createElement("div")
		disk.classList.add("disk")
		if (document.body.classList.contains("dark"))
			disk.classList.add("dark")
		if (document.querySelector(".icon.hash").classList.contains("show-text"))
			disk.classList.add("show-text")

		disk.dataset.size = index
		disk.innerText = `${index + 1}`
		disk.style.width = `calc(${20 + ((85 / numOfDisks) * index)}% - calc(4px + 3.33px))`

		document.querySelector(".set#start").insertBefore(disk, document.querySelector(".set#start").firstChild)
	}

	document.querySelectorAll(".set").forEach(setBox => setBox.style.height = `${document.querySelector(".set#start").clientHeight - 14}px`)

	infoMoves.textContent = 0
	infoDisks.textContent = numOfDisks
}

document.querySelector("input[type=range]").addEventListener("change", function () {
	startNewGame(this.value)
})

document.querySelector("input[type=range]").addEventListener("input", function () {
	infoDisks.textContent = this.value
})

document.querySelector(".icon.moon").addEventListener("click", function () {
	document.querySelectorAll("body, .disk").forEach(element => element.classList.toggle("dark"))
})

document.querySelector(".icon.hash").addEventListener("click", function () {
	document.querySelectorAll(".icon.hash, .disk").forEach(element => element.classList.toggle("show-text"))
})

startNewGame(4)