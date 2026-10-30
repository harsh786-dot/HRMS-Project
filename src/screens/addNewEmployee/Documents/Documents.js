import React, { useRef } from "react";
import "./Documents.css";
import { Upload } from "lucide-react";
import { STRINGS } from "../../../constants/strings";

const Documents = ({ form, handleChange }) => {
  const documents = [
    {
      title: "Upload Appointment Letter",
      key: "appointment_letter",
    },
    {
      title: "Upload Salary Slips",
      key: "salary_slips",
    },
    {
      title: "Upload Relieving Letter",
      key: "relieving_letter",
    },
    {
      title: "Upload Experience Letter",
      key: "experience_letter",
    },
  ];

  const fileInputs = useRef({});

  const handleFileChange = (event, key) => {
    const file = event.target.files?.[0] || null;
    handleChange(key, file);
  };

  const openFilePicker = (key) => {
    fileInputs.current[key]?.click();
  };

  return (
    <div className="documents">
      <div className="documents-grid">
        {documents.map((document) => (
          <div className="document-box" key={document.key}>
            <p className="document-title">
              {document.title}
            </p>

            <input
              type="file"
              ref={(element) => {
                fileInputs.current[document.key] = element;
              }}
              onChange={(event) =>
                handleFileChange(event, document.key)
              }
              accept=".jpg,.jpeg,.pdf"
              hidden
            />

            <div
              className="upload-box"
              onClick={() => openFilePicker(document.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openFilePicker(document.key);
                }
              }}
            >
              <div className="upload-icon">
                <Upload size={18} />
              </div>

              {form[document.key] ? (
                <>
                  <p className="file-name">
                    {form[document.key].name}
                  </p>

                  <small>File selected</small>
                </>
              ) : (
                <>
                  <p>
                    Drag &amp; Drop or{" "}
                    <span>choose file</span> to upload
                  </p>

                  <small>
                    Supported formats: JPEG, PDF
                  </small>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
