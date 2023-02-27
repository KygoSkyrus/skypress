import React, { useEffect, useState } from "react";
import css from "./assets/css-properties.json";

//icons
import minus from "./assets/icons8-minus-windows-11-color/icons8-minus-96.png";
import htmlIcon from "./assets/icons8-html-5-windows-11-color/icons8-html-5-96.png";

let dummyArr = [];
let allAppliedClasses = []; //this array holds all the classes added in every element,this is required at the time of deleeting calss,,to make sure that class should be removed from style only if that class is not used anywhere in any element

//NOMENCLATURE
//pebble: is reffered to the blocks which contains classname in UI
//element: it's the current element to which css and class is being applied
//currentClass: it's the selected class to which the css will be applied

//todo::;
//put all the validation to add classname..what if user eneters a classname staring with dot
//only show css pebbles that are of relevant class
//delete element feature
//delete css property feature

//deffect::

function InputCSS(props) {
  const { element, inputHtml } = props;

  const [currentClass, setCurrentClass] = useState();
  const [currentClassPebbleId, setCurrentClassPebbleId] = useState();
  const [previousClassPebbleId, setPreviousClassPebbleId] = useState();
  const [appliedCssList, setAppliedCssList] = useState();

  const [updateClassPebbles, setUpdateClassPebbles] = useState(1); //check if this is working bcz i noticed that one every render it will be 1 agagin so there mayebe a chance when the value wont look as they a=have chnaged

  const [currentXyz, setCurrentXyz] = useState(0);
  const [spanToBeDeleted, setSpanToBeDeleted] = useState();

  //passing deleteclass function through this useeffect as the deletclass function does not have the current element and in here in useffect when the page re renders it has the current elm and it's send to the followup function
  useEffect(() => {
    console.log("delete class UE ran-");
    // console.log('span tp be dleted in ue',spanToBeDeleted)

    if (element && spanToBeDeleted !== "")
      deleteClassAndPebble(element, spanToBeDeleted);
  }, [currentXyz]);

  //only show the class pebbles of the selected element
  useEffect(() => {
    //if the classList has pebbles and there is a selcted element
    if (document.getElementById("classList") && element) {
      let classList = document.getElementById("classList");

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

  //for setting selected class pebbles
  useEffect(() => {
    //we have to check if the pebbble element even exisit for both previous and current class
    if (currentClass && document.getElementById(currentClassPebbleId)) {
      console.log(currentClassPebbleId, previousClassPebbleId);
      document.getElementById(currentClassPebbleId).classList.add("selected");
      //only if theere is a previos selected class and if that pebble is still there; this is bcz this will thrwo error if the user has deleted previous selcted class, and then it wont be able to find that pebble
      if (
        previousClassPebbleId &&
        document.getElementById(previousClassPebbleId)
      ) {
        document
          .getElementById(previousClassPebbleId)
          .classList.remove("selected");
      }

      createAppliedCssPebbles(appliedCssList);
    }
  }, [currentClass]);

  //for setting applied csss list
  useEffect(() => {
    createAppliedCssPebbles(appliedCssList);
  }, [appliedCssList, element, updateClassPebbles]); //reason why there are 3 dependency--element:when didfernt element is opeend it won't show it's css,,,appliedCssList:whenever a new css is added it will update the immediatly;;;updateclasspebbles:whenever a class is added which already has css applied then it will retrieve all the css and show it

  //this function created the applied list pebbles //basically loops over the json and beautify it
  function createAppliedCssPebbles(appliedCssList) {
    console.log("applied css list func-------", element);
    if (appliedCssList) {
      console.log("-----------1");
      //console.log(currentClassPebbleId,previousClassPebbleId);

      let appliedCssListElem = document.getElementById("appliedCssList");
      appliedCssListElem.innerHTML = "";

      //260223 N-update
      //ISSUE::::todo-[this can be solved by having a data attribute to the element which will hold the selected class,,if there is no class selected thenit will be emoty,,so whenever an eleemt is loaded teh selected class will be shown slected];;;this is bcz of currentclass,even after you go to another elem there is still a class sekected as current and due to that it will show all the properties of that ckass
      if (element.classList.contains(currentClass)) {
        console.log("contains");

        if (appliedCssList[currentClass]) {
          console.log("-----------2");
          Object.keys(appliedCssList[currentClass]).forEach((x) => {
            console.log("-----------x", x);

            let sec = document.createElement("section");
            sec.classList.add("appliedCssListPebbles");

            //sec.id = "_system" + i + className.value; // fix this,,id should be unique//this wont work

            let span = document.createElement("span");
            span.innerText = x + " : " + appliedCssList[currentClass][x];
            span.style.margin = "0 6px 0 0";
            //span.style.cursor = "pointer";

            let classDeleteBtn = document.createElement("img");
            classDeleteBtn.src = minus;
            classDeleteBtn.style.width = "20px";
            classDeleteBtn.style.height = "20px";
            classDeleteBtn.style.cursor = "pointer";

            sec.appendChild(span);
            sec.appendChild(classDeleteBtn);
            appliedCssListElem.appendChild(sec);
          });
        }
      }
    }
  }

  function hideInputCssComp(e) {
    inputHtml.style.display = "block";
    document.getElementById("inputCss").style.display = "none";
  }

  function addProperty(e, className) {
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

    //only if a class is selected only then the property will be added
    if (currentClass) {
      //so only if there is a value of the property only then it will be applied
      if (propertyValue.value) {
        if (cssJsonElem.innerText) {
          existingCssJson = JSON.parse(cssJsonElem.innerText);
          console.log(existingCssJson);

          //checking if the class already exists, if not then add the class
          if (!existingCssJson[className]) {
            existingCssJson[className] = Object();
            existingCssJson[className][property.value] = propertyValue.value;
          } else {
            existingCssJson[className][property.value] = propertyValue.value;
          }
          setAppliedCssList(existingCssJson);
          cssJsonElem.innerText = JSON.stringify(existingCssJson);
        } else {
          //this will run initially only
          //creating object of object and putting it in the element
          tempJson[className] = Object();
          tempJson[className][property.value] = propertyValue.value;
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
    //have to reset the class names pebbles when other's child addcss is clicked

    let doesClassExistInElem = false;
    let regEx = /^\S*$/;
    //if there are no whitespaces in classname
    if (regEx.test(className.value)) {
      if (className.value) {
        console.log(className.value);
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
        alert("classname cannot be empty");
      }

      //clearing input
      className.value = "";
    } else {
      alert("no whitespace is allowed in classname");
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
    classDeleteBtn.src = minus;
    classDeleteBtn.style.width = "20px";
    classDeleteBtn.style.height = "20px";
    classDeleteBtn.style.cursor = "pointer";

    sec.appendChild(span);
    sec.appendChild(classDeleteBtn);
    classList.appendChild(sec);
    // //clearing input
    // className.value = "";//moving it to bottom

    span.addEventListener("click", function () {
      selctedClass(span, sec);
    });

    classDeleteBtn.addEventListener("click", function () {
      deleteSelctedClass(span);
    });
    i++;
  }

  function selctedClass(span, sec) {
    console.log("selectedclas rtan-----", span);

    //putting the cuurent select class in array onlyn and removing the previos one [working fine]
    if (dummyArr.length === 1) {
      setPreviousClassPebbleId(dummyArr[0]);
      setCurrentClassPebbleId(sec.id);
      dummyArr.splice(0);
      dummyArr.push(sec.id);
    } else {
      //setting selected pebble
      setCurrentClassPebbleId(sec.id);
      dummyArr.push(sec.id);
    }

    setCurrentClass(span.innerText);
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
    console.log("allAppliedClasses :", allAppliedClasses);

    let xyz;
    xyz = Math.random();
    setCurrentXyz(xyz);
    setSpanToBeDeleted(span);
  }

  return (
    <div className="input-outermost" id="inputCss">
      <button onClick={(e) => hideInputCssComp(e)}>
        <img src={htmlIcon} alt="..." width="20px" />
      </button>

      <div className="mt30">
        <input type="text" placeholder="class" id="className" />
        <button onClick={(e) => addClassName(e)}>add class</button>
      </div>

      <div id="classList"></div>

      {/* {currentClass? */}
      <div className="flex mt30 mb30">
        <div id="propertyHolder" className="flex flex-direction">
          <select
            id="property"
            defaultValue={"display"}
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
        <button onClick={(e) => addProperty(e, currentClass)}>
          add property
        </button>
      </div>
      {/* :console.log("")} */}

      <div id="appliedCssList"></div>
      <div id="cssJsonElem"></div>
    </div>
  );
}

export default InputCSS;
