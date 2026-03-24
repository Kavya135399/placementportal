import { useEffect, useState } from "react";
import axios from "axios";

export default function CompanyName() {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/company");
      setCompanyName(res.data.companyName);
    } catch (err) {
      console.log("Error fetching company:", err);
    }
  };

  return (
    <span className="font-semibold text-gray-800 text-sm">
      {companyName || "Company"}
    </span>
  );
}