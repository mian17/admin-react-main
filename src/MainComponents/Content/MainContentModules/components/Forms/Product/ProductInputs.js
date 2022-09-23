import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useCallback, useEffect, useState } from "react";
import Product from "./productForm-utils/Product";
import * as Yup from "yup";
import { Formik } from "formik";
import FormTextField from "../../../../../../common/components/FormTextField";
import FormSelectField from "../../../../../../common/components/FormSelectField";
import { units } from "../../../../../../common/utils/units";
import apiClient from "../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../common/utils/api-config";
import Merchant from "./productForm-utils/Merchant";
import Warehouse from "./productForm-utils/Warehouse";
import Category from "./productForm-utils/Category";
import "@ckeditor/ckeditor5-build-classic/build/translations/vi";
import FormTextAreaField from "../../../../../../common/components/FormTextAreaField";

const colorCodeRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
const skuRegex = "(?=\\S*[A-Z])(?=\\S*\\d)[A-Z\\d]{10,}";

const ProductSchema = Yup.object().shape({
  productSku: Yup.string()
    .matches(
      skuRegex,
      "Mã SKU của sản phẩm cần có ít nhất 1 chữ số, 1 ký tự và đúng trên 10 ký tự"
    )
    .required("Không để trống mã SKU của sản phẩm"),
  productName: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên sản phẩm"),

  productCategory: Yup.number()
    .min(1, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên danh mục"),

  productPrice: Yup.number()
    .positive("Đơn giá sản phẩm phải là số nguyên dương")
    .integer("Đơn giá sản phẩm phải là số nguyên dương")
    .min(200, "Đơn giá sản phẩm phải trên 200 VNĐ")
    .required("Không để trống đơn giá sản phẩm"),
  productCostPrice: Yup.number()
    .positive("Giá vốn sản phẩm phải là số nguyên dương")
    .integer("Giá vốn sản phẩm phải là số nguyên dương")
    .min(200, "Giá vốn sản phẩm phải trên 200 VNĐ")
    .required("Không để trống giá vốn sản phẩm"),
  productBrand: Yup.string()
    .min(2, "Dữ liệu cần dài hơn 2 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên hãng"),
  productMass: Yup.number()
    .positive("Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống khối lượng của sản phẩm"),
  productUnit: Yup.string()
    .min(1, "Tên đơn vị nằm ngoài lựa chọn")
    .max(2, "Tên đơn vị nằm ngoài lựa chọn")
    .required("Không để trống tên đơn vị khối lượng của sản phẩm"),
  productStatus: Yup.number()
    .min(0, "Status hiển thị cần là số nguyên dương")
    .integer("Status hiển thị cần là số nguyên dương")
    .lessThan(2, "Giá trị nằm ngoài các giá trị hiển thị")
    .required("Không để trống giá trị hiển thị"),
  productMerchant: Yup.array()
    .of(
      Yup.number()
        .min(1, "Sai dữ liệu")
        .integer("Sai dữ liệu")
        .required("Không để trống nhà bán")
    )
    .min(1, "Bạn cần chọn nhà bán"),
  productWarehouse: Yup.array()
    .of(
      Yup.number()
        .min(1, "Sai dữ liệu")
        .integer("Sai dữ liệu")
        .required("Không để trống nhà kho")
    )
    .min(1, "Bạn cần chọn kho"),

  productSummary: Yup.string()
    .min(1, "Nội dung tóm tắt ngắn quá")
    .max(255, "Nội dung tóm tắt dài quá")
    .required("Bạn cần phải nhập nội dung tóm tắt cho sản phẩm"),
  productDescription: Yup.string()
    .min(1, "Nội dung miêu tả sản phẩm ngắn quá")
    .max(1024, "Nội dung miêu tả sản phẩm dài quá")
    .required("Bạn cần phải nhập nội dung miêu tả cho sản phẩm"),
  productDetailInfo: Yup.string()
    .min(1, "Nội dung chi tiết sản phẩm ngắn quá")
    .max(1024, "Nội dung chi tiết sản phẩm dài quá")
    .required("Bạn cần phải nhập nội dung chi tiết cho sản phẩm"),
  productColorCode: Yup.string()
    .matches(colorCodeRegex, "Mã màu cần đúng theo định dạng #F00 hoặc #000000")
    .required("Không để trống mã màu của sản phẩm"),
  hasCategoricalInputs: Yup.boolean(),
  categoricalInfo: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Kiểu loại cần có tên"),
      colorCode: Yup.string()
        .matches(
          colorCodeRegex,
          "Mã màu cần đúng theo định dạng #F00 hoặc #000000"
        )
        .required("Không để trống mã màu của sản phẩm"),
    })
  ),
});

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

    "",

    false,
    []
  );

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

      const merchantsResponse = await apiClient.get(
        "api/admin/warehouse",
        tokenHeaderConfig
      );
      const warehousesResponse = await apiClient.get(
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
      console.log(transformedCategories);
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

  console.log(categoriesOptions);
  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={ProductSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormTextField
              as={Col}
              controlId="validationFormik01"
              label="SKU"
              type="text"
              name="productSku"
            />
            <FormTextField
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
            <FormTextField
              as={Col}
              controlId="validationFormik04"
              label="Đơn giá"
              type="number"
              step="1000"
              min="0"
              name="productPrice"
            />
            <FormTextField
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
            <FormTextField
              as={Col}
              controlId="validationFormik06"
              label="Hãng"
              type="text"
              name="productBrand"
            />
            <FormTextField
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
          </Row>
          <Row className="mb-3">
            <FormSelectField
              as={Col}
              controlId="validationFormik09"
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
              controlId="validationFormik10"
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
            <FormTextField
              as={Col}
              controlId="validationFormik11"
              name="productSummary"
              label="Tóm tắt sản phẩm"
              type="text"
            />
          </Row>
          <Row className="mb-3">
            <FormTextAreaField
              as={Col}
              controlId="validationFormik12"
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
              controlId="validationFormik13"
              label="Thông tin chi tiết"
              name="productDetailInfo"
              additionalConfig={{ removePlugins: ["Heading"] }}
            />
          </Row>
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik05" className="mb-3">*/}
          {/*      <Form.Label>Nhập hình cho sản phẩm</Form.Label>*/}
          {/*      <Form.Control type="file" multiple />*/}
          {/*      <Form.Text className="text-red">*/}
          {/*        Không để trống hình cho sản phẩm*/}
          {/*      </Form.Text>*/}
          {/*      <Form.Text className="text-red">*/}
          {/*        Phải chọn hình có tỉ lệ 1:1*/}
          {/*      </Form.Text>*/}
          {/*      <Form.Text className="text-red">*/}
          {/*        Tối thiểu và tối đa 2 hình nếu sản phẩm chỉ có 1 kiểu loại duy*/}
          {/*        nhất*/}
          {/*      </Form.Text>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Form.Group className="mb-3" controlId="validationFormik06">*/}
          {/*      <Form.Label>Mã màu</Form.Label>*/}
          {/*      <Form.Control*/}
          {/*        type="text"*/}
          {/*        name="productColorCode"*/}
          {/*        value={values.productColorCode}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productColorCode && !errors.productColorCode}*/}
          {/*        isInvalid={!!errors.productColorCode}*/}
          {/*        placeholder="Nhập mã màu tổng thể của sản phẩm"*/}
          {/*      />*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productColorCode}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row className="align-content-center justify-content-center">*/}
          {/*  <Form.Group className="mb-4" controlId="validationFormik08">*/}
          {/*    <Form.Check*/}
          {/*      type="checkbox"*/}
          {/*      label="Sản phẩm có nhiều kiểu loại?"*/}
          {/*      name="hasCategoricalInputs"*/}
          {/*      value={values.hasCategoricalInputs}*/}
          {/*      onChange={handleChange}*/}
          {/*      // isValid={touched.hasCategoricalInputs && !errors.hasCategoricalInputs}*/}
          {/*      onClick={() => {*/}
          {/*        setShowCategorical(!showCategorical);*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </Form.Group>*/}
          {/*</Row>*/}
          {/*<FieldArray name="categoricalInfo">*/}
          {/*  {({ insert, remove, push }) => (*/}
          {/*    <div>*/}
          {/*      {showCategorical && (*/}
          {/*        <div className="text-center">*/}
          {/*          <Button onClick={() => push(new Categorical("", ""))}>*/}
          {/*            Thêm kiểu loại*/}
          {/*          </Button>*/}
          {/*        </div>*/}
          {/*      )}*/}
          {/*      {values.categoricalInfo.length > 0 &&*/}
          {/*        values.categoricalInfo.map((info, index) => {*/}
          {/*          return (*/}
          {/*            <>*/}
          {/*              <h5>Kiểu loại {index + 1}</h5>*/}
          {/*              <Row key={index} className="align-items-center">*/}
          {/*                <Col>*/}
          {/*                  <Form.Group*/}
          {/*                    className="mb-3"*/}
          {/*                    controlId="validationFormik09"*/}
          {/*                  >*/}
          {/*                    <Form.Label>Tên kiểu loại {index + 1}</Form.Label>*/}
          {/*                    <Form.Control*/}
          {/*                      type="text"*/}
          {/*                      name={`categoricalInfo[${index}].name`}*/}
          {/*                      onChange={handleChange}*/}
          {/*                      placeholder="Nhập tên cho kiểu loại 1"*/}
          {/*                    />*/}

          {/*                    <FormikErrorMessage*/}
          {/*                      as={Form.Control.Feedback}*/}
          {/*                      name={`categoricalInfo[${index}].name`}*/}
          {/*                      type="invalid"*/}
          {/*                      render={(msg) => (*/}
          {/*                        <small className="text-red form-text">*/}
          {/*                          {msg}*/}
          {/*                        </small>*/}
          {/*                      )}*/}
          {/*                    />*/}
          {/*                  </Form.Group>*/}
          {/*                </Col>*/}
          {/*                <Col>*/}
          {/*                  <Form.Group*/}
          {/*                    controlId="validationFormik10"*/}
          {/*                    className="mb-3"*/}
          {/*                  >*/}
          {/*                    <Form.Label>*/}
          {/*                      Hình cho kiểu loại {index + 1}*/}
          {/*                    </Form.Label>*/}
          {/*                    <Form.Control type="file" multiple />*/}
          {/*                    <Form.Text className="text-red">*/}
          {/*                      Phải chọn hình có tỉ lệ 1:1*/}
          {/*                    </Form.Text>*/}
          {/*                  </Form.Group>*/}
          {/*                </Col>*/}
          {/*                <Col>*/}
          {/*                  <Form.Group*/}
          {/*                    className="mb-3"*/}
          {/*                    controlId="validationFormik11"*/}
          {/*                  >*/}
          {/*                    <Form.Label>*/}
          {/*                      Mã màu kiểu loại {index + 1}*/}
          {/*                    </Form.Label>*/}
          {/*                    <Form.Control*/}
          {/*                      type="text"*/}
          {/*                      name={`categoricalInfo.${index}.colorCode`}*/}
          {/*                      onChange={handleChange}*/}
          {/*                      // name="categoricalProduct1Name"*/}
          {/*                      placeholder="Nhập mã màu tổng thể của sản phẩm"*/}
          {/*                    />*/}
          {/*                    <FormikErrorMessage*/}
          {/*                      as={Form.Control.Feedback}*/}
          {/*                      name={`categoricalInfo.${index}.colorCode`}*/}
          {/*                      type="invalid"*/}
          {/*                      render={(msg) => (*/}
          {/*                        <small className="text-red form-text">*/}
          {/*                          {msg}*/}
          {/*                        </small>*/}
          {/*                      )}*/}
          {/*                    />*/}
          {/*                  </Form.Group>*/}
          {/*                </Col>*/}

          {/*                <Button*/}
          {/*                  style={{*/}
          {/*                    height: "fit-content",*/}
          {/*                    borderRadius: "50%",*/}
          {/*                  }}*/}
          {/*                  className="btn-danger"*/}
          {/*                  onClick={() => remove(index)}*/}
          {/*                >*/}
          {/*                  <FontAwesomeIcon icon={solid("trash-can")} />*/}
          {/*                </Button>*/}
          {/*              </Row>*/}
          {/*            </>*/}
          {/*          );*/}
          {/*        })}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</FieldArray>*/}

          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik16" className="mb-3">*/}
          {/*      <Form.Label>Danh mục</Form.Label>*/}
          {/*      <Form.Select*/}
          {/*        className="form-control"*/}
          {/*        aria-label="Chọn danh mục"*/}
          {/*        name="productCategory"*/}
          {/*        value={values.productCategory}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productCategory && !errors.productCategory}*/}
          {/*        isInvalid={!!errors.productCategory}*/}
          {/*      >*/}
          {/*        <option value="0">Trái cây</option>*/}
          {/*        <option value="1">Thịt - trứng</option>*/}
          {/*        <option value="2">Đồ dùng gia đình</option>*/}
          {/*      </Form.Select>*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productCategory}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik17" className="mb-3">*/}
          {/*      <Form.Label>Trạng thái</Form.Label>*/}
          {/*      <Form.Select*/}
          {/*        className="form-control"*/}
          {/*        aria-label="Chọn trạng thái"*/}
          {/*        name="productStatus"*/}
          {/*        value={values.productStatus}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productStatus && !errors.productStatus}*/}
          {/*        isInvalid={!!errors.productStatus}*/}
          {/*      >*/}
          {/*        <option value="0">Ẩn</option>*/}
          {/*        <option value="1">Hiển thị</option>*/}
          {/*      </Form.Select>*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productStatus}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik18" className="mb-3">*/}
          {/*      <Form.Label>Nhà bán</Form.Label>*/}
          {/*      <Form.Select*/}
          {/*        className="form-control"*/}
          {/*        aria-label="Chọn trạng thái"*/}
          {/*        name="productMerchant"*/}
          {/*        value={values.productMerchant}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productMerchant && !errors.productMerchant}*/}
          {/*        isInvalid={!!errors.productMerchant}*/}
          {/*      >*/}
          {/*        <option value="0">Vinamilk Official Store</option>*/}
          {/*        <option value="1">TH True Milk Official Store</option>*/}
          {/*      </Form.Select>*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productMerchant}*/}
          {/*      </Form.Control.Feedback>*/}

          {/*      /!*<Form.Text className="text-red">Chưa chọn nhà bán</Form.Text>*!/*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik19" className="mb-3">*/}
          {/*      <Form.Label>Hãng của sản phẩm</Form.Label>*/}
          {/*      <Form.Control*/}
          {/*        type="text"*/}
          {/*        placeholder="Nhập hãng của sản phẩm"*/}
          {/*        name="productBrand"*/}
          {/*        value={values.productBrand}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productBrand && !errors.productBrand}*/}
          {/*        isInvalid={!!errors.productBrand}*/}
          {/*      />*/}
          {/*      /!*<Form.Text className="text-red">*!/*/}
          {/*      /!*  Chưa nhập tên hãng của sản phẩm*!/*/}
          {/*      /!*</Form.Text>*!/*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productBrand}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik20" className="mb-3">*/}
          {/*      <Form.Label>SKU</Form.Label>*/}
          {/*      <Form.Control*/}
          {/*        type="text"*/}
          {/*        placeholder="Nhập SKU của sản phẩm"*/}
          {/*        name="productSku"*/}
          {/*        value={values.productSku}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productSku && !errors.productSku}*/}
          {/*        isInvalid={!!errors.productSku}*/}
          {/*      />*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productSku}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik21" className="mb-3">*/}
          {/*      <Form.Label>Khối lượng (g)</Form.Label>*/}
          {/*      <Form.Control*/}
          {/*        type="number"*/}
          {/*        min="0"*/}
          {/*        placeholder="Nhập khối lượng sản phẩm tính bằng gram"*/}
          {/*        name="productMass"*/}
          {/*        value={values.productMass}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productMass && !errors.productMass}*/}
          {/*        isInvalid={!!errors.productMass}*/}
          {/*      />*/}
          {/*      /!*<Form.Text className="text-red">*!/*/}
          {/*      /!*  Chưa nhập tên hãng của sản phẩm*!/*/}
          {/*      /!*</Form.Text>*!/*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productMass}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik22" className="mb-3">*/}
          {/*      <Form.Label>Đơn vị</Form.Label>*/}
          {/*      <Form.Select*/}
          {/*        className="form-control"*/}
          {/*        aria-label="Chọn đơn vị"*/}
          {/*        name="productUnit"*/}
          {/*        value={values.productUnit}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productUnit && !errors.productUnit}*/}
          {/*        isInvalid={!!errors.productUnit}*/}
          {/*      >*/}
          {/*        <option value="0">Cái</option>*/}
          {/*        <option value="1">Bộ</option>*/}
          {/*      </Form.Select>*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productUnit}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Form.Group controlId="validationFormik17" className="mb-3">*/}
          {/*      <Form.Label>Nhà kho</Form.Label>*/}
          {/*      <Form.Select*/}
          {/*        className="form-control"*/}
          {/*        aria-label="Chọn trạng thái"*/}
          {/*        name="productWarehouse"*/}
          {/*        value={values.productWarehouse}*/}
          {/*        onChange={handleChange}*/}
          {/*        isValid={touched.productWarehouse && !errors.productWarehouse}*/}
          {/*        isInvalid={!!errors.productWarehouse}*/}
          {/*      >*/}
          {/*        <option value="0">Kho 1</option>*/}
          {/*        <option value="1">Kho 2</option>*/}
          {/*      </Form.Select>*/}
          {/*      <Form.Control.Feedback type="invalid">*/}
          {/*        {errors.productWarehouse}*/}
          {/*      </Form.Control.Feedback>*/}
          {/*    </Form.Group>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*disabled={!isValid}*/}
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Button variant="primary" type="submit">
            Gửi thông tin
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default ProductInputs;
