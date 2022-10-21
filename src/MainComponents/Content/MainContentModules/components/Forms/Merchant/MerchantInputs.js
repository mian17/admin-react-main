import { useCallback, useEffect, useState } from "react";
import Merchant from "./merchantForm-utils/Merchant";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import LoadingSpinner from "../../../../../../common/components/LoadingSpinner";
import { MerchantSchema } from "../../../../../../common/utils/validationSchema";
import apiClient from "../../../../../../api";
import MerchantToServer from "./merchantForm-utils/MerchantToServer";
import { useNavigate } from "react-router-dom";
import editMerchantSubmitHandler from "./server/editMerchantSubmitHandler";

function newMerchantSubmitHandler(navigate) {
  return async (values, actions) => {
    try {
      const { name, address, phoneNumber, email } = values;
      const data = new MerchantToServer(name, address, phoneNumber, email);
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.post("api/admin/merchant", data, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      alert(response.data.message);
      navigate(0);
      actions.resetForm({ values: new Merchant("", "", "", "") });
    } catch (error) {
      // alert(error.response.data.message);
    }
  };
}

const MerchantInputs = (props) => {
  const navigate = useNavigate();
  const [initialFormValue, setInitialFormValue] = useState(
    new Merchant("", "", "", "")
  );

  const fetchCurrentEditingMerchant = useCallback(
    async (currentEditingMerchantId) => {
      try {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.get(
          `api/admin/warehouse/${currentEditingMerchantId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const merchantResponse = response.data;
        setInitialFormValue(
          new Merchant(
            merchantResponse.name,
            merchantResponse.address,
            merchantResponse.phone_number,
            merchantResponse.email
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  useEffect(() => {
    if (props.editingMerchantId) {
      fetchCurrentEditingMerchant(props.editingMerchantId);
    }
  }, [fetchCurrentEditingMerchant, props.editingMerchantId]);

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={MerchantSchema}
      onSubmit={
        props.editingMerchantId
          ? editMerchantSubmitHandler(props.editingMerchantId, navigate)
          : newMerchantSubmitHandler(navigate)
      }
      enableReinitialize
      validateOnMount={props.editingMerchantId}
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormikMerchant01" + props.randomId}
              label="Tên nhà bán"
              type="text"
              name="name"
            />
            <FormField
              as={Col}
              controlId={"validationFormikMerchant02" + props.randomId}
              label="Địa chỉ"
              type="text"
              name="address"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormikMerchant03" + props.randomId}
              label="Số điện thoại"
              type="text"
              name="phoneNumber"
            />
            <FormField
              as={Col}
              controlId={"validationFormikMerchant04" + props.randomId}
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
              {props.editingMerchantId ? "Sửa đổi thông tin" : "Thêm kho"}{" "}
              {isSubmitting && <LoadingSpinner />}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default MerchantInputs;

//     const navigate = useNavigate();
//     const [initialFormValue, setInitialFormValue] = useState(
//         new Warehouse("", "", "", "")
//     );
//
//     const fetchCurrentEditingWarehouse = useCallback(
//         async (currentEditingWarehouseId) => {
//             try {
//                 await apiClient.get("/sanctum/csrf-cookie");
//
//                 const response = await apiClient.get(
//                     `api/admin/warehouse/${currentEditingWarehouseId}`,
//                     tokenHeaderConfig
//                 );
//
//                 const warehouseResponse = response.data;
//                 setInitialFormValue(
//                     new Warehouse(
//                         warehouseResponse.name,
//                         warehouseResponse.address,
//                         warehouseResponse.phone_number,
//                         warehouseResponse.email
//                     )
//                 );
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//         []
//     );
//     useEffect(() => {
//         if (props.editingWarehouseId) {
//             fetchCurrentEditingWarehouse(props.editingWarehouseId);
//         }
//     }, [fetchCurrentEditingWarehouse, props.editingWarehouseId]);
//
//     return (
//         <Formik
//             initialValues={initialFormValue}
//             validationSchema={WarehouseSchema}
//             onSubmit={
//                 props.editingWarehouseId
//                     ? editWarehouseSubmitHandler(props.editingWarehouseId, navigate)
//                     : newWarehouseSubmitHandler(navigate)
//             }
//             enableReinitialize
//             validateOnMount={props.editingWarehouseId}
//         >
//             {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
//                 <Form className="card-body" onSubmit={handleSubmit}>
//                     <Row className="mb-3">
//                         <FormField
//                             as={Col}
//                             controlId={"validationFormikMerchant01" + props.randomId}
//                             label="Tên nhà kho"
//                             type="text"
//                             name="name"
//                         />
//                         <FormField
//                             as={Col}
//                             controlId={"validationFormikMerchant02" + props.randomId}
//                             label="Địa chỉ"
//                             type="text"
//                             name="address"
//                         />
//                     </Row>
//                     <Row className="mb-3">
//                         <FormField
//                             as={Col}
//                             controlId={"validationFormikMerchant03" + props.randomId}
//                             label="Số điện thoại"
//                             type="text"
//                             name="phoneNumber"
//                         />
//                         <FormField
//                             as={Col}
//                             controlId={"validationFormikMerchant04" + props.randomId}
//                             label="Email"
//                             type="email"
//                             name="email"
//                         />
//                     </Row>
//
//                     <div className="text-right">
//                         <button
//                             type="submit"
//                             className="btn btn-primary"
//                             disabled={!isValid || isSubmitting}
//                         >
//                             {props.editingWarehouseId ? "Sửa đổi thông tin" : "Thêm kho"}{" "}
//                             {isSubmitting && <LoadingSpinner />}
//                         </button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// };
// export default WarehouseInputs;
