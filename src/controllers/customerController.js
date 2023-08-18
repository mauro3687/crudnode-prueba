import { pool } from "../db.js";

export const renderCustomers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM negocios");
    res.render("customers", { customers: rows });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createCustomers = async (req, res) => {
  try {
    const newCustomer = req.body;
    await pool.query("INSERT INTO negocios SET ?", [newCustomer]);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM negocios WHERE id = ?", [
      id,
    ]);
    const negocios = result[0];
    res.render("customers_edit", { negocios });
  } catch (error) {
    console.error("Error editing customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = req.body;
    await pool.query("UPDATE negocios SET ? WHERE id = ?", [
      updatedCustomer,
      id,
    ]);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM negocios WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/");
};
