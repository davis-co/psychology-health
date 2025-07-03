import classNames from "classnames";
import { Label, Divider } from "davis-components";

const ResultBox = ({ title, content, alert = false }) => {
  return (
    <div className="flex flex-col w-full items-center justify-between rounded bg-formItem1 p-1 py-2 shadow-md">
      <Label
        label={title}
        className={classNames(
          alert ? "!text-red-900" : "!text-green-700",
          " !text-right w-full"
        )}
      />
      <Divider position={"right"} />
      <p className="guide-title">{content}</p>
    </div>
  );
};

export default ResultBox;
