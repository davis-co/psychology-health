import classNames from "classnames";
import { Label, Divider } from "react-elements-davis";

const ResultBox = ({ title, content, alert = false }) => {
  return (
    <div className="flex flex-col w-full items-center justify-between rounded bg-formItem1 p-1 py-2 shadow-md">
      <Label
        label={title}
        className={classNames(
          alert ? "!text-red-900" : "!text-green-700",
          "lg:!text-lg !text-right w-full"
        )}
      />
      <Divider position={"right"} />
      <p className="font-700 text-black text-2xs lg:text-xs xl:text-sm !leading-5 lg:!leading-7">
        {content}
      </p>
    </div>
  );
};

export default ResultBox;
