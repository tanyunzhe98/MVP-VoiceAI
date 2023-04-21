import React from "react";
import ReactDOM from "react-dom";
import Mainpage from "./Components/Mainpage";
import ChatPage from "./Components/ChatPage";

enum Page {
  MAIN,
  CHAT,
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MAIN);

  const handlePageChange = (newPage: Page) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "200%",
          transform: `translateX(-${currentPage * 50}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <div style={{ width: "50%" }}>
          <Mainpage onPageChange={() => handlePageChange(Page.CHAT)} />
        </div>
        <div style={{ width: "50%" }}>
          <ChatPage onPageChange={() => handlePageChange(Page.MAIN)} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
