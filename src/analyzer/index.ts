import axios from "axios";
import { NpmsResult } from "./index.types";

export interface PackageJson {
  dependencies: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
}

const index = async (packageJson: PackageJson): Promise<NpmsResult[]> => {
  const { dependencies } = packageJson;

  const { data } = await axios.post<
    any,
    { data: { [key: string]: NpmsResult } }
  >("https://api.npms.io/v2/package/mget", Object.keys(dependencies));

  const result: NpmsResult[] = [];

  Object.keys(data).forEach(key => {
    result.push(data[key]);
  });

  return result;
};

export default index;
