import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WorkshopData.css";

const WorkshopData = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [workshops, setWorkshops] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(backend_url + "/api/registration/screenshots")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkshops(data);
      })
      .catch((error) => console.error("Error fetching workshops:", error));
  }, []);

  const handleStatusChange = async (workshop, status) => {
  let subject, message;
  const whatsappGroupLink = "https://chat.whatsapp.com/KNmS5JswF948liYGMfgIWg";

  if (status === "accept") {
    subject = "Workshop Registration Confirmed";
    message = `Dear ${workshop.name},<br><br>
      Your registration for the workshop has been <b>approved</b>. See you at the event!<br><br>
      Join our official WhatsApp group for important updates: 
      <a href="${whatsappGroupLink}" target="_blank">Click here to join</a>.<br><br>
      Best regards,<br>Workshop Team`;
  } else {
    subject = "Workshop Registration Rejected";
    message = `Dear ${workshop.name},<br><br>
      Unfortunately, your registration for the workshop has been <b>rejected</b>. 
      Please contact support for further details.<br><br>
      Best regards,<br>Workshop Team`;
  }

  try {
    const uid = workshop._id.slice(-6).toUpperCase();
    const response = await axios.post(
      backend_url + "/api/registration/send-email",
      {
        uid: uid,
        email: workshop.email,
        subject,
        message,
      }
    );

    if (response.data.success) {
      alert(`Email sent successfully: ${status.toUpperCase()}ED`);
    } else {
      alert("Failed to send email.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email. Please try again.");
  }
};
  
  return (
    <div className="admin-container">
      <h1>Workshop Registrations</h1>

      <button className="home-button" onClick={() => navigate("/")}>
        Return to Home
      </button>

      {workshops.length === 0 ? (
        <p className="error">Fetching registration details ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Transaction ID</th>
              <th>UID</th> {/* Added MID column */}
              <th>Screenshot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop) => (
              <tr key={workshop.transactionId}>
                <td>{workshop.name}</td>
                <td>{workshop.email}</td>
                <td>{workshop.phoneNumber || "N/A"}</td>
                <td>{workshop.transactionId}</td>
                <td>{workshop._id.slice(-6).toUpperCase() || "N/A"}</td> 
                <td>
                  {workshop.image ? (
                    <img
                      src={`data:image/png;base64,${workshop.image}`}
                      alt="Payment Screenshot"
                      className="screenshot"
                      onClick={() => setSelectedImage(workshop.image)}
                    />
                  ) : (
                    "No Screenshot"
                  )}
                </td>
                <td>
                  <div className="button-container">
                    <button
                      className="accept-button"
                      onClick={() => handleStatusChange(workshop, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusChange(workshop, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Enlarged Screenshot"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopData;
