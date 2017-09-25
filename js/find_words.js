
function copy(array){
	var copy = [];
	for(var i=0; i<array.length; i++){
		copy[i] = array[i];
	}
	return copy;
}

function has_letters(word, letters){
	var copied_letters = copy(letters);
	for(var i=0; i<word.length; i++){
		var index = copied_letters.indexOf(word[i]);
		if(index == -1){
			return false;
		}
		copied_letters[index] = null;
	}
	return true;
}

function words_with_letters(dictionnary, letters){
	var words = dictionnary.filter(function(word){
		var test = has_letters(word, letters);
		return test
	});
	return words;
}

function initialize_state(dictionnary, letters){
	var state = {
		letters: letters,
		found_words: [],
		possible_words: words_with_letters(dictionnary, letters)
	};
	return state;
}

function is_full(state){
	return state.found_words.length == state.possible_words.length;
}

function guess_word(state, word){
	if(state.possible_words.includes(word)){
		state.found_words.push(word);
		return true;
	} else {
		return false;
	}
}

function update_display(state){
	var letters_text = state.letters.join(' ');
	var founds = [];
	for(var i=0; i<state.possible_words.length; i++){
		if(state.found_words.includes(state.possible_words[i])){
			founds.push(state.possible_words[i]);
		} else {
			founds.push('_'.repeat(state.possible_words[i].length));
		}
	}
	var founds_text = founds.join(' ');
	$("#display").empty();
	$("#display").append(letters_text);
	$("#display").append("<br>");
	$("#display").append(founds_text);
	$("#display").append("<br>");
};

$.get("./words.txt", function(data) {
	var dictionnary =
		data
		.split('\n')
		.map(function(word){return word.trim();})
		.filter(function(word){return word.length > 2;})
	;
	console.log(dictionnary);
	var state = initialize_state(dictionnary, ['s', 'u', 'm', 'm', 'e', 'r']);
	update_display(state);
	$('#guess-input').on('submit', function(event){
		event.preventDefault();
		var word = $("#guess").val();
		guess_word(state, word);
		update_display(state);
	});
});

