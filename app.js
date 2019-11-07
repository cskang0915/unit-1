let roundNumber = 1
let fightNumber = 1
let playerCharacter
let computerCharacter
let start = 0
let time = 70

let mainPage = document.querySelector('.main-page')
let battlePage = document.querySelector('.battle-page')
let playerWin = document.querySelector('.player-win')
let monsterWin = document.querySelector('.monster-win')

let playerName = document.querySelector('input')
let logList = document.querySelector('.log-list')

let knightCharacter = document.querySelector('.knight-character')
let orcCharacter = document.querySelector('.orc-character')

let battleButton = document.querySelector('.battle')
let nextBattleButton = document.querySelector('.next-battle')
let statsButton = document.querySelector('.stats')

let knightHPBar = document.querySelector('.knight-current-HP')
let orcHPBar = document.querySelector('.orc-current-HP')

let Character = function(input){
	this.type = input,
	this.createName(),
	this.createHP(),
	this.createSTR()
}

Character.prototype.createName = function(){
	if(this.type == 'computer'){
		this.name = 'orc'.toUpperCase()
	}else {
		this.name = this.type.toUpperCase()
		this.type = 'player'
	}
}

Character.prototype.createHP = function(){
	if(this.type == 'computer'){
		this.HP = 30
		this.maxHP = 30
	}else {
		this.HP = 100
		this.maxHP = 100
	}
}

Character.prototype.createSTR = function(){
	if(this.type == 'computer'){
		this.STR = Math.floor(Math.random() * (8-3) + 3)
	}else {
		this.STR = Math.floor(Math.random() * (7-4) + 4)
	}
}

// let typeWriter = function(text, element, time){
// 	console.log('run')
// 	if(start < text.length){
// 		element.innerHTML += text.charAt(start)
// 		start++
// 		setTimeout(function(){
// 			typeWriter(text, element, time)
// 		}, time)
// 	}
// }

let createListElement = function(text){
	let list = document.createElement('li')
	list.innerText = text
	// console.log(text)
	// typeWriter(text, list, time)
	// let test = function(){
	// 	if(start < text.length){
	// 		list.innerHTML += text.charAt(start)
	// 		start++
	// 		setTimeout(test, time)
	// 	}
	// }
	// console.log(list)

	return list
}

let fight = function(playerOne, playerTwo){
	if((playerOne.type == 'player') && (playerOne.HP > 0) && (playerTwo.HP > 0)){
		let newPlayerTwoHP = playerTwo.HP - playerOne.STR
		playerTwo.HP = playerTwo.HP - playerOne.STR
		if(playerTwo.HP > 0){
			let playerTwoMaxHP = playerTwo.maxHP
			let playerTwoPercentageHP = calculateHP(newPlayerTwoHP, playerTwoMaxHP)
			// console.log(playerTwoPercentageHP)
			orcHPBar.style.width = `${playerTwoPercentageHP}%`
			logList.append(createListElement(`${playerOne.name} hit ${playerTwo.name} for ${playerOne.STR} damage!`))
			// logList.append(createListElement((`${playerTwo.name} has ${playerTwo.HP} left.`)))
			logList.scrollTop = 1000
		}else {
			logList.append(createListElement(`${playerOne.name} hit ${playerTwo.name} for ${playerOne.STR} damage!`))
			logList.append(createListElement(`${playerTwo.name} has been defeated! ${playerOne.name} wins.`))
			logList.scrollTop = 1000
			// battlePage.classList.toggle('hidden')
			// playerWin.classList.toggle('hidden')
			orcCharacter.classList.toggle('defeated')
			battleButton.classList.toggle('hidden')
			nextBattleButton.classList.toggle('hidden')
			nextBattleButton.addEventListener('click', newMonster)
		}
	}else if((playerOne.type == 'computer') && (playerOne.HP > 0) && (playerTwo.HP > 0)){
		let hit = Math.floor(Math.random() * 4)
		if(hit == 3){
			logList.append(createListElement((`${playerOne.name} missed!`)))
			// logList.append(createListElement((`${playerTwo.name} has ${playerTwo.HP} left.`)))
			logList.scrollTop = 1000
		}else {
			let newPlayerTwoHP = playerTwo.HP - playerOne.STR
			playerTwo.HP = playerTwo.HP - playerOne.STR
			if(playerTwo.HP > 0){
				let playerTwoMaxHP = playerTwo.maxHP
				let playerTwoPercentageHP = calculateHP(newPlayerTwoHP, playerTwoMaxHP)
				// console.log(playerTwoPercentageHP)
				knightHPBar.style.width = `${playerTwoPercentageHP}%`
				logList.append(createListElement(`${playerOne.name} hit ${playerTwo.name} for ${playerOne.STR} damage!`))
				// logList.append(createListElement((`${playerTwo.name} has ${playerTwo.HP} left.`)))
				logList.scrollTop = 1000
			}else {
				logList.append(createListElement(`${playerOne.name} hit ${playerTwo.name} for ${playerOne.STR} damage!`))
				logList.append(createListElement(`${playerTwo.name} has been defeated! ${playerOne.name} wins.`))
				logList.scrollTop = 1000
				playerName.value = ''
				// battlePage.classList.toggle('hidden')
				// monsterWin.classList.toggle('hidden')
				knightCharacter.classList.toggle('defeated')
				battleButton.classList.toggle('hidden')
				statsButton.classList.toggle('hidden')
				statsButton.addEventListener('click', stats)
			}
		}
	}
}

