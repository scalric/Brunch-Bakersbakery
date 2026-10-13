import { useEffect } from "react";

const SITE = "Brunch Bakers";

// Sets the tab title for the current route (also what screen readers and search results show).
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Fresh Bakery Online`;
  }, [title]);
}
