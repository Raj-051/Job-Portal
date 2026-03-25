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
    const Company_id = req.body.Company_id;

    const query = `INSERT INTO job_category (Jobcat_name, Jobcat_description, Company_id) VALUES (?, ?, ?)`;

    con.query(query, [Jobcat_name, Jobcat_description, Company_id], (err, result) => {
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
    const Company_id = req.body.Company_id;
    

    const query = `INSERT INTO job (job_title, Jobcat_id, skill, salary, end_date, description, location, jobtype, Company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(query, [job_title,Jobcat_id, skill, salary, end_date, description, location, jobtype, Company_id], (err, result) => {
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
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

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
    Skills,
    Company_name,
    Post,
    Duration,
    Work_description
  } = req.body;

  const Upload_photo = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO job_seeker 
    (Name, Contact_no, password, email, Address, Education, Experience,Upload_photo, company_name,post,Duration,skills,Work_description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  con.query(
    sql,
    [
      Name,
      Contact_no,
      password,
      email,
      Address,
      Education,
      Experience,
      Upload_photo,
      Company_name || "",
      Post || "",
      Duration || "",
      Work_description || "",
      Skills

    
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          status: "error",
          message: "Database error"
        });
      }

      res.json({
        status: "success",
        User_id: result.insertId
      });
    }
  );
});

const PDFDocument = require("pdfkit");

app.get("/api/generate-resume/:id", (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM job_seeker WHERE User_id=?";

  con.query(sql, [id], (err, result) => {

    if (err) return res.send("Database Error");
    if (result.length === 0) return res.send("User not found");

    const user = result[0];

    const doc = new PDFDocument({ margin: 30 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=resume_${id}.pdf`);

    doc.pipe(res);

    // ===== LEFT SIDEBAR =====
    doc.rect(0, 0, 180, 800).fill("#f0f0f0");

    // PHOTO
    if (user.Upload_photo) {
      try {
        const imgPath = path.join(__dirname, "public", user.Upload_photo);
        doc.image(imgPath, 40, 40, { width: 100, height: 100 });
      } catch (e) {}
    }

    // NAME
    doc
      .fillColor("#000")
      .fontSize(16)
      .text(user.Name, 20, 160, { width: 140, align: "center" });

    // CONTACT
    let yPosition = 225;

doc
  .fontSize(10)
  .fillColor("#000")
  .text(`Address: ${user.Address}`, 20, yPosition, {
    width: 140,
    lineGap: 4
  });

yPosition += 35;

doc.text(`Phone: ${user.Contact_no}`, 20, yPosition, {
  width: 140
});

yPosition += 20;

doc.text(`Email: ${user.email}`, 20, yPosition, {
  width: 140
});

    // SKILLS
    doc.text("Skills", 20, 320);
    doc.moveTo(20, 335).lineTo(160, 335).stroke();

    doc.text(user.skills || "N/A", 20, 345, {
      width: 140,
      lineGap: 4
    });

    // ===== RIGHT SIDE =====
    let startX = 200;

    // SUMMARY
    doc
      .fontSize(14)
      .fillColor("#333")
      .text("Professional Summary", startX, 40);

    doc.moveTo(startX, 60).lineTo(550, 60).stroke();

    doc
      .fontSize(11)
      .text(
        "Motivated MERN Stack Developer with experience in building full-stack web applications including job portals. Skilled in React, Node.js, Express, and MySQL. Passionate about developing scalable and user-friendly applications.",
        startX,
        70,
        { width: 350 }
      );

    // EXPERIENCE
    doc
      .fontSize(14)
      .text("Work Experience", startX, 140);

    doc.moveTo(startX, 160).lineTo(550, 160).stroke();

    doc
      .fontSize(11)
      .text(`Company: ${user.company_name || "-"}`, startX, 170);

    doc.text(`Role: ${user.post || "-"}`, startX, 190);
    doc.text(`Duration: ${user.Duration || "-"}`, startX, 210);

    doc.text(
      "Developed a Job Portal using MERN stack with features like authentication, job posting, job application, and resume generation.",
      startX,
      230,
      { width: 350 }
    );

    // EDUCATION
    doc
      .fontSize(14)
      .text("Education", startX, 300);

    doc.moveTo(startX, 320).lineTo(550, 320).stroke();

    doc
      .fontSize(11)
      .text(user.Education, startX, 330, { width: 350 });

    doc.end();
  });
});
//apply joblist
app.post("/api/applyjob", (req, res) => {
  const { Job_id, User_id } = req.body;

  // ✅ Check already applied
  const checkSql = "SELECT * FROM apply_job WHERE Job_id=? AND User_id=?";

  con.query(checkSql, [Job_id, User_id], (err, result) => {

    if (err) {
      console.log("CHECK ERROR:", err);
      return res.status(500).send("Database error");
    }

    if (result.length > 0) {
      return res.status(400).send("Already Applied");
    }

    // ✅ Always resolve Company_id from the job table
    // (prevents issues where frontend sends `0`/missing Company_id)
    const resolveCompanyIdSql = "SELECT Company_id FROM job WHERE Job_id = ?";

    // ✅ Insert into DB
    const insertSql = `
      INSERT INTO apply_job
      (Job_id, User_id, Company_id, Apply_date, Status)
      VALUES (?, ?, ?, NOW(), 0)
    `;

    con.query(resolveCompanyIdSql, [Job_id], (err, jobRows) => {
      if (err) {
        console.log("RESOLVE COMPANY_ID ERROR:", err);
        return res.status(500).send("Database error");
      }

      const companyFromJob = jobRows?.[0]?.Company_id;
      if (companyFromJob === null || companyFromJob === undefined) {
        return res.status(400).send("Company_id not found for this job");
      }

      con.query(
        insertSql,
        [Job_id, User_id, companyFromJob],
        (err, result) => {
          if (err) {
            console.log("INSERT ERROR:", err); // 🔥 CHECK THIS
            return res.status(500).send("Insert error");
          }
          return res.send("Applied Successfully");
        }
      );
    });

  });
});


app.get("/api/getappliedjobs/:userId", (req, res) => {

  const userId = req.params.userId;

  const sql = "SELECT Job_id, Company_id FROM apply_job WHERE User_id=?";

  con.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.send(result);
  });

});

const PORT = 1337;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
