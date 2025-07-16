export const STRINGS = {
  APP: {
    NAME: "Evently",
    LOGOUT: "Logout",
    GUEST: "Guest",
  },

  SIDEBAR: {
    MENU: {
      DASHBOARD: "Dashboard",
      EVENTS: "Events",
    },
  },

  SEARCH_FILTER: {
    PLACEHOLDER: "Search by name or location...",
    FILTERS: ["All", "Online", "Offline"],
  },

  TABLE: {
    HEADERS: [
      "Event Name",
      "Location",
      "Start",
      "End",
      "Organizer",
      "Type",
      "Max",
      "Tags",
      "Edit",
      "Delete",
    ],
    NO_EVENTS: "No events found",
    UNTITLED: "Untitled",
  },

  MODAL: {
    CANCEL: "Cancel",
    SAVE: "Save",
    ADD_TAG: "ADD",
  },

  PLACEHOLDERS: {
    EVENT_NAME: "Event Name",
    DESCRIPTION: "Description",
    LOCATION: "Location",
    START_DATE: "Start Date & Time",
    END_DATE: "End Date & Time",
    ORGANIZER: "Organizer Name",
    MAX_ATTENDEES: "Maximum Attendees",
    TAG_INPUT: "Press Enter to Add Tags",
    EMAIL: "Email",
    PASSWORD: "Password",
    USERNAME: "Username",
  },

  LABELS: {
    TAGS: "Tags",
    EVENT_TYPE: "Event Type",
    UPDATE_EVENT: "Update Event",
    ADD_EVENT: "Add Event",
    MANAGE_EVENTS: "Manage Events",
    ALL_EVENTS: "All Events",
  },

  VALIDATION: {
    NAME_REQUIRED: "Event Name is required",
    DESCRIPTION_REQUIRED: "Description is required",
    LOCATION_REQUIRED: "Location is required",
    START_REQUIRED: "Start Date & Time is required",
    END_REQUIRED: "End Date & Time is required",
    END_AFTER_START: "End Date must be after Start Date",
    ORGANIZER_REQUIRED: "Organizer Name is required",
    TYPE_REQUIRED: "Event Type is required",
    MAX_ATTENDEES_REQUIRED: "Maximum attendees required",
    MAX_ATTENDEES_POSITIVE: "Must be positive",
    MAX_ATTENDEES_INTEGER: "Must be an integer",
    TAG_REQUIRED: "At least 1 tag required",
  },

  STATS: {
    TOTAL: "Total Events",
    ONLINE: "Online Events",
    OFFLINE: "Offline Events",
    WEEKLY_TREND: "Weekly Events Trend (Online vs Offline)",
  },

  AUTH: {
    LOGIN: "Login",
    SIGNUP: "Sign Up",
    SWITCH_TO_LOGIN: "Already have an account?",
    SWITCH_TO_SIGNUP: "Don't have an account?",
  },

  ALERTS: {
    CONFIRM_DELETE: "Are you sure you want to delete this event?",
    NAME_REQUIRED: "Event name is required!",
    ID_MISSING: "Event ID missing! Please refresh or wait for sync.",
    EDIT_ID_MISSING: "Cannot edit this event. Please refresh the page.",
  },

  LOADING: "Loading events...",
};
