import React from "react";
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
    let createdChildElem = document.createElement(childElement.value);
    let childElemContent = document.getElementById("childElemContent");
    createdChildElem.innerText = childElemContent.value;
    element.appendChild(createdChildElem);
    //NOTe:in this comp there maybe lines that are not usefull maybe twice as the common function is used now

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

    struct.appendChild(c); //the struct here is the parent struct element to which the child struct (c from commonFUnc) is appended

    document.getElementById("addChildPopup").style.display = "none";

    //clearing inputs
    childElement.value='div';//set to first option 
    childElemContent.value='';
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
              <select id="childElement" >
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
