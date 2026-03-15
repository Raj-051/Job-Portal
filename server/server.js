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

//editjob category
app.post("/api/editjobcategory", (req, res) => {
  const Jobcat_id = req.body.Jobcat_id;
  const query = "SELECT * FROM job_category WHERE Jobcat_id = ?";

  con.query(query, [Jobcat_id], (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'An error occurred while fetching the job category' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Job category not found' });
    }
    res.send(results[0]);
  });
});

app.post("/api/updatejobcategory", (req, res) => {

  const Jobcat_id = req.body.Jobcat_id;
  const Jobcat_name = req.body.Jobcat_name;
  const Jobcat_description = req.body.Jobcat_description;

  const query = "UPDATE job_category SET Jobcat_name=?, Jobcat_description=? WHERE Jobcat_id=?";

  con.query(query, [Jobcat_name, Jobcat_description, Jobcat_id], (err, result) => {

    if (err) {
      return res.status(500).send({ error: "Error updating category" });
    }

    res.send({ message: "Category updated successfully" });

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

//editjoblist
app.post("/api/editjoblist",(req,res)=>{

const Job_id = req.body.Job_id;

const query = "SELECT * FROM job WHERE Job_id=?";

con.query(query,[Job_id],(err,results)=>{

if(err){
return res.status(500).send({error:"Database error"});
}

res.send(results[0]);

});

});
app.post("/api/updatejoblist",(req,res)=>{

const {
Job_id,
job_title,
Jobcat_id,
skill,
salary,
location,
end_date,
description,
jobtype
} = req.body;

const query = `
UPDATE job
SET job_title=?, Jobcat_id=?, skill=?, salary=?, location=?, end_date=?, description=?, jobtype=?
WHERE Job_id=?`;

con.query(
query,
[job_title,Jobcat_id,skill,salary,location,end_date,description,jobtype,Job_id],
(err,result)=>{

if(err){
return res.status(500).send({error:"Update error"});
}

res.send({message:"Job updated successfully"});

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
app.post("/api/signup", upload.single("Id_proof"), (req, res) => {
  
  

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

    const checkQuery = "SELECT * FROM company WHERE email=?";
    con.query(checkQuery,[email],(err,results)=>{
      if(err) {
        return res.status(500).send({message:"error to check email"});
      }
      if(results.length>0){
        return res.status(400).send({message:"email already exits"});
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
          if(err) {
            return res.status(500).send({message:"error to insert data"});
          }
          return res.status(200).send({message:"data inserted successfully",result});
        }
      );
    });
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

app.post("/api/approveemployer", (req, res) => {
  const { Company_id} = req.body;

  const query = "UPDATE company SET status = 1 WHERE Company_id = ?";

  con.query(query, [Company_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company approved successfully" });
  });
});

app.post("/api/rejectemployer", (req, res) => {
  const { Company_id} = req.body;

  const query = "UPDATE company SET status = 2 WHERE Company_id = ?";

  con.query(query, [Company_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company rejected successfully" });
  });
});

//company login
app.post("/api/companylogin", (req, res) => {

  const { email, Password } = req.body;

  const sql = "SELECT * FROM company WHERE email=? AND Password=?";

  con.query(sql, [email, Password], (err, result) => {

    if (err) {
      return res.json({
        status: "error",
        message: "Database error"
      });
    }

    if (result.length === 0) {
      return res.json({
        status: "error",
        message: "Invalid Email or Password"
      });
    }

    if (result[0].status != 1) {
      return res.json({
        status: "error",
        message: "Your account has not been approved by admin"
      });
    }

    res.json({
      status: "success",
      company: result[0]
    });

  });

});
//userlogin
app.post("/api/userlogin", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM job_seeker WHERE email=? AND password=?";

  con.query(sql, [email, password], (err, result) => {

    if (err) {
      return res.json({
        status: "error",
        message: "Database error"
      });
    }

    if (result.length > 0) {
      res.json({
        status: "success",
        user: result[0]
      });
    } else {
      res.json({
        status: "error",
        message: "Invalid Email or Password"
      });
    }

  });
});


//user signup


// USER SIGNUP API
app.post("/api/usersignup", upload.single("Upload_photo"), (req, res) => {

  const {
    Name,
    Contact_no,
    email,
    password,
    Address,
    Education,
    Experience,
    Projects
  } = req.body;

  const Upload_photo = req.file ? req.file.filename : "";

  const sql = `
  INSERT INTO job_seeker 
  (Name, Contact_no, password, email, Address, Education, Experience, Projects, Upload_photo) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  con.query(
  sql,
  [Name,Contact_no,password,email,Address,Education,Experience,Projects,Upload_photo],
  (err,result)=>{

    if(err){
      console.log(err);
      return res.json({
        status:"error",
        message:"Database error"
      });
    }

    res.json({
      status:"success",
      User_id: result.insertId
    });

});
    }
  );

const PDFDocument = require("pdfkit");
const fs = require("fs");

app.get("/api/generate-resume/:id", (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM job_seeker WHERE User_id=?";

  con.query(sql,[id],(err,result)=>{

    if(err){
      console.log(err);
      return res.send("Database Error");
    }

    const user = result[0];

    const filePath = path.join(__dirname,"public/resumes",`resume_${id}.pdf`);

    const doc = new PDFDocument({margin:50});

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // HEADER
    doc
      .fontSize(26)
      .fillColor("#2c3e50")
      .text(user.Name, {align:"center"});

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor("gray")
      .text(`${user.email} | ${user.Contact_no}`, {align:"center"});

    doc.moveDown(1);

    // LINE
    doc.moveTo(50,120).lineTo(550,120).stroke();

    doc.moveDown(2);

    // PROFILE SECTION
    doc
      .fontSize(16)
      .fillColor("#2c3e50")
      .text("PROFILE");

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor("black")
      .text(`Address: ${user.Address}`);

    doc.moveDown();

    // EDUCATION
    doc
      .fontSize(16)
      .fillColor("#2c3e50")
      .text("EDUCATION");

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(user.Education);

    doc.moveDown();

    // EXPERIENCE
    doc
      .fontSize(16)
      .fillColor("#2c3e50")
      .text("EXPERIENCE");

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(user.Experience);

    doc.moveDown();

    // PROJECTS
    doc
      .fontSize(16)
      .fillColor("#2c3e50")
      .text("PROJECTS");

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .text(user.Projects);

    doc.end();

    stream.on("finish", ()=>{
      res.sendFile(filePath);
    });

  });

});




const PORT = 1337;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
