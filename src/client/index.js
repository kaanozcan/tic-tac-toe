import React from "react";
import { render } from "react-dom";

import Root from "./components/Root";

function DOMContentLoaded () {
  const element = document.getElementById("application-root");

  render(<Root />, element);
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);
