- this may need to store data for the reference of all the elelments created so that ther'es no problem like if the person wants to modify element "A" but the changes gets applied to element "B".. so far it's working good without it.

-have to add classname and id feature,, where user eill have an option to addd classname after creating the elememnt, (this option can be in the struture)

# sturcture
- very import part of the application,
- this will be like a wireframe which have hierarchy of elememnts user hAS ADDED.
and with each elem there will be an option to update modify that element such as (things i have thought of yet)
=add child
=add css
=add classname
=delete self (remember to remove every connections too, maybe maybe not a problem, a wild guess)
=on hover of sturcture element the real element should be distinguished


========== possible Isssues =============
- it may not work if child of childs are created.
- (least prority)at last u need to format all this.. add all the document.getelement at top by assigning it to a varible,,for simplicity


to d0-
- functionality child should have as parets, add css,child etc.
- modify alert,,dont use system one
- along with applied css delete feature..there can be an edit css option whihc will only update the property value ,,,on click convert it to an input which will get the value from json i guess and put it default,,,and user and can input,,and maybe add an OK button or on enter save it back to json,,,,think on it bcz it will be too much and make things complex

-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

- when css apply button click,,it apply all the css whicj is in input,,no matter if it already had it,,this will,override the previos css,, find solution.



    //have to check here for the empty array property that if the array is empty then it must be an input and in that case the input value will be retrieved (maybe atlast we have to add an additional flag in data to distinguish these types of properties,,,something like trnasform peorperty,which has values that reuqires input values, this will be an exception)


############ plan in motion ###########
-like cpq there will be a dropdown for property..select the property,,like with height,display etc
and then there will be a value dropdown which will have all the pososible value for that sleected property,

and then on addproperty buttom the sleected peroperty value will be applied and also will be shown below,,to trach which peroperties have been already applied




///css chnages
- add cursors where they are needed





::FOREVER NOTES

- you cannot end foreach loop by break statemenyt, there are other workaround,,first is throw an exceptyion, second,,use return statement

- domtokenlist does not support icludes function,,it bhas its own function you can check it in dev tools