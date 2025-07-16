import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Chip,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  startDate: Yup.date().required("Start Date & Time is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End Date must be after Start Date")
    .required("End Date & Time is required"),
  organizer: Yup.string().required("Organizer Name is required"),
  type: Yup.string().required("Event Type is required"),
  maxAttendees: Yup.number()
    .positive("Must be positive")
    .integer("Must be an integer")
    .required("Maximum attendees required"),
  tags: Yup.array().min(1, "At least 1 tag required"),
});

export default function EventForm({ initialValues, onSubmit, onCancel }) {
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      location: initialValues?.location || "",
      startDate: initialValues?.startDate || dayjs(),
      endDate: initialValues?.endDate || dayjs(),
      organizer: initialValues?.organizer || "",
      type: initialValues?.type || "Online",
      maxAttendees: initialValues?.maxAttendees || "",
      tags: initialValues?.tags || [],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // Handle Tags
  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      formik.setFieldValue("tags", [...formik.values.tags, e.target.value]);
      e.target.value = "";
      e.preventDefault();
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((tag) => tag !== tagToDelete)
    );
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        margin: "auto",
        p: 3,
        bgcolor: "#F3ECFE",
        borderRadius: 2,
      }}
    >
      <TextField
        label="Event Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <TextField
        label="Location"
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />

      <DateTimePicker
        label="Start Date & Time"
        value={formik.values.startDate}
        onChange={(value) => formik.setFieldValue("startDate", value)}
        slotProps={{
          textField: {
            error:
              formik.touched.startDate && Boolean(formik.errors.startDate),
            helperText: formik.touched.startDate && formik.errors.startDate,
          },
        }}
      />

      <DateTimePicker
        label="End Date & Time"
        value={formik.values.endDate}
        onChange={(value) => formik.setFieldValue("endDate", value)}
        slotProps={{
          textField: {
            error: formik.touched.endDate && Boolean(formik.errors.endDate),
            helperText: formik.touched.endDate && formik.errors.endDate,
          },
        }}
      />

      <TextField
        label="Organizer Name"
        name="organizer"
        value={formik.values.organizer}
        onChange={formik.handleChange}
        error={formik.touched.organizer && Boolean(formik.errors.organizer)}
        helperText={formik.touched.organizer && formik.errors.organizer}
      />

      <FormControl>
        <InputLabel>Event Type</InputLabel>
        <Select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Maximum Attendees"
        name="maxAttendees"
        type="number"
        value={formik.values.maxAttendees}
        onChange={formik.handleChange}
        error={
          formik.touched.maxAttendees && Boolean(formik.errors.maxAttendees)
        }
        helperText={formik.touched.maxAttendees && formik.errors.maxAttendees}
      />

      <TextField
        label="Press Enter to Add Tags"
        onKeyDown={handleAddTag}
      />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {formik.values.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{ bgcolor: "#C68EFD", color: "white" }}
          />
        ))}
      </Box>
      {formik.touched.tags && formik.errors.tags && (
        <div style={{ color: "red", fontSize: "0.8rem" }}>
          {formik.errors.tags}
        </div>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          type="button"
          onClick={onCancel}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              "linear-gradient(to right, #8F87F1, #C68EFD, #E9A5F1)",
          }}
        >
          {initialValues ? "Update Event" : "Add Event"}
        </Button>
      </Box>
    </Box>
  );
}
