import Image from "next/image";
import { FC } from "react";
import { toast } from "sonner";

import Success from "@/assets/imgs/tick-circle.svg";
import Info from "@/assets/imgs/Information Circle.svg";
import Error from "@/assets/imgs/Close Circle.svg";
import Link from "next/link";

type Props = {
  link?: string;
  toastId: string | number;
  toastType: TToastType;
  title: string;
  description?: string;
};

export type TToastType = "success" | "info" | "warn" | "error";

export const customToast = ({
  toastType,
  title,
  description,
  link,
}: {
  toastType: TToastType;
  title: string;
  link?: string;
  description?: string;
}) => {
  toast.custom((t) => (
    <ToastNotification
      link={link}
      toastId={t}
      toastType={toastType}
      title={title}
      description={description}
    />
  ));
};

const ToastNotification: FC<Props> = (props) => {
  let bg = "";

  if (props.toastType === "success") bg = "bg-[#DAFF73]";
  else if (props.toastType === "info") bg = "bg-[#BCE6EC]";
  else if (props.toastType === "error") bg = "bg-[#FF9179]";
  else if (props.toastType === "warn") bg = "bg-[#FF9179]";

  return (
    <div className="dark: dark:shadow- [ relative flex w-[350px] items-center justify-between rounded-lg border-[1px] border-none bg-light-toast bg-opacity-80 px-8 py-6 text-lg text-dark-bg shadow-[0px_2px_0px_0px_#ddd] dark:bg-dark-toast dark:bg-opacity-80 dark:text-light-bg dark:shadow-[0px_1px_0px_0px_#222]">
      <div className="flex items-center gap-4">
        {props.toastType === "success" ? (
          <Image src={Success} alt="success" />
        ) : props.toastType === "info" ? (
          <Image src={Info} alt="info" />
        ) : props.toastType === "error" ? (
          <Image src={Error} alt="error" />
        ) : (
          <Image src={Success} alt="deny" />
        )}
        <div className="">
          <p className="text-lg">{props.title}</p>
          {props.description && <p className="text-sm">{props.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {props.link && (
          <Link
            href={props.link}
            className="mr-5 whitespace-nowrap text-lg font-bold"
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </Link>
        )}
        <button
          className="absolute right-4 top-4 text-3xl"
          onClick={() => toast.dismiss(props.toastId)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
