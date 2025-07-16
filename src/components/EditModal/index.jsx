import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { STRINGS } from "../../constant/strings";

export default function EditModal({ editingEvent, setEditingEvent, handleSave }) {
  if (!editingEvent) return null;

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !editingEvent.tags.includes(tagInput.trim())) {
      setEditingEvent((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditingEvent((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateAndSave = () => {
    if (!editingEvent.name.trim()) {
      setError(STRINGS.VALIDATION.NAME_REQUIRED);
      return;
    }
    if (!editingEvent.location.trim()) {
      setError(STRINGS.VALIDATION.LOCATION_REQUIRED);
      return;
    }
    if (!editingEvent.organizer.trim()) {
      setError(STRINGS.VALIDATION.ORGANIZER_REQUIRED);
      return;
    }
    if (!editingEvent.startDate) {
      setError(STRINGS.VALIDATION.START_REQUIRED);
      return;
    }
    if (!editingEvent.endDate) {
      setError(STRINGS.VALIDATION.END_REQUIRED);
      return;
    }
    if (!editingEvent.maxAttendees || editingEvent.maxAttendees <= 0) {
      setError(STRINGS.VALIDATION.MAX_ATTENDEES);
      return;
    }
    if (editingEvent.tags.length === 0) {
      setError(STRINGS.VALIDATION.TAG_REQUIRED);
      return;
    }

    setError("");
    handleSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#8F87F1]">
            {editingEvent.id ? STRINGS.MODAL.EDIT_TITLE : STRINGS.MODAL.ADD_TITLE}
          </h3>

          <button
            onClick={() => setEditingEvent(null)}
            className="text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-3 font-medium">{error}</div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            placeholder={STRINGS.PLACEHOLDERS.EVENT_NAME}
            value={editingEvent.name}
            onChange={(e) =>
              setEditingEvent((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder={STRINGS.PLACEHOLDERS.LOCATION}
            value={editingEvent.location}
            onChange={(e) =>
              setEditingEvent((prev) => ({ ...prev, location: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder={STRINGS.PLACEHOLDERS.ORGANIZER}
            value={editingEvent.organizer}
            onChange={(e) =>
              setEditingEvent((prev) => ({
                ...prev,
                organizer: e.target.value,
              }))
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            value={editingEvent.startDate}
            onChange={(e) =>
              setEditingEvent((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="datetime-local"
            value={editingEvent.endDate}
            onChange={(e) =>
              setEditingEvent((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={editingEvent.type}
            onChange={(e) =>
              setEditingEvent((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <input
            type="number"
            placeholder={STRINGS.PLACEHOLDERS.MAX_ATTENDEES}
            value={editingEvent.maxAttendees}
            onChange={(e) =>
              setEditingEvent((prev) => ({
                ...prev,
                maxAttendees: e.target.value,
              }))
            }
            className="w-full border rounded px-3 py-2"
          />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {STRINGS.LABELS.TAGS}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={STRINGS.PLACEHOLDERS.TAG_INPUT}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-[#8F87F1] text-white px-3 py-2 rounded hover:bg-[#6f67d9]"
              >
                {STRINGS.MODAL.ADD_TAG}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editingEvent.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#C68EFD] text-white text-xs px-2 py-1 rounded flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-xs hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setEditingEvent(null)}
          >
            {STRINGS.MODAL.CANCEL}
          </button>
          <button
            className="bg-[#8F87F1] text-white px-4 py-2 rounded hover:bg-[#6f67d9]"
            onClick={validateAndSave}
          >
            {STRINGS.MODAL.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
}
