import React from "react";
import { NpmsResult } from "./analyzer/index.types";
import analyzer, { PackageJson } from "./analyzer";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const StyledLabel = styled("label")`
  border: 2px solid blue;
  padding: 1rem 2rem;
  cursor: pointer;
`;

const Container = styled("div")`
  display: flex;
  justify-content: center;
`;

interface Props {
  setPackageJson: React.Dispatch<React.SetStateAction<PackageJson>>;
  setPackages: React.Dispatch<React.SetStateAction<NpmsResult[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAnalyzer: React.Dispatch<React.SetStateAction<boolean>>;
}

const PackageReader = ({
  setPackageJson,
  setPackages,
  setLoading,
  setShowAnalyzer
}: Props) => {
  const readInput = (input: string | ArrayBuffer): PackageJson | undefined => {
    const result = input.toString();
    try {
      const parsedResult = JSON.parse(result);
      // Check if passed file is actually a package json
      if (!parsedResult.dependencies) {
        throw new Error("Invalid file");
      }
      // Seems to be
      return parsedResult;
    } catch (e) {
      alert("Invalid file");
    }
  };

  const handleFileLoad = async (e: ProgressEvent<FileReader>) => {
    if (e.target && e.target.result) {
      const packageJsonFile: PackageJson | undefined = readInput(
        e.target.result
      );
      if (packageJsonFile) {
        setPackageJson(packageJsonFile);
        setLoading(true);
        try {
          const packages = await analyzer(packageJsonFile);
          setPackages(packages);
          setShowAnalyzer(false);
        } catch (e) {
          alert("Failed to get data please check your internet connection");
        }
        setLoading(false);
      }
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    // Check if user gave a file
    if (files && files[0]) {
      // Load file
      const reader = new FileReader();
      reader.onload = async e => {
        // Check if load returned a file
        handleFileLoad(e);
      };

      reader.readAsText(files[0]);
    }
  };

  return (
    <Container>
      <StyledLabel htmlFor="file-upload">Add file 🗄</StyledLabel>
      <input
        style={{ display: "none" }}
        type="file"
        id="file-upload"
        accept=".json"
        onChange={handleChange}
      />
      <Button onClick={() => setShowAnalyzer(false)}>Cancel</Button>
    </Container>
  );
};

export default PackageReader;
