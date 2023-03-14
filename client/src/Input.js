import React, { useEffect, useState } from "react";
import AddChild from "./AddChild";
import InputCSS from "./InputCSS";
import EditContent from "./EditContent";
import htmlTagList from "./assets/htmlTagList.json";
//  import {BrowserRouter as Router,Link,Route,Routes,useNavigate} from 'react-router-dom'

import minusIcon from "./assets/icons8-minus-windows-11-color/icons8-minus-96.png";
import addIcon from "./assets/icons8-add-color/icons8-add-96.png";
// import addChildIcon from "./assets/icons8-hierarchy-ios-16-filled/icons8-hierarchy-50.png"
import addCssIcon from "./assets/icons8-css3-windows-11-color/icons8-css3-96.png";
import linkIcon from "./assets/linkIcon.jpeg";
import editIcon from "./assets/icons8-modify-others/icons8-modify-96.png";

import menuIcon from "./assets/icons8-xbox-menu-ios-16/icons8-xbox-menu-100.png";
import arrowIcon from "./assets/icons8-left-arrow-inkubators-detailed-outline/icons8-left-arrow-100.png";

function Input() {
  const [sendElement, setsendElement] = useState();
  const [inputHtml, setinputHtml] = useState();
  const [sendstruct, setsendstruct] = useState();
  const [tooltiptext, setTooltiptext] = useState();
  const [structPebble, setStructPebble] = useState();
  // const navigate=useNavigate();

  useEffect(() => {
    console.log("tag lis UE---");
    const selectElemInput = document.getElementById("element");
    selectElemInput.innerHTML = "";
    //setting html tags option
    Object.keys(htmlTagList).forEach(function (key) {
      let ele = document.createElement("option");
      ele.value = key;
      ele.innerText = key;
      selectElemInput.appendChild(ele);
    });
  }, []);
  //href,src,width,height,alt

  //responsible for showing related mandotry and additional attributes
  function handleTagChange(e) {
    let tagsAttributes = document.getElementById("tagsAttributes");
    tagsAttributes.innerHTML = ""; //clearing the previously added input

    console.log(htmlTagList[e.target.value].mandatoryAttributes);

    let attributesHolder = document.createElement("div");
    attributesHolder.classList.add("attributesHolder");
    attributesHolder.id = "attributesHolder";
    tagsAttributes.appendChild(attributesHolder);

    //only if it there are mandatory attributes
    if (htmlTagList[e.target.value].mandatoryAttributes.length >= 1) {
      //for mandatory attributes
      console.log("xxxxxxxxx");
      htmlTagList[e.target.value].mandatoryAttributes?.map((x) => {
        addAttributesInUI(x, attributesHolder, true);
      });
    }

    //only if it there are additional attributes
    if (htmlTagList[e.target.value].attributes.length >= 1) {
      let additonalAttributesHolder = document.createElement("div");
      additonalAttributesHolder.classList.add("additonalAttributesHolder");
      let select = document.createElement("select");
      let label = document.createElement("label");
      label.innerText = "Click to add attributes";

      //for additional attributes creating a select from which one by one attributes can be added
      htmlTagList[e.target.value].attributes?.map((x) => {
        if (!htmlTagList[e.target.value].mandatoryAttributes.includes(x)) {
          let option = document.createElement("option");
          option.value = x;
          option.innerText = x;
          select.appendChild(option);
        }
      });

      let addAttributeBtn = document.createElement("img");
      addAttributeBtn.src = addIcon;
      addAttributeBtn.classList.add("basicIcon");

      addAttributeBtn.addEventListener("click", function () {
        console.log("addAttributeBtn clicked");
        addAttributesInUI(select.value, attributesHolder, false);
      });

      let tempDiv = document.createElement("div");
      tempDiv.appendChild(select);
      tempDiv.appendChild(addAttributeBtn);
      additonalAttributesHolder.appendChild(label);
      additonalAttributesHolder.appendChild(tempDiv);
      tagsAttributes.appendChild(additonalAttributesHolder);
    }
  }

  function addAttributesInUI(
    attribute,
    attributesHolder,
    isMandatory
  ) {
    console.log("addAdditonalAttributesInUI func----------");
    let doesAlreadyExist = false;
    //to check if attribute is alrready added
    if (!isMandatory) {
      console.log("one");
      attributesHolder.childNodes.forEach((x) => {
        if (x.dataset.attributename === attribute) {
          doesAlreadyExist = true;
        }
      });
    }

    //add only if the attribute does not laready exist
    if (!doesAlreadyExist) {
      console.log("two");
      let label = document.createElement("label");
      isMandatory
        ? (label.innerText = "*" + attribute)
        : (label.innerText = attribute);

      let attributeValInput = document.createElement("input");
      attributeValInput.type = "text";
      attributeValInput.id = attribute;

      let tempDiv = document.createElement("div");
      tempDiv.dataset.attributename = attribute;
      tempDiv.classList.add("attributeCont");
      tempDiv.appendChild(label);
      tempDiv.appendChild(attributeValInput);
      attributesHolder.appendChild(tempDiv);
    }
  }

  function add(e) {
    let root1 = document.getElementById("root1");
    let element = document.getElementById("element");
    let elemContent = document.getElementById("elemContent");

    //creating element and putting content
    let createdElem = document.createElement(element.value);
    createdElem.innerText = elemContent.value;

    let mandatoryAttributeIsEmpty = false;
    let emptyMandatoryAttribute = "";
    //adding attributes to element
    let attributesHolder = document.getElementById("attributesHolder");
    if (attributesHolder) {
      attributesHolder.childNodes.forEach((x) => {
        //before doing any of this first ghave to check if the mandotry attribute's value is not blank
        if (
          htmlTagList[element.value].mandatoryAttributes.includes(
            x.dataset.attributename
          )
        ) {
          if (x.lastElementChild.value === "") {
            console.log("yes matched", x.dataset.attributename);
            console.log(mandatoryAttributeIsEmpty);
            mandatoryAttributeIsEmpty = true;
            emptyMandatoryAttribute = x;
          } else {
            console.log("not empty");
          }
        }

        createdElem.setAttribute(
          x.dataset.attributename,
          x.lastElementChild.value
        );
        console.log(x, x.lastElementChild, x.dataset.attributename);
      });
    }

    if (!mandatoryAttributeIsEmpty) {
      /***********************structure starts ***************************************/
      let struct = document.createElement("div");
      struct.classList.add("structElemHolder"); //its not wise to add classnames here,,,when the child will added they will have the same class hence fucking the whole hierarchy

      let structTitle = document.createElement("span");
      structTitle.classList.add("tooltip");
      structTitle.innerText = element.value;
      structTitle.style.cursor = "pointer";

      let structElemHolder = document.createElement("div");
      structElemHolder.style.background = "#171717";
      structElemHolder.style.display = "flex";
      structElemHolder.style.justifyContent = "space-between";
      structElemHolder.style.alignItems = "center";
      structElemHolder.style.color = "#fff";
      structElemHolder.style.padding = "4px 10px";
      structElemHolder.style.borderRadius = "4px";
      structElemHolder.style.border = "1px solid white";

      let tooltiptext = document.createElement("span");
      tooltiptext.classList.add("tooltiptext");

      structTitle.appendChild(tooltiptext);
      structElemHolder.appendChild(structTitle);
      struct.appendChild(structElemHolder);

      /***********************structure ends ***************************************/

      let inputHtmlComp = document.getElementById("inputHtml");
      setinputHtml(inputHtmlComp);
      //apply ccs
      let addCssBtn = document.createElement("img");
      addCssBtn.src = addCssIcon;
      addCssBtn.classList.add("cssIcon");
      addCssBtn.addEventListener("click", function (x) {
        console.log("addevent rann---------------");
        document.getElementById("inputHtml").classList.remove("enter");
        document.getElementById("inputCss").classList.add("enter");

        setsendElement(createdElem);
        setTooltiptext(tooltiptext);
        setStructPebble(structElemHolder); //sending parent elem in structure
        // navigate('/addcss')
        // setinputHtml(inputHtmlComp);//removed from here as the inputhtmlcomp was only being inisitialized wihen the first addcss button was created.
      });

      //add child
      let addChild = document.createElement("img");
      addChild.src = linkIcon;
      addChild.addEventListener("click", function (x) {
        let addChildPopup = document.getElementById("addChildPopup");
        addChildPopup.style.display = "flex";

        setsendElement(createdElem); //sending the parent elem to add child to it
        setsendstruct(struct); //sending parent elem in structure
      });

      //delete element and struct
      let deleteElemBtn = document.createElement("img");
      deleteElemBtn.src = minusIcon;
      deleteElemBtn.addEventListener("click", function (x) {
        console.log("delte elem funv----");
        createdElem.parentNode.removeChild(createdElem); //deleting the real element
        struct.parentNode.removeChild(struct); //dleteing the struct from structure
      });

      //edit element's content
      let editElemBtn = document.createElement("img");
      editElemBtn.src = editIcon;
      editElemBtn.addEventListener("click", function (x) {
        console.log("edit elem func----");

        let editElemContentPopup = document.getElementById(
          "editElemContentPopup"
        );
        editElemContentPopup.style.display = "flex";
        console.log(createdElem.innerText);
        document.getElementById("elemsEditedContent").value =
          createdElem.innerText;

        setsendElement(createdElem); //sending the parent elem
        setStructPebble(structElemHolder); //sending the struct
      });

      //structure elem's modification buttons
      let elemModifyBtnHolder = document.createElement("div");
      elemModifyBtnHolder.classList.add("elemModifyBtnHolder");
      elemModifyBtnHolder.appendChild(editElemBtn);
      elemModifyBtnHolder.appendChild(addCssBtn);
      elemModifyBtnHolder.appendChild(addChild);
      elemModifyBtnHolder.appendChild(deleteElemBtn);
      structElemHolder.appendChild(elemModifyBtnHolder);
      //structure elem's modification buttons

      //adding creeated element to root
      root1.appendChild(createdElem);
      //adding struct to main div(structure)
      document.getElementById("structure").appendChild(struct);

      //clearing and setting things to default after adding elememy
      element.value = "h1";
      elemContent.value = "";
      document.getElementById("tagsAttributes").innerHTML = "";
    } else {
      //alert(`${emptyMandatoryAttribute.dataset.attributename} attribute can't be empty`);
      emptyMandatoryAttribute.classList.add("empty");
      //either mark red the attribute or show an alert
    }
  }


  let whichWasThere;
  function hamBurger(e) {
    let inputCss = document.getElementById("inputCss");
    let inputHtml = document.getElementById("inputHtml");
    let hamBurger = document.getElementById("hamBurger");

    if (inputCss.classList.contains("enter") === true) {
      whichWasThere = "inputCss";
    } else if (inputHtml.classList.contains("enter") === true) {
      whichWasThere = "inputHtml";
    }
    //console.log('whichWasThere=', whichWasThere)

    document.getElementById(whichWasThere).classList.toggle("enter"); //hide/unhide inputhtml/css
    hamBurger.classList.toggle("showHam"); //moving ham
    document
      .querySelectorAll(".exportIcon")[0]
      ?.classList.toggle("moveExportIcon"); //moving export button
    //setting root1(output) width to 100% when inputhtml/css are hidden
    document.getElementById("root1").classList.toggle("fullWidth");
  }

  return (
    <>
      <div className="bczOfHam">
        <img
          id="hamBurger"
          onClick={(e) => hamBurger(e)}
          src={menuIcon}
          alt=""
        />
        <div className="input-outermost enter" id="inputHtml">
          <div>
            <div className="groupInput">
              <label for="element">Select element </label>
              <select id="element" onChange={(e) => handleTagChange(e)}>
                {/* <option value="div">div</option>
              <option value="section">section</option>
              <option value="span">span</option>
              <option value="p">paragraph</option>
              <option value="input">input</option> */}
              </select>
              <div id="tagsAttributes"></div>
            </div>
            <div className="groupInput">
              <label>Add content</label>
              <textarea id="elemContent"></textarea>
            </div>
          </div>

          <div className="structure" id="structure"></div>

          <button onClick={() => add()}>ADD</button>
        </div>
      </div>
      <InputCSS
        element={sendElement}
        inputHtml={inputHtml}
        tooltiptext={tooltiptext}
        structPebble={structPebble}
      />

      <AddChild
        element={sendElement}
        struct={sendstruct}
        setsendstruct={setsendstruct}
        setsendElement={setsendElement}
        inputHtml={inputHtml}
        setTooltiptext={setTooltiptext}
        setStructPebble={setStructPebble}
      />

      <EditContent element={sendElement} structPebble={structPebble} />

      {/* <Routes>
        <Route path="/addcss" element={<InputCSS el={sendElement} inputHtml={inputHtml} />} />
      </Routes> */}
    </>
  );
}

export default Input;
