import React from "react";
import UserContext from "./UserContext";
import ReactDOM from "react-dom";
import Mainpage from "./Components/Mainpage";
import ChatPage from "./Components/ChatPage";

enum Page {
  MAIN,
  CHAT,
}

const App: React.FC = () => {
  const [user, setUser] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MAIN);

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", width: "200%", transform: `translateX(-${currentPage * 50}%)`, transition: "transform 0.5s ease-in-out", height: "100%" }}>
        <div style={{ width: "50%", height: "100%" }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Mainpage onPageChange={() => handlePageChange(Page.CHAT)} />
          </UserContext.Provider>
        </div>
        <div style={{ width: "50%", height: "100%" }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ChatPage onPageChange={() => handlePageChange(Page.MAIN)} />
          </UserContext.Provider>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
