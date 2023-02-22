import useEffect from "react";
import "./App.css";
import Output from "./Output";
import Input from "./Input";
// import InputCSS from "./InputCSS";
function App() {
  // useEffect(() => {

  //   callBackendAPI();

  //   const callBackendAPI = async () => {
  //   const response = await fetch('/');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };

  // }, [])

  return (
    <div className="App">
      <Output />
      <Input/>
      {/* <InputCSS /> */}
      {/*uncomment this later..this is the homepage.commented to test single page */}
      {/* <SingleBlog/> */}
    </div>
  );
}

export default App;
