import { useEffect, useState } from "react";

import "./LinearDeterminateStyles.scss";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { LinearProgress } from "@mui/material";

interface IProps {
  isActive: boolean;
}
export default function LinearDeterminate({ isActive }: IProps) {
  const [progress, setProgress] = useState(0);
  const [viewLine, setViewLine] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive) {
      setViewLine(true);
      let speed = 15;

      // eslint-disable-next-line no-undef
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const val = Math.min(oldProgress + speed, 100);
          const tempSpeed = (100 - val) * ((98 - val) / 100);
          speed = tempSpeed > 15 ? 15 : tempSpeed;
          return val;
        });
      }, 500);
      return () => {
        // eslint-disable-next-line no-undef
        clearInterval(timer);
      };
    }
    if (!isActive) {
      if (progress !== 0 || viewLine) {
        setProgress(100);
        // eslint-disable-next-line no-undef
        clearInterval(timer);
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (progress === 100) {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        setViewLine(false);
        setProgress(0);
      }, 1000);
    }
  }, [progress]);

  const themeClass = useThemeClass("b-linearDeterminate");

  return (
    <div style={{ height: "2px", visibility: viewLine ? "visible" : "hidden" }}>
      {viewLine && (
        <LinearProgress
          variant="determinate"
          value={progress}
          classes={{
            root: `${themeClass}_root`,
            bar: `${themeClass}_bar`,
            barColorPrimary: `${themeClass}_barColorPrimary`,
            colorPrimary: `${themeClass}_colorPrimary`,
          }}
        />
      )}
    </div>
  );
}
