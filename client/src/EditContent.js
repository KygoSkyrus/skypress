import React from "react";
import htmlTagList from "./assets/htmlTagList.json";

function EditContent(props) {
    const { element, structPebble } = props;
    console.log("edit contentelem------", element, structPebble);

    function updateElemsContent(e) {
        //have to check if the current element has any child node,,,if yes ,,then prompt the user that updating content will delete the child,,if user says yes,,then delete the sturct and update the content
        let elemsEditedContent = document.getElementById("elemsEditedContent");
        let editElemContentPopup = document.getElementById("editElemContentPopup");

        if (element.childNodes.length >= 1) {
            console.log("has childs");

            if (element.children.length >= 1) {

                // console.log(structPebble.parentNode.childNodes)
                if (window.confirm("element has child tags, updating content will delete all the childs. Want to proceed further and update?")) {
                    console.log("d");

                    setVal(elemsEditedContent, editElemContentPopup);

                    //deleting the struct
                    let tempArr = [];
                    structPebble.parentNode.childNodes?.forEach(x => {
                        if (x !== structPebble) {
                            console.log('itsnot it', x)
                            tempArr.push(x)//storing the struct to be deleted in an array
                        }
                    });
                    console.log(tempArr)
                    // eslint-disable-next-line array-callback-return
                    tempArr.map(x => {
                        x.remove()//removing the child struct
                    })


                } else {
                    editElemContentPopup.style.display = "none"; //hiding back the popup
                    elemsEditedContent.value = ""; //clearing input
                }

            } else {
                setVal(elemsEditedContent, editElemContentPopup);
            }

        } else {
            setVal(elemsEditedContent, editElemContentPopup);
        }



        function setVal(elemsEditedContent, editElemContentPopup) {


            let mandatoryAttributeIsEmpty = false;
            let emptyMandatoryAttribute = "";
            //adding attributes to element
            let attributesHolder = document.getElementById("attributesHolderInEdit");//created this ID dynamicaaly in handleTagChange function
            console.log('attributesHolder',attributesHolder)
            if (attributesHolder) {
              console.log('11')
              attributesHolder.childNodes.forEach((x) => {
                //before doing any of this first ghave to check if the mandotry attribute's value is not blank
                if (
                  htmlTagList[element.tagName.toLowerCase()].mandatoryAttributes.includes(
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
        
                element.setAttribute(
                  x.dataset.attributename,
                  x.lastElementChild.value
                );
                console.log(x, x.lastElementChild, x.dataset.attributename);
              });
            }
            console.log('mandatoryAttributeIsEmpty',mandatoryAttributeIsEmpty)
            if (!mandatoryAttributeIsEmpty) {

            element.innerText = elemsEditedContent.value;

            editElemContentPopup.style.display = "none"; //hiding back the popup
            elemsEditedContent.value = ""; //clearing input
        }else {
            //alert(`${emptyMandatoryAttribute.dataset.attributename} attribute can't be empty`);
            emptyMandatoryAttribute.classList.add("empty");
            //either mark red the attribute or show an alert
          }
        }
    }


    function closeEditContentPopup(e) {
        document.getElementById("editElemContentPopup").style.display = "none";
        //clearing inputs
        document.getElementById("elemsEditedContent").value = "";
    }

    return (
        <>
            <div id="editElemContentPopup">
                <div className="editContentInputHolder">
                    <button
                        id="closeEditContentPopup"
                        onClick={(e) => closeEditContentPopup(e)}
                    >
                        &times;
                    </button>
                    <div className="container">
                        <div className="groupInput">
                            <label>Edit content</label>
                            <textarea id="elemsEditedContent"></textarea>
                        <div id="tagsAttributesInEdit"></div>
                        </div>
                        <button
                            id="updateElemsContent"
                            onClick={(e) => updateElemsContent(e)}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditContent;
