import React, { useEffect, useState } from "react";
import AddChild from "./AddChild";
import InputCSS from "./InputCSS";
import EditContent from "./EditContent";
import htmlTagList from "./assets/htmlTagList.json";
//  import {BrowserRouter as Router,Link,Route,Routes,useNavigate} from 'react-router-dom'

import minusIcon from "./assets/icons8-minus-windows-11-color/icons8-minus-96.png";
// import addChildIcon from "./assets/icons8-hierarchy-ios-16-filled/icons8-hierarchy-50.png"
import addCssIcon from "./assets/icons8-css3-windows-11-color/icons8-css3-96.png";
import linkIcon from "./assets/linkIcon.jpeg";
import editIcon from "./assets/icons8-modify-others/icons8-modify-96.png";

import menuIcon from "./assets/icons8-xbox-menu-ios-16/icons8-xbox-menu-100.png";
//import arrowIcon from "./assets/icons8-left-arrow-inkubators-detailed-outline/icons8-left-arrow-100.png";

//importing functions
import handleTagChange from "./HandleTagChange"

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
    //selectElemInput.innerHTML = "";
    
    addTagsOption(selectElemInput)//this function sets html tags option in both parent and child popup
  }, []);
  //href,src,width,height,alt


  function addTagsOption(selectTag){
    selectTag.innerHTML = "";
    Object.keys(htmlTagList).forEach(function (key) {
      let ele = document.createElement("option");
      ele.value = key;
      ele.innerText = key;
      selectTag.appendChild(ele);
    });
  }


  function handleTagChangeInParent(e){
    let tagsAttributes= document.getElementById('tagsAttributes')
    handleTagChange(e,tagsAttributes,"InParent")//the "InParent string tells to ditinguish child and parent uI"
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
    let attributesHolder = document.getElementById("attributesHolderInParent");//created this ID dynamicaaly in handleTagChange function
    console.log('attributesHolder',attributesHolder)
    if (attributesHolder) {
      console.log('11')
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
            //to remove the empty class from the input if the user has entered value
            if(x.classList.contains('empty')){
              x.classList.remove('empty')
            }
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
    console.log('mandatoryAttributeIsEmpty,emptyMandatoryAttribute',mandatoryAttributeIsEmpty,emptyMandatoryAttribute)
    if (!mandatoryAttributeIsEmpty) {
      /***********************structure starts ***************************************/
      let struct = document.createElement("div");
      struct.classList.add("structElemHolder"); //its not wise to add classnames here,,,when the child will added they will have the same class hence fucking the whole hierarchy

      let structTitle = document.createElement("span");
      structTitle.innerText = element.value;
      structTitle.style.cursor = "pointer";
      structTitle.style.width="100%"

      let structElemHolder = document.createElement("div");
      structElemHolder.style.background = "#171717";
      structElemHolder.style.display = "flex";
      structElemHolder.style.justifyContent = "space-between";
      structElemHolder.style.alignItems = "center";
      structElemHolder.style.color = "#fff";
      structElemHolder.style.padding = "4px 10px";
      structElemHolder.style.borderRadius = "4px";
      structElemHolder.style.border = "1px solid white";

      structElemHolder.appendChild(structTitle);
      struct.appendChild(structElemHolder);

      /***********************structure ends ***************************************/

      let inputHtmlComp = document.getElementById("inputHtml");
      setinputHtml(inputHtmlComp);
      //apply ccs
      let addCssBtn = document.createElement("img");
      addCssBtn.src = addCssIcon;
      addCssBtn.classList.add("cssIcon");
      addCssBtn.addEventListener("click", function (e) {
        console.log("addevent rann---------------");
        document.getElementById("inputHtml").classList.remove("enter");
        document.getElementById("inputCss").classList.add("enter");

        setsendElement(createdElem);
        setTooltiptext(structTitle);//removing tooltip,instad of that added title tag
        setStructPebble(structElemHolder); //sending parent elem in structure
        // navigate('/addcss')
        // setinputHtml(inputHtmlComp);//removed from here as the inputhtmlcomp was only being inisitialized wihen the first addcss button was created.
      });

      //add child
      let addChild = document.createElement("img");
      addChild.src = linkIcon;
      addChild.addEventListener("click", function (e) {
        let addChildPopup = document.getElementById("addChildPopup");
        addChildPopup.style.display = "flex";

        setsendElement(createdElem); //sending the parent elem to add child to it
        setsendstruct(struct); //sending parent elem in structure

        addTagsOption(document.getElementById("childElement"));//to add tags option in add child UI
      });

      //delete element and struct
      let deleteElemBtn = document.createElement("img");
      deleteElemBtn.src = minusIcon;
      deleteElemBtn.addEventListener("click", function (e) {
        console.log("delte elem funv----");
        createdElem.parentNode.removeChild(createdElem); //deleting the real element
        struct.parentNode.removeChild(struct); //dleteing the struct from structure
      });

      //edit element's content
      let editElemBtn = document.createElement("img");
      editElemBtn.src = editIcon;
      editElemBtn.addEventListener("click", function (e) {
        console.log("edit elem func----");

        let editElemContentPopup = document.getElementById(
          "editElemContentPopup"
        );
        editElemContentPopup.style.display = "flex";
        console.log(createdElem.innerText);
        document.getElementById("elemsEditedContent").value =
          createdElem.innerText;

          let tagsAttributesInEdit=document.getElementById('tagsAttributesInEdit')
          //here createdEleme is sent so that we can get the already applied attributes value to show as default when on edit popup
          handleTagChange(createdElem,tagsAttributesInEdit,"InEdit")//the "InParent string tells to ditinguish child and parent uI"
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
              <select id="element" onChange={(e) => handleTagChangeInParent(e)}>
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
