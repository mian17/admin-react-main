import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import React, { useCallback, useEffect, useState } from "react";
import FormFileUploadWithPreview from "../../../../../../common/components/FormFileUploadWithPreview";
import { CategorySchema } from "../../../../../../common/utils/validationSchema";
import Button from "react-bootstrap/Button";
import apiClient from "../../../../../../api";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import CategoryForTable from "./categoryForm-utils/CategoryForTable";
import { useNavigate } from "react-router-dom";
import Category from "./categoryForm-utils/Category";
import categoryInputsSubmitHandler from "./server/categoryInputsSubmitHandler";
import LoadingSpinner from "../../../../../../common/components/LoadingSpinner";

const CategoryInputs = ({ randomId, categoryId }) => {
  const navigate = useNavigate();
  const [initialFormValue, setInitialFormValue] = useState(
    new Category("", "", "")
  );
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const categoriesResponse = await apiClient.get("api/admin/category", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const transformedCategories = categoriesResponse.data.map((category) => {
        return new CategoryForTable(
          category.id,
          category.name,
          category["children_recursive"]
        );
      });
      setCategories(transformedCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchCurrentEditingCategoryId = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const currentEditingCategoryResponse = await apiClient.get(
        `api/admin/category/${categoryId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(currentEditingCategoryResponse.data);
      const { name, img_url, parent_category_id } =
        currentEditingCategoryResponse.data;

      setInitialFormValue(
        new Category(
          name,
          parent_category_id === null ? "" : parent_category_id.toString(),
          img_url
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategories();
    if (categoryId) {
      fetchCurrentEditingCategoryId();
    }
  }, [categoryId, fetchCategories, fetchCurrentEditingCategoryId]);

  let categoriesOptions;

  categoriesOptions = categories.map((category, i) => (
    <React.Fragment key={i}>
      <option key={i} value={category.id}>
        {category.name}
      </option>
      {category.children.map((child) => (
        <React.Fragment key={child.id + "0"}>
          <option value={child.id}>{"|=== " + child.name}</option>
        </React.Fragment>
      ))}
    </React.Fragment>
  ));

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={CategorySchema}
      onSubmit={categoryInputsSubmitHandler(
        navigate,
        categoryId ? categoryId : null
      )}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik01" + randomId}
              label="Tên danh mục"
              type="text"
              name="name"
            />
          </Row>
          <Row className="mb-3">
            <FormSelectField
              as={Col}
              controlId={"validationFormik03" + randomId}
              label="Danh mục này là danh mục con của..."
              type="select"
              name="parentCategory"
              defaultValue={values.parentCategory}
            >
              <option value="">Không. Đây là danh mục cha.</option>
              {categoriesOptions}
            </FormSelectField>
          </Row>
          <Row className="mb-3">
            <FormFileUploadWithPreview
              as={Col}
              controlId={"validationFormik03" + randomId}
              label="Thêm hình ảnh cho danh mục"
              type="text"
              name="name"
              desiredFunction={(e) => {
                const file = e.currentTarget.files[0];

                setFieldValue("image", file);
              }}
              image={values.image}
            />
          </Row>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <div className="text-right">
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Lưu danh mục mới {isSubmitting && <LoadingSpinner />}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CategoryInputs;
