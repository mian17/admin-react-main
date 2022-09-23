import "animate.css";
import AuthProvider from "./store/AuthProvider";
import Content from "./Widgets/Content";

function App() {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  );
}

export default App;
