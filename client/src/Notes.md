# sturcture
- very import part of the application,
- this is like a wireframe which have hierarchy of elememnts user hAS ADDED.
and with each elem there will be an option to update modify that element such as (things i have thought of yet)
=add child
=add css
=add classname
=delete self (remember to remove every connections too, maybe maybe not a problem, a wild guess)
=on hover of sturcture element the real element should be distinguished


========== possible Isssues =============
- (least prority)at last u need to format all this.. add all the document.getelement at top by assigning it to a varible,,for simplicity



### would be better to have these features too
- along with applied css delete feature..there can be an edit css option whihc will only update the property value ,,,on click convert it to an input which will get the value from json i guess and put it default,,,and user and can input,,and maybe add an OK button or on enter save it back to json,,,,think on it bcz it will be too much and make things complex
- on hover of sturcture element the real element should be distinguished
- there sould be a quick view option for all of the applied css and class, so that user can get an idea what css is applied to wht clases
- have to fix it when tooltip still shows when ther is no class added
- DEFCT---seems to be fixed::::property is be9iong added in the html elem where all is stored
- an option where user can opt in that he wants to add proeprty value by himself and not want any suggestions...this should be for every ptropery and also there should be a blank prop value field so that user can do it himself
   

# to d0-
- have to add all the elemets option
- have to add options for elements like input anchor etc
-fix the hamburger 


- have to check responsiveness
- add hover effects ,,like on elemeng structure ..on hover make them move slightly to right,,or on the buttons add border or zzoom in effect something
- very importnat thing,,,do not apply css to direct tags..it will effct the user's tag also,,only use classes with fucked up anme to make that style unique
- do thing on enter press
- the part where units of property suggests
- even though teh property value is in user input,,,still show of the common alternate values like inheirt,none,auto
- the ham should transit to an arrow  on its way when it reaches the right side 
- also later let user add all the global attrubutes to the element (except leaving some)


# done stuff
- DONE::put all the validation to add classname..what if user eneters a classname staring with dot
- have to fix that there are data attributes when html is exported
- add cursors where they are needed
- enable editing content of element
- modify alert,,dont use system one;;update--goint with the system alerts,,no need for custom one
- fix UI, add icons 
- add export feature



## what it can do------------
- 







### FOREVER NOTES
- you cannot end foreach loop by break statemenyt, there are other workaround,,first is throw an exceptyion, second,,use return statement

- domtokenlist does not support icludes function,,it bhas its own function you can check it in dev tools

- in order to have a transition effect,,,its noticed that element should have the property which is the chnage that causing trasnitoon,,like if there is no "right" property and you r moving the element to right then it wont show the efefct you neeed to add "right" as 0 ven if you dont want it, bcz then it will have from someting to go to something,,,transit from this to that

- element.childNodes will tell all the whitespaces cpmment,text inside the element,,to know about element nodes only use element.children

-if a css proeprty is applied to an element via class and id then the id one will be priortized even if the class css is written after the css in cssfile

- title attribute is most important and kind of hidden gemmm....not talking about the title tag in the head tag,,,this is an attrubute and if you add this to a atg and put some text in it,,then on hovering over that tag will show that title as a tooltip

- contenteditable attribute which lets the element avlue wahtever to be edited right there