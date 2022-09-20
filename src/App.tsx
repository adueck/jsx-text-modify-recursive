import React, { useState } from "react";
import { modifiers } from "./modifiers";
import "bootstrap/dist/css/bootstrap.min.css";
import pipe from "froebel/pipe";

type Node = React.ReactElement | string | undefined;
function JSXModifyText(e: Node, modifier: (s: string) => string): Node {
  if (!e) {
    return e;
  }
  if (typeof e === "string") {
    return modifier(e);
  }
  return {
    ...e,
    props: {
      ...e.props,
      children: Array.isArray(e.props.children)
        ? e.props.children.map((x: Node) => JSXModifyText(x, modifier))
        : JSXModifyText(e.props.children, modifier)
    }
  };
}

export default function App() {
  const [modifierNames, setModifierNames] = useState<string[]>([]);
  // get the array of modifiers to apply
  const toApply = modifiers
    .filter((x) => modifierNames.includes(x.name))
    .sort((a, b) =>
      modifiers.findIndex((x) => x.name === a.name) >=
      modifiers.findIndex((x) => x.name === b.name)
        ? 1
        : -1
    )
    .map((m) => m.f);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setModifierNames(
      e.target.checked
        ? // add modifier name on check
          (o) => [...o, e.target.name]
        : // remove modifier name on uncheck
          (o) => o.filter((x) => x !== e.target.name)
    );
  }
  return (
    <div className="container pt-4">
      <div className="mb-3">
        <h5>Functions to apply:</h5>
        {modifiers.map((m) => (
          <div className="form-check" key={m.name}>
            <input
              id={m.name}
              name={m.name}
              className="form-check-input"
              type="checkbox"
              checked={modifierNames.includes(m.name)}
              onChange={handleInputChange}
            />
            <label className="form-check-label ms-2" htmlFor={m.name}>
              {m.label}
            </label>
          </div>
        ))}
      </div>
      <h5>Selected functions modify text below:</h5>
      {JSXModifyText(
        <div className="card" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <p>
              I have a friend who <em>really</em> likes <strong>dogs</strong>.
            </p>
            <p>In fact, here's a list of every dog he owns.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>dog</th>
                  <th>age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ruffles</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Scruffles</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Bowzer</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>,
        // compose all the modifiers
        // @ts-ignore
        (s) => pipe(...toApply)(s)
      )}
    </div>
  );
}
