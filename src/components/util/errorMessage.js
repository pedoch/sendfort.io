import { ExclamationCircleOutlined } from "@ant-design/icons";

export const ErrorMessage = ({ error }) => {
  return (
    <p className="text-sm mt-1 text-red-500 flex items-center">
      <ExclamationCircleOutlined className="mr-1" />
      {error}
    </p>
  );
};
