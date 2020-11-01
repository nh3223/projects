# A Dozen Roses

## General Description and Inspiration

A Dozen Roses is a fairly basic math facts educational web application.  The inspiration for this project was to help my daughter (middle name Rose) with her instant recall of basic addition, subtraction, multiplication and division facts.

## Structure

There are a dozen levels.  The first would just have basic addition facts with digits from 1 to 4.  The second would add the corresponding subtraction problems.  Levels 3 through 6 continue adding addition and subtraction facts with numbers from 1 through 12.  Levels 7 through 12 follow a similar trajectory for multiplication and division.  In all levels after level 1, the problems from prior levels will be included as well.

At the beginning of a level, all new problems will have a target time of 5 seconds to answer.  In order to progress to the next level, all problems (including problems from earlier levels) need to have an average answer time of less than 2 seconds.  Each round will have 12 questions picked randomly, using a weighted selection based on the average answer time for the problem, such that problems that are more difficult will appear more frequently.  After the end of each round, the results will be posted and updated.  A rose will be won upon completion of each level so that upon completion of the game, the use will have won a dozen roses.

## Features

The primary special feature of this game will be that answers will be given verbally and recorded using speech recognition.  This will allow the focus to remain on answering the problems instead of the combined issue of answering and using a keyboard (or tapping the screen on a mobile device).  The initial plan is to utilize an existing speech recognition package, as opposed to reinventing the wheel.  I have not seen this feature in other math programs, but I also haven't done an exhaustive search of similar programs.

There is a login procedure so different users can save their own unique progress.  The login process is largely taken from the process used in the various projects from the Harvard CS50 Web Programming with Python and Javascript MOOC.

There will be a progress bar to measure the progress made in each level.  Fifty percent of the progress shown on the progress bar will be based on prior problems with the remaining 50 percent based on the problems new in each level.

## Technology Stack

The back end will be written in python using Django with a MySql database.  The front end will just use basic HTML, CSS and vanilla Javascript.
