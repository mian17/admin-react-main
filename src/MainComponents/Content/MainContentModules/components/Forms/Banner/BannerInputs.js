import { FieldArray, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import React, { useState } from "react";
import Banner from "./bannerForm-utils/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};
const BannerInputs = ({ randomId }) => {
  const [initialFormValue, setInitialFormValue] = useState({
    banners: [new Banner("", "", "", "")],
  });

  return (
    <Formik
      initialValues={initialFormValue}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form className="card-body">
          <FieldArray name="banners">
            {({ insert, remove, push }) => (
              <div>
                {values.banners.length > 0 &&
                  values.banners.map((banner, index) => {
                    return (
                      <div key={index}>
                        <h5>Banner {index + 1}</h5>
                        <Row className="align-items-center mb-3">
                          <Row>
                            <FormField
                              as={Col}
                              label={`Tên của banner ${index + 1}`}
                              name={`banners[${index}].title`}
                              controlId={"validationFormik110" + randomId}
                              type="text"
                              placeholder={`Nhập tên của banner ${index + 1}`}
                            />
                            <FormField
                              as={Col}
                              label={`Thông tin phụ đề của banner ${index + 1}`}
                              name={`banners[${index}].subtitle`}
                              controlId={"validationFormik111" + randomId}
                              type="text"
                              placeholder={`Nhập tên phụ đề của banner ${
                                index + 1
                              }`}
                            />
                          </Row>
                          <Row>
                            <FormSelectField
                              as={Col}
                              controlId={"validationFormik112" + randomId}
                              label="Chọn sản phẩm cho banner"
                              type="select"
                              name="url"
                              defaultValue={`banners[${index}].url`}
                            >
                              <option value="">Vui lòng chọn sản phẩm</option>
                            </FormSelectField>
                            <FormField
                              as={Col}
                              label={`Thông tin phụ đề của banner ${index + 1}`}
                              name={`banners[${index}].subtitle`}
                              controlId={"validationFormik111" + randomId}
                              type="text"
                              placeholder={`Nhập tên phụ đề của banner ${
                                index + 1
                              }`}
                            />
                          </Row>
                        </Row>
                        <button
                          type="button"
                          className="btn btn-danger rounded"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => push(new Banner("", "", "", ""))}
                  >
                    <FontAwesomeIcon icon={solid("plus")} /> Thêm banner
                  </button>
                </div>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
          {JSON.stringify(values, null, 2)}
        </Form>
      )}
    </Formik>
  );
};
export default BannerInputs;
