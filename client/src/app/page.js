"use client";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./components/auth/auth";
import ProtectedRoute from "./utils/protected-route";
import App from "./components/App";
import Login from "./components/auth/login";

// import "./globals.css";

export default function Home() {
  return (
    <>
      <Router>
        {/* <Container style={{ width: "400px" }}>
          <Row>
            <Col> */}
        <UserAuthContextProvider>
          <Routes>
            <Route
              path="/customers-data"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </UserAuthContextProvider>
        {/* </Col>
          </Row>
        </Container> */}
      </Router>
    </>
  );
}
