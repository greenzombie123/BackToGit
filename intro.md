## There are a number of objects

1 object is chosen to be the answer of the question. 2 other object are chosen afterward as wrong answers.
Pictures of the items appear on the screen and the word of the answer appears on the screen.
The word of the answer is pronounced.
If the user click on the right picture, a check mark appears on the picture. For all the other pictures, an x appears if they are pressed.
The scene is cleared and a new object is chosen as the answer. 

List of answer objects

1. Randomly choose an `vocab` object.
2. Assign it to a `answer` variable
3. Choose two other random `vocab` objects
4. Assign push them into `wrongAnswers` array variable
5. Get reference of 3 divs (`pictureDiv1` and etc)  and 1 word div (`wordDiv`).
6. Push `answer` and `wrongAnswers` into a `possibleAnswers` array.
7. Randomly take out one item from `possibleAnswers` 
8. Assign the value of the `picture` prop to the div's img attribute.
9. Attach an event handler that calls an arrow function that calls `chooseAnswer(word)` with the `word` prop passed as an argument.
10. Do the same for the other items in the `possibleAnswers` array.
11. Create audio element using `answer`'s `sound` prop. 
12. Wait for 1 second.
13. Play the sound clip.
14. If user click wrong picture, an X appears on it. (add classname to `pictureDuv`)
15. If user clicks on right picture, a check appears.
16. Wait for a second
17. A new batch of answers appear.

```javascript

const vocab = {
    word,
    picture,
    sound,
    isDone,
}

```
