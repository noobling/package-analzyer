import React from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody
} from "@material-ui/core";

export type TableItem = {
  name: string;
  description: string;
  currentVersion: string;
  maintenance: number;
  updatedAt: Date;
  quality: number;
  popularity: number;
  overall: number;
  usedVersion: string;
};

const PackageTable = ({ tableItems }: { tableItems: TableItem[] }) => {
  const renderRow = (tableItem: TableItem) => {
    return (
      <TableRow key={tableItem.name}>
        <TableCell>{tableItem.name}</TableCell>
        <TableCell>{tableItem.description}</TableCell>
        <TableCell>{tableItem.usedVersion}</TableCell>
        <TableCell>{tableItem.currentVersion}</TableCell>
        <TableCell>{tableItem.updatedAt.toLocaleDateString()}</TableCell>
        <TableCell>{tableItem.quality}</TableCell>
        <TableCell>{tableItem.popularity}</TableCell>
        <TableCell>{tableItem.maintenance}</TableCell>
        <TableCell>{tableItem.overall}</TableCell>
      </TableRow>
    );
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Package Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Current Version</TableCell>
          <TableCell>Latest Version</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell>Quality</TableCell>
          <TableCell>Popularity</TableCell>
          <TableCell>Maintenance</TableCell>
          <TableCell>Overall</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableItems
          .sort((a, b) => a.overall - b.overall)
          .map(item => renderRow(item))}
      </TableBody>
    </Table>
  );
};

export default PackageTable;
