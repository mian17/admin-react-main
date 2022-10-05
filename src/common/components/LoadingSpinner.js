import React from "react";

export default function LoadingSpinner() {
  return (
    <div
      className="spinner-border text-light spinner-border-sm ml-1"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
