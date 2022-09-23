import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";

const FormSelectField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  children,
  multiple,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>

            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                multiple={!!multiple}
                as="select"
              >
                {children}
              </Form.Control>
              <Form.Text id="passwordHelpBlock" muted>
                {multiple
                  ? "Để lựa chọn được nhiều danh mục, bạn hãy đè nút Ctrl và nhấp chuột trái vào các mục mà bạn cần"
                  : null}
              </Form.Text>

              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    </Field>
  );
};

FormSelectField.defaultProps = {
  type: "select",
  inputGroupPrepend: null,
};

export default FormSelectField;
