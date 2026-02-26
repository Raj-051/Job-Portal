const mysql = require('mysql');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
app.use("/public", express.static("public"));
app.use(express.json());  // FIXED
app.use(cors());


// database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "job portal",   // check spelling
});



app.post("/api/jobcategories", (req, res) => {
    const Jobcat_name = req.body.Jobcat_name;
    const Jobcat_description = req.body.Jobcat_description;

    const query = `INSERT INTO job_category (Jobcat_name, Jobcat_description) VALUES (?, ?)`;

    con.query(query, [Jobcat_name, Jobcat_description], (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Error adding job category",
                error: err
            });
        }

        res.send({
            message: "Job category added successfully",
        });
    });
});
// job listing
app.post("/api/joblist", (req, res) => {
    const job_title = req.body.job_title;
    const Jobcat_id = req.body.Jobcat_id;
    const skill = req.body.skill;
    const salary = req.body.salary;
    const location = req.body.location;
    const end_date = req.body.end_date;
    const description = req.body.description;
    const jobtype = req.body.jobtype;
    

    const query = `INSERT INTO job (job_title, Jobcat_id, skill, salary, end_date, description, location, jobtype) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(query, [job_title,Jobcat_id, skill, salary, end_date, description, location, jobtype], (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Error adding job",
                error: err
            });
        }

        res.send({
            message: "Job added successfully",
        });
    });
});

//job category 
app.get("/api/getjobcategory", (req, res) => {
    const query = "SELECT * FROM job_category";
    con.query(query, (err, results) => {
        res.send(results);
    });
});

app.delete("/api/deletejobcategory/:id", (req, res) => {
    const categoryId = req.params.id;

    const sql = "DELETE FROM job_category WHERE Jobcat_id = ?";

    con.query(sql, [categoryId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Delete error" });
        }

        res.json({ message: "Deleted successfully" });
    });
});

app.put("/api/updatejobcategory/:id", (req, res) => {
  const id = req.params.id;
  const { Jobcat_name, Jobcat_description } = req.body;

  const sql = `
    UPDATE job_category
    SET Jobcat_name = ?, Jobcat_description = ?
    WHERE Jobcat_id = ?
  `;

  con.query(sql, [Jobcat_name, Jobcat_description, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Update error" });
    }

    res.json({ message: "Updated successfully" });
  });
});

//view job list
app.get("/api/getjoblist", (req, res) => {
    const query = "SELECT a.Jobcat_name,b.* FROM job_category as a,Job as b where a.Jobcat_id =b.Jobcat_id";
    con.query(query, (err, results) => {
        res.send(results);
    });
});
app.delete("/api/deletejob/:id", (req, res) => {
    const jobId = req.params.id;

    const sql = "DELETE FROM job WHERE Job_id = ?";

    con.query(sql, [jobId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Delete error" });
        }

        res.json({ message: "Deleted successfully" });
    });
});
// ================== MULTER CONFIG ==================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


// ================== DATABASE CONNECTION ==================


con.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// ================== COMPANY SIGNUP ==================
app.post("/api/signup", upload.single("id_proof"), (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const Company_name = req.body.Company_name;
    const Contact_no = req.body.Contact_no;
    const email = req.body.email;
    const Password = req.body.Password;
    const location = req.body.location;
    const website_URL = req.body.website_URL;
    const description = req.body.description;
    const Id_proof = req.file ? req.file.filename : null;
    const company_person_name = req.body.company_person_name;
    const company_person_contact = req.body.company_person_contact;

    if (
      !Company_name ||
      !Contact_no ||
      !email ||
      !Password ||
      !location ||
      !website_URL ||
      !description ||
      !Id_proof ||
      !company_person_name ||
      !company_person_contact
    ) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const query = `
      INSERT INTO company
      (Company_name, Contact_no, email, Password, location, website_URL, description, Id_proof, company_person_name, company_person_contact)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(
      query,
      [
        Company_name,
        Contact_no,
        email,
        Password,
        location,
        website_URL,
        description,
        Id_proof,
        company_person_name,
        company_person_contact,
      ],
      (err, result) => {
        if (err) {
          console.log("Database Error:", err);
          return res.status(500).send({
            message: "Database error",
          });
        }

        res.send({
          message: "Company registered successfully",
        });
      }
    );
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).send({ message: "Server error" });
  }
});
//admin dynamic login
app.get("/api/getemployers", (req, res) => {
  const sql = "SELECT * FROM company";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);
  });
});

const PORT = 1337;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
