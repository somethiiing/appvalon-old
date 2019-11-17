const shuffle = function (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

const findNextHammer = function (kingList) {
	// king list length will always be at least 5.
	// also ony need to find hammer at the beginning of the game, or after each mission, when hammer count === 0.
	return kingList[4];
}

module.exports = { shuffle, findNextHammer };