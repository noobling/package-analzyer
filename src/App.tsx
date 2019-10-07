import { Button, Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import styled from "styled-components";
import { PackageJson } from "./analyzer";
import { NpmsResult } from "./analyzer/index.types";
import "./App.css";
import Header from "./Header";
import PackageReader from "./PackageReader";
import PackageTable, { TableItem } from "./Table";
import Loading from "./components/Loading";

const StyledButton = styled(Button)`
  margin: 1rem !important;
`;

const App: React.FC = () => {
  const [packages, setPackages] = useState<NpmsResult[]>([]);
  const [packageJson, setPackageJson] = useState<PackageJson>({
    dependencies: {},
    devDependencies: {}
  });
  const [loading, setLoading] = useState(false);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const toPercentage = (value: number): number => {
    return Math.round(value * 100);
  };

  const getData = (item: NpmsResult): TableItem => {
    const name = item.collected.metadata.name;
    const description = item.collected.metadata.description;
    const currentVersion = item.collected.metadata.version;
    const quality = toPercentage(item.score.detail.quality);
    const popularity = toPercentage(item.score.detail.popularity);
    const maintenance = toPercentage(item.score.detail.maintenance);
    const overall = toPercentage(item.score.final);
    const usedVersion = packageJson.dependencies[name];
    const updatedAt = new Date(item.collected.metadata.date);

    return {
      name,
      description,
      usedVersion,
      currentVersion,
      updatedAt,
      quality,
      popularity,
      maintenance,
      overall
    };
  };

  const handleAnalyzerClick = () => {
    setShowAnalyzer(true);
  };

  return (
    <>
      <Header />
      <Container>
        {showAnalyzer ? (
          <>
            <PackageReader
              setPackageJson={setPackageJson}
              setPackages={setPackages}
              setLoading={setLoading}
              setShowAnalyzer={setShowAnalyzer}
            />
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledButton variant="contained" onClick={handleAnalyzerClick}>
              Analyze Package Json
            </StyledButton>
            {/* 
            // @ts-ignore because target does exist on Button*/}
            <StyledButton
              variant="contained"
              href="https://github.com/noobling"
              target="_blank"
            >
              View On Github
            </StyledButton>
            <StyledButton variant="contained">
              CLI comming Soon{" "}
              <span role="img" aria-label="handshake">
                🤝
              </span>
            </StyledButton>
          </div>
        )}

        {packages.length > 0 && (
          <Paper>
            <PackageTable tableItems={packages.map(item => getData(item))} />
          </Paper>
        )}

        {loading && <Loading />}
      </Container>
    </>
  );
};

export default App;
