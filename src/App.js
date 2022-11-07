import "animate.css";
import AuthProvider from "./store/AuthProvider";
import Content from "./Widgets/Content";
import MessageProvider from "./store/MessageProvider";

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Content />
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
