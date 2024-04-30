import "./styles.css";

import { useState, useEffect } from "react";
import { Token } from "./Token";
import { ReminderTokens } from "./ReminderTokens";
import { getAllRoleIds, getRoleInfo, RoleInfo } from "./roleInfos";

export default function App() {
  const [_allRoleIds, setAllRoleIds] = useState<string[]>([]);
  const [_allRoles, setAllRoles] = useState<RoleInfo[]>([]);

  useEffect(() => {
    async function getRoles() {
      const roleIds = await getAllRoleIds();
      setAllRoleIds(roleIds);
      const roles = await Promise.all(roleIds.map(getRoleInfo));
      setAllRoles(roles);
    }
    void getRoles();
  }, []);

  return (
    <div className="App" style={{ verticalAlign: "top" }}>
      {/* <Token roleId="knight" />
      <ReminderTokens roleId="knight" /> */}
      {/* <Token roleId="baron" />
      <Token roleId="fanggu" />
      <Token roleId="vigormortis" />
      <Token roleId="bountyhunter" />
      <Token roleId="balloonist" />
      <Token roleId="huntsman" />
      <Token roleId="choirboy" />
      <Token roleId="atheist" />
      <Token roleId="lilmonsta" /> */}

      {/* {_allRoles
        .filter((r) => r.ability.includes("["))
        .map((r) => (
          <>
            <ReminderTokens key={r.id} roleId={r.id} />
          </>
        ))} */}
            
      {_allRoleIds.map((rid) => (
        <>
          <Token key={rid} roleId={rid} />
        </>
      ))}
      {_allRoleIds.map((rid) => (
        <>
          <ReminderTokens key={rid + "RT"} roleId={rid} />
        </>
      ))}
    </div>
  );
}
