import { useState } from "react";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Menu from "./components/Menu";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import AnecdoteInfo from "./components/AnecdoteInfo";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const navigate = useNavigate();

  const match = useMatch("/anecdotes/:id");

  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`Added ${anecdote.content}`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p style={{ margin: 10 }}>{notification}</p>
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteInfo anecdote={anecdote} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
