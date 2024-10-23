import React, { useState } from "react";
import EmployeeRegisterForm from "./components/EmployeeRegisterForm";
import EmployeeRegister from "./components/EmployeeRegister";
import SearchEmployee from "./components/SearchEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import "./App.css";
import axios from "axios";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [view, setView] = useState("Registration Form");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState("SignIn");

  const addEmployee = (employeeData) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, employeeData];
      setFilteredEmployees(updatedEmployees);
      return updatedEmployees;
    });
  };

  const deleteEmployee = async (id, index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/deleteEmployee/${id}`);
        setEmployees((prevEmployees) => {
          const updatedEmployees = prevEmployees.filter((_, i) => i !== index);
          setFilteredEmployees(updatedEmployees);
          return updatedEmployees;
        });
        alert("Employee successfully deleted");
      } catch (error) {
        console.error("Error in deleting employee:", error.message);
        alert("Failed to delete the employee.");
      }
    }
  };

  const updateEmployee = (index, updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const newEmployees = [...prevEmployees];
      newEmployees[index] = updatedEmployee;
      setFilteredEmployees(newEmployees);
      return newEmployees;
    });
    setEmployeeToEdit(null);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = employees.filter(
        (employee) =>
          employee.idNumber && employee.idNumber.includes(searchTerm)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  const handleEditEmployee = (employee, index) => {
    setEmployeeToEdit({ employee, index });
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setAuthView(null);
    setView("Registration Form");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setView("SignIn");
  };

  const renderAuthView = () => {
    switch (authView) {
      case "SignIn":
        return <SignIn onSignIn={handleSignIn} />;
      case "SignUp":
        return <SignUp onSignIn={handleSignIn} />;
      case "ResetPassword":
        return <ResetPassword onBack={() => setAuthView("SignIn")} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Employee Registration App</h1>

      <div className="App-container">
        <aside className="sidebar">
          {isLoggedIn && (
            <>
              <button
                className={`registration-button ${
                  view === "Registration Form" ? "active" : ""
                }`}
                onClick={() => setView("Registration Form")}
              >
                Employee Registration
              </button>
              <button
                className={`view-employees-button ${
                  view === "Employee Register" ? "active" : ""
                }`}
                onClick={() => setView("Employee Register")}
              >
                View Employees
              </button>

              {isLoggedIn && (
                <button className="sign-out-button" onClick={handleSignOut}>
                  Logout
                </button>
              )}
            </>
          )}

          {!isLoggedIn && (
            <>
              <button
                className={`signIn-button ${
                  authView === "SignIn" ? "active" : ""
                }`}
                onClick={() => setAuthView("SignIn")}
              >
                Login
              </button>
              <button
                className={`signUp-button ${
                  authView === "SignUp" ? "active" : ""
                }`}
                onClick={() => setAuthView("SignUp")}
              >
                Sign Up
              </button>
              <button
                className={`reset-button ${
                  authView === "ResetPassword" ? "active" : ""
                }`}
                onClick={() => setAuthView("ResetPassword")}
              >
                Forgot Password
              </button>
            </>
          )}
        </aside>

        <main className="content">
          {!isLoggedIn ? (
            renderAuthView()
          ) : (
            <>
              {view === "Registration Form" && (
                <EmployeeRegisterForm onAddEmployee={addEmployee} />
              )}
              {view === "Employee Register" && (
                <>
                  <SearchEmployee onSearch={handleSearch} />
                  <EmployeeRegister
                    employees={filteredEmployees}
                    onDeleteEmployee={(id, index) => deleteEmployee(id, index)}
                    onEditEmployee={handleEditEmployee}
                  />
                </>
              )}
            </>
          )}
        </main>

        {employeeToEdit && (
          <UpdateEmployee
            employeeData={employeeToEdit}
            onUpdateEmployee={(updatedData) => {
              updateEmployee(employeeToEdit.index, updatedData);
              setEmployeeToEdit(null);
            }}
            onCancel={() => setEmployeeToEdit(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
