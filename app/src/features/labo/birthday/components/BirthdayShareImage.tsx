"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BirthdayCalculationResult,
  BirthdayDisplayDetails,
  BirthdayShareMode,
} from "@/features/labo/birthday/types/birthday";
import styles from "./BirthdayCalculator.module.css";

type BirthdayShareImageProps = {
  displayName: string;
  birthDate: Date;
  result: BirthdayCalculationResult;
  details: BirthdayDisplayDetails;
};

type CanvasPalette = {
  background: string;
  foreground: string;
  primary: string;
  surface: string;
  soft: string;
  danger: string;
};

type DrawTextOptions = {
  align?: CanvasTextAlign;
  color: CanvasGradient | string;
  fontSize: number;
  weight?: number;
  shadow?: boolean;
};

type DrawCenteredTextOptions = Omit<DrawTextOptions, "align">;

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const FONT_SIZE_BASE = 60;
const SHARE_MODES: { label: string; value: BirthdayShareMode }[] = [
  { label: "全盛りモード", value: "max" },
  { label: "シンプルモード", value: "simple" },
  { label: "レインボーモード", value: "rainbow" },
  { label: "ネオンモード", value: "neon" },
];

const getCssVariable = (name: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

const drawText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: DrawTextOptions,
) => {
  context.save();
  context.fillStyle = options.color;
  context.font = `${options.weight ?? 600} ${options.fontSize}px sans-serif`;
  context.textAlign = options.align ?? "left";
  context.textBaseline = "middle";

  if (options.shadow) {
    context.shadowColor = getCssVariable("--color-muted");
    context.shadowBlur = 10;
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
  }

  context.fillText(text, x, y);
  context.restore();
};

const drawCenteredText = (
  context: CanvasRenderingContext2D,
  text: string,
  y: number,
  options: DrawCenteredTextOptions,
) => {
  drawText(context, text, CANVAS_WIDTH / 2, y, {
    ...options,
    align: "center",
  });
};

const createRainbowGradient = (
  context: CanvasRenderingContext2D,
): CanvasGradient => {
  const gradient = context.createLinearGradient(200, 0, CANVAS_WIDTH - 200, 0);

  gradient.addColorStop(0, "#f00");
  gradient.addColorStop(0.0714, "#f80");
  gradient.addColorStop(0.1428, "#dd0");
  gradient.addColorStop(0.2142, "#0d0");
  gradient.addColorStop(0.2856, "#0dd");
  gradient.addColorStop(0.357, "#00f");
  gradient.addColorStop(0.4284, "#e0e");
  gradient.addColorStop(0.4998, "#f00");
  gradient.addColorStop(0.5712, "#f00");
  gradient.addColorStop(0.6426, "#f80");
  gradient.addColorStop(0.714, "#dd0");
  gradient.addColorStop(0.7854, "#0d0");
  gradient.addColorStop(0.8568, "#0dd");
  gradient.addColorStop(0.9282, "#00f");
  gradient.addColorStop(1, "#f00");

  return gradient;
};

