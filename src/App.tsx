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
      {_allRoleIds.map((rid) => (
        <>
          <Token key={rid} roleId={rid} />
        </>
      ))}
      <div></div>
      {_allRoleIds.map((rid) => (
        <>
          <ReminderTokens key={rid + "RT"} roleId={rid} />
        </>
      ))}
    </div>
  );
}
