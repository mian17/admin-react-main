import Form from "react-bootstrap/Form";
import React from "react";

const FormFileUploadWithPreview = ({
  as,
  md,
  controlId,
  label,
  name,
  desiredFunction,
  src,
}) => {
  return (
    <Form.Group as={as} md={md} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} type="file" onChange={desiredFunction} />

      <img src={src} alt="" style={{ width: "240px", height: "240px" }} />
    </Form.Group>
  );
};
export default FormFileUploadWithPreview;