const fillBackground = async (
  context: CanvasRenderingContext2D,
  mode: BirthdayShareMode,
  palette: CanvasPalette,
) => {
  if (mode === "rainbow") {
    context.fillStyle = palette.soft;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.strokeStyle = palette.primary;
    context.lineWidth = 10;
    context.strokeRect(5, 5, CANVAS_WIDTH - 10, CANVAS_HEIGHT - 10);
    return;
  }

  if (mode === "neon") {
    context.fillStyle = palette.foreground;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  try {
    const image = await loadImage("/images/instagram.png");
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } catch {
    context.fillStyle = palette.soft;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const drawFooter = (
  context: CanvasRenderingContext2D,
  mode: BirthdayShareMode,
  palette: CanvasPalette,
) => {
  drawCenteredText(context, "© iscandaru.com", CANVAS_HEIGHT - 90, {
    color: mode === "rainbow" ? palette.primary : palette.background,
    fontSize: 50,
    weight: 500,
  });
};

const getFont = (options: Pick<DrawTextOptions, "fontSize" | "weight">) =>
  `${options.weight ?? 600} ${options.fontSize}px sans-serif`;

const drawMaxMode = (
  context: CanvasRenderingContext2D,
  props: BirthdayShareImageProps,
  palette: CanvasPalette,
) => {
  const { displayName: subject, birthDate, result, details } = props;
  const textColor = palette.background;
  const birthText = `Born in ${birthDate.getFullYear()} / ${
    birthDate.getMonth() + 1
  } / ${birthDate.getDate()}`;

  if (result.isBirthdayToday) {
    drawCenteredText(context, "HAPPY BIRTHDAY", 200, {
      color: textColor,
      fontSize: 80,
      weight: 600,
    });

    const yAge = 380;

    const age = `${subject}`;
    const ageFollow = `さん！`;

    const ageOptions = {
      color: textColor,
      fontSize: 90,
      shadow: true,
      weight: 900,
    } satisfies DrawTextOptions;

    const ageFollowOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    context.save();

    context.font = getFont(ageOptions);
    const ageWidth = context.measureText(age).width;

    context.font = getFont(ageFollowOptions);
    const ageFollowWidth = context.measureText(ageFollow).width;

    context.restore();

    const totalWidthAge = ageWidth + ageFollowWidth;
    const startXAge = (CANVAS_WIDTH - totalWidthAge) / 2;

    drawText(context, age, startXAge, yAge, ageOptions);

    drawText(
      context,
      ageFollow,
      startXAge + ageWidth + 20,
      yAge + 15,
      ageFollowOptions,
    );

    const y = 700;

    const left = "今日は ";
    const center = `${details.ageParts.years}`;
    const right = "歳の誕生日！";

    const leftOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    const centerOptions = {
      color: textColor,
      fontSize: 200,
      shadow: true,
    } satisfies DrawTextOptions;

    const rightOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    context.save();

    context.font = getFont(leftOptions);
    const leftWidth = context.measureText(left).width;

    context.font = getFont(centerOptions);
    const centerWidth = context.measureText(center).width;

    context.font = getFont(rightOptions);
    const rightWidth = context.measureText(right).width;

    context.restore();

    const totalWidth = leftWidth + centerWidth + rightWidth;
    const startX = (CANVAS_WIDTH - totalWidth) / 2;

    drawText(context, left, startX, y + 50, leftOptions);

    drawText(context, center, startX + leftWidth, y, centerOptions);

    drawText(
      context,
      right,
      startX + leftWidth + centerWidth,
      y + 50,
      rightOptions,
    );

    drawCenteredText(context, "今日で生まれてから", 1080, {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    });

    const yDays = 1350;

    const days = `${result.livedDays}`;
    const daysFollow = `日目！`;

    const daysOptions = {
      color: textColor,
      fontSize: 200,
      shadow: true,
      weight: 900,
    } satisfies DrawTextOptions;

    const daysFollowOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    context.save();

    context.font = getFont(daysOptions);
    const daysWidth = context.measureText(days).width;

    context.font = getFont(daysFollowOptions);
    const daysFollowWidth = context.measureText(daysFollow).width;

    context.restore();

    const totalWidthDays = daysWidth + daysFollowWidth;
    const startXDays = (CANVAS_WIDTH - totalWidthDays) / 2;

    drawText(context, days, startXDays, yDays, daysOptions);

    drawText(
      context,
      daysFollow,
      startXDays + daysWidth + 20,
      yDays + 60,
      daysFollowOptions,
    );

    drawCenteredText(context, birthText, 1650, {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    });
    return;
  }

  const y = 200;

  const left = "今日で ";
  const center = `${subject} `;
  const right = "さんは";

  const leftOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  const centerOptions = {
    color: textColor,
    fontSize: 80,
    shadow: true,
  } satisfies DrawTextOptions;

  const rightOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  context.save();

  context.font = getFont(leftOptions);
  const leftWidth = context.measureText(left).width;

  context.font = getFont(centerOptions);
  const centerWidth = context.measureText(center).width;

  context.font = getFont(rightOptions);
  const rightWidth = context.measureText(right).width;

  context.restore();

  const totalWidth = leftWidth + centerWidth + rightWidth;
  const startX = (CANVAS_WIDTH - totalWidth) / 2;

  drawText(context, left, startX, y, leftOptions);

  drawText(context, center, startX + leftWidth, y - 10, centerOptions);

  drawText(context, right, startX + leftWidth + centerWidth, y, rightOptions);

  drawText(context, "生まれてから", 120, 420, {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  });

  const yDays = 650;

  const days = `${result.livedDays}`;
  const daysFollow = `日目！`;

  const daysOptions = {
    color: textColor,
    fontSize: 200,
    shadow: true,
    weight: 900,
  } satisfies DrawTextOptions;

  const daysFollowOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  context.save();

  context.font = getFont(daysOptions);
  const daysWidth = context.measureText(days).width;

  context.font = getFont(daysFollowOptions);
  const daysFollowWidth = context.measureText(daysFollow).width;

  context.restore();

  const totalWidthDays = daysWidth + daysFollowWidth;
  const startXDays = (CANVAS_WIDTH - totalWidthDays) / 2;

  drawText(context, days, startXDays, yDays, daysOptions);

  drawText(
    context,
    daysFollow,
    startXDays + daysWidth + 20,
    yDays + 60,
    daysFollowOptions,
  );

  drawCenteredText(
    context,
    `( ${details.ageParts.years}歳 ${details.ageParts.months}ヶ月 )`,
    870,
    { color: textColor, fontSize: FONT_SIZE_BASE },
  );
  drawCenteredText(context, birthText, 1100, {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  });

  drawCenteredText(context, "次の誕生日まであと", 1350, {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  });

  const yDaysLeft = 1580;

  const daysLeft = `${result.daysUntilNextBirthday}`;
  const daysLeftFollow = `日です！`;

  const daysLeftOptions = {
    color: textColor,
    fontSize: 200,
    shadow: true,
    weight: 900,
  } satisfies DrawTextOptions;

  const daysLeftFollowOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  context.save();

  context.font = getFont(daysLeftOptions);
  const daysLeftWidth = context.measureText(daysLeft).width;

  context.font = getFont(daysFollowOptions);
  const daysLeftFollowWidth = context.measureText(daysLeftFollow).width;

  context.restore();

  const totalWidthDaysLeft = daysLeftWidth + daysLeftFollowWidth;
  const startXDaysLeft = (CANVAS_WIDTH - totalWidthDaysLeft) / 2;

  drawText(context, daysLeft, startXDaysLeft, yDaysLeft, daysLeftOptions);

  drawText(
    context,
    daysLeftFollow,
    startXDaysLeft + daysLeftWidth + 20,
    yDaysLeft + 60,
    daysLeftFollowOptions,
  );
};

const drawSimpleMode = (
  context: CanvasRenderingContext2D,
  props: BirthdayShareImageProps,
  palette: CanvasPalette,
  mode: BirthdayShareMode,
) => {
  const { result, details } = props;
  const isAccentMode = mode === "rainbow" || mode === "neon";
  const textColor =
    mode === "rainbow"
      ? palette.primary
      : isAccentMode
        ? palette.background
        : palette.background;
  const numberColor = isAccentMode ? createRainbowGradient(context) : textColor;

  if (result.isBirthdayToday) {
    drawCenteredText(context, "HAPPY", 200, {
      color: numberColor,
      fontSize: 100,
      weight: 900,
    });
    drawCenteredText(context, "BIRTHDAY", 370, {
      color: numberColor,
      fontSize: 100,
      weight: 900,
    });
    drawCenteredText(context, "今日は", 640, {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    });

    const y = 850;

    const center = `${details.ageParts.years}`;
    const right = "歳の誕生日！";

    const centerOptions = {
      color: numberColor,
      fontSize: 200,
      shadow: !isAccentMode,
    } satisfies DrawTextOptions;

    const rightOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    context.save();

    context.font = getFont(centerOptions);
    const centerWidth = context.measureText(center).width;

    context.font = getFont(rightOptions);
    const rightWidth = context.measureText(right).width;

    context.restore();

    const totalWidth = centerWidth + rightWidth;
    const startX = (CANVAS_WIDTH - totalWidth) / 2;

    drawText(context, center, startX, y, centerOptions);

    drawText(context, right, startX + centerWidth + 20, y + 50, rightOptions);

    drawCenteredText(context, "生まれてから", 1150, {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    });

    const yDays = 1390;

    const days = `${result.livedDays}`;
    const daysFollow = `日`;

    const daysOptions = {
      color: numberColor,
      fontSize: 200,
      shadow: !isAccentMode,
      weight: 900,
    } satisfies DrawTextOptions;

    const daysFollowOptions = {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    } satisfies DrawTextOptions;

    context.save();

    context.font = getFont(daysOptions);
    const daysWidth = context.measureText(days).width;

    context.font = getFont(daysFollowOptions);
    const daysFollowWidth = context.measureText(daysFollow).width;

    context.restore();

    const totalWidthDays = daysWidth + daysFollowWidth;
    const startXDays = (CANVAS_WIDTH - totalWidthDays) / 2;

    drawText(context, days, startXDays, yDays, daysOptions);

    drawText(
      context,
      daysFollow,
      startXDays + daysWidth + 20,
      yDays + 60,
      daysFollowOptions,
    );

    drawCenteredText(context, "経ちました！", 1650, {
      color: textColor,
      fontSize: FONT_SIZE_BASE,
    });
    return;
  }

  drawCenteredText(context, "今日は生まれてから", 400, {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  });

  const yDays = 670;

  const days = `${result.livedDays}`;
  const daysFollow = `日目！`;

  const daysOptions = {
    color: numberColor,
    fontSize: 200,
    shadow: !isAccentMode,
    weight: 900,
  } satisfies DrawTextOptions;

  const daysFollowOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  context.save();

  context.font = getFont(daysOptions);
  const daysWidth = context.measureText(days).width;

  context.font = getFont(daysFollowOptions);
  const daysFollowWidth = context.measureText(daysFollow).width;

  context.restore();

  const totalWidthDays = daysWidth + daysFollowWidth;
  const startXDays = (CANVAS_WIDTH - totalWidthDays) / 2;

  drawText(context, days, startXDays, yDays, daysOptions);

  drawText(
    context,
    daysFollow,
    startXDays + daysWidth + 20,
    yDays + 60,
    daysFollowOptions,
  );

  drawCenteredText(context, "次の誕生日まであと", 1120, {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  });

  const yDaysLeft = 1380;

  const daysLeft = `${result.daysUntilNextBirthday}`;
  const daysLeftFollow = `日です！`;

  const daysLeftOptions = {
    color: numberColor,
    fontSize: 200,
    shadow: !isAccentMode,
    weight: 900,
  } satisfies DrawTextOptions;

  const daysLeftFollowOptions = {
    color: textColor,
    fontSize: FONT_SIZE_BASE,
  } satisfies DrawTextOptions;

  context.save();

  context.font = getFont(daysLeftOptions);
  const daysLeftWidth = context.measureText(daysLeft).width;

  context.font = getFont(daysFollowOptions);
  const daysLeftFollowWidth = context.measureText(daysLeftFollow).width;

  context.restore();

  const totalWidthDaysLeft = daysLeftWidth + daysLeftFollowWidth;
  const startXDaysLeft = (CANVAS_WIDTH - totalWidthDaysLeft) / 2;

  drawText(context, daysLeft, startXDaysLeft, yDaysLeft, daysLeftOptions);

  drawText(
    context,
    daysLeftFollow,
    startXDaysLeft + daysLeftWidth + 20,
    yDaysLeft + 60,
    daysLeftFollowOptions,
  );
};

const generateShareImage = async (
  mode: BirthdayShareMode,
  props: BirthdayShareImageProps,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) return "";

  const palette: CanvasPalette = {
    background: getCssVariable("--color-background"),
    foreground: getCssVariable("--color-foreground"),
    primary: getCssVariable("--color-primary"),
    surface: getCssVariable("--color-background"),
    soft: getCssVariable("--color-surface-muted"),
    danger: getCssVariable("--color-danger"),
  };

  await fillBackground(context, mode, palette);

  if (mode === "max") {
    drawMaxMode(context, props, palette);
  } else {
    drawSimpleMode(context, props, palette, mode);
  }

  drawFooter(context, mode, palette);

  return canvas.toDataURL("image/png");
};

export function BirthdayShareImage(props: BirthdayShareImageProps) {
  const [mode, setMode] = useState<BirthdayShareMode>("max");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    const nextImageUrl = await generateShareImage(mode, props);
    setImageUrl(nextImageUrl);
  };

  return (
    <section className={styles.shareTool} aria-label="画像生成">
      <fieldset className={styles.modeSelect}>
        <legend>Image to Share</legend>
        {SHARE_MODES.map((shareMode) => (
          <label key={shareMode.value}>
            <input
              type="radio"
              name="birthday-share-mode"
              value={shareMode.value}
              checked={mode === shareMode.value}
              onChange={() => setMode(shareMode.value)}
            />
            {shareMode.label}
          </label>
        ))}
      </fieldset>

      <button
        className={styles.shareButton}
        type="button"
        onClick={handleGenerate}
      >
        画像を生成する
      </button>

      {imageUrl && (
        <div className={styles.sharePreview}>
          <Image
            src={imageUrl}
            alt="生成されたシェア画像"
            width={270}
            height={480}
            unoptimized
          />
          <a href={imageUrl} download="birthday-counter.png">
            画像をダウンロード
          </a>
        </div>
      )}
    </section>
  );
}
