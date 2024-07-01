import { formatDate } from "../utils/date";
import { firstIndexUppercase } from "../utils/firstIndexUppercase";
import { URLIcon } from "../icons/url";
import QRCode from "qrcode.react";

import { URLProps } from "../utils/interfaces";
import { CopyIcon } from "../icons/copy";
import { DeleteIcon } from "../icons/delete";
import { DownloadIcon } from "../icons/download";

export const URLs: React.FC<URLProps> = (props) => {
  const { title, longURL, shortURL, createdAt } = props;
  return (
    <div className="flex w-screen">
      <div className="flex mt-10 w-full ml-16 border mr-16 rounded border-black p-3">
        <div>
          <QRCode value={longURL} size={120} className="mr-4" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-2xl font-bold">{firstIndexUppercase(title)}</p>
          <a
            className="text-blue-400 font-bold"
            target="_blank"
            href={shortURL}
          >
            {shortURL}{" "}
          </a>
          <div className="flex items-center">
            <div>{<URLIcon />}</div>
            <div>
              <a
                className="text-blue-400 font-bold"
                target="_blank"
                href={longURL}
              >
                {longURL}{" "}
              </a>
            </div>
          </div>
          <p>{formatDate(createdAt)}</p>
        </div>
        <div className="flex w-full flex-row-reverse mr-4">
          <CopyIcon />
          <DeleteIcon />
          <DownloadIcon />
        </div>
      </div>
      <div></div>
    </div>
  );
};
