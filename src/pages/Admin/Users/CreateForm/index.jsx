import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../../configs/firebase";
import { toast, ToastContainer } from "react-toastify";

export default function CreateForm({ setShowCanvas }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const uploadFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        setLoading(false);
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setLoading(false);
          toast.success("Image upload successfully");
        });
      }
    );
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "students"), {
        name: name,
        phone: phone,
        address: address,
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
      });
      setLoading(false);
      setShowCanvas(false);
      toast.success("Success update data");
    } catch (error) {
      setLoading(false);
      setShowCanvas(false);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onCreate}>
        <div className="form-floating mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          {!imageUrl && (
            <input
              onChange={(value) => uploadFile(value)}
              className="form-control rounded-1"
              type="file"
            />
          )}
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
            onClick={onCreate}
            className="btn btn-primary rounded-1 w-100"
          >
            <i className="bi bi-send me-2"></i>
            Submit
          </button>
        )}
      </form>
      <ToastContainer theme="colored" />
    </>
  );
}
