const queries = require("../queries/accountQueries");
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAccount = async (req, res) => {
  const { email, role } = req.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    const { rows } = await pool.query(queries.getAccount, [email]);
    const user_cut = rows[0];

    res.status(200).json({ success: true, user: user_cut });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getMaid = async (req, res) => {
  const { email, role } = req.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    const get_ids = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
      [email]
    );
    const user_id = get_ids.rows[0].user_id;

    const maid_query = `SELECT acc.user_role, acc.user_gender, acc.user_pic, acc.firstname, acc.lastname, acc.birthday, acc.tel, acc.email, acc.description, jobtype.jobs
                        FROM account acc
                        INNER JOIN (
                            SELECT userjob.user_id,
                                  ARRAY_AGG(json_build_object('job_id', job.job_id, 'job_name', job.job_name)) AS jobs
                            FROM job
                            INNER JOIN userjob ON job.job_id = userjob.job_id
                            WHERE userjob.user_id = $1
                            GROUP BY userjob.user_id
                        ) jobtype ON acc.user_id = jobtype.user_id
                        WHERE acc.user_id = $1;`;
    const maid = await pool.query(maid_query, [user_id]);

    const maid_data = maid.rows[0];
    return res.status(200).json({ success: true, maid_data: maid_data });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getMaidRehired = async (req, res) => {
  const { email, role } = req.user;
  const { maid_id } = req.body;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    if (role === "customer") {
      const customer = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1",
        [email]
      );
      const customer_id = customer.rows[0].user_id;

      const customer_address = await pool.query(
        "SELECT latitude, longitude FROM address WHERE user_id = $1",
        [customer_id]
      );

      const customer_lat = customer_address.rows[0].latitude;
      const customer_long = customer_address.rows[0].longitude;

      const maid_query = `SELECT acc.user_role, acc.user_gender, acc.user_pic, acc.firstname, acc.lastname, acc.birthday, acc.tel, acc.email, acc.description, add.latitude, add.longitude, jobtype.jobs, r.avg_rate
                        FROM account acc
                        INNER JOIN (
                            SELECT userjob.user_id, ARRAY_AGG(job.job_id) AS jobs
                            FROM job
                            INNER JOIN userjob ON job.job_id = userjob.job_id
                            WHERE userjob.user_id = $1
                            GROUP BY userjob.user_id
                        ) jobtype ON acc.user_id = jobtype.user_id
                        INNER JOIN address add ON acc.user_id = add.user_id
                        INNER JOIN rating r ON acc.user_id = r.user_id
                        WHERE acc.user_id = $1;`;
      const maid = await pool.query(maid_query, [maid_id]);

      const maid_lat = maid.rows[0].latitude;
      const maid_long = maid.rows[0].longitude;

      const diff_lat = Math.pow(customer_lat - maid_lat, 2);
      const diff_long = Math.pow(customer_long - maid_long, 2);
      const address_distance = Math.sqrt(diff_lat + diff_long);

      const selected_maid = {
        user_role: maid.rows[0].user_role,
        user_gender: maid.rows[0].user_gender,
        user_pic: maid.rows[0].user_pic,
        firstname: maid.rows[0].firstname,
        lastname: maid.rows[0].lastname,
        birthday: maid.rows[0].birthday,
        email: maid.rows[0].email,
        tel: maid.rows[0].tel,
        address_distance: address_distance,
        jobs: maid.rows[0].jobs,
        avg_rate: maid.rows[0].avg_rate,
        description: maid.rows[0].description,
      };

      return res
        .status(200)
        .json({ success: true, selected_maid: selected_maid });
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getAccountByIds = async (req, res) => {
  const { ids } = req.body;

  let result = [];
  for (let i = 0; i < ids.length; i++) {
    const select_query = await pool.query(queries.getAccountById, [ids[i]]);
    result.push(select_query.rows[0]);
  }

  if (result.length > 0) {
    return res.status(200).json({ success: true, maid_data: result });
  } else {
    res.status(404).json({ success: false });
  }
};

const addAccount = async (req, res) => {
  const {
    User_Role,
    User_Gender,
    User_Pic,
    Firstname,
    Lastname,
    Birthday,
    Tel,
    Email,
    Description,
    Pass,
  } = req.body;

  try {
    const emailCheckResult = await pool.query(queries.checkEmailExists, [
      Email,
    ]);
    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const query = `
            INSERT INTO Account (
                User_Role, 
                User_Gender, 
                User_Pic, 
                Firstname, 
                Lastname, 
                Birthday, 
                Tel, 
                Email, 
                Pass, 
                Description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
    const values = [
      User_Role,
      User_Gender,
      User_Pic,
      Firstname,
      Lastname,
      Birthday,
      Tel,
      Email,
      Pass,
      Description,
    ];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(500).json({ error: "No account was created" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAccount = async (req, res) => {
  const {
    User_Role,
    User_Gender,
    User_Pic,
    Firstname,
    Lastname,
    Birthday,
    Tel,
    Email,
    Pass,
    Description,
  } = req.body;
  const { id } = req.params;

  try {
    const result = await database.pool.query(queries.updateAccount, [
      User_Role,
      User_Gender,
      User_Pic,
      Firstname,
      Lastname,
      Birthday,
      Tel,
      Email,
      Pass,
      Description,
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAccount = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Account WHERE User_ID = $1 RETURNING *",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const {
      user_role,
      user_gender,
      firstname,
      lastname,
      birthday,
      tel,
      email,
      pass,
      description,
    } = req.body;
    const { rows } = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1 OR tel = $2",
      [email, tel]
    );
    if (rows.length > 0) {
      return res.json({
        success: false,
        text: "อีเมลหรือเบอร์โทรนี้ถูกใช้ลงทะเบียนมาก่อนแล้ว",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncoded = await bcrypt.hash(pass, salt);
    const insertAccountQuery = `INSERT INTO Account (
                            user_role, 
                            user_gender, 
                            user_pic, 
                            firstname, 
                            lastname, 
                            birthday, 
                            tel, 
                            email, 
                            pass, 
                            description
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const insertAccountValues = [
      user_role,
      user_gender,
      "1716567567852no_account.png",
      firstname,
      lastname,
      birthday,
      tel,
      email,
      passwordEncoded,
      description,
    ];
    await pool.query(insertAccountQuery, insertAccountValues);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error signing up", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const { rows } = await pool.query(
      "SELECT * FROM Account WHERE email = $1",
      [email]
    );
    if (rows.length > 0) {
      const isMatch = await bcrypt.compare(pass, rows[0].pass);

      if (!isMatch) {
        return res
          .status(400)
          .json({ err: "pass", text: "รหัสผ่านไม่ถูกต้อง" });
      }

      const payload = {
        user: {
          email: rows[0].email,
          role: rows[0].user_role,
        },
      };

      jwt.sign(payload, "jwtS3cr3t", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        return res.json({ token, payload });
      });
    } else {
      return res.status(400).json({ err: "acc", text: "ไม่พบบัญชีผุ้ใช้" });
    }
  } catch (error) {
    console.error("Error signing up", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const uploadImage = async (req, res) => {
  const imageName = req.file.filename;
  const token = req.body.token;

  if (!token) {
    return res.status(401).send("ไม่พบ token, ยกเลิกการยืนยันตัวตน");
  }
  const decoded = jwt.verify(token, "jwtS3cr3t");
  const { email, role } = decoded.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    const user = await pool.query("SELECT * FROM Account WHERE email = $1", [
      email,
    ]);
    const user_id = user.rows[0].user_id;

    const upload_query = `UPDATE Account SET
                        User_Pic = $1
                    WHERE user_id = $2 RETURNING *`;
    const { rows } = await pool.query(upload_query, [imageName, user_id]);

    return res.json({ success: true, imageName: imageName });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

const editCustomerProfile = async (req, res) => {
  const {
    user_pic,
    user_role,
    firstname,
    lastname,
    user_gender,
    birthday,
    email,
    pass,
    tel,
    description,
  } = req.body;

  try {
    const user = await pool.query("SELECT * FROM Account WHERE email = $1", [
      email,
    ]);
    const user_id = user.rows[0].user_id;

    if (pass !== "") {
      const salt = await bcrypt.genSalt(10);
      const passwordEncoded = await bcrypt.hash(pass, salt);
      const account = await pool.query(queries.updateAccount, [
        user_role,
        user_gender,
        user_pic,
        firstname,
        lastname,
        new Date(birthday),
        tel,
        email,
        passwordEncoded,
        description,
        user_id,
      ]);
    } else {
      const account = await pool.query(queries.updateAccountNoPass, [
        user_role,
        user_gender,
        user_pic,
        firstname,
        lastname,
        new Date(birthday),
        tel,
        email,
        description,
        user_id,
      ]);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

const editMaidProfile = async (req, res) => {
  const {
    user_pic,
    user_role,
    firstname,
    lastname,
    user_gender,
    birthday,
    email,
    pass,
    tel,
    description,
    jobs,
  } = req.body;

  try {
    const user = await pool.query("SELECT * FROM Account WHERE email = $1", [
      email,
    ]);
    const user_id = user.rows[0].user_id;

    if (pass !== "") {
      const salt = await bcrypt.genSalt(10);
      const passwordEncoded = await bcrypt.hash(pass, salt);
      const account = await pool.query(queries.updateAccount, [
        user_role,
        user_gender,
        user_pic,
        firstname,
        lastname,
        new Date(birthday),
        tel,
        email,
        passwordEncoded,
        description,
        user_id,
      ]);
    } else {
      const account = await pool.query(queries.updateAccountNoPass, [
        user_role,
        user_gender,
        user_pic,
        firstname,
        lastname,
        new Date(birthday),
        tel,
        email,
        description,
        user_id,
      ]);
    }

    const deleteUserJob = "DELETE FROM UserJob WHERE User_ID = $1 RETURNING *";
    const delete_query = await pool.query(deleteUserJob, [user_id]);

    const addUserJob =
      "INSERT INTO UserJob (User_ID, Job_ID) VALUES ($1, $2) RETURNING *";

    let result = [];
    for (let i = 0; i < jobs.length; i++) {
      const add_query = await pool.query(addUserJob, [user_id, jobs[i]]);
      result.push(add_query);
    }

    if (delete_query.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No UserJob was created" });
    }
    if (result.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "Can't Insert UserJob" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

const checkOldPass = async (req, res) => {
  const { oldPass } = req.body;
  const { email, role } = req.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }
  try {
    const user = await pool.query("SELECT * FROM Account WHERE email = $1", [
      email,
    ]);
    const comparePass = user.rows[0].pass;

    const isMatch = await bcrypt.compare(oldPass, comparePass);

    if (isMatch) {
      return res.status(200).json({ success: true, check_pass: true });
    }
    return res.status(200).json({ success: true, check_pass: false });
  } catch (err) {}
};

module.exports = {
  addAccount,
  getAccount,
  getAccountByIds,
  updateAccount,
  deleteAccount,
  register,
  login,
  uploadImage,
  editCustomerProfile,
  editMaidProfile,
  checkOldPass,
  getMaid,
  getMaidRehired,
};
