"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BirthdayCalculationResult,
  BirthdayDisplayDetails,
  BirthdayShareMode,
} from "@/features/labo/birthday/types/birthday";
import { formatBirthdayNumber } from "@/features/labo/birthday/utils/birthday";
import styles from "./BirthdayCalculator.module.css";

type BirthdayShareImageProps = {
  subject: string;
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

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
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

const drawCenteredText = (
  context: CanvasRenderingContext2D,
  text: string,
  y: number,
  options: {
    color: CanvasGradient | string;
    fontSize: number;
    weight?: number;
    shadow?: boolean;
  },
) => {
  context.save();
  context.fillStyle = options.color;
  context.font = `${options.weight ?? 600} ${options.fontSize}px sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (options.shadow) {
    context.shadowColor = getCssVariable("--color-foreground");
    context.shadowBlur = 12;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
  }

  context.fillText(text, CANVAS_WIDTH / 2, y);
  context.restore();
};

const createRainbowGradient = (
  context: CanvasRenderingContext2D,
  palette: CanvasPalette,
) => {
  const gradient = context.createLinearGradient(160, 0, CANVAS_WIDTH - 160, 0);
  gradient.addColorStop(0, palette.danger);
  gradient.addColorStop(0.25, palette.primary);
  gradient.addColorStop(0.5, palette.soft);
  gradient.addColorStop(0.75, palette.primary);
  gradient.addColorStop(1, palette.danger);
  return gradient;
};

const fillBackground = async (
  context: CanvasRenderingContext2D,
  mode: BirthdayShareMode,
  palette: CanvasPalette,
) => {
  if (mode === "rainbow") {
    context.fillStyle = palette.surface;
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.strokeStyle = palette.primary;
    context.lineWidth = 8;
    context.strokeRect(24, 24, CANVAS_WIDTH - 48, CANVAS_HEIGHT - 48);
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
  drawCenteredText(context, "© iscandaru.com", CANVAS_HEIGHT - 110, {
    color: mode === "rainbow" ? palette.primary : palette.background,
    fontSize: 26,
    weight: 500,
  });
};

const drawMaxMode = (
  context: CanvasRenderingContext2D,
  props: BirthdayShareImageProps,
  palette: CanvasPalette,
) => {
  const { subject, birthDate, result, details } = props;
  const textColor = palette.background;
  const birthText = `Born in ${birthDate.getFullYear()} / ${
    birthDate.getMonth() + 1
  } / ${birthDate.getDate()}`;

  if (result.isBirthdayToday) {
    drawCenteredText(context, "HAPPY BIRTHDAY", 240, {
      color: textColor,
      fontSize: 54,
      weight: 800,
      shadow: true,
    });
    drawCenteredText(context, `${subject}！`, 345, {
      color: textColor,
      fontSize: 48,
      shadow: true,
    });
    drawCenteredText(context, "今日は", 540, {
      color: textColor,
      fontSize: 42,
      shadow: true,
    });
    drawCenteredText(context, `${details.ageParts.years}`, 700, {
      color: textColor,
      fontSize: 150,
      weight: 800,
      shadow: true,
    });
    drawCenteredText(context, "歳の誕生日！", 850, {
      color: textColor,
      fontSize: 54,
      shadow: true,
    });
    drawCenteredText(context, "今日で生まれてから", 1060, {
      color: textColor,
      fontSize: 44,
      shadow: true,
    });
    drawCenteredText(
      context,
      `${formatBirthdayNumber(result.livedDays)}日目`,
      1230,
      {
        color: textColor,
        fontSize: 96,
        weight: 800,
        shadow: true,
      },
    );
    drawCenteredText(context, "です！", 1390, {
      color: textColor,
      fontSize: 54,
      shadow: true,
    });
    drawCenteredText(context, birthText, 1580, {
      color: textColor,
      fontSize: 34,
      shadow: true,
    });
    return;
  }

  drawCenteredText(context, `今日で ${subject}は`, 260, {
    color: textColor,
    fontSize: 44,
    shadow: true,
  });
  drawCenteredText(context, "生まれてから", 380, {
    color: textColor,
    fontSize: 44,
    shadow: true,
  });
  drawCenteredText(
    context,
    `${formatBirthdayNumber(result.livedDays)}日目！`,
    590,
    {
      color: textColor,
      fontSize: 120,
      weight: 800,
      shadow: true,
    },
  );
  drawCenteredText(
    context,
    `( ${details.ageParts.years}歳 ${details.ageParts.months}ヶ月 )`,
    790,
    { color: textColor, fontSize: 40, shadow: true },
  );
  drawCenteredText(context, birthText, 960, {
    color: textColor,
    fontSize: 36,
    shadow: true,
  });
  drawCenteredText(context, "次の誕生日まであと", 1210, {
    color: textColor,
    fontSize: 46,
    shadow: true,
  });
  drawCenteredText(
    context,
    `${formatBirthdayNumber(result.daysUntilNextBirthday)}`,
    1390,
    {
      color: textColor,
      fontSize: 150,
      weight: 800,
      shadow: true,
    },
  );
  drawCenteredText(context, "日です！", 1550, {
    color: textColor,
    fontSize: 54,
    shadow: true,
  });
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
  const numberColor = isAccentMode
    ? createRainbowGradient(context, palette)
    : textColor;

  if (result.isBirthdayToday) {
    drawCenteredText(context, "HAPPY BIRTHDAY", 370, {
      color: numberColor,
      fontSize: 72,
      weight: 900,
      shadow: mode === "neon",
    });
    drawCenteredText(context, "今日は", 640, {
      color: textColor,
      fontSize: 50,
      shadow: mode !== "rainbow",
    });
    drawCenteredText(context, `${details.ageParts.years}`, 820, {
      color: numberColor,
      fontSize: 170,
      weight: 900,
      shadow: mode === "neon",
    });
    drawCenteredText(context, "歳の誕生日！", 1000, {
      color: textColor,
      fontSize: 58,
      shadow: mode !== "rainbow",
    });
    drawCenteredText(context, "生まれてから", 1230, {
      color: textColor,
      fontSize: 48,
      shadow: mode !== "rainbow",
    });
    drawCenteredText(
      context,
      `${formatBirthdayNumber(result.livedDays)}日`,
      1390,
      {
        color: numberColor,
        fontSize: 112,
        weight: 900,
        shadow: mode === "neon",
      },
    );
    drawCenteredText(context, "経ちました！", 1540, {
      color: textColor,
      fontSize: 52,
      shadow: mode !== "rainbow",
    });
    return;
  }

  drawCenteredText(context, "今日は生まれてから", 510, {
    color: textColor,
    fontSize: 54,
    shadow: mode !== "rainbow",
  });
  drawCenteredText(
    context,
    `${formatBirthdayNumber(result.livedDays)}日目！`,
    720,
    {
      color: numberColor,
      fontSize: 122,
      weight: 900,
      shadow: mode === "neon",
    },
  );
  drawCenteredText(context, "次の誕生日まであと", 1120, {
    color: textColor,
    fontSize: 52,
    shadow: mode !== "rainbow",
  });
  drawCenteredText(
    context,
    `${formatBirthdayNumber(result.daysUntilNextBirthday)}`,
    1320,
    {
      color: numberColor,
      fontSize: 170,
      weight: 900,
      shadow: mode === "neon",
    },
  );
  drawCenteredText(context, "日です！", 1500, {
    color: textColor,
    fontSize: 58,
    shadow: mode !== "rainbow",
  });
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
            画像を保存する
          </a>
        </div>
      )}
    </section>
  );
}
