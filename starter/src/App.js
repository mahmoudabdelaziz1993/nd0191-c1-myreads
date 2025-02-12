import "./App.css";
import BookAdd from "./pages/BookAdd";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { ShelfProvider } from "./context/ShelfContext";
import BookDetails from "./pages/BookDetails";

function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <ShelfProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" element={<BookAdd />} />
          <Route path="/Book/:id" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ShelfProvider>
  );
}

export default App;
