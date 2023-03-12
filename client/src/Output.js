import React from "react";

import exportIcon from "./assets/icons8-export-kmg-design-flat/icons8-export-64.png";

const Output = () => {
  function handleClick(e) {
    console.log("handleclick");

    let html = Object();
    let css = Object();
    html.content = document.getElementById("root1").innerHTML; //if innerText is used it won't be formatted
    html.type = "html";
    css.content = document.querySelectorAll("[data-css]")[0]?.innerHTML;
    css.type = "css";

    blobMaker(html);
    blobMaker(css);
  }

  function blobMaker(data) {
    let url;
    if (data.content) {
      url = window.URL.createObjectURL(new Blob([data.content]));
    } else {
      url = window.URL.createObjectURL(new Blob([""]));
    }
    const link = document.createElement("a");
    link.href = url;

    if (data.type === "html") {
      link.setAttribute("download", `index.html`);
    }
    if (data.type === "css") {
      console.log(data.content);
      link.setAttribute("download", `style.css`);
    }

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  return (
    <>
      <div className="root1" id="root1"></div>
      <img
        src={exportIcon}
        alt=""
        className="exportIcon"
        onClick={(e) => handleClick(e)}
      />
    </>
  );
};

export default Output;
