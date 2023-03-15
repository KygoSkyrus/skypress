import React from "react";

function EditContent(props) {
    const { element, structPebble } = props;
    console.log("edit contentelem------", element, structPebble);

    function updateElemsContent(e) {
        //have to check if the current element has any child node,,,if yes ,,then prompt the user that updating content will delete the child,,if user says yes,,then delete the sturct and update the content
        let elemsEditedContent = document.getElementById("elemsEditedContent");
        let editElemContentPopup = document.getElementById("editElemContentPopup");

        // console.log('elem',element)
        // console.log(element.childNodes)
        // console.log(element.children)
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
            element.innerText = elemsEditedContent.value;

            editElemContentPopup.style.display = "none"; //hiding back the popup
            elemsEditedContent.value = ""; //clearing input
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
                        </div>
                        <div id="tagsAttributesInEdit"></div>
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
