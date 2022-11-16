import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import React, { useContext, useEffect, useState } from "react";
import FormFileUploadWithPreview from "../../../../../../common/components/FormFileUploadWithPreview";
import { CategorySchema } from "../../../../../../common/utils/validationSchema";
import Button from "react-bootstrap/Button";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import { useNavigate } from "react-router-dom";
import Category from "./categoryForm-utils/Category";
import categoryInputsSubmitHandler from "./server/categoryInputsSubmitHandler";
import LoadingSpinner from "../../../../../../common/components/LoadingSpinner";
import MessageContext from "../../../../../../store/message-context";
import useFetchingFormData from "../../../../../../hooks/use-fetching-form-data";
import { recursiveChildrenCategoryAdditionForFetching } from "../../../../../../common/utils/recursiveChildrenCategoryAdditionForFetching";
import RecursiveCategoryOptions from "../../../../../../common/components/RecursiveCategoryOptions";

const CategoryInputs = ({ randomId, categoryId }) => {
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
  const [initialFormValue, setInitialFormValue] = useState(
    new Category("", "", "")
  );
  const [categories, setCategories] = useState([]);

  const { fetchData: fetchCategories } = useFetchingFormData(
    "api/admin/category",
    setCategories,
    recursiveChildrenCategoryAdditionForFetching,
    "Không lấy được danh sách các danh mục sản phẩm cho form! Bạn hãy thử refresh lại trang."
  );

  function transformCurrentEditingCategoryId(response) {
    const { name, img_url, parent_category_id } = response.data;
    return new Category(
      name,
      parent_category_id === null ? "" : parent_category_id.toString(),
      img_url
    );
  }

  const { fetchData: fetchCurrentEditingCategoryId } = useFetchingFormData(
    `api/admin/category/${categoryId}`,
    setInitialFormValue,
    transformCurrentEditingCategoryId,
    "Không lấy được thông tin danh mục mà bạn cần chỉnh sửa! Bạn hãy thử refresh lại trang."
  );

  useEffect(() => {
    fetchCategories();
    if (categoryId) {
      fetchCurrentEditingCategoryId();
    }
  }, [categoryId, fetchCategories, fetchCurrentEditingCategoryId]);

  let categoryOptions;

  categoryOptions = categories.map((category, i) => {
    return (
      <RecursiveCategoryOptions
        key={i}
        category={category}
        childrenRecursive={category.children}
      />
    );
  });

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={CategorySchema}
      onSubmit={categoryInputsSubmitHandler(
        navigate,
        categoryId ? categoryId : null,
        setMessage
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
              {categoryOptions}
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
          {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
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
