
function CommonFunc(childElemVal,createdChildElem,setsendElement,setsendstruct,inputHtml){

console.log(childElemVal);

    /***********************structure ends ***************************************/
    let struct = document.createElement("div");//struct here is just regural varible, doesnt haave to do with the struct we are using
    ///struct.classList.add('structElemHolder');\
    struct.style.position="relative";
    struct.style.left="12px";
    // struct.style.background="green";

    let structTitle = document.createElement("span");
    structTitle.innerText = childElemVal;

    let structElemHolder = document.createElement("div");//to this var try adding the addcss/child buttons
    structElemHolder.appendChild(structTitle);
    structElemHolder.style.display="flex";
    structElemHolder.style.justifyContent="space-between";
    structElemHolder.style.alignItems="center";
    structElemHolder.style.background="#171717";
    structElemHolder.style.color="#fff";
    structElemHolder.style.padding="2px 10px";
    structElemHolder.style.borderRadius="4px";
    structElemHolder.style.border="1px solid white";
    

    struct.appendChild(structElemHolder);
    //document.getElementById("structure").appendChild(struct);//have to check if this is needed or not
    
    /***********************structure ends ***************************************/




    //apply ccs 
    let addCssBtn = document.createElement("button");
    addCssBtn.innerText = "add Css";
    addCssBtn.addEventListener("click", function () {
      document.getElementById("inputCss").style.display="block";
      document.getElementById("inputHtml").style.display="none";
      setsendElement(createdChildElem);
      // setinputHtml(inputHtml);
    });




    // //add child
    let addChild = document.createElement("button");
    addChild.innerText = "add Child";
    addChild.addEventListener("click", function (x) {

      let addChildPopup = document.getElementById("addChildPopup");
      addChildPopup.style.display = "flex";
      console.log("common child ran--------");

      setsendElement(createdChildElem);//USEFULL::::::-3-2-23(last commit: passign function worked check notes ...to know where u at)
      setsendstruct(struct);//sending parent elem in structure
    });



    //structure elem's modification buttons
    let elemModifyBtnHolder = document.createElement("div");
    elemModifyBtnHolder.appendChild(addCssBtn);
    elemModifyBtnHolder.appendChild(addChild);
    structElemHolder.appendChild(elemModifyBtnHolder);
    //structure elem's modification buttons



    return struct;
}

export default CommonFunc;