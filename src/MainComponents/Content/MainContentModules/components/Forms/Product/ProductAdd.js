import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import {
  Formik,
  Field as FormikField,
  FieldArray,
  ErrorMessage as FormikErrorMessage,
} from "formik";

import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const colorCodeRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
const skuRegex = "(?=\\S*[A-Z])(?=\\S*\\d)[A-Z\\d]{10,}";

const ProductSchema = Yup.object().shape({
  productId: Yup.number().positive().integer(),
  productName: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên sản phẩm"),

  productQuantity: Yup.number()
    .positive("Số lượng sản phẩm phải là số nguyên dương")
    .integer("Số lượng sản phẩm phải là số nguyên dương")
    .required("Không để trống số lượng sản phẩm"),

  productPrice: Yup.number()
    .positive("Đơn giá sản phẩm phải là số nguyên dương")
    .integer("Đơn giá sản phẩm phải là số nguyên dương")
    .min(200, "Đơn giá sản phẩm phải trên 200 VNĐ")
    .required("Không để trống đơn giá sản phẩm"),
  productColorCode: Yup.string()
    .matches(colorCodeRegex, "Mã màu cần đúng theo định dạng #F00 hoặc #000000")
    .required("Không để trống mã màu của sản phẩm"),
  productCostPrice: Yup.number()
    .positive("Giá vốn sản phẩm phải là số nguyên dương")
    .integer("Giá vốn sản phẩm phải là số nguyên dương")
    .min(200, "Giá vốn sản phẩm phải trên 200 VNĐ")
    .required("Không để trống giá vốn sản phẩm"),
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
  productCategory: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên danh mục"),
  productStatus: Yup.number()
    .min(0, "Status hiển thị cần là số nguyên dương")
    .integer("Status hiển thị cần là số nguyên dương")
    .lessThan(2, "Giá trị nằm ngoài các giá trị hiển thị")
    .required("Không để trống giá trị hiển thị"),
  productMerchant: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên nhà bán"),
  productBrand: Yup.string()
    .min(2, "Dữ liệu cần dài hơn 2 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên hãng"),
  productSku: Yup.string()
    .matches(
      skuRegex,
      "Mã SKU của sản phẩm cần có ít nhất 1 chữ số, 1 ký tự và tổng thể là đúng 10 ký tự"
    )
    .required("Không để trống mã SKU của sản phẩm"),
  productMass: Yup.number()
    .positive("Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống khối lượng của sản phẩm"),
  productUnit: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống đơn vị của sản phẩm"),
});

