import React from "react";
import Card from "../../components/UIHelper/Card";
import Badge from "../../components/UIHelper/Badge";
import Table from "../../components/UIHelper/Table";

const TeacherViewResults = () => {
  const results = [
    { id: 1, name: "Ahmad Ali", total: 100, obtained: 85 },
    { id: 2, name: "Bilal Khan", total: 100, obtained: 45 },
    { id: 3, name: "Omar Farooq", total: 100, obtained: 70 },
  ];

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">View Results</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-2xl font-bold">30</h2>
        </Card>

        <Card className="text-center">
          <p className="text-gray-500">Passed</p>
          <h2 className="text-2xl font-bold text-green-600">24</h2>
        </Card>

        <Card className="text-center">
          <p className="text-gray-500">Failed</p>
          <h2 className="text-2xl font-bold text-red-600">6</h2>
        </Card>

        <Card className="text-center">
          <p className="text-gray-500">Average</p>
          <h2 className="text-2xl font-bold">72%</h2>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Total</th>
              <th>Obtained</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((student, index) => {
              const percentage =
                (student.obtained / student.total) * 100;

              const isPass = percentage >= 50;

              return (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.total}</td>
                  <td>{student.obtained}</td>
                  <td>{percentage}%</td>
                  <td>
                    {percentage >= 80
                      ? "A"
                      : percentage >= 60
                      ? "B"
                      : percentage >= 50
                      ? "C"
                      : "F"}
                  </td>
                  <td>
                    <Badge color={isPass ? "green" : "red"}>
                      {isPass ? "Pass" : "Fail"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

    </div>
  );
};

export default TeacherViewResults;