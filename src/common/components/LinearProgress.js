import classes from "./LinearProgress.module.css";

const LinearProgress = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["progress-bar"]}>
        <div className={classes["progress-bar-value"]}></div>
      </div>
    </div>
  );
};
export default LinearProgress;