const ProductAdd = () => {
  const [showCategorical, setShowCategorical] = useState(false);

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo sản phẩm</h3>
      </div>
      <Formik
        initialValues={{
          productId: "",
          productName: "",
          productQuantity: 0,
          productPrice: 0,
          productColorCode: "",
          productCostPrice: 0,
          hasCategoricalInputs: false,
          categoricalInfo: [],
          productCategory: 0,
          productStatus: 0,
          productMerchant: 0,
          productBrand: "",
          productSku: "",
          productMass: 0,
          productUnit: 0,
          productWarehouse: 0,
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          // console.log(values);
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
          <Form className="card-body" noValidate onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik01">
                  <Form.Label>Mã sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="productId"
                    value={values.productId}
                    onChange={handleChange}
                    isValid={touched.productId && !errors.productId}
                    placeholder="Nếu không nhập thì hệ thống sẽ tự động thêm"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik02">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    isValid={touched.productName && !errors.productName}
                    isInvalid={!!errors.productName}
                    onBlur={handleBlur}
                    placeholder="Nhập tên sản phẩm"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik03">
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    name="productQuantity"
                    value={values.productQuantity}
                    onChange={handleChange}
                    isValid={touched.productQuantity && !errors.productQuantity}
                    isInvalid={!!errors.productQuantity}
                    min="0"
                    placeholder="Nhập số lượng sản phẩm"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productQuantity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik04">
                  <Form.Label>Đơn giá</Form.Label>
                  <Form.Control
                    type="number"
                    name="productPrice"
                    value={values.productPrice}
                    onChange={handleChange}
                    isValid={touched.productPrice && !errors.productPrice}
                    isInvalid={!!errors.productPrice}
                    placeholder="Nhập đơn giá cho sản phẩm"
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productPrice}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik07">
                  <Form.Label>Giá vốn</Form.Label>
                  <Form.Control
                    type="number"
                    name="productCostPrice"
                    value={values.productCostPrice}
                    onChange={handleChange}
                    isValid={
                      touched.productCostPrice && !errors.productCostPrice
                    }
                    isInvalid={!!errors.productCostPrice}
                    min="0"
                    placeholder="Nhập giá vốn cho sản phẩm"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productCostPrice}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationFormik05" className="mb-3">
                  <Form.Label>Nhập hình cho sản phẩm</Form.Label>
                  <Form.Control type="file" multiple />
                  <Form.Text className="text-red">
                    Không để trống hình cho sản phẩm
                  </Form.Text>
                  <Form.Text className="text-red">
                    Phải chọn hình có tỉ lệ 1:1
                  </Form.Text>
                  <Form.Text className="text-red">
                    Tối thiểu và tối đa 2 hình nếu sản phẩm chỉ có 1 kiểu loại
                    duy nhất
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationFormik06">
                  <Form.Label>Mã màu</Form.Label>
                  <Form.Control
                    type="text"
                    name="productColorCode"
                    value={values.productColorCode}
                    onChange={handleChange}
                    isValid={
                      touched.productColorCode && !errors.productColorCode
                    }
                    isInvalid={!!errors.productColorCode}
                    placeholder="Nhập mã màu tổng thể của sản phẩm"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productColorCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-content-center justify-content-center">
              <Form.Group className="mb-4" controlId="validationFormik08">
                <Form.Check
                  type="checkbox"
                  label="Sản phẩm có nhiều kiểu loại?"
                  name="hasCategoricalInputs"
                  value={values.hasCategoricalInputs}
                  onChange={handleChange}
                  // isValid={touched.hasCategoricalInputs && !errors.hasCategoricalInputs}
                  onClick={() => {
                    setShowCategorical(!showCategorical);
                  }}
                />
              </Form.Group>
            </Row>
            <FieldArray name="categoricalInfo">
              {({ insert, remove, push }) => (
                <div>
                  {showCategorical && (
                    <div className="text-center">
                      <Button onClick={() => push({ name: "", colorCode: "" })}>
                        Thêm kiểu loại
                      </Button>
                    </div>
                  )}
                  {values.categoricalInfo.length > 0 &&
                    values.categoricalInfo.map((info, index) => {
                      return (
                        <>
                          <h5>Kiểu loại {index + 1}</h5>
                          <Row key={index} className="align-items-center">
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="validationFormik09"
                              >
                                <Form.Label>
                                  Tên kiểu loại {index + 1}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`categoricalInfo[${index}].name`}
                                  onChange={handleChange}
                                  placeholder="Nhập tên cho kiểu loại 1"
                                />

                                <FormikErrorMessage
                                  as={Form.Control.Feedback}
                                  name={`categoricalInfo[${index}].name`}
                                  type="invalid"
                                  render={(msg) => (
                                    <small className="text-red form-text">
                                      {msg}
                                    </small>
                                  )}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group
                                controlId="validationFormik10"
                                className="mb-3"
                              >
                                <Form.Label>
                                  Hình cho kiểu loại {index + 1}
                                </Form.Label>
                                <Form.Control type="file" multiple />
                                <Form.Text className="text-red">
                                  Phải chọn hình có tỉ lệ 1:1
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId="validationFormik11"
                              >
                                <Form.Label>
                                  Mã màu kiểu loại {index + 1}
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`categoricalInfo.${index}.colorCode`}
                                  onChange={handleChange}
                                  // name="categoricalProduct1Name"
                                  placeholder="Nhập mã màu tổng thể của sản phẩm"
                                />
                                <FormikErrorMessage
                                  as={Form.Control.Feedback}
                                  name={`categoricalInfo.${index}.colorCode`}
                                  type="invalid"
                                  render={(msg) => (
                                    <small className="text-red form-text">
                                      {msg}
                                    </small>
                                  )}
                                />
                              </Form.Group>
                            </Col>

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
                          </Row>
                        </>
                      );
                    })}
                </div>
              )}
            </FieldArray>

            <Row>
              <Col>
                <Form.Group controlId="validationFormik16" className="mb-3">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Select
                    className="form-control"
                    aria-label="Chọn danh mục"
                    name="productCategory"
                    value={values.productCategory}
                    onChange={handleChange}
                    isValid={touched.productCategory && !errors.productCategory}
                    isInvalid={!!errors.productCategory}
                  >
                    <option value="0">Trái cây</option>
                    <option value="1">Thịt - trứng</option>
                    <option value="2">Đồ dùng gia đình</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productCategory}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik17" className="mb-3">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    className="form-control"
                    aria-label="Chọn trạng thái"
                    name="productStatus"
                    value={values.productStatus}
                    onChange={handleChange}
                    isValid={touched.productStatus && !errors.productStatus}
                    isInvalid={!!errors.productStatus}
                  >
                    <option value="0">Ẩn</option>
                    <option value="1">Hiển thị</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productStatus}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationFormik18" className="mb-3">
                  <Form.Label>Nhà bán</Form.Label>
                  <Form.Select
                    className="form-control"
                    aria-label="Chọn trạng thái"
                    name="productMerchant"
                    value={values.productMerchant}
                    onChange={handleChange}
                    isValid={touched.productMerchant && !errors.productMerchant}
                    isInvalid={!!errors.productMerchant}
                  >
                    <option value="0">Vinamilk Official Store</option>
                    <option value="1">TH True Milk Official Store</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productMerchant}
                  </Form.Control.Feedback>

                  {/*<Form.Text className="text-red">Chưa chọn nhà bán</Form.Text>*/}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik19" className="mb-3">
                  <Form.Label>Hãng của sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập hãng của sản phẩm"
                    name="productBrand"
                    value={values.productBrand}
                    onChange={handleChange}
                    isValid={touched.productBrand && !errors.productBrand}
                    isInvalid={!!errors.productBrand}
                  />
                  {/*<Form.Text className="text-red">*/}
                  {/*  Chưa nhập tên hãng của sản phẩm*/}
                  {/*</Form.Text>*/}
                  <Form.Control.Feedback type="invalid">
                    {errors.productBrand}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationFormik20" className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập SKU của sản phẩm"
                    name="productSku"
                    value={values.productSku}
                    onChange={handleChange}
                    isValid={touched.productSku && !errors.productSku}
                    isInvalid={!!errors.productSku}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productSku}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik21" className="mb-3">
                  <Form.Label>Khối lượng (g)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Nhập khối lượng sản phẩm tính bằng gram"
                    name="productMass"
                    value={values.productMass}
                    onChange={handleChange}
                    isValid={touched.productMass && !errors.productMass}
                    isInvalid={!!errors.productMass}
                  />
                  {/*<Form.Text className="text-red">*/}
                  {/*  Chưa nhập tên hãng của sản phẩm*/}
                  {/*</Form.Text>*/}
                  <Form.Control.Feedback type="invalid">
                    {errors.productMass}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationFormik22" className="mb-3">
                  <Form.Label>Đơn vị</Form.Label>
                  <Form.Select
                    className="form-control"
                    aria-label="Chọn đơn vị"
                    name="productUnit"
                    value={values.productUnit}
                    onChange={handleChange}
                    isValid={touched.productUnit && !errors.productUnit}
                    isInvalid={!!errors.productUnit}
                  >
                    <option value="0">Cái</option>
                    <option value="1">Bộ</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productUnit}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationFormik17" className="mb-3">
                  <Form.Label>Nhà kho</Form.Label>
                  <Form.Select
                    className="form-control"
                    aria-label="Chọn trạng thái"
                    name="productWarehouse"
                    value={values.productWarehouse}
                    onChange={handleChange}
                    isValid={
                      touched.productWarehouse && !errors.productWarehouse
                    }
                    isInvalid={!!errors.productWarehouse}
                  >
                    <option value="0">Kho 1</option>
                    <option value="1">Kho 2</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.productWarehouse}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {/*disabled={!isValid}*/}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <Button variant="primary" type="submit">
              Gửi thông tin
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ProductAdd;
