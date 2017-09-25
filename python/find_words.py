import sys, copy, signal

def load_dictionnary():
    with open('words.txt', 'r') as dict_file:
        dict = [ word[:-1] for word in dict_file if len(word) > 4 ]
    return dict

def has_letters(word, letters):
    letters = copy.deepcopy(letters)
    for letter in word:
        if not letter in letters:
            return False
        letters.remove(letter)
    return True


def words_with_letters(letters):
    dictionnary = load_dictionnary()
    return [ word for word in dictionnary if has_letters(word, letters) ]


class Engine():
    def __init__(self, letters):
        self.letters = sorted(letters)
        self.found_words = []
        self.possible_words = words_with_letters(letters)

    def is_full(self):
        return len(self.found_words) == len(self.possible_words)

    def guess_word(self, word):
        is_possible = word in self.possible_words
        if is_possible:
            self.found_words.append(word)
        return is_possible

    def pretty_guesses(self):
        words = []
        for w in self.possible_words:
            if w in self.found_words:
                words.append(w)
            else:
                words.append('_' * len(w))
        return '  '.join(words)

    def pretty_solution(self):
        return '  '.join(self.possible_words)

    def pretty_letters(self):
        return ' '.join(self.letters)


if __name__ == '__main__':
    letters = [ 's', 'u', 'm', 'm', 'e', 'r' ]
    engine = Engine(letters)
    print('{}'.format(engine.pretty_guesses()))
    print('{}'.format(engine.pretty_letters()))

    def user_quit(signum, frame):
        print('{}'.format(engine.pretty_solution()))
        exit(1)
    signal.signal(signal.SIGINT, user_quit)

    while not engine.is_full():
        word = sys.stdin.readline()[:-1]
        if engine.guess_word(word):
            print('Correct!\n{}\n{}'.format(
                engine.pretty_guesses(),
                engine.pretty_letters()
            ))
        else:
            print('Wrong!')
    print('You found all the words!')
    exit(0)
