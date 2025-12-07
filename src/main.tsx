import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import "./custom.css";

createRoot(document.getElementById("root")!).render(
	<Theme accentColor="gray">
		<App />
	</Theme>
);
