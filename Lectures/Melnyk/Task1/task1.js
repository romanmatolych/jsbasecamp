class TextStats {
    constructor(textCounter) {
      if (!textCounter instanceof HTMLElement && textCounter.tagName === 'SECTION') {
        throw new ReferenceError('Constructor argument should be a section');
      }
  
      this.input = textCounter.querySelector('.text-input');
      this.infoTable = textCounter.querySelector('.text-info-table');
      this.autoUpdate = textCounter.querySelector('.auto-update');
      this.calculate = textCounter.querySelector('.text-info-calculate');
  
      this.maxLength = this.input.maxLength || false;
      this.debug = !!this.input.dataset.debug || false;
  
      // GlobalLogic Word Counter
      this.GLWordCouner = !!this.input.dataset.glwcouner || false;
  
      if (this.maxLength) {
        this.initCharsLeft();
      }
  
      if (this.debug) {
        this.initDebugMode();
      }
  
      this.initAutoUpdate();
      this.initCalculate();
    }
  
    /**
     * Initialise 'chars left' functionality
     */
    initCharsLeft() {
      const charsLeft = document.createElement('div');
  
      charsLeft.classList.add('chars-left');
      charsLeft.title = 'Characters left';
      charsLeft.textContent = String(this.getCharsLeft());
  
      this.input.parentNode.appendChild(charsLeft);
  
      this.input.addEventListener('input', () => {
        this.checkCharsLimit(charsLeft);
      });
  
      window.addEventListener('load', () => {
        this.checkCharsLimit(charsLeft);
      });
  
      charsLeft.onclick = () => {
        const newCharLimit = Math.abs(
            +(prompt('Enter character limit', this.maxLength)) || this.maxLength
        );
  
        if (!Number.isNaN(newCharLimit)) {
          this.input.maxLength = this.maxLength = newCharLimit;
          this.checkCharsLimit(charsLeft);
        }
      }
    }
  
    /**
     * Checks, how many characters left, and sets warn class if needed
     * @param element
     */
    checkCharsLimit(element) {
      if (this.getCharsLeftPercentage() < 10) {
        element.classList.add('chars-left-warn');
      } else {
        element.classList.remove('chars-left-warn');
      }
  
      element.textContent = this.getCharsLeft();
    }
  
    /**
     * Initializes debug mode
     * nothing special here, just for fun
     */
    initDebugMode() {
      this.input.textContent = `Мама мила раму, рама сказала мамі "спасибі"! \
  Мама перестала мити раму - рама показала мамі язика!`;
  
      const that = this;
  
      function debug() {
        console.clear();
        console.log(
            //JSON.stringify(that.getTextStatistic(), null, 2),
            JSON.stringify(that.getWordOccurrence(), null, 2)
        );
      }
  
      window.addEventListener('load', debug);
      window.addEventListener('load', () => { that.updateInfoTable() });
      this.input.addEventListener('input', debug);
    }
  
    /**
     * Sets event listeners to auto update info table
     */
    initAutoUpdate() {
      const that = this;
  
      function autoUpdate() {
        that.updateInfoTable();
      }
  
      const enableAutoUpdate = () => {
        this.input.addEventListener('input', autoUpdate);
        this.calculate.disabled = true;
      };
  
      const disableAutoUpdate = () => {
        this.input.removeEventListener('input', autoUpdate);
        this.calculate.disabled = false;
      };
  
      window.addEventListener('load', () => {
        if (this.autoUpdate.checked) {
          enableAutoUpdate();
          that.updateInfoTable();
        }
      });
  
      this.autoUpdate.onclick = () => {
        if (this.autoUpdate.checked) {
          enableAutoUpdate();
          this.updateInfoTable();
        } else {
          disableAutoUpdate();
        }
      };
    };
  
    /**
     * Adds event listener, that updates info table when the "Calculate" btn clicked
     */
    initCalculate() {
      this.calculate.onclick = () => this.updateInfoTable();
    };
  
    /**
     * Trims string and replace multiple space characters with single space.
     * @description According to typography rules - there should be no more than one space character in the row
     * @return string
     */
    getText() {
      return this.input.value.replace(/\s{2,}/g, ' ').trim();
    };
  
    /**
     * Returns space count (zero if no spaces)
     * @return number
     */
    getSpaceCount() {
      const text = this.getText();
      return text.includes(' ') ? text.match(/\s/g).length : 0;
    };
  
    /**
     * Returns paragraphs count (there's always at least one paragraph)
     * @return number
     */
    getParagraphsCount() {
      if (this.getText().length === 0) {
        return 0;
      }
  
      const paragraphs = this.getText().match(/[\r\n]+/gm);
  
      return paragraphs ? ++paragraphs.length : 1;
    }
  
    /**
     * Returns sentences count (there's always be at least one sentence)
     * Attention! This count can't be 100% accurate because of dots in shortened words
     * @return number
     */
    getSentencesCount() {
      if (this.getText().length === 0) {
        return 0;
      }
  
      // replace 2 or more dots in the row with ellipsis -> …
      const ellipsisFixed = this.getText().replace(/\.{2,}/g, '…');
  
      // https://regex101.com/r/l46a9g/4
      const sentences = ellipsisFixed.match(/(?<=\S{6,}|\W+)\.\s|[!?;…]+(?=\s|$)/g);
  
      return sentences ? sentences.length : 1;
    }
  
    /**
     * Returns array of lowercase words
     * Attention! This function uses ES2018 RegExp feature - \p{L}
     *    Starting with ECMAScript 2018, JavaScript finally supports Unicode property escapes natively.
     * @return {RegExpMatchArray | array}
     */
    getWords() {
      const lowerCaseStr = this.getText().toLowerCase();
  
      if (this.GLWordCouner) {
        /*
        * GlobalLogic Word counter
        * Importantly: Separators of words consider all punctuation with a space.
        * Example: ", " ", ". "," " - "
          o “multi-line” - one word
          o “multi - line” - two words
          o “text,sometext” - one word
        o “text - sometext” - two words
        */
        // https://regex101.com/r/ubhH3p/2
        const words = lowerCaseStr
            .replace(/\s?[^\wа-яіїґє]\s+/gi, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
            .split(' ');
  
        return words ? words : [];
      }
  
      // real world word counter - match any unicode letter, hyphen or apostrophe
      // https://regex101.com/r/Mn2flg/1
      const unicodeMatch = lowerCaseStr.match(/[\p{L}\-‐’'`]+/gu);
  
      if (unicodeMatch && unicodeMatch.length) {
        // looks like \p{L} is supported, since we got what we need
        return unicodeMatch;
      } else {
        // \p{L} is not supported, let's try to fallback - probably better to use XRegExp library instead
  
        // cut off the most common punctuation symbols
        const punctuationTrimmed = lowerCaseStr
          .replace(/[.,!?:;…'"@#$%^&*()\[\]{}\-–—]/g, '');
  
        return punctuationTrimmed.replace(/\s{2,}/g, ' ').trim().split(' ');
      }
    }
  
    /**
     * Returns object with words length statistic: min/max/average word length
     * @return {{min: number, max: number, average: number}}
     */
    getWordsLengthStatistic() {
      if (this.getWords().length === 0) {
        return {min: 0, max: 0, average: 0}
      }
  
      const wordsLength = this.getWords().map(word => word.length);
  
      const min = Math.min(...wordsLength);
      const max = Math.max(...wordsLength);
  
      const average = Math.round(
          wordsLength.reduce((buffer, current) =>
              buffer + current, 0) / wordsLength.length
      );
  
      return {min, max, average};
    }
  
    /**
     * Returns array of unique words (lowercase)
     * @return {string[]}
     */
    getUniqueWords() {
      return [...new Set(this.getWords())];
    };
  
    /**
     * Returns array of words and their occurrence count
     * @return {{}[]}
     */
    getWordOccurrence() {
      const uniqueWords = this.getUniqueWords();
  
      return uniqueWords.map(word =>
          ({[word]: this.getText().match(new RegExp(word, 'gi')).length}));
    }
  
    /**
     * Returns number of characters that can be added before maxLength will be exceeded
     * @return {number}
     */
    getCharsLeft() {
      return this.maxLength - this.getText().length;
    }
  
    /**
     * Returns a percentage of characters that can be added before maxLength will be exceeded
     * @return {number}
     */
    getCharsLeftPercentage() {
      return Math.round((this.getCharsLeft() / this.maxLength) * 100);
    }
  
    /**
     * Returns an object with text statistic
     * @return {Object}
     */
    getTextStatistic() {
      const stat = {};
  
      const wordsCount = this.getText().length > 0 ? this.getWords().length : 0;
      const uniqueWordsCount = this.getText().length > 0 ? this.getUniqueWords().length : 0;
  
      stat.characters = this.getText().length;
      stat.spaces = this.getSpaceCount();
      stat.charactersWithoutSpaces = stat.characters - stat.spaces;
  
      stat.sentences = this.getSentencesCount();
      stat.paragraphs = this.getParagraphsCount();
  
      stat.wordsCount = wordsCount;
      stat.uniqueWordsCount = uniqueWordsCount;
      stat.wordsLengthStatistic = this.getWordsLengthStatistic();
      stat.wordsOccurrence = this.getWordOccurrence();
  
      stat.charsLeft = this.getCharsLeft();
      stat.charsLeftPercentage = this.getCharsLeftPercentage() + '%';
  
      return stat;
    }
  
    /**
     * Updates info table with the current text statistics
     */
    updateInfoTable() {
      const info = this.getTextStatistic();
  
      this.infoTable.innerHTML = `<tr>
      <td>Characters</td>
      <td>${info.characters}</td>
  </tr>
  <tr>
      <td>Characters w/o spaces</td>
      <td>${info.charactersWithoutSpaces}</td>
  </tr>
  <tr>
      <td>Spaces</td>
      <td>${info.spaces}</td>
  </tr>
  <tr>
      <td>Words</td>
      <td>${info.wordsCount}</td>
  </tr>
  <tr>
      <td>Unique words</td>
      <td>${info.uniqueWordsCount}</td>
  </tr>
  <tr>
      <td>Shortest word length</td>
      <td>${info.wordsLengthStatistic.min}</td>
  </tr>
  <tr>
      <td>Longest word length</td>
      <td>${info.wordsLengthStatistic.max}</td>
  </tr>
  <tr>
      <td>Average word length</td>
      <td>${info.wordsLengthStatistic.average}</td>
  </tr>
  <tr>
      <td>Sentences</td>
      <td>${info.sentences}</td>
  </tr>
  <tr>
      <td>Paragraphs</td>
      <td>${info.paragraphs}</td>
  </tr>`;
    }
  }
  
  const textInput = document.getElementById('text-counter');
  const textCounter = new TextStats(textInput);