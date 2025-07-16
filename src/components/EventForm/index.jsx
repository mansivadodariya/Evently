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
import { STRINGS } from "../../constant/strings";

const validationSchema = Yup.object({
  name: Yup.string().required(STRINGS.VALIDATION.NAME_REQUIRED),
  description: Yup.string().required(STRINGS.VALIDATION.DESCRIPTION_REQUIRED),
  location: Yup.string().required(STRINGS.VALIDATION.LOCATION_REQUIRED),
  startDate: Yup.date().required(STRINGS.VALIDATION.START_REQUIRED),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), STRINGS.VALIDATION.END_AFTER_START)
    .required(STRINGS.VALIDATION.END_REQUIRED),
  organizer: Yup.string().required(STRINGS.VALIDATION.ORGANIZER_REQUIRED),
  type: Yup.string().required(STRINGS.VALIDATION.TYPE_REQUIRED),
  maxAttendees: Yup.number()
    .positive(STRINGS.VALIDATION.MAX_ATTENDEES_POSITIVE)
    .integer(STRINGS.VALIDATION.MAX_ATTENDEES_INTEGER)
    .required(STRINGS.VALIDATION.MAX_ATTENDEES_REQUIRED),
  tags: Yup.array().min(1, STRINGS.VALIDATION.TAG_REQUIRED),
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
        label={STRINGS.PLACEHOLDERS.EVENT_NAME}
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        label={STRINGS.PLACEHOLDERS.DESCRIPTION}
        name="description"
        multiline
        rows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <TextField
        label={STRINGS.PLACEHOLDERS.LOCATION}
        name="location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />

      <DateTimePicker
        label={STRINGS.PLACEHOLDERS.START_DATE}
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
        label={STRINGS.PLACEHOLDERS.END_DATE}
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
        label={STRINGS.PLACEHOLDERS.ORGANIZER}
        name="organizer"
        value={formik.values.organizer}
        onChange={formik.handleChange}
        error={formik.touched.organizer && Boolean(formik.errors.organizer)}
        helperText={formik.touched.organizer && formik.errors.organizer}
      />

      <FormControl>
        <InputLabel>{STRINGS.LABELS.EVENT_TYPE}</InputLabel>
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
        label={STRINGS.PLACEHOLDERS.MAX_ATTENDEES}
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
        label={STRINGS.PLACEHOLDERS.TAG_INPUT}
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
          {STRINGS.MODAL.CANCEL}
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              "linear-gradient(to right, #8F87F1, #C68EFD, #E9A5F1)",
          }}
        >
          {initialValues ? STRINGS.LABELS.UPDATE_EVENT : STRINGS.LABELS.ADD_EVENT}
        </Button>
      </Box>
    </Box>
  );
}
