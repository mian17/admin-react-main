import Form from "react-bootstrap/Form";
import React from "react";
import { Col } from "react-bootstrap";
import classes from "./FormFileUploadWithPreview.module.css";
import { backendServerPath } from "../../utilities/backendServerPath";

const FormFileUploadWithMultiplePreview = ({
  label,
  name,
  desiredFunction,
  images,
}) => {
  // console.log(images);
  return (
    <Col>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type="file"
        onChange={desiredFunction}
        multiple
      />

      {images.length > 0 &&
        images.map((image, index) => {
          return (
            <img
              key={index}
              className={classes["image-preview"]}
              src={
                typeof image === "object"
                  ? URL.createObjectURL(image)
                  : `${backendServerPath + image}`
              }
              alt=""
            />
          );
        })}
    </Col>
  );
};
export default FormFileUploadWithMultiplePreview;
