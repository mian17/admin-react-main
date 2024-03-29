import Form from "react-bootstrap/Form";
import React from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./FormFileUploadWithPreview.module.css";
import { backendServerPath } from "../../utilities/backendServerPath";

const FormFileUploadWithPreview = ({ label, name, desiredFunction, image }) => {
  return (
    <Col>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type="file"
        onChange={desiredFunction}
        className="mb-3"
      />

      <Row>
        {image && (
          <Col>
            <img
              className={classes["image-preview"]}
              src={
                typeof image === "object"
                  ? URL.createObjectURL(image)
                  : `${backendServerPath + image}`
              }
              alt=""
            />
          </Col>
        )}
      </Row>
    </Col>
  );
};
export default FormFileUploadWithPreview;
