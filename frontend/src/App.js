import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Events from "./pages/eventsPage/Events";
import EventDetails from "./pages/eventDetails/EventDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="*" element={<Navigate to="/events" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
