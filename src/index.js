function startNewGame(numOfDisks) {
	const startSet = document.querySelector(".set#start")
	document.querySelectorAll(".set").forEach(setBox => setBox.innerHTML = "")

	for (let index = 0; index < numOfDisks; index++) {
		let disk = document.createElement("div")
		disk.classList.add("disk")
		disk.id = `no_${index}`
		disk.style.width = `${100 - ((80 / numOfDisks) * index)}%`

		startSet.appendChild(disk)
	}
	document.querySelectorAll(".set").forEach((setBox, index) => {
		setBox.style.height = `${startSet.clientHeight - 14}px`
	})
}

document.querySelectorAll(".set").forEach(setBox => {
	setBox.onclick = function () {
		const selectedDisk = document.querySelector(".selected")
		if (!document.querySelector(".selected"))		
			this.lastElementChild.classList.add("selected")
		else {
			if (this.innerHTML == "" || this.lastElementChild.clientWidth > selectedDisk.clientWidth) {
				selectedDisk.remove()
				this.appendChild(selectedDisk)
				this.lastElementChild.classList.remove("selected")
			}
		}
	}
})

startNewGame(4)

// document.querySelectorAll(".set").forEach(setBox => {
// 	setBox.onclick = function () {
// 		function removeDisk(".selected");
// 		if (!document.querySelector(".selected"))		
// 			this.lastElementChild.classList.add("selected")
// 		else {
// 			document.querySelector(".selected").remove()
			
// 			this.lastElementChild.classList.remove("selected")
// 		}
// 	}
// }

// /*
// 1. Only one disk can be moved at a time.
// 2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack.
// 3. No disk may be placed on top of a smaller disk.
// */

// var disk1 = document.getElementById("no_0");
// var disk2 = document.getElementById("no_1");
// var disk3 = document.getElementById("no_2");
// var disk4 = document.getElementById("no_3");

// var startSet = document.getElementById("start");
// var offSet = document.getElementById("offset");
// var endSet = document.getElementById("end");


// var sets = document.getElementsByClassName("set");
// sets = [startSet, offSet, endSet];
// var disks = document.getElementsByClassName("disk");
// disks = [disk1, disk2, disk3, disk4];

// sets.onclick = function grabDiskOnTop(event) {
//     /* var disk1 = document.getElementById("no_0");
//     var disk2 = document.getElementById("no_1");
//     var disk2 = document.getElementById("no_2");
//     var disk2 = document.getElementById("no_3"); */
//     event.currentTarget = 
//     if

// }

// sets.addEventListener("dblclick", grabDiskOnTop);

// // function grabDisk(event)

// // Excerpted code
// disk.addEventListener("click", function () {
// 	document.querySelectorAll(".disk").forEach(disk => disk.classList.remove("selected"))
// 	if (this.parentElement.lastElementChild === this)
// 		this.classList.add("selected")

// 	document.querySelectorAll(".set").forEach(setBox => {
// 		setBox.classList.remove("moveable")
// 		if (this.classList.contains("selected"))
// 			if (setBox.childElementCount < numOfDisks)
// 				setBox.classList.add("moveable")
// 	})