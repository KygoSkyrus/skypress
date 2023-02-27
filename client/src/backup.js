 //we may have to move this entir function into an useffcet so it would have current elemnt
 function deleteSelctedClass(span,el) {
    console.log("deleteselectedclas rtan-----", span);
    console.log("allAppliedClasses :",allAppliedClasses);

    // console.log(currentXyz)
    
   
    console.log('element is delete -----',currentElem)
    let className = span.innerText;



    element.classList.remove(className);

    console.log('element classlist in dlete fucn',element.classList)
    
    let v=updateClassPebbles+1
    setUpdateClassPebbles(v)

    allAppliedClasses.splice(allAppliedClasses.indexOf(className),1)//removing the class from arr
    console.log(allAppliedClasses)

    let cssJsonElem = document.getElementById("cssJsonElem");
    console.log(cssJsonElem.innerText);

    //only delete the pebble and remove css from style if there is no same class applied to other element
    if(!allAppliedClasses.includes(className)){
    let existingCssJson;
    if (cssJsonElem.innerText) {
      existingCssJson = JSON.parse(cssJsonElem.innerText);
      console.log("check if this is needed 1", existingCssJson);

      //checking if the class exists and then deleting it
      if (existingCssJson[className]) {
        delete existingCssJson[className];
        console.log("after deleeting property", existingCssJson);
        //existingCssJson[className][property.value] = propertyValue.value;
      }
      setAppliedCssList(existingCssJson);
      cssJsonElem.innerText = JSON.stringify(existingCssJson);
    }

    //putting the updates css json in the style tag after formatting it into .css format
    if (
      document.querySelectorAll("[data-css]").length === 1 &&
      document.querySelectorAll("[data-css]")[0].getAttribute("data-css") ===
        "dynamicCss"
    ) {
      let styleStr = "";
      if (existingCssJson) {
        styleStr = convertCssJosnToStyles(existingCssJson);
      }

      console.log("retSTR in delete", styleStr);

      let style = document.querySelectorAll("[data-css]")[0];
      style.innerText = styleStr;
    }

    //finally deleting the classname pebble
    span.parentNode.remove();
  }
  }