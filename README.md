# Wondermaze
The little flame is looking for gold but has to find her way out of a maze full of questions.



![Wondermaze](https://github.com/niconek/Wondermaze/blob/master/pics/gamescreen.png)
















notes

```html
<form class ="form">
  <div>
    <label for="answer"> </label>
    <input type="text" id="answer" name="name" required>
    <span class="validity"></span>
  </div>
  <div>
    <button>Submit</button>
  </div>
</form>
```

`var theText = myTextInput.value;`

```html
<form id= "question1">
  <label for="quest1">"What kind of room has no doors or windows?"</label>
  <input id="answr1" name="answr1" required pattern="mushroom">
  <button>Submit</button>
</form>
```
```css
input:invalid {
  border: 2px dashed red;
}

input:valid {
  border: 2px solid black;
}
```

```javascript
function validateForm() {
    var check = document.forms["question1]["fname"].value;
    if (check == "") {
        alert("Try again");
        return false;
    }
}
```