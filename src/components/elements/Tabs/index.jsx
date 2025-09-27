import classNames from "classnames";
import { Button } from "davis-components";
import { GoChevronLeft } from "react-icons/go";
import styles from "./styles.module.css";
import { forwardRef } from "react";

export const Tabs = forwardRef(
  ({ active, tabs, setActive, containerClassName }, ref) => {
    return (
      <div className={classNames("flex flex-row w-full", containerClassName)}>
        <Button
          onClick={() =>
            ref.current.scrollTo({
              left: (ref.current.scrollLeft += window.innerWidth * 0.4),
              behavior: "smooth",
            })
          }
          className={classNames(styles.arrow, "!rounded-l-none")}
          icon={
            <GoChevronLeft
              color="black"
              className="rotate-180 mx-auto lg:text-xl"
            />
          }
        />
        <div className={styles.list} ref={ref}>
          {tabs.map((item) => (
            <Button
              className={classNames(
                styles.tab,
                item == active ? styles["tab-active"] : styles["tab-deactive"]
              )}
              key={item.title}
              onClick={() => {
                setActive(item);
              }}
              title={item}
            />
          ))}
        </div>
        <Button
          onClick={() =>
            ref.current.scrollTo({
              left: (ref.current.scrollLeft -= window.innerWidth * 0.4),
              behavior: "smooth",
            })
          }
          icon={<GoChevronLeft color="black" className="mx-auto lg:text-xl" />}
          className={classNames(styles.arrow, "!rounded-r-none")}
        />
      </div>
    );
  }
);

Tabs.displayName = "Tabs";
