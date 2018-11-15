Live demo - https://codepen.io/olehmelnyk/pen/YRZoEM
-
Features
=
- **Characters limit counter.** If textarea has attribute `maxLength` - 'characters limit' (the difference between maxLength and textarea value length) will be shown. You can change maxLength value by clicking on the 'characters limit' counter at the bottom right corner.
- **Auto update.** Auto update of text info is turned on by default - it shows characters/spaces/words/sentences/paragraphs count on input change. You can uncheck 'Auto update' checkbox - in that case, 'Calculate' button becomes enabled, so you can update text statistic manually.
- **Proper sentence counter.** Most online resources count dots as sentences - this is wrong since there are word shortenings and ellipsis... For example: "Mr. John, Mr. Jake, Dr. Brown, etc. - should still be the same sentence...". - current lib works correctly in that, and many other cases! 
- **Proper word counter.** There's a proper algorithm to count any Unicode letters (works with all non-latin characters, compared to \w that works only with latin characters), apostrophes and hyphens as a single word - all other delimiters will be treated as separate words.
Optionally, there's data attribute for textarea called `data-glwcouner`. Once `data-glwcouner` set to true - "text,sometext" will be treated as single word.
- **Debug mode.** Optionally, there's data attribute for textarea called `data-debug`. Once `data-debug` set to true - textarea will be loaded with some test text, and console.log will show word occurance statisitcs.
