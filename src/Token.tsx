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
  let yOffset = 13;
  switch (roleId) {
    case "pt_BR_mastermind":    
    case "pt_BR_revolutionary":
    case "pt_BR_scapegoat":
    case "pt_BR_matron":
      yOffset += 14;
      break;
    case "pt_BR_po":
    case "pt_BR_pukka":
    case "pt_BR_witch":
    case "pt_BR_fisherman":
    case "pt_BR_minstrel":
    case "pt_BR_balloonist":
    case "pt_BR_snake_charmer":
    case "pt_BR_widow":   
    case "pt_BR_vigormortis":    
    case "pt_BR_professor":   
    case "pt_BR_duchess":
    case "pt_BR_bishop":
    case "pt_BR_beggar":
    case "pt_BR_judge":
      yOffset += 10;
      break;
    case "pt_BR_pit-hag":
    case "pt_BR_clockmaker":
    case "pt_BR_sailor":
    case "pt_BR_juggler":
    case "pt_BR_engineer":
    case "pt_BR_virgin":
    case "pt_BR_mayor":
    case "pt_BR_moonchild":
    case "pt_BR_lunatic":
    case "pt_BR_lil_monsta":    
    case "pt_BR_apprentice":
      yOffset += 8;
      break;
    case "pt_BR_choirboy":
    case "pt_BR_barber":
    case "pt_BR_godfather":
    case "pt_BR_cerenovus":
    case "pt_BR_no_dashii":
    case "pt_BR_vortox":
    case "pt_BR_fang_gu":
    case "pt_BR_zombuul":
    case "pt_BR_savant":
    case "pt_BR_amnesiac":
    case "pt_BR_monk":
    case "pt_BR_gambler":
    case "pt_BR_slayer":
    case "pt_BR_courtier":
    case "pt_BR_artist":
    case "pt_BR_fearmonger":
    case "pt_BR_leviathan":
    case "pt_BR_buddhist":
    case "pt_BR_toymaker":
    case "pt_BR_fiddler":
    case "pt_BR_thief":
    case "pt_BR_bone_collector":
    case "pt_BR_barista":
      yOffset += 6;
      break;
    case "pt_BR_exorcist":
    case "pt_BR_gossip":
    case "pt_BR_pixie":
    case "pt_BR_chef":
    case "pt_BR_preacher":
    case "pt_BR_innkeeper":
    case "pt_BR_ravenkeeper":
    case "pt_BR_poppy_grower":
    case "pt_BR_butler":
    case "pt_BR_mutant":
    case "pt_BR_klutz":
    case "pt_BR_drunk":
    case "pt_BR_politician":
    case "pt_BR_poisoner":
    case "pt_BR_devils_advocate":
    case "pt_BR_evil_twin":
    case "pt_BR_marionette":
    case "pt_BR_lycanthrope":
    case "pt_BR_imp":
    case "pt_BR_shabaloth":
    case "pt_BR_bureaucrat":
    case "pt_BR_butcher":
    case "pt_BR_harlot":
      yOffset += 4;
      break;
    case "pt_BR_puzzlemaster":
    case "pt_BR_boomdandy":
      yOffset += 2;
      break;
    case "pt_BR_steward":
    case "pt_BR_knight":
      yOffset -= 16;
      break;
    case "pt_BR_alchemist":
    case "pt_BR_noble":
    case "pt_BR_fool":
    case "pt_BR_soldier":
    case "pt_BR_tinker":
    case "pt_BR_organ_grinder":
    case "pt_BR_sweetheart":
    case "pt_BR_yaggababble":
    case "pt_BR_kazali":
      yOffset -= 8;
      break;
    case "pt_BR_baron":
    case "pt_BR_saint":
    case "pt_BR_spirit_of_ivory":
    case "pt_BR_hatter":
    case "pt_BR_voudon":
      yOffset -= 4;
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
            fill: "#101010",
            stroke: "#000",
            strokeOpacity: 0.15,
            strokeWidth: 1,
          }}
        >
          {lineEls}
        </text>

        <path
          d="M 9 72 C 3 150, 138 168, 142 70"
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
