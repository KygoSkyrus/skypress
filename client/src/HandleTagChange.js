import addIcon from "./assets/icons8-add-color/icons8-add-96.png";
import htmlTagList from "./assets/htmlTagList.json";





  //responsible for showing related mandotry and additional attributes
  function handleTagChange(e,tagsAttributes,InParentOrChild) {
    //@params
    //tagsAttributes: is the holder in both parent and child ui to show related attributes
    //inParentOrChild: has the string "inPArent"/"inChild" to distinguis child parent
    tagsAttributes.innerHTML = ""; //clearing the previously added input

    let tag=''
    if(InParentOrChild==="InParent" || InParentOrChild==="InChild"){
        tag=e.target.value
    }else if(InParentOrChild==="InEdit"){
        tag=e
    }
console.log('tag',tag)//from edit button unable to send created element tag
    console.log(htmlTagList[tag].mandatoryAttributes);

    let attributesHolder = document.createElement("div");
    attributesHolder.classList.add("attributesHolder");
    attributesHolder.id = "attributesHolder"+InParentOrChild;
    tagsAttributes.appendChild(attributesHolder);

    //only if it there are mandatory attributes
    if (htmlTagList[tag].mandatoryAttributes.length >= 1) {
      //for mandatory attributes
      console.log("xxxxxxxxx");
      htmlTagList[tag].mandatoryAttributes?.map((x) => {
        addAttributesInUI(x, attributesHolder, true);
        return ''
      });
    }

    //only if it there are additional attributes
    if (htmlTagList[tag].attributes.length >= 1) {
      let additonalAttributesHolder = document.createElement("div");
      additonalAttributesHolder.classList.add("additonalAttributesHolder");
      let select = document.createElement("select");
      let label = document.createElement("label");
      label.innerText = "Click to add attributes";

      //for additional attributes creating a select from which one by one attributes can be added
      htmlTagList[tag].attributes?.map((x) => {
        if (!htmlTagList[tag].mandatoryAttributes.includes(x)) {
          let option = document.createElement("option");
          option.value = x;
          option.innerText = x;
          select.appendChild(option);
        }
        return ''
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

export default handleTagChange;