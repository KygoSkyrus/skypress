import React, {useState } from "react";
import AddChild from "./AddChild";
import InputCSS from "./InputCSS";

function Input() {
  const [sendElement, setsendElement] = useState();
  const [inputHtml, setinputHtml] = useState();
  const [sendstruct,setsendstruct]=useState();

  //add live changes,,using setchange function ,,so that changes will be applied right when its typed
  function add(e) {
    let root1 = document.getElementById("root1");
    let element = document.getElementById("element");
    let elemContent = document.getElementById("elemContent");

    //creating element and putting content and then clearing content
    let createdElem = document.createElement(element.value);
    createdElem.innerText = elemContent.value;
    root1.appendChild(createdElem);
    elemContent.value = "";



    /***********************structure ends ***************************************/
    let struct = document.createElement("div");
    struct.classList.add('structElemHolder');//its not wise to add classnames here,,,when the child will added they will have the same class hence fucking the whole hierarchy

    let structTitle = document.createElement("span");
    structTitle.innerText = element.value;

    let structElemHolder = document.createElement("div");
    structElemHolder.style.background="#171717";
    structElemHolder.style.display="flex";
    structElemHolder.style.justifyContent="space-between";
    structElemHolder.style.alignItems="center";
    structElemHolder.style.color="#fff";
    structElemHolder.style.padding="2px 10px";
    structElemHolder.style.borderRadius="4px";
    structElemHolder.style.border="1px solid white";


    structElemHolder.appendChild(structTitle);
    

    struct.appendChild(structElemHolder);
    document.getElementById("structure").appendChild(struct);
    
    /***********************structure ends ***************************************/


    let inputHtmlComp=document.getElementById("inputHtml");
    setinputHtml(inputHtmlComp);
    //apply ccs 
    let addCssBtn = document.createElement("button");
    addCssBtn.innerText = "add Css";
    addCssBtn.addEventListener("click", function (x) {
      console.log("addevent rann---------------");
      document.getElementById("inputCss").style.display="block";
      document.getElementById("inputHtml").style.display="none";
      setsendElement(createdElem);
      // setinputHtml(inputHtmlComp);//removed from here as the inputhtmlcomp was only being inisitialized wihen the first addcss button was created.
    });




    //add child
    let addChild = document.createElement("button");
    addChild.innerText = "add Child";
    addChild.addEventListener("click", function (x) {

      let addChildPopup = document.getElementById("addChildPopup");
      addChildPopup.style.display = "flex";
  
      setsendElement(createdElem);//sending the parent elem to add child to it
      setsendstruct(struct);//sending parent elem in structure
    });



    //structure elem's modification buttons
    let elemModifyBtnHolder = document.createElement("div");
    elemModifyBtnHolder.appendChild(addCssBtn);
    elemModifyBtnHolder.appendChild(addChild);
    structElemHolder.appendChild(elemModifyBtnHolder);
    //structure elem's modification buttons
  }


  return (
    <>
      <div className="input-outermost" id="inputHtml">
        <div>
          <div className="groupInput">
            <label>Select element </label>
            <select id="element">
              <option value="div">div</option>
              <option value="section">section</option>
              <option value="span">span</option>
              <option value="p">paragraph</option>
            </select>
          </div>
          <div className="groupInput">
            <label>Add content</label>
            <textarea id="elemContent"></textarea>
          </div>
        </div>

        <div className="structure" id="structure"></div>

        <button onClick={() => add()}>ADD</button>
      </div>

      <InputCSS
        element={sendElement}
        inputHtml={inputHtml}
      />

      <AddChild 
         element={sendElement}
         struct={sendstruct}
         setsendstruct={setsendstruct}
         setsendElement={setsendElement}
         inputHtml={inputHtml}
      />
    </>
  );
}

export default Input;
