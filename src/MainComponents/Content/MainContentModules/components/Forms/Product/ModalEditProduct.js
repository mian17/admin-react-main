import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { ErrorMessage as FormikErrorMessage, FieldArray, Formik } from "formik";
import Categorical from "./productForm-utils/Categorical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import Product from "./productForm-utils/Product";
import { ProductSchema } from "../../../../../../common/utils/validationSchema";

const ModalEditProduct = (props) => {
  const [showCategorical, setShowCategorical] = useState(false);

  // for API call
  const initialFormValue = new Product(
    "",
    "",
    0,
    0,
    "",
    0,
    false,
    [],
    0,
    0,
    0,
    "",
    "",
    0,
    0,
    0
  );

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin sản phẩm {props.editingProductId}
        </Modal.Title>
      </Modal.Header>
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
          <>
            <Modal.Body>
              Bạn đang sửa đổi thông tin cho sản phẩm có id là{" "}
              {props.editingProductId}!
              {/*<ProductInputs editingProductId={props.editingProductId} />*/}
              <Form className="card-body" noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik011"
                    >
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
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik012"
                    >
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
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik013"
                    >
                      <Form.Label>Số lượng</Form.Label>
                      <Form.Control
                        type="number"
                        name="productQuantity"
                        value={values.productQuantity}
                        onChange={handleChange}
                        isValid={
                          touched.productQuantity && !errors.productQuantity
                        }
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
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik014"
                    >
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
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik015"
                    >
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
                    <Form.Group
                      controlId="validationFormik016"
                      className="mb-3"
                    >
                      <Form.Label>Nhập hình cho sản phẩm</Form.Label>
                      <Form.Control type="file" multiple />
                      <Form.Text className="text-red">
                        Không để trống hình cho sản phẩm
                      </Form.Text>
                      <Form.Text className="text-red">
                        Phải chọn hình có tỉ lệ 1:1
                      </Form.Text>
                      <Form.Text className="text-red">
                        Tối thiểu và tối đa 2 hình nếu sản phẩm chỉ có 1 kiểu
                        loại duy nhất
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="validationFormik017"
                    >
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
                  <Form.Group className="mb-4" controlId="validationFormik018">
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
                          <Button onClick={() => push(new Categorical("", ""))}>
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
                                    controlId="validationFormik019"
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
                                    controlId="validationFormik020"
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
                                    controlId="validationFormik021"
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
                    <Form.Group
                      controlId="validationFormik022"
                      className="mb-3"
                    >
                      <Form.Label>Danh mục</Form.Label>
                      <Form.Select
                        className="form-control"
                        aria-label="Chọn danh mục"
                        name="productCategory"
                        value={values.productCategory}
                        onChange={handleChange}
                        isValid={
                          touched.productCategory && !errors.productCategory
                        }
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
                    <Form.Group
                      controlId="validationFormik023"
                      className="mb-3"
                    >
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
                    <Form.Group
                      controlId="validationFormik024"
                      className="mb-3"
                    >
                      <Form.Label>Nhà bán</Form.Label>
                      <Form.Select
                        className="form-control"
                        aria-label="Chọn trạng thái"
                        name="productMerchant"
                        value={values.productMerchant}
                        onChange={handleChange}
                        isValid={
                          touched.productMerchant && !errors.productMerchant
                        }
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
                    <Form.Group
                      controlId="validationFormik025"
                      className="mb-3"
                    >
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
                    <Form.Group
                      controlId="validationFormik026"
                      className="mb-3"
                    >
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
                    <Form.Group
                      controlId="validationFormik027"
                      className="mb-3"
                    >
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
                    <Form.Group
                      controlId="validationFormik028"
                      className="mb-3"
                    >
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
                    <Form.Group
                      controlId="validationFormik029"
                      className="mb-3"
                    >
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
                {/*<Button variant="primary" type="submit">*/}
                {/*  Gửi thông tin*/}
                {/*</Button>*/}
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleClose}>
                    Đóng
                  </Button>
                  Đóng
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Lưu thay đổi
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>
        )}
      </Formik>
    </Modal>
  );
};
export default ModalEditProduct;
