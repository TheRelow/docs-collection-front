import axios, { AxiosResponse } from "axios";

// TODO понять как ебучий аксиос может не импортироваться в глазах блядского тайпскрипта
// export function getDocs(): Promise<axios.AxiosResponse<any> | void> {
export function getDocs(): Promise<any> {
  return axios
    .get("http://localhost:3100/api/v1/docs")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}

export function getDoc(id: string): Promise<any> {
  return axios
    .get("http://localhost:3100/api/v1/docs/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}

export function createDoc(docData: {}): Promise<any> {
  return axios
    .post("http://localhost:3100/api/v1/docs/", docData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}

export function updateDoc(id: string, docData: {}): Promise<any> {
  return axios
    .put("http://localhost:3100/api/v1/docs/" + id, docData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}

export function deleteDoc(id: string): Promise<any> {
  return axios
    .delete("http://localhost:3100/api/v1/docs/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
    });
}
