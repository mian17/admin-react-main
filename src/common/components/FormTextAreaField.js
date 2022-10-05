import React from "react";
import { Form } from "react-bootstrap";
import { Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormTextAreaField = ({
  as,
  md,
  controlId,
  label,
  name,
  additionalConfig,
  initialData,
}) => {
  return (
    <>
      <Field className="form-control" name={name}>
        {({ field, form }) => {
          const isValid = !form.errors[field.name];
          const isInvalid = form.touched[field.name] && !isValid;
          return (
            <Form.Group as={as} md={md} controlId={controlId}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                as={CKEditor}
                {...field}
                config={{
                  ...additionalConfig,
                  language: "vi",
                  // removePlugins: ["Heading"],
                  // toolbar: [
                  //   "bold",
                  //   "italic",
                  //   "bulletedList",
                  //   // "numberedList",
                  //   // "blockQuote",
                  // ],
                }}
                editor={ClassicEditor}
                data={initialData && initialData.length > 0 ? initialData : ""}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  // const data = editor.getData();
                  // console.log({ event, editor, data });
                  form.setFieldValue(field.name, editor.getData());
                }}
                // onBlur={(event, editor) => {
                //   console.log("Blur.", editor);
                // }}
                // onFocus={(event, editor) => {
                //   console.log("Focus.", editor);
                // }}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
              />
              <div className="text-red small">{form.errors[field.name]}</div>
            </Form.Group>
          );
        }}
      </Field>
    </>
  );
};

export default FormTextAreaField;
