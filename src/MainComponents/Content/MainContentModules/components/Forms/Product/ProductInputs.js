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
import {
  tokenHeaderConfig,
  userToken,
} from "../../../../../../common/utils/api-config";
import Merchant from "./productForm-utils/Merchant";
import Warehouse from "./productForm-utils/Warehouse";
import Category from "./productForm-utils/Category";
import "@ckeditor/ckeditor5-build-classic/build/translations/vi";
import FormTextAreaField from "../../../../../../common/components/FormTextAreaField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Categorical from "./productForm-utils/Categorical";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ProductSchema } from "../../../../../../common/utils/validationSchema";

const ProductInputs = () => {
  // const [showCategorical, setShowCategorical] = useState(false);

  const initialFormValue = new Product(
    "",
    "",
    0,

    0,
    0,

    "",
    0,
    units[0],

    "",
    [],
    [],

    "",
    "",
    "",
    [new Categorical("", "", "", 0, "")]
  );

  // const [fileState, setFileState] = useState([]);
  // const fileUploadHandler = (e) => {
  //   console.log(e.target);
  //   // setFileState([...prevState, e.target.files])
  // };

  // console.log(warehouses);

  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const fetchMerchantsHandler = useCallback(async () => {
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
      // console.log(transformedCategories);
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

  useEffect(() => {
    fetchMerchantsHandler();
  }, [fetchMerchantsHandler]);

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

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={ProductSchema}
      onSubmit={async (values) => {
        // console.log(values.categoricalInfo);

        try {
          alert(JSON.stringify(values, null, 2));

          // values.categoricalInfo.forEach((info, index) => {
          //   const formData = new FormData();
          //   formData.append("hinh", info.imageOneUrl);
          //   info.imageOneUrl = formData;
          // });

          const {
            productName: name,
            productBrand: brand,
            productCategory: category_id,
            productSummary: summary,
            productDescription: desc,
            productDetailInfo: detail_info,
            productSku: SKU,
            productMass: mass,
            productCostPrice: cost_price,
            productPrice: price,
            productUnit: unit,
            productStatus: status,
            productMerchant: merchant_ids,
            productWarehouse: warehouse_ids,
            categoricalInfo: models,
          } = values;

          const data = new FormData();
          data.append("name", name);
          data.append("brand", brand);
          data.append("category_id", category_id);
          data.append("summary", summary);
          data.append("desc", desc);
          data.append("detail_info", detail_info);
          data.append("SKU", SKU);
          data.append("mass", mass);
          data.append("cost_price", cost_price);
          data.append("price", price);
          data.append("unit", unit);
          data.append("status", status);
          data.append("merchant_ids", JSON.stringify(merchant_ids));
          data.append("warehouse_ids", JSON.stringify(warehouse_ids));

          models.forEach((model, i) => {
            for (const property in model) {
              if (property === "imageOneUrl") {
                data.append(`models[${i}][image_1]`, model[property]);
                continue;
              }
              if (property === "imageTwoUrl") {
                // if (
                //   model[property] !== undefined ||
                //   model[property] !== null ||
                //   model[property].length !== 0
                // ) {
                data.append(`models[${i}][image_2]`, model[property]);
                // } else {
                //   data.append(`models[${i}][image_2]`, "");
                // }
                continue;
              }

              if (property !== "imageTwoUrl") {
                data.append(`models[${i}][${property}]`, model[property]);
              }
            }
          });

          await apiClient.get("/sanctum/csrf-cookie");

          const productResponse = await apiClient.post(
            "api/admin/product",
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Accept: "application/json",
              },
            }
          );

          console.log(productResponse);
        } catch (error) {
          console.log(error);
          setError(error.response.data.message);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            {error && error.length > 0 && (
              <div
                className="alert alert-danger"
                style={{ width: "100%" }}
                role="alert"
              >
                <i className="icon fas fa-ban"></i> {error}
              </div>
            )}
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId="validationFormik01"
              label="SKU"
              type="text"
              name="productSku"
            />
            <FormField
              as={Col}
              controlId="validationFormik02"
              label="Tên sản phẩm"
              type="text"
              name="productName"
            />
            <FormSelectField
              as={Col}
              controlId="validationFormik03"
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
              controlId="validationFormik04"
              label="Đơn giá"
              type="number"
              step="1000"
              min="0"
              name="productPrice"
            />
            <FormField
              as={Col}
              controlId="validationFormik05"
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
              controlId="validationFormik06"
              label="Hãng"
              type="text"
              name="productBrand"
            />
            <FormField
              as={Col}
              controlId="validationFormik07"
              label="Khối lượng"
              type="number"
              name="productMass"
            />
            <FormSelectField
              as={Col}
              controlId="validationFormik08"
              label="Đơn vị của khối lượng"
              type="text"
              name="productUnit"
            >
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
              controlId="validationFormik09"
              label="Trạng thái sản phẩm"
              type="text"
              name="productStatus"
            >
              <option value="Ẩn">Ẩn</option>
              <option value="Hiển thị">Hiển thị</option>
            </FormSelectField>
          </Row>
          <Row className="mb-3">
            <FormSelectField
              as={Col}
              controlId="validationFormik10"
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
              controlId="validationFormik11"
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
              controlId="validationFormik12"
              name="productSummary"
              label="Tóm tắt sản phẩm"
              type="text"
            />
          </Row>
          <Row className="mb-3">
            <FormTextAreaField
              as={Col}
              controlId="validationFormik13"
              label="Miêu tả sản phẩm"
              name="productDescription"
              additionalConfig={{
                toolbar: ["bold", "italic", "bulletedList"],
              }}
            />
          </Row>
          <Row className="mb-3">
            <FormTextAreaField
              as={Col}
              controlId="validationFormik14"
              label="Thông tin chi tiết"
              name="productDetailInfo"
              additionalConfig={{ removePlugins: ["Heading"] }}
            />
          </Row>
          <Row className="mb-3">
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
                                controlId="validationFormik110"
                                type="text"
                                placeholder="Nhập tên kiểu loại sản phẩm"
                              />

                              <FormField
                                as={Col}
                                label={`Mã màu kiểu loại
                                  ${index === 0 ? "mặc định" : index + 1}`}
                                name={`categoricalInfo[${index}].colorCode`}
                                controlId="validationFormik111"
                                type="text"
                                placeholder="Nhập mã màu của kiểu loại"
                              />

                              <FormField
                                as={Col}
                                label={`Số lượng sản phẩm của kiểu loại
                                    ${index === 0 ? "mặc định" : index + 1}`}
                                name={`categoricalInfo[${index}].quantity`}
                                controlId="validationFormik112"
                                type="number"
                                min="0"
                                placeholder="Nhập số lượng sản phẩm của kiểu loại"
                              />
                            </Row>
                            <Row>
                              {/*  <FormField*/}
                              {/*    as={Col}*/}
                              {/*    label={`Hình cover cho kiểu loại*/}
                              {/*${index === 0 ? " mặc định" : index + 1}`}*/}
                              {/*    name={`categoricalInfo.${index}.imageOneUrl`}*/}
                              {/*    controlId="validationFormik113"*/}
                              {/*    type="file"*/}
                              {/*    onChange={(e) => {*/}
                              {/*      console.log(e.currentTarget.files[0]);*/}

                              {/*      // setFieldValue(*/}
                              {/*      //   `categoricalInfo.${index}.imageOneUrl`,*/}
                              {/*      //   e.currentTarget.files[0]*/}
                              {/*      // );*/}
                              {/*    }}*/}
                              {/*  />*/}

                              <Col>
                                <Form.Label>
                                  Hình cover cho kiểu loại{" "}
                                  {index === 0 ? " mặc định" : index + 1}
                                </Form.Label>
                                <Form.Control
                                  name={`categoricalInfo.${index}.imageOneUrl`}
                                  type="file"
                                  onChange={(e) => {
                                    const file = e.currentTarget.files[0];

                                    setFieldValue(
                                      `categoricalInfo.${index}.imageOneUrl`,
                                      file
                                    );

                                    // setFileState((prevState) => {
                                    //   const newState = [...prevState];
                                    //   newState.push(file);
                                    //   return newState;
                                    // });
                                  }}
                                />

                                {values.categoricalInfo[index].imageOneUrl && (
                                  <img
                                    style={{ width: "240px", height: "auto" }}
                                    src={
                                      values.categoricalInfo[index]
                                        .imageOneUrl &&
                                      URL.createObjectURL(
                                        values.categoricalInfo[index]
                                          .imageOneUrl
                                      )
                                    }
                                    alt=""
                                  />
                                )}
                              </Col>

                              {index === 0 && (
                                // <FormField
                                //   as={Col}
                                //   label={`Hình on hover cho kiểu loại
                                //       ${index === 0 ? " mặc định" : index + 1}`}
                                //   name={`categoricalInfo.${index}.imageTwoUrl`}
                                //   controlId="validationFormik115"
                                //   type="file"
                                //

                                <Col>
                                  <Form.Label>
                                    Hình on hover cho kiểu loại{" "}
                                    {index === 0 ? " mặc định" : index + 1}
                                  </Form.Label>
                                  <Form.Control
                                    name={`categoricalInfo.${index}.imageTwoUrl`}
                                    type="file"
                                    onChange={(e) => {
                                      const file = e.currentTarget.files[0];

                                      setFieldValue(
                                        `categoricalInfo.${index}.imageTwoUrl`,
                                        file
                                      );
                                    }}
                                  />

                                  {values.categoricalInfo[index]
                                    .imageTwoUrl && (
                                    <img
                                      style={{
                                        width: "240px",
                                        height: "auto",
                                      }}
                                      src={
                                        values.categoricalInfo[index]
                                          .imageTwoUrl &&
                                        URL.createObjectURL(
                                          values.categoricalInfo[index]
                                            .imageTwoUrl
                                        )
                                      }
                                      alt=""
                                    />
                                  )}
                                </Col>
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
                  <div className="text-center">
                    <Button
                      onClick={() =>
                        push(
                          new Categorical(
                            "",
                            "",
                            "",
                            0,
                            values.categoricalInfo.length === 0 ? "" : undefined
                          )
                        )
                      }
                    >
                      Thêm kiểu loại
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>
          </Row>

          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Button variant="primary" type="submit" disabled={!isValid}>
            Gửi thông tin
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default ProductInputs;
