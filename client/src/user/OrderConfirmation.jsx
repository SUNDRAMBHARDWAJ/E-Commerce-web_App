import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
const history = useNavigate()
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#fff",
      borderRadius: "10px",
      textAlign: "center",
    },
    checkmark: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#50C878",
      marginBottom: "2rem",
      fontSize: "3rem",
      color: "#fff",
    },
    successMessage: {
      color: "#50C878",
      fontWeight: "bold",
      fontSize: "1.5rem",
      marginBottom: "1rem",
    },
    homeButton: {
      backgroundColor: "#50C878",
      color: "#fff",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    homeButtonHover: {
      backgroundColor: "#439D70",
    },
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#439D70";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#50C878";
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.checkmark}>&#10004;</div>
        <h2 style={styles.successMessage}>Order Placed Successfully!</h2>
        <button
          style={styles.homeButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={()=>{
            history('/user')
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
