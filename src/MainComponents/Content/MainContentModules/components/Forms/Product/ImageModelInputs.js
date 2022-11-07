import { Form, Formik } from "formik";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import { Col, Row } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../../../api";
import FormFileUploadWithMultiplePreview from "../../../../../../common/components/FormFileUploadWithMultiplePreview";
import Button from "react-bootstrap/Button";
import imageModelInputsOnSubmit from "./server/imageModelInputsOnSubmit";
import { useNavigate } from "react-router-dom";

const ImageModelInputs = ({ randomId }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [models, setModels] = useState([]);

  const initialValues = { productId: "", modelId: "", images: [] };
  const [formValues, setFormValues] = useState({});

  const fetchProducts = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(`api/admin/product-details`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchModels = useCallback(async (chosenProductId) => {
    if (chosenProductId && chosenProductId > 0) {
      try {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        await apiClient.get("/sanctum/csrf-cookie");
        const response = await apiClient.get(
          `api/admin/product-details/${chosenProductId}/models`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response);
        setModels(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    if (formValues !== null && formValues !== undefined) {
      fetchModels(formValues.productId);
    }
  }, [fetchModels, fetchProducts, formValues]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        imageModelInputsOnSubmit(values, navigate);
      }}
      enableReinitialize={true}
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => {
        setTimeout(() => setFormValues(values), 0);

        return (
          <Form className="card-body" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <FormSelectField
                as={Col}
                controlId={"validationFormik01" + randomId}
                label="Lựa chọn sản phẩm"
                type="text"
                name="productId"
              >
                <option value="">Chọn sản phẩm bạn cần thêm hình ảnh</option>
                {products.map((product, index) => {
                  return (
                    <option key={index} value={product.id}>
                      {product.name}
                    </option>
                  );
                })}
              </FormSelectField>
            </Row>
            <Row className="mb-3">
              <FormSelectField
                as={Col}
                controlId={"validationFormik01" + randomId}
                label="Lựa chọn kiểu loại của sản phẩm"
                type="text"
                name="modelId"
              >
                <option value="">
                  Chọn kiểu loại sản phẩm mà bạn cần thêm hình
                </option>
                {models.map((model, index) => {
                  return (
                    <option key={index} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </FormSelectField>
            </Row>
            <Row className="mb-3">
              <FormFileUploadWithMultiplePreview
                label="Thêm nhiều hình cho kiểu loại sản phẩm"
                name="images"
                desiredFunction={(e) => {
                  const files = e.currentTarget.files;
                  console.log(files);
                  setFieldValue(`images`, [...files]);
                }}
                images={values.images}
              />
            </Row>
            {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
            <div className="text-right">
              <Button type="submit" variant="primary" disabled={!isValid}>
                Tải ảnh lên
                {isSubmitting && (
                  <div
                    className="spinner-border text-light spinner-border-sm ml-1"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default ImageModelInputs;
