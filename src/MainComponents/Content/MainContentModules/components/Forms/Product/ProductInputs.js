import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useCallback, useEffect, useState } from "react";
import Product from "./productForm-utils/Product";
import { FieldArray, Formik } from "formik";
import FormField from "../../../../../../common/components/FormField";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import { units } from "../../../../../../common/utils/units";

import apiClient from "../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../common/utils/api-config";

import Merchant from "./productForm-utils/Merchant";
import Warehouse from "./productForm-utils/Warehouse";
import Category from "./productForm-utils/Category";
import "@ckeditor/ckeditor5-build-classic/build/translations/vi";
import FormTextAreaField from "../../../../../../common/components/FormTextAreaField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Categorical from "./productForm-utils/Categorical";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ProductSchema } from "../../../../../../common/utils/validationSchema";
// import transformProductFormData from "./server/transformProductFormData";
import classes from "./ProductInputs.module.css";
import FormFileUploadWithPreview from "../../../../../../common/components/FormFileUploadWithPreview";
import productInputSubmitHandler from "./server/productInputSubmitHandler";
import productInputEditProductSubmitHandler from "./server/productInputEditProductSubmitHandler";
import { useNavigate } from "react-router-dom";

const ProductInputs = (props) => {
  const navigate = useNavigate();
  const [initialFormValue, setInitialFormValue] = useState(
    new Product(
      "",
      "",
      0,

      0,
      0,

      "",
      0,
      "",

      "",
      [],
      [],

      "",
      "",
      "",
      [new Categorical("", "", "", 0, "")]
    )
  );

  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const fetchMerchantsWarehousesCategoriesHandler = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");

      const categoriesResponse = await apiClient.get(
        "api/admin/category",
        tokenHeaderConfig
      );

      const warehousesResponse = await apiClient.get(
        "api/admin/warehouse",
        tokenHeaderConfig
      );
      const merchantsResponse = await apiClient.get(
        "api/admin/merchant",
        tokenHeaderConfig
      );
      // console.log(categoriesResponse.data);

      const transformedCategories = categoriesResponse.data.map((category) => {
        return new Category(
          category.id,
          category.name,
          category["children_recursive"]
        );
      });
      const transformedMerchants = merchantsResponse.data.map((merchant) => {
        return new Merchant(merchant.id, merchant.name);
      });

      const transformedWarehouses = warehousesResponse.data.map((warehouse) => {
        return new Warehouse(warehouse.id, warehouse.name);
      });
      setCategories(transformedCategories);
      setMerchants(transformedMerchants);
      setWarehouses(transformedWarehouses);
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);

  const fetchCurrentEditingProduct = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");

      const productResponse = await apiClient.get(
        `api/admin/product/${props.productId}`,
        tokenHeaderConfig
      );
      const {
        category_id: apiCategoryId,
        name: apiName,
        brand: apiBrand,
        summary: apiSummary,
        desc: apiDesc,
        detail_info: apiDetailInfo,
        SKU: apiSKU,
        mass: apiMass,
        cost_price: apiCostPrice,
        price: apiPrice,
        unit: apiUnit,
        status: apiStatus,
        merchants: apiMerchants,
        warehouses: apiWarehouses,
        kinds: apiCategoricalInfo,
      } = productResponse.data[0];

      const transformedMerchants = apiMerchants.map((merchant) => merchant.id);
      const transformedWarehouses = apiWarehouses.map(
        (warehouse) => warehouse.id
      );

      const transformedCategoricalInfo = apiCategoricalInfo.map((model) => {
        return new Categorical(
          model.name,
          model.hex_color,
          model.image_1,
          model.quantity,
          model.image_2
        );
      });

      setInitialFormValue(
        new Product(
          apiSKU,
          apiName,
          apiCategoryId,
          apiPrice,
          apiCostPrice,
          apiBrand,
          apiMass,
          apiUnit,
          apiStatus,
          transformedMerchants,
          transformedWarehouses,
          apiSummary,
          apiDesc,
          apiDetailInfo,
          transformedCategoricalInfo
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [props.productId]);

  useEffect(() => {
    fetchMerchantsWarehousesCategoriesHandler();

    if (props.productId) {
      fetchCurrentEditingProduct();
    }
  }, [
    fetchCurrentEditingProduct,
    fetchMerchantsWarehousesCategoriesHandler,
    props.productId,
  ]);

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
  const [error, setError] = useState("");

  function addCategoricalInfoClickHandler(push, values) {
    return () =>
      push(
        new Categorical(
          "",
          "",
          "",
          0,
          values.categoricalInfo.length === 0 ? "" : undefined
        )
      );
  }

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={ProductSchema}
      onSubmit={
        props.productId
          ? productInputEditProductSubmitHandler(
              setError,
              props.productId,
              navigate
            )
          : productInputSubmitHandler(setError, navigate)
      }
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            {error && error.length > 0 && (
              <div
                className={"alert alert-danger " + classes["full-width"]}
                role="alert"
              >
                <i className="icon fas fa-ban"></i> {error}
              </div>
            )}
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik01" + props.randomId}
              label="SKU"
              type="text"
              name="productSku"
            />
            <FormField
              as={Col}
              controlId={"validationFormik02" + props.randomId}
              label="Tên sản phẩm"
              type="text"
              name="productName"
            />
            <FormSelectField
              as={Col}
              controlId={"validationFormik03" + props.randomId}
              label="Danh mục"
              type="text"
              name="productCategory"
              defaultValue=""
            >
              <option value="">Chọn danh mục cho sản phẩm</option>
              {categoriesOptions}
            </FormSelectField>
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik04" + props.randomId}
              label="Đơn giá"
              type="number"
              step="1000"
              min="0"
              name="productPrice"
            />
            <FormField
              as={Col}
              controlId={"validationFormik05" + props.randomId}
              label="Giá vốn"
              type="number"
              step="1000"
              min="0"
              name="productCostPrice"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik06" + props.randomId}
              label="Hãng"
              type="text"
              name="productBrand"
            />
            <FormField
              as={Col}
              controlId={"validationFormik07" + props.randomId}
              label="Khối lượng"
              type="number"
              name="productMass"
            />
            <FormSelectField
              as={Col}
              controlId={"validationFormik08" + props.randomId}
              label="Đơn vị của khối lượng"
              type="text"
              name="productUnit"
            >
              <option value="">Chọn đơn vị cho sản phẩm</option>
              {units.map((unit, i) => {
                return (
                  <option key={i} value={unit}>
                    {unit}
                  </option>
                );
              })}
            </FormSelectField>
            <FormSelectField
              as={Col}
              controlId={"validationFormik09" + props.randomId}
              label="Trạng thái sản phẩm"
              type="text"
              name="productStatus"
            >
              <option value="">Chọn trạng thái cho sản phẩm</option>
              <option value="Ẩn">Ẩn</option>
              <option value="Hiển thị">Hiển thị</option>
            </FormSelectField>
          </Row>
          <Row className="mb-3">
            <FormSelectField
              as={Col}
              controlId={"validationFormik10" + props.randomId}
              label="Nhà bán"
              type="text"
              name="productMerchant"
              multiple
            >
              {merchants.map((merchant, i) => {
                return (
                  <option key={i} value={merchant.id}>
                    {merchant.name}
                  </option>
                );
              })}
            </FormSelectField>
            <FormSelectField
              as={Col}
              controlId={"validationFormik11" + props.randomId}
              label="Nhà kho"
              type="text"
              name="productWarehouse"
              multiple
            >
              {warehouses.map((warehouse, i) => {
                return (
                  <option key={i} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                );
              })}
            </FormSelectField>
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik12" + props.randomId}
              name="productSummary"
              label="Tóm tắt sản phẩm"
              type="text"
            />
          </Row>
          <Row className="mb-3">
            <FormTextAreaField
              as={Col}
              controlId={"validationFormik13" + props.randomId}
              label="Miêu tả sản phẩm"
              name="productDescription"
              additionalConfig={{
                toolbar: ["bold", "italic", "bulletedList"],
              }}
              initialData={initialFormValue.productDescription}
            />
          </Row>
          <Row className="mb-3">
            <FormTextAreaField
              as={Col}
              controlId={"validationFormik14" + props.randomId}
              label="Thông tin chi tiết"
              name="productDetailInfo"
              additionalConfig={{ removePlugins: ["Heading"] }}
              initialData={initialFormValue.productDetailInfo}
            />
          </Row>

          <FieldArray name="categoricalInfo">
            {({ insert, remove, push }) => (
              <>
                {values.categoricalInfo &&
                  values.categoricalInfo.length > 0 &&
                  values.categoricalInfo.map((info, index) => {
                    return (
                      <Row
                        className="justify-content-md-center align-items-md-center mb-3"
                        key={index}
                      >
                        <Col>
                          <h5>
                            Kiểu loại {index === 0 ? "mặc định" : index + 1}
                          </h5>
                          <Row className="align-items-center mb-3">
                            <FormField
                              as={Col}
                              label={`Tên kiểu loại ${
                                index === 0 ? "mặc định" : index + 1
                              }`}
                              name={`categoricalInfo[${index}].name`}
                              controlId={"validationFormik110" + props.randomId}
                              type="text"
                              placeholder="Nhập tên kiểu loại sản phẩm"
                            />

                            <FormField
                              as={Col}
                              label={`Mã màu kiểu loại
                                  ${index === 0 ? "mặc định" : index + 1}`}
                              name={`categoricalInfo[${index}].colorCode`}
                              controlId={"validationFormik111" + props.randomId}
                              type="text"
                              placeholder="Nhập mã màu của kiểu loại"
                            />

                            <FormField
                              as={Col}
                              label={`Số lượng sản phẩm của kiểu loại
                                    ${index === 0 ? "mặc định" : index + 1}`}
                              name={`categoricalInfo[${index}].quantity`}
                              controlId={"validationFormik112" + props.randomId}
                              type="number"
                              min="0"
                              placeholder="Nhập số lượng sản phẩm của kiểu loại"
                            />
                          </Row>
                          <Row>
                            <FormFileUploadWithPreview
                              label={`Hình cover cho kiểu loại ${
                                index === 0 ? " mặc định" : index + 1
                              }`}
                              name={`categoricalInfo.${index}.imageOneUrl`}
                              desiredFunction={(e) => {
                                const file = e.currentTarget.files[0];
                                setFieldValue(
                                  `categoricalInfo.${index}.imageOneUrl`,
                                  file
                                );
                              }}
                              image={values.categoricalInfo[index].imageOneUrl}
                            />

                            {index === 0 && (
                              <FormFileUploadWithPreview
                                label={`Hình on hover cho kiểu loại ${
                                  index === 0 ? " mặc định" : index + 1
                                }`}
                                name={`categoricalInfo.${index}.imageTwoUrl`}
                                desiredFunction={(e) => {
                                  const file = e.currentTarget.files[0];

                                  setFieldValue(
                                    `categoricalInfo.${index}.imageTwoUrl`,
                                    file
                                  );
                                }}
                                image={
                                  values.categoricalInfo[index].imageTwoUrl
                                }
                              />
                            )}
                          </Row>
                        </Col>
                        <Col md="auto">
                          <Button
                            style={{
                              height: "fit-content",
                              borderRadius: "50%",
                            }}
                            className="btn-danger"
                            onClick={() => remove(index)}
                          >
                            <FontAwesomeIcon icon={solid("trash-can")} />
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}

                <Row style={{ justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      style={{ textAlign: "center" }}
                      onClick={addCategoricalInfoClickHandler(push, values)}
                    >
                      Thêm kiểu loại
                    </Button>
                  </div>
                </Row>
              </>
            )}
          </FieldArray>

          {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
          <div style={{ textAlign: "right" }}>
            {props.productId && (
              <Button variant="secondary" onClick={props.closeModel}>
                Đóng
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {props.productId ? "Cập nhật sản phẩm" : "Gửi thông tin"}
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
      )}
    </Formik>
  );
};
export default ProductInputs;
