import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { STRINGS } from "../../constant/strings";

export default function EventTable({ events, handleEdit, handleDelete }) {
  const formatDate = (date) => {
    if (!date) return "N/A";
    if (date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    }
    return date;
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1] text-white text-left">
          <tr>
            {STRINGS.TABLE.HEADERS.map((head) => (
              <th key={head} className="px-6 py-3 font-medium tracking-wide">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {events?.length > 0 ? (
            events.map((event, index) => (
              <tr
                key={event.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-[#FED2E2]/30 transition`}
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {event.name || "Untitled"}
                </td>
                <td className="px-6 py-4">{event.location || "—"}</td>
                <td className="px-6 py-4">{formatDate(event.startDate)}</td>
                <td className="px-6 py-4">{formatDate(event.endDate)}</td>
                <td className="px-6 py-4">{event.organizer || "—"}</td>
                <td className="px-6 py-4">{event.type || "—"}</td>
                <td className="px-6 py-4">{event.maxAttendees || 0}</td>
                <td className="px-6 py-4 flex flex-wrap gap-1">
                  {(event.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#C68EFD] text-white text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-[#8F87F1] text-white px-3 py-1 rounded hover:bg-[#6f67d9]"
                    onClick={() => handleEdit(event)}
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-[#D9534F] text-white px-3 py-1 rounded hover:bg-[#c9302c]"
                    onClick={() => handleDelete(event.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="text-center text-gray-500 py-6 italic"
              >
                {STRINGS.TABLE.NO_EVENTS}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
