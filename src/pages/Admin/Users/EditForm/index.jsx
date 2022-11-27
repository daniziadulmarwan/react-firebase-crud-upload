import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "configs/firebase";
import { toast, ToastContainer } from "react-toastify";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function EditForm({ id, showCanvas }) {
  const [loading, setLoading] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    const getDataById = async () => {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNameUser(docSnap.data().name);
        setPhone(docSnap.data().phone);
        setAddress(docSnap.data().address);
        setOldImage(docSnap.data().imageUrl);
      } else {
        console.log("No data found");
      }
    };
    getDataById();
  }, [id]);

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

  const onUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newImage) {
      if (oldImage) {
        deleteFile(oldImage);
      }
      const name = new Date().getTime() + newImage.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, newImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(doc(db, "students", id), {
              name: nameUser,
              phone: phone,
              address: address,
              imageUrl: downloadURL,
            });
            setLoading(false);
            showCanvas(false);
            toast.success("Success update data");
          });
        }
      );
    } else {
      await setDoc(doc(db, "students", id), {
        name: nameUser,
        phone: phone,
        address: address,
        imageUrl: oldImage,
      });
      setLoading(false);
      showCanvas(false);
    }
  };

  return (
    <>
      <form>
        <div className="form-floating mb-3">
          <input
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            type="text"
            className="form-control rounded-1"
            id="name"
            placeholder="Abdullah"
          />
          <label htmlFor="name">Nama Lengkap</label>
        </div>

        <div className="form-floating mb-3">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="form-control rounded-1"
            id="phone"
            placeholder="085352****"
          />
          <label htmlFor="phone">Nomor Phone</label>
        </div>

        <div className="form-floating mb-3">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control rounded-1"
            id="address"
            placeholder="Jl. Barat No.129"
          />
          <label htmlFor="address">Alamat Tinggal</label>
        </div>

        <div className="mb-3">
          <input
            onChange={(e) => setNewImage(e.target.files[0])}
            className="form-control rounded-1"
            type="file"
          />
        </div>

        {loading ? (
          <button
            className="btn btn-primary rounded-1 w-100"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Loading...</span>
          </button>
        ) : (
          <button
            onClick={onUpdate}
            className="btn btn-primary rounded-1 w-100"
          >
            <i className="bi bi-send me-2"></i>
            Update
          </button>
        )}
      </form>
      <ToastContainer theme="colored" />
    </>
  );
}
