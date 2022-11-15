import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import LoadingSpinner from "../../../../../../common/components/LoadingSpinner";
import { useCallback, useEffect, useState } from "react";
import Warehouse from "./warehouseForm-utils/Warehouse";
import { WarehouseSchema } from "../../../../../../common/utils/validationSchema";
import apiClient from "../../../../../../api";
import { useNavigate } from "react-router-dom";
import editWarehouseSubmitHandler from "./server/editWarehouseSubmitHandler";
import newWarehouseSubmitHandler from "./server/newWarehouseSubmitHandler";

const WarehouseInputs = (props) => {
  const navigate = useNavigate();
  const [initialFormValue, setInitialFormValue] = useState(
    new Warehouse("", "", "", "")
  );

  const fetchCurrentEditingWarehouse = useCallback(
    async (currentEditingWarehouseId) => {
      try {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.get(
          `api/admin/warehouse/${currentEditingWarehouseId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const warehouseResponse = response.data;
        setInitialFormValue(
          new Warehouse(
            warehouseResponse.name,
            warehouseResponse.address,
            warehouseResponse.phone_number,
            warehouseResponse.email
          )
        );
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    []
  );
  useEffect(() => {
    if (props.editingWarehouseId) {
      fetchCurrentEditingWarehouse(props.editingWarehouseId);
    }
  }, [fetchCurrentEditingWarehouse, props.editingWarehouseId]);

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={WarehouseSchema}
      onSubmit={
        props.editingWarehouseId
          ? editWarehouseSubmitHandler(props.editingWarehouseId, navigate)
          : newWarehouseSubmitHandler(navigate)
      }
      enableReinitialize
      validateOnMount={props.editingWarehouseId}
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormikWarehouse01" + props.randomId}
              label="Tên nhà kho"
              type="text"
              name="name"
            />
            <FormField
              as={Col}
              controlId={"validationFormikWarehouse02" + props.randomId}
              label="Địa chỉ"
              type="text"
              name="address"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormikWarehouse03" + props.randomId}
              label="Số điện thoại"
              type="text"
              name="phoneNumber"
            />
            <FormField
              as={Col}
              controlId={"validationFormikWarehouse04" + props.randomId}
              label="Email"
              type="email"
              name="email"
            />
          </Row>

          <div className="text-right">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isSubmitting}
            >
              {props.editingWarehouseId ? "Sửa đổi thông tin" : "Thêm kho"}{" "}
              {isSubmitting && <LoadingSpinner />}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default WarehouseInputs;
