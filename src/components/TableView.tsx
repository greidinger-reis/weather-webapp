import { FC, ReactNode } from "react";

interface TableViewProps {
  children: ReactNode;
}
const TableView: FC<TableViewProps> = ({ children }) => {
  return (
    <table className="h-52 border-collapse text-white ">
      <thead>
        <tr className="text-left text-sm font-light">
          <td>Min</td>
          <td>Máx</td>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TableView;
