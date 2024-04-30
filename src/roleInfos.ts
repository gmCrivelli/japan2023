import vizierImage from "./icons/vizier.png";
import organGrinderImage from "./icons/organgrinder.png";
import knightImage from "./icons/knight.png";
import stewardImage from "./icons/steward.png";
import bootleggerImage from "./icons/bootlegger.png";
import stormCatcherImage from "./icons/stormcatcher.png";
import highPriestessImage from "./icons/highpriestess.png";
import harpyImage from "./icons/harpy.png";
import plagueDoctorImage from "./icons/plaguedoctor.png";
import shugenjaImage from "./icons/shugenja.png";
import ojoImage from "./icons/ojo.png";
import ferryManImage from "./icons/ferryman.png";
import kazaliImage from "./icons/kazali.png";
import gardenerImage from "./icons/gardener.png";

import { useEffect, useState } from "react";

export interface RoleInfo {
  id: string;
  name: string;
  ability: string;
  setup: boolean;
  edition: string;
  firstNightReminder: string;
  otherNightReminder: string;
  reminders: string[];
  remindersGlobal?: string[];
  image?: string;
  imageFilter?: string;

  /** Scaling to apply to the image, if not 1. */
  imageScale?: number;
  whitenifyTokenFilter?: boolean;
}

function applyFixups(roles: RoleInfo[]) {
  function changeRole(roleId: string, editor: (role: RoleInfo) => void) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) {
      return;
    }
    editor(role);
  }

  changeRole("noble", (role) => (role.imageScale = 0.8));

  // Useful filters to apply to images from the
  // script editor, to produce suitably coloured
  // + outlined images for tokens
  const goodScriptImageFilter =
    "hue-rotate(17deg) saturate(1500%) brightness(90%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))";
  const evilScriptImageFilter =
    "hue-rotate(5deg) saturate(1500%) brightness(45%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))";

  const goodWikiImageFilter = "hue-rotate(18deg)";
  const evilWikiImageFilter = "hue-rotate(5deg) saturate(160%)";
  changeRole("widow", (r) => (r.imageFilter = evilWikiImageFilter));

  return roles;
}

const rolesPromise = fetch(
  "https://raw.githubusercontent.com/gmCrivelli/japan2023/main/all_roles.json"
)
  .then((response) => response.json())
  .then(applyFixups);

export async function getRoleInfo(roleId: string) {
  const roles = (await rolesPromise) as RoleInfo[];
  const role = roles.find((r) => r.id === roleId);
  if (!role) {
    throw new Error(`Cannot find role ${roleId}`);
  }
  return role;
}

export function useRole(roleId: string) {
  const [role, setRole] = useState<RoleInfo | undefined>();

  useEffect(() => {
    async function fetchInfo() {
      const roleInfo = await getRoleInfo(roleId);
      setRole(roleInfo);
    }

    void fetchInfo();
  }, [roleId]);

  return role;
}

export async function getAllRoleIds() {
  const roles = (await rolesPromise) as RoleInfo[];
  return roles.map((r) => r.id);
}
