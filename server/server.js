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
app.post("/api/getjoblist", (req, res) => {
  const { Company_id } = req.body;

  const query = `
    SELECT a.Jobcat_name, b.*
    FROM job_category as a
    INNER JOIN job as b ON a.Jobcat_id = b.Jobcat_id
    WHERE b.Company_id = ?
  `;

  con.query(query, [Company_id], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database error" });
    }
    res.send(results);
  });
});

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
  skills,          // ✅ FIX
  company_name,    // ✅ FIX
  post,            // ✅ FIX
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
      company_name || "",
      post || "",
      Duration || "",
      skills || "",
      Work_description 
      

    
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

// 🔥 GENERATE RESUME
app.get("/api/generate-resume/:id", (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM job_seeker WHERE User_id=?";

  con.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = result[0];

    // 🔥 CREATE PDF
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=resume_${id}.pdf`
    );

    doc.pipe(res);

    // =========================
    // 🔥 HEADER
    // =========================

    // IMAGE
    if (user.Upload_photo) {
      try {
        const imgPath = path.join(__dirname, "public", user.Upload_photo);
        doc.image(imgPath, 40, 40, { width: 80, height: 80 });
      } catch (e) {
        console.log("Image error:", e);
      }
    }

    // NAME
    doc
      .fontSize(18)
      .text(user.Name || "Your Name", 140, 40);

    // CONTACT
    doc
      .fontSize(11)
      .text(`Email: ${user.email || "-"}`, 140, 65)
      .text(`Phone: ${user.Contact_no || "-"}`, 140, 80)
      .text(`Address: ${user.Address || "-"}`, 140, 95);

    // LINE
    doc.moveTo(40, 130).lineTo(550, 130).stroke();

    let y = 150;

    // =========================
    // 🔥 PROFILE
    // =========================
    doc.fontSize(14).text("PROFILE", 40, y);
    doc.moveTo(40, y + 15).lineTo(550, y + 15).stroke();

    y += 25;

    doc
      .fontSize(11)
      .text(user.Address || "-", 40, y, { width: 500 });

    y += 40;

    // =========================
    // 🔥 EDUCATION
    // =========================
    doc.fontSize(14).text("EDUCATION", 40, y);
    doc.moveTo(40, y + 15).lineTo(550, y + 15).stroke();

    y += 25;

    doc
      .fontSize(11)
      .text(user.Education || "-", 40, y, { width: 500 });

    y += 40;

    // =========================
    // 🔥 SKILLS
    // =========================
    doc.fontSize(14).text("SKILLS", 40, y);
    doc.moveTo(40, y + 15).lineTo(550, y + 15).stroke();

    y += 25;

    doc
      .fontSize(11)
      .text(user.skills || "-", 40, y, { width: 500 });

    y += 40;

    // =========================
    // 🔥 EXPERIENCE
    // =========================
    if (user.Experience > 0) {

      doc.fontSize(14).text("EXPERIENCE", 40, y);
      doc.moveTo(40, y + 15).lineTo(550, y + 15).stroke();

      y += 25;

      doc.fontSize(11)
        .text(`Company: ${user.company_name || "-"}`, 40, y)
        .text(`Role: ${user.post || "-"}`, 40, y + 15)
        .text(`Duration: ${user.Duration || "-"}`, 40, y + 30);

      y += 55;

      doc.text(user.Work_description || "-", 40, y, {
        width: 500
      });
    }

    doc.end();
  });
});

//update resume 
app.put("/api/updateProfile/:id", upload.single("Upload_photo"), (req, res) => {

  console.log("BODY:", req.body); // 🔥 debug
  console.log("FILE:", req.file);

  const id = req.params.id;

  // ✅ SAFE destructuring
  const {
    Name,
    Contact_no,
    email,
    Address,
    Education,
    Experience,
    skills,
    company_name,
    post,
    Duration,
    Work_description
  } = req.body || {};  // 🔥 FIX

  const Upload_photo = req.file ? req.file.filename : null;

  if (!Name || !Contact_no || !email) {
    return res.status(400).json({
      status: "error",
      message: "Required fields missing"
    });
  }

  let sql = `
    UPDATE job_seeker SET
    Name=?, Contact_no=?, email=?, Address=?, Education=?,
    Experience=?, skills=?, company_name=?, post=?, Duration=?, Work_description=?
  `;

  let values = [
    Name,
    Contact_no,
    email,
    Address || "",
    Education || "",
    Experience || "0",
    skills || "",
    company_name || "",
    post || "",
    Duration || "",
    Work_description || ""
  ];

  if (Upload_photo) {
    sql += ", Upload_photo=?";
    values.push(Upload_photo);
  }

  sql += " WHERE User_id=?";
  values.push(id);

  con.query(sql, values, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Update error");
    }

    res.send({ message: "Updated successfully" });
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

app.get("/api/getuser/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM job_seeker WHERE User_id=?";

  con.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.send({});
    }

    res.send(result[0]);
  });
});


//get job applied by user
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

//manage candidates

// GET APPLIED CANDIDATES FOR COMPANY
// ✅ GET CANDIDATES (FOR COMPANY)
app.get("/api/getcandidates/:companyId", (req, res) => {

  const companyId = req.params.companyId;

  const query = `
  SELECT 
    a.Apply_id,
    CASE 
      WHEN a.Status = 0 THEN 'Pending'
      WHEN a.Status = 1 THEN 'Shortlisted'
      WHEN a.Status = 2 THEN 'Rejected'
    END AS Status,
    j.job_title,
    j.location,
    u.Name,
    u.email,
    u.Contact_no
  FROM apply_job a
  JOIN job j ON a.Job_id = j.Job_id
  JOIN job_seeker u ON a.User_id = u.User_id
  WHERE a.Company_id = ?
  ORDER BY a.Apply_id DESC
`;

  con.query(query, [companyId], (err, results) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.send(results);

  });

});

// ✅ UPDATE STATUS (Shortlist / Reject)
app.post("/api/updateStatus", (req, res) => {

  const { Apply_id, status } = req.body;

  const query = "UPDATE apply_job SET Status=? WHERE Apply_id=?";

  con.query(query, [status, Apply_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Update error");
    }

    res.send({ message: "Status updated successfully" });

  });

});

//schedule interview
// ✅ SCHEDULE INTERVIEW
app.post("/api/updateStatus", (req, res) => {

  const { Apply_id, status } = req.body;

  const sql = "UPDATE apply_job SET Status = ? WHERE Apply_id = ?";

  con.query(sql, [status, Apply_id], (err) => {
    if (err) return res.send(err);

    res.send("Status Updated");
  });

});

app.post("/api/scheduleInterview", (req, res) => {

  const {
    Apply_id, Job_id, User_id, Company_id,
    interview_date, interview_time,
    interview_mode, interview_link, interview_location
  } = req.body;

  const sql = `
    INSERT INTO interview_schedule
    (Apply_id, Job_id, User_id, Company_id,
     interview_date, interview_time,
     interview_mode, interview_link, interview_location, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')
  `;

  con.query(sql, [
    Apply_id, Job_id, User_id, Company_id,
    interview_date, interview_time,
    interview_mode, interview_link, interview_location
  ], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send({ insertId: result.insertId });

  });

});

app.get("/api/getinterviews/:companyId", (req, res) => {

  const sql = `
    SELECT i.*, u.Name, j.job_title
    FROM interview_schedule i
    JOIN job_seeker u ON i.User_id = u.User_id
    JOIN job j ON i.Job_id = j.Job_id
    WHERE i.Company_id = ?
  `;

  con.query(sql, [req.params.companyId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(result);

  });

});

// ✅ GET INTERVIEWS FOR COMPANY
app.get("/api/getShortlisted/:companyId", (req, res) => {

  const sql = `
    SELECT 
      aj.Apply_id,
      aj.Job_id,
      aj.User_id,
      u.Name,
      u.email,
      u.Contact_no,
      j.job_title
    FROM apply_job aj
    JOIN job_seeker u ON aj.User_id = u.User_id
    JOIN job j ON aj.Job_id = j.Job_id
    WHERE aj.Company_id = ? AND aj.Status = 1
  `;

  con.query(sql, [req.params.companyId], (err, result) => {
    if (err) return res.send(err);
    res.send(result); // MUST BE ARRAY
  });

});

// ✅ DELETE INTERVIEW
app.delete("/api/deleteInterview/:id", (req, res) => {

  const id = req.params.id;

  const query = "DELETE FROM interview_schedule WHERE Interview_id=?";

  con.query(query, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Delete error");
    }

    res.send({ message: "Interview deleted successfully" });

  });

});

// ✅ UPDATE STATUS (Completed / Cancelled)
app.post("/api/updateInterviewStatus", (req, res) => {

  const { Interview_id, status } = req.body;

  const query = "UPDATE interview_schedule SET status=? WHERE Interview_id=?";

  con.query(query, [status, Interview_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Update error");
    }

    res.send({ message: "Status updated successfully" });

  });

});

app.get("/api/getShortlisted/:companyId", (req, res) => {

  const sql = `
    SELECT aj.Apply_id, u.User_id, u.Name, u.email, u.Contact_no,
           j.Job_id, j.job_title
    FROM apply_job aj
    JOIN users u ON aj.User_id = u.User_id
    JOIN jobs j ON aj.Job_id = j.Job_id
    WHERE aj.Company_id = ? AND aj.Status = 1
  `;

  con.query(sql, [req.params.companyId], (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });

});

app.post("/api/sendMessage", (req, res) => {

  const { sender_id, receiver_id, message, sender_type } = req.body;

  const sql = `
    INSERT INTO chat (sender_id, receiver_id, message, sender_type)
    VALUES (?, ?, ?, ?)
  `;

  con.query(sql, [sender_id, receiver_id, message, sender_type], (err) => {
    if (err) return res.send(err);
    res.send("Message Sent");
  });

});

app.get("/api/getMessages/:userId/:companyId", (req, res) => {

  const { userId, companyId } = req.params;

  const sql = `
    SELECT * FROM chat
    WHERE 
      (sender_id = ? AND receiver_id = ?)
      OR
      (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;

  con.query(sql, [userId, companyId, companyId, userId], (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });

});

//admin manage job 
app.get("/api/getAllJobs", (req, res) => {

  const sql = `
    SELECT 
      j.Job_id,
      j.job_title,
      j.location,
      j.jobtype,
      j.end_date,
      c.Company_name
    FROM job j
    LEFT JOIN company c ON j.Company_id = c.Company_id
    ORDER BY j.Job_id DESC
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log("ERROR:", err);
      return res.status(500).send(err);
    }

    console.log("FINAL JOB DATA:", result); // 🔥 IMPORTANT
    res.send(result);
  });

});

//user interview history
// ✅ GET USER APPLICATIONS + INTERVIEWS
app.get("/api/getUserApplications/:userId", (req, res) => {

  const userId = req.params.userId;

  const sql = `
    SELECT 
      a.Apply_id,
      a.Status AS application_status,
      j.job_title,
      j.location,
      c.Company_name,

      i.Interview_id,
      i.interview_date,
      i.interview_time,
      i.interview_mode,
      i.interview_link,
      i.interview_location,
      i.status AS interview_status

    FROM apply_job a
    JOIN job j ON a.Job_id = j.Job_id
    JOIN company c ON a.Company_id = c.Company_id
    LEFT JOIN interview_schedule i ON a.Apply_id = i.Apply_id

    WHERE a.User_id = ?
    ORDER BY a.Apply_id DESC
  `;

  con.query(sql, [userId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }

    res.send(result);

  });

});



//company dashboard stats
// DASHBOARD DATA
app.get("/api/companyDashboard/:companyId", (req, res) => {

  const companyId = req.params.companyId;

  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM job WHERE Company_id = ?) AS totalJobs,
      (SELECT COUNT(*) FROM apply_job WHERE Company_id = ?) AS totalApplications,
      (SELECT COUNT(*) FROM apply_job WHERE Company_id = ? AND Status = 1) AS approved,
      (SELECT COUNT(*) FROM apply_job WHERE Company_id = ? AND Status = 2) AS rejected
  `;

  con.query(sql, [companyId, companyId, companyId, companyId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });

});

//Application dashboard stats
// RECENT APPLICATIONS
app.get("/api/recentApplications/:companyId", (req, res) => {

  const companyId = req.params.companyId;

  const sql = `
    SELECT 
      u.Name,
      j.job_title,
      CASE 
        WHEN a.Status = 0 THEN 'Pending'
        WHEN a.Status = 1 THEN 'Approved'
        WHEN a.Status = 2 THEN 'Rejected'
      END AS Status
    FROM apply_job a
    JOIN job j ON a.Job_id = j.Job_id
    JOIN job_seeker u ON a.User_id = u.User_id
    WHERE a.Company_id = ?
    ORDER BY a.Apply_id DESC
    LIMIT 5
  `;

  con.query(sql, [companyId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });

});


//Admin Dashboard stats
// ✅ ADMIN DASHBOARD STATS
app.get("/api/adminDashboard", (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM company) AS totalCompanies,
      (SELECT COUNT(*) FROM job) AS totalJobs,
      (SELECT COUNT(*) FROM apply_job) AS totalApplications,
      (SELECT COUNT(*) FROM interview_schedule) AS totalInterviews
  `;

  con.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});

//admin monitoring job_seeker
// ✅ GET JOB SEEKERS
app.get("/api/jobseekers", (req, res) => {

  const sql = "SELECT * FROM job_seeker"; // ✅ correct table name

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err); // 👈 add this for debug
      return res.json({ status: "error", message: err });
    }

    res.json({
      status: "success",
      data: result
    });

  });

});

//admin dynamic login
app.post("/api/adminlogin", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM admin_login WHERE admin_email = ? AND admin_password = ?";

  con.query(sql, [email, password], (err, result) => {

    if (err) {
      return res.json({ status: "error", message: err });
    }

    if (result.length > 0) {
      res.json({
        status: "success",
        admin: result[0]
      });
    } else {
      res.json({
        status: "error",
        message: "Invalid Email or Password"
      });
    }

  });

});

//admin jobseeker status code
// 🔥 TOGGLE USER STATUS (BLOCK / UNBLOCK)
app.post("/api/toggleUserStatus", (req, res) => {

  const { id } = req.body;

  console.log("User ID:", id); // ✅ debug

  const sql = `
    UPDATE job_seeker 
    SET status = IF(status = 1, 0, 1) 
    WHERE User_id = ?
  `;

  con.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ status: "error", message: err });
    }

    res.json({
      status: "success",
      message: "Status updated"
    });

  });

});

//user recommended jobs
app.get("/api/recommendedJobs/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql1 = "SELECT skills FROM job_seeker WHERE User_id = ?";

  con.query(sql1, [userId], (err, userResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (!userResult.length) return res.send([]);

    const skills = userResult[0].skills;

    if (!skills) return res.send([]);

    // 🔥 normalize skills
    const skillArray = skills
      .toLowerCase()
      .split(",")
      .map(s => s.trim());

    // 🔥 get all jobs first
    const sql2 = `
      SELECT j.*, jc.Jobcat_name
      FROM job j
      LEFT JOIN job_category jc ON j.Jobcat_id = jc.Jobcat_id
    `;

    con.query(sql2, (err, jobs) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      // 🔥 FILTER IN NODE (BEST WAY)
      const matchedJobs = jobs.filter(job => {
        const jobSkills = (job.skill || "").toLowerCase();

        return skillArray.some(skill =>
          jobSkills.includes(skill)
        );
      });

      res.send(matchedJobs);
    });

  });
});

//job details
app.get("/api/getjobdetails/:id", (req, res) => {

  const Job_id = req.params.id;

  const sql = `
    SELECT 
      job.*, 
      company.Company_name,
      company.email,
      company.Contact_no
    FROM job
    LEFT JOIN company 
      ON job.Company_id = company.Company_id
    WHERE job.Job_id = ?
  `;

  con.query(sql, [Job_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    console.log(result); // 🔥 IMPORTANT DEBUG

    res.send(result);
  });

});

//Admin Manage Profile
// GET ADMIN PROFILE
app.get("/api/admin/profile/:id", (req, res) => {
  const admin_id = req.params.id;

  const sql = "SELECT * FROM admin_login WHERE admin_id = ?";
  
  con.query(sql, [admin_id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ success: false });
    } else {
      res.send({ success: true, data: result[0] });
    }
  });
});

// UPDATE ADMIN PROFILE
app.put("/api/admin/update", (req, res) => {
  console.log("BODY:", req.body); // 🔥 debug

  const { admin_id, admin_email, admin_password } = req.body;

  if (!admin_id) {
    return res.status(400).send({ message: "Admin ID missing" });
  }

  const sql = `
    UPDATE admin_login
    SET admin_email = ?, admin_password = ?
    WHERE admin_id = ?
  `;

  con.query(sql, [admin_email, admin_password, admin_id], (err, result) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).send(err);
    }

    res.send({ success: true });
  });
});
// ================== START SERVER ==================
const PORT = 1337;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
