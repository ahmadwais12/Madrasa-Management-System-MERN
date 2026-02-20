import React, { useState, useMemo } from "react";
import Card from "../../components/UIHelper/Card";
import Button from "../../components/UIHelper/Button";
import Select from "../../components/UIHelper/Select";
import Input from "../../components/UIHelper/Input";
import Table from "../../components/UIHelper/Table";
import Badge from "../../components/UIHelper/Badge";

const initialStudents = [
  { id: 1, name: "Ahmad Ali", roll: "101", total: 100, obtained: "" },
  { id: 2, name: "Bilal Khan", roll: "102", total: 100, obtained: "" },
  { id: 3, name: "Omar Farooq", roll: "103", total: 100, obtained: "" },
];

const TeacherEnterMarks = () => {
  const [students, setStudents] = useState(initialStudents);

  const handleMarkChange = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, obtained: value }
          : student
      )
    );
  };

  const calculateGrade = (obtained, total) => {
    const percentage = (obtained / total) * 100;

    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const getStatus = (obtained, total) => {
    if (!obtained) return "-";
    return obtained / total >= 0.5 ? "Pass" : "Fail";
  };

  /* ================= Summary ================= */

  const summary = useMemo(() => {
    const validStudents = students.filter(s => s.obtained !== "");

    const average =
      validStudents.length > 0
        ? (
            validStudents.reduce(
              (sum, s) => sum + Number(s.obtained),
              0
            ) / validStudents.length
          ).toFixed(2)
        : 0;

    const passCount = validStudents.filter(
      (s) => s.obtained / s.total >= 0.5
    ).length;

    const failCount = validStudents.length - passCount;

    return { average, passCount, failCount };
  }, [students]);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Enter Marks</h1>

      {/* Filters */}
      <Card className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select label="Exam" options={["Midterm", "Final"]} />
        <Select label="Class" options={["Class A", "Class B"]} />
        <Select label="Subject" options={["Fiqh", "Hadith"]} />
        <div className="flex items-end">
          <Button>Load Students</Button>
        </div>
      </Card>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Class Average</p>
          <p className="text-2xl font-bold">{summary.average}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Pass</p>
          <p className="text-2xl font-bold text-green-600">
            {summary.passCount}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Fail</p>
          <p className="text-2xl font-bold text-red-600">
            {summary.failCount}
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Roll</th>
              <th>Total</th>
              <th>Obtained</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const grade =
                student.obtained !== ""
                  ? calculateGrade(student.obtained, student.total)
                  : "-";

              const status = getStatus(student.obtained, student.total);

              return (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.total}</td>
                  <td>
                    <Input
                      type="number"
                      value={student.obtained}
                      onChange={(e) =>
                        handleMarkChange(
                          student.id,
                          e.target.value
                        )
                      }
                      min="0"
                      max={student.total}
                    />
                  </td>
                  <td>{grade}</td>
                  <td>
                    {status === "Pass" && (
                      <Badge color="green">Pass</Badge>
                    )}
                    {status === "Fail" && (
                      <Badge color="red">Fail</Badge>
                    )}
                    {status === "-" && "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div className="flex justify-end mt-4">
          <Button variant="success">Save Marks</Button>
        </div>
      </Card>

    </div>
  );
};

export default TeacherEnterMarks;