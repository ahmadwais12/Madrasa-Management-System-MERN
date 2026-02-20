import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/UIHelper/Card";
import Button from "../../components/UIHelper/Button";
import Input from "../../components/UIHelper/Input";
import Select from "../../components/UIHelper/Select";

const CreateAssignment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subjectId: "",
    description: "",
    deadline: "",
    totalStudents: "",
    status: "draft"
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.subjectId || !form.deadline) {
      alert("Please fill required fields");
      return;
    }

    const saved =
      JSON.parse(localStorage.getItem("teacher_assignments")) || [];

    const newAssignment = {
      ...form,
      id: Date.now(),
      submissions: 0,
      totalStudents: Number(form.totalStudents || 0)
    };

    const updated = [...saved, newAssignment];

    localStorage.setItem(
      "teacher_assignments",
      JSON.stringify(updated)
    );

    navigate("/teacher/assignments");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Create Assignment
      </h1>

      <Card className="p-6 space-y-4">

        <Input
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <Select
          label="Subject"
          options={[
            { label: "Quran Tafsir", value: 1 },
            { label: "Hadith Studies", value: 2 },
            { label: "Fiqh", value: 3 }
          ]}
          value={form.subjectId}
          onChange={(e) => handleChange("subjectId", e.target.value)}
        />

        <Input
          label="Deadline"
          type="date"
          value={form.deadline}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />

        <Input
          label="Total Students"
          type="number"
          value={form.totalStudents}
          onChange={(e) =>
            handleChange("totalStudents", e.target.value)
          }
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />
        </div>

        <Select
          label="Status"
          options={[
            { label: "Draft", value: "draft" },
            { label: "Active", value: "active" }
          ]}
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Create Assignment
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default CreateAssignment;