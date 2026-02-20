import React from "react";
import Card from "../../components/UIHelper/Card";
import Button from "../../components/UIHelper/Button";
import { useNavigate } from "react-router-dom";

const TeacherResults = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Enter Marks */}
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Enter Marks</h2>
          <p className="text-gray-600 text-sm">
            Enter and save exam marks for your students.
          </p>
          <Button onClick={() => navigate("enter-marks")}>
            Go to Enter Marks
          </Button>
        </Card>

        {/* View Results */}
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">View Results</h2>
          <p className="text-gray-600 text-sm">
            View final results of your classes and subjects.
          </p>
          <Button variant="secondary" onClick={() => navigate("view-results")}>
            Go to View Results
          </Button>
        </Card>

      </div>
    </div>
  );
};

export default TeacherResults;