import useEffect from "react";
import "./App.css";
import Output from "./Output";
import Input from "./Input";
// import {BrowserRouter as Router,Link,Route,Routes,useNavigate} from 'react-router-dom'
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
    // <Router>
    <div className="App">
      <Output />
      <Input/>
      {/* <InputCSS /> */}
      {/*uncomment this later..this is the homepage.commented to test single page */}
      {/* <SingleBlog/> */}
    </div>
    // </Router>
  );
}

export default App;
