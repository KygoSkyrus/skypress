import React from "react";
import CommonFunc from "./CommonFunc";

function AddChild(props) {
 
  const { element,struct ,setsendstruct,setsendElement,inputHtml} = props;
  //this element here is the real output element
  //struct here is the whole structre
  
  function addChildWithParent(e) {
        console.log("sperate addChildWithParent function ran----");
        let childElement = document.getElementById("childElement");
        let createdChildElem = document.createElement(childElement.value);
        let childElemContent = document.getElementById("childElemContent");
        createdChildElem.innerText= childElemContent.value;
        element.appendChild(createdChildElem);
        //issue is that check if child created by child is working or not
        //NOTe:in this comp there maybe lines that are not usefull maybe twice as the common function is used now

        //for addimg this childelement in structure
        let structChildElem=document.createElement(childElement.value)
        structChildElem.innerText = childElement.value;
        //struct.appendChild(structChildElem);


        let c = CommonFunc(childElement.value ,createdChildElem,setsendElement,setsendstruct,inputHtml);//whatever we get from here will be appended to the parent

        struct.appendChild(c);
        //here we have to write the code to create a sctructure elem all over again, there may be a way to create another separte comp,,which will be called from both places.
        //we will need to move out add css and addchild function from the iput ,,so that they can be called from here and input 
        

        document.getElementById("addChildPopup").style.display="none";
  }

  function closeAddChildPopup(e) {
    document.getElementById("addChildPopup").style.display = "none";
  }

  return (
    <>
      <div id="addChildPopup">
        <button onClick={(e) => closeAddChildPopup(e)}>close</button>
        <div className="groupInput">
          <label>Select element </label>
          <select id="childElement">
            <option value="div">div</option>
            <option value="section">section</option>
            <option value="span">span</option>
            <option value="p">paragraph</option>
          </select>
        </div>
        <div className="groupInput">
          <label>Add content</label>
          <textarea id="childElemContent"></textarea>
        </div>
        <button id="addChildWithParent" onClick={(e) => addChildWithParent(e)}>
          add
        </button>
      </div>
    </>
  );
}

export default AddChild;
