import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import "../../../assets/styles/dashboard.css";
import SideBar from "../../../components/organisms/SideBar";
import CreateForm from "./CreateForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../configs/firebase";
import ListUser from "./ListUser";
import EditForm from "./EditForm";
import TopBar from "../../../components/organisms/TopBar";

export default function Users() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [type, setType] = useState("");
  const [datas, setDatas] = useState([]);
  const [editId, setEditId] = useState("");

  const getData = async () => {
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setDatas(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCanvas = (type, id) => {
    switch (type) {
      case "create":
        setType("create");
        break;
      case "edit":
        setType("edit");
        break;
      default:
        break;
    }
    setShowCanvas(true);
    setEditId(id);
  };

  return (
    <>
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Students</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <button
                  className="btn btn-light rounded-1 btn-light-bordered"
                  onClick={() => handleCanvas("create")}
                >
                  <i className="bi bi-pencil-square"></i> Create New Student
                </button>
              </div>
            </div>

            {/* START: Main Content */}
            <ListUser
              datas={datas}
              showCanvas={(value, id) => handleCanvas(value, id)}
            />
            {/* END: Main Content */}

            {/* START: Create Canvas */}
            <Offcanvas
              show={showCanvas}
              onHide={() => setShowCanvas(false)}
              backdrop="static"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  {type === "create" ? (
                    <h4>Create New User</h4>
                  ) : (
                    <h4>Edit User</h4>
                  )}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {type === "create" ? (
                  <CreateForm setShowCanvas={(value) => setShowCanvas(value)} />
                ) : (
                  <EditForm
                    id={editId}
                    showCanvas={(value) => setShowCanvas(value)}
                  />
                )}
              </Offcanvas.Body>
            </Offcanvas>
            {/* END: Create Canvas */}
          </main>
        </div>
      </div>
    </>
  );
}
