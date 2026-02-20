import React, { useState, useMemo } from "react";
import Card from "../../components/UIHelper/Card";
import Badge from "../../components/UIHelper/Badge";
import Button from "../../components/UIHelper/Button";
import Table from "../../components/UIHelper/Table";
import Search from "../../components/UIHelper/Search";
import Select from "../../components/UIHelper/Select";
import Modal from "../../components/UIHelper/Modal";
import Avatar from "../../components/UIHelper/Avatar";
import Input from "../../components/UIHelper/Input";

const initialComplaints = [
  {
    id: 1,
    code: "CMP-001",
    subject: "Classroom Noise Disturbance",
    complainant: "Ahmad Khan",
    type: "student",
    priority: "high",
    status: "open",
    date: "2026-02-10",
    description:
      "Students from the next class are making noise during lecture hours which affects concentration.",
  },
  {
    id: 2,
    code: "CMP-002",
    subject: "Library Timing Issue",
    complainant: "Fatima Noor",
    type: "student",
    priority: "medium",
    status: "in_progress",
    date: "2026-02-08",
    description:
      "Library closing time is too early. Students need extended hours before exams.",
  },
  {
    id: 3,
    code: "CMP-003",
    subject: "Exam Paper Mistake",
    complainant: "Teacher Bilal",
    type: "staff",
    priority: "high",
    status: "closed",
    date: "2026-02-01",
    description:
      "There was a printing mistake in question number 5 of the midterm exam.",
  },
  {
    id: 4,
    code: "CMP-004",
    subject: "Dormitory Water Problem",
    complainant: "Ali Rahman",
    type: "student",
    priority: "low",
    status: "open",
    date: "2026-02-12",
    description:
      "Water supply in dormitory block B is inconsistent during evening hours.",
  },
];

const AssignedComplaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [newComplaint, setNewComplaint] = useState({
    subject: "",
    complainant: "",
    priority: "medium",
  });

  /* ================= FILTER + SEARCH ================= */
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.complainant.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "" || c.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchTerm, filterStatus]);

  /* ================= STATS ================= */
  const total = complaints.length;
  const open = complaints.filter((c) => c.status === "open").length;
  const inProgress = complaints.filter(
    (c) => c.status === "in_progress"
  ).length;
  const closed = complaints.filter((c) => c.status === "closed").length;

  /* ================= ADD NEW ================= */
  const handleCreateComplaint = () => {
    if (!newComplaint.subject || !newComplaint.complainant) return;

    const newItem = {
      id: Date.now(),
      code: `CMP-${String(total + 1).padStart(3, "0")}`,
      subject: newComplaint.subject,
      complainant: newComplaint.complainant,
      type: "student",
      priority: newComplaint.priority,
      status: "open",
      date: new Date().toISOString().split("T")[0],
      description: "New complaint created manually.",
    };

    setComplaints([newItem, ...complaints]);
    setShowNewModal(false);
    setNewComplaint({ subject: "", complainant: "", priority: "medium" });
  };

  /* ================= RESOLVE ================= */
  const markResolved = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "closed" } : c
      )
    );
    setSelectedComplaint(null);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assigned Complaints</h1>
        <Button onClick={() => setShowNewModal(true)}>
          + New Complaint
        </Button>
      </div>

      {/* FILTERS */}
      <Card>
        <div className="flex gap-4">
          <Search
            placeholder="Search complaints..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            options={[
              { label: "All Status", value: "" },
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in_progress" },
              { label: "Closed", value: "closed" },
            ]}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Card><p className="text-xl font-bold">{total}</p><p>Total</p></Card>
        <Card><p className="text-xl font-bold text-red-500">{open}</p><p>Open</p></Card>
        <Card><p className="text-xl font-bold text-yellow-500">{inProgress}</p><p>In Progress</p></Card>
        <Card><p className="text-xl font-bold text-green-500">{closed}</p><p>Closed</p></Card>
      </div>

      {/* TABLE */}
      <Card>
        <Table
          headers={["Code", "Subject", "Complainant", "Priority", "Status", "Date", "Action"]}
          data={filteredComplaints.map((item) => [
            item.code,
            item.subject,
            <div className="flex items-center gap-2">
              <Avatar name={item.complainant} />
              {item.complainant}
            </div>,
            <Badge type={item.priority}>{item.priority}</Badge>,
            <Badge type={item.status}>{item.status}</Badge>,
            item.date,
            <Button onClick={() => setSelectedComplaint(item)}>View</Button>,
          ])}
        />
      </Card>

      {/* VIEW MODAL */}
      {selectedComplaint && (
        <Modal onClose={() => setSelectedComplaint(null)}>
          <h2 className="text-xl font-bold mb-4">
            {selectedComplaint.subject}
          </h2>
          <p><strong>Code:</strong> {selectedComplaint.code}</p>
          <p><strong>Status:</strong> {selectedComplaint.status}</p>
          <p><strong>Priority:</strong> {selectedComplaint.priority}</p>
          <p className="mt-4">{selectedComplaint.description}</p>

          {selectedComplaint.status !== "closed" && (
            <div className="mt-6 flex justify-end">
              <Button onClick={() => markResolved(selectedComplaint.id)}>
                Mark as Resolved
              </Button>
            </div>
          )}
        </Modal>
      )}

      {/* NEW COMPLAINT MODAL */}
      {showNewModal && (
        <Modal onClose={() => setShowNewModal(false)}>
          <h2 className="text-xl font-bold mb-4">Create Complaint</h2>

          <Input
            label="Subject"
            value={newComplaint.subject}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, subject: e.target.value })
            }
          />

          <Input
            label="Complainant Name"
            value={newComplaint.complainant}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, complainant: e.target.value })
            }
          />

          <Select
            label="Priority"
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
            onChange={(e) =>
              setNewComplaint({ ...newComplaint, priority: e.target.value })
            }
          />

          <div className="mt-6 flex justify-end">
            <Button onClick={handleCreateComplaint}>
              Create
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AssignedComplaints;