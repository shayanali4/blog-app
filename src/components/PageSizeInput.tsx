"use client";
import React from "react";

function PageSizeInput({
  pageSize,
  baseUrl = "/",
}: {
  pageSize: number;
  baseUrl: string;
}) {
  return (
    <div className="flex justify-end mb-4">
      <label className="mr-2 font-semibold">Page Size:</label>
      <select
        className="border rounded px-2 py-1"
        onChange={(e) => {
          const newSize = e.target.value;
          window.location.href = `${baseUrl}?page=1&pageSize=${newSize}`;
        }}
        defaultValue={pageSize}
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSizeInput;
