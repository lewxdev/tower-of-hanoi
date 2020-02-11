const nodes = {
	towers: document.querySelectorAll(".tower"),
	slider: document.querySelector("input[type=range]"),
	infoText: document.querySelectorAll(".info .text span"),
	options: document.querySelectorAll(".options .icon")
}

function Game(diskCount) {
	this.diskCount = diskCount
	this.createStartTower()
}

Game.prototype.createStartTower = function () {
	nodes.towers.forEach(tower => {
		tower.innerHTML = null
		tower.style.height = null
	})

	for (let index = 0; index < this.diskCount; index++) {
		let disk = document.createElement("div")

		disk.classList.add("disk")
		if (document.body.classList.contains("dark"))
			disk.classList.add("dark")
		if (document.querySelector(".icon.hash").classList.contains("show-text"))
			disk.classList.add("show-text")

		disk.dataset.size = disk.innerText = `${index + 1}`
		disk.style.width = `calc(${20 + ((85 / this.diskCount) * index)}% - 7.33px)`

		nodes.towers[0].insertBefore(disk, nodes.towers[0].firstChild)
	}

	nodes.towers.forEach(tower => {
		tower.style.height = `${nodes.towers[0].clientHeight - 14}px`
	})

	nodes.infoText.forEach((span, index) => {
		span.textContent = [0, this.diskCount][index]
	})
}

nodes.towers.forEach(tower => {
	tower.onclick = function () {
		const diskNodes = {
			selected: document.querySelector(".selected"),
			top: tower.lastElementChild,
			count: parseInt(nodes.infoText[1].textContent)
		}

		if (!diskNodes.selected) {
			if (diskNodes.top) diskNodes.top.classList.add("selected")
		} else {
			if (!diskNodes.top || diskNodes.top.dataset.size > diskNodes.selected.dataset.size) {
				diskNodes.selected.remove()
				tower.appendChild(diskNodes.selected)
				diskNodes.selected.classList.remove("selected")
				nodes.infoText[0].textContent++
			} else if (tower === diskNodes.selected.parentElement)
				diskNodes.selected.classList.remove("selected")
		}

		if (nodes.towers[2].childElementCount == diskNodes.count) {
			alert("You Win!")
			nodes.slider.value = `${diskNodes.count + 1}`
			new Game(diskNodes.count + 1)
		}
	}
})

document.body.onkeyup = function (event) {
	nodes.towers.forEach((tower, index) => {
		if (event.code === ["Digit1", "Digit2", "Digit3"][index])
			tower.onclick()
	})
}

nodes.slider.onchange = function () {
	new Game(this.value)
}
nodes.slider.oninput = function () {
	nodes.infoText[1].textContent = this.value
}
nodes.options[0].onclick = function () {
	new Game(parseInt(nodes.infoText[1].textContent))
}
nodes.options[1].onclick = function () {
	document.querySelectorAll(".icon.hash, .disk").forEach(element => element.classList.toggle("show-text"))
}
nodes.options[2].onclick = function () {
	document.querySelectorAll("body, .disk").forEach(element => element.classList.toggle("dark"))
	document.querySelector("meta[name=theme-color]").setAttribute("content",
		document.body.classList.contains("dark") ? "#0e0e0e" : "#ffffff");
}

new Game(4)