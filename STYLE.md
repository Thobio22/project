# Coding style
### How and when to use comments:
* I use comments to seperate my blocks of code, and explain what that block is supposed to do. This usually means 2 or more rows of code, but single rows do exist as well, for when there are no other relevant rows relevant to that explanation.

### Tabs or space indentations
* All code in indented by the automatic indentation of Atom (script editor, standard 2 spaces). This usually meanns a tab. In the case that the automatic alignment of Atom places the indentation away from my intended place, I will correct that indentation with spaces and/or tabs. In javascript, I chose to indent the .append() and .merge() portions of the code, to make chaining more surveyable.

### Apropiate use of white space
* If single rows of code part of the same block, or similar in function, I have placed no white space in between to indicate that it is part of the same block and comment. After a block, I place 2 white spaces to show it is seperate of the previous block. In javascript, I generally place 2 white spaces after every row of code ending with a semicolon to indicate seperateness. These uses of white space make my code more clarifying, and surveyable.

### Proper naming of variables and functions
* I strive to name the variables and functions based on their usage (drawMap draws the map, updatePie updates the piechart, etc.). In python, functions and variables are make with underscore to seperate words (e.g. apple_df, convert_2_json(), etc.), while in javascript, I use camelcase (e.g. drawMap, updatePie, etc.). I did this because of numerous examples having python with underscores, and javascript with camelcase. This also helps with seperating the code languages for myself and other readers.

### Code grouping and organisation
* As said before, blocks of code are grouped with a comment, and seperated from other blocks with 2 white spaces. Most functions are set apart from the window.onload were possible for surveyability, and called upon when needed.
