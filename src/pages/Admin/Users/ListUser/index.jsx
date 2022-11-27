import React, { useEffect, useState } from "react";
import Avatar from "assets/images/1.png";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "configs/firebase";

export default function ListUser({ showCanvas }) {
  const [datas, setDatas] = useState([]);

  const unsub = onSnapshot(collection(db, "students"), (doc) => {
    let values = [];
    doc.docs.forEach((item) => {
      values.push({ id: item.id, ...item.data() });
    });
    setDatas(values);
  });

  useEffect(() => {
    unsub();
  }, [unsub]);

  const deleteFile = (url) => {
    const desertRef = ref(storage, url);
    deleteObject(desertRef)
      .then(() => {
        console.log("success remove file from storage");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onDelete = async (id, imageUrl) => {
    if (imageUrl !== "") {
      deleteFile(imageUrl);
    }
    await deleteDoc(doc(db, "students", id));
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.length ? (
              datas.map((data, index) => {
                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={data?.imageUrl || Avatar}
                        alt={data.name}
                        width={40}
                        height={40}
                        className="rounded-circle"
                      />
                    </td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.address}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => showCanvas("edit", data.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          )
                            onDelete(data.id, data.imageUrl);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} rowSpan={datas.length} className="text-center">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
