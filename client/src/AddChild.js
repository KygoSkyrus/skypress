import React from "react";
import htmlTagList from "./assets/htmlTagList.json";


//importing functions
import handleTagChange from "./HandleTagChange"
import CommonFunc from "./CommonFunc";

function AddChild(props) {
  const {
    element,
    struct,
    setsendstruct,
    setsendElement,
    inputHtml,
    setTooltiptext,
    setStructPebble
  } = props;
  //this element here is the real output element
  //struct here is the whole structre

  function addChildWithParent(e) {
    console.log("sperate addChildWithParent function ran----");

    let childElement = document.getElementById("childElement");
    let childElemContent = document.getElementById("childElemContent");

     //creating child element and putting content
    let createdChildElem = document.createElement(childElement.value);
    createdChildElem.innerText = childElemContent.value;



    
    let mandatoryAttributeIsEmpty = false;
    let emptyMandatoryAttribute = "";
    //adding attributes to element
    let attributesHolder = document.getElementById("attributesHolderInChild");//created this ID dynamicaaly in handleTagChange function
    console.log('attributesHolder',attributesHolder)
    if (attributesHolder) {
      console.log('11')
      attributesHolder.childNodes.forEach((x) => {
        //before doing any of this first have to check if the mandotry attribute's value is not blank
        if (
          htmlTagList[childElement.value].mandatoryAttributes.includes(
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

        createdChildElem.setAttribute(
          x.dataset.attributename,
          x.lastElementChild.value
        );
        console.log(x, x.lastElementChild, x.dataset.attributename);
      });
    }
    console.log('mandatoryAttributeIsEmpty',mandatoryAttributeIsEmpty)
    if (!mandatoryAttributeIsEmpty) {

    //for addimg this childelement in structure
    let structChildElem = document.createElement(childElement.value);
    structChildElem.innerText = childElement.value;
    //struct.appendChild(structChildElem);
    
    let c = CommonFunc(
      childElement.value,
      createdChildElem,
      setsendElement,
      setsendstruct,
      inputHtml,
      setTooltiptext,
      setStructPebble
      ); //whatever we get from here will be appended to the parent(it returns the struct child)
      

     //adding creeated child element to its parent
     element.appendChild(createdChildElem);
     //adding child struct to parent struct
      struct.appendChild(c); //the struct here is the parent struct element to which the child struct (c from commonFUnc) is appended
      
      document.getElementById("addChildPopup").style.display = "none";
      
    //clearing and setting things to default after adding elememy
    childElement.value='h1';//set to first option 
    childElemContent.value='';
    document.getElementById("tagsAttributesInChild").innerHTML = "";
  } else {
    //alert(`${emptyMandatoryAttribute.dataset.attributename} attribute can't be empty`);
    emptyMandatoryAttribute.classList.add("empty");
    //either mark red the attribute or show an alert
  }

  }
  function closeAddChildPopup(e) {
    document.getElementById("addChildPopup").style.display = "none";
     //clearing inputs
     document.getElementById("childElement").value='div';//set to first option 
     document.getElementById("childElemContent").value='';
  }

  // document
  //   .getElementById("addChildPopup")
  //   ?.addEventListener("click", function (e) {
  //     if (
  //       e.target !== document.getElementById("childInputHolder") 
  //     ) {
  //       console.log("outside clicked");
  //       document.getElementById("addChildPopup").style.display = "none";
  //     }
  //   });

  function handleTagChangeInChild(e){
    let tagsAttributesInChild = document.getElementById('tagsAttributesInChild')
    handleTagChange(e,tagsAttributesInChild,"InChild")
  }

  return (
    <>
      <div id="addChildPopup">
        <div id="childInputHolder">
          <button
            id="closeAddChildPopup"
            onClick={(e) => closeAddChildPopup(e)}
          >
            &times;
          </button>
          <div className="container" id="childInputHolderContainer">
            <div className="groupInput">
              <label>Select element </label>
              <select id="childElement"  onChange={(e) => handleTagChangeInChild(e)}>
                {/* <option value="div">div</option>
                <option value="section">section</option>
                <option value="span">span</option>
                <option value="p">paragraph</option> */}
              </select>
              <div id="tagsAttributesInChild"></div>
            </div>
            <div className="groupInput">
              <label>Add content</label>
              <textarea id="childElemContent"></textarea>
            </div>
            <button
              id="addChildWithParent"
              onClick={(e) => addChildWithParent(e)}
            >
              add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddChild;
