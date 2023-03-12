import React, { useEffect, useState } from "react";
import css from "./assets/css-properties.json";

//icons
import minusIcon from "./assets/icons8-minus-windows-11-color/icons8-minus-96.png";
import htmlIcon from "./assets/icons8-html-5-windows-11-color/icons8-html-5-96.png";
import backIcon from "./assets/icons8-back-arrow-64.png";
import doneIcon from "./assets/icons8-ok-color/icons8-ok-96.png";
import updateIcon from "./assets/icons8-update-windows-11-outline/icons8-update-96.png"
import editIcon from "./assets/icons8-modify-others/icons8-modify-96.png"

let allAppliedClasses = []; //this array holds all the classes added in every element,this is required at the time of deleeting calss,,to make sure that class should be removed from style only if that class is not used anywhere in any element

//NOMENCLATURE
//pebble: is reffered to the blocks which contains classname in UI
//element: it's the current element to which css and class is being applied
//currentClass: it's the selected class to which the css will be applied

function InputCSS(props) {
  const { element, inputHtml, tooltiptext, structPebble } = props;
  const [currentClass, setCurrentClass] = useState();
  const [currentClassPebbleId, setCurrentClassPebbleId] = useState();
  const [appliedCssList, setAppliedCssList] = useState();

  const [handleMultipleSlctdClass, setHandleMultipleSlctdClass] = useState();
  const [currentXyz, setCurrentXyz] = useState(0);
  const [spanToBeDeleted, setSpanToBeDeleted] = useState();
  const [reRenderCssPebbles, setReRenderCssPebbles] = useState(); //just for the sake of calling useffct
  const [updateClassPebbles, setUpdateClassPebbles] = useState(1); //check if this is working bcz i noticed that one every render it will be 1 agagin so there mayebe a chance when the value wont look as they a=have chnaged

  //passing deleteclass function through this useeffect as the deletclass function does not have the current element and in here in useffect when the page re renders it has the current elm and it's send to the followup function
  useEffect(() => {
    console.log("delete class passed through UE ran-");
    // console.log('span tp be dleted in ue',spanToBeDeleted)

    if (element && spanToBeDeleted !== "")
      deleteClassAndPebble(element, spanToBeDeleted);
  }, [currentXyz]);

  //only show the class pebbles of the selected element
  useEffect(() => {
    console.log("show relevant clas pebble only UE---");
    //if the classList has pebbles and there is a selcted element
    if (document.getElementById("classList") && element) {
      let classList = document.getElementById("classList");
      if (tooltiptext) {
        tooltiptext.innerText = "";
        let realArr = Array.from(element.classList);
        tooltiptext.innerText = realArr?.join(",");
      }
      classList.childNodes.forEach((each) => {
        //curently data atttribute is used to match the class but later it maybe  have to be chnaged
        //data attribute in pebbles have classname (this was needed to identify pebble)
        if (element.classList.contains(each.getAttribute(["data-pebblecss"]))) {
          each.classList.remove("hide");
        } else {
          each.classList.add("hide");
        }
      });
    }
  }, [element, updateClassPebbles]); //this is getting referesed on two action,,first when different element is selected (so that itb would show those element's classes only).. second when a class is added which is already in some other element and for which there is already a pebble and bcz of taht we won't create a dublicate pebble,,so we update this to show that pebble

  //for setting selected class pebbles [here we have two useeffftct fr this purpose bcz we wanted to identify which dependecy were firing it and function accordingly]
  useEffect(() => {
    console.log("setting slecyed class UE;eleemnt changed---");

    if (document.getElementById("classList") && structPebble) {
      // if (document.getElementById("classList") && element && structPebble) {
      //these two will set the state to current class and pebble id..so whenevr an elemnet is changed it will update the state

      // setCurrentClass(element.dataset.currentclass);expFix
      // setCurrentClassPebbleId(element.dataset.currentpebble);expFix
      setCurrentClass(structPebble.dataset.currentclass); //used struct to store data attributes instead of element
      setCurrentClassPebbleId(structPebble.dataset.currentpebble); //used struct to store data attributes instead of element

      settingSelectedClass();
    }
  }, [element, handleMultipleSlctdClass, structPebble]);

  //this is also for setting slectedclass poebble but this will run when a cuurent class is change
  useEffect(() => {
    console.log(
      "setting slecyed class UE;currentclass changed---",
      currentClass
    );
    if (document.getElementById("classList") && structPebble) {
      //if (document.getElementById("classList") && element && structPebble) {
      structPebble.dataset.currentpebble = currentClassPebbleId; //used struct to store data attributes instead of element
      structPebble.dataset.currentclass = currentClass; //used struct to store data attributes instead of element
      settingSelectedClass();
    }
  }, [currentClass]);

  function settingSelectedClass() {
    console.log("ssc");
    let classList = document.getElementById("classList");

    classList.childNodes.forEach((each) => {
      if (!each.classList.contains("hide")) {
        if (structPebble.dataset.currentpebble === each.id) {
          each.classList.add("selected");
        } else {
          each.classList.remove("selected");
        }
      }
    });
    createAppliedCssPebbles(appliedCssList);
  }

  //for setting applied csss list
  useEffect(() => {
    console.log("applied css pebble UE---");
    createAppliedCssPebbles(appliedCssList);
  }, [appliedCssList, element, updateClassPebbles, reRenderCssPebbles]); //reason why there are 3 dependency--element:when didfernt element is opeend it won't show it's css,,,appliedCssList:whenever a new css is added it will update the immediatly;;;updateclasspebbles:whenever a class is added which already has css applied then it will retrieve all the css and show it

  //this function created the applied list pebbles //basically loops over the json and beautify it
  function createAppliedCssPebbles(appliedCssList) {
    console.log("creaste applied css pbble func-------", element);

    if (appliedCssList) {
      //this will hold the selected class for cuurent elemet
      let selectedClass = structPebble.dataset.currentclass; //currentClass is replaced by selectedClass
      //console.log('sc in cacp---',selectedClass)
      //console.log(currentClassPebbleId,previousClassPebbleId);

      let appliedCssListElem = document.getElementById("appliedCssList");
      appliedCssListElem.innerHTML = "";

      if (element.classList.contains(selectedClass)) {
        console.log("contains");

        if (appliedCssList[selectedClass]) {
          Object.keys(appliedCssList[selectedClass]).forEach((x) => {
            let sec = document.createElement("section");
            sec.classList.add("appliedCssListPebbles");

            //sec.id = "_system" + i + className.value; // fix this,,id should be unique//this wont work

            let span = document.createElement("span");
            let spanForProperty = document.createElement("span");
            spanForProperty.innerText = x + " : ";
            let spanForPropVal = document.createElement("span");
            spanForPropVal.innerText = appliedCssList[selectedClass][x];

            // span.innerText = x + " : " + appliedCssList[selectedClass][x];
            span.appendChild(spanForProperty);
            span.appendChild(spanForPropVal);
            span.style.margin = "0 6px 0 0";
            span.style.cursor = "pointer";

            let propertyDeleteBtn = document.createElement("img");
            propertyDeleteBtn.src = minusIcon;
            propertyDeleteBtn.classList.add('basicIcon')

            let editPropertyBtn = document.createElement("img");
            editPropertyBtn.src = editIcon;
            editPropertyBtn.classList.add('basicIcon')

            let tempDiv=document.createElement('div')
            tempDiv.style.display='flex'
            tempDiv.appendChild(editPropertyBtn)
            tempDiv.appendChild(propertyDeleteBtn)

            sec.appendChild(span);
            sec.appendChild(tempDiv);
            appliedCssListElem.appendChild(sec);

            editPropertyBtn.addEventListener("click", function () {
              editCssProperty(span, x);
            });

            span.addEventListener("click", function () {
              editCssProperty(span, x);
            });

            propertyDeleteBtn.addEventListener("click", function () {
              deleteSelctedProperty(x);
            });
          });
        }
      }
    }
  }

  function editCssProperty(span, property) {
    //to edit applied css property
    console.log("editCssProperty----------------", span, property);

    if (
      document.getElementById("editPropertyUserInput") &&
      document.getElementById("editPropertyUserInput").dataset.temp !== property
    ) {
      document.getElementById("editPropertyUserInput").remove();

      let t = new Date().getTime();
      setReRenderCssPebbles(t);
    }

    if (css[property].isUserInput) {
      if (!document.getElementById("editPropertyUserInput")) {
        //###IMPORTANT:::[working automatically]DELETE THIS INPUT WHEN THE PROPERTY IS UPDATED

        let userInputHolder = document.createElement("div");
        userInputHolder.style.display = "flex";
        userInputHolder.id = "editPropertyUserInput";
        userInputHolder.dataset.temp = property;

        let userInput = document.createElement("input");
        userInput.type = "text";

        let doneBtn = document.createElement("img");
        doneBtn.src = doneIcon;
        doneBtn.classList.add("doneIcon");

        userInputHolder.appendChild(userInput);
        userInputHolder.appendChild(doneBtn);

        let parentnode = span.parentNode;
        let countP = 0;
        parentnode.childNodes.forEach((x) => {
          if (countP === span.childNodes.length - 1) {
            console.log(x, x.id);
            x.parentNode.insertBefore(userInputHolder, x); //adding the input
          }
          countP += 1;
        });

        let count = 0;
        span.childNodes.forEach((x) => {
          if (count === span.childNodes.length - 1) {
            // console.log(x);
            userInput.value = x.innerText; //putting the existing val in input
            x.remove(); //removing the exisiting value
          }
          count += 1;
        });

        doneBtn.addEventListener("click", function () {
          updateCssProperty(property, userInput);
        });
      }
    } else {
      //for select options
      if (!document.getElementById("editPropertyUserOption")) {

        let userInputHolder = document.createElement("div");
        userInputHolder.style.display = "flex";
        userInputHolder.id = "editPropertyUserOption";
        userInputHolder.dataset.temp = property;

        let select = document.createElement("select");

        css[property].values?.map((key) => {
          let option = document.createElement("option");
          option.value = key;
          option.innerText = key;
          select.appendChild(option);
        });

        let doneBtn = document.createElement("img");
        doneBtn.src = doneIcon;
        doneBtn.classList.add("doneIcon");

        userInputHolder.appendChild(select);
        userInputHolder.appendChild(doneBtn);

        let parentnode = span.parentNode;
        let countP = 0;
        parentnode.childNodes.forEach((x) => {
          if (countP === span.childNodes.length - 1) {
            // console.log(x, x.id);
            x.parentNode.insertBefore(userInputHolder, x); //adding the input
          }
          countP += 1;
        });

        let count = 0;
        span.childNodes.forEach((x) => {
          if (count === span.childNodes.length - 1) {
            // console.log(x);
            select.value = x.innerText; //putting the existing val in input
            x.remove(); //removing the exisiting value
          }
          count += 1;
        });

        doneBtn.addEventListener("click", function () {
          updateCssProperty(property, select);
        });

      }
    }
  }

  function updateCssProperty(property, userInput) {
    console.log(
      " updateCssProperty clieked-----------",
      property,
      userInput.value
    );

    let existingCssJson;
    let cssJsonElem = document.getElementById("cssJsonElem");
    existingCssJson = JSON.parse(cssJsonElem.innerText);
    console.log("current class--", currentClass);

    if (existingCssJson[currentClass][property]) {
      //console.log('in if-')
      existingCssJson[currentClass][property] = userInput.value;
    }
    setAppliedCssList(existingCssJson); //updating the css json
    cssJsonElem.innerText = JSON.stringify(existingCssJson); //this will update the json in elem from where we are creating style css

    //this will update the css in style tag
    if (
      document.querySelectorAll("[data-css]")[0].getAttribute("data-css") ===
      "dynamicCss"
    ) {
      let styleStr = "";
      styleStr = convertCssJosnToStyles(existingCssJson);
      console.log("retSTR in update css property", styleStr);
      let style = document.querySelectorAll("[data-css]")[0];
      style.innerText = styleStr;
    }
  }

  function deleteSelctedProperty(property) {
    console.log("delete slected property function-------", property);

    let existingCssJson;
    let cssJsonElem = document.getElementById("cssJsonElem");
    existingCssJson = JSON.parse(cssJsonElem.innerText);
    //console.log('existing css json in del--',existingCssJson);

    //checking if the class already exists, if not then add the class
    if (existingCssJson[currentClass][property]) {
      //console.log('in if-')
      delete existingCssJson[currentClass][property];
    }
    setAppliedCssList(existingCssJson); //updating the css json,,this will delte the proeprty pebble
    cssJsonElem.innerText = JSON.stringify(existingCssJson); //this will update the json in elem from where we are creating style css

    //this will update the css in style tag
    if (
      document.querySelectorAll("[data-css]")[0].getAttribute("data-css") ===
      "dynamicCss"
    ) {
      let styleStr = "";
      styleStr = convertCssJosnToStyles(existingCssJson);
      console.log("retSTR in del property", styleStr);
      let style = document.querySelectorAll("[data-css]")[0];
      style.innerText = styleStr;
    }
  }

  function hideInputCssComp(e) {
    // inputHtml.style.display = "flex";
    // document.getElementById("inputCss").style.display = "none";

    inputHtml.classList.add("enter");
    document.getElementById("inputCss").classList.remove("enter");
  }

  function addProperty(e) {
    console.log("addproperty rann------");

    let property = document.getElementById("property");
    let propertyValue = document.getElementById("propertyValue");

    if (css[property.value].isUserInput) {
      if (document.getElementById("propertyUserInput")) {
        propertyValue = document.getElementById("propertyUserInput");
      }
    }
    //console.log("---------",property.value,propertyValue.value);

    let cssJsonElem = document.getElementById("cssJsonElem"); //putting the json into tbis elem
    console.log(cssJsonElem.innerText);

    let existingCssJson;
    let tempJson = Object();

    //this will hold the selected class for cuurent elemet
    let selectedClass = structPebble.dataset.currentclass; //currentClass is replaced by selectedClass
    console.log("sc in addproperty---", selectedClass);
    //only if a class is selected only then the property will be added
    if (
      structPebble.dataset.currentclass &&
      structPebble.dataset.currentclass !== "undefined"
    ) {
      //so only if there is a value of the property only then it will be applied
      if (propertyValue.value) {
        if (cssJsonElem.innerText) {
          existingCssJson = JSON.parse(cssJsonElem.innerText);
          console.log(existingCssJson);

          //checking if the class already exists, if not then add the class
          if (!existingCssJson[selectedClass]) {
            existingCssJson[selectedClass] = Object();
            existingCssJson[selectedClass][property.value] =
              propertyValue.value;
          } else {
            existingCssJson[selectedClass][property.value] =
              propertyValue.value;
          }
          setAppliedCssList(existingCssJson);
          cssJsonElem.innerText = JSON.stringify(existingCssJson);
        } else {
          //this will run initially only
          //creating object of object and putting it in the element
          tempJson[selectedClass] = Object();
          tempJson[selectedClass][property.value] = propertyValue.value;
          console.log(JSON.stringify(tempJson));
          setAppliedCssList(tempJson);
          cssJsonElem.innerText = JSON.stringify(tempJson);
        }
      } else {
        alert("cannot apply property with empty value");
      }
    } else {
      alert("a class must be selcted to add property");
    }
    //style tag creation
    let styleTag = document.createElement("style");
    //trying to add style tag with css to the head only if it does not exist already
    if (document.querySelectorAll("[data-css]").length === 0) {
      styleTag.setAttribute("data-css", "dynamicCss");
      document.getElementsByTagName("head")[0].appendChild(styleTag);
    }

    if (
      document.querySelectorAll("[data-css]").length === 1 &&
      document.querySelectorAll("[data-css]")[0].getAttribute("data-css") ===
        "dynamicCss"
    ) {
      console.log("new if");

      let styleStr = "";
      if (existingCssJson) {
        styleStr = convertCssJosnToStyles(existingCssJson);
      } else if (tempJson) {
        styleStr = convertCssJosnToStyles(tempJson);
      }

      console.log("retSTR in add property", styleStr);

      let style = document.querySelectorAll("[data-css]")[0];
      style.innerText = styleStr;
    }

    //clearing propertyUserInputValue
    propertyValue.value = "";

    //about none,ineherit,, either let user do that,,they can type it,,i think thats best option,,dont make more complex,,,loop over the values and still show other options user can have

    //maybe we can create a array of such properties which have same units ,,such as height font weight,, and then check if the current property is in this array or not , if yes then hardcode the unit for these properties,,we may have several if else for such conditions//{for length type and other units,,make another dropdown later from which user can select unit}
  }

  function handlePropertyChange(e) {
    let propertyValue = document.getElementById("propertyValue");
    let propertyHolder = document.getElementById("propertyHolder");

    let propertyUserInput;
    if (document.getElementById("propertyUserInput")) {
      propertyUserInput = document.getElementById("propertyUserInput");
    }

    console.log(css[e.target.value].isUserInput);

    if (css[e.target.value].isUserInput) {
      //this will prevent from creating the same user input element multiple times
      if (propertyUserInput) {
        propertyUserInput.value = "";
        propertyValue.style.display = "none";
        propertyUserInput.style.display = "block";
      } else {
        let userInput = document.createElement("input");
        userInput.type = "text";
        userInput.id = "propertyUserInput";

        propertyValue.style.display = "none";
        propertyHolder.appendChild(userInput);
      }
    } else {
      //first emptying the previous added options so that they don't get appended
      propertyValue.innerHTML = "";
      css[e.target.value].values?.map((key) => {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        //hiding userinput and showing dropdown after appending options
        propertyUserInput
          ? (propertyUserInput.style.display = "none")
          : console.log("");
        propertyValue.style.display = "block";
        propertyValue.appendChild(option);
      });
    }
  }

  let i = 0;
  function addClassName(e) {
    let className = document.getElementById("className");
    let classList = document.getElementById("classList");

    console.log(className.value);
    let doesClassExistInElem = false;
    // let regEx = /^\S*$/;//just for not letting space
    //let regEx = /\.-?[_a-zA-Z]+[_a-zA-z0-9-]*\s*\{/
    let regEx = /-?[_a-zA-Z]+[_a-zA-z0-9-]*/;

    //claasname cannot start with two hyphens..but this is working, don't know why there is this rule

    if (className.value) {
      if (regEx.test(className.value)) {
        let hasDotAtZero = className.value[0] === ".";
        let hasCurlyAtEnd = className.value[className.value.length - 1] === "{";
        if (!hasCurlyAtEnd) {
          if (!hasDotAtZero) {
            if (!className.value.includes(" ")) {
              let char = [
                "~",
                "!",
                "@",
                "$",
                "%",
                "^",
                "&",
                "*",
                "(",
                ")",
                "+",
                "=",
                ",",
                ".",
                "/",
                "'",
                ";",
                ":",
                '"',
                "?",
                ">",
                "<",
                "[",
                "]",
                "\\",
                "{",
                "}",
                "|",
                "`",
                "#",
              ];
              let res = char.find((x) => className.value.includes(x)); //you could use some function also here , it returns true if there is aleast one similar element
              if (!res) {
                console.log(element.classList);
                //dont let classname be added if element already has that class
                if (element.classList.contains(className.value)) {
                  console.log("class exists already---------");
                  doesClassExistInElem = true;
                  alert("class already exists");
                } else {
                  element.classList.add(className.value);
                  allAppliedClasses.push(className.value); //putting all the classes in the array
                  //updating the pebbles list as the new pebble wont be created and the already exisiting pewbble showuld be shown in this elem
                  let v = updateClassPebbles + 1;
                  setUpdateClassPebbles(v);
                  setHandleMultipleSlctdClass(v); //this will render the useefcted where the setslectedclass function is called, which will resolve the propblem where if a class is added to an element which was a selcted class in the elem then in this eleme it will be selcted too, but with this logic we render the useeffct and update it
                }

                let doesClassExistInPebbles = false;
                //for the first time let class be added
                if (classList.childNodes.length === 0) {
                  createClassPebbles(className, classList);
                } else {
                  //checking if there is already a pebble for the class
                  classList.childNodes.forEach((x) => {
                    if (x.id.includes("#$" + className.value + "$#")) {
                      doesClassExistInPebbles = true;
                    }
                  });

                  if (!doesClassExistInElem && !doesClassExistInPebbles) {
                    createClassPebbles(className, classList);
                  }
                }
              } else {
                alert(
                  `"${res}" special characters are not allowed in a class name`
                );
              }
            } else {
              alert("whitespaces are not allowed in a class name");
            }
          } else {
            alert('class names cannot start with "." ');
          }
        } else {
          alert('class names cannot end with "{" ');
        }
      } else {
        alert("invalid classname");
      }

      //clearing input
      className.value = "";
    } else {
      alert("classname cannot be empty");
    }
  }

  function createClassPebbles(className, classList) {
    let sec = document.createElement("section");
    sec.classList.add("pebbles");
    sec.id = "_system" + i + "#$" + className.value + "$#"; // fix this,,id should be unique//this wont work
    sec.setAttribute("data-pebblecss", className.value);

    let span = document.createElement("span");
    span.innerText = className.value;
    span.style.margin = "0 6px 0 0";
    span.style.cursor = "pointer";

    let classDeleteBtn = document.createElement("img");
    classDeleteBtn.src = minusIcon;
    classDeleteBtn.classList.add('basicIcon')

    sec.appendChild(span);
    sec.appendChild(classDeleteBtn);
    classList.appendChild(sec);

    span.addEventListener("click", function () {
      selctedClass(span, sec);
    });

    classDeleteBtn.addEventListener("click", function () {
      deleteSelctedClass(span);
    });
    i++;
  }

  function selctedClass(span, sec) {
    console.log("selected class rtan-----", span);

    setCurrentClass(span.innerText);
    setCurrentClassPebbleId(sec.id);
  }

  function deleteClassAndPebble(element, span) {
    //wrap the whole function if the element and span are true
    let className = span.innerText;
    element.classList.remove(className);

    let v = updateClassPebbles + 1;
    setUpdateClassPebbles(v);

    allAppliedClasses.splice(allAppliedClasses.indexOf(className), 1); //removing the class from arr
    console.log(allAppliedClasses);

    let cssJsonElem = document.getElementById("cssJsonElem");
    console.log(cssJsonElem.innerText);

    //only delete the pebble and remove css from style if there is no same class applied to other element
    if (!allAppliedClasses.includes(className)) {
      let existingCssJson;
      if (cssJsonElem.innerText) {
        existingCssJson = JSON.parse(cssJsonElem.innerText);
        console.log("check if this is needed 1", existingCssJson);

        //checking if the class exists and then deleting it
        if (existingCssJson[className]) {
          delete existingCssJson[className];
          console.log("after deleeting property", existingCssJson);
          //existingCssJson[className][property.value] = propertyValue.value;
        }
        setAppliedCssList(existingCssJson);
        cssJsonElem.innerText = JSON.stringify(existingCssJson);
      }

      //putting the updates css json in the style tag after formatting it into .css format
      if (
        document.querySelectorAll("[data-css]").length === 1 &&
        document.querySelectorAll("[data-css]")[0].getAttribute("data-css") ===
          "dynamicCss"
      ) {
        let styleStr = "";
        if (existingCssJson) {
          styleStr = convertCssJosnToStyles(existingCssJson);
        }

        console.log("retSTR in delete", styleStr);

        let style = document.querySelectorAll("[data-css]")[0];
        style.innerText = styleStr;
      }

      //clearing span from state too
      setSpanToBeDeleted("");

      //finally deleting the classname pebble
      span.parentNode.remove();
    }
  }

  function convertCssJosnToStyles(cssJson) {
    let retStr = "";
    Object.keys(cssJson).forEach((clsnm) => {
      console.log(clsnm);

      let tempStr = "";
      retStr += `.${clsnm}{`;
      Object.keys(cssJson[clsnm]).forEach((keyVal) => {
        console.log("keyVal", keyVal);
        console.log(cssJson[clsnm][keyVal]);
        tempStr += `${keyVal}:${cssJson[clsnm][keyVal]};`;
      });

      retStr += `${tempStr}}`;
    });
    return retStr;
  }

  function deleteSelctedClass(span) {
    console.log("deleteselectedclas rtan-----");
    //console.log("allAppliedClasses :", allAppliedClasses);

    let xyz;
    xyz = Math.random();
    setCurrentXyz(xyz);
    setSpanToBeDeleted(span);
  }

  return (
    <div className="input-outermost" id="inputCss">
      <img
        src={backIcon}
        onClick={(e) => hideInputCssComp(e)}
        className="backIcon"
        alt="..."
      />

      <div className="groupInput">
        <label for="className">Add class</label>
        <div className="classNameContainer">
          <input type="text" placeholder="class" id="className" />
          <button onClick={(e) => addClassName(e)}>add class</button>
        </div>
      </div>

      <div id="classList"></div>

      {/* {currentClass? */}
      <div className="groupInput">
        <div id="propertyHolder" className="flex flex-direction">
          <select
            id="property"
            onChange={(e) => handlePropertyChange(e)}
          >
            {
              //at evry render clearing the select's options or else they will keep appending
              document.getElementById("property")
                ? (document.getElementById("property").innerHTML = "")
                : console.log("")
              //maybe we can move this to an useeefct as it would render everytime
            }
            {Object.keys(css).forEach(function (key) {
              let ele = document.createElement("option");
              ele.value = key;
              ele.innerText = key;
              if (document.getElementById("property")) {
                document.getElementById("property").appendChild(ele);
              }
            })}
          </select>
          <select id="propertyValue"></select>
        </div>
        <button onClick={(e) => addProperty(e)}>add property</button>
      </div>
      {/* :console.log("")} */}

      <div id="appliedCssList"></div>
      <div id="cssJsonElem"></div>
    </div>
  );
}

export default InputCSS;
