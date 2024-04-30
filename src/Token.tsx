import { useId } from "react";
import { useRole } from "./roleInfos";

import { TopLeaves } from "./TopLeaves";
import { useTextPositioning } from "./TextPositioner";
import { CharacterImage } from "./CharacterImage";

import { getImageForEdition } from "./editionImages";

export interface TokenProps {
  roleId: string;
}

const abilityFontFamily = "Times New Roman";
const abilityFontSize = 11;

export function Token(props: TokenProps) {
  const { roleId } = props;

  const role = useRole(roleId);

  const label = role?.name;
  const abilityWithoutNewlines = role?.ability ?? "";
  const abilityWithNewlines = abilityWithoutNewlines.replace("[", "\n[");

  const reminderCount =
    (role?.reminders.length ?? 0) + (role?.remindersGlobal?.length ?? 0);

  let margin = abilityWithoutNewlines.length < 90 ? 14 : 11;

  const { lines, fontSize: computedFontSize } = useTextPositioning({
    text: abilityWithNewlines,
    circleDiameter: 150,
    margin: margin,
    yStart: 12,
    extraMargin: reminderCount > 5 ? (y) => (y < 30 ? 12 : 0) : undefined,
    yMax: 70,
    fontFamily: abilityFontFamily,
    fontSize: abilityFontSize
  });

  const wakesFirstNight = !!role?.firstNightReminder;
  const wakesOtherNights = !!role?.otherNightReminder;
  const affectsSetup = !!role?.setup;

  const curveId = useId();

  let iconSize = 135;
  let yOffset = 10;
  switch (roleId) {
    case "po":
    case "poisoner":
      yOffset += 6;
      break;
  }

  let imageEl = (
    <CharacterImage roleId={roleId} iconSize={iconSize} yOffset={yOffset} />
  );

  const lineEls = lines.map((line, i) => (
    <tspan
      key={i}
      x={line.x}
      y={line.y}
      style={{ fontWeight: line.text.startsWith("[") || line.text.endsWith("]") ? "600" : "200" }}
    >
      {line.text}
    </tspan>
  ));

  return (
    <div className="token">
      <svg viewBox="0 0 150 150" className="name">
        <image
          x="0"
          y="0"
          width="150"
          height="150"
          xlinkHref="https://raw.githubusercontent.com/RoystonS/townsquare/main/src/assets/token.png"
        />
        {wakesFirstNight ? (
          <image
            x="0"
            y="0"
            width="150"
            height="150"
            xlinkHref="https://github.com/RoystonS/townsquare/blob/main/src/assets/leaf-left.png?raw=true"
          />
        ) : null}
        {reminderCount ? <TopLeaves count={reminderCount} /> : null}
        {affectsSetup ? (
          <image
            x="0"
            y="0"
            width="150"
            height="150"
            xlinkHref="https://github.com/RoystonS/townsquare/blob/main/src/assets/leaf-orange.png?raw=true"
          />
        ) : null}
        {wakesOtherNights ? (
          <image
            x="0"
            y="0"
            width="150"
            height="150"
            xlinkHref="https://github.com/RoystonS/townsquare/blob/main/src/assets/leaf-right.png?raw=true"
          />
        ) : null}

        {imageEl}
        <text
          x="0"
          y="48"
          style={{
            fontSize: computedFontSize,
            fontFamily: abilityFontFamily,
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "pre",
            display: "inline",
            fill: "#101010"
          }}
        >
          {lineEls}
        </text>

        <path
          d="M 9 73 C 3 150, 138 168, 142 70"
          id={curveId}
          fill="transparent"
        />

        <text
          width="150"
          x="70%"
          textAnchor="middle"
          className="label mozilla"
          fontSize="130%"
        >
          <textPath xlinkHref={"#" + curveId}>{label}</textPath>
        </text>

        {/* <g transform="translate(-59,22) scale(0.7)">
          {role ? getImageForEdition(role.edition) : null}
        </g> */}
      </svg>
    </div>
  );
}