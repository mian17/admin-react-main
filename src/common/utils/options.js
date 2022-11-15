export const confirmBoxOptions = {
  labels: {
    confirmable: "Đồng ý",
    cancellable: "Hủy",
  },
  render: (message, onConfirm, onCancel) => {
    return (
      <div className="p-3 confirm-box-custom rounded animate__animated animate__fadeIn">
        <h5 className="py-3">{message}</h5>
        <div className="text-right">
          <button className="btn btn-outline-secondary" onClick={onConfirm}>
            {" "}
            Có
          </button>
          <button className="btn btn-danger ml-2" onClick={onCancel}>
            {" "}
            Không
          </button>
        </div>
      </div>
    );
  },
};
