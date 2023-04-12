import { InfoOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const FieldTooltip = ({ title }) => {
  return (
    <Tooltip placement="right-end" title={title}>
      <InfoOutlined color="primary" />
    </Tooltip>
  );
};

export default FieldTooltip;
