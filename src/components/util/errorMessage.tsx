import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <p className="text-sm mt-1 text-red-500 flex items-center">
      <ExclamationCircleOutlined className="mr-1" />
      {error}
    </p>
  );
};
