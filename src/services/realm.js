import realm from "realm";
import arvore from "./arvore";

export default function getRealm() {
  return realm.open({
    schema: [arvore],
    schemaVersion: 7
  });
}
