import { formatDate } from "../utils/date";
import { firstIndexUppercase } from "../utils/firstIndexUppercase";
import { URLIcon } from "../icons/url";
import QRCode from "qrcode.react";
import Swal from "sweetalert2";
import { URLProps } from "../utils/interfaces";
import { CopyIcon } from "../icons/copy";
import { DeleteIcon } from "../icons/delete";
import { DownloadIcon } from "../icons/download";
import { useRecoilState } from "recoil";
import { urlAtom } from "../store/atom";
import axios from "axios";
import { createRef, useRef } from "react";

export const URLs: React.FC<URLProps> = (props) => {
  const { title, longURL, shortURL, createdAt } = props;
  const [urls, setUrls] = useRecoilState(urlAtom);
  let qrRef = createRef();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8080/api/url/${shortURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filterUrls = urls.filter((url) => url.shortURL !== shortURL);

      setUrls(filterUrls);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("http://localhost:8080/" + shortURL);
    Swal.fire({
      toast: true,
      position: "bottom-right",
      icon: "success",
      title: "Copied to clipboard!",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleDownload = () => {
    const canvas = document.getElementById(shortURL) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${shortURL}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex w-screen">
      <div className="flex mt-10 w-full ml-16 border mr-16 rounded border-black p-3">
        <div>
          <QRCode
            value={`http://localhost:8080/${shortURL}`}
            size={150}
            className="mr-4"
            id={shortURL}
          />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-2xl font-bold">{firstIndexUppercase(title)}</p>
          <a
            className="text-blue-400 font-bold"
            target="_blank"
            href={"http://localhost:8080/" + shortURL}
          >
            {"http://localhost:8080/" + shortURL}{" "}
          </a>
          <div className="flex items-center">
            <div>{<URLIcon />}</div>
            <div>
              <a
                className="text-blue-400 font-bold"
                target="_blank"
                href={longURL}
              >
                {longURL.length >= 15 ? longURL.slice(0, 25) + "..." : longURL}{" "}
              </a>
            </div>
          </div>
          <div>
            <p>{formatDate(new Date(createdAt))}</p>
          </div>
        </div>
        <div className="flex w-full flex-row-reverse mr-4">
          <button onClick={handleCopy}>
            <CopyIcon />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
          <button onClick={handleDownload}>
            <DownloadIcon />
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};
