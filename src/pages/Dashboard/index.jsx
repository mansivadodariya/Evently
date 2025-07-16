import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SearchFilter from "../../components/SearchFilter";
import EventTable from "../../components/EventTable/inde";
import EditModal from "../../components/EditModal";
import DashboardStatsWithGraph from "../../components/Graphs";
import { useEvents } from "../../context/context";
import { STRINGS } from "../../constant/strings";

export default function Dashboard() {
  const { events, addEvent, editEvent, deleteEvent, loading } = useEvents();

  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [newEventMode, setNewEventMode] = useState(false);

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
    setNewEventMode(false);
  };

  const handleAddEvent = () => {
    setEditingEvent({
      id: null,
      name: "",
      location: "",
      organizer: "",
      startDate: "",
      endDate: "",
      type: "Online",
      maxAttendees: "",
      tags: [],
    });
    setNewEventMode(true);
  };

  const handleSave = () => {
    if (!editingEvent.name.trim()) {
      alert(STRINGS.ALERTS.NAME_REQUIRED);
      return;
    }

    if (newEventMode) {
      const { id, ...eventData } = editingEvent;
      addEvent(eventData);
    } else {
      if (!editingEvent.id) {
        alert(STRINGS.ALERTS.EDIT_ID_MISSING);
        return;
      }
      editEvent(editingEvent);
    }

    setEditingEvent(null);
    setNewEventMode(false);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "All" ? true : event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <p className="text-center mt-6">{STRINGS.LOADING}</p>;

  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#8F87F1] mb-4">
        {STRINGS.LABELS.ALL_EVENTS}
      </h2>
      <DashboardStatsWithGraph events={events} />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <EventTable
        events={filteredEvents}
        handleEdit={handleEdit}
        handleDelete={deleteEvent}
      />

      <button
        onClick={handleAddEvent}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1]
                   text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <FaPlus className="text-xl" />
      </button>

      {editingEvent && (
        <EditModal
          editingEvent={editingEvent}
          setEditingEvent={setEditingEvent}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
