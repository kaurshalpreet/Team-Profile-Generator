// Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employees = [];

const render = require("./lib/htmlRenderer");

addMember();

// code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addMember() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Team Member's name.",
        name: "name",
      },
      {
        type: "list",
        message: "Select Team Member's Role.",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        type: "input",
        message: "Enter Team Member's Id.",
        name: "id",
      },
      {
        type: "input",
        message: "Enter Team Member's email address.",
        name: "email",
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else if (role === "Intern") {
        roleInfo = "School Name";
      } else {
        roleInfo = "Office Phone Number";
      }
      inquirer
        .prompt([
          {
            message: `Enter Team Member's ${roleInfo}`,
            name: "roleInfo",
          },
          {
            type: "list",
            message: "Would you like to add more Team Members?",
            choices: ["Yes", "No"],
            name: "addMembers",
          },
        ])
        .then(function ({ roleInfo, addMembers }) {
          let newMember;
          if (role === "Engineer") {
            newMember = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newMember = new Intern(name, id, email, roleInfo);
          } else {
            newMember = new Manager(name, id, email, roleInfo);
          }
          employees.push(newMember);
          console.log(employees);

          if (addMembers === "Yes") {
            addMember();
          } else {
            const html = render(employees);
            fs.writeFile("./output/team.html", html, function (err) {
              if (err) {
                console.log(err);
              }
            });
            console.log("end");
          }
        });
    });
}
