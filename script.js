let dictionary = {
	// in minutes
	non: {timeReq: 30, pupCount: 0},
	indoor: {timeReq: 120, pupCount: 0},
	patio: {timeReq: 60, pupCount: 0},
}

function populate(dictionary) {
	for (let key in dictionary) {
		['timeReq', 'pupCount'].forEach(id => {
			let div = document.createElement('div');
			div.className = 'capitalize';
			div.innerText = key;
			document.getElementById(id).appendChild(div);

			let input = document.createElement('input');
			input.id = `${key}-${id}`;
			input.type = 'number';
			input.className = 'col-span-2 text-neutral-900 pl-1'
			input.value = dictionary[key][id];
			document.getElementById(id).appendChild(input);
			input.addEventListener('change', function() {
				dictionary[key][id] = parseInt(this.value, 10);
				updateOutput();
				// console.log(dictionary);
			});
		});
	}
}
populate(dictionary);

function updateOutput() {
	let totals = {
		non: dictionary.non.timeReq * dictionary.non.pupCount / 60,
		indoor: dictionary.indoor.timeReq * Math.ceil(dictionary.indoor.pupCount / 15) / 60,
		patio: dictionary.patio.timeReq * Math.ceil(dictionary.patio.pupCount / 15) / 60,
	}
	let output = `Combined Boarders: ${(totals.indoor + totals.patio).toFixed(1)}H

	Indoor Time: ${totals.indoor.toFixed(1)}H
	Patio Time: ${totals.patio.toFixed(1)}H
	
	Non Time: ${totals.non.toFixed(1)}H`;
	document.getElementById('output').innerText = output;
}
document.querySelectorAll('input[type="number"]').forEach(input => {
	input.addEventListener('change', updateOutput);
});
updateOutput();