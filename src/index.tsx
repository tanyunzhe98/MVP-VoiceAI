import React from "react";
import ReactDOM from "react-dom";
import Mainpage from './Components/Mainpage';
import ChatPage from './Components/ChatPage';

const App: React.FC = () => {
return (
<div>
<Mainpage />
<ChatPage />
</div>
)
}

ReactDOM.render(<App />, document.getElementById("root"));
