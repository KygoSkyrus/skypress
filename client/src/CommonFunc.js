import minusIcon from "./assets/icons8-minus-windows-11-color/icons8-minus-96.png";
// import addIcon from "./assets/icons8-add-color/icons8-add-96.png"
import addChildIcon from "./assets/icons8-hierarchy-ios-16-filled/icons8-hierarchy-50.png"
import addCssIcon from "./assets/icons8-css3-windows-11-color/icons8-css3-96.png"
import editIcon from "./assets/icons8-modify-others/icons8-modify-96.png"


function CommonFunc(childElemVal,createdChildElem,setsendElement,setsendstruct,inputHtml,setTooltiptext,setStructPebble){

console.log(childElemVal);

    /***********************structure ends ***************************************/
    let struct = document.createElement("div");//struct here is just regural varible, doesnt haave to do with the struct we are using
    ///struct.classList.add('structElemHolder');\
    struct.style.position="relative";
    struct.style.left="12px";
    // struct.style.background="green";

    let structTitle = document.createElement("span");
    structTitle.classList.add('tooltip');
    structTitle.innerText = childElemVal;
    structTitle.style.cursor = "pointer";

    let structElemHolder = document.createElement("div");//to this var try adding the addcss/child buttons
    structElemHolder.style.display="flex";
    structElemHolder.style.justifyContent="space-between";
    structElemHolder.style.alignItems="center";
    structElemHolder.style.background="#171717";
    structElemHolder.style.color="#fff";
    structElemHolder.style.padding="4px 10px";
    structElemHolder.style.borderRadius="4px";
    structElemHolder.style.border="1px solid white";
    
    let tooltiptext=document.createElement("span");
    tooltiptext.classList.add('tooltiptext')

    structTitle.appendChild(tooltiptext); 
    structElemHolder.appendChild(structTitle);
    struct.appendChild(structElemHolder);
    
    /***********************structure ends ***************************************/




    //apply ccs 
    let addCssBtn = document.createElement("img");
    addCssBtn.src = addCssIcon;
    addCssBtn.addEventListener("click", function () {
      // document.getElementById("inputCss").style.display="block";
      // document.getElementById("inputHtml").style.display="none";
      document.getElementById("inputHtml").classList.remove('enter')
      document.getElementById("inputCss").classList.add('enter')
      setsendElement(createdChildElem);
      setTooltiptext(tooltiptext);
      setStructPebble(structElemHolder)
      // setinputHtml(inputHtml);
    });




    // //add child
    let addChild = document.createElement("img");
    addChild.src=addChildIcon;
    addChild.addEventListener("click", function (x) {

      let addChildPopup = document.getElementById("addChildPopup");
      addChildPopup.style.display = "flex";
      console.log("common child ran--------");

      setsendElement(createdChildElem);
      setsendstruct(struct);//sending parent elem in structure
    });


    //delete element
    let deleteElemBtn = document.createElement("img");
    deleteElemBtn.src=minusIcon;
    deleteElemBtn.addEventListener("click", function (x) {
      createdChildElem.parentNode.removeChild(createdChildElem);//deleting the real element
      struct.parentNode.removeChild(struct)//dleteing the struct from structure
    });


     //edit element's content
     let editElemBtn = document.createElement("img");
     editElemBtn.src = editIcon;
     editElemBtn.addEventListener("click", function (x) {
       console.log('edit elem func in child----')
 
       let editElemContentPopup = document.getElementById("editElemContentPopup");
       editElemContentPopup.style.display = "flex";
       document.getElementById('elemsEditedContent').value=createdChildElem.innerText;

       setsendElement(createdChildElem);//sending the parent elem
       setStructPebble(structElemHolder);//sending the struct 
     });
    

    //structure elem's modification buttons
    let elemModifyBtnHolder = document.createElement("div");
    elemModifyBtnHolder.classList.add('elemModifyBtnHolder');
    elemModifyBtnHolder.appendChild(editElemBtn);
    elemModifyBtnHolder.appendChild(addCssBtn);
    elemModifyBtnHolder.appendChild(addChild);
    elemModifyBtnHolder.appendChild(deleteElemBtn);
    structElemHolder.appendChild(elemModifyBtnHolder);
    //structure elem's modification buttons



    return struct;
}

export default CommonFunc;