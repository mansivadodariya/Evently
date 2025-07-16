import React, { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeEvents = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const eventsRef = collection(db, "users", currentUser.uid, "events");
        unsubscribeEvents = onSnapshot(eventsRef, (snapshot) => {
          const eventsData = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();

            return {
              id: docSnap.id,
              name: data.name || "",
              location: data.location || "",
              organizer: data.organizer || "",
              startDate: data.startDate || "",
              endDate: data.endDate || "",
              type: data.type || "Online",
              maxAttendees: data.maxAttendees || "",
              tags: data.tags || [],
            };
          });

          console.log("🔥 Events loaded from Firestore:", eventsData);
          setEvents(eventsData);
          setLoading(false);
        });
      } else {
        setEvents([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeEvents();
    };
  }, []);

  const addEvent = async (event) => {
    if (!user) return console.error("No user logged in!");
    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "events"),
        event
      );
      console.log("✅ Event added with ID:", docRef.id);
    } catch (error) {
      console.error("❌ Error adding event:", error);
    }
  };

  const editEvent = async (event) => {
    if (!user) return console.error("No user logged in!");
    if (!event.id) return console.error("Missing event ID for editing!");

    try {
      const { id, ...eventData } = event;
      await updateDoc(doc(db, "users", user.uid, "events", id), eventData);
      console.log("✅ Event updated:", id);
    } catch (error) {
      console.error("❌ Error updating event:", error);
    }
  };

  const deleteEvent = async (id) => {
    if (!user) return console.error("No user logged in!");
    if (!id) return console.error("Missing event ID for deleting!");

    try {
      await deleteDoc(doc(db, "users", user.uid, "events", id));
      console.log("✅ Event deleted:", id);
    } catch (error) {
      console.error("❌ Error deleting event:", error);
    }
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, editEvent, deleteEvent, loading, user }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => useContext(EventsContext);
