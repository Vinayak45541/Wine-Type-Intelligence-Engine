import WineForm from "./components/WineForm";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f6f8",
      padding: "40px",
      fontFamily: "Inter, Arial, sans-serif",
      borderRadius: "8px"
    }}>

      <WineForm />
    </div>
  );
}

export default App;