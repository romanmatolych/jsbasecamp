
Live demo: https://codepen.io/olehmelnyk/full/JeZXZJ/
---------

You can also check the previous version - https://gist.github.com/olehmelnyk/27eb353bacd28fe32e32cb2a1d6f0030

It was experimental, so the code is overcomplicated.

I've tried there:

- OOP Inheritance, MVC code splitting

- Today's date updates after midnight (00:00)

- The user can change:

1) locale (ex. Ukraine, English, Russian...) so month name and week name change;

2) week day name length (long, short, narrow - ex. Monday / Mon / M);

3) if Sundays need to be highlighted

4) year - user can set ANY year - in past or future; Javascript works with years in the range -200000 to + 200000; you can try to set the year to -13.8e9 or 5e9 and see what happens in console ;)

- when the user makes changes - they are stored in localStorage, so after page reload calendar will use those settings; the user can reset its settings;