let stats = function(){
	clearList()
	alert(`${playerCharacter.name} has survived till round ${roundNumber}`)
	window.location.reload()
	// roundNumber = 1
	// monsterWin.classList.toggle('hidden')
	// mainPage.classList.toggle('hidden')
}

let newMonster = function(){
	clearList()
	roundNumber++
	fightNumber = 1
	computerCharacter = new Character('computer')
	let orcHP = calculateHP(computerCharacter.HP, computerCharacter.maxHP)
	orcHPBar.style.width = `${orcHP}%`
	orcCharacter.classList.toggle('defeated')
	battleButton.classList.toggle('hidden')
	nextBattleButton.classList.toggle('hidden')
}

let clearList = function(){
	let logChild = logList.firstChild
	while(logChild){
		logList.removeChild(logChild)
		logChild = logList.firstChild
	}
}

let round = function(playerOne, playerTwo){
	logList.append(createListElement(`-----Round ${roundNumber}--Fight ${fightNumber}-----`))
	fight(playerOne, playerTwo)
	fight(playerTwo, playerOne)
	fightNumber++
	logList.append(createListElement(`\n`))
}

// round(playerCharacter, computerCharacter)
// computerCharacter = new Character('computer')
// console.log(computerCharacter)
// round(playerCharacter, computerCharacter)

// let createBattleButton = function(){
// 	let battleButton = document.createElement('button')
// 	battleButton.classList.add('battle')
// 	return battleButton
// }

// let roundFunction = function(playerOne, playerTwo){
// 	return round()
// }

let calculateHP = function(value, total){
	let percentage = (value/total) * 100
	percentage = percentage.toFixed(2)
	return percentage
}

document.querySelector('.start').addEventListener('click', function(){
	playerCharacter = new Character(playerName.value)
	computerCharacter = new Character('computer')
	// console.log(playerCharacter)
	// console.log(computerCharacter)
	let knightHP = calculateHP(playerCharacter.HP, playerCharacter.maxHP)
	let orcHP = calculateHP(computerCharacter.HP, computerCharacter.maxHP)
	knightHPBar.style.width = `${knightHP}%`
	orcHPBar.style.width = `${orcHP}%`
	mainPage.classList.toggle('hidden')
	battlePage.classList.toggle('hidden')
	battleButton.addEventListener('click', function() {
		round(playerCharacter, computerCharacter)
	})
	// console.log('Game start')
})

// newButton.addEventListener('click', round(playerCharacter, computerCharacter))
// let testBattleButton = document.querySelector('.battle')
// testBattleButton.addEventListener('click', round(playerCharacter, computerCharacter))