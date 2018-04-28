import axios from 'axios';
import { stringify } from 'query-string';

import { db, storage } from './init';

export enum Platform {
  PC = 'pc'
}

export interface FlowRequest {
  msgid: string;
  rqid: number;
  urltype: string;
  file_type: string;
  region: string;
  pid: number;
}

export interface FlowResponse {
  result: FlowResponseResult;
  dlcfile_list_count: number;
  dlcfile_list: DlcFile[];
  msgid: string;
  reqid: number;
}

export interface DlcFile {
  name: string;
  size: number;
  url: string;
  hash: string;
  dlc_version: string;
  required_program_version: number;
}

export interface DbFileEntry extends DlcFile {
  gcs_url: string;
}

export enum FlowResponseResult {
  NO_ERROR = 'NOERR'
}

export async function fetchLiveUpdate(platform: Platform) {
  const url = `http://210.148.52.131/pes18_${platform}/flow/flow.php`;
  const params: FlowRequest = {
    msgid: 'CMD_GET_DLC_FILELIST',
    rqid: 0,
    urltype: 'FLOW',
    file_type: 'LIVEDATA',
    region: 'REGION_ALL',
    pid: 0
  };

  const response = await axios.post<FlowResponse>(url, stringify(params));
  if (!response.data) {
    throw new Error(`Response failed: ${response.statusText}`);
  }
  console.log(
    '[liveupdate] fetched latest live update:',
    `${response.data.dlcfile_list_count} files`
  );

  const { dlcfile_list: files, dlcfile_list_count, result } = response.data;

  if (!dlcfile_list_count) {
    console.warn('[liveupdate] no files to download: ', result);
    return [];
  }

  const saves = files.map(async f => {
    const dbPath = `liveupdate/${f.dlc_version}`;
    const ref = db.doc(dbPath);
    const snapshot = await ref.get();

    if (snapshot.exists) {
      console.log('[liveupdate] file already downloaded', f.dlc_version);
      return snapshot.data() as DbFileEntry;
    } else {
      console.log('[liveupdate] fetching file for version', f.dlc_version);
      const res = await axios.request<ArrayBuffer>({
        responseType: 'arraybuffer',
        url: f.url
      });

      console.log(`[liveupdate] fetched file from ${f.url}`);
      const bucketPath = `liveupdate/pes2018/${f.dlc_version}/${f.name}`;
      const fileRef = storage.bucket().file(bucketPath);

      await fileRef.save(Buffer.from(res.data));
      console.log('[liveupdate] saved file to storage', bucketPath);

      const dbEntry: DbFileEntry = {
        ...f,
        gcs_url: `gs://pesleagues-dev.appspot.com/${bucketPath}`
      };

      console.log('[liveupdate] saved db entry', dbPath);
      await ref.set(dbEntry);
      return dbEntry;
    }
  });

  return await Promise.all(saves);
}
